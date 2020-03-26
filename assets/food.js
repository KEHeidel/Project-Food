// search bar (sliding)
const trigger = document.querySelector(".searchButton");
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

// api variables
var offset = 0;
var number = 10;
var apiKey = "ebd3c07a0d5542c69c8f71d07e4ac0f4";

//  api key & function

function getrecipe(q) {
  console.log(q);
  offset = Math.floor(Math.random() * 100);
  var recipes = "";
  var queryURL =
    "https://api.spoonacular.com/recipes/search?query=" +
    q +
    "&offset=" +
    offset +
    "&number=" +
    number +
    "&apiKey=" +
    apiKey;
  console.log("queryURL: " + queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    // show picture and recipe
    for (var i = 0; i < res.results.length; i++) {
    recipes +=
        `<div class="item">
        <p> ${res.results[i].title} </p> <img class='stick' src="${res.baseUri}${res.results[i].image}" height='150' width='200'/>
       </div>`;
        
      // getsource(res.results[0].id);
      console.log(res.results[i].title);
    }
    document.getElementById("output").innerHTML = recipes;
    console.log(res);
  });
}

$(document).ready(function() {
  input.classList.add("input-open");

  $(".searchButton").on("click", function(event) {
    // helps to make sure form is filled in
    event.preventDefault();
    var searchTerm = $("#search").val().trim();
    getrecipe(searchTerm);
  });

  
});

// function showResults() {

// if((i+1)%2 === 0) {
//   $(".even").prepend();
// }
// else {
//   $(".odd").prepend();
// }
// };