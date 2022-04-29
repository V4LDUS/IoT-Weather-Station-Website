//XMLHttpRequest Object
var xhr = new XMLHttpRequest();
// On Changing the request State
xhr.onreadystatechange = function()
{
    //if state is=4(response received) and status=200 (no errors)
    if(this.readyState==4 && this.status==200) 
    {        
        var fetched = JSON.parse(xhr.responseText); // parse json file to object
        // Display Temperature by replacing paragraph text
        document.getElementById("temperature_value").innerHTML="<h5>"+fetched.feeds[0].field1+" C";
    }
}

// Request fetch and sending to Thingspeak
xhr.open("GET","https://api.thingspeak.com/channels/1719973/feeds.json?api_key=UTUMTHL27MAR2IDF&results=1",true);
xhr.send();