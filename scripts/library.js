$(document).ready(function(){

    // In between the brackets goes the genre. the API use numbers to denote each genre. 35 is for comedy
    allComedyMovies('35');
    
    // Clear watchlist data when the document loads: Just for the presentation, so that it looks more impressive.
    localStorage.removeItem('watchlistMovies');
    

})


// -----------------------------------------------------------------------------------------------------------------------------
// Pull info from the API

function allComedyMovies(genre){

   
  //  Api url
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

            //load cards when successful 
            displayMovies(allMovies);
            console.log(data);
        },
        error: function(data){}
            
            
    });
};

// Display the movie cards
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
                    <button type="button" class="button btn-default">More Info</button>

                </div>
            </div>
        </div>
        `)       
        
        // Take User to the Individual Movie Page when clicking on the More Info Button
        card.on('click','.btn-default',function(){
          window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;

        });
        
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
