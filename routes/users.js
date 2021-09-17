const express = require('express');
const User = require('../database/models/User');
const Address = require('../database/models/Address');
const Post = require('../database/models/Post');
const router = express.Router();


router.get('/', (req, res) => {

    User.findAll({
        include: [{
            model: Address,
            as: "domicilio",
            attributes: ['id', 'street']
        }, {
            model: Post,
            as: "publicaciones",
            attributes: ['id', 'title']
        }]
    })
        .then(rs => {
            res.json(rs)
        })
        .catch(e => {
            res.json(e)
        })

})

router.get('/:id/publicaciones', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getPublicaciones().then(pub => {
            res.json(pub)
        })
    })
})

router.get('/:id/domicilios', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getDomicilio().then(domicilio => {
            res.json(domicilio)
        })
    })
})

router.post('/create', (req, res) => {

    const { name, email, age, role } = req.body

    User.create({
        name, email, age, role
    })
        .then(rs => {
            res.json(rs)
        })
        .catch(e => {
            res.send(e)
        })

})

router.patch('/:id', (req, res) => {
    const { name, email, age } = req.body
    const { id } = req.params

    User.update({
        name, email, age
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


module.exports = router