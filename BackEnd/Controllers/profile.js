const handleProfile = (req, res, db) => {
    const {id} = req.params;
    //let found=false;
    // database.users.forEach(user => {
    //     if(user.id === id)
    //         {   
    //             found=true;
    //             res.json(user);
    //         }
    // })
    // if(!found)
    //     res.status(400).json("No such user!");

    db.select('*').from('users').where({id:id})
    .then(user=>
        {
            if(user.length===0) res.status(400).json("User not found!");
            else res.json(user[0]);
        }
        
    );
 }

 module.exports ={
     handleProfile: handleProfile
 }