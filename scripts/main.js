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
                description: movie.overview,
                release: movie.release_date,
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
    const libraryContainer = $("#movie-cards");
    libraryContainer.empty();
    
    //Loop though the movies.
    allMovies.forEach(movie => {
        
        const card = $(`
        <div class="col-12 col-md-3 mt-5 justify-content-center"> <!-- Adjust the column size as needed -->
          <!-- The Card -->
          <div class="card" value="${movie.id}">
            <!-- Img goes here -->
            <img src="https://image.tmdb.org/t/p/original${movie.image}" class="poster rounded-1" alt="${movie.title}">
            <!-- Card Body -->
            <div class="details">
              <div class="row">
                <div class="col-10"><h5 class="title">${movie.title}</h5></div>
                <div class="col-2"><i class="bi bi-plus-circle" onclick="addToWatchlist(${movie.id})"></i></div>
              </div>
              <p style="color: white;" class="pf-3">Directed by Director</p>
              <p style="color: white;" class="pf-3">1h 44m</p>
              <div class="genres">
                <span class="genre pf-4"><b>Comedy</b></span>
                <span class="genre pf-4"><b>Sitcom</b></span>
                <span class="genre pf-4"><b>Mockumentary</b></span>
              </div>
              <br>
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
        libraryContainer.append(card);

            
    });
}