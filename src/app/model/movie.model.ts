export interface Movie {
  id: number,
  title: string,
  duration?: number,
  budget?: number,
  release_date: string,
  genre: string,
  description: string
}

export interface MovieDetails extends Movie {
  box_office: number;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
