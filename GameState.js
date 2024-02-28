include('Diccionary.js');
include('Notify.js');
include('EffectSonic.js');
// Función constructora para manejar los estados.
function GameState(game) {
    this.game = game;
    this.state = null;
}

// Función para ejecutar el estado.
GameState.prototype.tick = function () {
    this.state.execute(this);  // Aseguramos que el contexto sea el objeto 'game'
};

GameState.prototype.transitionTo = function (stateCallback) {
    this.state = new stateCallback();  
};

GameState.prototype.evaluateInput = function (text, userobj) {
    if (this.game.currentPlayer.name === userobj.name) {
        var input = text.toLowerCase().trim();
        if (input.includes(this.game.currentSyllable)) {
            if (diccionary.hasWord(input)) {
                this.correctInput();
            } else {
                this.incorrectInput(1);
            }
        } else {
            this.incorrectInput(0);
        }
    }
};

GameState.prototype.correctInput = function () {
    // Función cuando el usuario pone una respuesta correcta.
    generationMessage(this.game, MSG_CORRECT_WORD)
    this.game.timer.stop();
    this.transitionTo(advanceNextPlayer);
    this.tick();
};

GameState.prototype.incorrectInput = function (arg = 0) {
    // Función cuando el usuario pone una respuesta incorrecta.

    return arg 
        ? 
        //mensaje para cuando no existe en el diccionario
        generationMessage(this.game,MSG_ERROR_WORD)
        : 
        //mensaje para cuando la palabra no incluye la silaba.
        generationMessage(this.game,MSG_ERROR_NOSYL)
};

function StartingState() {}
function ExpectState() {}
function advanceNextPlayer() {}
function closeGame() {}

// Creo las funciones de los estados.
StartingState.prototype = {
    execute: function (gameState) {
        var game = gameState.game;
        if (game) {
            //Mensaje para avisar que el juego comienza
            generationMessage(game,MSG_STARTGAME)
            game.players.enableSound();
            //Mensaje para avisar que el juego comienza
            // Muevo todos los usuarios al vroom.
            game.players.moveAll(game.vroom);
        }

        game.timer.interval = 5000; // 5 segundos
        game.timer.oncomplete = function () {
            // Obtengo una nueva sílaba
            
            var newSyl = diccionary.getSylabble();
            game.currentSyllable = newSyl;

            // Obtengo el primer jugador. 
            var firstPlayer = game.players.nextPlayer();
            game.currentPlayer = firstPlayer;

            // Mensaje para el primer jugador
            
            generationMessage(game,MSG_QUESTION);
            game.players.sonic.sendEffect();
            // Mensaje para el primer jugador

            gameState.transitionTo(ExpectState);
            gameState.tick();
        };
        game.timer.start();
    }
};

// Estado que espera al usuario que responda durante cierto tiempo.
ExpectState.prototype = {
    execute: function (gameState) {
        var game = gameState.game;
        game.timer.interval = 1000 * (Math.floor(Math.random() * 8) + 8);
        game.timer.oncomplete = function () {
            // Lógica para reducirle una vida.
            game.currentPlayer.substracLife();
          // mensaje de que perdio una vida.
            game.players.sonic.sendBomb();
            generationMessage(game,MSG_SUBSTRACLIFE);
            if(game.currentPlayer.life <= 0){
                generationMessage(game,MSG_PLAYERLOSER);
            }
          // mensaje de que perdio una vida.

            // Transicionar al advanceNextPlayer.
            gameState.transitionTo(advanceNextPlayer);
            gameState.tick();
        };

        game.timer.start();
    }
};

advanceNextPlayer.prototype = {
    execute: function (gameState) {
        var game = gameState.game;
        var newSyl = diccionary.getSylabble();
        game.currentSyllable = newSyl;

        // Obtengo el próximo jugador. 
        var nextPlayer = game.players.nextPlayer(game.currentPlayer);

        if (!nextPlayer) {
            gameState.transitionTo(closeGame);
            return gameState.tick();
        }

        game.currentPlayer = nextPlayer;

        // Mensaje para el próximo jugador

        generationMessage(game,MSG_QUESTION);
        
        // Mensaje para el próximo jugador
        
        
        // Transicionar de nuevo a ExpectState
        gameState.transitionTo(ExpectState);
        gameState.tick();
    }
};

// Estado final.
closeGame.prototype = {
    execute: function (gameState) {
        var game = gameState.game;
        game.players.moveAll(0);
        game.stateInstance = false;
        game.currentPlayer = game.players.getWinner();
        game.currentPlayer.score++;
        game.players.resetPlayersLifes();
        // Mensaje de ganador
        var vroom = 0;
        generationMessage({currentPlayer: game.currentPlayer, vroom: 0},MSG_PLAYERWIN);
        // Mensaje de ganador.
        game.currentPlayer = null;
    }
};

