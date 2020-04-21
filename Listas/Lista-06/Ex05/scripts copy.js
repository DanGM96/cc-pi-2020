// L04Ex05

const textId = ["company", "name", "function"];

function getAreaText(node) {
	if (node.className === "companyArea") {
		return "Nome da empresa";
	} else if (node.className === "nameArea") {
		return "Nome";
	} else if (node.className === "functionArea") {
		return "Função do funcionário";
	}
}

function createInputBox(currentNode) {
	let node = document.createElement("input");
	let nodeParent = currentNode.parentNode;
	let boxText = currentNode.innerHTML;
	let placeholder;
	let value = "";

	if (
		boxText !== "Nome da empresa" &&
		boxText !== "Nome" &&
		boxText !== "Função do funcionário"
	) {
		placeholder = getAreaText(currentNode.parentNode);
		value = boxText;
	} else {
		placeholder = boxText;
	}

	node.id = "inputBox";
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

function createIcon(iconName) {
	let node = document.createElement("i");
	node.className = iconName;
	return node;
}

function endEdit(nodeParent, storedNode) {
	nodeParent.innerHTML = "";

	nodeParent.appendChild(storedNode);
}

function confirmEdit(nodeParent, storedNode) {
	let text = document.getElementById("inputBox").value;
	if (text === "") {
		text = getAreaText(nodeParent);
	}
	storedNode.innerHTML = text;
	endEdit(nodeParent, storedNode);
}

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

textId.forEach((id) => {
	document.getElementById(id).onclick = function () {
		textInput(this);
	};
});

document.getElementById("logo").onclick = function () {
	alert("Confira nossos pacotes!");
};

document.getElementById("picture").onclick = function () {
	// Loadimg
};
