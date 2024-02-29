include('PlayerObject.js');
include('interatorPlayer.js');
include('EffectSonic.js');
function PlayersInstance(){
    this.players = [];
    this.sonic = null;
}


PlayersInstance.prototype = {
     addPlayer : function(name){
        if(!this.isExists(name)){
            var newPlayer = new Player(name);
            this.players.push(newPlayer);
        } else {
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
    },
    enableSound: function(){
        this.sonic = new EffectSonic(this.players);
    },
    getScores: function(){
        return this.players.forEach(function(player){
            print(0,"\x0301\x06[\x0304"+player.name+"\x0301]:"+" \x0301"+player.score )
        })
    }
}



