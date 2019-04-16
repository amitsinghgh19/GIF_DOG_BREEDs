$(document).ready (function() {
    //alert("test");
    //SETUP VARIABLES
    //===============================================================================================================================================
    var authKey     = "2drJ9YvIGdDUhUtFFymN9Jrmv4wNzyLt";
    var queryLimit=6;
    var gifRating;
    var newGifDiv;
    var index = 0;
    var queryTerm;
    var newURL;
    var video;
    var gifUrl;
    // Search Parameters
    var queryTermArray   =['Corgi','American Bulldog','Bichon Frise','Chihuahua','Dachshund', 'German Shepherd', 'Greyhound', 'Maltese', 'Pug', 'Rottweiler', 'Samoyed', 'Tibetan Terrier'];

    var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key="+authKey+"&limit="+queryLimit+"&q="
    //http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5


    //variable to Track number of results
    var resultsCounter = 0;

    //MAIN PROCESS
    //===============================================================================================================================================


    // add buttons for queryTermArray
    function addButtons() {
        while (index < queryTermArray.length) {
            $("#buttons").append("<button class='btn btn-primary thisButton mx-1 my-1' data-topic='" + queryTermArray[index] + "'>" + queryTermArray[index] + "</button>");
            index++;
        }
    }
    addButtons();

    //FUNCTIONS
    //===============================================================================================================================================
    function runQuery(queryLimit,queryURL){

        //call ajex to pull data from the API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        //After pulling the data perform this
        .then(function(response) {
        
        //logging to console
        console.log("---------------------------------------------------");
        console.log(queryURL);
        console.log("---------------------------------------------------");
        console.log("Request limit was: "+queryLimit);
        console.log(response);

        //empty/clear the dump section before each serch request
        $('#dumpSection').empty();

        // //logging to console
        for(var i=0;i<queryLimit;i++){
        
            //start dumping to html
            gifRating = "<h6>Rating: " + response.data[i].rating + "</h6>";
            gifUrl = response.data[i].images.original_mp4.mp4;
            video = "<video class='gif' loop><source src=" + gifUrl + " type='video/mp4'></video>";
            newGifDiv = ("<div class='gif-div-individual' id='gif-div" + i + "'>" + gifRating + video + "</div>");
            $("#dumpSection").append(newGifDiv);

        }

        // Clicking on each gif for play and pause
        $(".gif").on("click", function () {
            if (this.paused) {
            this.play();
            } 
            
            else {
                this.pause();
            }
        });
    

        });
        
    }

    

     //add new buttons
     $("#Submit").click(function(){
        event.preventDefault();
        queryTerm =$("#breedID").val().trim();
        //$("#breedID").val();
        //$("#event-input").val("");
        queryTermArray.push(queryTerm);
        addButtons();
        console.log("New button added was: "+queryTerm);
        //queryTerm = $(this).attr("data-topic");
        //Add in the search term
        //newURL= queryURLBase+queryTerm;
        //console.log("if clicked-new button url is-"+newURL);

        //send the AJAX Call the newly assembled URL
        //runQuery(queryLimit, newURL);
        //return false;

                //pull data from gif api after clicking buttons
                $(".thisButton").click(function(){
                    //event.preventDefault();
                    //queryTerm =$('.thisButton').text().trim();
                    queryTerm = $(this).attr("data-topic");
                    console.log("Query requested for: "+queryTerm);

                    //Add in the search term
                    newURL= queryURLBase+queryTerm;

                    //send the AJAX Call the newly assembled URL
                    runQuery(queryLimit, newURL);
                    //return false;
                })
        
        
    })
    
    //pull data from gif api after clicking buttons
    $(".thisButton").click(function(){
        //event.preventDefault();
        //queryTerm =$('.thisButton').text().trim();
        queryTerm = $(this).attr("data-topic");
        console.log("Query requested for: "+queryTerm);

        //Add in the search term
        newURL= queryURLBase+queryTerm;

        //send the AJAX Call the newly assembled URL
        runQuery(queryLimit, newURL);
        //return false;
    })

    
});
