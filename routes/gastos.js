const router = require('express').Router()
const { categorias } = require('./categorias')

let gastos = [
    { id: 1, descripcion: 'Almuerzo', monto: 1500, categoriaId: 1, fecha: '2024-11-01' },
    { id: 2, descripcion: 'Juego Steam', monto: 800, categoriaId: 3, fecha: '2024-11-02' }
]

// GET /api/gastos — acepta ?categoria=comida
router.get('/', (req, res) => {
    const { categoria } = req.query

    if (categoria) {
        const cat = categorias.find(c => c.nombre === categoria)
        if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' })
        return res.json(gastos.filter(g => g.categoriaId === cat.id))
    }

    res.json(gastos)
})

module.exports = router
module.exports.gastos = gastos