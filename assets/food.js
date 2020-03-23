// search bar (sliding)
const trigger = document.querySelector(".trigger");
const input = document.querySelector(".input");

trigger.addEventListener("click", () => {
  if (!input.classList.contains("input-open")) {
    input.classList.add("input-open");
    trigger.innerHTML = "<i class='fas fa-times'></i>";
  } else {
    input.classList.remove("input-open");
    trigger.innerHTML = "<i class='fas fa-search'></i>";
  }
});

//  api key

$(document).ready(function() {
  function getsource() {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/search?query=carrot&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4",
      method: "GET"
    }).then(function(response) {
      // // change var
      // document.getElementById("sourceLink").innerHTML=res.source.Uri
      // document.getElementById("sourceLink").href=res.sourceUri
      console.log(response);
    });
  }
  getsource();
  function getrecipe(q) {
    console.log(q);
    var queryURL =
      "https://api.spoonacular.com/recipes/search?query=" +
      q +
      "&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(res) {
      // show picture and recipe
      document.getElementById("output").innerHTML =
        "<h1>" +
        res.results[0].title +
        "</h1><br><img src='" +
        res.baseUri +
        res.results[0].image +
        "'width='400'/><br> ready in " +
        res.results[0].readyInMinutes +
        "minutes";
      getsource(res.results[0].id);
      console.log(res);
      console.log(res.results[0].title);
    });
  }
  $(".trigger").on("click", function(event) {
    // helps to make sure forn is filled in
    event.preventDefault();
    var searchTerm = $("#search")
      .val()
      .trim();
    getrecipe(searchTerm);
  });
});
