'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Toast } from '@/components/ui/Toast';
import { FavoriteItem } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, logout, removeFromFavorites, getStats, updateSettings, getRating } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPassword, setEditPassword] = useState('');
  const [toast, setToast] = useState<{ message: string } | null>(null);

  if (!user) {
    router.push('/login');
    return null;
  }

  const stats = getStats();
  const badge = stats.favorites >= 10 ? '👑 Кинокороль' : stats.favorites >= 5 ? '⭐ Знаток кино' : '🎬 Киноман';

  const showToastMessage = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 2000);
  };

  const handleSaveProfile = () => {
    const updateData: { name?: string; password?: string } = {};
    if (editName && editName !== user.name) updateData.name = editName;
    if (editPassword && editPassword.length >= 4) updateData.password = editPassword;
    
    if (Object.keys(updateData).length > 0) {
      const result = updateUser(updateData);
      if (result.success) {
        showToastMessage('Профиль обновлён!');
        setIsEditing(false);
        setEditPassword('');
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleRemoveFavorite = (id: number, type: string) => {
    removeFromFavorites(id, type as any);
    showToastMessage('Удалено из избранного');
  };

  const handleToggleSetting = (setting: 'notifications' | 'theme' | 'autoplay') => {
    if (setting === 'theme') {
      const newTheme = user.settings.theme === 'dark' ? 'light' : 'dark';
      updateSettings({ theme: newTheme });
      showToastMessage(`Тёмная тема: ${newTheme === 'dark' ? 'Включена' : 'Выключена'}`);
    } else if (setting === 'notifications') {
      updateSettings({ notifications: !user.settings.notifications });
      showToastMessage(`Уведомления: ${!user.settings.notifications ? 'Включены' : 'Выключены'}`);
    } else {
      updateSettings({ autoplay: !user.settings.autoplay });
      showToastMessage(`Автовоспроизведение: ${!user.settings.autoplay ? 'Включено' : 'Выключено'}`);
    }
  };

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      logout();
      router.push('/');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <span className="profile-badge">{badge}</span>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number">{stats.favorites}</div>
              <div className="stat-label">В избранном</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.history}</div>
              <div className="stat-label">Просмотрено</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.ratings}</div>
              <div className="stat-label">Оценок</div>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-secondary" onClick={() => setIsEditing(!isEditing)}>
            ✏️ Редактировать
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Выйти
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="profile-section edit-section">
          <div className="section-title">
            <span className="line"></span>
            <span>Редактирование профиля</span>
          </div>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Ваше имя"
            className="edit-input"
          />
          <input
            type="email"
            value={user.email}
            disabled
            className="edit-input disabled"
          />
          <input
            type="password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            placeholder="Новый пароль"
            className="edit-input"
          />
          <div className="edit-actions">
            <button className="btn-primary" onClick={handleSaveProfile}>Сохранить</button>
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        </div>
      )}

      <div className="profile-section">
        <div className="section-title">
          <span className="line"></span>
          <span>❤️ Избранное</span>
        </div>
        {user.favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <p>У вас пока нет избранного</p>
            <button className="btn-primary" onClick={() => router.push('/')}>Найти контент</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {user.favorites.map((item: FavoriteItem) => (
              <div
                key={`${item.id}-${item.type}`}
                className="favorite-card"
                onClick={() => router.push(`/movie/${item.type}/${item.id}`)}
              >
                <img src={item.img} alt={item.title} className="favorite-img" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(item.id, item.type);
                  }}
                  className="remove-fav"
                >
                  ✕
                </button>
                <div className="favorite-info">
                  <div className="favorite-title">{item.title}</div>
                  <div className="favorite-meta">● {item.year} <span>★ {item.rating || '?'}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-title">
          <span className="line"></span>
          <span>📺 История просмотров</span>
        </div>
        {user.history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📺</div>
            <p>История просмотров пуста</p>
          </div>
        ) : (
          <div className="history-list">
            {user.history.map((item, idx) => (
              <div
                key={idx}
                className="history-item"
                onClick={() => router.push(`/movie/${item.type}/${item.id}`)}
              >
                <img src={item.img} alt={item.title} className="history-img" />
                <div className="history-info">
                  <div className="history-title">{item.title}</div>
                  <div className="history-date">{item.date}</div>
                  <div className="history-progress">
                    <div className="history-progress-bar" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-title">
          <span className="line"></span>
          <span>⚙️ Настройки</span>
        </div>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Уведомления</h4>
              <p>Получать уведомления о новых рекомендациях</p>
            </div>
            <button
              onClick={() => handleToggleSetting('notifications')}
              className={`toggle-switch ${user.settings.notifications ? 'active' : ''}`}
            >
              <div className="toggle-slider" />
            </button>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h4>Тёмная тема</h4>
              <p>Использовать тёмную тему оформления</p>
            </div>
            <button
              onClick={() => handleToggleSetting('theme')}
              className={`toggle-switch ${user.settings.theme === 'dark' ? 'active' : ''}`}
            >
              <div className="toggle-slider" />
            </button>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h4>Автовоспроизведение</h4>
              <p>Автоматически воспроизводить следующий эпизод</p>
            </div>
            <button
              onClick={() => handleToggleSetting('autoplay')}
              className={`toggle-switch ${user.settings.autoplay ? 'active' : ''}`}
            >
              <div className="toggle-slider" />
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}