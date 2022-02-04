const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) 
    {
        return res.status(400).json("Invalid information entered!");
    }
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    
    // database.users.push(
    //     {
    //         id:'125', 
    //         name:name,
    //         email:email,
    //         password:password,
    //         entries:0,
    //         joined: new Date()
    //     }
    // )
    //console.log("REGISTERING USER");
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=> {
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:loginEmail[0].email,
                joined: new Date()
            })
            .then(user=> res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err=> res.status(400).json("Unable to register!"));
}

module.exports = {
    handleRegister: handleRegister
};