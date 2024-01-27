const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
//const fetch = require("node-fetch")
const FOOD_URL = process.env.FOOD_URL;
// let FormData = require('form-data');
// const fs = require("fs")

// const API_KEY = process.env.API_KEY;
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(express.json());
app.use(cors());



const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();

//app.get("/foodImage", upload.single('foodImage'), (req, res) => {
app.post("/foodImage", (req, res) => {
  //data.append('image', fs.createReadStream('./ham-sandwich.jpeg'));
  data.append('image', fs.createReadStream(`C:/Users/bryce/Brainstation/bryce-borer-capstone/src/assets/images/${req.body.fileName}`), { encoding: null });
console.log(req.body.fileName)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://vision.foodvisor.io/api/1.0/en/analysis/',
    headers: {
      'Authorization': 'Api-Key WGUmFqSK.gcxjKP1cm9F4MaLTZUlntSeuQWpHWreI',
      ...data.getHeaders()
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  //res.send(response.data)
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
