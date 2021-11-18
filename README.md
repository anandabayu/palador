## Config Database

create a new database name `palador` in postgresql and config database connection in `.env` file.

## Install Package

```Shell
npm install -g nodemod  // installing nodemon for development server
npm install             // installing all required packages
```

## Running Application

before running for the first time please find `db.sequelize.sync({ force: false })` in `app.js` file and set `force: true` this will auto migrate the database table.

if you already run application and migrate the databse please disable it again so the database will not lose it data everytime node server restarted.

```Shell
npm start
```

## Unit Test

if you already run the application for the first time, please turn `db.sequelize.sync({ force: true })` to `force: false` before running the test.

```Shell
npm test
```

## Postman Collection

You can import postman collection from `postman/collection.json` to your postman and don't forget to add `URL` variable in your environtment.
