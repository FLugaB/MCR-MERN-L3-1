if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const cors = require('cors')
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const route = require("./routes");
const { connect } = require('./config/mongosConfig')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect()
  .then( async (db) => {
    app.use((req, res, next) => {
      req.dbConnection = db
      next()
    })
    app.use("/", route);
    app.listen(port, () => {
      console.log(`server http://localhost:${port}`);
    });
  })
  .catch( err => {
    console.log(err)
  })