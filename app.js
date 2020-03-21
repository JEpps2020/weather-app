   // Initial array of cities
   //get data from local stprage 
   var list = JSON.parse(localStorage.getItem("cities"));

   //if list is not in local storage, list is set to an empty array
   if (!Array.isArray(list)) {
     list = [];
   }

   //onclick fc fires when we hit subit
   //grab the val from the submit
    $("#add-city").on("click", function(event) {
        event.preventDefault();

    var city=$("#city-input").val();
    console.log("City: "+ city);

   //now call the fx displaycityinfo passing the city 5day forcast
   //this works turn on before submitting hwk
    displayCityInfo(city);

    //fx to store city input into local storage, then get localstorage
    //and display the local storage data to a btn
    historybtn(city)
    oneday(city);
    


    
    
    });

//Need onclick function to trigger prepended city buttons to display date var curr= $(".city").text()
    //call the 1day fx and call the 5day fx 
    // //fx to display the 1 day forcast
    function oneday(city){
      //create url
       var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=20cee50ad515784c48e915ac5ce70b1a";
    console.log(queryURL)

    //2. call ajax
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      
      //citname
      var cityName=response.name
      console.log(cityName)
      //date
      //will need to call momentjs for current date(day planner code)
      //temp need to convert to F
      var cityTemp=response.main.temp
      
      console.log(cityTemp) 
      
      //humidity
      var cityHumidity=response.main.humidity
      console.log(cityHumidity)
      //windspeed
      var cityWind=response.wind.speed
      console.log(cityWind)
      //uv we have to grab the lon and lat and call another ajax request for uvvis
      var lon=response.coord.lon
      console.log("lon" +lon);
      var lat=response.coord.lat;
      console.log("lat"+ lat);

      // <div class="oneday">
      var cityDiv1 = $("<div>");
      // <div></div>
      cityDiv1.attr("class","oneday");
      // <div class="oneday"></div>

      var p1=$("<p>");
      //<p></p>
      p1.text("City:" + cityName);

      var p2=$("<p>");
      //<p></p>
      p2.text("Humidty:" + cityHumidity + "%");

      var p3=$("<p>");
      //<p></p>
      p3.text("Windspeed:" + cityWind + "mph");

      var p4=$("<p>");
      
      //<p></p>
      p4.text("Temp:" + cityTemp + "K");
      // <p>City: Austin</p>
      //   <p>City: Austin</p>
      //   <p>windspeed: 77</p>
      // </div>]]
      cityDiv1.append(p1);
      cityDiv1.append(p2);
      cityDiv1.append(p3)
      cityDiv1.append(p4)
      // <div class="oneday"
      // <p>City: Austin</p>
      //></div>

      //citydiv1 needs to live in html
      $("#1day-view").append(cityDiv1)


   
 
  });

    //3.get the specific data for 1 day forcast
    
 

    }
   


    //fx to get data from local storage to create btns on the page
    function generatebtn() 
    {

    $("#buttons-views").empty(); // empties out the html
        //we have no data in localstorage yet, will use dummy data to test fx
     var insideList = JSON.parse(localStorage.getItem("cities"));
     //var insideList= ["Austin", "Denver"];

      // Checks to see if we have any items in localStorage
      // If we do, set the local insideList variable to our todos
      // Otherwise set the local insideList variable to an empty array
      if (!Array.isArray(insideList)) {
        insideList = [];
      }

      console.log(insideList);
      // render our insideList city weather to the page
      for (var i = 0; i < insideList.length; i++) {

        var b = $("<button class='city'>").text(insideList[i]).attr("data-city", insideList[i]);
        //<button class="city"></button>
        //<button class="city">Austin</button>
        //<button class="city" data-city="Austin">Austin</button>
        

        //append = inside buttons-view loc area we stick the button.
  
        $("#buttons-view").prepend(b);
        //<button class="city" data-city="Austin">Austin</button>
      }
    }


    
   //fx which takes input, pushes to array then sets the array into  local storage
   function historybtn(city){
       console.log("historybtn fx"+ city);
       //grab current city and add it to the cities array
        list.push(city);
        //sets the array into local storage
        localStorage.setItem("cities", JSON.stringify(list));
        console.log(" List Array: "+list)
        //renders the btn
        generatebtn();
       

   }

//5day forcast
   function displayCityInfo(city) {

     //var city = $(this).attr("data-name");  //Austin need to update later

     //this is a temp value/ placeholder for city until we have the buttons working
     

     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=20cee50ad515784c48e915ac5ce70b1a";
     console.log(queryURL)
     
     $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function(response) {
       //console.log(response)
       for(var i=0; i<5;i++){       
           
         var cityDiv = $("<div>");
         //<div></div>
         cityDiv.attr("class","city-name 5daystyle")
         //<div class="city-name 5daystyle"></div>

        //?this is a 3 hour forcast, mult by 8 to get every 24hrs
         var date=response.list[i*8].dt_txt;

         var pOne=$("<p>");  
        //  created paragraph element 
        //<p></p>    
         
         pOne.text("Date: "+ date);
         //<p>"Date: 2020-03"</p> 

         cityDiv.append(pOne);
         //<div class="city-name 5daystyle">
         //<p>"Date: 2020-03"</p> 
        //  </div>

         
         var icon=response.list[i*8].weather[0].icon +".png";

         var pTwo=$("<p>");   
        //  <p></p>     
         
         pTwo.text("Icon: "+ icon);
        //  <p>"Icon: 04n.png"</p>     
         cityDiv.append(pTwo);
         //<div class="city-name 5daystyle">
         //<p>"Date: 2020-03"</p>
         //<p>"Icon: 04n.png"</p> 
        //  </div>      

         var temp= response.list[i*8].main.temp;
         var tempinF=(temp-273.15)*9/5+32;

         var pThree=$("<p>");
         //<p></p>        
         
         pThree.text("Temperature: "+ tempinF + "F");
         //<p>"Temperature: temp"</p>   

         cityDiv.append(pThree); 
        //<div class="city-name 5daystyle">
         //<p>"Date: 2020-03"</p>
         //<p>"Icon: 04n.png"</p>
         //<p>"Temperature: temp"</p> 
        //  </div> 

         var humidity= response.list[i*8].main.humidity;   
        
         var pFour=$("<p>");     
         //<p></p>   
         
         pFour.text("humidity: "+ humidity + "%");
         //<p>"Humidity: humidty"</p>

         cityDiv.append(pFour);
        //<div class="city-name 5daystyle">
         //<p>"Date: 2020-03"</p>
         //<p>"Icon: 04n.png"</p>
         //<p>"Temperature: temp"</p> 
         //<p>"Humidity: humidity"</p>
        //  </div> 
        
         $("#5day-view").append(cityDiv);
         //where #5day-view is we are appending the citydiv variable


         //console.log(response.list[0]);
       //date
     //   console.log(response.list[i*8].dt_txt)
     //   var date=response.list[i*8].dt_txt;
     //   //icon
     //   // console.log(response.list[0].weather[0].icon);
     //    var icon=response.list[i*8].weather[0].icon+".png";
     //   console.log(icon)
     //   //temp
     //   //console.log(response.list[0].main.temp);
     //   //convert k to F;
     //   //(temp − 273.15) × 9/5 + 32
     //   var temp= response.list[i*8].main.temp;
     //   var tempinF=(temp-273.15)*9/5+32;
     //   //console.log(tempinF)

       //humidity
     //   console.log(response.list[i*8].main.humidity);
     //end of for loop
  
       }  
    
  
   });

     

 }

 //displayCityInfo(); 

 generatebtn();
