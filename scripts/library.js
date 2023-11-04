$(document).ready(function(){

    // In between the brackets goes the genre. the API use numbers to denote each genre. 35 is for comedy
    allComedyMovies('35');
    
    // // Clear watchlist data when the document loads: Just for the presentation, so that it looks more impressive.
    // localStorage.removeItem('watchlistMovies');
    
    let genreFilter = 35;
    let yearFilter = undefined;
    let ratingFilter = 0.0;

    ///////////////////////////////////////////
    // Filter Attempts

    //when a drop down button is clicked:
    $("a[id='genre']").click(function(){
      genreFilter = '35, ' + $(this).attr('value');
      $("#genre-dropdown").text($(this).text());
      filter();
    });

    $("a[id='year']").click(function(){
      yearFilter = $(this).text();
      $("#year-dropdown").text(yearFilter);
      filter();
    });
    
    $("a[id='rating']").click(function(){
      ratingFilter = $(this).attr('value');
      $("#rating-dropdown").text($(this).text());
      filter();
    });

    $("button[id='reset-filters']").click(function(){
      $("#genre-dropdown").text('Genre');
      $("#year-dropdown").text('Year');
      $("#rating-dropdown").text('Rating');

      genreFilter = 35;
      yearFilter = undefined;
      ratingFilter = 0.0;
      
      filter();
    });

    function filter () {
      console.log("genre: " + genreFilter + ",\nyear: " + yearFilter + ",\nrating: " + ratingFilter);
      allComedyMovies(genreFilter, yearFilter, ratingFilter);
    }
})

// -----------------------------------------------------------------------------------------------------------------------------
// Pull info from the API

function allComedyMovies(genre, year, rating) {
  
  let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a6ca981513c9c7f4fc02008ff4ad8402&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  
  if (year != undefined || rating != undefined)
  {
    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a6ca981513c9c7f4fc02008ff4ad8402&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&primary_release_year=${year}&vote_average.gte=${rating}`;
  }
  else{
    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a6ca981513c9c7f4fc02008ff4ad8402&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  }
  
   console.log(genre+year+rating)
  //  Api url
    
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data){
          //map the api
          allMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            description: movie.overview,
            release: movie.release_date,
            language: movie.original_language,
            genres: movie.genre_ids,
            rating: movie.vote_average
          }));

          // Find a container element to append the badges
          var genreContainer = $(".genres");

          // Loop through each genre ID and create a badge for each movie
        allMovies.forEach((movie) => {
          movie.genres.forEach((genreId) => {
              // Map genre IDs to their corresponding names using the mapGenreIdToName function
              var genreName = mapGenreIdToName(genreId); 

              // Create a badge element and add it to the container
              var badge = $('<span class="genre pf-4"><b>' + genreName + '</b></span>');
              genreContainer.append(badge);
          });
        });

        displayMovies(allMovies);
        console.log(allMovies);
        console.log(data);

    },
    error: function(data){}
              
    });

    
};

function mapGenreIdToName(genreId) {
  // Define a mapping of genre IDs to names
  var genreMapping = {
    
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    
  };
  
  // Check if the genreId is in the mapping, and return the corresponding name
  if (genreMapping.hasOwnProperty(genreId)) {
      return genreMapping[genreId];
  }
  
  // Return a default value or an empty string if the genreId is not found
  return 'Unknown';
}

// Here we will display the movies
function displayMovies(allMovies){

  // Create a variable for the movie Container
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

                  <!--Runtime-->
                  <p style="color: white;" class="pf-3">1h 44m</p>
                  <div class="genres">
                  ${movie.genres.map(genreId => `<span class="genre">${mapGenreIdToName(genreId)}</span>`).join(' ')}
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
        card.on('click','.more-info',function(){

          window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;

        })
        
        // Append the card to the container.
        movieContainer.append(card);

        //when btn is clicked change icon class/display check icon
        $(card).find(".bi-plus-circle").click(function(){
          $(this).attr('class', 'bi bi-check-circle');
          
        });
        
    });
}


//create function that will be called when plus btn is clicked
function addToWatchlist(movieId) {

  
  // get watchlist info from local storage or create an empty array. We want to store everything in one array not hundreds of them.
  let watchlist = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

  
  // If watchlist is !not an array then make it one. You shall not pass unless you are an array!
  if (!Array.isArray(watchlist)) {
      watchlist = [];
  }

  // If this movie id is not already in the watchlist then push it to watchlist array. Aka no doubles
  if (!watchlist.includes(movieId)) {
  
  // Add movieId to watchlist
  watchlist.push(movieId);
  }

  // Save again to local storage
  localStorage.setItem('watchlistMovies', JSON.stringify(watchlist));
  console.log(watchlist);
};



