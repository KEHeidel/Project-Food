// search bar (sliding)
const trigger = document.querySelector(".searchButton");
const input = document.querySelector(".input");

// event listener for search bar keypress
document.addEventListener("keypress", function(event) {
  // console.log(event)
  if (event.which == 13) {
    event.preventDefault();
    input.focus();
  }
});

// event listener to for "enter" key
// set variable equal to what the user has entered into the #search field and grab this value
// run getRecipe or find Restaurants function based on user search
input.addEventListener("keypress", function(event) {
  if (event.which == 13) {
    if ($("#toggleswitch").prop("checked") == true) {
      // helps to make sure form is filled in
      event.preventDefault();
      var searchTerm = $("#search").val().trim();
      getrecipe(searchTerm);
    } else {
      clear();
      event.preventDefault();
      var search = $("#search").val().trim();
      getLocation(search);
    }
  }
});

// spoonacular api variables
var icons = {};

// Zomato API variables
// array that holds city ids for location search
var array = [];
var page = 0;

// api variables
var offset = 0;
var number = 12;

var apiKey = "645883e4a0414065b4c1cdce1966919e";

// function to clear restaurants displayed on the page
function clear() {
  $("#output").empty();
}

// function that grabs the value entered into the restaurant search bar
// and runs it through the getLocation function

// function to get location ID from user based on city entered into search bar
// grabbing value entered into search-restaurant and setting it equal to var search
function getLocation() {
  var search = $("#search").val().trim();
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "daba5326e0fb1e88a8f800820e41822f"
    },
    dataType: "json"
  }).then(function(response) {
    clear();

    // loop city entered through Zomato and create a button for each option id
    // push each id value to empty array
    // append locationBtn to #output section -- allows user to choose their desired city based on search
    // add attr "value" and set equal to cityId in locationBtn
    // add city name to display on each locationBtn
    for (var i = 0; i < response.location_suggestions.length; i++) {
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
    // user will select which city they desire
    $(".location").click(function() {
      clear();
      offset = Math.floor(Math.random() * 100);
      var fired_button = $(this).val();
      console.log(fired_button);
      var restaurant = "";
      // query URL to receive restaurant results based on location
      var queryURL =
        "https://developers.zomato.com/api/v2.1/search?count=10&start=" +
        offset + "&entity_type=city&entity_id=" + fired_button;

      $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          "user-key": "daba5326e0fb1e88a8f800820e41822f"
        },
        dataType: "json"
        }).then(function(response){
          clear();
          console.log(response);
          var resultsImg = "";
          for (var i=0; i< response.restaurants.length; i++){
            // setting each desired response to a variable
            var resultsName = response.restaurants[i].restaurant.name;
            var resultsUrl = response.restaurants[i].restaurant.url;
            var resultsImg = response.restaurants[i].restaurant.thumb;
            var resultsAddress = response.restaurants[i].restaurant.location.address;
            var resultsTime = response.restaurants[i].restaurant.timings;
            // setting var restaurant = how we want results displayed on the screen 
            restaurant +=  `<div class="item">
            <p><a href="${resultsUrl}"> ${resultsName} </a></p> <img class='stick' src="${resultsImg}" height='150' width='200'/> <p>${resultsAddress}</p> 
            <b>${"Hours Open: "}</b> ${resultsTime}
            </div>`;
          };
          // appending restaurant variable to output section in html 
          $("#output").append(restaurant);   
        });
      });
    });
    };

