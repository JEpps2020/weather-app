   // Initial array of cities
   var cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"];


   //onclick fc fires when we hit subit
   //grab the val from the submit
   var city=$("#city-input").val()
   console.log("City: "+city);

   //now call the fx displaycityinfo passing the city
  // displayCityInfo(city);
   //


   function displayCityInfo(city) {

     //var city = $(this).attr("data-name");  //Austin need to update later

     //this is a temp value/ placeholder for city until we have the buttons working
     

     ///var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
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
         
         pThree.text("Temperature: "+ temp);
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
         
         pFour.text("humidity: "+ humidity);
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