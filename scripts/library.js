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
    const movieContainer = $('#movieContainer');
    movieContainer.empty();

    // forEach is a loop. We are looping though the movies.
    // Card state = card does not exist in html yet. So don't try to select the card here
    allMovies.forEach(movie => {
        const card = $(`   
        <div class="col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center mt-4">

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
                    <div class="col-10"><h5 class="title">${movie.title}</h5></div>
                    <div class="col-2"><h4><i class="bi bi-plus-circle"></i></h4></div>
                  </div>

                  <!-- Runtime -->
                  <p>1h 44m</p>
                  <!-- Description -->
                  <p class="card-text">${movie.description}</p>
                  
                  <!-- More Info button -->
                  <!-- More Info button -->
                    <button type="button" class="button btn-sm more-info">More Info</button>

                </div>
            </div>
          </div>
        `)})

        // ----------------------------------------------------------------------------------------------------------------------------
        // When the card is clicked go to the single movie page. This is were that functionality will go. Here's the class code for that
        // card.click(function(){
        //  window.location.href=`cocktail.html?id=${cocktail.id}`;
        // -----------------------------------------------------------------------------------------------------------------------------

        // Here we append the card to the container.
        movieContainer.append(card);

        $(card).find(".bi-plus-circle").click(function(movieId){
          $(this).attr('class', 'bi bi-check-circle');

            // This area is for the card hover state. If you guys can figure out a better way to the same thing in css then please fix it :)
            // Card state = card is appended in the html. You can select card content now.

            // Hide the card body.
            $(card).find(".more-info").hide();
            $(card).find(".card-body").hide();
            $(card).find(".play-btn").hide();

            // When you hover on the card something happens.
            $(card).hover(function(){
          

              //Show the rest of the card
              $(card).find(".play-btn").toggle();
              $(card).find(".more-info").toggle();
              $(card).find(".card-body").toggle();
              
              //There is a class in css that gives the image a darker overlay
              $(card).find(".card-img-top").addClass("img-overlay");

              // We want the play icon to appear when we hover over the card. It's opacity is 0 in css. When we hover over te card set the opacity to 100%.
              $(card).find(".play-btn").css("opacity", "100%");
              
          
          }, function(){
          
              //Hide the card body again
              $(card).find(".card-body").toggle();
              $(card).find(".play-btn").css("opacity", "0%");
              $(card).find(".play-btn").toggle();
              $(card).find(".more-info").toggle();
              $(card).find(".card-img-top").toggleClass("img-overlay");

              // Remove the darker overlay. we don't need it.
              $(this).find(".card-img-top").toggleClass('img-hover');

              // Remove the play icon too
              $(this).find(".bi-play-fill").css("opacity", "0%");
          
          });

    });
}