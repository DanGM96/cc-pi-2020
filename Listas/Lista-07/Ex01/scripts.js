let form = document.forms[0];

function makeJSON() {
	// Cria um objeto vazio
	let obj = {};
	// Percorre todos os elementos dentro de forms (menos o último que é o inputBtn)
	for (let i = 0; i < form.length - 1; i++) {
		// Pega os IDs para serem chaves do objeto
		let key = form.elements[i].id.toString();
		let value;
		// Pega os valores de cada elemento, incluindo a booleana do checkbox
		if (form.elements[i].type !== "checkbox") {
			value = form.elements[i].value;
		} else {
			value = form.elements[i].checked;
		}
		// Adiciona chave e valor ao objeto
		obj[key] = value;
	}
	// Transforma objeto para JSON
	return JSON.stringify(obj);
}

document.getElementById("sendBtn").onclick = function () {
	let output = "";
	// checkValidity() verifica se os campos do form estão corretos
	if (form.checkValidity()) {
		// Caso corretos, cria e guarda o JSON em output
		output = makeJSON();
	}
	document.getElementById("sentJson").innerHTML = output;
};
