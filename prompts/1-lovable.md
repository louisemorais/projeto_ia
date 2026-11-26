# Prompt — MVP de Lista de Tarefas para Organização dos Estudos

Atue como um desenvolvedor front-end experiente, com atenção à usabilidade, acessibilidade e fidelidade aos requisitos.

Desenvolva exclusivamente o front-end de uma aplicação web de lista de tarefas para estudantes que desejam organizar suas atividades de estudo durante a semana.

O projeto deve respeitar rigorosamente os requisitos descritos abaixo. Não implemente funcionalidades adicionais, não invente novos requisitos e não amplie o escopo do MVP.

# 1. Objetivo

Criar uma aplicação web simples e intuitiva que permita aos estudantes organizar suas tarefas de estudo, acompanhar o andamento das atividades e visualizar os respectivos prazos.

**Usuário:** estudantes que precisam organizar suas atividades acadêmicas e de estudo ao longo da semana.

**Problema:** estudantes podem ter dificuldade para acompanhar as atividades que precisam realizar, seus prazos e o andamento de cada tarefa.

**Solução:** uma lista de tarefas que permita cadastrar, visualizar, editar, excluir, atualizar o status e acompanhar os prazos das atividades.

A aplicação deve ser funcional no front-end, utilizando exclusivamente dados simulados (mock data).

# 2. Páginas e componentes

## 2.1. Página principal — Lista de tarefas

Criar uma única página principal contendo:

- Cabeçalho com o nome da aplicação.
- Identificação visual de que a aplicação é uma lista de tarefas de estudo.
- Botão "Nova tarefa".
- Área de filtros por status.
- Listagem das tarefas cadastradas.
- Indicadores visuais de status e prazo.

Cada tarefa deve apresentar:

- Título.
- Descrição.
- Nome da pessoa que criou a tarefa.
- Data de criação.
- Data do prazo.
- Status atual.

Utilizar cartões (cards) para apresentar as tarefas, mantendo uma hierarquia visual clara.

## 2.2. Cadastro e edição de tarefas

Utilizar um modal ou formulário integrado à página principal.

Campos obrigatórios:

1. Título da tarefa.
2. Descrição da tarefa.
3. Nome de quem criou a tarefa.
4. Data do prazo.

Regras:
- A data de criação deve ser gerada automaticamente.
- O status inicial deve ser "Pendente".
- O usuário deve conseguir editar todas as informações da tarefa.
- Ao editar, preservar a data original de criação.
- Validar os campos obrigatórios.
- Não permitir salvar uma tarefa sem título, descrição, nome do criador ou prazo.

## 2.3. Visualização e gerenciamento

Cada tarefa deve permitir:

- Visualizar suas informações.
- Editar seus dados.
- Excluir a tarefa.
- Alterar seu status.

A exclusão deve apresentar uma confirmação antes de remover a tarefa.

# 3. Comportamentos

## 3.1. CRUD

Implementar todas as operações no front-end:

- Create: cadastrar novas tarefas.
- Read: listar e visualizar tarefas.
- Update: editar informações e status.
- Delete: excluir tarefas.

Todas as operações devem atualizar a interface imediatamente.

## 3.2. Status das tarefas

Utilizar os seguintes estados:

- Pendente: tarefa ainda não iniciada.
- Em andamento: tarefa em execução.
- Concluída: tarefa finalizada.
- Atrasada: tarefa cujo prazo já venceu e que não foi concluída.

O estado "Atrasada" deve ser calculado automaticamente com base na data atual e na data do prazo.

Uma tarefa concluída não deve ser considerada atrasada, mesmo que seu prazo tenha passado.

## 3.3. Filtros

Disponibilizar filtros simples:

- Todas.
- Pendentes.
- Em andamento.
- Concluídas.
- Atrasadas.

Ao selecionar um filtro, exibir somente as tarefas correspondentes.

O filtro deve atualizar a listagem sem recarregar a página.

## 3.4. Notificação de vencimento

Implementar avisos visuais dentro da aplicação:

