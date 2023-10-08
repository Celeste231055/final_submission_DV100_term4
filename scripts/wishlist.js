
$(document).ready(function(){

    // When the document loads, hide the card body.
    $("#movieContainer").find(".card-body").hide();

})

// When you hover over the image show the card body
// Function 1 = mouse enter. Function 2 = mouse leave
$("#movieContainer").find(".movieCard").hover(function(){
    
    // To make the cards overlap each other. Position absolute keeps the content set where it has been hidden.    
    $(this).css("position", "absolute")

    //z-index 1 sets the content above the rest
    $(this).css("z-index", "1")

    //This class moves the content upwards and slightly to the left and also changes the size
    $(this).addClass("card-hover")

    //Show the rest of the card
    $(this).find(".card-body").toggle();

}, function(){

    //Hide the rest of the card
    $(this).find(".card-body").toggle();

    //Set the position back to where it was: it's inherit value.
    $(this).css("position", "inherit")

    //If z-index is changed cards will override each other and overlap won't occur
    $(this).css("z-index", "1")

    //remove styling from the hover state or position and sizing of cards will be change permanently.
    $(this).toggleClass("card-hover")
    

});
    
    

