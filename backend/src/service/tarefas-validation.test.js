import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
    requireTaskId,
    validateTaskFields,
    validateTaskStatus
} from './tarefas-validation.js'

describe('validação das tarefas', () => {
    it('normaliza espaços dos campos textuais', () => {
        assert.deepEqual(validateTaskFields({
            title: '  Estudar  ',
            description: '  Capítulo 1 ',
            createdBy: ' Ana ',
            deadline: '2026-12-01'
        }), {
            title: 'Estudar',
            description: 'Capítulo 1',
            createdBy: 'Ana',
            deadline: '2026-12-01'
        })
    })

    it('rejeita prazos inexistentes e status não suportados', () => {
        assert.throws(
            () => validateTaskFields({
                title: 'Estudar',
                description: 'Capítulo 1',
                createdBy: 'Ana',
                deadline: '2026-02-30'
            }),
            { statusCode: 400 }
        )
        assert.throws(() => validateTaskStatus('atrasada'), { statusCode: 400 })
    })

    it('aceita somente identificadores inteiros positivos', () => {
        assert.equal(requireTaskId('12'), 12)
        assert.throws(() => requireTaskId('0'), { statusCode: 400 })
        assert.throws(() => requireTaskId('abc'), { statusCode: 400 })
    })
})
