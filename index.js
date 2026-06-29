require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const gastosRouter = require('./routes/gastos')
const categoriasRouter = require('./routes/categorias')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/gastos', gastosRouter)
app.use('/api/categorias', categoriasRouter)

app.get('/info', (req, res) => {
  const fecha = new Date()
  res.json({
    cantidadGastos: require('./routes/gastos').gastos.length,
    fecha: fecha.toString()
  })
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ error: 'Error interno del servidor' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})