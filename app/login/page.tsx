'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null);

  if (user) {
    router.push('/');
    return null;
  }

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showToast('Заполните все поля', true);
      return;
    }
    const result = login(email, password, rememberMe);
    if (result.success) {
      showToast(`Добро пожаловать, ${result.data!.user.name}!`);
      setTimeout(() => router.push('/'), 1500);
    } else {
      showToast(result.error || 'Ошибка входа', true);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      showToast('Заполните все поля', true);
      return;
    }
    if (password !== confirmPassword) {
      showToast('Пароли не совпадают', true);
      return;
    }
    if (password.length < 4) {
      showToast('Пароль должен быть минимум 4 символа', true);
      return;
    }
    const result = register(email, password, name);
    if (result.success) {
      showToast(`Регистрация успешна! Добро пожаловать, ${name}!`);
      setTimeout(() => router.push('/'), 1500);
    } else {
      showToast(result.error || 'Ошибка регистрации', true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🎬 Тропотека</h2>
        <div className="login-subtitle">Войдите или создайте аккаунт</div>

        <div className="tab-buttons">
          <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Вход
          </button>
          <button className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
            Регистрация
          </button>
        </div>

        {activeTab === 'login' && (
          <div>
            <div className="input-group">
              <label>📧 Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" />
            </div>
            <div className="input-group">
              <label>🔒 Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="rememberMe">Запомнить меня</label>
            </div>
            <button className="btn-primary btn-full" onClick={handleLogin}>Войти</button>
          </div>
        )}

        {activeTab === 'register' && (
          <div>
            <div className="input-group">
              <label>👤 Имя</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как вас называть?" />
            </div>
            <div className="input-group">
              <label>📧 Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" />
            </div>
            <div className="input-group">
              <label>🔒 Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="минимум 4 символа" />
              <div className="password-hint">Пароль должен содержать минимум 4 символа</div>
            </div>
            <div className="input-group">
              <label>🔒 Подтверждение пароля</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="повторите пароль" />
            </div>
            <button className="btn-primary btn-full" onClick={handleRegister}>Создать аккаунт</button>
          </div>
        )}

        <Link href="/" className="back-link">← Вернуться на главную</Link>
      </div>

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}