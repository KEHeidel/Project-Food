// api variables
var offset = 0
var number = 10
var apiKey = "ebd3c07a0d5542c69c8f71d07e4ac0f4"

// Zomato API variables
// array that holds city ids for location search 
var array = [];
var page = 0;

// search bar (sliding)
const trigger = document.querySelector(".trigger");
const input = document.querySelector(".input");
const inputRest = document.querySelector(".input-restaurant");

// trigger.addEventListener("click", () => {
//   if (!input.classList.contains("input-open")) {
//     // input.classList.add("input-open");
//     trigger.innerHTML = "<i class='fas fa-search'></i>";
//   } else {
//     // input.classList.remove("input-open");
//     trigger.innerHTML = "<i class='fas fa-times'></i>";
//   }
// });

document.addEventListener("keypress", function(event) {
  // console.log(event)
  if (event.which == 13) {
    event.preventDefault();
    input.focus();
    inputRest.focus();
  }
});

input.addEventListener("keypress", function(event) {
  // console.log(event)
  if (event.which == 13) {
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
    //get restaurants 
    var search = $("#search-restaurant").val().trim();
    findRestaurants(search)
  }
});

//  api key

function getrecipe(q) {
  console.log(q);
  offset = Math.floor(Math.random() * 100);
  var recipes = ""
  var queryURL = "https://api.spoonacular.com/recipes/search?query=" + q + "&offset=" + offset + "&number=" + number + "&apiKey=" + apiKey;
  console.log("queryURL: " + queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    // show picture and recipe
    for (var i = 0; i < res.results.length; i++) {
      recipes += "<h1>" + res.results[i].title + "</h1><br><img src='" + res.baseUri + res.results[i].image + "'width='400'/><br> ready in " + res.results[i].readyInMinutes + "minutes";
      // getsource(res.results[0].id);
      console.log(res.results[i].title);
    }
    document.getElementById("output").innerHTML = recipes
    console.log(res);
  });
}

