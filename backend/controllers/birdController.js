const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Session = require('../model/sessionModel')


// Post a new  bird to your spotted bird list
// Route POST api/bird/
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
// Route    GET api/bird/
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
// Route GET api/bird/last
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
// Route    POST api/bird/single
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
// Route    POST api/bird/watch
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
        user: req.user.id,
        icon: req.body.icon,
        city: req.body.city,
        lon: req.body.lon,
        lat: req.body.lat,
    })

    res.status(200).json({message: "Posted"})

});


// Get Start a bird watching session
// Route    GET api/bird/watch
const getWatch = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }


    const session = await Session.find({user: user}).sort({createdAt: -1}).limit(1)

    res.status(200).json(session[0])
});


// Post birds  from watching session
// Route    POST api/bird/watch
const postWatch = asyncHandler(async (req, res) => {


    const update = await Session.findOneAndUpdate(
        {
            _id: req.body.id,
        }, {
            $addToSet: {
                count: {
                    count: req.body.count,
                    comName: req.body.comName,
                    speciesCode: req.body.speciesCode
                }
            }
        },


        /*
          { $set:
                {
                    "count.$.comName": req.body.comName,
                    "count.$.SpeciesCode": req.body.speciesCode,
                    "count.$.count": req.body.count,
                }
        },
         */
    )

    res.status(200).json({message: "Posted"})

});


//   Update Wtch with caount
//  PUT /api/tickets/:id
const updateCount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const existingProduct = await Session.findOne({
        _id: req.body.id,
        'count.speciesCode': req.body.speciesCode,
    });

    let updatedCount;
    if (existingProduct) {
        // Update existing product
        updatedCount = await Session.findOneAndUpdate(
            {_id: req.body.id, 'count.speciesCode': req.body.speciesCode},
            {
                'count.$': {   //'count.$.count'
                    count: req.body.count,
                    speciesCode: req.body.speciesCode,
                    comName: req.body.comName,
                    birdid: req.body.birdid
                },
            },
            {
                new: true,
                upsert: true,
            }
        );
    } else {
        // Insert new product
        updatedCount = await Session.findByIdAndUpdate(req.body.id,
            {
                $push: {
                    count: {
                        count: req.body.count,
                        speciesCode: req.body.speciesCode,
                        comName: req.body.comName,
                        birdid: req.body.birdid
                    },
                },
            },
            {
                new: true,
                upsert: true,
            }
        );
    }

    res.status(200).json(updatedCount);
});


module.exports = {
    getBirds,
    createBird,
    getLast,
    postSingle,
    postStart,
    getWatch,
    postWatch,
    updateCount
}