$(document).ready(function() {
    // Check if a username is stored in session storage
    var username = sessionStorage.getItem("username");
    
    // Create a new <h3> element for the Welcome text
    var headingThree = $('<h3></h3>', {
        class: 'Welcome',
        text: "Welcome, " + username + "!",
    });

    if (username) {
        // A username is found in session storage, indicating the user is logged in.

        // Append the headingThree <h3> element to the box
        $('.box').prepend(headingThree);

        // Attach a click event handler to the "Log Out" button
        $("#logout").click(function () {
            // Remove the header 
        headingThree.remove();
    });

    } else {
        // No username is found in session storage, indicating the user is not logged in.

        // Hide the "Welcome!" message
        headingThree.hide();
    }


    let slideIndex = 1;
    showSlides(slideIndex);

    $(".prev").click(function() {
        plusSlides(-1);
    });

    $(".next").click(function() {
        plusSlides(1);
    });

    $(".dot").click(function() {
        currentSlide($(this).index() + 1);
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = $(".mySlides");
        let dots = $(".dot");
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        slides.css("display", "none");
        dots.removeClass("active");
        slides.eq(slideIndex - 1).css("display", "block");
        dots.eq(slideIndex - 1).addClass("active");
    }

    getallComedyMovies("35")
    allComedyMovies("35")
});






 function getallComedyMovies(comedy) {


    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=ff17121dd2ba8f02079e0518b75a1dfb&with_genres=${comedy}&sort_by=popularity.desc`

    $.ajax({
        
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function(data) {

            // Map the results to my object

            const movies = data.results.map(movies =>({

                id: movies.id,
                title: movies.title,
                sliderImage: movies.backdrop_path,
                description: movies.overview



            }))

            console.log(movies)
            displaySliderMovies(movies)
        },

        error: function(error){
            //Handle error
        }




    })


 }


function  displaySliderMovies(movies) {

    const moviesContainer = $(".slideshow-container")
    moviesContainer.empty()

    movies.forEach(movie => {
        
        const slider = $(`

        
        <div class="mySlides fade data-id="${movie.id}">
        <div class="numbertext pf-1">1 / 3</div>
        <img class="responsive-img" src="https://image.tmdb.org/t/p/original${movie.sliderImage}" style="width:100%;">
        <!-- Caption -->
        <div class="carousel-caption row-gap-3">
          <h1>${movie.title}</h1>
    
          <p class="pf-1" style="line-height: 0;">Randall Einhorn </p>
    
    
          <!-- Badges -->
          <div class="badges">
            <span class="badge"><b>Comedy</b></span>
            <span class="badge"><b>Sitcom</b></span>
            <span class="badge"><b>Mockumentary</b></span>
          </div>
    
          <!-- Synopsis -->
          <p> ${movie.description}</p>
    
          <!-- Button -->
          <div>
            <button type="button" class="button btn-lg"><span class="bi bi-play-fill">Watch Now</span></button>
          </div>
        </div>
      </div>

      
        
        
        `)


        moviesContainer.append(slider)
    });
    
}


function allComedyMovies(genre){

   
    //  Api url
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
              rating: movie.vote_average,
              genre1: movie.genre_ids[0],
              genre2: movie.genre_ids[1],
              genre3: movie.genre_ids[2]
            }));
  
              
  
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
      const movieContainer = $('#movie-cards');
      movieContainer.empty();
      
      //Loop though the movies.
      allMovies.forEach(movie => {
          
          const card = $(`   
          <div class="col-12 col-md-6 col-lg-4 col-xxl-3 mt-5 d-flex justify-content-center">
  
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
  
                    <!--Rating-->
                    <p style="color: white;" class="pf-3">Rating: ${movie.rating} <i class="bi bi-star-fill"></i></p>
                    <div class="genres">
                      <span class="genre pf-4"><b>${movie.genre1}</b></span>
                      <span class="genre pf-4"><b>${movie.genre2}</b></span>
                      <span class="genre pf-4"><b>${movie.genre3}</b></span>
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
          
          //Genres
          const genres = genreNames = ([movie.genre1, movie.genre2, movie.genre3]);
          const genreSpans = genres.map(genre => `<span class="genre pf-4"><b>${genre}</b></span>`).join('');
          card.find('.genres').html(genreSpans);
          
          // Take User to the Individual Movie Page when clicking on the More Info Button
          card.on('click','.btn-default',function(){
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
  