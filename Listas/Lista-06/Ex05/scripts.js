// L04Ex05

// Informações necessárias do HTML
const info = {
	company: {
		id: "company",
		defaulText: "Nome da empresa",
		parentClass: "companyArea",
	},
	name: {
		id: "name",
		defaulText: "Nome",
		parentClass: "nameArea",
	},
	function: {
		id: "function",
		defaulText: "Função do funcionário",
		parentClass: "functionArea",
	},
};

// Procura e entrega o defaultText
function getDefaultText(node) {
	let defaultText;
	// some() para no instante em que encontra um TRUE
	Object.keys(info).some((key) => {
		if (node.className === info[key].parentClass) {
			defaultText = info[key].defaulText;
		}
	});
	return defaultText;
}

// Cria a inputBox, onde o usuário pode editar o texto
function createInputBox(currentNode) {
	let node = document.createElement("input");
	let nodeParent = currentNode.parentNode;
	let boxText = currentNode.innerHTML;
	let placeholder;
	let value = "";
	if (
		// Verifica se TUDO é true no objeto
		// every() para no instante que encontra um FALSE
		Object.keys(info).every((key) => {
			return boxText !== info[key].defaulText;
		})
	) {
		placeholder = getDefaultText(nodeParent);
		value = boxText;
	} else {
		placeholder = boxText;
	}

	node.id = currentNode.id + "Input";
	node.type = "text";
	node.placeholder = placeholder;
	node.value = value;
	node.addEventListener("keydown", function () {
		if (event.keyCode === 13) {
			// Confirma com enter
			confirmEdit(nodeParent, currentNode);
		}
		if (event.keyCode === 27) {
			// Cancela com esc
			endEdit(nodeParent, currentNode);
		}
	});
	return node;
}

// Criar qualquer icone ao receber a classe completa
function createIcon(iconClass) {
	let node = document.createElement("i");
	node.className = iconClass;
	return node;
}

// Remove a inputBox e coloca o texto no lugar
function endEdit(nodeParent, node) {
	nodeParent.innerHTML = "";
	nodeParent.appendChild(node);
}

// Organiza o texto a substituir a inputBox
function confirmEdit(nodeParent, node) {
	let text = nodeParent.firstChild.value.trim();
	if (text === "") {
		text = getDefaultText(nodeParent);
	}
	node.innerHTML = text;
	endEdit(nodeParent, node);
}

// Remove o texto, gera a inputBox e os ícones como botões
function textInput(node) {
	let nodeParent = node.parentNode;

	let inputBox = createInputBox(node);

	let cancelIcon = createIcon("fas fa-times-circle");
	cancelIcon.addEventListener("click", function () {
		endEdit(nodeParent, node);
	});

	let confirmIcon = createIcon("fas fa-check-circle");
	confirmIcon.addEventListener("click", function () {
		confirmEdit(nodeParent, node);
	});

	nodeParent.innerHTML = "";
	nodeParent.appendChild(inputBox);
	nodeParent.appendChild(cancelIcon);
	nodeParent.appendChild(confirmIcon);
	nodeParent.firstChild.focus();
}

document.getElementById("logo").onclick = function () {
	if (confirm("Confira nossos pacotes!")) {
		open("https://youtu.be/dQw4w9WgXcQ");
	}
};

// Aguarda por cliques nos elementos predeterminados
Object.keys(info).forEach((key) => {
	document.getElementById(info[key].id).onclick = function () {
		textInput(this);
	};
});

// Aguar por clica na imagem
document.getElementById("picture").onclick = function () {
	document.getElementById("file").click();
};

// Troca a imagem pela escolhida pelo usuário
document.getElementById("file").onchange = function () {
	document.getElementById("picture").src = URL.createObjectURL(this.files[0]);
};
