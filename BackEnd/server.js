const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require("./Controllers/register");
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");

const app = express();

const db = knex(
    {
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : 'hello',
          database : 'face-detection'
        }
      }
);

// db.select('*').from('users')
// .then(response => console.log(response))
// .catch(err => console.log(err))

// const database = {
//     users: [
//         {
//             id:'123',
//             name: "Rudraksh",
//             email:'rt671@gmail.com',
//             password:'myfirst',
//             entries:0,
//             joined: new Date()
//         },
//         {
//             id:'124',
//             name: "Sanchay",
//             email:'sj255@gmail.com',
//             password:'yourfirst',
//             entries:0,
//             joined: new Date()
//         }
//     ]
// }

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.json(database.users);
// })

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image',(req, res) => image.handleImage(req,res,db));
app.post('/imageUrl', (req, res) => image.handleImageApi(req, res));
app.listen(2000, () => {console.log("The server is running!")});
