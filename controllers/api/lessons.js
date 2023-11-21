const { LessonModel } = require('../../models/lesson');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');


module.exports = {
    show,
    create,
};

async function show(req, res) {
    const course = await LessonModel.getLesson(req.params.courseId)
    console.log('click course: ', req.params.courseId)
    res.json(course)
}

async function create(req, res) {
    console.log('create on the way with req.body: ', req.body)
    try {
        console.log('inside try block')
        const newCourse = await LessonModel.create({
            title: req.body.title,
            description: req.body.description,
            youTubeLink: req.body.youTubeLink,
        })
        console.log('The course (req.body) contains this -> ', newCourse)
        res.json(newCourse)
    } catch (err) {
        res.status(400).json(err)
    }
}