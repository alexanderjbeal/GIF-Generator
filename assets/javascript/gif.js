$(document).ready(function() {


    function displayArcher(){
        $("#images").html('<img id="stupidTest" height="100" width="100" src="https://vignette4.wikia.nocookie.net/archer/images/f/fb/Cheryl_Tunt01.png/revision/latest/scale-to-width-down/1000?cb=20151013030824" state="still" animate="https://vignette2.wikia.nocookie.net/archer/images/3/3f/Sterling_Archer_Standing_POSE.png/revision/latest?cb=20151123090437" still="https://vignette4.wikia.nocookie.net/archer/images/f/fb/Cheryl_Tunt01.png/revision/latest/scale-to-width-down/1000?cb=20151013030824">');
        console.log("display archer fucntion fired");

    }
    //----------Function to Pause Giphs ----------
    $("#stupidTest").click(function () {
        console.log("stupidtest click function");
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

    // LISTENS FOR BUTTON EVEN --- RENDERS BUTTONS ---ALLOWS ADDITIONAL BUTTONS TO BE MADE------

    // Initial array of animals
    var animals = ["Dogs", "Hippo", "Giraffe", "Snail", "Orca", "Elephant"];
    console.log(animals);
    // displayGiphy function re-renders the HTML to display the appropriate content
    function displayGiphy() {

        //----------This empties the images DIV-----------
        $("#images").empty();


        var animal = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

        //------EXAMPLE URL FROM GIPHY ----
        // http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
           
            //------ Loops for 10 imgs ------
            for (var i = 0; i < 10; i++) {
                // Creating a div to hold the animals
                var animalDiv = $("<div class='animal_gif'>");

                // Storing the rating data
                var rating = response.data[i].rating;
                console.log(response.data[i].rating);
                console.log(response.data[i].images.original.url);
                console.log(response.data[i].images.original_still.url);

                // Creating an element to have the rating displayed
                var pOne = $('<p class="rating">').html("Rating: " + rating);

                // Displaying the rating
                animalDiv.append(pOne);
                // $("#images").html(pOne);

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
                 animalDiv.append(image);
                //$("#images").html(image);

                // Putting the entire image above the previous giphy image
                $("#images").append(animalDiv);

                // ---PUTTING IMGS AT BOTTM OF PAGE ------
                // $("#ryanG").arrt();

            }
        });
    }
    


    // ----------Function for displaying giph buttons----------
    function renderButtons() {

        // Deleting the animals prior to adding new giphy
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-container").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animals to our button
            a.addClass("animals gif-button");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Adding a data-attribute
            a.attr("id", "button");
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#button-container").append(a);
        }
    }

    // ----------This function handles events where an animal button is clicked----------
    $("#addAnimal").on("click", function (event) {
        
        event.preventDefault();
        // This line grabs the input from the textbox
        var newAnimal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(newAnimal);

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
        $("#animal-input").val('');
    });

    // Adding a click event listener to all elements with a class of "animals"
    $(document).on("click", ".animals", displayGiphy);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

   
    $(document).on("click", ".giph-image", function (){
        console.log("img.giph clickfunction");
        // $("#images").empty();
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