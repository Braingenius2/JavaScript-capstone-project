import filterTopMovies from './filtertopmovies.js';
import MovieDetailsPopup from './moviedetailspopup.js';
import fetchLikes from './involvementapi.js';

const showCards = async (mainContainer) => {
  const newSection = document.createElement('section');
  const ulElement = document.createElement('ul');

  try {
    const top10Movies = await filterTopMovies();
    const appId = 'lwgScw6o5MEbQLNCvzXw';

    // Fetch likes from the involvement API
    const likesData = await fetchLikes(appId);

    newSection.classList.add('movies-section');
    newSection.innerHTML = `
      <h2>Movies</h2>
    `;
    mainContainer.appendChild(newSection);

    ulElement.classList.add('ul-cards');
    newSection.appendChild(ulElement);

    top10Movies.forEach((movie) => {
      const liElement = document.createElement('li');
      liElement.classList.add('li-card');

      const imageElement = document.createElement('img');
      imageElement.src = movie.image;
      imageElement.addEventListener('click', () => { MovieDetailsPopup(movie); });

      const nameElement = document.createElement('h3');
      nameElement.textContent = movie.name;

      // Find the likes for this movie
      const movieLikesData = likesData.find((like) => like.item_id === movie.id.toString());
      const movieLikes = movieLikesData ? movieLikesData.likes : 0;

      const ratingElement = document.createElement('p');
      ratingElement.textContent = `Rating: ${movie.rating} | Likes: ${movieLikes}`;

      const commentsButton = document.createElement('button');
      commentsButton.classList.add('comments-btn');
      commentsButton.textContent = 'Comments';

      const reservationsButton = document.createElement('button');
      reservationsButton.classList.add('reservations-btn');
      reservationsButton.textContent = 'Reservations';

      liElement.appendChild(imageElement);
      liElement.appendChild(nameElement);
      liElement.appendChild(ratingElement);
      liElement.appendChild(commentsButton);
      liElement.appendChild(reservationsButton);

      ulElement.appendChild(liElement);
    });
  } catch (error) {
    return null;
  }
  return null;
};

export default showCards;
