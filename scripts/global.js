$(document).ready(function () {
    var searchButton = $("#search-toggle");
    var searchInput = $("#search-input");
    
    // Function to hide search input and show search button
    function hideSearchInput() {
      searchInput.hide();
      searchButton.show();
    }
  
    // Hide the input initially
    hideSearchInput();
  
    // Toggle the input on button click
    searchButton.click(function (e) {
      e.stopPropagation(); // Prevent click on input from triggering the document click event
      searchInput.toggle();
  
      if (searchInput.is(":visible")) {
        searchButton.hide();
      }
    });
  
    // Click anywhere on the document to hide the search input
    $(document).click(function (e) {
      if (!searchButton.is(e.target) && !searchInput.is(e.target)) {
        hideSearchInput();
      }
    });
  });
  
  
  
  
  
  
  