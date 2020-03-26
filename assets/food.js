// api variables
var offset = 0
var number = 10
var apiKey = "dc44adf1107f415d8a101a4fa04c727c"

// search bar (sliding)
const trigger = document.querySelector(".trigger");
const input = document.querySelector(".input");


document.addEventListener("keypress", function(event) {
  // console.log(event)
  if (event.which == 13) {
    event.preventDefault();
    input.focus();
  }
});

input.addEventListener("keypress", function(event) {
  // console.log(event)
  if (event.which == 13) {
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
  }
});

//  api key

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
    console.log("recipeurls: " + recipeurls);
    for (var i = 0; i < res.results.length; i++) {
      recipes += "<h1>" + "<a href=" + recipeurls[i] + ">" + res.results[i].title + "</a></h1><br><img src='" + res.baseUri + res.results[i].image + "'width='400'/><br> ready in " + res.results[i].readyInMinutes + "minutes";
    }
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
      for (var i = 0; i < res.length; i++) {
        urlarray.push(res[i].sourceUrl);
      }
    }
  });
 
  return urlarray;

};

$(document).ready(function() {
  input.classList.add("input-open");

  $(".trigger").on("click", function(event) {
    // helps to make sure form is filled in
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
  });
});
