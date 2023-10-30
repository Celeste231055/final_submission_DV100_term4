

$(document).ready(function(){

    
    getWatchlistMovies()

})


function getWatchlistMovies(){
let watchlistData = JSON.parse(localStorage.getItem('watchlistMovies'));
console.log(watchlistData)
  
forEach()
const apiUrl = `https://api.themoviedb.org/3/movie/${watchlistData}?api_key=a6ca981513c9c7f4fc02008ff4ad8402`;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data){
          console.log(data)

            //map the api
            const watchlist = data.map(movie => ({
              id: movie.id,
              title: movie.title,
              image: movie.poster_path,
              description: movie.overview
              
          }))
            let id = data.id
            console.log(id)

            displayMovies(watchlist);
            console.log(data);
        },
        error: function(error){
          console.error("error", error);

        }
            
            
    });



};

// Here we will display the movies
function displayMovies(watchlist){

  // We will append the card to the movie container later
    const movieContainer = $('#movieContainer');
    movieContainer.empty();

    
    //Loop though the movies.
    watchlist.forEach(movie => {
        
        const card = $(`   
        <div class="col-12 col-md-6 col-lg-4 col-xxl-3">

            <!-- The Card -->
            <div class="card">

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
