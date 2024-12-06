const remedios = []; // armazena os remédios
const formulario = document.getElementById('formularioRemedio');
const containerCartoes = document.getElementById('cartoesRemedios');
const modal = document.getElementById('modal');
const detalhesNome = document.getElementById('detalhesNome');
const detalhesFabricante = document.getElementById('detalhesFabricante');
const detalhesPreco = document.getElementById('detalhesPreco');
const botaoFecharModal = document.querySelector('.fechar');

// vai exibir todos os remédios cadastrados dentro do sistema
function renderizarCartoes() {
  containerCartoes.innerHTML = ''; // limpa dados
  remedios.forEach((remedio, indice) => {
    const cartao = document.createElement('div');
    cartao.className = 'cartao';

    cartao.innerHTML = `
      <h3>${remedio.nome}</h3>
      <p><strong>Fabricante:</strong> ${remedio.fabricante}</p>
      <p><strong>Preço:</strong> R$ ${remedio.preco.toFixed(2)}</p>
      <div class="botoes-cartao">
        <button class="visualizar" onclick="visualizarRemedio(${indice})">Visualizar</button>
        <button class="editar" onclick="editarRemedio(${indice})">Editar</button>
        <button class="excluir" onclick="excluirRemedio(${indice})">Excluir</button>
      </div>
    `;

    containerCartoes.appendChild(cartao);
  });
}

// adiciona remédio
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nome = document.getElementById('nomeRemedio').value;
  const fabricante = document.getElementById('fabricanteRemedio').value;
  const preco = parseFloat(document.getElementById('precoRemedio').value);

  remedios.push({ nome, fabricante, preco });
  renderizarCartoes();
  formulario.reset();
});

// edita remédio
function editarRemedio(indice) {
  const remedio = remedios[indice];
  document.getElementById('nomeRemedio').value = remedio.nome;
  document.getElementById('fabricanteRemedio').value = remedio.fabricante;
  document.getElementById('precoRemedio').value = remedio.preco;

  remedios.splice(indice, 1); // remove o remédio original
  renderizarCartoes();
}

// exclui remédio
function excluirRemedio(indice) {
  remedios.splice(indice, 1);
  renderizarCartoes();
}

// visualizar remédio
function visualizarRemedio(indice) {
  const remedio = remedios[indice];
  detalhesNome.textContent = remedio.nome;
  detalhesFabricante.textContent = remedio.fabricante;
  detalhesPreco.textContent = remedio.preco.toFixed(2);

  modal.style.display = 'block';
}

// botao de fechar
botaoFecharModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// faz com que o modal feche ao clicar do lado de fora dele
window.addEventListener('click', (evento) => {
  if (evento.target === modal) {
    modal.style.display = 'none';
  }
});
