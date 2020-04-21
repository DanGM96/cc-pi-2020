// L04Ex01

// Ver a div e mudar a cor do li clicado
function viewDiv(divId) {
	let div = document.getElementById(divId).style;
	let divLi = document.getElementById(divId + "-li").style;

	if (div.display !== "block") {
		div.display = "block";
		divLi.fontWeight = "bold";
	} else {
		div.display = "none";
		divLi.fontWeight = "normal";
	}
}

document.getElementById("one-li").onclick = function () {
	viewDiv("one");
};

document.getElementById("two-li").onclick = function () {
	viewDiv("two");
};

document.getElementById("three-li").onclick = function () {
	viewDiv("three");
};

document.getElementById("four-li").onclick = function () {
	viewDiv("four");
};
