// (servidor JSON local)
const API_URL = "http://localhost:3000/investimentos";

const form = document.getElementById("form-investimento");

const tabela = document.getElementById("tabela-investimentos");

// Buscar e exibir os investimentos
// 

async function carregarInvestimentos() {
  // Faz uma requisição para obter os dados do servidor JSON
  const resposta = await fetch(API_URL);

  // Converte os dados recebidos em formato JSON (array de objetos)
  const dados = await resposta.json();

  // Limpa o conteúdo anterior da tabela antes de preencher novamente
  tabela.innerHTML = "";

  // Percorre cada item retornado do servidor e cria uma linha na tabela
  dados.forEach(item => {
    // Cria um elemento <tr> (linha da tabela)
    const linha = document.createElement("tr");

    // Define o conteúdo HTML dessa linha, preenchendo os dados do investimento
    linha.innerHTML = `
      <td>${item.tipo}</td>                <!-- Tipo de investimento -->
      <td>${item.rentabilidade}%</td>     <!-- Rentabilidade (%) -->
      <td>R$ ${Number(item.valor).toFixed(2)}</td> <!-- Valor formatado com 2 casas decimais -->
    `;

    // Adiciona a linha criada dentro do corpo da tabela
    tabela.appendChild(linha);
  });
}

// Adiciona um "ouvinte" de evento para quando o formulário for enviado
form.addEventListener("submit", async (e) => {
  // Impede o comportamento padrão do formulário (recarregar a página)
  e.preventDefault();

  // Cria um novo objeto com os valores preenchidos pelo usuário
  const novoInvestimento = {
    // Pega o valor do campo "tipo"
    tipo: document.getElementById("tipo").value,

    // Converte o campo "rentabilidade" para número decimal
    rentabilidade: parseFloat(document.getElementById("rentabilidade").value),

    // Converte o campo "valor" para número decimal
    valor: parseFloat(document.getElementById("valor").value)
  };

  // Envia os dados para o servidor JSON usando o método POST
  await fetch(API_URL, {
    method: "POST", // Tipo de requisição (enviar dados)
    headers: { "Content-Type": "application/json" }, // Define o formato dos dados (JSON)
    body: JSON.stringify(novoInvestimento) // Converte o objeto em texto JSON
  });

  // Limpa os campos do formulário após o envio
  form.reset();

  // Atualiza a tabela exibindo os novos dados
  carregarInvestimentos();
});

// Chamada inicial da função para carregar os dados ao abrir a página
//
carregarInvestimentos();