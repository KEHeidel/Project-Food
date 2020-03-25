// api variables
var offset = 0
var number = 10
var apiKey = "ebd3c07a0d5542c69c8f71d07e4ac0f4"

// search bar (sliding)
const trigger = document.querySelector(".trigger");
const input = document.querySelector(".input");

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
});
