'use client';

import { FC, useState, useEffect } from 'react';

interface RatingStarsProps {
  initialRating?: number | null;
  onRate: (rating: number) => void;
  readonly?: boolean;
}

export const RatingStars: FC<RatingStarsProps> = ({ initialRating, onRate, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating || 0);

  useEffect(() => {
    if (initialRating !== undefined) {
      setCurrentRating(initialRating ?? 0);
    }
  }, [initialRating]);

  const handleRate = (rating: number) => {
    if (readonly) return;
    setCurrentRating(rating);
    onRate(rating);
  };

  const ratingMessages: Record<number, string> = {
    1: '😞 Очень плохо',
    2: '😕 Не понравилось',
    3: '😐 Нормально',
    4: '😊 Хорошо',
    5: '🤩 Отлично!'
  };

  return (
    <div>
      <div className="flex gap-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={`text-2xl cursor-pointer transition-colors ${
              (hoverRating || currentRating) >= star ? 'text-yellow-400' : 'text-gray-600'
            } ${readonly ? 'cursor-default' : ''}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-500 text-sm">
          {ratingMessages[currentRating] || 'Оцените'}
        </span>
      </div>
    </div>
  );
};