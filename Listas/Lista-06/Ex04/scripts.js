// L04Ex04

// Preparações iniciais
let number;
let tries;
let input = document.getElementById("inputNum");

// Configurações od jogo
function startGame() {
	document.getElementById("guesses").innerHTML = "";
	document.getElementById("mainTxt").innerHTML =
		"Adivinhe o número entre 1 e 100.";
	tries = 0;

	number = Math.floor(Math.random() * 100);
	// Em caso de alguma coisa der muito errado
	if (number < 1 || number > 100) {
		startGame();
	}
}
startGame();

// O jogo
function guessGame() {
	let guess = input.value;
	let node = document.createElement("li");
	let tip;

	if (guess == number) {
		tip = guess + " é o número certo!";
		tries = 6;
	}
	if (guess < number) {
		tip = guess + " é muito baixo";
	}
	if (guess > number) {
		tip = guess + " é muito alto";
	}
	let text = document.createTextNode(tip);
	node.appendChild(text);
	if (tries > 5) {
		node.style.fontWeight = "bold";
	}
	return node;
}

// Coloca o elemento na tela
function enterText() {
	if (tries < 5 && input.value >= 1 && input.value <= 100) {
		let node = document.createElement("li");
		node.appendChild(guessGame());
		document.getElementById("guesses").appendChild(node);
		tries++;
	}
	if (tries === 5) {
		document.getElementById("mainTxt").innerHTML = "Acabaram suas tentativas!";
		document.getElementById("inputBtn").disabled = true;
	}
}

// Ao clicar no ícone
document.getElementById("inputBtn").onclick = function () {
	enterText();
};

// Ao clicar enter dentro da caixa
document.getElementById("inputNum").onkeypress = function () {
	if (event.keyCode === 13) {
		enterText();
	}
};

// Reinicia o jogo
document.getElementById("resetBtn").onclick = function () {
	startGame();
	document.getElementById("inputBtn").disabled = false;
};
