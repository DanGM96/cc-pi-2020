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
let bingo = new Set(); // Set para guardar os números do bingo

prepareGame();

function setGrid(side) {
	document.getElementById(
		"board"
	).style.gridTemplateColumns = `repeat(${side}, 1fr)`;
	// grid-template-columns: repeat(5, 1fr);
}

function getPokeNum(gen) {
	return Math.floor(Math.random() * gen.amount) + gen.start;
}

function toggleImg() {
	let img = document.getElementsByClassName("cellImg");
	for (let i = 0; i < img.length; i++) {
		img[i].classList.toggle("hidden");
	}
}

function createCells() {
	let i = 0;
	bingo.forEach((number) => {
		let parent = document.getElementById("board");
		let div = document.createElement("div");

		// Imagem com Alta Resolução / Fanart
		let imgHD = document.createElement("img");
		imgHD.src = `https://pokeres.bastionbot.org/images/pokemon/${number}.png`;
		imgHD.classList.add("cellImg", "hdImg");

		// Imagem com Baixa Resolução / Original
		let imgSD = document.createElement("img");
		imgSD.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
		imgSD.classList.add("cellImg", "sdImg", "hidden");

		div.addEventListener("click", () => {
			div.classList.toggle("selected");
		});

		div.className = "cell";
		div.append(imgHD);
		div.append(imgSD);

		if (i < bingo.size / 2) {
			parent.insertBefore(div, document.getElementById("middleCell"));
		} else {
			parent.append(div);
		}
		i++;
	});
}

function prepareGame(gen = generation[0], side = 5) {
	bingo.clear(); // Limpa o set
	let cellAmount = side * side - 1; // Calcula quantas células serão geradas

	if (cellAmount <= gen.amount) {
		setGrid(side);

		while (bingo.size < cellAmount) {
			bingo.add(getPokeNum(gen));
		}
	} else {
		return;
	}
	createCells();
}

document.getElementById("middleCell").onclick = () => {
	toggleImg();
};
