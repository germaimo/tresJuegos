let game = {
    dados: [0, 0, 0, 0, 0],
    dadoSize: 50,
    seleccion: [false, false, false, false, false],
    tirosRestantes: 3,
    turno: 0,
    cantJugadores: 2,
    esServido: true,
    puntos: [
        ["1", -1, -1],
        ["2", -1, -1],
        ["3", -1, -1],
        ["4", -1, -1],
        ["5", -1, -1],
        ["6", -1, -1],
        ["Escalera", -1, -1],
        ["Full", -1, -1],
        ["Póker", -1, -1],
        ["Generala", -1, -1],
        ["Doble Generala", -1, -1],
        ["Total", -1, -1]
    ],
    player1: Storage.get('player1'),
    player2: Storage.get('player2')
};
const movimientos = 11;
let gameOver = game.cantJugadores * movimientos;

const rgxPoker = /1{1}2{4}|1{1}3{4}|1{1}4{4}|1{1}5{4}|1{1}6{4}|1{4}[23456]|2{1}3{4}|2{1}4{4}|2{1}5{4}|2{1}6{4}|2{4}[3456]|3{1}4{4}|3{1}5{4}|3{1}6{4}|3{4}[456]|4{1}5{4}|4{1}6{4}|4{4}[56]|5{1}6{4}|5{4}[6]/;
const rgxEscalera = /12345|23456|13456/; 
const rgxFull = /1{3}(22|33|44|55|66)|2{3}(33|44|55|66)|3{3}(44|55|66)|4{3}(55|66)|5{3}(66)|1{2}(222|333|444|555|666)|2{2}(333|444|555|666)|3{2}(444|555|666)|4{2}(555|666)|5{2}(666)/;
const rgxGenerala = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/;

const dibujarTablero = () => {
    const cont = document.querySelector("table tbody");
    cont.innerHTML = null;

    const tr1 = document.createElement("tr");

    let tdJu = document.createElement("td");
    tdJu.innerHTML = "";

    tr1.appendChild(tdJu);

    for (let k = 0; k < game.cantJugadores; k++) {
        tdJu = document.createElement("td");

        tdJu.innerHTML =  k === 0 ? game.player1.name : game.player2.name;

        if (game.turno === k) {
            if (k === 0){
                tdJu.style.backgroundColor = game.player1.color ;
            } else {
                tdJu.style.backgroundColor = game.player2.color ;
            }
        } 
        tr1.appendChild(tdJu);
    }

    cont.appendChild(tr1);
    
    for (let i = 0; i < game.puntos.length; i++) {
        const celdas = [];
        const tr = document.createElement("tr");

        const tdJuego = document.createElement("td");
        tdJuego.appendChild(document.createTextNode(game.puntos[i][0]));
        tdJuego.onclick = () => anotar(i, false);
        celdas.push(tdJuego);

        for (let j = 1; j <= game.cantJugadores; j++) {
            const tdJugador = document.createElement("td");
            if (game.puntos[i][j] > -1) {
                
                tdJugador.appendChild(document.createTextNode(game.puntos[i][j]));
                if (i < (game.puntos.length - 1)) {
                    (j === 1) ? tdJugador.style.backgroundColor = game.player1.color  : tdJugador.style.backgroundColor = game.player2.color ;
                }
            }
            else {
                tdJugador.onclick = () => anotar(i, false);
            }
            celdas.push(tdJugador);
        }

        celdas.forEach(celda => tr.appendChild(celda));
            
        cont.appendChild(tr);
    }
};

const quienGano = () => {
    const totales = game.puntos[11];
    let pos = 1;
    let puntaje = totales[1];
    let esEmpate = true;

    for (let i = 1; i < totales.length; i++) {
        if( totales[i] > puntaje ){
           pos = i;
           puntaje = totales[i];
           esEmpate = false;
        }
    }

    return esEmpate ? -1 : pos;

    // const puntajeFinal = [];
    // for (let i = 1; i < totales.length; i++) {
    //     puntajeFinal.push({jugador: i, puntos: totales[i]});
    // }
    // puntajeFinal.sort((a, b) => b.puntos - a.puntos);
    
    // if (puntajeFinal[0].puntos > puntajeFinal[1].puntos) {
    //     return puntajeFinal[0].jugador;
    // } else {
    //     return -1;
    // }
};

const tirarDado = () => Math.floor(Math.random() * (6 - 1 + 1)) + 1;

