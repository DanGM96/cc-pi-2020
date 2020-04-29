let currentPokemon; // Guarda o pokémon atual
let currentSprite = 4; // Guarda a chave do sprite (padrão = 4)
let pokeList; // Guarda a lista de todos os pokémons
let currentIndex = -1;

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
	let sprites = currentPokemon.sprites;
	// Transforma o objeto sprites em um array[x][y]
	sprites = Object.entries(sprites);
	// Substituí os valores null por uma imagem padrão
	sprites.forEach((index) => {
		if (index[1] == null) {
			index[1] =
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
		}
	});

	// Evita que o sprite saia do loop
	if (currentSprite > 7) {
		currentSprite = 0;
	} else if (currentSprite < 0) {
		currentSprite = 7;
	}
	doc("pokeSprite").src = sprites[currentSprite][1];
	doc("spriteName").innerHTML = sprites[currentSprite][0];
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
	} else {
		currentIndex = pokeList.findIndex((key) => {
			return key.name === poke.name;
		});
	}

	// Pega o nome de todos os tipos do pokémon
	Object.keys(poke.types).forEach((i) => {
		types += firstUp(poke.types[i].type.name) + "<br>";
	});

	doc("pokeName").innerHTML = name;
	doc("pokeId").innerHTML = "#" + poke.id;
	doc("pokeType").innerHTML = types;
}

// Procura pelo pokemon na API
function getPokemon(url) {
	fetch(url)
		.then((response) => {
			if (response.ok) {
				// Se houver resposta
				doc("pokeWrong").style.display = "none";
			} else {
				doc("pokeWrong").style.display = "block";
				// Se NÃO houver resposta
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
			//console.error(error);
		});
}

doc("pokeBtn").onclick = () => {
	let input = doc("pokeInput").value.trim().toLowerCase();
	if (input !== "" && input != null) {
		let url = `https://pokeapi.co/api/v2/pokemon/${input}/`;
		getPokemon(url);
	} else {
		input.value = input;
	}
};

doc("pokeInput").onkeypress = () => {
	if (event.keyCode === 13) {
		// Confirma com enter
		doc("pokeBtn").click();
	}
};

// ArrowLeft, passa pro pokémon anterior
doc("prevPoke").onclick = () => {
	if (currentIndex - 1 < 0) {
		currentIndex = pokeList.length;
	}
	getPokemon(pokeList[currentIndex - 1].url);
};

// ArrowUp, muda pra sprite(img) posterior
doc("nextSprite").onclick = () => {
	if (currentPokemon != null) {
		currentSprite++;
		setSprite();
	}
};

// ArrowRight, passa pro pokémon posterior
doc("nextPoke").onclick = () => {
	if (currentIndex + 1 > pokeList.length - 1) {
		currentIndex = -1;
	}
	getPokemon(pokeList[currentIndex + 1].url);
};

// ArrowDown, muda pra sprite(img) anterior
doc("prevSprite").onclick = () => {
	if (currentPokemon != null) {
		currentSprite--;
		setSprite();
	}
};

document.onkeydown = () => {
	if (document.activeElement === doc("pokeInput")) {
		return;
	}
	if (event.keyCode === 37) {
		// ArrowLeft
		doc("prevPoke").click();
		doc("prevPoke").style.color = "#c52018";
	}
	if (event.keyCode === 38) {
		// ArrowUp
		doc("nextSprite").click();
		doc("nextSprite").style.color = "#c52018";
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").click();
		doc("nextPoke").style.color = "#c52018";
	}
	if (event.keyCode === 40) {
		// ArrowDown
		doc("prevSprite").click();
		doc("prevSprite").style.color = "#c52018";
	}
};

document.onkeyup = () => {
	if (event.keyCode === 37) {
		// ArrowLeft
		doc("prevPoke").style.color = "#3761a8";
	}
	if (event.keyCode === 38) {
		// ArrowUp
		doc("nextSprite").style.color = "#3761a8";
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").style.color = "#3761a8";
	}
	if (event.keyCode === 40) {
		// ArrowDown
		doc("prevSprite").style.color = "#3761a8";
	}
};
