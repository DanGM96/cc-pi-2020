// Ex07 - Mudando Cores

// Guardando todos o paragrafos e o h1 em uma variável
let paragraphs = document.getElementsByTagName("p");
let header = document.getElementsByTagName("h1")[0];

// Mudar Cor da Fonte
document.getElementById("btnFnt").onclick = function () {
    
    header.style.color = "blue";
    for (let index = 0; index < paragraphs.length; index++) {
        paragraphs[index].style.color = "blue";
    }
}

// Mudar Cor do Fundo
document.getElementById("btnBg").onclick = function () {

    header.style.backgroundColor = "pink";
    for (let index = 0; index < paragraphs.length; index++) {
        paragraphs[index].style.backgroundColor = "pink";
    }
}
