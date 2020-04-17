import { Content } from './Content';
import { Genre } from './Genre';

export interface Contents {
  page: number,
  results: Content[],
  total_results: number,
  genres: Genre[]
}