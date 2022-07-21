let game = {
    turno: "X",
    winner: 0,
    moves: 0,
    tablero: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    player1: Storage.get('player1'),
    player2: Storage.get('player2'),
};

const xSvg = `<?xml version="1.0" encoding="UTF-8"?> <svg style="fill:${game.player1.color}" enable-background="new 0 0 92 92"  version="1.1" viewBox="0 0 92 92" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"> <g transform="translate(.003 -.018)"> <g transform="translate(.01)"> <rect transform="matrix(.7071 -.7071 .7071 .7071 -19.071 46.001)" x="-3.1" y="31.1" width="98.2" height="29.8"/> </g> <g transform="translate(0 .019)"> <rect transform="matrix(.7071 -.7071 .7071 .7071 -19.054 45.996)" x="31.1" y="-3.1" width="29.8" height="98.2"/> </g> </g> </svg>`;
const oSvg = `<?xml version="1.0" encoding="UTF-8"?> <svg style="fill:${game.player2.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.73 90.73"><path d="M46,.63A45.37,45.37,0,1,0,91.37,46,45.37,45.37,0,0,0,46,.63ZM67,46A21,21,0,1,1,46,25h0A21,21,0,0,1,67,46Z" transform="translate(-0.63 -0.63)"/></svg>`;

const rellenoData = () => {

    document.getElementById("info").innerHTML = `le toca a: ${game.turno === 'X' ? xSvg : oSvg}`;

    for (let r = 0; r < game.tablero.length; r++) {
        const row = document.querySelector("table tr:nth-of-type(" + (r + 1) + ")");
        for (let c = 0; c < game.tablero[r].length; c++) {
            if (game.tablero[r][c] != 0) {

                row.querySelector("td:nth-of-type(" + (c + 1) + ")").innerHTML = (game.tablero[r][c] === 'X') ? xSvg : oSvg;

            } else {
                row.querySelector("td:nth-of-type(" + (c + 1) + ")").innerHTML = " ";
            }
        }
    }
}

const reset = () => {

    game = {
        turno: game.turno === "X" ? "O" : "X",
        winner: 0,
        moves: 0,
        tablero: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        player1: Storage.get('player1'),
        player2: Storage.get('player2'),
    };

    rellenoData();

    let todasLasPosiciones = document.querySelectorAll('tr td');
    todasLasPosiciones.forEach(celda => { celda.innerHTML = ''; })

}

const play = (r, c) => {
    if (game.tablero[r][c] === 0) {
        game.tablero[r][c] = game.turno;
        game.moves++;

        if (checkGanador() || game.moves === 9) {
            gameOver();
        } else {
            game.turno = game.turno === "X" ? "O" : "X";
            rellenoData();
        }

    }
}

const checkGanador = () => {
    return checkFila() || checkCol() || checkDiag();
}

const checkFila = () => {
    if (
        (game.tablero[0][0] === game.turno && game.tablero[0][1] === game.turno && game.tablero[0][2] === game.turno) ||
        (game.tablero[1][0] === game.turno && game.tablero[1][1] === game.turno && game.tablero[1][2] === game.turno) ||
        (game.tablero[2][0] === game.turno && game.tablero[2][1] === game.turno && game.tablero[2][2] === game.turno)) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

const checkCol = () => {
    if (
        (game.tablero[0][0] === game.turno && game.tablero[1][0] === game.turno && game.tablero[2][0] === game.turno) ||
        (game.tablero[0][1] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][1] === game.turno) ||
        (game.tablero[0][2] === game.turno && game.tablero[1][2] === game.turno && game.tablero[2][2] === game.turno)) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

const checkDiag = () => {
    if (
        (game.tablero[0][0] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][2] === game.turno) ||
        (game.tablero[0][2] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][0] === game.turno)) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

const restart = () => {

    const info = document.getElementById('info');
    const modalGanador = document.getElementById('ganador');
    const table = document.querySelector('table');

    modalGanador.classList.remove('mostrarGanador');
    document.body.classList.remove('fix');
    info.style.display = 'flex';
    table.style.display = 'block';

    reset();
}

const gameOver = () => {

    rellenoData();

    const modalGanador = document.getElementById('ganador');
    const restartGame = document.getElementById('restartGame');
    const nombreJugador = document.getElementById('nombreJugador');
    const cardImage = document.getElementById('cardImage');
    const info = document.getElementById('info')

    let thePlayer = game.moves === 9 ? 'Empate' : game.winner == "X" ? game.player1 : game.player2;
    
    const table = document.querySelector('table');
    table.classList.add('disabled');

    sumPoints(game.winner);

    setTimeout(() => {
        table.style.display = info.style.display = 'none';
        modalGanador.classList.add('mostrarGanador');
        table.classList.remove('disabled');
        
        if(thePlayer === 'Empate'){
            nombreJugador.innerHTML = 'Empate';
            cardImage.style.display = 'none';
        }else{
            nombreJugador.innerHTML = thePlayer.name;
            cardImage.setAttribute("src", thePlayer.img);
            cardImage.style.border = `6px solid ${thePlayer.color}`;
        }
        
        restartGame.onclick = restart;

    }, 500);

};

const sumPoints = (player) => {
    let thePlayer = Storage.get(player == "X" ? "player1" : "player2");

    let actualPoints = parseInt(thePlayer.tatetiPoints);
    thePlayer.tatetiPoints = actualPoints + 10;
    thePlayer.totalPoints = thePlayer.generalaPoints + thePlayer.tatetiPoints + thePlayer.memotestPoints;
    Storage.put(player == "X" ? "player1" : "player2", thePlayer);
}

const start = () => {
    let intro = document.getElementById('intro');
    let table = document.querySelector('table');
    let info = document.getElementById('info');

    document.getElementById("info").innerHTML = `le toca a: ${game.turno === 'X' ? xSvg : oSvg}`;

    info.style.display = 'flex'
    intro.style.display = 'none';
    table.style.display = 'block';
}

const showReturnHome = () => {
    const exitGame = document.getElementById('exitGame');
    const cancelExit = document.getElementById('cancelExit');
    const returnHome = document.getElementById('returnHome');
    const sombra = document.getElementById('sombra');

    sombra.style.display = 'block';
    exitGame.style.display = 'flex';
    document.body.classList.add('fix');

    cancelExit.onclick = () => { exitGame.style.display = sombra.style.display = 'none'; document.body.classList.remove('fix'); }
    returnHome.onclick = () => { window.location.href = '../index.html'; }
}