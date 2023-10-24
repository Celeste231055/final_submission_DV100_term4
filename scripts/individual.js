document.addEventListener("DOMContentLoaded", function () {
  // Define API endpoint and API key
  const apiKey = "a6ca981513c9c7f4fc02008ff4ad8402";
  const movieId = getMovieIdFromURL(); // Implement this function to get the movie ID from the URL

  // Get the movie details from the API
  fetchMovieDetails(movieId);

  // Add click event listener to the "Watchlist" button
  const watchlistButton = document.querySelector(".button.btn-default");
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
      document.querySelector("h1").textContent = movie.title;
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
          title: document.querySelector("h1").textContent,
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


// Hello everyone, I know the comments are excessive but recently I tried helping my sister and had no idea what was going on her code even tho everything had comments.
// So, I wanted to explain everything well so that you can easily edit and tweak the code as you need.

$(document).ready(function(){

  // In between the brackets goes the genre. the API use numbers to denote each genre. 35 is for comedy
  // If you want to filter between two genres eg. comedy + action you can use a comma (,) or pipe (|). eg. allComedyMovies('35', '28');
  allComedyMovies('35');
  
  

})

// -----------------------------------------------------------------------------------------------------------------------------
// Here we pull the info from the API
// To see the genres and their correlating number visit this website: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee

function allComedyMovies(genre){

  // Notice the movies we're pulling in from the API. Here you can add more parameters such as cast, directors, runtime etc... 
  // Currently we are getting movies for adult=false, video=false, language=en-US, page=1, sort_by=popularity.desc, with_genres=35
  // To add a parameter check out this link https://developer.themoviedb.org/reference/discover-movie
  // eg. you want to only see movies that have a 120min runtime. Add &with_runtime.lte=120 to the end. Check website above for more info
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
              description: movie.overview
              
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
  const movieheader = $('#movieheader');
  movieheader.empty();

  // forEach is a loop. We are looping though the movies.
  // Card state = card does not exist in html yet. So don't try to select the card here
  allMovies.forEach(movie => {
      const card = $(`   
      <div class="col-12 col-md-6 col-lg-4 col-xxl-3">

          <!-- The Card -->
          <div class="card">

            <!-- Img goes here -->
              <img src="https://image.tmdb.org/t/p/original${movie.image}" class="card-img-top rounded-1" alt="${movie.title}">
              
              <!-- Overlay play icon. Bootstrap icons are treated as text so changing the font size will change the icon size -->
              <!-- ------------------------------------------------------------------------------------------------------------- -->
              <div class="card-img-overlay">
                <h1 class="card-title text-center mt-4"><i class="bi bi-play-fill"></i></h1>
              </div>

              <!-- Card Body -->
              <div class="card-body">

                <!-- Float title to the left and icon to the right. Here you can change the icon from a minus to a plus. Remember to do the same for css-->
                <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
                <div class="row">
                  <div class="col-10"><h4 class="title">${movie.title}</h4></div>
                  <div class="col-2"><i class="bi bi-dash-circle"></i></div>
                </div>

                <!-- Runtime -->
                <p>1h 44m</p>
                <!-- Description -->
                <p class="card-text">${movie.description}</p>
                
                <!-- More Info button -->
                <div class="button-wrapper" style="width: 132px;">
                  <button type="button" class="button btn-default">More Info</button>
                </div>

              </div>
          </div>
        </div>
      `)

      // ----------------------------------------------------------------------------------------------------------------------------
      // When the card is clicked go to the single movie page. This is were that functionality will go. Here's the class code for that
      // card.click(function(){
      //  window.location.href=`cocktail.html?id=${cocktail.id}`;
      // -----------------------------------------------------------------------------------------------------------------------------

      // Here we append the card to the container.
      movieContainer.append(card);

          // This area is for the card hover state. If you guys can figure out a better way to the same thing in css then please fix it :)
          // Card state = card is appended in the html. You can select card content now.

          // Hide the card body.
          $(card).find(".card-body").hide();

          // When you hover on the card something happens.
          $(card).hover(function(){
        

            //Show the rest of the card
            $(this).find(".card-body").toggle();
            
            //There is a class in css that gives the image a darker overlay
            $(this).find(".card-img-top").addClass('img-hover');

            // We want the play icon to appear when we hover over the card. It's opacity is 0 in css. When we hover over te card set the opacity to 100%.
            $(this).find(".bi-play-fill").css("opacity", "100%");
            
        
        }, function(){
        
            //Hide the card body again
            $(this).find(".card-body").toggle();

            // Remove the darker overlay. we don't need it.
            $(this).find(".card-img-top").toggleClass('img-hover');

            // Remove the play icon too
            $(this).find(".bi-play-fill").css("opacity", "0%");
        
        });

  });
}

// ----------------------------------------------------------------------------------------------
// The filters/sort will be down here I think. Here's the class code
// card.click(function(){
// window.location.href=`cocktail.html?id=${cocktail.id}`;
// ----------------------------------------------------------------------------------------------