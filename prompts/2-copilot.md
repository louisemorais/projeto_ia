# PROMPT — Análise Arquitetural e Plano de Integração entre Frontend React e Backend Node.js/Express

## 1. PAPEL

Atue como um **Arquiteto de Software Sênior**, especialista em:

- React.js
- JavaScript moderno (ES6+)
- Node.js
- Express.js
- APIs REST
- Arquitetura em camadas (Layered Architecture)
- Integração frontend e backend
- Comunicação HTTP e JSON
- Organização, manutenção e escalabilidade de aplicações web.

Seu papel é analisar dois projetos existentes, compreender suas estruturas e propor uma estratégia técnica de integração, respeitando os padrões e as decisões arquiteturais já presentes no código.

## 2. CONTEXTO DOS PROJETOS

Você possui acesso aos seguintes projetos locais:

**Projeto Frontend — React**
`C:\Users\louise34383726\Desktop\prompt-to-project`

**Projeto Backend — Node.js + Express**
`C:\Users\louise34383726\Desktop\aula-exemplo-backend-jp-2026`

O objetivo é integrar o frontend existente com o backend existente, permitindo que a interface React consuma os dados e funcionalidades disponibilizados pela API REST.

IMPORTANTE: Os dois projetos já possuem código desenvolvido. Não estamos começando uma aplicação do zero.

## 3. OBJETIVO PRINCIPAL

Realize uma análise técnica aprofundada dos dois projetos para:

1. Compreender a arquitetura atual de cada aplicação.
2. Identificar padrões de organização e desenvolvimento.
3. Encontrar funcionalidades e estruturas correspondentes entre frontend e backend.
4. Identificar incompatibilidades e possíveis problemas de integração.
5. Definir como React deverá consumir a API Express.
6. Elaborar um plano técnico de integração incremental.
7. Recomendar melhorias arquiteturais somente quando forem justificadas.

**Não implemente nada nesta primeira etapa. Seu trabalho é exclusivamente analisar e planejar.**

---

## 4. ETAPA 1 — ANÁLISE DO FRONTEND (REACT)

Examine o projeto frontend integralmente.

Analise:

### Estrutura e tecnologias
- Organização das pastas e arquivos.
- Versão do React e dependências utilizadas.
- Uso de Vite, Create React App ou outra ferramenta.
- Configuração do projeto.
- Organização dos componentes.
- Separação entre páginas, componentes e lógica de negócio.

### Funcionamento da aplicação
- Componentes funcionais.
- Hooks utilizados (useState, useEffect, useContext, entre outros).
- Props e comunicação entre componentes.
- Gerenciamento de estado.
- Formulários e validações.
- Eventos e manipulação de dados.
- Navegação e rotas, caso existam.
- Como os dados são atualmente armazenados e manipulados.

### Comunicação com dados
- Identifique se existem chamadas HTTP.
- Verifique se existe utilização de fetch ou Axios.
- Identifique dados simulados (mockados).
- Identifique funcionalidades que dependem de persistência no backend.
- Analise como as operações CRUD estão implementadas.

Apresente a estrutura atual e explique a responsabilidade dos principais arquivos.

## 5. ETAPA 2 — ANÁLISE DO BACKEND (NODE.JS + EXPRESS)

Examine o projeto backend integralmente.

Analise:

### Estrutura e configuração
- Organização dos diretórios.
- Configuração do Node.js e Express.
- Dependências instaladas.
- Arquivo principal de inicialização.
- Middlewares configurados.
- Configuração de variáveis de ambiente.

### Arquitetura
Identifique a existência e a responsabilidade de:

- Routes.
- Controllers.
- Services.
- Repositories.
- Models.
- Middlewares.
- Configurações e utilitários.

Verifique se existe separação adequada de responsabilidades e se as regras de negócio estão posicionadas corretamente.

### API REST
Para cada endpoint existente, identifique:

- Método HTTP.
- Caminho da rota.
- Controller responsável.
- Serviço utilizado.
- Dados necessários na requisição.
- Estrutura da resposta.
- Códigos de status HTTP.
- Validações existentes.
- Tratamento de erros.

### Persistência
- Identifique o banco de dados utilizado.
- Analise os models e suas propriedades.
- Identifique relacionamentos entre entidades.
- Verifique como os dados são persistidos.
- Identifique possíveis restrições e regras de integridade.

## 6. ETAPA 3 — COMPARAÇÃO DOS PROJETOS

Agora compare os dois projetos.

Identifique padrões e correspondências entre as aplicações.

Verifique:

- Quais funcionalidades do React correspondem às funcionalidades da API.
- Quais entidades do backend correspondem aos dados utilizados nos componentes.
- Se os nomes dos atributos são compatíveis.
- Se os tipos de dados são compatíveis.
- Se as estruturas JSON são compatíveis.
- Quais funcionalidades do frontend já possuem suporte no backend.
- Quais funcionalidades precisam de novos endpoints.
- Quais endpoints existentes ainda não possuem utilização no frontend.
- Quais adaptações serão necessárias em cada projeto.

Crie uma tabela:

| Funcionalidade frontend | Componente React | Endpoint backend | Situação |
|---|---|---|---|

Utilize os seguintes status:
- Compatível.
- Compatível com ajustes.
- Backend precisa de implementação.
- Frontend precisa de implementação.
- Incompatibilidade identificada.

Não invente correspondências. Justifique cada identificação com base no código encontrado.

## 7. ETAPA 4 — ARQUITETURA PROPOSTA PARA INTEGRAÇÃO

