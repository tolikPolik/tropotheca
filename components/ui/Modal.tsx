'use client';

import { FC, ReactNode, useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a0520] p-10 rounded-3xl border border-[#ff007a] text-center shadow-[0_0_30px_rgba(255,0,122,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-2xl mb-4">{title}</h2>}
        {children}
        <Button variant="secondary" onClick={onClose} className="mt-6">
          Закрыть
        </Button>
      </div>
    </div>
  );
};