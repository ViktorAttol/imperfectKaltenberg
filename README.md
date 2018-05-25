# Imperfect Humanist

The Imperfect Humanist JS App provides an express backend API to provide portal status and a React frontend to visualize portal status.

## Setup
```
 cd client
 npm install
 cd ..
 npm install
```

The frontend requires at least one video to be present in `client/public/video/001.webm`. Videos are not committed to git and need to be manually placed.

## Run in dev
```
 # npm start on project root will bring up the backend on http://localhost:3001 and the frontend on http://localhost:3000
 npm start 
```

## Build and serve
```
 # building the react client
 cd client
 npm build
 cd ..

 # npm run server will bring up the full Imperfect Humanist application (frontend and backend) on http://localhost:3001
 npm run server
```

## Communication from RasPi to Arduino
The NodeJS/express based backend pulls portal state every 500ms from NIA API.
It pushes this state forward to the Arduino, by making HTTP GET calls, whenever status changes, at most every 10s,
at minimum every 60s. The portal state information is encoded in the GET URI, e.g.,
```
 GET /r/100/1/2/3/4/5/6/7/8/0 HTTP/1.1
```
Legend:
 * position 1: controllingFaction ('n' neutral, 'r' resistance, 'e' enlightened)
 * position 2: averagePortalHealth (0 - 100)
 * position 3-10: resonatorLevel (0 no resonator, 1-8 respective level)
 * position 11: extra effect (0 no effect)