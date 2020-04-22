// L04Ex03

// Responde ao eventListener do checkIcon
function checkMark(icon) {
	if (icon.getAttribute("class") !== "far fa-check-circle") {
		icon.setAttribute("class", "far fa-check-circle");
		icon.parentElement.style.textDecoration = "line-through";
	} else {
		icon.setAttribute("class", "far fa-circle");
		icon.parentElement.style.textDecoration = "none";
	}
}

// Cria o elemento dos ícones
function createIcon(iconName) {
	let node = document.createElement("i");

	let iconClass = document.createAttribute("class");
	iconClass.value = "far " + iconName;
	node.setAttributeNode(iconClass);
	return node;
}

// Retorna um elemento com os ícones e o valor do inputTxt
function getContent() {
	let node = document.createElement("td");

	let input = document.getElementById("inputTxt").value;
	let text = document.createTextNode(input);

	let checkIcon = createIcon("fa-circle");
	checkIcon.addEventListener("click", function () {
		checkMark(checkIcon);
	});

	let trashIcon = createIcon("fa-trash-alt");
	trashIcon.style = "float: right";
	trashIcon.addEventListener("click", function () {
		node.remove();
	});

	node.appendChild(checkIcon);
	node.appendChild(text);
	node.appendChild(trashIcon);
	return node;
}

// Coloca o elemento na tela
function enterText() {
	let inputTxt = document.getElementById("inputTxt");
	if (inputTxt.value !== "") {
		let node = document.createElement("tr");
		node.appendChild(getContent());
		document.getElementById("list").appendChild(node);
	}
	inputTxt.value = "";
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
