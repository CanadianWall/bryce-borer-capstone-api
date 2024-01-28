const express = require('express');
const app = express();
const port = process.env.REACT_APP_PORT || 8080;
const jwt = require("jsonwebtoken");
// const FOOD_URL = process.env.REACT_APP_FOOD_URL;
// const API_KEY = process.env.API_KEY;
const tempFood = require ('./sampleOutput/sandwich.json')

const { PORT, CORS_ORIGIN, API_KEY, FOOD_URL, JSON_SECRET_KEY} = process.env

const cors = require('cors');
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

app.use(express.json());
app.use(cors());

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

app.post("/foodImage", (req, res) => {
  let data = new FormData();
  data.append('image', fs.createReadStream(`C:/Users/bryce/Brainstation/bryce-borer-capstone/src/assets/images/${req.body.fileName}`), { encoding: null });
  console.log("API KEY ",API_KEY)
  console.log(req.body.fileName)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: "https://vision.foodvisor.io/api/1.0/en/analysis/",
    headers: {
      'Authorization': `Api-Key ${API_KEY}`,
      ...data.getHeaders()
    },
    data: data
  };

  //call to foodvisor API

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  //res.send(tempFood)
});

//Authentication
app.use((req, res, next) => {
  // Signup and login are public URLs that don't require a token
  if (req.url === "/signup" || req.url === "/login") {
    next();
  } else {
    // Format of request is BEARER <token>. Splitting on ' ' will create an
    // array where the token is at index 1
    const token = getToken(req);

    if (token) {
      console.log('Auth Token:', token);
      if (jwt.verify(token, "f91e4494-04b3-4d49-8c27-57faed9e5785")) {
        // Decode the token to pass along to end-points that may need
        // access to data stored in the token.
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}

const users = {
  name: 'Bryce',
  username: 'Bryce',
  password: 'bryce'
};

app.post("/signup", (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a              // library like bcrypt to Hash the password. For demo purposes only.
  };
  console.log('Users Object:', users);
  res.json({ success: "true" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    console.log('Found user:', user);
    res.json({ token: jwt.sign({ name: user.name }, "f91e4494-04b3-4d49-8c27-57faed9e5785") });
  } else {
    res.status(403).json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      },
    });
  }
});

app.get("/account", (req, res) => {
  res.json(req.decode);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
