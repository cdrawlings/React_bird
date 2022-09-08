const express = require('express');
const router = express.Router();
const {
    getBirds,
    createBird,
    getLast,
    postSingle,
    postStart,
    getWatch,
    postWatch,
    updateCount
} = require('../controllers/birdController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getBirds)

router.post('/', protect, createBird)

router.get('/new_bird', protect, getLast)

router.post('/new_bird', protect, postSingle)

router.post('/start', protect, postStart)

router.get('/watch', protect, getWatch)

router.post('/watch', protect, postWatch)

router.put('/watch', protect, updateCount)

module.exports = router