'use client';

import Link from 'next/link';
import { FC } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export const Header: FC = () => {
  const { user } = useAuth();

  return (
    <header>
      <div className="logo">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Тропотека</Link>
      </div>
      <nav>
        <Link href="/">Всё</Link>
        <Link href="/">Фильмы</Link>
        <Link href="/">Сериалы</Link>
        <Link href="/">Аниме</Link>
        <Link href="/">Мультфильмы</Link>
      </nav>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Найти фильм, сериал, аниме..." />
        </div>
        <div className="favorites-icon" title="Избранное">❤</div>
        <div className="notifications">🔔</div>
        {user ? (
          <Link href="/profile" className="user-profile">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span>{user.name}</span>
          </Link>
        ) : (
          <Link href="/login">
            <button className="btn-login-pink">Войти</button>
          </Link>
        )}
      </div>
    </header>
  );
};