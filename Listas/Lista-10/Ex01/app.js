const express = require("express");
const path = require("path");

const app = express();

// Necessario pro html poder chamar o css e outros html
app.use(express.static(path.join(__dirname, "public")));

// Apenas uma rota pela maneira que o site foi feito,
// ele carrega cada html dentro da mesma pagina
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.listen(1337, () => {
	console.log("Server online");
});
