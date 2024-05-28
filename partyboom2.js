include('Commands.js');
include('handleInputs.js');


function onLoad(){
    print('\x0301ptboom.js cargado...!');
    print('\x0301Reglas: ');
    print('\x03041. \x0301El juego consiste en decir un verbo o adjetivo que incluya la silaba que se le propociona.');
    print('\x03042. \x0301El jugador que no pueda decir una palabra que este en el diccionario español, pierde 1 vida.');
    print('\x03043. \x0301El jugador que pierda todas sus vidas, pierde el juego.');
}


function onHelp(userobj){
    print(userobj,'\x0304\x06[X--------- Comandos PartyBoom2 ------ X]');
    print(userobj,"");
    print(userobj,'\x0304#newGame ----------> \x0301\x06Crea una nueva Instancia de juego.');
    print(userobj,'\x0304#joinGame +id -----> \x0301\x06Para unirse a una Instancia de juego.');
    print(userobj,'\x0304#leaveGame     ----> \x0301\x06Para salir de la Instancia de juego.');
    print(userobj,"\x0304#startGame --------> \x0301\x06Iniciar el juego.");
    print(userobj,"\x0304#stopGame  --------> \x0301\x06Detener el juego.");
    print(userobj,"\x0304#closeGame  --------> \x0301\x06Cierra la instancia.")
    print(userobj,"");
    print(userobj,'\x0304\x06[X--------- Comandos PartyBoom2 ------ X]');
}
