let game = {
    turn: false,
    winner: 0,
    moves: 0, //aumenta con cada par levantado de cartas
    time: 0,
    difficulty: 1, // puede cambiar desde que comienza
    tablero: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
};

let itemAcomparar = false; // lo hago separado por que no quiero acceder al objeto game constantemente

//se elije que jugador quiere empezar o ofrecer aleatorio
//se elije dificultad o aleatorio

//se muestra html con cartas mezcladas

//se muestra boton comenzar
    //inicia timer

//se habilitan las posiciones para ser clickeadas

//al clickear sobre una imagen se chequea si hay algun valor seteado en itemAComparar guarda el valor para comparar 
// si hay valor seteado se compara el itemAComparar con el segudo clickeado
    // si esta comparacion es verdadera moves++ 
    // se remueven estos items clickeados 
     
