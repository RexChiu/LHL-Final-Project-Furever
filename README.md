# LHL-Final-Project-Furever# Wiki-Maps

## Project Description

Lighthouse Labs final project written with Jaron Evans and Sai Gautam in 2 weeks

Furever is a pet adoption site that focuses on the entire pet ecosystem, from adoption to care.
It has a listing page of adoptable pets, personalized pet care info according to adopted pets, and an events page for pet owners.

This project is built with React and React Router for the front end, NodeJS Express for the middleware, and Cloud Firestore for the database.
Other technologies used are Waypoints for infinite scrolling of paginated DB queries, Cheerio for webscraping of petcare, and cloud hosting by Heroku.
APIs used include the Petfinder API for populating the database with pets, and Google Places api for vet and petstore info.

## Screenshots
!["Screenshot of home page"](https://github.com/RexChiu/LHL-Final-Project-Furever/blob/master/docs/home%20page.PNG)
!["Screenshot of adoption page"](https://github.com/RexChiu/LHL-Final-Project-Furever/blob/master/docs/pet%20adoption.PNG)
!["Screenshot of care page"](https://github.com/RexChiu/LHL-Final-Project-Furever/blob/master/docs/pet%20care.PNG)
!["Screenshot of events page"](https://github.com/RexChiu/LHL-Final-Project-Furever/blob/master/docs/Events%20Page.PNG)

## Getting Started
### Server
1. cd into the Server folder, and create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct API keys for Petfinder and Google Places
3. Place your firebase serviceAccountKey.json inside the Server folder
4. Install dependencies in server folder: `npm i`
5. Run the server using: `npm start`

### Client
1. cd into the Client folder
2. Install dependencies in client folder: `npm i`
3. Run the client using `npm start`
4. Visit the site via localhost:3000

## Heroku Hosting
Client Hosting:
http://furever-client.herokuapp.com/
Server Hosting: (API server)
http://furever-server.herokuapp.com/

## Dependencies

### Server
- Node 5.10.x or above
- NPM 3.8.x or above
- Babel
- Bcrypt
- Cheerio
- Cors
- Dotenv
- Express
- Firebase
- Firebase-admin
- Jsonapi-serializer

### Client
- Node 5.10.x or above
- NPM 3.8.x or above
- Axios
- Babel
- Webpack
- Dotenv
- Node-sass
- React
- React-Router
- React-Waypoint
- React-Bootstrap
