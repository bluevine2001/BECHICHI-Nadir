function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 45.75, lng: 4.85 }
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      travelMode: "DRIVING"
    },
    function(response, status) {
      if (status === "OK") {
        document.getElementById("distance").innerHTML =
          "la distance total du trajet est: " +
          (response.routes[0].legs[0].distance.value / 1000).toFixed(2) +
          " km";
          /*
        document.getElementById("price").innerHTML =
          "Vous devrez donc payer:" +
          ((response.routes[0].legs[0].distance.value / 1000) * 2.5).toFixed(
            2
          ) +
          "€";*/
        //alert('Total travel distance is: ' + (response.routes[0].legs[0].distance.value / 1000).toFixed(2) + ' km');
        directionsDisplay.setDirections(response);
      } else {
        //window.alert('Directions request failed due to ' + status);
      }
    function tarifs{
      var hours = document.querySelector('#hours');
      if(7<=hours.value<=19){
        document.getElementById("price").innerHTML =
          "Vous devrez donc payer:" +
          ((response.routes[0].legs[0].distance.value / 1000) * 1.66).toFixed(2) + "€";
      }else if(19<=hours.value<=23){
        document.getElementById("price").innerHTML =
          "Vous devrez donc payer:" +
          ((response.routes[0].legs[0].distance.value / 1000) * 2.50).toFixed(2) + "€";
      }else if(0<=hours.value<=7){
        document.getElementById("price").innerHTML =
          "Vous devrez donc payer:" +
          ((response.routes[0].legs[0].distance.value / 1000) * 2.50).toFixed(2) + "€";
      }
    }
    });
}