// spoonacular api key & function to retrieve recipes
// variables for pulling info from api
function getrecipe(q) {
  offset = Math.floor(Math.random() * 100);

  var recipes = "";
  var recipeIds = [];
  var recipeInfos = [];
  var queryURL =
    "https://api.spoonacular.com/recipes/search?query=" +
    q + "&offset=" + offset + "&number=" + number + "&apiKey=" + apiKey;

  console.log("queryURL: " + queryURL);
  
  $.ajax({
    url: queryURL,
    method: "GET",
    async: false
  }).then(function(response) {
    // show picture and recipe
    console.log("API Response: ", response);
    for (var i = 0; i < response.results.length; i++) {
      recipeIds.push(response.results[i].id);
    }
    recipeInfos = getRecipeInfo(recipeIds.join());
    var iconImgs = "";
    console.log("recipeUrls: " + recipeInfos);
    for (var i = 0; i < response.results.length; i++) {
      iconImgs = "";
      if (icons[response.results[i].id] != false) {
        for (var j = 0; j < icons[response.results[i].id].length; j++) {
          iconImgs += icons[response.results[i].id][j];
        }
      }
      recipes += `<div class="item">
      <p><a href="${recipeInfos[i].sourceUrl}"> ${response.results[i].title} </a></p> <p> ${iconImgs} </p> <img class='stick' src="${response.baseUri}${response.results[i].image}" height='150' width='200'/>
      </div>`;
      // add div thats hidden with the instructions , give class recipe-instructions
    }

    // adding retreived recipe information to the document
    document.getElementById("output").innerHTML = recipes;
  });
}
// function to pull recipe info
function getRecipeInfo(ids) {
  var recipes = [];
  var queryURL =
    "https://api.spoonacular.com/recipes/informationBulk?ids=" +
    ids + "&apiKey=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
    async: false,
    success: function(response) {
      console.log("API Response: ", response);

      recipes = [];
      icons = {};
      for (var i = 0; i < response.length; i++) {
        var recipeInfo = {
          sourceUrl: response[i].sourceUrl,
          instructions: response[i].instructions,
          title: response[i].title


        };
        recipes.push(response[i]);
        if (
          response[i].vegan ||
          response[i].vegetarian ||
          response[i].glutenFree ||
          response[i].dairyFree
        ) {
          var tempicon = [];
          if (response[i].vegan) {
            var temp =
              "<img class='icons' src='./assets/images/Vegan-Icon.jpg' height='30' width='30' title='Vegan'/>";
            tempicon.push(temp);
          }
          if (response[i].vegetarian) {
            var temp =
              "<img class='icons' src='./assets/images/Vegetarian-Icon.jpg' height='30' width='30' title='Vegetarian'/>";
            tempicon.push(temp);
          }
          if (response[i].glutenFree) {
            var temp =
              "<img class='icons' src='./assets/images/Gluten-Free-Icon.jpg' height='30' width='30' title='Gluten Free'/>";
            tempicon.push(temp);
          }
          if (response[i].dairyFree) {
            var temp =
              "<img class='icons' src='./assets/images/Dairy-Free_icon.jpg' height='30' width='30' title='Dairy Free'/>";
            tempicon.push(temp);
          }
          icons[response[i].id] = tempicon;
        } else {
          icons[response[i].id] = false;
        }
      }
    }
  });
  return recipes;
}
// add class input-open to input variable and input-open-restaurant to inputRest variable
$(document).ready(function() {
  input.classList.add("input-open");
  // inputRest.classList.add("input-open");
  // when search button is clicked, grab the value from search button
  // run getRecipe function
  $(".searchButton").on("click", function(event) {
    if ($("#toggleswitch").prop("checked") == true) {
      // helps to make sure form is filled in
      event.preventDefault();
      var searchTerm = $("#search").val().trim();
      getrecipe(searchTerm);
    } else {
      clear();
      event.preventDefault();
      var search = $("#search").val().trim();
      getLocation(search);
    }
  });
});

$("textarea").keypress(function(event) {
  if (event.which === 13) {
    event.stopPropagation();
  }
});

// function to add selected recipe (by button) 
// to selected day and meal in planner
function addRecipeToSelectedMeal(recipe){
  //Select the parent div of the selected radio button, from there find the child textarea.
  let recipeBox = $("input:radio.meal-selection:checked").closest(".tabs").find('textarea');
  recipeBox.val(recipe);
};
