
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const FOOD_URL = process.env.FOOD_URL;
const cors = require('cors');

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
data.append('image', fs.createReadStream('/C:/Users/bryce/Brainstation/bryce-borer-capstone/src/assets/images/pizza.jpeg'));

app.use(express.json());
app.use(cors());

app.post("/foodImage", (req, res) => {
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
           
        })
        .catch((error) => {
            console.log(error);
        });
    res.send("OKAY!")
})