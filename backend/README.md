# Backend

API REST em Node.js, Express e Sequelize, com PostgreSQL.

## Configuração e execução

Copie `.env.example` para `.env`, configure as credenciais do PostgreSQL e inicie o backend a partir da raiz do projeto:

```powershell
Copy-Item backend\.env.example backend\.env
npm run dev:backend
```

Use `DB_SSL=false` para um banco local sem SSL. O servidor usa a porta `3001` por padrão.

## Rotas de tarefas

- `GET /api/tarefas` e `GET /api/tarefas/:id`
- `POST /api/tarefas`
- `PUT /api/tarefas/:id`
- `PATCH /api/tarefas/:id/status`
- `DELETE /api/tarefas/:id`

O cadastro espera `title`, `description`, `createdBy` e `deadline` no formato `YYYY-MM-DD`. Os status aceitos são `pendente`, `em_andamento` e `concluida`.
