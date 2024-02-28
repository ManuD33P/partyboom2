include('Diccionary.js');

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
    print('Bien, el siguiente.');
    this.game.timer.stop();
    this.transitionTo(advanceNextPlayer);
    this.tick();
};

GameState.prototype.incorrectInput = function (arg = 0) {
    // Función cuando el usuario pone una respuesta incorrecta.
    return arg 
        ? print('Mal esa palabra no existe en el diccionario' + this.game.currentPlayer.name) 
        : print('Mal la palabra no contiene la sílaba: ' + this.game.currentSyllable);
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
            print('El juego comenzará en 5 segundos!');
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
            print("Rápido " + game.currentPlayer.name + " escribe una palabra con la sílaba " + game.currentSyllable);
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
            print(game.currentPlayer.name + ' Se te acabó el tiempo. Tienes una vida menos.');
            print(" ");
            print(" ");

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
        print("Rápido " + game.currentPlayer.name + " escribe una palabra con la sílaba " + game.currentSyllable);

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
        print('Ganador del juego es: ' + game.currentPlayer.name);
        game.currentPlayer.score++;
        game.players.resetPlayersLifes();
        game.currentPlayer = null;
    }
};

