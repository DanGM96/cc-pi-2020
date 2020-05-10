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

let genList, // Guarda a lista da geração
	drawnList, // Guarda a lista sorteada com o timer
	boardList, // Guarda a lista da tablea
	gen = generation[doc("generation").value], // opções
	row = doc("row").value, // opções
	column = doc("column").value, // opções
	speed = doc("speed").value, // opções
	gameTimer, // setInterval
	isHD = true, // Bool para a escolha das imagens
	didWin = false; // Bool para saber se o jogador venceu ou não

// Carrega os pokémons sorteados
function loadDraw() {
	if (genList.length === 0) {
		stopTimer();
		if (!didWin) {
			alert("Acabaram os pokémons. Agora você ganha né?");
		}
		return;
	}

	number = drawPoke(genList, drawnList);
	doc("drawArea").classList.remove("loading");

	doc(
		"drawHD"
	).src = `https://pokeres.bastionbot.org/images/pokemon/${number}.png`;

	doc(
		"drawSD"
	).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;

	toggleImg();
}

// Começa o setInterval se a variável for falsa (previne que ele possa ser ativado mais de uma vez por acidente)
function startTimer() {
	if (!gameTimer) {
		toggleImg();
		gameTimer = setInterval(loadDraw, speed * 1000);
	}
}

// Limpa o setInterval e dá um valor de falso para a variável
function stopTimer() {
	clearInterval(gameTimer);
	gameTimer = false;
}

// Usado pra previnir as diversas maneiras que o setInterval possa começar
function isNullLists() {
	return genList == null && drawnList == null && boardList == null;
}

// Enche uma lista com a geração atual
function fillList(array) {
	for (let i = gen.start; i < gen.start + gen.amount; i++) {
		array.push(i);
	}
}

// Remove o valor de uma array e coloca em outra, assim evitando repetições
function drawPoke(arrayIn, arrayOut) {
	// Random index dentro da lista
	let rnd = Math.floor(Math.random() * arrayIn.length);
	let number = arrayIn[rnd];
	arrayIn.splice(rnd, 1);
	arrayOut.push(number);

	return number;
}

// Apenas para reduzir repetição
function doc(id) {
	return document.getElementById(id);
}

// Abre ou fecha o menu options
function toggleOptions() {
	doc("optScreen").classList.toggle("hidden");
}

// Cria o formato da grid baseado na coluna
function setGrid(side) {
	doc("board").style.gridTemplateColumns = `repeat(${side}, 1fr)`;
	// grid-template-columns: repeat(5, 1fr);
}

// Muda entre imagens HD e SD
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

// Cria as divs e imgs para a tabela do bingo
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

// Faz todo o necessário para começar um jogo do zero
function prepareGame() {
	stopTimer();
	boardList = [];
	drawnList = [];
	genList = [];
	fillList(genList);

	doc("drawArea").classList.add("loading"); // Aciona o gif de carregamento
	doc("startBtn").innerHTML = "Restart"; // Muda o nome do botão
	doc("gameArea").classList.remove("hidden"); // Mostra o jogo
	doc("board").innerHTML = ""; // Limpa o jogo
	doc("drawHD").src = ""; // Limpa o drawHD
	doc("drawSD").src = ""; // Limpa o drawSD

	let cellAmount = row * column; // Calcula quantas células serão geradas

	if (cellAmount <= gen.amount) {
		setGrid(column);

		let auxList = genList.slice();
		while (boardList.length < cellAmount) {
			drawPoke(auxList, boardList);
		}
	} else {
		console.log(
			"Não há pokémons suficientes para preencher a tabela!",
			"Alguém modificou a const generation... Foi você?!"
		);
		return;
	}
	createCells(boardList);
	startTimer();
}

// Botão Start
doc("startBtn").onclick = () => {
	prepareGame();
};

// Botão Bingo! faz todas as verificações necessárias para confirmar se o jogador venceu
doc("bingoBtn").onclick = () => {
	stopTimer();
	let board = doc("board");

	if (isNullLists()) {
		alert("Ainda não começou o jogo, meu caro?");
		return;
	}

	// Verifica se a quantidade de filhos de "#board" é a mesma quantidade de elementos com ".selected", já que apenas elementos ".cell" são filhos de "#board" e podem ter ".selected".
	if (board.children.length == board.querySelectorAll(".selected").length) {
		// Se a drawnList incluí tudo da boardList
		if (boardList.every((i) => drawnList.includes(i))) {
			alert("B I N G O ! Meus parabéns, campeão!");
			doc("gameArea").classList.add("hidden");
			didWin = true;
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

// Botão Options
doc("optBtn").onclick = () => {
	stopTimer();
	toggleOptions();
};

// Botão Quality (menu)
doc("imgBtn").onclick = () => {
	isHD = !isHD;
	toggleImg();
};

// Botão Restore (menu)
doc("restoreBtn").onclick = () => {
	doc("generation").value = 0;
	doc("row").value = 5;
	doc("column").value = 5;
	doc("speed").value = 5;
};

// Botão Cancel (menu)
doc("cancelBtn").onclick = () => {
	toggleOptions();

	if (isNullLists()) {
		return;
	}
	startTimer();
};

// Botão Confirm (menu)
doc("confirmBtn").onclick = () => {
	let auxGen = generation[doc("generation").value];
	let auxRow = doc("row").value;
	let auxColumn = doc("column").value;
	speed = doc("speed").value;

	if (gen !== auxGen || row !== auxRow || column !== auxColumn) {
		gen = auxGen;
		row = auxRow;
		column = auxColumn;
		prepareGame();
	}
	toggleOptions();

	if (isNullLists()) {
		return;
	}
	startTimer();
};

// Tecla ESC
document.onkeyup = () => {
	// se ESC for pressionado
	if (event.keyCode === 27) {
		if (!gameTimer && !isNullLists()) {
			startTimer();
		} else {
			stopTimer();
		}
		toggleOptions();
	}
};
