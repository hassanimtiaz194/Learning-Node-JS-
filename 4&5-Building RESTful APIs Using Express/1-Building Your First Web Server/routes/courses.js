const express = require('express');
const router = express.Router();

const courses = [{ id: 1, name: 'course1' },
{ id: 2, name: 'course2' },
{ id: 3, name: 'course3' }]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('course not found')
    res.send(course);
});

//post
router.post('/', (req, res) => {
    // for joi we need to define a schema
    const schema = Joi.object({ name: Joi.string().min(5).required() });
    const result = schema.validate(req.body);
    //this is simple validation but we can do this with JOI module
    if (/* !req.body.name || req.body.length < 5 */ result.error) {
        res.status(400).send(result.error)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name //in order work we need to parse json so we use router.use(express().json) 
    }
    courses.push(course);
    res.send(course);
})
//update
router.put('/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('course not found')
    // for joi we need to define a schema
    const schema = Joi.object({ name: Joi.string().min(5).required() });
    const result = schema.validate(req.body);
    if (/* !req.body.name || req.body.length < 5 */ result.error) {
        res.status(400).send(result.error)
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

//delete
router.delete('/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('course not found')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    course.name = req.body.name;
    res.send(course);
});

module.exports = router;