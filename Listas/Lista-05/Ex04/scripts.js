// Ex04 - Lamp

// Guarda o elemento img em uma variável
let lamp = document.getElementsByTagName("img")[0];

// Acende
document.getElementById("btnOn").onclick = function () {
    lamp.setAttribute("src", "https://www.w3schools.com/js/pic_bulbon.gif")
}

// Apaga
document.getElementById("btnOff").onclick = function () {
    lamp.setAttribute("src", "https://www.w3schools.com/js/pic_bulboff.gif")
}
