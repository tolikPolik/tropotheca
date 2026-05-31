'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CONTENT_DB } from '@/lib/db/movieDb';
import { ContentType, DurationType } from '@/types';

const PROMO_IMAGES = [
  'https://i.pinimg.com/736x/d6/ce/7d/d6ce7dfc665e9f9b3931a33e8a6b8be0.jpg',
  'https://i.pinimg.com/736x/26/4b/3f/264b3f0de0529920ddc3695057879dc7.jpg',
  'https://m.media-amazon.com/images/M/MV5BZTJkYzY5NmYtZTdjNy00NTc1LTgwNGQtNTJlMmRjNWRlNTBlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  'https://i.pinimg.com/1200x/57/c9/a1/57c9a1a8f09748a98c3d802f6bd087b7.jpg',
  'https://i.pinimg.com/736x/3c/8f/f0/3c8ff0797d242943b62ed592b553f308.jpg'
];

const PROMO_LABELS = ['Фильм', 'Сериал', 'Аниме', 'Книга', 'Музыка'];

const MOODS = [
  '❤ Уютно', '⚡ Драйв', '💧 Грустно', '😊 Смешно',
  '🌸 Романтика', '💭 Хочу подумать', '🌙 Ночь', '🖌️ Вдохновение'
];

const GENRES = [
  { id: 'all', label: '🎬 Все' },
  { id: 'action', label: '⚔️ Боевик' },
  { id: 'comedy', label: '😂 Комедия' },
  { id: 'drama', label: '🎭 Драма' },
  { id: 'fantasy', label: '🐉 Фэнтези' },
  { id: 'sci-fi', label: '🚀 Фантастика' },
  { id: 'thriller', label: '🔪 Триллер' },
  { id: 'romance', label: '💕 Романтика' },
  { id: 'crime', label: '👮 Криминал' },
  { id: 'adventure', label: '🗺️ Приключения' }
];

const DURATION_FILTERS = [
  { id: 'any', label: '🕒 Любая длительность' },
  { id: 'short', label: '🕒 На 30 минут' },
  { id: 'evening', label: '🕒 На вечер' },
  { id: 'marathon', label: '🕒 На марафон' }
];

