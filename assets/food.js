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

//  spoonacular api key

// $(document).ready(function() {
//   function getsource() {
//     $.ajax({
//       url:
//         "https://api.spoonacular.com/recipes/search?query=carrot&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4",
//       method: "GET"
//     }).then(function(response) {
//       // // change var
//       // document.getElementById("sourceLink").innerHTML=res.source.Uri
//       // document.getElementById("sourceLink").href=res.sourceUri
//       console.log(response);
//     });
//   }
//   getsource();
//   function getrecipe(q) {
//     console.log(q);
//     var queryURL =
//       "https://api.spoonacular.com/recipes/search?query=" +
//       q +
//       "&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(res) {
//       // show picture and recipe
//       document.getElementById("output").innerHTML =
//         "<h1>" +
//         res.results[0].title +
//         "</h1><br><img src='" +
//         res.baseUri +
//         res.results[0].image +
//         "'width='400'/><br> ready in " +
//         res.results[0].readyInMinutes +
//         "minutes";
//       getsource(res.results[0].id);
//       console.log(res);
//       console.log(res.results[0].title);
//     });
//   }
//   // Zomato API call
  // function getRestSource() {
  //   $.ajax({
  //     url:
  //     "https://developers.zomato.com/api/v2.1/cuisines?city_id=nashville&lat=36.174465&lon=-86.767960",
  //     method: "GET"
  //   }).then(function(response) {
  //     // // change var
  //     // document.getElementById("sourceLink").innerHTML=res.source.Uri
  //     // document.getElementById("sourceLink").href=res.sourceUri
  //     console.log(response);
  //   });
  // // }
  // getRestSource()
  // function getRestaurant(r) {
  //   console.log(r);
  //   var queryURL =
  //     "https://api.spoonacular.com/recipes/search?query=" +
  //     q +
  //     "&apiKey=ebd3c07a0d5542c69c8f71d07e4ac0f4";

  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function(res) {
  //     // show picture and recipe
  //     document.getElementById("output").innerHTML =
  //       "<h1>" +
  //       res.results[0].title +
  //       "</h1><br><img src='" +
  //       res.baseUri +
  //       res.results[0].image +
  //       "'width='400'/><br> ready in " +
  //       res.results[0].readyInMinutes +
  //       "minutes";
  //     getsource(res.results[0].id);
  //     console.log(res);
  //     console.log(res.results[0].title);
  //   });
  // }


  // $(".trigger").on("click", function(event) {
  //   // helps to make sure form is filled in
  //   event.preventDefault();
  //   var searchTerm = $("#search")
  //     .val()
  //     .trim();
  //   getrecipe(searchTerm);
  // });

// create a function that pulls recipes when searched for by name or ingredient 
// function that calls on restaurants when needed 
// function that allows us to add these recipes to the page
// minimize the size of the recipes and how they appear when appended to the page
// create a function that allows the recipes to be added to certain days of the week/slots
// add design to the page - make it more appealing
// create a read me with screenshots and an explanation 



function findRestaurants() {
  //first ajax call to get city ID from Zomato
  var search = $("#search").val().trim();
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
  $.ajax({
      url: queryURL,
      method: "GET",
      headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
      dataType: "json",
  })
  .then(function(response){
      console.log(response.location_suggestions);
      

      // console.log(response.location_suggestions[0].id);
  
      // //second call to get the actual info that I want using Zomato ID
      // var searchID = response.location_suggestions[0].id;
      // var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + searchID;
      // $.ajax({
      //     url: queryURL,
      //     method: "GET",
      //     headers: {"user-key": "daba5326e0fb1e88a8f800820e41822f"},
      //     dataType: "json",
      // })
      // .then(function(response2){
      //     console.log(response2);
  
      // });
      for (var i = 0; i< response.location_suggestions.length; i++){ 
        var locationBtn = $("<button>");
        var locationInfo = response.location_suggestions[i].name;
        
        $("#output").prepend(locationBtn);
        locationBtn.text(locationInfo)
        console.log(locationBtn);
        console.log(locationInfo);
      }
      
  });
  
};
function clear(){
  $("output").empty();
}
 $(".trigger").on("click", function(event) {
  clear();
    // helps to make sure form is filled in
    event.preventDefault();
    var searchTerm = $("#search")
      .val()
      .trim();
      findRestaurants(searchTerm);
  });

  




// });
