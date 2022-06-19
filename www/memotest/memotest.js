let game = {
    turn: false,
    winner: 0,
    moves: 0, //aumenta con cada par levantado de cartas
    time: 0,
    difficulty: 1, // puede cambiar desde que comienza
    tablero: [],
};

const shuffleArray = (array) => {
    let counter = array.length;
    while (counter > 0) {
        let rnd = Math.floor(Math.random() * counter);
        counter--;
        let tmp = array[counter];
        array[counter] = array[rnd];
        array[rnd] = tmp;
    }
    return array;
}

let itemAcomparar = ''; // lo hago separado por que no quiero acceder al objeto game constantemente

//se elije que jugador quiere empezar o ofrecer aleatorio
//se elije dificultad o aleatorio

//se muestra html con cartas mezcladas

const tablero = document.getElementById('tablero');

const mezcla = shuffleArray(game.tablero);

const cards = [...mezcla].map(({ id, text }) => (`<p> <span id=${id}>${text}</span> <span id=${id}>${text}</span> </p>`)).join('');

tablero.innerHTML = cards;


//crear array donde su largo sea a partir de la dificultad
// si es dififultad 1
// array va a medir 4
// y cada posicion va a tener un texto/icono
// luego clono ese array 
// y lo coloco en el array original
// array original ex
// [ {texto: 'perro'}, {texto: 'gato'} ]
// array clon
// [ {texto: 'perro'}, {texto: 'gato'} ]
// array mergeado
// [ {texto: 'perro'}, {texto: 'gato'}, {texto: 'perro'}, {texto: 'gato'} ]
//mezclo
//coloco en html



//se muestra boton comenzar
    //inicia timer

//se habilitan las posiciones para ser clickeadas

//al clickear sobre una imagen se chequea si hay algun valor seteado en itemAComparar guarda el valor para comparar 
// si hay valor seteado se compara el itemAComparar con el segudo clickeado
    // si esta comparacion es verdadera moves++
    // se remueven estos items clickeados 

