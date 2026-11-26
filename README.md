# Projeto integrado

- `frontend/`: aplicação React/TanStack Start.
- `backend/`: API Node.js/Express/Sequelize.

## Instalação

```powershell
npm run install:all
```

## Configuração do banco

Instale e inicie o PostgreSQL localmente. Copie o exemplo de configuração do backend:

```powershell
Copy-Item backend\.env.example backend\.env
```

Edite `backend\.env` e informe o nome do banco, usuário e senha locais. Para PostgreSQL local, mantenha `DB_SSL=false`; use `DB_SSL=true` apenas se o servidor exigir SSL. O backend cria as tabelas que faltarem sem apagar os dados existentes.

## Execução

Em um terminal, inicie o backend:

```powershell
npm run dev:backend
```

Em outro terminal, configure e inicie o frontend:

```powershell
Copy-Item frontend\.env.example frontend\.env.local
npm run dev:frontend
```

O frontend usa `VITE_API_URL` (padrão do exemplo: `http://localhost:3001/api`) e persiste as tarefas no banco por meio da API.

## API de tarefas

| Método | Rota | Ação |
| --- | --- | --- |
| GET | `/api/tarefas` | Lista tarefas |
| GET | `/api/tarefas/:id` | Busca uma tarefa |
| POST | `/api/tarefas` | Cria uma tarefa |
| PUT | `/api/tarefas/:id` | Atualiza uma tarefa |
| PATCH | `/api/tarefas/:id/status` | Atualiza o status |
| DELETE | `/api/tarefas/:id` | Exclui uma tarefa |

Testes:

```powershell
npm --prefix backend test
npm --prefix frontend test
```
