
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>
#include <FastLED.h>

// MAC address from Ethernet shield sticker under board
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 177, 83); // IP address, may need to change depending on network
EthernetServer server(80);  // create a server at port 80

File webFile;
String HTTP_req;          // stores the HTTP request
String GET_Pars;
boolean LED_status = 0;   // state of LED, off by default
String PortFaction;
String PortHealth;
String Reso1;
String Reso2;
String Reso3;
String Reso4;
String Reso5;
String Reso6;
String Reso7;
String Reso8;
String ResoMod;

//LED LED LED LED LED LED LED LED LED LED LED LED LED
//LED LED LED LED LED LED LED LED LED LED LED LED LED
#define LED_PIN     3
#define NUM_LEDS    150
#define BRIGHTNESS  64
#define LED_TYPE    WS2811
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

#define UPDATES_PER_SECOND 100

CRGBPalette16 currentPalette;
TBlendType    currentBlending;

extern CRGBPalette16 myRedWhiteBluePalette;
extern const TProgmemPalette16 myRedWhiteBluePalette_p PROGMEM;


//LED LED LED LED LED LED LED LED LED LED LED LED LED
//LED LED LED LED LED LED LED LED LED LED LED LED LED

void setup()
{
    Ethernet.begin(mac, ip);  // initialize Ethernet device
    server.begin();           // start to listen for clients
    Serial.begin(9600);       // for debugging

    // initialize SD card
    Serial.println("Initializing SD card...");
    if (!SD.begin(4)) {
        Serial.println("ERROR - SD card initialization failed!");
        return;    // init failed
    }
    Serial.println("SUCCESS - SD card initialized.");
    // check for index.htm file
    if (!SD.exists("index.htm")) {
        Serial.println("ERROR - Can't find index.htm file!");
        return;  // can't find index file
    }
    Serial.println("SUCCESS - Found index.htm file.");

//LED LED LED LED LED LED LED LED LED LED LED LED LED

    delay( 3000 ); // power-up safety delay
    FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
    FastLED.setBrightness(  BRIGHTNESS );
    Serial.println("LED Setup SUCCESS ");
    currentPalette = RainbowColors_p;
    currentBlending = LINEARBLEND;
    Serial.println("void loop... ");
//LED LED LED LED LED LED LED LED LED LED LED LED LED

}

void loop()
{
//LED LED LED LED LED LED LED LED LED LED LED LED LED
    ChangePalettePeriodically();

    static uint8_t startIndex = 0;
    startIndex = startIndex + 1; /* motion speed */

    FillLEDsFromPaletteColors( startIndex);

    FastLED.show();
    FastLED.delay(1000 / UPDATES_PER_SECOND);
//LED LED LED LED LED LED LED LED LED LED LED LED LED


    EthernetClient client = server.available();  // try to get client

    if (client) {  // got client?
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) {   // client data available to read
                char c = client.read(); // read 1 byte (character) from client
                // last line of client request is blank and ends with \n
                // respond to client only after last line received
                HTTP_req += c;  // save the HTTP request 1 char at a time

                if (c == '\n' && currentLineIsBlank) {
                    // send a standard http response header
                    client.println("HTTP/1.1 200 OK");
                    client.println("Content-Type: text/html");
                    client.println("Connection: close");
                    client.println();
                    // send web page
                    webFile = SD.open("index.htm");        // open web page file
                    if (webFile) {
                        while(webFile.available()) {
                            client.write(webFile.read()); // send web page to client
                        }
                        webFile.close();
                    }
                    break;

                }
                // Serial.write(c);
                // every line of text received from the client ends with \r\n
                if (c == '\n') {
                    // last character on line of received text
                    // starting new line with next character read
                    ProcessRequest(client);
                    //Serial.print(HTTP_req);
                    HTTP_req = "";    // finished with request, empty string
                    currentLineIsBlank = true;
                }
                else if (c != '\r') {
                    // a text character was received from client
                    currentLineIsBlank = false;
                }
            } // end if (client.available())
        } // end while (client.connected())
        delay(1);      // give the web browser time to receive the data
        client.stop(); // close the connection
    } // end if (client)
}
void ProcessRequest(EthernetClient cl)
{
    if (HTTP_req.indexOf("GET") > -1) {  // see if checkbox was clicked
        // the checkbox was clicked, toggle the LED
        Serial.print(HTTP_req+"\n");

        if (HTTP_req.length() > 18) {
            // GET more then root
            //GET_Pars = HTTP_req.substring(5);
            Serial.print("GET  = " + String(HTTP_req.indexOf("GET")) + "\n");
            Serial.print("HTTP = " + String(HTTP_req.indexOf("HTTP")) + "\n");
            GET_Pars = HTTP_req.substring(HTTP_req.indexOf("GET")+4,HTTP_req.indexOf("HTTP"));
            //Serial.print("GET_Pars = " + GET_Pars);
            //GET_Pars = getValue(HTTP_req, '/', 1);
            //Serial.print("GET_Pars = " + GET_Pars);
            PortFaction  = getValue(GET_Pars, '/', 1);
            PortHealth   = getValue(GET_Pars, '/', 2);
            Reso1        = getValue(GET_Pars, '/', 3);
            Reso2        = getValue(GET_Pars, '/', 4);
            Reso3        = getValue(GET_Pars, '/', 5);
            Reso4        = getValue(GET_Pars, '/', 6);
            Reso5        = getValue(GET_Pars, '/', 7);
            Reso6        = getValue(GET_Pars, '/', 8);
            Reso7        = getValue(GET_Pars, '/', 9);
            Reso8        = getValue(GET_Pars, '/', 10);
            ResoMod      = getValue(GET_Pars, '/', 11);
            Serial.print("PortFaction  = " + PortFaction +"\n");
            Serial.print("PortHealth   = " + PortHealth  +"\n");
            Serial.print("Reso1        = " + Reso1       +"\n");
            Serial.print("Reso2        = " + Reso2       +"\n");
            Serial.print("Reso3        = " + Reso3       +"\n");
            Serial.print("Reso4        = " + Reso4       +"\n");
            Serial.print("Reso5        = " + Reso5       +"\n");
            Serial.print("Reso6        = " + Reso6       +"\n");
            Serial.print("Reso7        = " + Reso7       +"\n");
            Serial.print("Reso8        = " + Reso8       +"\n");
            Serial.print("ResoMod      = " + ResoMod     +"\n");
        }
        else {

        }
    }
    // IF then anywhere
    if (LED_status) {    // switch LED on
        //digitalWrite(2, HIGH);
        // checkbox is checked
        //cl.println("<input type=\"checkbox\" name=\"LED2\" value=\"2\" \
        //onclick=\"submit();\" checked>LED2");
    }
    else {              // switch LED off
        //digitalWrite(2, LOW);
        // checkbox is unchecked
        //cl.println("<input type=\"checkbox\" name=\"LED2\" value=\"2\" \
        //onclick=\"submit();\">LED2");
    }
}

