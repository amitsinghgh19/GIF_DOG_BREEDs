
$(document).ready (function() {
    //alert("test");
    //SETUP VARIABLES
    //===============================================================================================================================================
    var authKey = "2drJ9YvIGdDUhUtFFymN9Jrmv4wNzyLt";
    var queryLimit =6;
    var newGifDiv;
    var arrayIndex = 0;
    var queryTerm;
    var Rating;
    var newURL;
    var videoTag;
    var gif_src;
    var downloadButton;

    // Search Parameters to display as buttons (Dog breeds)
    var queryTermArray   =['Corgi','American Bulldog','Bichon Frise','Chihuahua','Dachshund', 'German Shepherd', 'Greyhound', 'Maltese', 'Pug', 'Rottweiler', 'Samoyed', 'Tibetan Terrier'];
   
    //base url
    var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key="+authKey+"&limit="+queryLimit+"&q="

    //FUNCTIONS
    //===============================================================================================================================================
    // add buttons for queryTermArray on document.ready
    function addButtons() {
        while (arrayIndex < queryTermArray.length) {
            $("#buttons").append("<button class='btn btn-primary thisButton mx-1 my-1' data-topic='" + queryTermArray[arrayIndex] + "'>" + queryTermArray[arrayIndex] + "</button>");
            arrayIndex++;
        }
    }
    addButtons();

    //===============================================================================================================================================
    function runQuery(queryLimit,queryURL){

        //call ajex to pull data from the API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        //After pulling the data perform this
        .then(function(gif_response) {
        
        //logging to console
        console.log("---------------------------------------------------");
        console.log(queryURL);
        console.log("---------------------------------------------------");
        console.log("Request limit was: "+queryLimit);
        console.log(gif_response);

        //empty/clear the dump section before each serch request
        $('#dumpSection').empty();

        //start dumping requested api data to html
        // Only taking action if the photo has an appropriate rating
            for(var i=0;i<queryLimit;i++){
                    Rating = "<h6>Rating: " + gif_response.data[i].rating + "</h6>";
                    if (gif_response.data[i].rating !== "r" && gif_response.data[i].rating !== "pg-13") {
                    gif_src = gif_response.data[i].images.original_mp4.mp4;
                    videoTag = "<video class='gif' loop><source src=" + gif_src + " type='video/mp4'></video>";
                    //downloadButton='<button class="btn downloadBtn"><i class="fa fa-download"></i>Download</button>' ;
                    //newGifDiv = ("<div class='gif-div-class' id='gif-div-id" + i + "'>" + Rating + videoTag + downloadButton+ "</div>");
                    newGifDiv = ("<div class='gif-div-class' id='gif-div-id" + i + "'>" + Rating + videoTag + "</div>");
                    $("#dumpSection").append(newGifDiv);
                    }
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
     $("#Submit").click(function(event){
        event.preventDefault();
        queryTerm =$("#breedID").val().trim();
        if(queryTerm.length>0){
            queryTermArray.push(queryTerm);
            addButtons();
        }
        // Clear the textbox when done
        $("#breedID").val("");
        console.log("New button added was: "+queryTerm);
    })
    
    $(document.body).on("click", ".thisButton", function() {
        queryTerm = $(this).attr("data-topic");
        console.log("Query requested for: "+queryTerm);
        //Add in the search term
        newURL= queryURLBase+queryTerm;
        //send the AJAX Call the newly assembled URL
        runQuery(queryLimit, newURL);
      });


    $(function() {
        $(document).on("click", "a.fileDownloadSimpleRichExperience", function() {
            $.fileDownload($(this).attr('href'), {
                preparingMessageHtml: "We are preparing your report, please wait...",
                failMessageHtml: "There was a problem generating your report, please try again."
            });
            return false; //this is critical to stop the click event which will trigger a normal file download!
        });
    });

    
});
