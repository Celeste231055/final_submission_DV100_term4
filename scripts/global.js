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


  $("#signin").click(function () {
    // Change the URL to the new page
    window.location.href = "../pages/signup.html";
  });


  // Check if a username is stored in local storage
  var username = sessionStorage.getItem("username");

      if (username) {
      // Create a new <span> element for the username
      var usernameSpan = $('<span></span>', {
        class: 'bi bi-person',
        text: username,
      });

      // Add the ID to the username span
      usernameSpan.attr('id', 'username');

      // Append the username <span> element to the navigation bar
      $('.navbar-collapse').append(usernameSpan);

      // Replace the "Sign In" button with a "Log Out" button
      $("#signin").replaceWith('<button id="logout" class="button btn-lg signin">Log Out</button>');   

      // Attach a click event handler to the "Log Out" button
      $("#logout").click(function () {
      // Clear the session storage
      sessionStorage.removeItem("username");

      // Replace the "Log Out" button with a "Sign In" button
      $("#logout").replaceWith('<button id="signin" class="button btn-lg signin">Sign In</button');  
      
      $("#signin").click(function () {
        // Redirect to the sign-up page when the "Sign In" button is clicked
        window.location.href = "signup.html";
      });

      // Remove the dynamically created usernameSpan
      usernameSpan.remove();
    });

  } else {
    // Update the "Sign In" text if no username is found
    $("#signin").text("Sign In");
}

  });






