'use client';

import { FC } from 'react';

interface PromoCardProps {
  image: string;
  label: string;
}

export const PromoCard: FC<PromoCardProps> = ({ image, label }) => {
  return (
    <div className="text-center cursor-pointer group">
      <img
        src={image}
        alt={label}
        className="w-[110px] h-[160px] rounded-xl border border-white/10 mb-2 transition-transform duration-300 group-hover:scale-105"
      />
      <p className="text-sm text-gray-500 m-0">{label}</p>
    </div>
  );
};