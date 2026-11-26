import express from 'express'
import ControllerTarefas from '../controller/tarefas.js'

const router = express.Router()

router.get('/', ControllerTarefas.listar)
router.get('/:id', ControllerTarefas.buscar)
router.post('/', ControllerTarefas.criar)
router.put('/:id', ControllerTarefas.atualizar)
router.patch('/:id/status', ControllerTarefas.atualizarStatus)
router.delete('/:id', ControllerTarefas.excluir)

export default router
