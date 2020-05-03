let pokeList; // Guarda a lista de todos os pokémon
let currentIndex = 0; // Index inicial da lista
let currentPokemon; // Guarda o pokémon atual

// Tenta pegar a lista no cache, caso não tenha, a cria
try {
	pokeList = JSON.parse(localStorage["pokemonList"]);
} catch (error) {
	fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			pokeList = data.results;
			localStorage["pokemonList"] = JSON.stringify(pokeList);
		})
		.catch((error) => {
			//console.error(error);
		});
}

// Apenas para reduzir repetição
function doc(id) {
	return document.getElementById(id);
}

// Coloca a primeira letra da palavra em maiúsculo
function firstUp(word) {
	return word[0].toUpperCase() + word.slice(1);
}

// Coloca o sprite e seu nome na tela
function setSprite() {
	let sprite = currentPokemon.sprites.front_default;

	if (sprite == null) {
		sprite =
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
	}

	doc("pokeSprite").src = sprite;
}

// Preenche todas as tags necessárias
function fillGameBoy() {
	let poke = currentPokemon;
	let name = firstUp(poke.name);
	let types = "";

	setSprite();

	// Pega o index do pokémon na lista
	if (poke.id < pokeList.length) {
		currentIndex = poke.id - 1;
		doc("pokeId").title = "";
		doc("pokeId").style.cursor = "unset";
	} else {
		currentIndex = pokeList.findIndex((key) => {
			return key.name === poke.name;
		});
		doc("pokeId").title =
			"Pokémon with IDs over 10000 are variations of other Pokémon";
		doc("pokeId").style.cursor = "help";
	}

	// Pega o nome de todos os tipos do pokémon
	Object.keys(poke.types).forEach((i) => {
		types += firstUp(poke.types[i].type.name) + "<br>";
	});

	// Main Info
	doc("pokeName").innerHTML = name;
	doc("pokeId").innerHTML = "#" + poke.id;
	doc("pokeType").innerHTML = types;
}

// Procura pelo pokemon na API
function getPokemon(url) {
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Request error, status " + response.status);
			}
			return response.json();
		})
		.then((data) => {
			//console.log(data);
			currentPokemon = data;
			fillGameBoy();
		})
		.catch((error) => {
			console.error(error);
		});
}

// ArrowLeft, passa pro pokémon anterior
doc("prevPoke").onclick = () => {
	if (currentIndex - 1 < 0) {
		currentIndex = pokeList.length;
	}
	getPokemon(pokeList[currentIndex - 1].url);
};

// ArrowRight, passa pro pokémon posterior
doc("nextPoke").onclick = () => {
	if (currentIndex + 1 > pokeList.length - 1) {
		currentIndex = -1;
	}
	getPokemon(pokeList[currentIndex + 1].url);
};

// Pinta o botão de vermelho
document.onkeydown = () => {
	if (document.activeElement === doc("pokeInput")) {
		// Se o pokeInput estiver ativo, não ativa as outras funções
		return;
	}
	if (event.keyCode === 37) {
		// ArrowLeft
		doc("prevPoke").click();
		doc("prevPoke").classList.add("btnActive");
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").click();
		doc("nextPoke").classList.add("btnActive");
	}
};

// Volta a cor do botão ao normal
document.onkeyup = () => {
	if (document.activeElement === doc("pokeInput")) {
		// Se o pokeInput estiver ativo, não ativa as outras funções
		return;
	}
	if (event.keyCode === 37) {
		// ArrowLeft
		doc("prevPoke").classList.remove("btnActive");
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").classList.remove("btnActive");
	}
};
