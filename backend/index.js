import express from 'express'
import router from './src/router/pessoa.js'
import tarefasRouter from './src/router/tarefas.js'
import database from './src/config/database.js';

const app = express();
app.use(express.json({ limit: '32kb' }))

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:8080,http://localhost:3000,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin && !allowedOrigins.includes(origin)) {
        res.status(403).json({ message: 'Origem não permitida' })
        return
    }

    if (origin) res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

    if (req.method === 'OPTIONS') {
        res.status(204).end()
        return
    }

    next()
})

app.use("/api", router)
app.use("/api/tarefas", tarefasRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' })
})

app.use((error, req, res, next) => {
    const status = Number.isInteger(error.statusCode) ? error.statusCode : error.status
    const statusCode = Number.isInteger(status) && status >= 400 && status < 600 ? status : 500

    if (statusCode >= 500) {
        console.error(error)
    }

    res.status(statusCode).json({
        message: statusCode >= 500 ? 'Erro interno do servidor' : error.message
    })
})

const port = Number(process.env.PORT || 3001)

database.db
    .sync()
    .then((_) => {  
        app.listen(port, () => {
            console.log(`Servidor ouvindo na porta ${port}`)
        })
    })
    .catch((error) => {
        console.error('Não foi possível iniciar o backend:', error)
        process.exitCode = 1
    })