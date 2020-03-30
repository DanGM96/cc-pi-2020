// Ex01 - Master Hacker
// Execute no console do navegador em https://www.google.com/

// LOGO
let logo = document.getElementById("hplogo");

// Guarda url do logo original
let googleLogo = logo.getAttribute("srcset");

// Guarda a url do logo desejado
let yahooLogo = "https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_205x58_frontpage_2x.png";

// Altera a url do logo no atributo usado
logo.setAttribute("srcset", yahooLogo);

// BOTAO SEARCH
let searchButton = document.getElementsByName("btnK");

// É necessário que todos(2) os elementos com Name btnK sejam mudado pras mudanças ocorrerem
for (let index = 0; index < searchButton.length; index++) {
    searchButton[index].setAttribute("value", "Pesquisa Yahoo");
}
