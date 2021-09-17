const express = require('express');
const Post = require('../database/models/Post');
const User = require('../database/models/User');
const router = express.Router();

router.get('/', (req, res) => {
    Post.findAll({
        include:{
            model:User,
            as:'autor',
            attributes:['name']
        },
        attributes:{exclude:['autorId']}
    })
        .then(rs => {
            res.json(rs)
        })
        .catch(e => {
            res.send(e)
        })
})

router.post('/create', (req, res) => {
    const { title, content } = req.body
    Post.create({
        title: title,
        content: content
    })
        .then(rs => {
            res.json(rs)
        })
        .catch(e => {
            res.send(e)
        })
})

router.patch('/edit/:id', (req, res) => {
    const { title, content } = req.body
    const { id } = req.params

    Post.update({
        title, content
    }, {
        where: {
            id: id
        }
    })
        .then(rs => {
            res.send(rs)
        })
        .catch(e => {
            res.send(e)
        })
})

router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            res.json(post)
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Post.destroy({
        where: {
            id: id
        }
    })
        .then(rs => {
            res.json(rs)
        })
        .catch(e => {
            res.json(e)
        })
})

module.exports = router