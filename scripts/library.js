
$(document).ready(function(){

    // In between the brackets goes the genre. the API use numbers to denote each genre. 35 is for comedy
    // If you want to filter between two genres eg. comedy + action you can use a comma (,) or pipe (|). eg. allComedyMovies('35', '28');

    allComedyMovies('35');
    
});

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
          const allMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            description: movie.overview,
            release: movie.release_date,
            language: movie.original_language,
            genres: movie.genre_ids,
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
        
        // Here we append the card to the container.
        movieContainer.append(card);

        $(card).find(".bi-plus-circle").click(function(movieId){
          $(this).attr('class', 'bi bi-check-circle');
          
        });
            
    });
}

function createYearFilter(allMovies) {
  const years = [...new Set(allMovies.map(movie => new Date(movie.release).getFullYear()) )];
  years.sort((a, b) => b - a); // Sort years in descending order
    

  const dropdown = $('.dropdown-menu');
  years.forEach(year => {
      const item = `<li><a class="dropdown-item" data-year="${year}">${year}</a></li>`;
      dropdown.append(item);
      console.log(years)
  });

  // Add click event to the filter items
  dropdown.find('.dropdown-item').click(function() {
      const selectedYear = $(this).data('year');
      // Your code to filter movies by the selected year goes here
  });
}

// Function to add a movie to the watchlist
function addToWatchlist(movieId){
  
  let movieData = JSON.stringify(movieId);
  localStorage.setItem('watchlistMovies', movieData);
  console.log(movieData);
}


