export interface SearchResultItem {
  genre_ids: number[];
  id: number;
  original_title: string;
  release_date: string;
  poster_path?: string;
}

export interface SearchResult {
  page: number;
  results: SearchResultItem[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}
