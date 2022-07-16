let game = {
    turn: 0,
    moves: 0, //aumenta con cada par levantado de cartas
    time: 0,
    difficulty: 1, // puede cambiar desde que comienza
    tablero: [],
    cardsSelected: [],
    paresAresolver: 0,
    puntos: [ 0, 0 ],
    ganador: 0,
    resetCard: () => { game.cardsSelected = []; blockCards(false) }
}

const svgs = [
    `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 250 113.7" style="enable-background:new 0 0 250 113.7;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F5BD33;}
</style>
<g transform="matrix(0.4166666666666667,0,0,0.4166666666666667,0,0)">
	<path class="st0" d="M0,215.9v50c40.7-0.8,73.4-34.1,73.4-75V91.7c0-23.6,15.2-34.8,25-34.8c9.8,0,25,11.2,25,34.8v89.4
		c0,42.4,29.5,84.8,75,84.8c45.4,0,75-42.4,75-84.8V91.7c0-23.6,15.2-34.8,25-34.8c9.8,0,25,11.2,25,34.8v89.4
		c0,42.4,29.5,84.8,75,84.8c45.4,0,75-42.4,75-84.8V91.7c0-23.6,15.2-34.8,25-34.8c9.8,0,25,11.2,25,34.8v89.4
		c0,42.4,29.5,84.8,75,84.8c0.7,0,1.3,0,2,0v-50.1c-0.7,0.1-1.3,0.1-2,0.1c-9.8,0-25-11.2-25-34.8V91.7c0-42.4-29.5-84.8-75-84.8
		c-45.4,0-75,42.4-75,84.8v89.4c0,23.6-15.2,34.8-25,34.8c-9.8,0-25-11.2-25-34.8V91.7c0-42.4-29.5-84.8-75-84.8
		c-45.4,0-75,42.4-75,84.8v89.4c0,23.6-15.2,34.8-25,34.8c-9.8,0-25-11.2-25-34.8V91.7c0-42.4-29.5-84.8-75-84.8
		c-45.4,0-75,42.4-75,84.8V191C23.4,204.2,13,215.1,0,215.9z"/>
</g>
</svg>
`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#336BB7" d="M0 300C82.8427 300 150 232.843 150 150H0V300Z"></path><path fill="#336BB7" d="M150 150C150 67.1573 217.157 2.93554e-06 300 6.55671e-06L300 150L150 150Z"></path><path fill="#336BB7" d="M150 150C67.1573 150 1.17422e-05 82.8427 2.62268e-05 0L150 2.62268e-05L150 150Z"></path><path fill="#336BB7" d="M300 300C300 217.157 232.843 150 150 150L150 300L300 300Z"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#F4ADB3" d="M0 126.128L150 5L300 126.128V300H228.746V248.482C228.746 204.992 193.49 169.736 150 169.736C106.51 169.736 71.2537 204.992 71.2537 248.482V300H0V126.128Z"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><circle cx="150" cy="35" r="35" fill="#E55733"></circle><circle cx="231.317" cy="231.317" r="13" fill="#E55733" transform="rotate(135 231.317 231.317)"></circle><circle cx="150" cy="265" r="35" fill="#E55733"></circle><circle cx="265" cy="150" r="35" fill="#E55733" transform="rotate(90 265 150)"></circle><circle cx="35" cy="150" r="35" fill="#E55733" transform="rotate(90 35 150)"></circle><circle cx="68.683" cy="68.683" r="13" fill="#E55733" transform="rotate(135 68.683 68.683)"></circle><circle r="13" fill="#E55733" transform="scale(1 -1) rotate(-45 -244.883 -198.566)"></circle><circle r="13" fill="#E55733" transform="scale(1 -1) rotate(-45 32.751 -313.566)"></circle><path fill="#E55733" fill-rule="evenodd" d="M213.009 30.041C217.898 32.6092 219.78 38.6547 217.212 43.5441L207.446 62.1356C204.878 67.025 198.833 68.9067 193.943 66.3385C189.054 63.7704 187.172 57.7248 189.74 52.8354L199.506 34.244C202.074 29.3545 208.119 27.4728 213.009 30.041Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M106.057 233.661C110.946 236.23 112.828 242.275 110.26 247.165L100.494 265.756C97.9263 270.645 91.8807 272.527 86.9913 269.959C82.1019 267.391 80.2202 261.345 82.7883 256.456L92.5535 237.864C95.1217 232.975 101.167 231.093 106.057 233.661Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M86.9913 30.041C82.1019 32.6092 80.2202 38.6547 82.7883 43.5441L92.5535 62.1356C95.1217 67.025 101.167 68.9067 106.057 66.3385C110.946 63.7704 112.828 57.7248 110.26 52.8354L100.494 34.244C97.9263 29.3545 91.8807 27.4728 86.9913 30.041Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M193.943 233.661C189.054 236.23 187.172 242.275 189.74 247.165L199.506 265.756C202.074 270.645 208.119 272.527 213.009 269.959C217.898 267.391 219.78 261.345 217.212 256.456L207.446 237.864C204.878 232.975 198.833 231.093 193.943 233.661Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M66.0275 106.654C63.4942 111.562 57.4622 113.486 52.5546 110.953L33.894 101.321C28.9865 98.7876 27.0617 92.7556 29.5949 87.848C32.1282 82.9404 38.1602 81.0156 43.0678 83.5489L61.7283 93.1813C66.6359 95.7145 68.5607 101.747 66.0275 106.654Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M269.507 86.1379C266.904 81.2669 260.845 79.4283 255.974 82.0313L237.453 91.9287C232.582 94.5317 230.743 100.59 233.346 105.461C235.949 110.332 242.008 112.171 246.879 109.568L265.4 99.6706C270.271 97.0677 272.11 91.0089 269.507 86.1379Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M66.0275 193.346C63.4942 188.438 57.4622 186.513 52.5546 189.047L33.894 198.679C28.9865 201.212 27.0617 207.244 29.5949 212.152C32.1282 217.059 38.1602 218.984 43.0678 216.451L61.7283 206.819C66.6359 204.285 68.5607 198.253 66.0275 193.346Z" clip-rule="evenodd"></path><path fill="#E55733" fill-rule="evenodd" d="M269.507 213.862C266.904 218.733 260.845 220.572 255.974 217.969L237.453 208.071C232.582 205.468 230.743 199.409 233.346 194.538C235.949 189.667 242.008 187.829 246.879 190.432L265.4 200.329C270.271 202.932 272.11 208.991 269.507 213.862Z" clip-rule="evenodd"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#F5BD33" d="M98.0384 180L49.2692 264.471L101.231 294.471L150 210L198.769 294.471L250.731 264.471L201.962 180H299.5V120H201.961L250.731 35.5293L198.769 5.5293L150 90.0001L101.231 5.5293L49.2692 35.5293L98.0385 120H0.5V180H98.0384Z"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#E55733" d="M30 150C96.5503 150 150.5 82.8427 150.5 0C150.5 82.8427 204.45 150 271 150C204.45 150 150.5 217.157 150.5 300C150.5 217.157 96.5503 150 30 150Z"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#43A363" fill-rule="evenodd" d="M150 40C89.2487 40 40 89.2487 40 150C40 210.751 89.2487 260 150 260C210.751 260 260 210.751 260 150C260 89.2487 210.751 40 150 40ZM0 150C0 67.1573 67.1573 0 150 0C232.843 0 300 67.1573 300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150Z" clip-rule="evenodd"></path><path fill="#43A363" fill-rule="evenodd" d="M150 110C127.909 110 110 127.909 110 150C110 172.091 127.909 190 150 190C172.091 190 190 172.091 190 150C190 127.909 172.091 110 150 110ZM70 150C70 105.817 105.817 70 150 70C194.183 70 230 105.817 230 150C230 194.183 194.183 230 150 230C105.817 230 70 194.183 70 150Z" clip-rule="evenodd"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#2F2965" fill-rule="evenodd" d="M135.783 0H235.561L170.934 85.5281H292L77.4282 299.309L142.861 155.156H22.5L135.783 0Z" clip-rule="evenodd"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#E55733" d="M108.303 39.3099C149.389 80.35 149.74 149.529 149.74 149.529C149.74 149.529 83.4779 152.168 42.3922 111.128C1.30654 70.0878 0.95532 0.909076 0.95532 0.909076C0.95532 0.909076 67.2172 -1.73033 108.303 39.3099Z"></path><path fill="#E55733" d="M191.177 39.3099C150.091 80.35 149.74 149.529 149.74 149.529C149.74 149.529 216.002 152.168 257.087 111.128C298.173 70.0878 298.524 0.909076 298.524 0.909076C298.524 0.909076 232.262 -1.73033 191.177 39.3099Z"></path><path fill="#E55733" d="M108.303 259.69C149.389 218.65 149.74 149.471 149.74 149.471C149.74 149.471 83.4779 146.832 42.3922 187.872C1.30654 228.912 0.95532 298.091 0.95532 298.091C0.95532 298.091 67.2172 300.73 108.303 259.69Z"></path><path fill="#E55733" d="M191.177 259.69C150.091 218.65 149.74 149.471 149.74 149.471C149.74 149.471 216.002 146.832 257.087 187.872C298.173 228.912 298.524 298.091 298.524 298.091C298.524 298.091 232.262 300.73 191.177 259.69Z"></path></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><g transform="matrix(0.8333333333333334,0,0,0.8333333333333334,0,0)"><path fill="#E55733" d="M207.123 57.5409L150 2.78174L92.8774 57.5409L0 110.422L43.5004 194.937L57.0352 283.786L150 273.619L242.965 283.786L256.5 194.937L300 110.422L207.123 57.5409Z"></path></g></svg>`
]

