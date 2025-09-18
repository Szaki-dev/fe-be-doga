export default interface Ratings {
  averageRating: number | 0;
  games: { 
    name: string; 
    rating: number; 
    link: string;
  }[];
}