$(document).ready(function() {
  input.classList.add("input-open");
  inputRest.classList.add("input-open");

  // // remain commented out 
  // function getsource() {
  //   $.ajax({
  //     url:
  //       "https://api.spoonacular.com/recipes/search?query=" + query + "&offset=" + offset + "&number=" + number + "&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4",
  //     method: "GET"
  //   }).then(function(response) {
  //     // // change var
  //     // document.getElementById("sourceLink").innerHTML=res.source.Uri
  //     // document.getElementById("sourceLink").href=res.sourceUri
  //     console.log(response);
  //   });
  // }
  // getsource();
  // function getrecipe(q) {
  //   console.log(q);
  //   offset = Math.floor(Math.random() * 100);
  //   var recipes = ""
  //   var queryURL = "https://api.spoonacular.com/recipes/search?query=" + q + "&offset=" + offset + "&number=" + number + "&apiKey=" + apiKey;
  //   console.log("queryURL: " + queryURL);

  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function(res) {
  //     // show picture and recipe
  //     for (var i = 0; i < res.results.length; i++) {
  //       recipes += "<h1>" + res.results[i].title + "</h1><br><img src='" + res.baseUri + res.results[i].image + "'width='400'/><br> ready in " + res.results[i].readyInMinutes + "minutes";
  //       // getsource(res.results[0].id);
  //       console.log(res.results[i].title);
  //     }
  //     document.getElementById("output").innerHTML = recipes
  //     console.log(res);
  //   });
  // }
  
  $(".trigger").on("click", function(event) {
    // helps to make sure form is filled in
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
  });




////   brooke's code below   //// 
      

      // function that grabs the value entered into the restaurant search bar and runs it through the getLocation function
       $(".trigger-restaurant").on("click", function(event) {
        clear();
        // helps to make sure form is filled in
        event.preventDefault();
        var search = $("#search-restaurant").val().trim();
        getLocation(search);
      });
      
       // function to clear gifs displayed on the page
      function clear() {
        $("#output").empty();
      }
        // function to get location ID from user based on city entered into search bar 
        function getLocation() {
          // grabbing value entered into search-restaurant and setting it equal to var search
          var search = $("#search-restaurant").val().trim();
          // Zomato queryURL 
          var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
          //first ajax call to get city ID from Zomato
          $.ajax({
              url: queryURL,
              method: "GET",
              headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
              dataType: "json",
          })
          .then(function(response){
            clear();
            // loop through all options of cities to choose from based on what was entered 
             for (var i = 0; i< response.location_suggestions.length; i++){ 
               console.log(response);
                // creating a button and adding a class "location" to it
                var locationBtn = $("<button>").addClass("location");
                // set response ID to cityId variable 
                var cityId = response.location_suggestions[i].id;
                // set response name to locationInfo variable
                var locationInfo = response.location_suggestions[i].name;
                // push cityId to array variable 
                array.push(cityId);

                console.log(array);
                console.log(locationBtn);
                console.log(locationInfo);
                console.log(cityId);
                // append locationBtn to #output section
                $("#output").append(locationBtn);
                // add attr "value" and set equal to cityId to locationBtn
                locationBtn.attr("value", cityId);
                // add locationInfo text to the locationBtn
                locationBtn.text(locationInfo);
               
              } 
      
              // on click function for retriving restaurants from location id button 
              $(".location").click(function() {
                clear();
                // set variable to equal the value of the button clicked
                var fired_button = $(this).val();
                console.log(fired_button);
                var restaurant = "";
                // query URL to receive restaurant results based on location 
                var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + fired_button + "&entity_type=city" + "&start=" + [page*50] + "count=50";
                $.ajax({
                    url: queryURL,
                    method: "GET",
                    headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
                    dataType: "json",
                })
                .then(function(response){
                  clear();
                    console.log(response);
                    for (var i=0; i< response.restaurants.length; i++){
                      console.log(i);
                      // setting each desired response to a variable
                      var resultsName = response.restaurants[i].restaurant.name;
                      var resultsImg = response.restaurants[i].restaurant.featured_image;
                      var resultsAddress = response.restaurants[i].restaurant.location.address;
                      var resultsCity = response.restaurants[i].restaurant.location.city;
                      var resultsZip = response.restaurants[i].restaurant.location.zipcode;
                      var resultsTime = response.restaurants[i].restaurant.timings;
                      // setting var restaurant = how we want results displayed on the screen 
                      restaurant += "<h1>" + resultsName + "</h1><br><img src='" + resultsImg + "'width='400'/><br>" + resultsAddress + "<br />" + resultsCity + ", " + resultsZip + "<br /> Hours Open: " + resultsTime;

                      // console.log(resultsName);
                      // console.log(resultsImg);
                      // console.log(resultsAddress);
                      // console.log(resultsCity);
                      // console.log(resultsZip);
                      // console.log(resultsTime);
                    }
                    // appending restaurant variable to output section in html 
                    $("#output").append(restaurant)
            
                });
            });
            
        
    


      /////////////////////////////



        // second call to get the actual info that I want using Zomato ID
        // var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + fired_button;
        // $.ajax({
        //     url: queryURL,
        //     method: "GET",
        //     headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
        //     dataType: "json",
        // })
        // .then(function(response){
        //     console.log(response);
    
        // });





       /////////////////////////////// comment these back in when you do other code
        
    });
    
  };

/////////////////////////////////////




//   var getRestaurant = function(){
//     // grab the search-restaurant value 
//     var locationInput = $("#search-restaurant").val().trim();
//     console.log(locationInput);

//     $("#output").val("");

//     var queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+ locationInput;

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         headers: {"user-key": "adaba5326e0fb1e88a8f800820e41822f"},
//         dataType: "json",
//     })
//     .then(function(response){
//         console.log(response);

//          // variables for the query responses we want
//          var name = response.name;
//          var location = response.location;
//          var pics = response.thumb;
//          var cuisine = response.cuisine;
//          var userRating = response.user_rating;
//          var phoneNumber = response.phone_numbers;
         
//          // appending the results to the table
//          $("#output").append(
//          name + location + pics + cuisine + userRating + phoneNumber);
 
//      });
//  };
    
  });

  // // remain commented out 
  // function clear(){
  //   $("output").empty();
  // }
  //  $(".trigger").on("click", function(event) {
  //     // helps to make sure form is filled in
  //     event.preventDefault();
  //     var searchTerm = $("#search")
  //       .val()
  //       .trim();
  //       // findRestaurants(searchTerm);
  //   })

