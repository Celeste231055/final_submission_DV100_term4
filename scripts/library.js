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
    const movieContainer = $('#movieContainer');
    movieContainer.empty();

    
    //Loop though the movies.
    allMovies.forEach(movie => {
        
        const card = $(`   
        <div class="col-12 col-md-6 col-lg-4 col-xxl-3">

            <!-- The Card -->
            <div class="card" value="${movie.id}">

              <!-- Img goes here -->
              <i class="bi bi-play-fill play-btn align-self-center"></i>
                <img src="https://image.tmdb.org/t/p/original${movie.image}" class="card-img-top rounded-1" alt="${movie.title}">
                
                <!-- Card Body -->
                <div class="card-body">

                  <!-- Float title to the left and icon to the right. Here you can change the icon from a minus to a plus. Remember to do the same for css-->
                  <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
                  <div class="row">
                    <div class="col-10"><h4 class="title">${movie.title}</h4></div>
                    <div class="col-2"><i class="bi bi-plus-circle" onclick="addToWatchlist(${movie.id})"></i></div>
                  </div>
                  
                  <!-- More Info button -->
                  <div class="button-wrapper" style="width: 132px;">
                    <button type="button" class="button btn-default">More Info</button>
                  </div>

                </div>
            </div>
          </div>
        `)       
        

        card.on('click','.btn-default',function(){
          window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;

        })
        
        // Here we append the card to the container.
        movieContainer.append(card);

        $(card).find(".bi-plus-circle").click(function(){
          $(this).attr('class', 'bi bi-check-circle');
          
        });
        
        $(card).find(".btn-default").hide();

        $(card).hover(function(){
          $(card).find(".play-btn").css("opacity", "100%");
          $(card).find(".btn-default").toggle();
          $(card).find(".card-img-top").addClass("img-overlay");

        }, function(){
          $(card).find(".play-btn").css("opacity", "0%");
          $(card).find(".btn-default").toggle();
          $(card).find(".card-img-top").toggleClass("img-overlay");
        });
            
    });
}




function addToWatchlist(movieId){
  
 // Retrieve existing watchlist from local storage or initialize an empty array
 let watchlist = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

 // Check if the retrieved data from localStorage is an array, if not, initialize an empty array
 if (!Array.isArray(watchlist)) {
   watchlist = [];
 }

 // Check if the movieId is not already in the watchlist
 if (!watchlist.includes(movieId)) {
   // Add the movieId to the watchlist array
   watchlist.push(movieId);

   // Save the updated watchlist array back to local storage
   localStorage.setItem('watchlistMovies', JSON.stringify(watchlist));
   console.log(watchlist)
 }
  
}

