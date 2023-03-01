const express = require('express'); //loading express
const router = express.Router(); // loading router from express
const Joi = require('joi'); // this is a class

const genres = [{ id: 1, name: 'genre1' },
{ id: 2, name: 'genre2' },
{ id: 3, name: 'genre3' }]

// Get All Data
router.get('/', (req, res) => {
    res.send(genres)
})

// Create Genres
router.post('/', (req, res) => {
    //using Joi to validate schema
    const schema = Joi.object({ name: Joi.string().min(3).required() })
    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error)
        return;
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genres);
})

//Update Genre
router.put('/:id', (req, res) => {

    const genre = genres.find((v) => { 
        console.log(req.params.id)
        return v.id === parseInt(req.params.id) 
    })
    if (!genre) return res.status(404).send('genre not found')
    const schema = Joi.object({ name: Joi.string().min(3).required() })
    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error)
        return;
    }
    genre.name = req.body.name;
    res.send(genre)
})

//delete Genre
router.delete('/:id', (req, res) => {
    const genre = genres.find((v) => { return v.id === parseInt(req.params.id) })
    if (!genre) return res.status(404).send('genre not found')
    const index = genres.indexOf(genre)
    genre.splice(index, 1)
    genre.name = req.body.name;
    res.send(genre)
})

module.exports = router;