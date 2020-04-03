export interface Movie {
  id: number,
  popularity: number,
  poster_path: string,
  backdrop_path?: string,
  title: string,
  vote_average: number,
  overview: string,
  release_date: string,
  genre_ids: number[]
}