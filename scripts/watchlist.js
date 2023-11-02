

$(document).ready(function(){

    
    getWatchlistMovies()

})


function getWatchlistMovies(){
let watchlistData = JSON.parse(localStorage.getItem('watchlistMovies'));


const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a6ca981513c9c7f4fc02008ff4ad8402&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data){

            //map the api
            const watchlistMovies = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                image: movie.poster_path,
                                
            }))

            displayMovies(watchlistMovies);
            console.log(data);
        },
        error: function(data){}
            
            
    });



};

// Here we will display the movies
function displayMovies(watchlistMovies){

  // We will append the card to the movie container later
    const movieContainer = $('#movieContainer');
    movieContainer.empty();

    
    //Loop though the movies.
    watchlistMovies.forEach(movie => {
        
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

        $(card).find(".bi-plus-circle").click(function(movieId){
          $(this).attr('class', 'bi bi-check-circle');
          
        });
            
    });
}
