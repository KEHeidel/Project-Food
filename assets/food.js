// search bar (sliding)
const trigger = document.querySelector(".searchButton");
const input = document.querySelector(".input");
const inputRest = document.querySelector(".input-restaurant");


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

var icons = {}

// api variables
var offset = 0;
var number = 12;
var apiKey = "645883e4a0414065b4c1cdce1966919e";

//  api key & function

function getrecipe(q) {
  offset = Math.floor(Math.random() * 100);

  var recipes = ""
  var recipeids = []
  var recipeurls = []
  var queryURL = "https://api.spoonacular.com/recipes/search?query=" + q + "&offset=" + offset + "&number=" + number + "&apiKey=" + apiKey;

  console.log("queryURL: " + queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
    async: false
  }).then(function(res) {
    // show picture and recipe
    for (var i = 0; i < res.results.length; i++) {

      recipeids.push(res.results[i].id);
    }
    recipeurls = getrecipeinfo(recipeids.join())
    var iconimgs = ""
    console.log("recipeurls: " + recipeurls);
    for (var i = 0; i < res.results.length; i++) {
      iconimgs = ""
      if (icons[res.results[i].id] != false) {
        for (var j = 0; j < icons[res.results[i].id].length; j++) {
          iconimgs += icons[res.results[i].id][j]
        }
      }
      recipes +=
      `<div class="item">
      <p><a href="${recipeurls[i]}"> ${res.results[i].title} </a></p> <p> ${iconimgs} </p> <img class='stick' src="${res.baseUri}${res.results[i].image}" height='150' width='200'/>
      </div>`;
    }
    console.log(res);
    document.getElementById("output").innerHTML = recipes

  });
}

function getrecipeinfo(id) {
  var urlarray = []
  var queryURL = "https://api.spoonacular.com/recipes/informationBulk?ids=" + id + "&apiKey=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
    async: false,
    success: function(res) { 
      urlarray = [];
      icons = {}
      console.log("recipeinfo: ")
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        urlarray.push(res[i].sourceUrl);
        // icons.push("")
        if (res[i].vegan || res[i].vegetarian || res[i].glutenFree || res[i].dairyFree) {
          var tempicon = []
          if (res[i].vegan) {
            var temp = "<img class='icons' src='./assets/images/Vegan-Icon.jpg' height='25' width='25'/>"
          tempicon.push(temp)
          console.log("vegan: " + res[i].vegan);
          };
          if (res[i].vegetarian) {
            var temp = "<img class='icons' src='./assets/images/Vegetarian-Icon.jpg' height='25' width='25'/>"
            tempicon.push(temp)
          // icons[i].push("<img class='icons' src='./assets/images/Vegetarian-Icon.jpg' height='50' width='50'/>")
          console.log("vegetarian: " + res[i].vegetarian);
          };
          if (res[i].glutenFree) {
            var temp = "<img class='icons' src='./assets/images/Gluten-Free-Icon.jpg' height='25' width='25'/>"
            tempicon.push(temp)
          // icons[i].push("<img class='icons' src='./assets/images/Gluten-Free-Icon.jpg' height='50' width='50'/>")
          console.log("gluten: " + res[i].glutenFree);
          };
          if (res[i].dairyFree) {
            var temp = "<img class='icons' src='./assets/images/Dairy-Free_icon.jpg' height='25' width='25'/>"
            tempicon.push(temp)
          // icons[i].push("<img class='icons' src='./assets/images/Dairy-Free_icon.jpg' height='50' width='50'/>")
          console.log("dairy: " + res[i].dairyFree);
          };
          icons[res[i].id] = tempicon
        }
        else {
            icons[res[i].id] = false
        }
      }
    }
  });
 
  return urlarray;

};

$(document).ready(function() {
  input.classList.add("input-open");
  inputRest.classList.add("input-open-restaurant");

  $(".searchButton").on("click", function(event) {

    // helps to make sure form is filled in
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
  });



////   Zomato API code below   //// 
// Zomato API variables
// array that holds city ids for location search 
var array = [];
var page = 0;
      

  // function that grabs the value entered into the restaurant search bar and runs it through the getLocation function
  $(".searchButtonRestaurant").on("click", function(event) {
    clear();
    event.preventDefault();
    var search = $("#search-restaurant").val().trim();
    getLocation(search);
  });
      
  // function to clear gifs displayed on the page
  function clear() {
    $("#output").empty();
  }

  // function to get location ID from user based on city entered into search bar 
  // grabbing value entered into search-restaurant and setting it equal to var search
  //first ajax call to get city ID from Zomato
  function getLocation() {
  var search = $("#search-restaurant").val().trim();
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
    dataType: "json",
  }).then(function(response){
    clear();

    // take city entered and loop through all options in zomato
    // create a button for each option 
    // push each id value to empty array
    // append locationBtn to #output section
    // add attr "value" and set equal to cityId to locationBtn
    // add city name to the locationBtn
    for (var i = 0; i< response.location_suggestions.length; i++){ 
      console.log(response);
    
      var locationBtn = $("<button>").addClass("location"); 
      var cityId = response.location_suggestions[i].id;
      var locationInfo = response.location_suggestions[i].name;
      array.push(cityId);

      console.log(array);
      console.log(locationBtn);
      console.log(locationInfo);
      console.log(cityId);
      
      $("#output").append(locationBtn);
      locationBtn.attr("value", cityId);
      locationBtn.text(locationInfo);
    } 
      
    // retrieve restaurants based on location id 
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
      }).then(function(response){
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
        
  });
    
  };

  
});

$("textarea").keypress(function(event){
  if (event.which === 13) {
    event.stopPropagation();
  }
})