const shuffleArray = (array) => {
    let counter = array.length
    while (counter > 0) {
        let rnd = Math.floor(Math.random() * counter)
        counter--
        let tmp = array[counter]
        array[counter] = array[rnd]
        array[rnd] = tmp
    }
    return array
}

const mostrarAviso = () => {
    const aviso = document.getElementById('aviso')
    const sombra = document.getElementById('sombra')
    sombra.style.display = 'block'
    aviso.style.display = 'flex'
}

const start = () => {
    const aviso = document.getElementById('aviso')
    const info = document.getElementById('info')
    const sombra = document.getElementById('sombra')

    const nav = document.querySelector('nav')

    aviso.style.display = nav.style.display = info.style.display = sombra.style.display = 'none'

    cargaHtml()
}

const load = (num) => {

    game.difficulty = num

    let arrayCards = ''

    if (game.difficulty === 1) { arrayCards = [...Array(4).keys()]; game.paresAresolver = 4 }

    if (game.difficulty === 2) { arrayCards = [...Array(6).keys()]; game.paresAresolver = 6 }

    if (game.difficulty === 3) { arrayCards = [...Array(10).keys()]; game.paresAresolver = 10 }

    arrayCards = [...arrayCards, ...arrayCards];

    game.tablero = arrayCards.map((item, index) => ({ id: index, item: item, icono: svgs[item] }))

    mostrarAviso()
}

