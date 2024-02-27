include('Diccionary.js');


// funcion constructora para manejar los estados.
function GameState(game){
    this.game = game;
    this.state = null;
}

//funcion para ejecutar el estado.
GameState.prototype.tick = function () {
    if (typeof this.state === 'function') {
        this.state(this.game)  // Aseguramos que el contexto sea el objeto 'game'
    }
}

GameState.prototype.transitionTo = function (stateCallback) {
    this.state = stateCallback.bind(this);  
}

GameState.prototype.evaluateInput = function(text,userobj){
    if(this.game.currentPlayer.name === userobj.name){

        var input = text.toLowerCase().trim()
        if(input.includes(this.game.currentSyllable)){
            if(diccionary.hasWord(input)){
                this.correctInput();
            } else {
                this.incorrectInput(1);
            }
        } else {
            this.incorrectInput(0);
        }
    }
}


GameState.prototype.correctInput = function (){

    //funcion cuando el usuario pone una respuesta correcta.
    print('Bien, el siguiente.');
    this.game.timer.stop();
    this.transitionTo(advanceNextPlayer);
    this.tick();
}

GameState.prototype.incorrectInput = function(arg = 0){
    //funcion cuando el usuario pone una respuesta incorrecta.
    return arg 
    ? print('Mal esa palabra no existe en el diccionario' + this.game.currentPlayer.name) 
    : print('Mal la palabra no contiene la silaba: '+this.game.currentSyllable);
}





//creo las funciones de los estados.
function StartingState(game){
    if(game){
        print('El juego comenzara en 5 segundos!');
        //muevo todos los usuarios al vroom.
        game.players.moveAll(game.vroom);
    }
    var GameState = this;

    game.timer.interval = 5000 //5 segundos
    game.timer.oncomplete = function(){
        //obtengo una nueva silaba
        var newSyl = diccionary.getSylabble();
        game.currentSyllable = newSyl;

        //obtengo el primer player. 
        var firstPlayer = game.players.nextPlayer();
        game.currentPlayer = firstPlayer;
        
        
        //mensaje para el primer player
        print("Rapido "+game.currentPlayer.name+" escribe una palabra con la silaba "+game.currentSyllable);

        GameState.transitionTo(ExpectState);
        GameState.tick();
    }
    game.timer.start();
}

    //estado que espera al usuario que responda durante cierto tiempo.
function ExpectState(game){
    game.timer.interval = 1000 * (Math.floor(Math.random() * 8) + 8);
    GameState = this;
    game.timer.oncomplete = function(){
        //logica para reducirle una vida.
        game.currentPlayer.substracLife();
        print(game.currentPlayer.name+' Se te acabo el tiempo. Tienes una vida menos.')
        print(" ")
        print(" ")

        // transicionar al advanceNextPlayer.
        GameState.transitionTo(advanceNextPlayer);
        GameState.tick();
    }

    game.timer.start();
}


function advanceNextPlayer(game){

    var newSyl = diccionary.getSylabble();
        game.currentSyllable = newSyl;

        //obtengo el proximo player. 
    var nextPlayer = game.players.nextPlayer(game.currentPlayer);
    
        if(!nextPlayer){
            this.transitionTo(closeGame)
            return this.tick();
        } 

        game.currentPlayer = nextPlayer;
        
        
        //mensaje para el primer player
    print("Rapido "+game.currentPlayer.name+" escribe una palabra con la silaba "+game.currentSyllable);

    // transicionar de nuevo a ExpectState
    this.transitionTo(ExpectState);
    this.tick();

}


    //estado final.
function closeGame(game){
    game.players.moveAll(0);
    game.stateInstance = false;
    game.currentPlayer = game.players.getWinner();
    print('Ganador del juego es: '+game.currentPlayer.name);
    game.currentPlayer.score++;
    game.players.resetPlayersLifes();
    game.currentPlayer = null;
}