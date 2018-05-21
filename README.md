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
