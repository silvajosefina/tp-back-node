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

router.post('/', (req, res) => {
    const { descripcion, monto, categoriaId, fecha } = req.body

    if (!descripcion || monto === undefined) {
        return res.status(400).json({ error: 'descripcion y monto son obligatorios' })
    }

    if (typeof monto !== 'number' || monto <= 0) {
        return res.status(400).json({ error: 'monto debe ser un número mayor a 0' })
    }

    const categoriaExiste = categorias.find(c => c.id === categoriaId)
    const categoriaFinal = categoriaExiste
        ? categoriaId
        : categorias.find(c => c.nombre === 'otro').id

    const nuevoGasto = {
        id: gastos.length > 0 ? Math.max(...gastos.map(g => g.id)) + 1 : 1,
        descripcion,
        monto,
        categoriaId: categoriaFinal,
        fecha: fecha || new Date().toISOString().split('T')[0]
    }

    gastos = gastos.concat(nuevoGasto)
    res.status(201).json(nuevoGasto)
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const gasto = gastos.find(g => g.id === id)
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' })

    gastos = gastos.filter(g => g.id !== id)
    res.status(204).end()
})

module.exports = router
module.exports.gastos = gastos