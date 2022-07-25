const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Session = require('../model/sessionModel')
const Count = require('../model/sessionModel')


// Post a new  bird
// Route api/bird/
const createBird = asyncHandler(async (req, res) => {
//Get user with ID  in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    try{
        let session =  new Bird()
        session.comName = req.body.comName
        session.speciesCode = req.body.speciesCode
        session.user = req.user.id
        session.save(function (err) {
            if (err){
                console.log(err)
            } else {
                console.log("New Bird Added")
            }
        })
        console.log("id: ", session)
        res.status(200).json(session)
    } catch (err) {
        console.error(err)
        res.status(400).json({message: "oops"})
    }
});


// get ALL previously seen birds by user
// Route    api/bird/
const  getBirds = asyncHandler(async (req, res) => {
   //Get user with ID  in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const birds =await Bird.find({user: req.user.id})

    res.status(200).json(birds)

   });


// get Last bird entered for user
// Route    api/bird/last
const  getLast = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT
    console.log("Bird 1")

    const user = await User.findById(req.user.id)

    console.log("Bird 1", user)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const bird = await Bird.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

    console.log("Bird 3", bird[0])

    res.status(200).json(bird[0])
});

// Post single bird to Session model
// Route    api/bird/single
const postSingle = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const update = await Session.updateOne(
        {"_id": user},
        {

            $set: {
                temperature: req.body.temperature,
                condition: req.body.condition,
                visibility: req.body.visibility,
                city: req.body.city,
                lon: req.body.lon,
                lat: req.body.lat
            },
            $addToSet: {
                count: {
                    count: req.body.count,
                    comName: req.body.comName,
                    speciesCode: req.body.speciesCode,
                    birdid: req.body.birdid,
                }
            }
        }, {
            new: true,
            upsert: true,
            rawResult: true
        });

    /*
        try{
            let session =  new Session()
            session.temperature = req.body.temperature
            session.condition = req.body.condition
            session.visibility = req.body.visibility
            session.lat = req.body.lat
            session.lon = req.body.lon
            session.city = req.body.city

            session.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New bird Added")
                }
            })





        } catch (err) {
            console.error(err)
            res.status(400).json({message: "oops"})
        }

     */

    res.status(200).json({message: "Posted single bird"})

});


module.exports = {
    getBirds,
    createBird,
    getLast,
    postSingle
}