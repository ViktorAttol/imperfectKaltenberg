// ArrayOfLedArrays - see https://github.com/FastLED/FastLED/wiki/Multiple-Controller-Examples for more info on
// using multiple controllers.  In this example, we're going to set up three NEOPIXEL strips on three
// different pins, each strip getting its own CRGB array to be played with, only this time they're going
// to be all parts of an array of arrays.

#include <FastLED.h>

#define NUM_RESOS 8
#define NUM_LEDS_PER_RESO 5

#define NUM_PORTAL_STRIPS 2
#define NUM_LEDS_PER_PORTAL_STRIP 5

#define LED_TYPE WS2811
#define COLOR_ORDER GRB

CRGB resos[NUM_RESOS][NUM_LEDS_PER_RESO];
CRGB portal_strips[NUM_PORTAL_STRIPS][NUM_LEDS_PER_PORTAL_STRIP];

// For mirroring strips, all the "special" stuff happens just in setup.  We
// just addLeds multiple times, once for each strip
void setup() {
  FastLED.addLeds<LED_TYPE, 0, COLOR_ORDER>(resos[0], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 1, COLOR_ORDER>(resos[1], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 2, COLOR_ORDER>(resos[2], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 3, COLOR_ORDER>(resos[3], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 4, COLOR_ORDER>(resos[4], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 5, COLOR_ORDER>(resos[5], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 6, COLOR_ORDER>(resos[6], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 7, COLOR_ORDER>(resos[7], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );

  FastLED.addLeds<LED_TYPE, 8, COLOR_ORDER>(portal_strips[0], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
  FastLED.addLeds<LED_TYPE, 9, COLOR_ORDER>(portal_strips[1], NUM_LEDS_PER_RESO).setCorrection( TypicalLEDStrip );
}

void loop() {
  for(int x = 0; x < NUM_LEDS_PER_RESO; x++) {
    for(int i = 0; i < NUM_RESOS; i++) {
      resos[i][x] = CRGB::Red;
    }
    for(int i = 0; i < NUM_PORTAL_STRIPS; i++) {
      portal_strips[i][x] = CRGB::Blue;
    }
    FastLED.show();
    for(int i = 0; i < NUM_RESOS; i++) {
      resos[i][x] = CRGB::Black;
    }
    for(int i = 0; i < NUM_PORTAL_STRIPS; i++) {
      portal_strips[i][x] = CRGB::Black;
    }
    delay(50);
  }
}
