//XMLHttpRequest Object
var xhr = new XMLHttpRequest();
// On Changing the request State
xhr.onreadystatechange = function()
{
    //if state is=4(response received) and status=200 (no errors)
    if(this.readyState==4 && this.status==200) 
    {        
        var fetched = JSON.parse(xhr.responseText); // parse json file to object

        // Display the values by adding paragraph text into the div's ID
        document.getElementById("temperature_value").innerHTML="<p>"+fetched.feeds[0].field1+" C";
        document.getElementById("humidity_value").innerHTML="<p>"+fetched.feeds[0].field3+" %";
        document.getElementById("pressure_value").innerHTML="<p>"+fetched.feeds[0].field4+" kPa";
        document.getElementById("airquality_value").innerHTML="<p>"+fetched.feeds[0].field1+" ppm";
    }
}
// Request fetch and sending to Thingspeak
xhr.open("GET","https://api.thingspeak.com/channels/1719973/feeds.json?api_key=UTUMTHL27MAR2IDF&results=1",true);
xhr.send();