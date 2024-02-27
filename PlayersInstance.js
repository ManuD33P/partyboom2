include('PlayerObject.js');
include('interatorPlayer.js');

function PlayersInstance(){
    this.players = [];
}


PlayersInstance.prototype = {
     addPlayer : function(name){
        if(!this.isExists(name)){
            var newPlayer = new Player(name);
            this.players.push(newPlayer);
            print(newPlayer.name + ' se ah unido a la partida.');
        } else {
                /* El usuario ya existe*/
            print(newPlayer.name+' Ya estas en el juego');
        }
        
     },
     remPlayer : function(name){
        if(this.isExists(name)){
            this.players = this.players.filter(function(player){
                return player.name !== name
            });
        }
     },

     nextPlayer: function(currentPlayer) {
        if (this.countPlayerLife() > 1) {
            if (!currentPlayer) {
                // Si no se proporciona currentPlayer, devolver el primer jugador con vida
                var firstPlayerWithLife = this.players.find(function(player){ return player.life > 0});
                return firstPlayerWithLife || null;
            }
    
            var currentPlayerIndex = this.players.findIndex(function(player){
                return player.name === currentPlayer.name});
            var iterator = new Iterator(this.players);
            
    
            // Buscar el próximo jugador con vida después del currentPlayer
            iterator.index = currentPlayerIndex + 1;
            while (iterator.hasNext()) {
                const nextPlayer = iterator.next();
                if (nextPlayer.life > 0) {
                    return nextPlayer;
                }
            }
    
            // Si no se encuentra después, buscar desde el principio hasta el currentPlayer
            iterator.index = 0;
            while (iterator.index <= currentPlayerIndex) {
                const nextPlayer = iterator.next();
                if (nextPlayer.life > 0) {
                    return nextPlayer;
                }
            }
        }
    
        // Si no hay suficientes jugadores con vida, o el currentPlayer es el único con vida
        return null;
    },

    // cuenta la cantidad de players con vida.

    countPlayerLife: function() {
        return this.players.reduce(function(acc, p) {
            return p.life > 0 ? acc + 1 : acc;
        }, 0);
    },

    // Comprueba si existe el jugador en el arreglo.
    isExists: function(name){
        return this.players.some( function(player) {
                return player.name === name;
        },this);
    },

    moveAll: function(vroom){
        this.players.forEach(function(player){
            player.move(vroom);
        })
    },

    
    resetPlayersLifes: function(){
        this.players.forEach(function(player){
            player.resetLife();
        })     
    },
    getWinner: function(){
       return this.players.find( function(player){
        return player.life
       },this);
    }
}



