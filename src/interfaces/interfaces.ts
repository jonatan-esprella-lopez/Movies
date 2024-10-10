export interface Video {
  id: string;
  name: string;
  key: string;
}

export interface MovieData {
  videos: {
    results: Video[];
  };
}

export interface Image {
  id: number;
  file_path: string;
}

export type DisplayMovieStatus = 'ALL' | 'SEARCH' | 'MOST_VALUED' | 'LESS_VALUED';

export interface Trailer {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
}

export interface ButtonProps {
  icon: string;
  text: string;
  className: string;
}

