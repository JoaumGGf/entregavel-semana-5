//Manipulação e validação de dados
console.log("=== PARTE 1: PEDIDOS ===");

// Array de objetos
const pedidos = [
    { cliente: "Bia", valor: 120, status: "pago" },
    { cliente: "João", valor: 80, status: "pendente" },
    { cliente: "Maria", valor: 200, status: "pago" },
    { cliente: "", valor: 50, status: "pago" },
    { cliente: "Pedro", valor: -10, status: "pago" }
];

// Validar pedidos
const pedidosValidos = pedidos.filter(function(pedido) {
    return (
        typeof pedido.cliente === "string" &&
        pedido.cliente.trim() !== "" &&
        typeof pedido.valor === "number" &&
        Number.isFinite(pedido.valor) &&
        pedido.valor > 0
    );
});

console.log("Pedidos válidos:", pedidosValidos);

// Filtrar pedidos pagos
const pedidosPagos = pedidosValidos.filter(function(pedido) {
    return pedido.status === "pago";
});

console.log("Pedidos pagos:", pedidosPagos);

// Calcular total faturado
const totalFaturado = pedidosPagos.reduce(function(total, pedido) {
    return total + pedido.valor;
}, 0);

console.log("Total faturado: R$ " + totalFaturado.toFixed(2));

// Gerar textos dos pedidos
const textosPedidos = pedidosPagos.map(function(pedido) {
    return pedido.cliente + " — R$ " + pedido.valor.toFixed(2);
});

console.log("Resumo dos pedidos:");

textosPedidos.forEach(function(texto) {
    console.log(texto);
});

//Buscador de CEP

console.log("=== PARTE 2: BUSCADOR DE CEP ===");

const formCep = document.querySelector("#formCep");
const inputCep = document.querySelector("#cep");
const btnCep = document.querySelector("#btnCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");
const listaHistorico = document.querySelector("#historicoCep");

// Array para armazenar o histórico
const historico = [];

// Função para mostrar os dados do CEP
function mostrarEndereco(dados) {
    resultadoCep.replaceChildren();

    const campos = {
        "Rua": dados.logradouro,
        "Bairro": dados.bairro,
        "Cidade": dados.localidade,
        "UF": dados.uf
    };

    for (const campo in campos) {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = campo;
        dd.textContent = campos[campo] || "Não informado";

        resultadoCep.append(dt, dd);
    }
}

// Função para atualizar histórico
function atualizarHistorico() {
    listaHistorico.replaceChildren();

    historico.forEach(function(item) {
        const li = document.createElement("li");

        li.textContent = item.cep + " - " + item.cidade;

        listaHistorico.append(li);
    });
}

// Evento de envio do formulário
formCep.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Remove espaços e caracteres não numéricos
    const cep = inputCep.value.trim().replace(/\D/g, "");

    resultadoCep.replaceChildren();
    statusCep.className = "";

    // Validação: exatamente 8 dígitos
    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "Digite um CEP válido com 8 números.";
        statusCep.className = "erro";
        return;
    }

    // Estado carregando
    statusCep.textContent = "Buscando...";
    btnCep.disabled = true;

    try {
        // Requisição à API
        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        // Verificar erro HTTP
        if (!response.ok) {
            throw new Error("Falha na conexão");
        }

        // Converter resposta em objeto
        const dados = await response.json();

        // Estado vazio
        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado";
            statusCep.className = "erro";
            return;
        }

        // Estado sucesso
        mostrarEndereco(dados);

        statusCep.textContent = "";

        // Guardar no histórico
        historico.push({
            cep: cep,
            cidade: dados.localidade
        });

        atualizarHistorico();

    } catch (erro) {
        // Estado erro
        statusCep.textContent = "Falha na conexão. Tente novamente.";
        statusCep.className = "erro";

        console.error(erro);

    } finally {
        // Reativar botão
        btnCep.disabled = false;
    }
});

//Mini Pokédex

console.log("=== PARTE 3: MINI POKÉDEX ===");

const formPokemon = document.querySelector("#formPokemon");
const inputPokemon = document.querySelector("#pokemon");
const btnPokemon = document.querySelector("#btnPokemon");
const statusPokemon = document.querySelector("#statusPokemon");
const resultadoPokemon = document.querySelector("#resultadoPokemon");

// Evento do formulário
formPokemon.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Limpar e converter nome
    const nome = inputPokemon.value.trim().toLowerCase();

    resultadoPokemon.replaceChildren();
    statusPokemon.className = "";

    // Validar campo vazio
    if (nome === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon.";
        statusPokemon.className = "erro";
        return;
    }

    // Estado carregando
    statusPokemon.textContent = "Buscando...";
    btnPokemon.disabled = true;

    try {
        // Consultar API
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`
        );

        // Estado não encontrado
        if (response.status === 404) {
            statusPokemon.textContent = "Pokémon não encontrado";
            statusPokemon.className = "erro";
            return;
        }

        // Outros erros HTTP
        if (!response.ok) {
            throw new Error("Erro ao consultar API");
        }

        const dados = await response.json();

        // Estado sucesso
        resultadoPokemon.replaceChildren();

        // Criar nome
        const titulo = document.createElement("h3");
        titulo.textContent = dados.name.toUpperCase();

        // Criar imagem
        const imagem = document.createElement("img");

        imagem.src = dados.sprites.front_default;
        imagem.alt = "Imagem do Pokémon " + dados.name;

        // Criar texto dos tipos
        const tipos = document.createElement("p");

        const nomesTipos = dados.types.map(function(item) {
            return item.type.name;
        });

        tipos.textContent = "Tipos: " + nomesTipos.join(", ");

        // Adicionar elementos à página
        resultadoPokemon.append(titulo);

        if (dados.sprites.front_default) {
            resultadoPokemon.append(imagem);
        }

        resultadoPokemon.append(tipos);

        // Limpar aviso
        statusPokemon.textContent = "";

    } catch (erro) {
        // Estado erro
        statusPokemon.textContent =
            "Falha na conexão. Tente novamente.";

        statusPokemon.className = "erro";

        console.error(erro);

    } finally {
        btnPokemon.disabled = false;
    }
});
