# SAPI &nbsp ![node18](https://img.shields.io/badge/node-18.18-green.svg) &nbsp ![express4](https://img.shields.io/badge/express-4.18-green.svg)
A Super Auto Pets (SAP) RESTful API. [sapi.up.railway.app](https://sapi.up.railway.app/api/v1/)
It uses Node.js with Express.js and connects to a Mongo database stored in MongoDB Atlas.

### Setup
* Download this repo.
* Install dependencies with npm: `npm install`
* Setup your own database: since i'm using Atlas i don't have mongodb installed. If you do, set up the database and the connection through the variables in the `.env` file.
* Setup the `.env` file:
	* MONGODB_URL: the complete url (including username and password) to connect to your database.
	* JWT_SECRET: the secret throw which the users will be validated.
	* (**optional**) PORT: the port you want the api to be on.
* Run locally with: `npm run dev`. This will reset every time you save a file (has --watch option). You can use `npm run start` to start the API without the `--watch` flag.

## Docs
You can read v1 docs [here](./src/docs/ENDPOINTS.md)

## TODO
- [ ] Add pagination
- [ ] Add filtering
- [ ] Add ordering