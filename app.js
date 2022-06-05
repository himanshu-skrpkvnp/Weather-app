const { response } = require("express");
const express  = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const { stringify } = require("querystring");
const app = express();

app.get( "/" , function(req , res)
{
     res.sendFile(__dirname + "/index.html");
}) ;


app.use(bodyparser.urlencoded({extended : true}));

app.post("/" , function(req , res)
{
  
    const query = req.body.cityName ;
    const apikey = "6f0196e5c1aab2e24ea161a07da73e7c" ;
    const units = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units ;
    https.get( url , function(response)
    {
       console.log(response.statusCode);
        response.on("data" , (data) =>
       {
         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp ;
         const description = weatherData.weather[0].description ;
         const  icon = weatherData.weather[0].icon ;
         const image = "https://openweathermap.org/img/wn/"+icon+".png" ;
         console.log(temp) ;
         console.log( description );
         
         res.write("<h1>The weather at "+ query +" :" + description+"</h1>");
         res.write("<h3> Temperature in " + query +" : " + temp + " ° Celsius </h3>");
         res.write("<img src = "+ image +">");
         res.send()

       } );
    });
 
})



app.listen( 3000 , function()
{
   console.log(" server running at port 3000 ");
});