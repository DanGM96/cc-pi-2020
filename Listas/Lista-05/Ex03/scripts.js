// Ex03 - Troca Texto

document.getElementById("btnSwap").onclick = function () {
    // Guarda o elemento em uma variável
    let paragraph = document.getElementsByTagName("p");
    // Guarda o conteúdo do primeiro parágrafo
    let buff = paragraph[0].innerHTML;

    // Faz as substituições
    paragraph[0].innerHTML = paragraph[1].innerHTML;
    paragraph[1].innerHTML = buff;
}
