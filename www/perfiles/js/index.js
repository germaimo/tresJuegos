var app = { cantPlayers: 0, players: [] }

var player = { name, 
  img: "", 
  color: "", 
  generalaPoints: 0, 
  tatetiPoints: 0, 
  memotestPoints: 0, 
  totalPoints: 0 }

let colores = [
  { color: '#FFD031', elegido: false },
  { color: '#EB1751', elegido: false },
  { color: '#26D074', elegido: false },
  { color: '#F808F8', elegido: false },
  { color: '#24A1E7', elegido: false }
];

let who = Storage.get("who");
let one_player = Storage.get("player" + who);

function getName() {
  let name = document.getElementById("name-player");
  let newName = prompt("Ingrese nombre del jugador");

  if( newName === '' ){
    return;
  }

  player.name = newName;
  document.getElementById('nombreJugador').value = newName;
  name.innerHTML = newName;
}

function changeName() {
  let name = document.getElementById("name-player");
  let newName = prompt("Ingrese nombre del jugador");

  if (newName === '') {
    return;
  }

  one_player.name = newName;
  name.innerHTML = newName;
  document.getElementById('nombreJugador').value = newName;
}

function changeColor(color, id) {
  
  one_player.color = color;

  document.getElementById("foto").style.border = `6px solid ${color}`;
  
  document.querySelectorAll('[class="circulo selected"]').forEach(item => {
    item.classList.remove('selected');
  });

  document.getElementById(id).classList.add('selected');

}

function selectColor(color, id) {
  
  player.color = color;

  document.getElementById("foto").style.border = `6px solid ${color}`;
  
  document.querySelectorAll('[class="circulo selected"]').forEach(item => {
    item.classList.remove('selected');
  });

  document.getElementById(id).classList.add('selected');

}

function confirmPlayer() {
  let who = Storage.get("who");
  Storage.put("player" + who, one_player);
}

function pushPlayer() {
  if (checkData()) {
    if (Storage.get("appstate") != null) {
      
      let appstate = Storage.get("appstate");
      console.log('appstate ', appstate)
      appstate.cantPlayers++;
      console.log( 'appstate.cantPlayers ', appstate.cantPlayers)

      console.log( 'player ', player)

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
  let colorSeleccionado = document.querySelectorAll('[class="circulo selected"');

  if (img.src.includes("assets/img/cameras.svg")) {
    alert("Falta ingresar una foto");
    return false;
  } else if (name.innerHTML == "Nuevo Jugador") {
    alert("Falta ingresar un nombre");
    return false;
  } else if ( colorSeleccionado.length !== 1 ) {
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
      let pContainer = document.createElement("p");

      let boxplayer = document.createElement("a");
      pContainer.style.backgroundColor = player.color;

      boxplayer.setAttribute("href", "editar-jugador.html");
      boxplayer.setAttribute("data-player", i);
      boxplayer.setAttribute("id", "player" + i);
      boxplayer.setAttribute("onclick", "whoButton(" + i + ")");
      boxplayer.classList.add("jugador-btn");
      boxplayer.classList.add("flex-center-container");

      let imgplayer = document.createElement("img");
      imgplayer.setAttribute("src", player.img);
      let nameplayer = document.createElement("span");
      nameplayer.innerHTML = player.name;
      nameplayer.setAttribute("id", "jugadores-btn");

      boxplayer.appendChild(imgplayer);
      boxplayer.appendChild(nameplayer);
      pContainer.appendChild(boxplayer);
      buttonsBox.appendChild(pContainer);
    }


    if (appstate.cantPlayers == 2) {
      document.getElementById("nuevoJugador").classList.add("disabled")
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

  document.getElementById("memotestPointsPlayer1").innerHTML = player1.memotestPoints;
  document.getElementById("memotestPointsPlayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("memotestPointsPlayer2").innerHTML = player2.memotestPoints;
  document.getElementById("memotestPointsPlayer2").setAttribute("style", "color:" + player2.color);


  document.getElementById("totalPlayer1").innerHTML = player1.tatetiPoints + player1.generalaPoints + player1.memotestPoints;
  document.getElementById("totalPlayer1").setAttribute("style", "color:" + player1.color);
  document.getElementById("totalPlayer2").innerHTML = player2.tatetiPoints + player2.generalaPoints + player2.memotestPoints;
  document.getElementById("totalPlayer2").setAttribute("style", "color:" + player2.color);
}

function whoButton(i) {
  Storage.put("who", i);
}

function showPlayer() {
  let who = Storage.get("who");
  let player = Storage.get(`player${who}`);

  let otroPlayer = Storage.get(`player${who === 1 ? 2 : 1}`);

  document.getElementById("name-player").innerHTML = player.name;
  document.getElementById('nombreJugador').value = player.name;

  document.getElementById("foto").src = player.img;
  document.getElementById("foto").style.border = `6px solid ${player.color}`;

  let listaColores = document.getElementById('colores');

  colores.map(({ color, elegido }, index) => {
    let li = document.createElement('li');
    let elegidoPorPlayerActual = color === player.color;
    let elegidoPorOtroPlayer = color === otroPlayer.color;
    
    let clases = ['circulo'];
    if(elegidoPorPlayerActual){ clases.push('selected'); }
    if(elegidoPorOtroPlayer){ clases.push('cruz'); }

    li.classList.add(...clases);
    li.style.backgroundColor = color;
    li.id = index;
    if(!elegidoPorOtroPlayer){ li.onclick = () => changeColor(color, index); }
    return listaColores.appendChild(li);
  }
  ).join('');

}

const goBack = () => {
  window.location.href = '../index.html';
}

const goBackJugadores = () =>{
  window.location.href = '../perfiles/jugadores.html';
}

const loadColors = () =>{

    let listaColores = document.getElementById('colores');
    let hayOtroPlayer = false;
    let otroPlayer = '';
    
    if(Storage.get("appstate") != null){
      let appstate = Storage.get("appstate");
      otroPlayer = Storage.get(`player${appstate.cantPlayers}`);
      hayOtroPlayer = true;
    }

    colores.map(({ color, elegido }, index) => {
      let li = document.createElement('li');
      let elegidoPorOtroPlayer = hayOtroPlayer && color === otroPlayer.color;
      
      let clases = ['circulo'];
      
      if(elegidoPorOtroPlayer){ clases.push('cruz'); }

      li.classList.add(...clases);
      li.style.backgroundColor = color;
      li.id = index;
      if(!elegidoPorOtroPlayer){ li.onclick = () => selectColor(color, index); }
      return listaColores.appendChild(li);
    }
    ).join('');

}