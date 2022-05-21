#include <DHT.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>;
#include <ThingSpeak.h>;
#include <Wire.h>
#include <Adafruit_BMP085.h>

// replace with your channel’s thingspeak API key,
const char * myWriteAPIKey = "Q58DRQBUL54NGFNT";
unsigned long myChannelNumber = 1719973; //Replace it with your channel ID
const char* ssid = "Valdus' Internet";
const char* password = "16691669";
const char* server = "api.thingspeak.com";


#define DHTPIN D4 // CONNECT THE DHT11 SENSOR TO PIN D4 OF THE NODEMCU
DHT dht(DHTPIN, DHT11,15);
WiFiClient client;
Adafruit_BMP085 bmp;

void setup() {
  Serial.begin(9600);  
  Wire.begin();
  dht.begin();

 // ENTIRE PROGRAM WON'T RUN UNTIL THE BMP IS CONNECTED
 if (!bmp.begin())
  {
   Serial.println("BMP180 Sensor not found!");
    while (1) { }
  }

  //==== CONNECTION ====//
  delay(10);
  ThingSpeak.begin(client);
  WiFi.begin(ssid, password);
  
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  //==== CONNECTION ====//
}


void loop() {  

float Humidity = dht.readHumidity();
float Temperature = dht.readTemperature();
int Pressure = bmp.readPressure();
float gasSensor = analogRead(A0);

if (isnan(Humidity) || isnan(Temperature)) {
Serial.println("Failed to read from DHT sensor!");
}

if (isnan(gasSensor)) {
  Serial.println("Failed to read from MQ-135 sensor!");
  return;
}

Serial.print("Temperature: ");
Serial.print(Temperature);
Serial.println(" degrees Celcius");
Serial.print("Humidity: ");
Serial.print(Humidity);
Serial.println(" %");
Serial.print("Air Quality: ");
Serial.print(gasSensor);
Serial.println(" ppm");
Serial.print("Pressure: ");
Serial.print(Pressure);
Serial.println(" Pa");
Serial.println();
Serial.println("Sending to Thingspeak!");
  
ThingSpeak.writeField(myChannelNumber, 1, Temperature, myWriteAPIKey);
ThingSpeak.writeField(myChannelNumber, 2, Humidity, myWriteAPIKey);
ThingSpeak.writeField(myChannelNumber, 3, gasSensor, myWriteAPIKey);
ThingSpeak.writeField(myChannelNumber, 4, Pressure, myWriteAPIKey);
}
