const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors")
const app = express();

const database = {
    users: [
        {
            id:'123',
            name: "Rudraksh",
            email:'rt671@gmail.com',
            password:'myfirst',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name: "Sanchay",
            email:'sj255@gmail.com',
            password:'yourfirst',
            entries:0,
            joined: new Date()
        }
    ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    //req = JSON.parse(req);
    // bcrypt.compare(req.body.password, '$2a$10$DOv1MTb3DkzHXEVAp6MWQOyZc1NoltQF4grW3RTmDYXoJVyspll4', function(err, res) {
    //     console.log("Response is ", res);
    // });
    // bcrypt.compare("bacon", '$2a$10$DOv1MTb3DkzHXEVAp6MWQOyZc1NoltQF4grW3RTmDYXoJVyspll4', function(err, res) {
    //     console.log("Response is ",res);
    // });
   // console.log(req.body);
    if(req.body.email===database.users[0].email
        && req.body.password===database.users[0].password)
        res.json(database.users[0]);
    else
        res.status(400).json('Sorry! Wrong Password!');
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    
    database.users.push(
        {
            id:'125', 
            name:name,
            email:email,
            password:password,
            entries:0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found=false;
    database.users.forEach(user => {
        if(user.id === id)
            {   
                found=true;
                res.json(user);
            }
    })
    if(!found)
        res.status(400).json("No such user!");
 })

 app.put('/image', (req, res)=> {
    const {id} = req.body;
    console.log("id fetched from request is ", id);
    let found=false;
    database.users.forEach(user => {
        if(user.id === id)
            {   
                found=true;
                user.entries++;
                res.json(user.entries);
            }
    })
    if(!found)
        res.status(400).json("No such user!");
 })
app.listen(2000, () => {console.log("The server is running!")});