#include <EthernetClient.h>
#include <Ethernet.h>
#include <Dhcp.h>
#include <EthernetServer.h>
#include <Dns.h>
#include <EthernetUdp.h>

#include <FastLED.h>
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>

// target led configuration 8 x 19 (9 arm + 1 knick + 9 reso)

#define NUM_RESOS 8
#define NUM_LEDS_PER_RESO 5

#define LED_TYPE WS2811
#define COLOR_ORDER GRB

CRGB resos[NUM_RESOS][NUM_LEDS_PER_RESO];

// MAC address from Ethernet shield sticker under board
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 177, 83); // IP address, may need to change depending on network
EthernetServer server(80);  // create a server at port 80

void setup() {
    FastLED.addLeds<LED_TYPE, 0, COLOR_ORDER>(resos[0], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 1, COLOR_ORDER>(resos[1], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 2, COLOR_ORDER>(resos[2], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 3, COLOR_ORDER>(resos[3], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 4, COLOR_ORDER>(resos[4], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 5, COLOR_ORDER>(resos[5], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 6, COLOR_ORDER>(resos[6], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
    FastLED.addLeds<LED_TYPE, 7, COLOR_ORDER>(resos[7], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );

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

    delay( 3000 ); // power-up safety delay
}

void loop() {
    EthernetClient client = server.available();  // try to get client
    String HTTP_req = "";

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
                    File webFile = SD.open("index.htm");        // open web page file
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

                    if (HTTP_req.indexOf("GET /") > -1 && HTTP_req.length() > 35) {
                        String cmd = HTTP_req.substring(HTTP_req.indexOf("GET")+4,HTTP_req.indexOf("HTTP"));
                        processCmd(cmd);
                    }

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

String getValue(String data, char separator, int index) {
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

void processCmd(String cmd) {
    Serial.print(cmd + '\n');
    char faction = getValue(cmd, '/', 1).charAt(0);
    CRGB factionColor = CRGB::White;
    if (faction == 'r') {
        factionColor = CRGB::Blue;
    } else if (faction == 'e') {
        factionColor = CRGB::Green;
    }

    for(int x = 0; x < NUM_LEDS_PER_RESO; x++) {
        for(int i = 0; i < NUM_RESOS; i++) {
            resos[i][x] = CRGB::Black;
        }
        FastLED.show();
        for(int i = 0; i < NUM_RESOS; i++) {
            resos[i][x] = factionColor;
        }
        delay(100);
    }
}