const mostrarDado = (i, numero) => {
    let dado = document.createElement("canvas");
    dado.setAttribute("data-pos", "" + i);
    dado.setAttribute("width", "" + game.dadoSize);
    dado.setAttribute("height", "" + game.dadoSize);
    dado.style.borderRadius = (game.dadoSize / 100) + "em";
    dado.style.margin = (game.dadoSize / 200) + "em";
    dibujarDado(dado, numero);
    if (game.tirosRestantes <= 2) { dado.onclick = () => { seleccionar(dado); } }
    return dado;
};

const seleccionar = (dado) => {
    const pos = parseInt(dado.getAttribute("data-pos"));
    game.seleccion[pos] = !game.seleccion[pos];
    if(game.seleccion[pos]) {
        dado.classList.add("seleccionado");
    } else {
        dado.classList.remove("seleccionado")
    }
}

const mostrarDados = () => {
    const cont = document.getElementById("dados");
    cont.innerHTML = null;

    for (let i = 0; i < 5; i++) {
        cont.appendChild(mostrarDado(i, game.dados[i]));
    }

    document.querySelector("#turno p span").innerHTML = game.turno + 1;
    document.querySelector("#tiros p span").innerHTML = game.tirosRestantes;
};

const tirarDados = () => {
    if(game.tirosRestantes === 3) {
        game.tirosRestantes--;
        
        for (let i = 0; i < 5; i++) {
            game.dados[i] = tirarDado();
        } 
    } else {
        game.tirosRestantes--;
        
        for (let i = 0; i < 5; i++) {
            if(game.seleccion[i]){
                game.dados[i] = tirarDado();
            }
        }
        
        game.esServido = true;
        for (let i = 0; i < game.seleccion.length; i++) {
            game.esServido &= game.seleccion[i] === true;
        }

        game.seleccion = [false, false, false, false, false];

        if (game.tirosRestantes === 0) {
            const button = document.getElementById("boton");
            button.disabled = true;
        }
    }
    mostrarDados();
};

const confirm = (i) => {
    let content = `<div id='confirm'>
                        <div>
                            <p class="accion">Tachar</p>
                            <div> 
                                <p class="pregunta">¿Desea tachar el juego ${game.puntos[i][0]}?</p>
                            </div>
                            <div class="botones">
                                <button class="si" onclick='continuar("${i}");'>Si</button>
                                <button class="no" onclick='cancelar();'>No</button>
                            </div>
                        </div>
                    </div>`;

    document.querySelector("body").innerHTML += content;
}

const continuar = (i) => {
    document.getElementById("confirm").remove();
    anotar(parseInt(i), true);
}

const cancelar = () => {
    document.getElementById("confirm").remove();
    mostrarDados();
    dibujarTablero();
}

const anotar = (i, confirmado) => {
    
    if (game.puntos[i][game.turno + 1] === -1 && game.tirosRestantes < 3) {
        const puntaje = calcularPuntos(i);
        
        if (puntaje === 0 && !confirmado) {
            confirm(i);
        } else {

            game.puntos[i][game.turno + 1] = puntaje;
            if (game.puntos[11][game.turno + 1] === -1) {
                game.puntos[11][game.turno + 1] = puntaje;
            } else {
                game.puntos[11][game.turno + 1] += puntaje;
            }

            if (game.tirosRestantes !== 3) {
                if(game.turno === 0){
                    game.turno = 1;
                } else {
                    game.turno = 0;
                }

                dibujarTablero();
                resetearTurno();

                gameOver--;

                if (gameOver === 0) {
                    setTimeout(() => {
                        let cont = document.getElementById("gameOver");
                        let winner = document.getElementById("ganador");
                        let ganador = quienGano();

                        if (ganador != -1) {
                            winner.innerHTML = `Ganó ${ganador === 1 ? game.player1.name : game.player2.name}`;
                        } else {
                            winner.innerHTML = "Empate";
                        }

                        sumPoints(ganador);

                        cont.style.display = "block";
                    }, 500);
                } else {
                    mostrarDados();
                }
            }
        }
    }
};

const resetearTurno = () => {
    const button = document.getElementById("boton");
    game.dados = [0, 0, 0, 0, 0];
    game.tirosRestantes = 3;
    game.seleccion = [false, false, false, false, false];
    button.disabled = false;
}

