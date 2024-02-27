include('Commands.js');
include('handleInputs.js');


function onLoad(){
    print('ptboom.js cargado...!');
    print('Reglas: ');
    print('1. El juego consiste en decir un verbo o adjetivo que incluya la silaba que se le propociona.');
    print('2. El jugador que no pueda decir una palabra que este en el diccionario español, pierde 1 vida.');
    print('3. El jugador que pierda todas sus vidas, pierde el juego.');
}


function onHelp(userobj){
    print(userobj,'X--------- Comandos PartyBoom2 ------ X');
    print(userobj,"");
    print(userobj,'#newGame ----------> Crea una nueva Instancia de juego.');
    print(userobj,'#joinGame +id -----> Para unirse a una Instancia de juego.');
    print(userobj,'#leaveGame +id ----> Para salir de la Instancia de juego.');
    print(userobj,"#startGame --------> Iniciar el juego.");
    print(userobj,"#stopGame  --------> Detener el juego.");
    print(userobj,"");
    print(userobj,"X-------- Comandos PartyBoom2 -------X");

}