//LED LED LED LED LED LED LED LED LED LED LED LED LED
//LED LED LED LED LED LED LED LED LED LED LED LED LED
//LED LED LED LED LED LED LED LED LED LED LED LED LED

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void FillLEDsFromPaletteColors( uint8_t colorIndex)
{
    uint8_t brightness = 255;

    for( int i = 0; i < NUM_LEDS; i++) {
        leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, currentBlending);
        colorIndex += 3;
    }
}


void ChangePalettePeriodically()
{
    uint8_t secondHand = (millis() / 1000) % 60;
    static uint8_t lastSecond = 99;

    if( lastSecond != secondHand) {
        lastSecond = secondHand;
        if( secondHand ==  0)  { currentPalette = RainbowColors_p;         currentBlending = LINEARBLEND; Serial.println("Beginn...");}
        if( secondHand == 10)  { currentPalette = RainbowStripeColors_p;   currentBlending = NOBLEND;  }
        if( secondHand == 15)  { currentPalette = RainbowStripeColors_p;   currentBlending = LINEARBLEND; }
        if( secondHand == 20)  { SetupPurpleAndGreenPalette();             currentBlending = LINEARBLEND; }
        if( secondHand == 25)  { SetupTotallyRandomPalette();              currentBlending = LINEARBLEND; }
        if( secondHand == 30)  { SetupBlackAndWhiteStripedPalette();       currentBlending = NOBLEND; }
        if( secondHand == 35)  { SetupBlackAndWhiteStripedPalette();       currentBlending = LINEARBLEND; }
        if( secondHand == 40)  { currentPalette = CloudColors_p;           currentBlending = LINEARBLEND; }
        if( secondHand == 45)  { currentPalette = PartyColors_p;           currentBlending = LINEARBLEND; }
        if( secondHand == 50)  { currentPalette = myRedWhiteBluePalette_p; currentBlending = NOBLEND;  }
        if( secondHand == 55)  { currentPalette = myRedWhiteBluePalette_p; currentBlending = LINEARBLEND; }
    }
}

// This function fills the palette with totally random colors.
void SetupTotallyRandomPalette()
{
    for( int i = 0; i < 16; i++) {
        currentPalette[i] = CHSV( random8(), 255, random8());
    }
}

// This function sets up a palette of black and white stripes,
// using code.  Since the palette is effectively an array of
// sixteen CRGB colors, the various fill_* functions can be used
// to set them up.
void SetupBlackAndWhiteStripedPalette()
{
    // 'black out' all 16 palette entries...
    fill_solid( currentPalette, 16, CRGB::Black);
    // and set every fourth one to white.
    currentPalette[0] = CRGB::White;
    currentPalette[4] = CRGB::White;
    currentPalette[8] = CRGB::White;
    currentPalette[12] = CRGB::White;

}

// This function sets up a palette of purple and green stripes.
void SetupPurpleAndGreenPalette()
{
    CRGB purple = CHSV( HUE_PURPLE, 255, 255);
    CRGB green  = CHSV( HUE_GREEN, 255, 255);
    CRGB black  = CRGB::Black;

    currentPalette = CRGBPalette16(
                                   green,  green,  black,  black,
                                   purple, purple, black,  black,
                                   green,  green,  black,  black,
                                   purple, purple, black,  black );
}


// This example shows how to set up a static color palette
// which is stored in PROGMEM (flash), which is almost always more
// plentiful than RAM.  A static PROGMEM palette like this
// takes up 64 bytes of flash.

const TProgmemPalette16 myRedWhiteBluePalette_p PROGMEM =
{
    CRGB::Red,
    CRGB::Gray, // 'white' is too bright compared to red and blue
    CRGB::Blue,
    CRGB::Black,

    CRGB::Red,
    CRGB::Gray,
    CRGB::Blue,
    CRGB::Black,

    CRGB::Red,
    CRGB::Red,
    CRGB::Gray,
    CRGB::Gray,
    CRGB::Blue,
    CRGB::Blue,
    CRGB::Black,
    CRGB::Black
};
