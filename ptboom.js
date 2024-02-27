include('game.js');
include('commands.js');
include('handleInputs.js');
include('diccionary.js');


function onLoad(){
    print('ptboom.js cargado...!');
    print('Reglas: ');
    print('1. El juego consiste en decir un verbo o adjetivo que incluya la silaba que se le propociona.');
    print('2. El jugador que no pueda decir una palabra que este en el diccionario español, pierde 1 vida.');
    print('3. El jugador que pierda todas sus vidas, pierde el juego.');
}
