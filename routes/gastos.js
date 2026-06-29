const router = require('express').Router()
const { categorias } = require('./categorias')

let gastos = [
    { id: 1, descripcion: 'Almuerzo', monto: 1500, categoriaId: 1, fecha: '2024-11-01' },
    { id: 2, descripcion: 'Juego Steam', monto: 800, categoriaId: 3, fecha: '2024-11-02' }
]

router.get('/', (req, res) => {
    const { categoria } = req.query

    if (categoria) {
        const cat = categorias.find(c => c.nombre === categoria)
        if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' })
        return res.json(gastos.filter(g => g.categoriaId === cat.id))
    }

    res.json(gastos)
})

router.get('/resumen', (req, res) => {
    const total = gastos.reduce((acc, g) => acc + g.monto, 0)
    const maximo = gastos.length > 0 ? Math.max(...gastos.map(g => g.monto)) : 0
    res.json({ totalGastado: total, gastoMasAlto: maximo })
})

router.get('/:id', (req, res) => {
    const gasto = gastos.find(g => g.id === Number(req.params.id))
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' })
    res.json(gasto)
})

module.exports = router
module.exports.gastos = gastos