const startClock = () => {
    let mins = document.getElementById("mins");
    let secs = document.getElementById("secs");
    let secsTotales = 0;

    pad = (val) => {
        let valString = val + ""
        return valString.length < 2 ? "0" + valString : valString
    }

    setTime = () => {
        ++secsTotales;
        secs.innerHTML = pad(secsTotales % 60);
        mins.innerHTML = pad(parseInt(secsTotales / 60));
    }

    setInterval(setTime, 1000);
}

const checkCard = (obj) => {

    //si selecciona la misma carta, le quito las clases
    //la reseteo
    // y termino esta funcion
    //aca deberia cambiar turno

    if (game.cardsSelected.length > 0 && obj.id === game.cardsSelected[0].id) {
        return;
    }
    //guardo carta seleccionada
    game.cardsSelected.push(obj)

    //la muestro, agregando clases que dan vueltan las cards
    document.getElementById(obj.id).firstChild.classList.add('mostrar')
    document.getElementById(obj.id).lastChild.classList.add('ocultar')

    if (game.cardsSelected.length === 2) {
        //si hay dos cartas seleccionadas

        blockCards(true);
        //luego de unos segundos pregunto si son iguales 
        setTimeout(() => {

            if (game.cardsSelected[0].item === game.cardsSelected[1].item) {
                //resto
                game.paresAresolver--

                sumPoints(game.turn)

                game.cardsSelected.map(obj => {

                    let first = document.getElementById(obj.id).firstChild //svg - dibujo carta
                    let second = document.getElementById(obj.id).lastChild //span - lomo carta

                    first.style.opacity = '0'
                    second.style.opacity = '0'

                    setTimeout(() => {
                        document.getElementById(obj.id).removeChild(first)
                        document.getElementById(obj.id).removeChild(second)
                        document.getElementById(obj.id).onclick = null
                    }, 1000)
                })
                checkGameOver()
                game.resetCard()

            } else {

                game.cardsSelected.map(obj => {

                    setTimeout(() => {
                        document.getElementById(obj.id).firstChild.classList.remove('mostrar')
                        document.getElementById(obj.id).lastChild.classList.remove('ocultar')
                        game.resetCard()
                    }, 1500)

                })

                cambioTurno()
            }

        }, 1000);

    }

    //FALTARIA 

    //reveer el tema del timer
    //reemplazar por puntos?

}

