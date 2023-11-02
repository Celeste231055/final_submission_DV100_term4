document.addEventListener("DOMContentLoaded", function () {
  // Define API endpoint and API key
  const apiKey = "a6ca981513c9c7f4fc02008ff4ad8402";
  const movieId = getMovieIdFromURL(); // Implement this function to get the movie ID from the URL

  // Get the movie details from the API
  fetchMovieDetails(movieId);

  // Add click event listener to the "Watchlist" button
  const watchlistButton = document.querySelector(".button.btn-lg");
  watchlistButton.addEventListener("click", addToWatchlist);

  // Function to fetch movie details from the API
  function fetchMovieDetails(movieId) {
      const apiBaseUrl = "https://api.themoviedb.org/3/movie/";
      const apiUrl = `${apiBaseUrl}${movieId}?api_key=${apiKey}&language=en-US`;

      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              displayMovieDetails(data);
          })
          .catch((error) => {
              console.error("Failed to fetch movie details:", error);
          });
  }

  // Function to display movie details
  function displayMovieDetails(movie) {
      // Populate HTML elements with movie data
      document.querySelector("h3").textContent = movie.title;
      document.querySelector(".director").textContent = `Director: ${movie.director}`;
      // Update other movie details as needed

      // Update movie poster
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      document.querySelector(".movie-poster img").src = posterUrl;
  }

  // Function to add movie to watchlist
  function addToWatchlist() {
      // Get the movie data (you can retrieve it from the HTML or API)
      const movieData = {
          title: document.querySelector("h3").textContent,
          director: document.querySelector(".director").textContent,
          // Include other movie data as needed
      };

      // Retrieve the current watchlist from localStorage or initialize an empty array
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

      // Check if the movie is already in the watchlist
      const isAlreadyInWatchlist = watchlist.some((item) => item.title === movieData.title);

      if (!isAlreadyInWatchlist) {
          // Add the movie to the watchlist
          watchlist.push(movieData);

          // Update the watchlist in localStorage
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert("Movie added to watchlist!");
      } else {
          alert("Movie is already in your watchlist.");
      }
  }
});



$(document).ready(function(){

  // In between the brackets goes the genre. the API use numbers to denote each genre. 35 is for comedy
  // If you want to filter between two genres eg. comedy + action you can use a comma (,) or pipe (|). eg. allComedyMovies('35', '28');
  allComedyMovies('35');
  
  

})

// -----------------------------------------------------------------------------------------------------------------------------
// Here we pull the info from the API
// To see the genres and their correlating number visit this website: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee

function allComedyMovies(genre){

 
  // Currently we are getting movies for adult=false, video=false, language=en-US, page=1, sort_by=popularity.desc, with_genres=35
  // To add a parameter check out this link https://developer.themoviedb.org/reference/discover-movie
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a6ca981513c9c7f4fc02008ff4ad8402&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  
  $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data){

          //map the api
          const allMovies = data.results.map(movie => ({
              id: movie.id,
              title: movie.title,
              image: movie.poster_path,
              description: movie.overview,
          }))

          displayMovies(allMovies);
          console.log(data);
      },
      error: function(data){}
          
          
  });
};

// Here we will display the movies
function displayMovies(allMovies){

// We will append the card to the movie container later
  const movieContainer = $('#movieContainer');
  movieContainer.empty();

  
  //Loop though the movies.
  allMovies.forEach(movie => {
      
      const card = $(`   
      <div class="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">

          <!-- The Card -->
          <div class="card" value="${movie.id}">

            <!-- Img goes here -->
              <img src="https://image.tmdb.org/t/p/original${movie.image}" class="poster rounded-1" alt="${movie.title}">
              
              <!-- Card Body -->
              <div class="details">

                <!-- Float title to the left and icon to the right. Here you can change the icon from a minus to a plus. Remember to do the same for css-->
                <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
                <div class="row">
                  <div class="col-10"><h5 class="title">${movie.title}</h5></div>
                  <div class="col-2"><i class="bi bi-plus-circle" onclick="addToWatchlist(${movie.id})"></i></div>
                </div>

                <p style="color: white;" class="pf-3">Directed by Director </Director></p>

                <!--Runtime-->
                <p style="color: white;" class="pf-3">1h 44m</p>
                <div class="genres">
                  <span class="genre pf-4"><b>Comedy</b></span>
                  <span class="genre pf-4"><b>Sitcom</b></span>
                  <span class="genre pf-4"><b>Mockumentary</b></span>
                </div>
                <br>
                <!--Description-->
                <div class="fadeout"><p class="card-text pf-3">${movie.description}</p></div>
                <!-- More Info button -->
                  <button type="button" class="button btn-sm more-info">More Info</button>

              </div>
          </div>
      </div>
      `)       

      // Take User to the Individual Movie Page when clicking on the More Info Button
      card.on('click','.more-ifo',function(){
        window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;

      });
      
      // Here we append the card to the container.
      movieContainer.append(card);

      $(card).find(".bi-plus-circle").click(function(movieId){
        $(this).attr('class', 'bi bi-check-circle');
        
      });
          
  });
}

// Function to add a movie to the watchlist
function addToWatchlist(movieId){

let movieData = JSON.stringify(movieId);
localStorage.setItem('watchlistMovies', movieData);
console.log(movieData);
}

// ----------------------------------------------------------------------------------------------
// The filters/sort will be down here I think. Here's the class code
// card.click(function(){
// window.location.href=`cocktail.html?id=${cocktail.id}`;
// ----------------------------------------------------------------------------------------------