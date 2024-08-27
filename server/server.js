
require('dotenv').config();

//PROD
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


var shippo = require('shippo')(process.env.SHIPPO_KEY);

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const NodeCache = require('node-cache');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const lightspeedToken = process.env.LIGHTSPEED_API_TOKEN;

const app = express();

app.use(bodyParser.json());


// app.use(cors({
//   origin: 'http://localhost:4200', 
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

// app.use(cors({
//   origin: 'https://theofficialwebsiteguys.github.io', // Replace with your actual frontend URL
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

const allowedOrigins = ['https://ltdhype.com', 'https://www.ltdhype.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// app.use(cors({
//   origin: 'https://ltdhype.com', // Replace with your actual frontend URL
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
