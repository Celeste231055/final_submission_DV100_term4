function loadMovieContent() {
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
        var dir = response.Director;
  
        var name = response.Title;
        var act = response.Actors;
        var img = response.Poster;
        var year = response.Year;
        var rate = response.imdbRating;
        var tim = response.Runtime;
        var plo = response.Plot;
        var gen = response.Genre;
        //After getting th movie info it is then stored in a temporary obj to then be sent to the array of objects called mArray in Local Storage
  
        var tempObj = {
          movieName: name,
          director: dir,
          listOfActors: act,
          poster: img,
          year: year,
          time: tim,
          rating: rate,
          plot: plo,
          genre: gen
        }
        //Here the temporary onj is sent to be added to the movie array
       // console.log(tempObj);
        moviesArray.push(tempObj);
  
        //console.log(moviesArray[i]);
  
      }

  function addMoviesToLibraryS(x) {
    sessionStorage.setItem("watchlistMovies", x);
    console.log(x);
    //var t = sessionStorage.getItem("selectedMovie");
    //console.log("t ="+t);
  }
  function addMoviesToLibrary(t) {
    //when a user clicks on a movie it adds the movie info to the detailed page
  
    //First calling the saved data
    var str = localStorage.getItem("mArray");
  
    var parsedArr = JSON.parse(str);
  
    moviesArray = parsedArr;
  
    //Displaying the data
    //console.log(moviesArray[t].movieName);
    var strPoster = "<img src=" + moviesArray[t].poster + " width=\"150px\" height=\"225px\"></img>";
  
    $("#detailed-posterJ").append(strPoster);
    $("#detailed-movieNameJ").append(moviesArray[t].movieName);
    $("#detailed-YearJ").append(moviesArray[t].year);
    $("#detailed-directorJ").append(moviesArray[t].director);
    $("#detailed-actorsJ").append(moviesArray[t].listOfActors);
    $("#detailed-runtimeJ").append(moviesArray[t].time);
    $("#detailed-plotJ").append(moviesArray[t].plot);
    $("#detailed-ratingJ").append(moviesArray[t].rating);
    $("#detailed-genreJ").append(moviesArray[t].genre);
  
  
  }
  
  function addToWatchlist() {
  
    //This function adds the movie selected to a watchlist stored on the loacl storage for the user
  
    var str = localStorage.getItem("wArray");
  
    var parsedArr = JSON.parse(str);
    localWatchlist = parsedArr;
    console.log(localWatchlist);
    var selec = sessionStorage.getItem("watchlistMovies")
    let isInWatch = false;
    for (let l = 0; l < localWatchlist.length; l++) {
      if (selec == localWatchlist[l]) {
        alert("Movie already added!");
        isInWatch = true;
      }
    }
    if (isInWatch == false) {
      localWatchlist.push(sessionStorage.getItem("watchlistMovies"));
      var jsonWatchlistArr = JSON.stringify(localWatchlist);
      localStorage.setItem("wArray", jsonWatchlistArr);
      alert("Movie added to watchlist!");
    }
  
    console.log(localWatchlist);
    
  }
  
  function detailedPage() {
    //This function runs when the detailed page loads and gets the stored selected movie
    var t = sessionStorage.getItem("watchlistMovies");
    console.log("t =" + t);
    addMoviesToLibrary(t);
  }
  function showMovies() {
  
    //This code displays the movies on the library page by adding info to a default div 25 times
    var str = localStorage.getItem("mArray");
  
    var parsedArr = JSON.parse(str);
    //console.log(parsedArr);
    moviesArray = parsedArr;
    console.log("showMoviesRuns");
    console.log(moviesArray);
    
    for (let x = 0; x < moviesArray.length; x++) {
      var addDiv = "<div onmouseenter=\"addMoviesToLibraryS(" + x + ")\" class=\"col\"> <div class=\"movie-card\">  <div id=\"library-image1\"> <img src=" + moviesArray[x].poster + " class='card-img-top' alt'...'></div>     <div class=\"card-body\"> <div id=\"library-title1\"><h5 class='card-title'> <a href='individual.html'>" + moviesArray[x].movieName + " </a></h5></div> <div  id=\"button btn-default\"><a href='individual.html' class='button btn-default'>Play</a></div><div onclick  = 'addToWatchlist()' id=\"button btn-default\"> <a href='#' class='button btn-default'>Add</a></div>  </div>     </div> </div>";
      $("#movies").append(addDiv);
    }
  }
  function loadWatchlist() {
    var str = localStorage.getItem("wArray");
  
    var parsedArr = JSON.parse(str);
  
    localWatchlist = parsedArr;
    console.log(localWatchlist);
    var str = localStorage.getItem("mArray");
  
    var parsedArr = JSON.parse(str);
    //console.log(parsedArr);
    moviesArray = parsedArr;
    for (let x = 0; x < localWatchlist.length; x++) {
      var moviePos = localWatchlist[x];
  
  
  
      var addDiv = "<div onmouseenter=\"addMoviesToLibraryS(" + x + ")\" class=\"col\"> <div class=\"movie-card\">  <div id=\"library-image1\"> <img src=" + moviesArray[x].poster + " class='card-img-top' alt'...'></div>     <div class=\"card-body\"> <div id=\"library-title1\"><h5 class='card-title'> <a href='individual.html'>" + moviesArray[x].movieName + " </a></h5></div> <div  id=\"button btn-default\"><a href='individual.html' class='button btn-default'>Play</a></div><div onclick  = 'addToWatchlist()' id=\"button btn-default\"> <a href='#' class='button btn-default'>Add</a></div>  </div>     </div> </div>";
      $("#watchlist-content").append(addDiv);
    }
  }
  
