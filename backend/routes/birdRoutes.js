const express = require('express');
const router = express.Router();
const {getBirds, createBird, getLast, postSingle, postStart, getWatch} = require('../controllers/birdController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getBirds)

router.post('/', protect, createBird)

router.get('/new_bird', protect, getLast)

router.post('/new_bird', protect, postSingle)

router.post('/start', protect, postStart)

router.get('/watch', protect, getWatch)

module.exports = router