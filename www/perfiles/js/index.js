var app = {  cantPlayers: 0,  players: [] }

var player = {  name,  img: "",  color: "",  generalaPoints: 0,  tatetiPoints: 0,  totalPoints: 0}

let coloresOscuros = ["#ff0000", "#000000", "#0000ff"];
let coloresClaros = ["#ffff00", "ff00ff", "ffffff", "00ffff", "00ff00"]

let who = Storage.get("who");
let one_player = Storage.get("player" + who);

function getName() {
  let name = document.getElementById("name-player");
  let newName = prompt("Ingrese nombre del jugador");
  player.name = newName;
  name.innerHTML = newName;
}

function changeName() {
  let name = document.getElementById("name-player");
  let newName = prompt("Ingrese nombre del jugador");
  one_player.name = newName;
  name.innerHTML = newName;
}

function getColor() {
  let menu = document.getElementById("main-menu");
  let newColor = document.getElementById("favcolor").value;
  menu.style.backgroundColor = newColor;
  player.color = newColor;
  if (coloresOscuros.includes(player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "white";
  }
  if (coloresClaros.includes(player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "black";
  }
}

function changeColor() {
  let menu = document.getElementById("main-menu");
  let newColor = document.getElementById("favcolor").value;
  menu.style.backgroundColor = newColor;
  one_player.color = newColor;
  if (coloresOscuros.includes(one_player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "white";
  }
  if (coloresClaros.includes(one_player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "black";
  }
}

function confirmPlayer() {
  let who = Storage.get("who");
  Storage.put("player" + who, one_player);
}

function pushPlayer() {
  if (checkData()) {
    if (Storage.get("appstate") != null) {
      let appstate = Storage.get("appstate");
      appstate.cantPlayers++;
      appstate.players.push(player);
      Storage.put("appstate", appstate);
      Storage.put("player" + appstate.cantPlayers, player);
    } else {
      app.cantPlayers++;
      app.players.push(player);
      Storage.put("appstate", app);
      Storage.put("player" + app.cantPlayers, player);
    }
    window.location = "jugadores.html"
  }
}

function checkData() {
  let img = document.getElementById("foto");
  let name = document.getElementById("name-player");
  let color = document.getElementById("favcolor");
  if (img.src.includes("assets/img/cameras.svg")) {
    alert("Falta ingresar una foto");
    return false;
  } else if (name.innerHTML == "Nuevo Jugador") {
    alert("Falta ingresar un nombre");
    return false;
  } else if (color.value == "#ffffff") {
    alert("Falta ingresar un color");
    return false;
  } else {
    return true;
  }
}


function loadPlayer() {
  if (Storage.get("appstate") != null) {
    let appstate = Storage.get("appstate");
    for (let i = 1; i <= appstate.cantPlayers; i++) {
      let player = Storage.get("player" + i);
      let buttonsBox = document.getElementById("players");
      let boxplayer = document.createElement("a");
      boxplayer.style.backgroundColor = player.color;
      boxplayer.setAttribute("href", "editar-jugador.html");
      boxplayer.setAttribute("data-player", i);
      boxplayer.setAttribute("id", "player" + i);
      boxplayer.setAttribute("onclick", "whoButton(" + i + ")");
      boxplayer.classList.add("jugador-btn");
      boxplayer.classList.add("flex-center-container");
      let imgplayer = document.createElement("img");
      imgplayer.setAttribute("src", player.img);
      let nameplayer = document.createElement("p");
      nameplayer.innerHTML = player.name
      nameplayer.setAttribute("id", "jugadores-btn");
      boxplayer.appendChild(imgplayer);
      boxplayer.appendChild(nameplayer);
      buttonsBox.appendChild(boxplayer);
      if (coloresOscuros.includes(player.color)) {
        nameplayer.style.color = "white";
      }
    }
    if (appstate.cantPlayers == 2) {
      document.getElementById("register-btn").classList.add("nodisp")
    }
  }
}

function stats() {
  let player1 = Storage.get("player1");
  let player2 = Storage.get("player2");
  document.getElementById("nameplayer1").innerHTML = player1.name;
  document.getElementById("nameplayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("nameplayer2").innerHTML = player2.name;
  document.getElementById("nameplayer2").setAttribute("style", "color:" + player2.color);
  document.getElementById("generalaPointsPlayer1").innerHTML = player1.generalaPoints;
  document.getElementById("generalaPointsPlayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("generalaPointsPlayer2").innerHTML = player2.generalaPoints;
  document.getElementById("generalaPointsPlayer2").setAttribute("style", "color:" + player2.color);
  document.getElementById("tatetiPointsPlayer1").innerHTML = player1.tatetiPoints;
  document.getElementById("tatetiPointsPlayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("tatetiPointsPlayer2").innerHTML = player2.tatetiPoints;
  document.getElementById("tatetiPointsPlayer2").setAttribute("style", "color:" + player2.color);
  document.getElementById("totalPlayer1").innerHTML = player1.tatetiPoints + player1.generalaPoints;
  document.getElementById("totalPlayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("totalPlayer2").innerHTML = player2.tatetiPoints + player2.generalaPoints;
  document.getElementById("totalPlayer2").setAttribute("style", "color:" + player2.color);
}

function whoButton(i) {
  Storage.put("who", i);
}

function showPlayer() {
  let who = Storage.get("who");
  let player = Storage.get("player" + who);
  document.getElementById("name-player").innerHTML = player.name;
  document.getElementById("foto").src = player.img;
  document.getElementById("main-menu").style.backgroundColor = player.color;
  if (coloresOscuros.includes(one_player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "white";
  }
  if (coloresClaros.includes(one_player.color)) {
    let name = document.getElementById("name-player");
    name.style.color = "black";
  }
}