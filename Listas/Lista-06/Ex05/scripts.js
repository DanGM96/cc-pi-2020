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

function createIcon(iconName) {
	let node = document.createElement("i");

	let iconClass = document.createAttribute("class");
	iconClass.value = iconName;
	node.setAttributeNode(iconClass);
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
	let storedNode = node;
	let nodeParent = node.parentNode;
	let text = node.innerHTML;
	let inputBox;
	if (
		text !== "Nome da empresa" &&
		text !== "Nome" &&
		text !== "Função do funcionário"
	) {
		inputBox =
			'<input id="inputBox" type="text" placeholder="' +
			getAreaText(nodeParent) +
			'" value="' +
			text +
			'" />';
	} else {
		inputBox = '<input id="inputBox" type="text" placeholder="' + text + '" />';
	}

	let cancelIcon = createIcon("fas fa-times-circle");
	cancelIcon.addEventListener("click", function () {
		endEdit(nodeParent, storedNode);
	});

	let confirmIcon = createIcon("fas fa-check-circle");
	confirmIcon.addEventListener("click", function () {
		confirmEdit(nodeParent, storedNode);
	});

	nodeParent.innerHTML = inputBox;
	nodeParent.append(cancelIcon);
	nodeParent.append(confirmIcon);
	nodeParent.firstChild.focus();
	nodeParent.firstChild.addEventListener("keydown", function () {
		if (event.keyCode === 13) {
			// Confirma com enter
			confirmEdit(nodeParent, storedNode);
		}
		if (event.keyCode === 27) {
			// Cancela com esc
			endEdit(nodeParent, storedNode);
		}
	});
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
