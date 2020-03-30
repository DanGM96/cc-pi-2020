// Ex06 - New Text and Color

// Guardando os elemento em variáveis para facilitar a leitura
let paragraph = document.getElementById("mainTxt");
let text = document.getElementById("inputTxt");
let colorControl = document.getElementById("colorP");

// Muda o texto
document.getElementById("btnTxt").onclick = function () {
    paragraph.innerHTML = text.value;
}

// Muda a cor do texto
colorP.addEventListener("input", function () {
    paragraph.style.color = colorControl.value;
});
