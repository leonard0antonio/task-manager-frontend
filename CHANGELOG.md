# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.0.2](///compare/v0.0.1...v0.0.2) (2026-05-20)


### ✨ Funcionalidades (Features)

* add admin forms and tables for team and user management 73275b2
* adiciona arquivo de configuração .hintrc para validação de acessibilidade 90501e5
* adiciona barra de pesquisa em tempo real para filtro de tarefas no dashboard d635936
* adiciona descrição de tarefa no painel e corrige exibição no dashboard 87c16a8
* adiciona funcionalidades de interação para atualização e exclusão de tarefas no painel 563a49c
* adiciona gerenciamento de tarefas com modais de edição e exclusão no painel admin 897fb5f
* adiciona modal de visualização de detalhes da tarefa no painel admin cd93f83
* adiciona modal interativo no dashboard para edicao completa de tarefas df64cff
* adiciona secoes de features, how-to e cta final na landing page] 967a584
* adiciona tabela e modais para gerenciar times no painel admin ae1455d
* aprimora a interface do Dashboard com novas funcionalidades e melhorias de usabilidade 1d3c34f
* cria landing page comercial para apresentacao do OrganizaTask 750d424
* implementa modais customizados e toast de feedback no painel admin 9a73fa1
* implementa modo de registro de administrador com login automatico na tela de autenticacao d134c6b


### 🐛 Correções de Bugs (Bug Fixes)

* melhora feedback de erro na exclusao de usuarios bf60fab


### ♻️ Refatoração de Código

* aplica padroes DRY evoluindo componente de Input e implementa UI/UX robusta no Login 7fbcda7
* atualiza o componente FooterCTA com design aprimorado e links funcionais 07b0e7d
* modulariza a landing page inteira criando arquitetura de componentes escalavel 8182d79
* modulariza inputs e botoes na tela de login e aprimora UI/UX 2c08aad

## 0.0.1 (2026-05-11)


### ✨ Funcionalidades (Features)

* adiciona estado de loading ao contexto de autenticação e atualiza o componente PrivateRoute 97bcdc6
* adiciona funcionalidade para buscar e listar times no AdminPanel 40a40a2
* configura cliente HTTP axios com interceptor e adiciona react-router-dom e1c0c56
* configura roteamento principal com react-router-dom 47d9d9e
* cria componente AdminPanel e integra no Dashboard 4dd95b1
* cria pagina de dashboard listando as tarefas vindas da api 7186088
* cria tela de login e integra com AuthContext c974d0d
* define interfaces typescript para entidades do sistema f14e4e5
* implementa AuthContext para gerenciar estado do usuario e token 41b218a
* painel admin completo com criacao de usuarios e dropdowns dinamicos 16146b6
