movieArray=[];

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
                    <div class="col-2"><i class="bi bi-plus-circle" onclick="addToWatchlist()"></i></div>
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

        // movieArray.push{(
        // )}
        
        // // Take movie info to individual page
        // card.click(function(){
        //   window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;
        // });

        // Take movie info to individual page
        card.find(".btn-default").click(function(){
          window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;
          console.log("it works or not");
        });

        // $("#movieContainer").on('click','.btn-default',function(){
        //   window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;
        // })



        // Add to Watchlist
        card.on('click', '.bi-plus-circle', function(){
          window.location.href =`http://127.0.0.1:5501/pages/watchlist.html?id=${movie.id}`;
          console.log("it works");
        });
        
        // s
        // Here we append the card to the container.
        movieContainer.append(card);
            
            // hover state
            // Hide the card body.
            card.find(".card-body").hide();

            // When you hover on the card something happens.
            card.hover(function(){
          
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

