let pokeList; // Guarda a lista de todos os pokémons
let currentIndex = -1; // Index inicial da lista
let currentPokemon; // Guarda o pokémon atual
let currentSprite = 4; // Guarda a chave do sprite (padrão = 4)

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

	// Extra Info
	doc("hp").innerHTML = "HP: " + poke.stats[5].base_stat;
	doc("attack").innerHTML = "Attack: " + poke.stats[4].base_stat;
	doc("defense").innerHTML = "Defense: " + poke.stats[3].base_stat;
	doc("speed").innerHTML = "Speed: " + poke.stats[0].base_stat;
	doc("special-atk").innerHTML = "Special Atk: " + poke.stats[2].base_stat;
	doc("special-def").innerHTML = "Special Def: " + poke.stats[1].base_stat;
	doc("weight").innerHTML = "Weight: " + poke.weight / 10 + "kg";
	doc("height").innerHTML = "Height: " + poke.height * 10 + "cm";
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
			//console.error(error);
		});
}

// Pesquisa se há o pokemon na lista local, antes de pedir o fetch
function searchList(key, input) {
	let search = pokeList.find(
		(poke) => poke[key].indexOf(input.toLowerCase()) >= 0
	);
	console.log(search);
	if (search == null) {
		doc("pokeWrong").style.display = "block";
	} else {
		doc("pokeWrong").style.display = "none";
		let url = search.url;
		getPokemon(url);
	}
}

// Cria um link pra pesquisa na API
doc("pokeBtn").onclick = () => {
	let input = doc("pokeInput").value.replace(/[^a-zA-Z0-9-]+/g, "");
	doc("pokeInput").value = input;

	if (input !== "" && input != null) {
		if (isNaN(input)) {
			searchList("name", input);
		} else {
			searchList("url", input);
		}
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
	if (event.keyCode === 38) {
		// ArrowUp
		doc("nextSprite").click();
		doc("nextSprite").classList.add("btnActive");
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").click();
		doc("nextPoke").classList.add("btnActive");
	}
	if (event.keyCode === 40) {
		// ArrowDown
		doc("prevSprite").click();
		doc("prevSprite").classList.add("btnActive");
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
	if (event.keyCode === 38) {
		// ArrowUp
		doc("nextSprite").classList.remove("btnActive");
	}
	if (event.keyCode === 39) {
		// ArrowRight
		doc("nextPoke").classList.remove("btnActive");
	}
	if (event.keyCode === 40) {
		// ArrowDown
		doc("prevSprite").classList.remove("btnActive");
	}
};

// Pin da aba esquerda DESATIVADO - Ative no CSS, depois retire a função do comentário
/*
doc("leftPin").onclick = () => {
	let tab = doc("leftTab");

	if (tab.className !== "leftBig") {
		tab.className = "leftBig";
		doc("leftPin").style.color = "#c52018";
		doc("leftTitle").classList.remove("leftTitle");
		doc("leftContent").classList.add("displayBlock");
	} else {
		tab.className = "leftSmall";
		doc("leftPin").style.color = "#3761a8";
		doc("leftTitle").classList.add("leftTitle");
		doc("leftContent").classList.remove("displayBlock");
	}
};
*/

// Pin da aba direita
doc("rightPin").onclick = () => {
	let tab = doc("rightTab");

	if (tab.className !== "rightBig") {
		tab.className = "rightBig";
		doc("rightPin").style.color = "#c52018";
		doc("rightTitle").classList.remove("rightTitle");
		doc("rightContent").classList.add("displayBlock");
	} else {
		tab.className = "rightSmall";
		doc("rightPin").style.color = "#3761a8";
		doc("rightTitle").classList.add("rightTitle");
		doc("rightContent").classList.remove("displayBlock");
	}
};
