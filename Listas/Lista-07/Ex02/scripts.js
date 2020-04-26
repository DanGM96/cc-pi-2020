const videos = [
	{
		youtubeId: "RlGOaSPFtXc",
		title: "VOCÊ SABE EXTRAIR INFORMAÇÕES DE DADOS? | Análise de Dados #1",
		author: "Programação Dinâmica",
	},
	{
		youtubeId: "kb8S06dpZiM",
		title: "SINTETIZANDO Imagens | Processamento de Imagens #2",
		author: "Programação Dinâmica",
	},
	{
		youtubeId: "ZtMzB5CoekE",
		title:
			"3 Técnicas Que Eu Uso Para Aprender a Programar Qualquer Coisa (mesmo sem ter o dom da programação)",
		author: "Filipe Deschamps",
	},
	{
		youtubeId: "MV3dxDwRgnQ",
		title:
			"Trabalho Remoto: Vagas Disponíveis HOJE para Ganhar em Dólar e Real (+9 dicas para ser contratado)",
		author: "Filipe Deschamps",
	},
	{
		youtubeId: "n3tMEOw9KGY",
		title: "3 projetos de nível iniciante que geram até $3000 por Mês.",
		author: "Programador BR",
	},
	{
		youtubeId: "nZun1Y_CMJY",
		title: "5 maneiras de ganhar dinheiro como programador sem ter um chefe",
		author: "Programador BR",
	},
];

// https://www.youtube.com/watch?v=youtubeId
function openVideoListener(node, video) {
	node.onclick = function () {
		open("https://www.youtube.com/watch?v=" + video.youtubeId);
	};
	return node;
}

// http://img.youtube.com/vi/youtubeID/maxresdefault.jpg
function getImg(video) {
	let node = document.createElement("img");
	node.src =
		"http://img.youtube.com/vi/" + video.youtubeId + "/maxresdefault.jpg";
	openVideoListener(node, video);
	return node;
}

function getTitle(video) {
	let node = document.createElement("p");
	node.innerHTML = video.title;
	openVideoListener(node, video);
	return node;
}

function getAuthor(video) {
	let node = document.createElement("label");
	node.innerHTML = video.author;
	return node;
}

for (const v in videos) {
	let container = document.querySelector(".container");
	let card = document.createElement("div");
	card.className = "card";

	let cardImg = getImg(videos[v]);
	let cardTitle = getTitle(videos[v]);
	let cardAuthor = getAuthor(videos[v]);

	card.appendChild(cardImg);
	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	container.appendChild(card);
}
