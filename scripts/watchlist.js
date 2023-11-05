

$(document).ready(function(){

    
  getWatchlistMovies()

})

// the cards get loaded in the moment the api call is successful. This time, however, I'm getting multiple api calls at once 
// So when the first movie is pulled from the api, the cards are displayed using that movie. Same info on all cards.
//  async allows you to pause a function until the 'promise' something else is first resolved. In this case it waits until all the movies are pulled from the api.

async function getWatchlistMovies(){

//get movies from locale storage
let watchlistData = JSON.parse(localStorage.getItem('watchlistMovies'));
console.log(watchlistData)

//an array that stores the movie data
let watchlistArr = [];

// get the api information for each of the ids in the watchlist.
for(let i=0; i<watchlistData.length; i++){
  const apiUrl = `https://api.themoviedb.org/3/movie/${watchlistData[i]}?api_key=a6ca981513c9c7f4fc02008ff4ad8402`;

  // try and catch errors is essentially the same as the success: and error: from the ajax request
  try {
    //get the api url and wait for it to load all of the api calls: watchlistData.length
    const results = await fetch(apiUrl);
    //get the Json data and wait for it to load all of the information: ${watchlistData[i]}
    const data = await results.json();

    // create variable and store the data in here.
    const movie = {
        id: data.id,
        title: data.title,
        image: data.poster_path,
        description: data.overview,
        rating: data.vote_average, 
    };

    //after getting an id's data push it to the array watchlistArr.
    watchlistArr.push(movie);
    
  } catch (error) {}

};

displayMovies(watchlistArr);

};

// Display the movies
function displayMovies(watchlistArr){

  const movieContainer = $('#movieContainer');
  movieContainer.empty();

  
  // Loop though the movies
  watchlistArr.forEach(movie => {
      
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
                  <div class="col-2"><i class="bi bi-dash-circle" onclick="addToWatchlist(${movie.id})"></i></div>
                </div>

                <!--Rating-->
                <p style="color: white;" class="pf-3">Rating: ${movie.rating} <i class="bi bi-star-fill"></i></p>
                
                <br>
                <!--Description-->
                <div class="fadeout"><p class="card-text pf-3">${movie.description}</p></div>
                <!-- More Info button -->
                  <button type="button" class="button btn-default">More Info</button>

              </div>
          </div>
      </div>
      `)       
      
 

      card.on('click','.btn-default',function(){
        window.location.href =`http://127.0.0.1:5501/pages/individual.html?id=${movie.id}`;

      })
      
      // Here we append the card to the container.
      movieContainer.append(card);

      //when btn is clicked select the card clicked on and remove it.
      $(card).find(".bi-dash-circle").click(function(){
      $(card).remove()
        
      });
          
  });
}