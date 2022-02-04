const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0165cc8b155f46039cf51f253b1dc35e'
  });

const handleImageApi = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(data => res.json(data))
    .catch(err=> res.status(400).json("Error fetching the api"));
}

const handleImage = (req, res, db)=> {
    const {id} = req.body;
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
    // console.log("Entries are ", entries[0].entries);
        return res.json(entries[0].entries); })
 }

 module.exports = {
     handleImage: handleImage,
     handleImageApi: handleImageApi
 }

 // console.log("id fetched from request is ", id);
    // let found=false;
    // database.users.forEach(user => {
    //     if(user.id === id)
    //         {   
    //             found=true;
    //             user.entries++;
    //             res.json(user.entries);
    //         }
    // })
    // if(!found)
    //     res.status(400).json("No such user!");
