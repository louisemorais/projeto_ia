import ServicePessoa from '../service/pessoa.js'

class ControllerPessoa {
    async Buscar(req, res) {
        const nomes = await ServicePessoa.Buscar()
        res.json({ nomes })
    }

    async BuscarUm(req, res) {
        const nome = await ServicePessoa.BuscarUm(req.params.id)
        res.json({ nome })
    }

    async Criar(req, res) {
        await ServicePessoa.Criar(req.body?.nome, req.body?.idade)
        res.status(201).json({ message: 'Criado com sucesso!' })
    }

    async Alterar(req, res) {
        await ServicePessoa.Alterar(req.params.id, req.body?.nome)
        res.json({ message: 'Alterado com sucesso!' })
    }

    async Deletar(req, res) {
        await ServicePessoa.Deletar(req.params.id)
        res.status(204).end()
    }
}

export default new ControllerPessoa()
