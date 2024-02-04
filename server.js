const express = require('express');
const app = express();

const { PORT, API_KEY, FOOD_URL, IMAGE_DIRECTORY} = process.env
const port = PORT || 8080;

const cors = require('cors');
app.use(express.json());
app.use(cors());


const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');

app.post("/foodImage", (req, res) => {
  let data = new FormData();
  data.append('image', fs.createReadStream(`${IMAGE_DIRECTORY}/${req.body.fileName}`), { encoding: null });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: FOOD_URL,
    headers: {
      'Authorization': `Api-Key ${API_KEY}`,
      ...data.getHeaders()
    },
    data: data
  };

  //call to foodvisor API

  axios.request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

});


app.get('/data', (req, res) => {
  res.send('Welcome to my API');
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
