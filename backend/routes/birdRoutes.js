const express = require('express');
const router = express.Router();
const {getBirds, createBird, getLast} = require('../controllers/birdController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getBirds)

router.post('/', protect, createBird)

router.get('/new_bird', protect, getLast)


// router.get('/:id', protect)

module.exports = router