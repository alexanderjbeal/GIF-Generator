$(document).ready(function() {

    // Function to pause GIFs
    $("#pauseGif").click(function () {
        // $("#images").empty();
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("state");
        console.log(state);
        console.log($(this).attr("animate"));
        console.log($(this).attr("still"));
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate");
        } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
    });

    // Listens for button event - renders button - allows additional buttons to be made

    // Initial array of animals
    var cool = ["Godzilla", "Golden Retreivers", "Michael Jordan", "Shark Week", "Blockchain"];
    console.log(cool);
    // displayGiphy function re-renders the HTML to display the appropriate content
    function displayGiphy() {

        //----------This empties the images DIV-----------
        $("#images").empty();

        var animal = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
           
            //------ Loops for 10 imgs ------
            for (var i = 0; i < 10; i++) {
                // Creating a div to hold the animals
                var coolDiv = $("<div class='gif-image'>");

                // Storing the rating data
                var rating = response.data[i].rating;
                console.log(response.data[i].rating);
                console.log(response.data[i].images.original.url);
                console.log(response.data[i].images.original_still.url);

                // Creating an element to have the rating displayed
                var rated = $('<p class="rating">').html("Rating: " + rating);

                // Displaying the rating
                coolDiv.append(rated);

                // Retrieving the URL for the image
                var imgURL = response.data[i].images.fixed_height_still.url;
                var imgAnimate = response.data[i].images.fixed_height.url;
                console.log("animate" + imgAnimate);
                console.log("still" + imgURL);

                var image = $("<img>").attr({
                    src: imgURL,
                    class: "giph-image",
                    state: "still",
                    still: imgURL,
                    animate: imgAnimate,
                    id: "image"+i,
                })

                // Appending the image
                 coolDiv.append(image);

                // Putting the entire image above the previous giphy image
                $("#images").append(coolDiv);

            }
        });
    }

    // Function for displaying gif buttons
    function renderButtons() {

        // Deleting the animals prior to adding new giphy
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-container").empty();

        // Looping through the array of animals
        for (var i = 0; i < cool.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animals to our button
            a.addClass("animals gif-button");
            // Adding a data-attribute
            a.attr("data-name", cool[i]);
            // Adding a data-attribute
            a.attr("id", "button");
            // Providing the initial button text
            a.text(cool[i]);
            // Adding the button to the buttons-view div
            $("#button-container").append(a);
        }
    }

    // ----------This function handles events where an animal button is clicked----------
    $("#generate").on("click", function (event) {
        
        event.preventDefault();
        // This line grabs the input from the textbox
        var newCool = $("#gif-input").val().trim();

        // Adding animal from the textbox to our array
        cool.push(newCool);

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
        $("#gif-input").val('');
    });

    // Adding a click event listener to all elements with a class of "animals"
    $(document).on("click", ".animals", displayGiphy);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

   
    $(document).on("click", ".giph-image", function (){
        console.log("img.giph clickfunction");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("state");
        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate");
        } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
    });

});