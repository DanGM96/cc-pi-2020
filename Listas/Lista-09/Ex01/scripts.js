// https://pokeres.bastionbot.org/images/pokemon/25.png

const generation = [
	// Lista de gerações pokémon
	{ name: 1, start: 1, amount: 151 },
	{ name: 2, start: 152, amount: 100 },
	{ name: 3, start: 252, amount: 135 },
	{ name: 4, start: 387, amount: 107 },
	{ name: 5, start: 494, amount: 156 },
	{ name: 6, start: 650, amount: 72 },
	{ name: 7, start: 722, amount: 88 },
	{ name: 8, start: 810, amount: 85 },
];

let genList, drawnList, boardList; // arrays
let gen = generation[doc("genChoice").value];
let row = doc("row").value;
let column = doc("column").value;
let gameTimer; // setInterval
let isHD = true; // Bool para a escolha das imagens

function fillList(array) {
	for (let i = gen.start; i < gen.start + gen.amount; i++) {
		array.push(i);
	}
}

function drawPoke(arrayIn, arrayOut) {
	// Random index dentro da lista
	let rnd = Math.floor(Math.random() * arrayIn.length);
	let number = arrayIn[rnd];
	arrayIn.splice(rnd, 1);
	arrayOut.push(number);

	return number;
}

function myTimer() {
	number = drawPoke(genList, drawnList);
	doc(
		"drawHD"
	).src = `https://pokeres.bastionbot.org/images/pokemon/${number}.png`;
	doc(
		"drawSD"
	).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
	toggleImg();

	if (genList.length === 0) {
		stopTimer();
		alert("Acabaram os pokémons. Agora você ganha né?");
	}
}

// Apenas para reduzir repetição
function doc(id) {
	return document.getElementById(id);
}

function toggleOptions() {
	doc("optScreen").classList.toggle("hidden");
}

function setGrid(side) {
	doc("board").style.gridTemplateColumns = `repeat(${side}, 1fr)`;
	// grid-template-columns: repeat(5, 1fr);
}

function toggleImg() {
	let hideImg;
	let showImg;

	if (isHD === true) {
		showImg = document.getElementsByClassName("hdImg");
		hideImg = document.getElementsByClassName("sdImg");
	} else {
		hideImg = document.getElementsByClassName("hdImg");
		showImg = document.getElementsByClassName("sdImg");
	}

	for (let i = 0; i < hideImg.length; i++) {
		hideImg[i].classList.add("hidden");
	}
	for (let i = 0; i < showImg.length; i++) {
		showImg[i].classList.remove("hidden");
	}
}

function createCells(array) {
	array.forEach((number) => {
		let parent = doc("board");
		let div = document.createElement("div");

		// Imagem com Alta Resolução / Fanart
		let imgHD = document.createElement("img");
		imgHD.src = `https://pokeres.bastionbot.org/images/pokemon/${number}.png`;
		imgHD.classList.add("hdImg");

		// Imagem com Baixa Resolução / Original
		let imgSD = document.createElement("img");
		imgSD.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
		imgSD.classList.add("sdImg");

		div.addEventListener("click", () => {
			div.classList.toggle("selected");
		});

		div.className = "cell";
		div.append(imgHD);
		div.append(imgSD);

		parent.append(div);
	});
	toggleImg();
}

function prepareGame() {
	stopTimer();
	boardList = [];
	drawnList = [];
	genList = [];
	fillList(genList);

	doc("startBtn").innerHTML = "Restart";
	doc("gameArea").classList.remove("hidden");
	doc("board").innerHTML = ""; // Limpa o jogo
	doc("drawHD").src = "";
	doc("drawSD").src = "";

	let cellAmount = row * column; // Calcula quantas células serão geradas

	if (cellAmount <= gen.amount) {
		setGrid(column);

		let auxList = genList.slice();
		while (boardList.length < cellAmount) {
			drawPoke(auxList, boardList);
		}
	} else {
		console.log("Não há pokémons suficientes para preencher a tabela!");
		return;
	}
	createCells(boardList);
	startTimer();
}

function startTimer() {
	if (!gameTimer) {
		gameTimer = setInterval(myTimer, 5000);
	}
}

function stopTimer() {
	clearInterval(gameTimer);
	gameTimer = false;
}

function isNull() {
	return genList == null && drawnList == null && boardList == null;
}

doc("startBtn").onclick = () => {
	prepareGame();
};

doc("bingoBtn").onclick = () => {
	stopTimer();
	let board = doc("board");

	if (isNull()) {
		alert("Ainda não começou o jogo, meu caro?");
		return;
	}

	// Verifica se a quantidade de filhos de "#board" é a mesma quantidade de elementos com ".selected", já que apenas elementos ".cell" são filhos de "#board" e podem ter ".selected".
	if (board.children.length == board.querySelectorAll(".selected").length) {
		// Se a drawnList incluí tudo da boardList
		if (boardList.every((i) => drawnList.includes(i))) {
			alert("B I N G O !");
		} else {
			alert("Ops... você marcou um pokémon errado.");
		}
	} else {
		alert("Pra vencer, tem que marcar todos os pokémons!");
	}

	if (genList.length !== 0) {
		startTimer();
	}
};

doc("optBtn").onclick = () => {
	stopTimer();
	toggleOptions();
};

doc("imgBtn").onclick = () => {
	isHD = !isHD;
	toggleImg();
};

doc("restoreBtn").onclick = () => {
	doc("genChoice").value = 0;
	doc("row").value = 5;
	doc("column").value = 5;
};

doc("cancelBtn").onclick = () => {
	toggleOptions();

	if (isNull()) {
		return;
	}
	startTimer();
};

doc("confirmBtn").onclick = () => {
	let auxGen = generation[doc("genChoice").value];
	let auxRow = doc("row").value;
	let auxColumn = doc("column").value;

	if (gen !== auxGen || row !== auxRow || column !== auxColumn) {
		gen = auxGen;
		row = auxRow;
		column = auxColumn;
		prepareGame();
	}
	toggleOptions();

	if (isNull()) {
		return;
	}
	startTimer();
};

document.onkeydown = () => {
	if (event.keyCode === 27) {
		if (!gameTimer) {
			startTimer();
		} else {
			stopTimer();
		}
		toggleOptions();
	}
};
