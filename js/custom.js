//Slider Initialization
        $(document).on('ready', function() {
      
          $(".center").slick({
            dots: true,
            infinite: true,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
          });

        });

        

//Event-based function for "Go" button click
      function zipSelector() {
        var zipInput = document.getElementById("zipInput").value;
        if(zipInput.length < 5 || zipInput.length > 5) {
          alert("Please input a vaild zip code (Must be 5 digits).");
          console.log("Please input a vaild zip code (Must be 5 digits).");
          return;
        }
        else{
          window.location.href = "/find-dealer/"+zipInput;
        }
      }

 


//Documentation/Guideline Credits - http://www.khalidabuhakmeh.com/use-javascript-and-mapquest-to-get-a-users-zipcode
//NOTE: Mapquest API has many issues thus use Google API
      function retrieveZip() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            $.ajax({
              type: "GET",
              error: function(){
                if(lat == null || lon == null) { 
                  alert("Location retrieval failed."); 
                  console.log("Location retrieval failed.");
                }
              },
              url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&sensor=true&callback=zipmap", dataType: "json", cache: true,
              success: function(data) {
                for( var i = 0; i < data.results[0].address_components.length; i++) {
                  var element = data.results[0].address_components[i];
                  if( element.types == "postal_code" ) {
                    window.location.href = "/find-dealer/" + element.short_name;
                    return;
                  }
                }
                alert("Location retrieval failed.");
                console.log("Location retrieval failed.");
              }
            })
          });
        }
        else{
          alert("Can't access navigation/geolocation module.");
          console.log("Location retrieval failed.");
        }
      }