const cargaHtml = () => {

    const hud = document.getElementById('hud')
    const tarjetas = document.getElementById('tarjetas')
    const tablero = document.getElementById('tablero')

    tarjetas.innerHTML = '';

    hud.style.display = tablero.style.display = 'flex';

    if (game.difficulty === 1) { tarjetas.classList.add('dos-columnas') }
    if (game.difficulty === 2) { tarjetas.classList.add('tres-columnas') }
    if (game.difficulty === 3) { tarjetas.classList.add('cuatro-columnas') }

    shuffleArray(game.tablero).map(
        ({ id, item, icono }) => {
            let li = document.createElement('li')
            li.classList.add('tarjeta')
            li.id = id
            li.setAttribute('data-item', item)
            li.onclick = () => checkCard({ id, item, icono })
            li.innerHTML = icono
            let span = document.createElement('span')
            let texto = document.createTextNode('?')
            span.appendChild(texto)
            li.appendChild(span)
            return tarjetas.appendChild(li)
        }
    ).join('')

    let turnoDe = document.getElementById('turnoDe');

    const player1 = Storage.get("player1")
    const player2 = Storage.get("player2")

    turnoDe.innerHTML = game.turn === 0 ? player1.name : player2.name

    startClock();
}

const blockCards = (block) => {

    if (block) {
        document.querySelectorAll('[class="tarjeta"]').forEach(item => {
            item.classList.add('disabled')
        })
    } else {
        document.querySelectorAll('[class="tarjeta disabled"]').forEach(item => {
            item.classList.remove('disabled')
        })
    }

}

const showReturnHome = () => {

    //mostrar modal de finalizar juego
    const exitGame = document.getElementById('exitGame')
    const cancelExit = document.getElementById('cancelExit')
    const returnHome = document.getElementById('returnHome')
    const sombra = document.getElementById('sombra')

    sombra.style.display = 'block'
    exitGame.style.display = 'flex'

    cancelExit.onclick = () => { exitGame.style.display = sombra.style.display = 'none' }
    returnHome.onclick = () => { window.location.href = '../index.html' }

}

const checkGanador = () => {

    const player1 = Storage.get("player1")
    const player2 = Storage.get("player2")

    game.ganador = game.puntos[0] > game.puntos[1] ? player1.name : player2.name
    game.ganador = game.puntos[0] === game.puntos[1] ? 'Empate' : game.ganador

}

const checkGameOver = () => {

    if (game.paresAresolver === 0) {

        const modalGanador = document.getElementById('ganador')
        const hud = document.getElementById('hud')
        const tablero = document.getElementById('tablero')
        const restartGame = document.getElementById('restartGame')
        const nombreJugador = document.getElementById('nombreJugador')

        checkGanador()

        setTimeout(() => {

            hud.style.display = tablero.style.display = 'none'
            modalGanador.style.display = 'block'

            nombreJugador.innerHTML = game.ganador

            restartGame.onclick = restart
            clearInterval(setTime)

        }, 500)

    }
}

const restart = () => {

    const aviso = document.getElementById('aviso')
    const info = document.getElementById('info')
    const modalGanador = document.getElementById('ganador')
    const nav = document.querySelector('nav')

    aviso.style.display = nav.style.display = info.style.display = modalGanador.style.display = 'none'
    info.style.display = nav.style.display = 'block'

}

const cambioTurno = () => {

    game.turn = game.turn === 0 ? 1 : 0

    console.log('game turn', game.turn);

    const turnoDe = document.getElementById('turnoDe')
    const thePlayer = Storage.get(game.turn === 0 ? "player1" : "player2")
    turnoDe.innerHTML = thePlayer.name

}

const sumPoints = (player) => {

    game.puntos[player] += 10

    let thePlayer = Storage.get(player === 0 ? "player1" : "player2")
    let actualPoints = parseInt(thePlayer.memotestPoints)
    thePlayer.memotestPoints = actualPoints + 10
    thePlayer.totalPoints = thePlayer.generalaPoints + thePlayer.tatetiPoints + thePlayer.memotestPoints
    Storage.put(player == 0 ? "player1" : "player2", thePlayer)

}