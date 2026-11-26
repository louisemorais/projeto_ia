import Pessoa from '../model/pessoa.js'

function createError(message, statusCode) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

function requireId(value) {
    const id = Number(value)
    if (!Number.isSafeInteger(id) || id < 1) {
        throw createError('Favor informar um identificador válido', 400)
    }
    return id
}

class ServicePessoa {
    async Buscar() {
        return Pessoa.findAll()
    }

    async BuscarUm(idValue) {
        const pessoa = await Pessoa.findByPk(requireId(idValue))
        if (!pessoa) throw createError('Pessoa não encontrada', 404)
        return pessoa
    }

    async Criar(nome, idade) {
        if (typeof nome !== 'string' || !nome.trim()) {
            throw createError('Favor informar o nome', 400)
        }

        return Pessoa.create({ nome: nome.trim(), idade })
    }

    async Alterar(idValue, nome) {
        const pessoa = await this.BuscarUm(idValue)
        if (typeof nome !== 'string' || !nome.trim()) {
            throw createError('Favor informar o nome', 400)
        }

        pessoa.nome = nome.trim()
        return pessoa.save()
    }

    async Deletar(idValue) {
        const pessoa = await this.BuscarUm(idValue)
        await pessoa.destroy()
    }
}

export default new ServicePessoa()
