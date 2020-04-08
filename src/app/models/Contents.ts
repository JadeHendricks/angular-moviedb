import { Content } from './Content';

export interface Contents {
  page: number,
  results: Content[],
  total_results: number
}