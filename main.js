setInterval(() => {
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
            document.getElementById("temperature_value").innerHTML="<p>"+Number(fetched.feeds[0].field1).toFixed(2)+" C";
            document.getElementById("humidity_value").innerHTML="<p>"+Number(fetched.feeds[0].field2)+" %";
            document.getElementById("airquality_value").innerHTML="<p>"+Number(fetched.feeds[0].field3).toFixed(2)+" ppm";
            document.getElementById("pressure_value").innerHTML="<p>"+Number(fetched.feeds[0].field4)+" Pa";   
            
            if(Number(fetched.feeds[0].field1).toFixed(2) > 25){
                document.getElementById("temperature_value").style.color = "red";
                document.getElementById("temperature_value").style.fontSize = "21px";
                document.getElementById("temperature_value").innerHTML="<p>"+Number(fetched.feeds[0].field1).toFixed(2)+" C, it's hot";
            }
        }
    }
    // Request fetch and sending to Thingspeak
    xhr.open("GET", "https://api.thingspeak.com/channels/1719973/feeds.json?results=2", true);
    xhr.send();
})