- Prazo próximo: indicar quando uma tarefa estiver com vencimento no dia atual ou no próximo dia.
- Prazo vencido: indicar quando uma tarefa estiver atrasada.
- Tarefa concluída: não apresentar avisos de vencimento.

As notificações devem ser apresentadas por meio de indicadores visuais nos cards ou avisos na interface.

Não implementar notificações push, e-mail, SMS ou integrações externas.

## 3.5. Dados simulados

Utilizar dados fictícios claramente identificados como dados de demonstração.

Criar algumas tarefas iniciais para demonstrar os diferentes estados da aplicação.

Exemplos:
- Estudar JavaScript.
- Revisar conteúdo de banco de dados.
- Finalizar exercício de programação.
- Estudar conceitos de orientação a objetos.

Os dados devem ser manipulados localmente no front-end, utilizando estado da aplicação.

Não conectar a aplicação a banco de dados ou serviços externos.

# 4. Limites e restrições do escopo

O projeto deve ser exclusivamente front-end.

**Não implementar:**

- Autenticação.
- Login ou cadastro de usuários.
- Cadastro de contas.
- Banco de dados.
- Backend.
- APIs externas.
- Integrações com serviços de terceiros.
- Notificações por e-mail ou push.
- Compartilhamento de tarefas.
- Colaboração entre usuários.
- Calendário.
- Gráficos ou relatórios.
- Gamificação.
- Priorização de tarefas.
- Categorias ou etiquetas.
- Funcionalidades adicionais não especificadas.

Não criar páginas extras sem necessidade.

Não utilizar dados reais de usuários.

Não implementar funcionalidades que dependam de infraestrutura externa.

O nome do criador é apenas uma informação textual associada à tarefa, não representa uma conta ou usuário autenticado.

# 5. Responsividade

A interface deve funcionar adequadamente em:

- Desktop.
- Tablets.
- Smartphones.

Requisitos:

- No desktop, utilizar o espaço disponível de forma equilibrada.
- Em telas menores, adaptar os cards para uma única coluna.
- Os formulários devem se ajustar à largura da tela.
- Os botões devem permanecer acessíveis e fáceis de utilizar.
- Evitar rolagem horizontal.
- Garantir que os textos não sejam cortados.

# 6. Acessibilidade

Implementar boas práticas de acessibilidade:

- Utilizar elementos HTML semânticos.
- Associar labels aos campos dos formulários.
- Permitir navegação por teclado.
- Garantir foco visual nos elementos interativos.
- Utilizar contraste adequado entre texto e fundo.
- Não depender exclusivamente das cores para indicar status.
- Fornecer nomes acessíveis para botões e ícones.
- Apresentar mensagens de validação compreensíveis.
- Garantir que os modais possam ser utilizados por teclado.

# 7. Critérios de aceitação visual e funcional

O MVP será considerado adequado quando:

1. A página principal apresentar uma lista de tarefas de demonstração.
2. O usuário conseguir cadastrar uma tarefa preenchendo todos os campos obrigatórios.
3. A data de criação for gerada automaticamente.
4. O usuário conseguir editar uma tarefa existente.
5. O usuário conseguir excluir uma tarefa após confirmação.
6. O usuário conseguir alterar o status de uma tarefa.
7. Os filtros exibirem corretamente as tarefas correspondentes.
8. As tarefas com prazo vencido forem identificadas automaticamente.
9. Os avisos de vencimento forem apresentados visualmente.
10. A interface apresentar estados vazios quando não houver tarefas correspondentes ao filtro.
11. A aplicação apresentar mensagens de validação para campos obrigatórios.
12. Todas as operações funcionarem sem backend ou banco de dados.
13. A interface funcionar em desktop, tablet e smartphone.
14. A interface apresentar uma identidade visual consistente, organizada e intuitiva.

**Orientação final:** priorize simplicidade, clareza e funcionalidade. Construa somente o MVP solicitado. Não adicione funcionalidades por iniciativa própria. Antes de finalizar, verifique se todos os comportamentos descritos estão funcionando e se nenhuma restrição de escopo foi violada.