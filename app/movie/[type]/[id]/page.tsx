'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContentById, getRecommendations } from '@/lib/db/movieDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { ContentType } from '@/types';

const GENRE_MAP: Record<string, string> = {
  action: '⚔️ Боевик', comedy: '😂 Комедия', drama: '🎭 Драма',
  fantasy: '🐉 Фэнтези', 'sci-fi': '🚀 Фантастика', thriller: '🔪 Триллер',
  romance: '💕 Романтика', crime: '👮 Криминал', adventure: '🗺️ Приключения',
  family: '👨‍👩‍👧‍👦 Семейный'
};

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const { user, addToFavorites, removeFromFavorites, isFavorite, addToHistory, addRating, getRating } = useAuth();
  
  const type = params.type as ContentType;
  const id = parseInt(params.id as string);
  
  const [content, setContent] = useState(getContentById(id, type));
  const [recommendations, setRecommendations] = useState(getRecommendations(id, type));
  const [isFav, setIsFav] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const newContent = getContentById(id, type);
    setContent(newContent);
    setRecommendations(getRecommendations(id, type));
    if (user) {
      setIsFav(isFavorite(id, type));
      setUserRating(getRating(id, type));
    }
  }, [id, type, user]);

  useEffect(() => {
    if (user && content) {
      addToHistory({
        id: content.id,
        title: content.title,
        type,
        img: content.poster,
        progress: content.episodes ? Math.floor((selectedEpisode / content.episodes.length) * 100) : 0,
        lastEpisode: selectedEpisode
      });
    }
  }, [content, selectedEpisode]);

  const showToastMessage = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 2000);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (isFav) {
      removeFromFavorites(id, type);
      setIsFav(false);
      showToastMessage('Удалено из избранного 💔');
    } else {
      addToFavorites({
        id: content!.id,
        title: content!.title,
        type,
        year: content!.year,
        rating: content!.rating,
        img: content!.poster
      });
      setIsFav(true);
      showToastMessage('Добавлено в избранное! ❤');
    }
  };

  const handleRate = (rating: number) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    addRating(id, type, rating, content!.title);
    setUserRating(rating);
    showToastMessage(`Вы оценили на ${rating}/5 ⭐`);
  };

  const handleEpisodeChange = (episodeNum: number) => {
    setSelectedEpisode(episodeNum);
    const episode = content?.episodes?.find(ep => ep.num === episodeNum);
    if (episode && episode.videoUrl) {
      const iframe = document.getElementById('videoPlayer') as HTMLIFrameElement;
      if (iframe) iframe.src = episode.videoUrl;
    }
    showToastMessage(`Загрузка ${episodeNum} серии... 🎬`);
  };

  if (!content) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>❌ Контент не найден</h2>
        <p style={{ color: '#999', margin: '20px 0' }}>Извините, такой фильм или сериал не найден.</p>
        <button className="btn-primary" onClick={() => router.push('/')}>Вернуться на главную</button>
      </div>
    );
  }

  return (
    <>
      <section className="player-container" style={{ marginTop: '40px' }}>
        <div className="video-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
          <iframe
            id="videoPlayer"
            src={content.videoUrl}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
          />
          <button
            onClick={handleToggleFavorite}
            className={`video-fav ${isFav ? 'active' : ''}`}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: isFav ? 'var(--accent-pink)' : 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(5px)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: '0.3s',
              fontSize: '1.3rem',
              zIndex: 10,
              color: 'white'
            }}
          >
            ❤
          </button>
        </div>
      </section>

      <section className="movie-details" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div className="movie-info">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{content.title}</h1>
          <div style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>
            {type === 'series' ? 'Сериал' : type === 'anime' ? 'Аниме' : 'Мультфильм'} ● {content.year} ● {content.duration} ● {content.ageRating}
          </div>
          <div className="movie-tags" style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
            {content.genres.map(genre => (
              <span key={genre} className="tag" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '25px' }}>
                {GENRE_MAP[genre] || genre}
              </span>
            ))}
          </div>
          <div className="rating-stars" style={{ display: 'flex', gap: '5px', margin: '15px 0', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRate(star)}
                style={{
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: '0.2s',
                  color: (userRating || 0) >= star ? '#ffc107' : '#555'
                }}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: '10px', color: '#888' }}>
              {userRating ? `Оценка: ${userRating}/5` : 'Оцените'}
            </span>
          </div>
          <p style={{ lineHeight: '1.6', color: '#ccc' }}>{content.description}</p>
          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div><strong style={{ color: 'var(--accent-pink)' }}>Режиссёр:</strong> <span style={{ color: '#aaa' }}>{content.director}</span></div>
              {content.writers && <div><strong style={{ color: 'var(--accent-pink)' }}>Сценарий:</strong> <span style={{ color: '#aaa' }}>{content.writers}</span></div>}
              <div><strong style={{ color: 'var(--accent-pink)' }}>Год:</strong> <span style={{ color: '#aaa' }}>{content.year}</span></div>
              <div><strong style={{ color: 'var(--accent-pink)' }}>Страна:</strong> <span style={{ color: '#aaa' }}>{content.country}</span></div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <strong style={{ color: 'var(--accent-pink)' }}>🎭 В главных ролях:</strong>
            <div className="cast-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              {content.cast.map(actor => (
                <span key={actor} style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem' }}>{actor}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="movie-sidebar">
          <div className="sidebar-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>📺 Список серий</h3>
            <div className="episode-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {content.episodes?.map(ep => (
                <div
                  key={ep.num}
                  onClick={() => handleEpisodeChange(ep.num)}
                  className={`episode-item ${selectedEpisode === ep.num ? 'active' : ''}`}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: '0.2s',
                    borderRadius: '10px',
                    background: selectedEpisode === ep.num ? 'rgba(255, 0, 122, 0.2)' : 'transparent',
                    borderLeft: selectedEpisode === ep.num ? '3px solid var(--accent-pink)' : 'none'
                  }}
                >
                  <div className="episode-title" style={{ fontWeight: 600, marginBottom: '5px' }}>{ep.num} серия · {ep.title}</div>
                  <div className="episode-duration" style={{ fontSize: '0.75rem', color: '#888' }}>{ep.duration}</div>
                </div>
              ))}
            </div>
            <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.1)', margin: '15px 0' }} />
            <button className="btn-primary" style={{ width: '100%' }} onClick={handleToggleFavorite}>
              ❤ Добавить в избранное
            </button>
          </div>
        </div>
      </section>

      {recommendations.length > 0 && (
        <section className="content-grid" style={{ marginTop: '60px' }}>
          <div className="section-header">
            <span className="line"></span>
            <h3>🔥 Вам также может понравиться</h3>
          </div>
          <div className="cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
            {recommendations.map(rec => (
              <Link href={`/movie/${rec.type}/${rec.id}`} key={rec.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card recommendation-card" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  <img src={rec.poster} className="card-img-real" alt={rec.title} />
                  <div className="card-info">
                    <p className="card-title">{rec.title}</p>
                    <div className="card-meta">● {rec.year} <span>★ {rec.rating}</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem' }}>🔒 Требуется авторизация</h2>
            <p style={{ color: '#999', margin: '20px 0' }}>Войдите или зарегистрируйтесь, чтобы пользоваться этой функцией.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Войти / Регистрация</button>
              </Link>
              <button className="btn-secondary" onClick={() => setShowAuthModal(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="notification-toast">
          {toast.message}
        </div>
      )}

      <style jsx global>{`
        .episode-list::-webkit-scrollbar {
          width: 5px;
        }
        .episode-list::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .episode-list::-webkit-scrollbar-thumb {
          background: var(--accent-pink);
          border-radius: 10px;
        }
        .video-fav:hover {
          background: var(--accent-pink) !important;
          border-color: var(--accent-pink) !important;
          transform: scale(1.1);
        }
        .recommendation-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}