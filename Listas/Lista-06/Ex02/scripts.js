// L04Ex02

// Criar um elemento com o valor de inputTxt
function enterText() {
	let node = document.createElement("li");
	let inputText = document.getElementById("inputTxt").value;
	let text = document.createTextNode(inputText);
	node.appendChild(text);
	document.getElementById("list").appendChild(node);
}

// Ao clicar no ícone
document.getElementById("inputBtn").onclick = function () {
	enterText();
};

// Ao clicar enter dentro da caixa
document.getElementById("inputTxt").onkeypress = function () {
	if (event.keyCode === 13) {
		enterText();
	}
};
