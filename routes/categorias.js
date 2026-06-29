const router = require('express').Router()

const categorias = [
    { id: 1, nombre: 'comida' },
    { id: 2, nombre: 'transporte' },
    { id: 3, nombre: 'ocio' },
    { id: 4, nombre: 'salud' },
    { id: 5, nombre: 'otro' }
]

router.get('/', (req, res) => {
    res.json(categorias)
})

module.exports = router
module.exports.categorias = categorias