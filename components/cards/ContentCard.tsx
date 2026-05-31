'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Content, ContentType } from '@/types';

interface ContentCardProps {
  content: Content;
  type: ContentType;
}

export const ContentCard: FC<ContentCardProps> = ({ content, type }) => {
  return (
    <Link href={`/movie/${type}/${content.id}`} className="no-underline text-inherit">
      <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
        <img
          src={content.poster}
          alt={content.title}
          className="w-full aspect-video object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-[#ff007a] group-hover:border"
        />
        <div className="mt-2">
          <p className="text-sm font-semibold m-0">{content.title}</p>
          <div className="text-xs text-gray-500 flex items-center">
            ● {content.year} <span className="text-[#ff007a] ml-2 font-bold">★ {content.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};