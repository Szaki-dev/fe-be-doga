import fs from 'node:fs';
import Ratings from './src/ratings';


let output: Ratings = {
  averageRating: 0,
  games: [],
}

try {
  const data = fs.readFileSync('input.csv', 'utf-8');
  const lines = data.split('\n');
  let rtgs = 0;
  for (const line of lines) {
    const columns = line.split(',');
    if (columns.length >= 3) {
      if (!parseFloat(columns[1].trim())) continue;
      const name = columns[0].trim();
      const rating = parseFloat(columns[1].trim());
      const link = columns[2].trim();
      output.games!.push({ name, rating, link });
      rtgs += rating;
    }
  }
  output.games!.sort((a, b) => b.rating - a.rating);
  output.averageRating = parseFloat((rtgs / (output.games!.length || 1)).toFixed(3));
  fs.writeFileSync('public/ratings.json', JSON.stringify(output, null, 2));
} catch (error) {
  console.error('Error reading file:', error);
  process.exit(1);
}