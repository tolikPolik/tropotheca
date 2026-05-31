'use client';

import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-logo">Тропотека</div>
        <div className="footer-links">
          <a href="#">О нас</a>
          <a href="#">Помощь</a>
          <a href="#">Конфиденциальность</a>
        </div>
        <div className="footer-socials">
          <span>VK</span>
          <span>TG</span>
          <span>YT</span>
        </div>
      </div>
      <p className="copyright">© 2026 Тропотека. Все права защищены.</p>
    </footer>
  );
};