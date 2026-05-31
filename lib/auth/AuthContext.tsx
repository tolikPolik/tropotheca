'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, FavoriteItem, HistoryItem, RatingItem, UserSettings, ContentType, ApiResponse } from '@/types';

const STORAGE_USERS_KEY = 'tropoteka_users';
const STORAGE_SESSION_KEY = 'tropoteka_session';

const getDefaultUsers = (): Record<string, User> => ({
  'demo@example.com': {
    id: 'user_001',
    email: 'demo@example.com',
    password: '123456',
    name: 'Демо Пользователь',
    createdAt: new Date().toISOString(),
    avatar: null,
    favorites: [],
    history: [],
    ratings: [],
    settings: { notifications: true, theme: 'dark', autoplay: false }
  }
});

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => ApiResponse<{ user: User }>;
  register: (email: string, password: string, name: string) => ApiResponse<{ user: User }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => ApiResponse<{ user: User }>;
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => ApiResponse<{ favorites: FavoriteItem[] }>;
  removeFromFavorites: (id: number, type: ContentType) => ApiResponse<{ favorites: FavoriteItem[] }>;
  isFavorite: (id: number, type: ContentType) => boolean;
  addToHistory: (item: Omit<HistoryItem, 'date'>) => ApiResponse<{ history: HistoryItem[] }>;
  addRating: (id: number, type: ContentType, rating: number, title: string) => ApiResponse<{ ratings: RatingItem[] }>;
  getRating: (id: number, type: ContentType) => number | null;
  updateSettings: (settings: Partial<UserSettings>) => ApiResponse<{ settings: UserSettings }>;
  getStats: () => { favorites: number; history: number; ratings: number };
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const loadUsers = (): Record<string, User> => {
  if (typeof window === 'undefined') return getDefaultUsers();
  const stored = localStorage.getItem(STORAGE_USERS_KEY);
  return stored ? JSON.parse(stored) : getDefaultUsers();
};

const saveUsers = (users: Record<string, User>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<Record<string, User>>(getDefaultUsers());
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadedUsers = loadUsers();
    setUsers(loadedUsers);
    
    const session = localStorage.getItem(STORAGE_SESSION_KEY);
    if (session) {
      const { email, expires } = JSON.parse(session);
      if (expires > Date.now() && loadedUsers[email]) {
        setUser(loadedUsers[email]);
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    }
  }, []);

  const saveSession = (email: string, remember: boolean) => {
    const sessionData = {
      email,
      expires: remember ? Date.now() + 30 * 24 * 60 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionData));
    setUser(users[email]);
  };

  const updateUsers = (newUsers: Record<string, User>) => {
    setUsers(newUsers);
    saveUsers(newUsers);
  };

  const login = (email: string, password: string, remember = false): ApiResponse<{ user: User }> => {
    const foundUser = users[email];
    if (!foundUser) return { data: null, error: 'Пользователь не найден', success: false };
    if (foundUser.password !== password) return { data: null, error: 'Неверный пароль', success: false };
    saveSession(email, remember);
    return { data: { user: foundUser }, error: null, success: true };
  };

  const register = (email: string, password: string, name: string): ApiResponse<{ user: User }> => {
    if (users[email]) return { data: null, error: 'Пользователь уже существует', success: false };
    if (!email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)) {
      return { data: null, error: 'Некорректный email', success: false };
    }
    if (password.length < 4) return { data: null, error: 'Пароль минимум 4 символа', success: false };
    if (!name || name.trim().length < 2) return { data: null, error: 'Введите имя', success: false };

    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      email,
      password,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      avatar: null,
      favorites: [],
      history: [],
      ratings: [],
      settings: { notifications: true, theme: 'dark', autoplay: false }
    };

    const newUsers = { ...users, [email]: newUser };
    updateUsers(newUsers);
    saveSession(email, false);
    return { data: { user: newUser }, error: null, success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
  };

  const updateUser = (data: Partial<User>): ApiResponse<{ user: User }> => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const updatedUser = { ...users[user.email], ...data };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    return { data: { user: updatedUser }, error: null, success: true };
  };

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const exists = user.favorites.some(f => f.id === item.id && f.type === item.type);
    let newFavorites = [...user.favorites];
    if (!exists) {
      newFavorites = [...user.favorites, { ...item, addedAt: new Date().toISOString() }];
    }
    const updatedUser = { ...users[user.email], favorites: newFavorites };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    return { data: { favorites: newFavorites }, error: null, success: true };
  };

  const removeFromFavorites = (id: number, type: ContentType) => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const newFavorites = user.favorites.filter(f => !(f.id === id && f.type === type));
    const updatedUser = { ...users[user.email], favorites: newFavorites };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    return { data: { favorites: newFavorites }, error: null, success: true };
  };

  const isFavorite = (id: number, type: ContentType): boolean => {
    return user?.favorites.some(f => f.id === id && f.type === type) || false;
  };

  const addToHistory = (item: Omit<HistoryItem, 'date'>) => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const existingIndex = user.history.findIndex(h => h.id === item.id && h.type === item.type);
    const historyItem = { ...item, date: new Date().toISOString().slice(0, 10) };
    let newHistory = [...user.history];
    if (existingIndex !== -1) {
      newHistory[existingIndex] = historyItem;
    } else {
      newHistory = [historyItem, ...newHistory].slice(0, 20);
    }
    const updatedUser = { ...users[user.email], history: newHistory };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    return { data: { history: newHistory }, error: null, success: true };
  };

  const addRating = (id: number, type: ContentType, rating: number, title: string) => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const existingIndex = user.ratings.findIndex(r => r.id === id && r.type === type);
    const ratingItem = { id, type, rating, title, date: new Date().toISOString() };
    let newRatings = [...user.ratings];
    if (existingIndex !== -1) {
      newRatings[existingIndex] = ratingItem;
    } else {
      newRatings.push(ratingItem);
    }
    const updatedUser = { ...users[user.email], ratings: newRatings };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    return { data: { ratings: newRatings }, error: null, success: true };
  };

  const getRating = (id: number, type: ContentType): number | null => {
    const rating = user?.ratings.find(r => r.id === id && r.type === type);
    return rating ? rating.rating : null;
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    if (!user) return { data: null, error: 'Не авторизован', success: false };
    const newSettings = { ...user.settings, ...settings };
    const updatedUser = { ...users[user.email], settings: newSettings };
    const newUsers = { ...users, [user.email]: updatedUser };
    updateUsers(newUsers);
    setUser(updatedUser);
    
    if (settings.theme !== undefined && typeof window !== 'undefined') {
      if (settings.theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
    
    return { data: { settings: newSettings }, error: null, success: true };
  };

  const getStats = () => ({
    favorites: user?.favorites.length || 0,
    history: user?.history.length || 0,
    ratings: user?.ratings.length || 0
  });

  const value: AuthContextValue = {
    user: isMounted ? user : null,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToHistory,
    addRating,
    getRating,
    updateSettings,
    getStats
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};