const dibujarCirculo = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(game.dadoSize * x / 100, game.dadoSize * y / 100, game.dadoSize * 0.10, 0, Math.PI*2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

const dibujarDado = (canvas, numero) => {
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, game.dadoSize, game.dadoSize);
    ctx.beginPath();
    ctx.rect(0 ,0 , game.dadoSize, game.dadoSize);
    ctx.fillStyle = game.turno === 0 ? game.player1.color : game.player2.color;
    ctx.fill();
    ctx.closePath();

    switch (numero) {
        case 1:
            dibujarCirculo(ctx, 50, 50);
            break;

        case 2:
            dibujarCirculo(ctx, 75, 25);
            dibujarCirculo(ctx, 25, 75);
            break;

        case 3:
            dibujarCirculo(ctx, 75, 25);
            dibujarCirculo(ctx, 50, 50);
            dibujarCirculo(ctx, 25, 75);
            break;

        case 4:
            dibujarCirculo(ctx, 25, 25);
            dibujarCirculo(ctx, 75, 25);
            dibujarCirculo(ctx, 25, 75);
            dibujarCirculo(ctx, 75, 75);
            break;

        case 5:
            dibujarCirculo(ctx, 25, 25);
            dibujarCirculo(ctx, 25, 75);
            dibujarCirculo(ctx, 50, 50);
            dibujarCirculo(ctx, 75, 25);
            dibujarCirculo(ctx, 75, 75);
            break;

        case 6:
            dibujarCirculo(ctx, 25, 25);
            dibujarCirculo(ctx, 25, 50);
            dibujarCirculo(ctx, 25, 75);
            dibujarCirculo(ctx, 75, 25);
            dibujarCirculo(ctx, 75, 50);
            dibujarCirculo(ctx, 75, 75);
            break;
    }
};

const puntaje = (num) => {
    var resultado = 0;
    for (let i = 0; i < game.dados.length; i++) {
        if (game.dados[i] === num + 1) {
            resultado += (num + 1);
        }
    }
    return resultado;
};

const esGenerala = () => {
    let dadosOrdenados = game.dados.sort((a, b) => a - b);
    dadosOrdenados = dadosOrdenados.join('');

    return rgxGenerala.test( dadosOrdenados );
} 

const esPoker = () => {
    let dadosOrdenados = game.dados.sort((a, b) => a - b);
    dadosOrdenados = dadosOrdenados.join('');

    return rgxPoker.test( dadosOrdenados );
} 

const esFull = () =>{
   let dadosOrdenados = game.dados.sort((a, b) => a - b);
   dadosOrdenados = dadosOrdenados.join('');

   return rgxFull.test( dadosOrdenados );   
} 

const esEscalera = () => { 
    let dadosOrdenados = game.dados.sort((a, b) => a - b);
    dadosOrdenados = dadosOrdenados.join('');

    return rgxEscalera.test( dadosOrdenados );
} 

const calcularPuntos = pos => {
    let puntos = 0;

    switch (pos) {
        case 6:
            if (esEscalera()) {
                puntos = 20;
            }
            break;
            
        case 7:
            if (esFull()) {
                puntos = 30;
            }
            break;
            
        case 8: 
            if (esPoker()) {

                puntos = 40;
            }
            break;
            
        case 9:
            if (esGenerala()) {
                puntos = 50;
            }
            break;

        case 10:
            if (esGenerala()) {
                puntos = 100;
            }
            // if (esGenerala() && game.puntos[9][game.turno+1] !== -1 ) {
            //     puntos = 100;
            // }
            break;
        
        default:
            puntos = puntaje(pos);
    }

    if (game.esServido && pos >= 6 && puntos > 0) {
        puntos += 5;
    }
    return puntos;
};

const reset = () => {
    game = {
        dados: [0, 0, 0, 0, 0],
        dadoSize: 100,
        seleccion: [false, false, false, false, false],
        tirosRestantes: 3,
        turno: 0,
        cantJugadores: 2,
        esServido: true,
        puntos: [
            ["1", -1, -1],
            ["2", -1, -1],
            ["3", -1, -1],
            ["4", -1, -1],
            ["5", -1, -1],
            ["6", -1, -1],
            ["Escalera", -1, -1],
            ["Full", -1, -1],
            ["Póker", -1, -1],
            ["Generala", -1, -1],
            ["Doble Generala", -1, -1],
            ["Total", -1, -1]
        ],
        player1: Storage.get('player1'),
        player2: Storage.get('player2')
    };

    gameOver = game.cantJugadores * movimientos;

    dibujarTablero();
    mostrarDados();

    document.getElementById("gameOver").style.display = "none";
    document.getElementById("container").style.opacity = "100%";
}

const sumPoints = (player) => {

  let thePlayer = Storage.get(player == 1 ? "player1" : "player2");

  let actualPoints = parseInt(thePlayer.generalaPoints);
  thePlayer.generalaPoints = actualPoints + 10;
  thePlayer.totalPoints = thePlayer.generalaPoints + thePlayer.tatetiPoints;
  Storage.put(player == 1 ? "player1" : "player2", thePlayer);
}

const goBack = () =>{
    window.location.href = '../index.html';
}

document.addEventListener('deviceready', mostrarDados, false);