document.getElementById("b1").onclick = function () {
    document.getElementById("p1").innerHTML = "Ciência da Computação";
}

let paragrafos = document.getElementsByTagName("p");

document.getElementById("b2").onclick = function () {
    // paragrafos.forEach(p => p.style.color = "red");
    for (let index = 0; index < paragrafos.length; index++) {
        paragrafos[index].style.color = "red";
    }
}
console.log(paragrafos);

// Como encontrar elementos da DOM
// document.getElementById("");
// document.getElementsByTagName("");
// document.getElementsByClassName("");

// Alterando elementos HTML
// element.innerHTML // Altera o conteúdo HTML de um elemento
// element.attribute // Altera um atributo de um elemento
// element.style.property // Altera a propriedade CSS de um elemento
// element.setAttribute(attribute, value) // Altera um atributo de um elemento

// ALterando o atributo src de uma imagem

document.getElementById("img1").onmouseover = function () {
    document.getElementById("img1").setAttribute("src", "https://baixarpapeldeparede.com/web/wallpapers/wallpaper-hd-brasil-21/1280x720.jpg");
}

document.getElementById("img1").onmouseleave = function () {
    document.getElementById("img1").setAttribute("src", "https://www.baixarpapeldeparede.com/web/wallpapers/wallpaper-4k-full-hd-049/1280x720.jpg");
}

// Pegando conteúdo de um input e escrevendo no parágrafo
document.getElementById("div1").onclick = function () {
    let txt = document.getElementById("inputtext1").value;
    document.getElementById("p5").innerHTML = txt;
}

// Alterando o value de um input
document.getElementById("inputtext1").onkeyup = function ghost() {
    let length = document.getElementById("inputtext1").value.length;

    let tam = length;

    var msg = "Você acha que você pode digitar o que você quer aqui? EU controlo tudo!!!";

    document.getElementById("inputtext1").value = msg.slice(0, tam);
}

// Função que pega a altura e largura e escreve em um <p>
function windowSize() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;

    document.getElementById("p6").innerHTML = "Dimensões: " + w + " x " + h;
}

// Vinculando a função a um listener
window.addEventListener("resize", windowSize);

// Criar elementos
// Remove child
// Append child
// Replace child

// Passos para criar um novo elemento
// 1 - Criar o elemento filho
// 2 - Criar o conteúdo do elemento filho
// 3 - Vincular o conteúdo ao elemento filho
// 4 - Vincular o elemento filho ao elemento pai
let cursos = ["Ciência da Computação", "Análise e Desenvolvimento de Sistemas", "Processos Químicos", "Agroindústria", "Eletrotécnica", "Administração"];

document.getElementById("b3").onclick = function () {
    let node = document.createElement("li"); // 1
    let n = Math.floor(Math.random() * 6);
    let text = document.createTextNode(cursos[n]); // 2
    node.appendChild(text); // 3
    node.addEventListener("click", function () {
        this.remove();
    });
    document.getElementById("listacursos").appendChild(node); // 4

}

// Remover um elemento específico
let item = document.getElementById("li1");
item.onclick = function () {
    this.remove();
}

let itens = document.getElementsByTagName("li");
for (let i = 0; i < itens.length; i++) {
    itens[i].addEventListener("click", function () {
        this.remove();
    });
}

document.getElementById("b4").onclick = function () {
    let n = 1 + Math.floor(Math.random() * 807);
    let link = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + n + ".png";
    console.log("Pokemon: " + link);
    document.getElementById("img2").setAttribute("src", link);
}

var input = document.getElementById("inputtext2");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        let link = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + input.value + ".png";
        console.log("Pokemon: " + link);
        document.getElementById("img2").setAttribute("src", link);

        event.preventDefault();
    }
});
