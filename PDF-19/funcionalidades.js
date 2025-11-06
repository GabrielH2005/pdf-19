const API_URL = "http://localhost:3000/investimentos";
const form = document.getElementById("form-investimento");
const tabela = document.getElementById("tabela");
const msgErro = document.getElementById("mensagem-erro");

// Função para buscar e exibir dados
async function carregarInvestimentos() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) throw new Error("Servidor fora do ar");

    const dados = await resposta.json();
    msgErro.style.display = "none";
    tabela.innerHTML = "";

    if (dados.length === 0) {
      tabela.innerHTML = `<tr><td colspan="3">Nenhum investimento cadastrado</td></tr>`;
      return;
    }

    dados.forEach(item => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.tipo}</td>
        <td>${item.rentabilidade}%</td>
        <td>R$ ${item.valor.toFixed(2)}</td>
      `;
      tabela.appendChild(linha);
    });

  } catch (erro) {
    msgErro.style.display = "block";
    tabela.innerHTML = `<tr><td colspan="3">Erro ao carregar dados</td></tr>`;
  }
}

// Adiciona novo investimento
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value.trim();
  const rentabilidade = parseFloat(document.getElementById("rentabilidade").value);
  const valor = parseFloat(document.getElementById("valor").value);

  if (!tipo || isNaN(rentabilidade) || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const novo = { tipo, rentabilidade, valor };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    });

    if (!resposta.ok) throw new Error("Erro ao salvar investimento");

    form.reset();
    carregarInvestimentos();
  } catch (erro) {
    msgErro.style.display = "block";
  }
});

carregarInvestimentos();
