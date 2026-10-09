# Mini Projeto – Consumo de APIs com JavaScript

## Descrição do Projeto

Este projeto foi desenvolvido com HTML, CSS e JavaScript para praticar conceitos de objetos, arrays, funções assíncronas, consumo de APIs e manipulação dinâmica do DOM.

O projeto possui três funcionalidades principais:

- **Validação de pedidos:** verifica pedidos válidos, filtra os pedidos pagos e calcula o faturamento total utilizando `filter`, `reduce` e `map`.
- **Buscador de CEP:** permite consultar endereços utilizando a API ViaCEP, exibindo rua, bairro, cidade e UF. Também armazena um histórico dos CEPs pesquisados.
- **Mini Pokédex:** permite pesquisar Pokémon pelo nome utilizando a PokéAPI, mostrando seu nome, imagem e tipos.

## Estados da Interface

As consultas trabalham com quatro estados:

1. **Carregando:** informa que a busca está acontecendo.
2. **Erro:** mostra uma mensagem quando ocorre uma falha de conexão ou outro erro na requisição.
3. **Vazio:** informa quando o CEP ou Pokémon não é encontrado.
4. **Sucesso:** apresenta os dados retornados pela API.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Async/Await
- Manipulação do DOM

## Reflexão: Por que Promise.all pode ser mais rápido que vários await seguidos?

O `Promise.all` pode ser mais rápido porque permite executar várias operações assíncronas ao mesmo tempo, desde que elas sejam independentes.

Quando utilizamos vários `await` em sequência, uma requisição precisa terminar antes que a próxima seja iniciada. Já com `Promise.all`, podemos iniciar todas as requisições juntas e aguardar seus resultados, aproveitando melhor o tempo de rede.

Por exemplo, se duas requisições demorarem dois segundos cada, executá-las sequencialmente pode levar aproximadamente quatro segundos. Utilizando `Promise.all`, elas podem terminar em aproximadamente dois segundos.

## Como Executar

1. Coloque os arquivos `index.html` e `app.js` na mesma pasta.
2. Abra o arquivo `index.html` no navegador.
3. Pressione F12 para visualizar o console.
4. Teste as consultas de CEP e Pokémon.

## Conclusão

O desenvolvimento deste projeto permitiu compreender melhor o funcionamento das APIs, a manipulação de dados e a criação de páginas interativas. Também ajudou a entender a importância de validar informações e tratar possíveis erros durante as requisições.
