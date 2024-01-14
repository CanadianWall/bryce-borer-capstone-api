const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const fetch = require("node-fetch")
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

// const url = "https://vision.foodvisor.io/api/1.0/en/analysis/";
// const API_KEY = "WGUmFqSK.gcxjKP1cm9F4MaLTZUlntSeuQWpHWreI"
// const headers = {
//   "Content-Type": "multipart/form-data; boundary=<calculated when request is sent></calculated>",
//   "Authorization": `Api-Key ${API_KEY}`
// };
// const pizzaDir = "/C:/Users/bryce/Brainstation/bryce-borer-capstone/src/assets/images/pizza.jpeg"

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
//data.append('image', fs.createReadStream('C:/Users/bryce/Brainstation/bryce-borer-capstone/src/assets/images/pizza.jpeg'), { encoding: null });


app.post("/foodImage", upload.single('foodImage'), (req, res) => {
  data.append('image', fs.createReadStream('./ham-sandwich.jpeg'));

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
  res.send("ok!!")
});

// app.post("/foodImage2", (req, res) =>{
//   fs.readFile("./pizza.jpg", (err, image) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   console.log(image)
//     fetch(url, {
//       method: 'POST',
//       headers: headers,
//       body: image
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data)
//       res.send("ok2!")
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   });

// })














// app.post("/foodImage", upload.single('foodImage'), async (req, res) => {
//   //console.log(req)
//   //console.log(req.file)
//   let form = new FormData();
//   form.append("image", pizzaDir)
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { ...headers, ...form.getHeaders()},
//     body: form
//   })
//     .then((res2 => {
//       return res2.json()
//     }))
//   console.log(response)
//   res.send("ok!")
// });

// app.post("/foodImage2", (req, res) =>{
//   fs.readFile("./pizza.jpg", (err, image) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   console.log(image)
//     fetch(url, {
//       method: 'POST',
//       headers: headers,
//       body: image
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data)
//       res.send("ok2!")
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   });

// })

// axios
//   .post(url, formData, { headers: headers })
//   .then((res) => {
//     console.log(res)
//     setFoodData(res)
//   })
//   .catch((e) => {
//     console.log(e)
//   })









function authorize(req, res, next) {
  // STEP 2: Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point and respond with an error status code.
}

const users = {};

// Some Basic Sign Up Logic. Take a username, name,
// and password and add it to an object using the
// provided username as the key
app.post('/signup', (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
    // library like bcrypt to Hash the password. For demo purposes only.
  };
  res.json({ success: 'true' });
});

// A Basic Login end point
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
  }
});

// A Profile end-point that will return user information,
// in this example, the user's name that they provided
// when they signed up.
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
app.get('/profile', authorize, (req, res) => {
  res.json(req.decoded);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
