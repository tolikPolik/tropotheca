'use client';

import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-white/10 border-t-[#ff007a] rounded-full animate-spin" />
      <p className="text-gray-400 mt-4">Загрузка...</p>
    </div>
  );
};