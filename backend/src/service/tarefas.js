import Tarefa from '../model/tarefa.js'
import {
    requireTaskId,
    validateTaskFields,
    validateTaskStatus
} from './tarefas-validation.js'

class ServiceTarefas {
    async listar() {
        return Tarefa.findAll({ order: [['createdAt', 'DESC']] })
    }

    async buscar(idValue) {
        const tarefa = await Tarefa.findByPk(requireTaskId(idValue))
        if (!tarefa) {
            const error = new Error('Tarefa não encontrada')
            error.statusCode = 404
            throw error
        }
        return tarefa
    }

    async criar(data) {
        return Tarefa.create(validateTaskFields(data))
    }

    async atualizar(idValue, data) {
        const tarefa = await this.buscar(idValue)
        const fields = validateTaskFields(data)
        if (data.status !== undefined) fields.status = validateTaskStatus(data.status)
        return tarefa.update(fields)
    }

    async atualizarStatus(idValue, status) {
        const tarefa = await this.buscar(idValue)
        return tarefa.update({ status: validateTaskStatus(status) })
    }

    async excluir(idValue) {
        const tarefa = await this.buscar(idValue)
        await tarefa.destroy()
    }
}

export default new ServiceTarefas()
