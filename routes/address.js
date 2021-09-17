const express = require('express');
const Address = require('../database/models/Address');
const User = require('../database/models/User');
const router = express.Router();

router.get('/', (req, res) => {
    Address.findAll({
        include: {
            model: User,
            as: 'residente',
            attributes: ['name', 'email']
        },
        attributes:['id','street']
    }).then(rs => {
        res.json(rs)
    })
})


module.exports = router