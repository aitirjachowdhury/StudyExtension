
// Get the modal
var map;
var price;
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openBox(carids, chosentype, price) {
  modal.style.display = "block";
  $('#cartype').val(chosentype);
  $('#carids').val(carids);
  this.price = price;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  $('#srcaddr').val('');
  $('#destaddr').val('');
  map = new google.maps.Map(document.getElementById("map"),
            { zoom: 15, center: {lat: 43.6533, lng: -79.3834}});
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    $('#srcaddr').val('');
    $('#destaddr').val('');
    map = new google.maps.Map(document.getElementById("map"),
            { zoom: 15, center: {lat: 43.6533, lng: -79.3834}});
  }
}

var map;

function initMap()
{
  map = new google.maps.Map(document.getElementById("map"),
            { zoom: 15, center: {lat: 43.6533, lng: -79.3834}});
}

  function displayRoute(origin, destination, directionsService, directionsDisplay) {
      directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          avoidTolls: true
      }, function (response, status) {
          if (status === 'OK') {
              directionsDisplay.setMap(map);
              directionsDisplay.setDirections(response);
          } else {
              directionsDisplay.setMap(null);
              directionsDisplay.setDirections(null);
              alert('Could not display directions due to: ' + status);
          }
      });
  }

  function calculateDistance(source, destination) {

  var DistanceMatrixService = new google.maps.DistanceMatrixService();
  DistanceMatrixService.getDistanceMatrix(
      {
          origins: [source],
          destinations: [destination],
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
          avoidHighways: false,
          avoidTolls: true
      }, function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          $('#result').html(err);
      } else {
          var origin = response.originAddresses[0];
          var destination = response.destinationAddresses[0];
          if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
              alert("Sorry! not available.");
          } else {
              var distance = response.rows[0].elements[0].distance;
            $('#distance').val(distance.value / 1000);
          }
        }
        });
  }


//ON SUBMIT
$( "#set" ).click(function(e) {
e.preventDefault();
$('#price').val(price);
      map = new google.maps.Map(document.getElementById("map"),
            { zoom: 15, center: {lat: 43.6533, lng: -79.3834}});

      var source = $('#srcaddr').val();
      var destination = $('#destaddr').val();
      var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': false});
      var directionsService = new google.maps.DirectionsService();
     displayRoute(source, destination, directionsService, directionsDisplay);
     calculateDistance(source, destination);
    });

