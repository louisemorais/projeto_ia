import ServiceTarefas from '../service/tarefas.js'

class ControllerTarefas {
    async listar(req, res) {
        const tarefas = await ServiceTarefas.listar()
        res.json(tarefas)
    }

    async buscar(req, res) {
        const tarefa = await ServiceTarefas.buscar(req.params.id)
        res.json(tarefa)
    }

    async criar(req, res) {
        const tarefa = await ServiceTarefas.criar(req.body)
        res.status(201).json(tarefa)
    }

    async atualizar(req, res) {
        const tarefa = await ServiceTarefas.atualizar(req.params.id, req.body)
        res.json(tarefa)
    }

    async atualizarStatus(req, res) {
        const tarefa = await ServiceTarefas.atualizarStatus(req.params.id, req.body?.status)
        res.json(tarefa)
    }

    async excluir(req, res) {
        await ServiceTarefas.excluir(req.params.id)
        res.status(204).end()
    }
}

export default new ControllerTarefas()
