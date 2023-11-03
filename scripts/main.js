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

    
});
