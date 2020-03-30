// Ex08 - Random Table

// Vetor de nomes
let nomes = ["Dan", "Mah", "Leo", "Min", "Gus", "Jad", "End", "Ana", "Alp", "Bet"];

// Guarda o elemento TBODY em uma variável
let table = document.getElementsByTagName("tbody")[0];

// Guarda a quantidade de linhas
let rowNumber = 0;

// Cria um random inteiro
function rand(n) {
    return Math.floor(Math.random() * n);
}

// Cria uma td
function tdCreator() {
    return document.createElement("td");
}

// Adiciona Linha
document.getElementById("btnAdd").onclick = function () {
    // Pega um nome aleatório da lista
    let text = document.createTextNode(nomes[rand(10)]);
    // Gera um número aleatório
    let numb = document.createTextNode(rand(100));
    // Cria o node
    let node = document.createElement("tr");
    // TD Nomes
    let nodeChild = tdCreator();
    nodeChild.appendChild(text);
    node.appendChild(nodeChild);
    // TD Números
    nodeChild = tdCreator();
    nodeChild.appendChild(numb);
    node.appendChild(nodeChild);

    table.appendChild(node);

    rowNumber++;
    if (rowNumber % 2 !== 0) {
        node.style.backgroundColor = "lightgray";
    }
}

// Remove Linha
document.getElementById("btnRem").onclick = function () {
    table.lastChild.remove();
    
    if (rowNumber > 0) {
        rowNumber--;
    }
}
