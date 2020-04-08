export interface Content {
  id: number,
  name: string,
  title: string,
  character: string,
  popularity: number,
  poster_path: string,
  backdrop_path: string,
  vote_average: number,
  overview: string,
  release_date: string,
  genre_ids: number[],
  first_air_date: string,
  runtime: string
}