Com base nos padrões encontrados, proponha uma arquitetura adequada para conectar os projetos.

Considere os seguintes princípios:

### Frontend React
Avalie a necessidade de organizar a comunicação com a API por meio de:

- Services: centralização das chamadas HTTP.
- Components: componentes reutilizáveis.
- Pages: páginas e funcionalidades.
- Hooks: encapsulamento de comportamentos reutilizáveis.
- Context: compartilhamento de estado, quando necessário.
- Utils: funções auxiliares.

Exemplo conceitual:

`Componente React → Service → API REST`

### Backend Express
Preserve a separação de responsabilidades:

`Routes → Controllers → Services → Repositories → Banco de Dados`

Explique como os dois lados se comunicarão e quais responsabilidades pertencem a cada camada.

Não imponha essa estrutura se os projetos já possuírem uma organização equivalente e adequada.

## 8. ETAPA 5 — CONTRATOS DE COMUNICAÇÃO

Defina os contratos entre frontend e backend.

Para cada operação, apresente:

- Endpoint.
- Método HTTP.
- Headers necessários.
- Parâmetros de rota ou query.
- Corpo da requisição.
- Estrutura da resposta.
- Códigos HTTP esperados.
- Tratamento de erros.

Exemplo de estrutura:

**Requisição POST**

```json
{
  "nome": "Exemplo",
  "descricao": "Descrição do exemplo"
}
```

**Resposta esperada**

```json
{
  "id": 1,
  "nome": "Exemplo",
  "descricao": "Descrição do exemplo"
}
```

Os exemplos acima são ilustrativos. Utilize os campos e entidades reais dos projetos na documentação definitiva.

Diferencie claramente contratos já implementados de contratos sugeridos.

## 9. ETAPA 6 — CONFIGURAÇÕES NECESSÁRIAS

Avalie as configurações necessárias para permitir a comunicação:

- Inicialização simultânea do frontend e backend.
- Endereço e porta da API.
- Variáveis de ambiente.
- Configuração de CORS.
- Configuração de URLs base.
- Comunicação por fetch ou Axios.
- Tratamento de respostas HTTP.
- Tratamento centralizado de erros.
- Configuração para desenvolvimento local.

Explique quais arquivos precisarão ser criados ou modificados e por quê.

## 10. ETAPA 7 — PLANO TÉCNICO DE IMPLEMENTAÇÃO

Elabore um plano de integração dividido em fases.

Para cada fase, informe:

1. Objetivo.
2. Justificativa técnica.
3. Arquivos que precisam ser criados.
4. Arquivos que precisam ser modificados.
5. Alterações necessárias.
6. Dependências de outras etapas.
7. Critérios para considerar a fase concluída.

Organize as fases em uma sequência lógica.

Priorize:

- Preparação da comunicação.
- Configuração da API.
- Integração de uma funcionalidade por vez.
- Implementação das operações CRUD.
- Tratamento de erros e estados.
- Testes de integração.

## 11. ETAPA 8 — TESTES

Defina uma estratégia de testes para verificar:

- Inicialização dos dois projetos.
- Conectividade entre React e Express.
- Requisições HTTP.
- Envio e recebimento de JSON.
- Operações CRUD.
- Validações.
- Tratamento de erros.
- Atualização da interface após operações.
- Persistência dos dados.
- Comportamento diante de falhas da API.

Indique quais ferramentas de teste já estão disponíveis e quais poderiam ser utilizadas futuramente.

## 12. RESTRIÇÕES OBRIGATÓRIAS

Durante esta análise:

- NÃO modifique arquivos.
- NÃO implemente código.
- NÃO instale dependências.
- NÃO exclua arquivos.
- NÃO reescreva componentes.
- NÃO refatore os projetos.
- NÃO crie endpoints.
- NÃO altere a arquitetura atual.
- NÃO invente regras de negócio.
- NÃO presuma funcionalidades que não estejam presentes no código.
- NÃO recomende bibliotecas sem justificar sua necessidade.

Se encontrar problemas, documente-os e apresente recomendações sem realizar alterações.

## 13. FORMATO DA ENTREGA

Apresente um documento técnico com as seguintes seções:

1. Resumo executivo.
2. Diagnóstico arquitetural do frontend.
3. Diagnóstico arquitetural do backend.
4. Padrões identificados nos dois projetos.
5. Comparação entre funcionalidades e entidades.
6. Incompatibilidades encontradas.
7. Arquitetura de integração proposta.
8. Mapeamento dos endpoints.
9. Contratos JSON.
10. Configurações necessárias.
11. Plano de implementação por fases.
12. Estratégia de testes.
13. Riscos técnicos.
14. Recomendações do arquiteto.

Finalize com uma lista priorizada das atividades que deverão ser executadas, indicando a ordem recomendada.

## 14. DIRETRIZ FINAL

Pense como um arquiteto responsável por integrar dois sistemas existentes em um ambiente profissional.

Não procure apenas fazer o frontend funcionar com o backend. Procure garantir:

- Baixo acoplamento.
- Separação de responsabilidades.
- Código organizado.
- Reutilização de lógica.
- Consistência nos contratos da API.
- Facilidade de manutenção.
- Clareza na comunicação entre as camadas.

**O plano deverá ser baseado exclusivamente na análise do código-fonte real dos dois projetos. Não apresente uma solução genérica sem antes compreender como as aplicações foram construídas.**

Ao finalizar, aguarde minha aprovação antes de iniciar qualquer implementação.