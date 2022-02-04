const handleSignIn = (req, res, db, bcrypt) => {
    //req = JSON.parse(req);
    // bcrypt.compare(req.body.password, '$2a$10$DOv1MTb3DkzHXEVAp6MWQOyZc1NoltQF4grW3RTmDYXoJVyspll4', function(err, res) {
    //     console.log("Response is ", res);
    // });
    // bcrypt.compare("bacon", '$2a$10$DOv1MTb3DkzHXEVAp6MWQOyZc1NoltQF4grW3RTmDYXoJVyspll4', function(err, res) {
    //     console.log("Response is ",res);
    // });
   // console.log(req.body);

    // if(req.body.email===database.users[0].email
    //     && req.body.password===database.users[0].password)
    //     res.json(database.users[0]);
    // else
    //     res.status(400).json('Sorry! Wrong Password!');

    const {email, password} = req.body;
    db.select('email', 'hash').from('login').where('email', '=', email)
    .then( data => {
        if(bcrypt.compareSync(password, data[0].hash))
        {
            db.select('*').from('users').where('email', '=', email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('Unable to find user'));
        }
    }
    )
    .catch(err=> res.status(400).json('User not registered!'));
}

module.exports = {
    handleSignIn:handleSignIn
}