type TabType = 'all' | 'movie' | 'series' | 'anime' | 'cartoon';

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState<DurationType>('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const movieRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<HTMLDivElement>(null);
  const cartoonRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (tab: TabType) => {
    setSelectedTab(tab);
    if (tab === 'movie' && movieRef.current) {
      movieRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'series' && seriesRef.current) {
      seriesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'anime' && animeRef.current) {
      animeRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'cartoon' && cartoonRef.current) {
      cartoonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filterContent = (content: any) => {
    const matchesGenre = selectedGenre === 'all' || content.genres.includes(selectedGenre);
    const matchesSearch = !searchQuery || content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = selectedDuration === 'any' || content.durationType === selectedDuration;
    return matchesGenre && matchesSearch && matchesDuration;
  };

  const getVisibleCount = () => {
    let count = 0;
    if (selectedTab === 'all' || selectedTab === 'movie') {
      count += Object.values(CONTENT_DB.movies).filter(filterContent).length;
    }
    if (selectedTab === 'all' || selectedTab === 'series') {
      count += Object.values(CONTENT_DB.series).filter(filterContent).length;
    }
    if (selectedTab === 'all' || selectedTab === 'anime') {
      count += Object.values(CONTENT_DB.anime).filter(filterContent).length;
    }
    if (selectedTab === 'all' || selectedTab === 'cartoon') {
      count += Object.values(CONTENT_DB.cartoon).filter(filterContent).length;
    }
    return count;
  };

  useEffect(() => {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
      const handleInput = (e: Event) => {
        setSearchQuery((e.target as HTMLInputElement).value);
      };
      searchInput.addEventListener('input', handleInput);
      return () => searchInput.removeEventListener('input', handleInput);
    }
  }, []);

  const handleMoodClick = (container: HTMLElement) => {
    const cards = Array.from(container.querySelectorAll('.filter-card:not(.hidden)'));
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => container.appendChild(card));
  };

  const handleRecommend = () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      const allMovies = [
        ...Object.values(CONTENT_DB.movies),
        ...Object.values(CONTENT_DB.series),
        ...Object.values(CONTENT_DB.anime),
        ...Object.values(CONTENT_DB.cartoon)
      ];
      const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
      setRecommendedMovie(randomMovie.title);
      setIsLoading(false);
    }, 1500);
  };

  const resetAllFilters = () => {
    setSelectedGenre('all');
    setSelectedDuration('any');
    setSearchQuery('');
    const searchInput = document.querySelector('.search-bar input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    
    const notification = document.createElement('div');
    notification.textContent = 'Все фильтры сброшены!';
    notification.className = 'notification-toast';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const getWordForm = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'результат';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'результата';
    return 'результатов';
  };

  const renderContentSection = (type: ContentType, title: string, ref: React.RefObject<HTMLDivElement>, dataSource: any) => {
    if (selectedTab !== 'all' && selectedTab !== type) return null;
    
    const contents = Object.values(dataSource);
    const filteredContents = contents.filter(filterContent);
    
    if (filteredContents.length === 0) return null;
    
    return (
      <div className="content-grid" ref={ref}>
        <div className="section-header">
          <div className="line" />
          <h3>{title}</h3>
        </div>
        <div className="cards-container">
          {filteredContents.map((content: any) => (
            <Link href={`/movie/${type}/${content.id}`} key={content.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card filter-card">
                <img src={content.poster} className="card-img-real" alt={content.title} />
                <div className="card-info">
                  <p className="card-title">{content.title}</p>
                  <div className="card-meta">● {content.year} <span>★ {content.rating}</span></div>
                  <div className="card-duration">{content.duration}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const visibleCount = getVisibleCount();

  return (
    <>
      <div className="hero-container">
        <div className="hero-text">
          <h1>Подбери историю по настроению</h1>
          <p>Фильмы, сериалы, аниме — быстро, без бесконечного выбора.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={handleRecommend}>Подобрать сейчас</button>
            <button className="btn-secondary">Открыть каталог</button>
          </div>
        </div>
        <div className="hero-cards">
          {PROMO_IMAGES.map((img, idx) => (
            <div className="promo-card" key={idx}>
              <img src={img} className="img-v" alt={PROMO_LABELS[idx]} />
              <p>{PROMO_LABELS[idx]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="category-tabs">
          <button 
            className={`category-tab ${selectedTab === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedTab('all')}
          >
            🎬 Всё
          </button>
          <button 
            className={`category-tab ${selectedTab === 'movie' ? 'active' : ''}`}
            onClick={() => scrollToSection('movie')}
          >
            🎥 Фильмы
          </button>
          <button 
            className={`category-tab ${selectedTab === 'series' ? 'active' : ''}`}
            onClick={() => scrollToSection('series')}
          >
            📺 Сериалы
          </button>
          <button 
            className={`category-tab ${selectedTab === 'anime' ? 'active' : ''}`}
            onClick={() => scrollToSection('anime')}
          >
            🎌 Аниме
          </button>
          <button 
            className={`category-tab ${selectedTab === 'cartoon' ? 'active' : ''}`}
            onClick={() => scrollToSection('cartoon')}
          >
            🎨 Мультфильмы
          </button>
        </div>
      </div>

      <div className="filters">
        <h3>📺 Фильтры по жанру</h3>
        <div className="genre-tags">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              className={`genre-tag ${selectedGenre === genre.id ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters">
        <h3>⏱️ Фильтры по длительности</h3>
        <div className="duration-tags">
          {DURATION_FILTERS.map((duration) => (
            <button
              key={duration.id}
              className={`duration-tag ${selectedDuration === duration.id ? 'active' : ''}`}
              onClick={() => setSelectedDuration(duration.id as DurationType)}
            >
              {duration.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters">
        <h3>🎭 Выбери настроение</h3>
        <div className="tags">
          {MOODS.map((mood) => (
            <button
              key={mood}
              className="tag"
              onClick={(e) => {
                const containers = document.querySelectorAll('.cards-container');
                containers.forEach((container) => handleMoodClick(container as HTMLElement));
                document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                (e.currentTarget as HTMLElement).classList.add('active');
              }}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button className="btn-reset" onClick={resetAllFilters}>🔄 Сбросить все фильтры</button>
      </div>

      <div className="filter-stats">📊 Найдено: {visibleCount} {getWordForm(visibleCount)}</div>

      {renderContentSection('movie', 'Фильмы', movieRef, CONTENT_DB.movies)}
      {renderContentSection('series', 'Сериалы', seriesRef, CONTENT_DB.series)}
      {renderContentSection('anime', 'Аниме', animeRef, CONTENT_DB.anime)}
      {renderContentSection('cartoon', 'Мультфильмы', cartoonRef, CONTENT_DB.cartoon)}

      {visibleCount === 0 && (
        <div className="empty-results">
          <div className="empty-icon">🔍</div>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
          <button className="btn-primary" onClick={resetAllFilters}>Сбросить фильтры</button>
        </div>
      )}

      <div className="info-banners">
        <div className="banner-item">
          <div className="icon">⏱</div>
          <p>Подбор за 10 секунд</p>
        </div>
        <div className="banner-item active-banner">
          <div className="icon">❤</div>
          <p>Рекомендации по настроению</p>
        </div>
        <div className="banner-item">
          <div className="icon">👤</div>
          <p>Один профиль для кино и книг</p>
        </div>
      </div>

      <div className="cta-panel">
        <h2>Создай список под своё настроение</h2>
        <button className="btn-primary" onClick={handleRecommend}>Начать бесплатно</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Магия подбора...</h2>
            {isLoading ? (
              <div className="loader" />
            ) : (
              <>
                <p style={{ color: '#999', margin: '20px 0' }}>Твое идеальное кино на сегодня:</p>
                <h3 style={{ color: 'var(--accent-pink)' }}>{recommendedMovie}</h3>
                <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Круто, спасибо!</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}