include('PlayersInstance.js');
include('GameState.js');
include('Diccionary.js');

function Game(owner){
    this.players = new PlayersInstance();
    this.currentPlayer = null;
    this.currentSyllable = null;
    this.stateInstance = false;
    this.timer = new Timer();
    this.owner = owner
    this.vroom = null;
    this.stateGame = new GameState(
        {
        players: this.players,
        currentPlayer: this.currentPlayer,
        currentSyllable: this.currentSyllable,
        timer: this.timer,
        owner: this.owner,
        vroom: this.vroom
        }
    );  // Asegura que el contexto de 'game' es el correcto
}


Game.prototype = {
    addPlayer: function(playerName){
        if(this.players.isExists(playerName)){
            //mensaje para avisar que el player ya existe en la instancia.
            print(playerName+' Ya estabas en la instancia.');
        } else {
            // si no esta en la instancia.
            this.players.addPlayer(playerName);
            //avisar que se lo añado a la lista de players.
            print(playerName+' se ha unido a la instancia de juego');
        }
    },

    // modificar esta funcion mas adelante.
    remPlayer: function(playerName){
        if(this.players.isExists(playerName)){
            this.players.remPlayer(playerName);

            // avisar que ha sido eliminado de la instancia.
            return print(playerName+' ha abandonado la instancia de juego');
            
        } else {
            //avisar que no esta en la instancia de juego.
           return  print(playerName+' no estas en la instancia de este juego');
        }
    },

    startGame: function(){
        this.stateInstance = true;
        this.stateGame.transitionTo(StartingState);  // Aseguramos que el contexto sea el objeto 'game'
        this.stateGame.tick();  // Ejecutamos el estado inicial

    }


    //verifica si el usuario existe en la lista.
   
}
