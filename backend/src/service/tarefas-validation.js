const statuses = new Set(['pendente', 'em_andamento', 'concluida'])

function createError(message, statusCode) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

function requireText(value, field, maxLength) {
    if (typeof value !== 'string' || !value.trim()) {
        throw createError(`O campo ${field} é obrigatório`, 400)
    }

    const text = value.trim()
    if (text.length > maxLength) {
        throw createError(`O campo ${field} deve ter no máximo ${maxLength} caracteres`, 400)
    }

    return text
}

function requireDeadline(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw createError('Informe um prazo válido no formato YYYY-MM-DD', 400)
    }

    const date = new Date(`${value}T00:00:00.000Z`)
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        throw createError('Informe um prazo válido no formato YYYY-MM-DD', 400)
    }

    return value
}

export function requireTaskId(value) {
    const id = Number(value)
    if (!Number.isSafeInteger(id) || id < 1) {
        throw createError('Informe um identificador válido', 400)
    }
    return id
}

export function validateTaskFields(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw createError('Informe os dados da tarefa', 400)
    }

    return {
        title: requireText(data.title, 'título', 200),
        description: requireText(data.description, 'descrição', 10000),
        createdBy: requireText(data.createdBy, 'criador', 120),
        deadline: requireDeadline(data.deadline)
    }
}

export function validateTaskStatus(status) {
    if (!statuses.has(status)) {
        throw createError('Informe um status válido', 400)
    }
    return status
}
