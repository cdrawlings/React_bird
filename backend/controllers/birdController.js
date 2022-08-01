const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Session = require('../model/sessionModel')



// Post a new  bird
// Route api/bird/
const createBird = asyncHandler(async (req, res) => {
//Get user with ID  in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const seen = await Bird.exists({
        speciesCode: req.body.speciesCode,
        user: req.user.id
    })

    if (seen) {
        res.status(401)
        throw new Error("You have already spotted that bird!")
    }

    try {
        let session = new Bird()
        session.comName = req.body.comName
        session.speciesCode = req.body.speciesCode
        session.user = req.user.id
        session.save(function (err) {
            if (err) {
                console.log(err)
            } else {
            }
        })
        res.status(200).json(session)
    } catch (err) {
        console.error(err)
        res.status(400).json({message: "Bird not added to your spotted birds"})
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

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const bird = await Bird.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

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

    const update = await Session.create({
        temperature: req.body.temperature,
        condition: req.body.condition,
        visibility: req.body.visibility,
        icon: req.body.icon,
        city: req.body.city,
        lon: req.body.lon,
        lat: req.body.lat,
        user,
        count: {
            count: req.body.count,
            comName: req.body.comName,
            speciesCode: req.body.speciesCode,
            birdid: req.body.birdid,
        }
    });

    res.status(200).json({message: "Posted single bird"})

});


// Post birds  from watching session
// Route    api/bird/watch
const postStart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const update = await Session.create({
        temperature: req.body.temperature,
        condition: req.body.condition,
        visibility: req.body.visibility,
        icon: req.body.icon,
        city: req.body.city,
        lon: req.body.lon,
        lat: req.body.lat,
    })

    let id = update._id;
    console.log("id", id)

    res.status(200).json({message: "Posted"})

});


// Get Start a bird watching session
// Route    api/bird/watch
const getWatch = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const session = await Session.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

    res.status(200).json("session[0]")

});


module.exports = {
    getBirds,
    createBird,
    getLast,
    postSingle,
    postStart,
    getWatch
}