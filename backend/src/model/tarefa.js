import { DataTypes } from 'sequelize'
import database from '../config/database.js'

const Tarefa = database.db.define('Tarefa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'created_by'
    },
    deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pendente', 'em_andamento', 'concluida'),
        allowNull: false,
        defaultValue: 'pendente'
    }
}, {
    tableName: 'tarefas'
})

export default Tarefa
