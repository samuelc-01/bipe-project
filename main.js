let totalNotasFiscaisLidas = 0;
const codigosDeBarrasLidos = new Map();
const dataHoraAtualInput = document.getElementById("dataHoraAtual");
const transportadoraInput = document.getElementById("transportadora");
const tabelaNFs = document.getElementById("tabelaNFs");

function atualizarDataHoraAtual() {
  const dataHora = new Date();
  dataHoraAtualInput.value = dataHora.toLocaleString();
}

atualizarDataHoraAtual();

function lerCodigoDeBarras() {
  const codigoDeBarrasInput = document.getElementById("codigoDeBarras");
  const codigoLido = codigoDeBarrasInput.value.trim();
  const transportadora = transportadoraInput.value.trim();
  document.getElementById("contador-de-caracter").textContent =
    codigoLido.length;

  if (transportadora === "") {
    alert(
      'Por favor, preencha o campo "Nome da Transportadora" antes de escanear o código de barras.'
    );
    return;
  }

  if (codigoLido.length < 44) {
    alert(
      "Por favor preecha o campo da nota fiscal com uma sequencia de 44 numeros para que o sistema funcione de maneiro correta, TENTE NOVAMENTE :)"
    );
    codigoDeBarrasInput.value = "";
    return;
  }
  if (codigoLido) {
    const numeroVolume = codigosDeBarrasLidos.has(codigoLido)
      ? codigosDeBarrasLidos.get(codigoLido) + 1
      : 1;
    const confirmarInsercao = codigosDeBarrasLidos.has(codigoLido)
      ? confirm(
          `Este código de barras já foi lido anteriormente. Deseja inseri-lo como o Volume ${numeroVolume}?`
        )
      : true;

    if (confirmarInsercao) {
      const row = tabelaNFs.insertRow(0);
      row.insertCell(0).textContent = codigoLido;
      row.insertCell(1).textContent = transportadora;
      row.insertCell(2).textContent = numeroVolume;

      const removeButton = document.createElement("button");
      removeButton.innerHTML = "Remover";
      removeButton.classList.add("button");

      removeButton.onclick = () => removerCodigoDeBarras(codigoLido);
      row.insertCell(3).appendChild(removeButton);

      codigosDeBarrasLidos.set(codigoLido, numeroVolume);
      codigoDeBarrasInput.value = "";
      totalNotasFiscaisLidas++;

      document.getElementById("totalNotasFiscais").textContent =
        totalNotasFiscaisLidas;
    } else {
      codigoDeBarrasInput.value = "";
    }
  }
}

function exportarParaXLS() {
  const dadosColunas = [
    ["Código de Barras da NF", "Transportadora", "Volumes"],
  ];

  for (const [codigoLido, numeroVolume] of codigosDeBarrasLidos) {
    const transportadora = transportadoraInput.value.trim();
    dadosColunas.push([codigoLido, transportadora, numeroVolume]);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(dadosColunas);
  XLSX.utils.book_append_sheet(wb, ws, "Notas Fiscais");

  // Obtém a data e hora atual
  const dataHoraAtual = new Date()
    .toLocaleString()
    .replace(/[/\\:*?"<>|]/g, ""); // Remove caracteres inválidos para nome de arquivo

  // Obtém o nome da transportadora
  const nomeTransportadora = transportadoraInput.value.trim();

  // Define o nome do arquivo
  const nomeArquivo = `${nomeTransportadora}_${
    dataHoraAtual.split(",")[0]
  }.xlsx`; // Remove o horário

  XLSX.writeFile(wb, nomeArquivo);
}

function exportarParaPDF() {
  // Crie um novo objeto jsPDF
  var doc = new jsPDF();

  // Crie um array para armazenar os dados da tabela
  var tableData = [];

  // Obtenha a tabela pelo ID
  var table = document.getElementById("tabelaNFs");

  // Itere sobre as linhas da tabela
  for (var i = 0; i < table.rows.length; i++) {
    var rowData = [];

    // Itere sobre as células de cada linha
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      rowData.push(table.rows[i].cells[j].textContent);
    }

    // Adicione os dados da linha ao array de dados da tabela
    tableData.push(rowData);
  }

  // Defina as configurações da tabela no PDF
  var tableOptions = {
    startY: 10, // Posição Y onde a tabela será iniciada no PDF
  };

  // Gere a tabela no PDF
  doc.autoTable({
    head: [["Código de Barras da NF", "Transportadora", "Volumes"]], // Cabeçalho da tabela
    body: tableData, // Dados da tabela
    startY: 20, // Posição Y onde a tabela será iniciada no PDF
  });

  // Gere o PDF como um Blob
  var pdfBlob = doc.output("blob");

  // Use a função saveAs do FileSaver.js para permitir que o usuário escolha onde salvar o arquivo
  saveAs(pdfBlob, "tabela.pdf");
}

function removerCodigoDeBarras(codigoLido) {
  const rows = tabelaNFs.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const codigoBarrasNF = rows[i].cells[0].textContent;

    if (codigoBarrasNF === codigoLido) {
      tabelaNFs.deleteRow(i);
      codigosDeBarrasLidos.delete(codigoLido);
      totalNotasFiscaisLidas--;
      document.getElementById("totalNotasFiscais").textContent =
        totalNotasFiscaisLidas;
      break;
    }
  }
}
