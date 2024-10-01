# Teste de API 
Este repositório contém um conjunto de testes automatizados para validar os serviços de **Categorias** e **Produtos** disponibilizados pela API da Ebac Store. Os testes foram desenvolvidos com o objetivo de garantir a confiabilidade e a integridade dos endpoints da API, utilizando **PactumJS** e **GraphQL**.

## Tecnologias Utilizadas

- **PactumJS**: Ferramenta utilizada para testes de API REST e validação de contrato, garantindo que a API esteja em conformidade com os requisitos especificados.
- **GraphQL**: Testes adicionais realizados utilizando queries e mutations para validar o funcionamento das operações de **Categorias** e **Produtos** via GraphQL.
- **Node.js**: Ambiente de execução para os testes automatizados.

## Funcionalidades Testadas

- **Categorias**:
  - Adicionar novas categorias
  - Editar categorias
  - Deletar categorias

- **Produtos**:
  - Adicionar novos produtos
  - Editar detalhes de produtos
  - Deletar produtos

## Como Executar os Testes

1. Clone este repositório:
   
   ```bash
   git clone https://github.com/analuisaabarbosa/automocaoAPI_gQL_pJS

2. Instale as dependências:

   ```bash
   npm install

3. Execute os testes:

   ```bash
   npm test

## Estrutura do Projeto

**Diretório: test/**

- **/api:** Contém testes funcionais para os serviços de Categorias e Produtos da API REST.
- **/graphql:** Contém testes funcionais para a implementação de GraphQL, verificando as operações relacionadas a Categorias e Produtos.
- **/contract:** Contém os testes de contrato que garantem a consistência da interface de comunicação entre provedores e consumidores dos serviços.
