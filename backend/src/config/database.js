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

        if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST) {
            throw new Error(
                'Configure DB_NAME, DB_USERNAME, DB_PASSWORD e DB_HOST antes de iniciar o backend'
            )
        }

        const dialectOptions = DB_SSL === 'true'
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
            : {}

        this.db = new Sequelize({
            dialect: 'postgres',
            database: DB_NAME,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            host: DB_HOST,
            port: Number(DB_PORT || 5432),
            dialectOptions,
            logging: DB_SSL === 'false' ? false : undefined
        })
    }
}

export default new Database()