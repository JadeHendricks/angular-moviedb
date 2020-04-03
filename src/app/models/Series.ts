export interface Series {
  id: number,
  popularity: number,
  poster_path: string,
  backdrop_path?: string,
  first_air_date: string,
  name: string,
  vote_average: number,
  overview: string,
  release_date: string,
  genre_ids: number[]
}