import { Sequelize } from 'sequelize'

class Database {
    constructor() {
        this.init()
    }
    
    init() {
        const {
            DB_NAME,
            DB_USERNAME,
            DB_PASSWORD,
            DB_HOST,
            DB_PORT,
            DB_SSL
        } = process.env

        if (!DB_NAME || !DB_USERNAME || !DB_HOST) {
            throw new Error(
                'Configure DB_NAME, DB_USERNAME e DB_HOST antes de iniciar o backend'
            )
        }

        const port = Number(DB_PORT || 5432)
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            throw new Error('DB_PORT deve ser uma porta válida')
        }

        const dialectOptions = DB_SSL === 'true'
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
                }
            }
            : {}

        this.db = new Sequelize({
            dialect: 'postgres',
            database: DB_NAME,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            host: DB_HOST,
            port,
            dialectOptions,
            logging: DB_SSL === 'false' ? false : undefined
        })
    }
}

export default new Database()