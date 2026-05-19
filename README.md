Caterers Near Me Backend

A backend REST API for the Caterers Near Me platform built using Node.js and Express.js.

Features
Get all caterers
Get caterer by ID
Add new caterer
Search caterers by name
Filter caterers by price
Basic validation
JSON file storage
Tech Stack
Node.js
Express.js
CORS
dotenv
Folder Structure

backend
┣ data
┃ ┗ caterers.json
┣ routes
┃ ┗ catererRoutes.js
┣ server.js
┣ package.json
┗ .env

Backend Setup
Install dependencies

npm install

Run backend

npm run dev

Backend runs on:

http://localhost:5000

Environment Variables

Create .env file:

PORT=5000

API Endpoints
Get all caterers

GET /api/caterers

Get caterer by ID

GET /api/caterers/:id

Create new caterer

POST /api/caterers

Query Parameters
Search by name

/api/caterers?search=royal

Filter by price

/api/caterers?price=low

Available price filters:

low
medium
high
Validation

POST request validates:

name
location
pricePerPlate
cuisines
rating
Deployment

Backend deployed on Render.

Author

Dinesh Prajapati
