include('PlayersInstance.js');
include('GameState.js');

function Game(owner,vroom){
    this.players = new PlayersInstance();
    this.currentPlayer = null;
    this.currentSyllable = null;
    this.stateInstance = false;
    this.timer = new Timer();
    this.owner = owner
    this.vroom = vroom;
    this.stateGame = new GameState(
        {
        players: this.players,
        currentPlayer: this.currentPlayer,
        currentSyllable: this.currentSyllable,
        timer: this.timer,
        owner: this.owner,
        vroom: this.vroom,
        stateIntance: this.stateInstance
        }
    );  // Asegura que el contexto de 'game' es el correcto
}


Game.prototype = {
    addPlayer: function(playerName){
        if(this.players.isExists(playerName)){
            //mensaje para avisar que el player ya existe en la instancia.
        } else {
            // si no esta en la instancia.
            this.players.addPlayer(playerName);
            //avisar que se lo añado a la lista de players.
        }
    },

    // modificar esta funcion mas adelante.
    remPlayer: function(playerName){
        if(this.players.isExists(playerName)){
            this.players.remPlayer(playerName);

            // avisar que ha sido eliminado de la instancia.
            
        } else {
            //avisar que no esta en la instancia de juego.
        }
    },

    startGame: function(){
        var players = this.players.players;

        if(players.length > 1){
            this.stateInstance = true;
            this.stateGame.transitionTo(StartingState);  // Aseguramos que el contexto sea el objeto 'game'
            this.stateGame.tick();  // Ejecutamos el estado inicial
        } else {
            print(MSG_PLAYERSINSUFFICIENT.replace(/\+n/g,this.owner));
        }

    }



    //verifica si el usuario existe en la lista.
   
}
