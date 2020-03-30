// Ex05 - Zebra Table

// Guarda o elemento TABLE em uma variável
let table = document.getElementsByTagName("table")[0];
// Guarda todos os elementos TR em uma variável
let rows = table.getElementsByTagName("tr");

// Ativar Zebra
document.getElementById("btnOn").onclick = function () {
    // Index começa em 1 para evitar TH, e soma +2 para pular as linhas
    for (let index = 1; index < rows.length; index += 2) {
        rows[index].style.backgroundColor = "lightgray";
    }
}

// Desativar Zebra
document.getElementById("btnOff").onclick = function () {
    for (let index = 1; index < rows.length; index += 2) {
        rows[index].style.backgroundColor = "";
    }
}
