$(document).ready(function () {
  // Define your API key
  const apiKey = 'a6ca981513c9c7f4fc02008ff4ad8402';

  // Fetch movie details and load content
  loadMovieContent(apiKey);

  // Add to watchlist button click handler
  $('#addToWatchlistBtn').on('click', function () {
      addToWatchlist();
  });
});

function loadMovieContent(apiKey) {
  const movieId = new URLSearchParams(window.location.search).get('id');
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        $("#detailed-posterJ").html(
          `<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Movie Poster">`
        );
        $("#detailed-movieNameJ").text(data.title);

        // Extract the year from the release date
        if (data.release_date) {
          const releaseYear = new Date(data.release_date).getFullYear();
          $("#detailed-YearJ").text(`Release Date: ${releaseYear}`);
        } else {
          $("#detailed-YearJ").text("Release Date: Unknown");
        }
        
        $("#detailed-runtimeJ").text(`Runtime: ${data.runtime} minutes`);
        $("#detailed-plotJ").text(data.overview);
        $("#detailed-ratingJ").text(`Rating: ${data.vote_average}`);

        // Fetch and display director, actors, and genre
        fetchCrew(movieId, apiKey);
        fetchCast(movieId, apiKey);

        if (data.genres) {
          // If the data contains genres, directly display them
          const genres = data.genres.map((genre) => genre.name).join(", ");
          $("#detailed-genreJ").text(`Genre: ${genres}`);
        } else if (data.genre_ids) {
          // If there are genre IDs, fetch and display them
          fetchGenres(data.genre_ids, apiKey);
        } else {
          $("#detailed-genreJ").text("Genre: Unknown");
        }

        fetchTrailer(movieId, apiKey);
      },
      error: function (error) {
          console.error(error);
      }
  });
}

function fetchCrew(movieId, apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
          const director = data.crew.find(member => member.job === 'Director');
          if (director) {
              $('#detailed-directorJ').text(`Director: ${director.name}`);
          }
      },
      error: function (error) {
          console.error(error);
      }
  });
}

function fetchCast(movieId, apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
          const actors = data.cast.slice(0, 5).map(member => member.name).join(', ');
          $('#detailed-actorsJ').text(`Actors: ${actors}`);
      },
      error: function (error) {
          console.error(error);
      }
  });
}

function fetchGenres(genreIds, apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
          const genres = genreIds.map(genreId => {
              const genre = data.genres.find(g => g.id === genreId);
              return genre ? genre.name : '';
          }).join(', ');
          $('#detailed-genreJ').text(`Genre: ${genres}`);
      },
      error: function (error) {
          console.error(error);
      }
  });
}

function fetchTrailer(movieId, apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
          const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          if (trailer) {
              // Embed the trailer video using an iframe
              const iframe = document.createElement('iframe');
              iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
              iframe.allowfullscreen = true;
              $('#detailed-trailer').append(iframe);
          }
      },
      error: function (error) {
          console.error(error);
      }
  });
}

function addToWatchlist() {
  const selectedMovieId = new URLSearchParams(window.location.search).get('id');
  // You can fetch additional movie details here
  const selectedMovie = {
      id: selectedMovieId,
      // Other movie details
  };

  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(selectedMovie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  alert('Movie added to your watchlist!');
}

// Call loadMovieContent when the movie detail page loads
loadMovieContent();
