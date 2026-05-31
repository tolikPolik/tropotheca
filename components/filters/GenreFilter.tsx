'use client';

import { FC } from 'react';

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const GENRES = [
  { id: 'all', label: '🎬 Все', icon: '' },
  { id: 'action', label: '⚔️ Боевик', icon: '' },
  { id: 'comedy', label: '😂 Комедия', icon: '' },
  { id: 'drama', label: '🎭 Драма', icon: '' },
  { id: 'fantasy', label: '🐉 Фэнтези', icon: '' },
  { id: 'sci-fi', label: '🚀 Фантастика', icon: '' },
  { id: 'thriller', label: '🔪 Триллер', icon: '' },
  { id: 'romance', label: '💕 Романтика', icon: '' },
  { id: 'crime', label: '👮 Криминал', icon: '' }
];

export const GenreFilter: FC<GenreFilterProps> = ({ selectedGenre, onGenreChange }) => {
  return (
    <div>
      <h3 className="text-base text-gray-200 mb-5 mt-14">📺 Фильтры по жанру</h3>
      <div className="flex gap-3 flex-wrap">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
              selectedGenre === genre.id
                ? 'bg-[#ff007a] border-[#ff007a] text-white shadow-[0_0_15px_rgba(255,0,122,0.3)]'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#ff007a] hover:text-white'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  );
};