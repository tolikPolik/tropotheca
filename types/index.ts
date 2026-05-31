export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  avatar: string | null;
  favorites: FavoriteItem[];
  history: HistoryItem[];
  ratings: RatingItem[];
  settings: UserSettings;
}

export interface FavoriteItem {
  id: number;
  title: string;
  type: ContentType;
  year: string;
  rating: number;
  img: string;
  addedAt: string;
}

export interface HistoryItem {
  id: number;
  title: string;
  type: ContentType;
  date: string;
  progress: number;
  img: string;
  lastEpisode: number;
}

export interface RatingItem {
  id: number;
  type: ContentType;
  rating: number;
  title: string;
  date: string;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'dark' | 'light';
  autoplay: boolean;
}

export type ContentType = 'movie' | 'series' | 'anime' | 'cartoon';

export interface Content {
  id: number;
  title: string;
  originalTitle?: string;
  year: string;
  rating: number;
  ageRating: string;
  duration: string;
  description: string;
  director: string;
  writers?: string;
  country: string;
  genres: string[];
  cast: string[];
  poster: string;
  banner?: string;
  videoUrl: string;
  episodes?: Episode[];
}

export interface Episode {
  num: number;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
export type DurationType = 'short' | 'evening' | 'marathon' | 'any';

export interface Content {
  id: number;
  title: string;
  originalTitle?: string;
  year: string;
  rating: number;
  ageRating: string;
  duration: string;
  durationType?: DurationType;
  description: string;
  director: string;
  writers?: string;
  country: string;
  genres: string[];
  cast: string[];
  poster: string;
  banner?: string;
  videoUrl: string;
  episodes?: Episode[];
}
