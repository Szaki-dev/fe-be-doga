import type Ratings from './ratings.ts'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = async () => {
  const res = await fetch('/ratings.json');
  const data: Ratings = await res.json();
  
  const heading = document.createElement('h1');
  heading.className = 'mb-4 text-center p-4';
  heading.innerText = `A játékok átlagos értékelése: ${data.averageRating.toFixed(3)}`;
  app.appendChild(heading);
  const gamesList = document.createElement('div');
  gamesList.className = 'row g-4';

  data.games.forEach((game) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex';

    const card = document.createElement('div');
    card.className = 'card shadow-sm flex-fill border-0';
    card.style.minWidth = '0';

    if (game.rating >= 4.8) {
      card.classList.add('bg-success-subtle', 'border-success');
    } else if (game.rating < 4) {
      card.classList.add('bg-warning-subtle', 'border-warning');
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column align-items-center';

    const title = document.createElement('h5');
    title.className = 'card-title mb-2 text-center fw-bold';
    title.textContent = game.name;

    const subtitle = document.createElement('h6');
    subtitle.className = 'card-subtitle text-body-secondary text-center';
    subtitle.innerHTML = `${'⭐'.repeat(Math.round(game.rating))} <span class="ms-1">(${game.rating.toFixed(1)})</span>`;

    
    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    card.appendChild(cardBody);
    if (game.link) {
      const link = document.createElement('a');
      link.href = game.link;
      link.className = 'mb-2';
      link.target = '_blank';
      link.textContent = 'Wikipedia';
      cardBody.appendChild(link);
    }
    
    col.appendChild(card);
    gamesList.appendChild(col);
  });


  app.appendChild(gamesList);
}

main()

