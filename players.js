include('libs.js');

function Player(name){
    this.name = name;
    this.score =0;
    this.life = 4;
}


Player.prototype = {
    addScore: function(){
        this.score += 1;
    },
    removeLife: function(){
        this.life -= 1;
    },
    getScore: function(){
        return this.score;
    },
    getLife: function(){
        return this.life;
    },
}


function Players (){
    this.players = [];
    this.currentPlayer = null;
    this.iterator = null;
}


Players.prototype = {
    isExist: function(name){
        var exist = this.players.some(function(player){
            return player.name === name;
        });
        return exist;
    },
    addPlayer: function(name){
        if(this.isExist(name)) return false;
        var player = new Player(name);
        this.players.push(player);
        return player;
    },
    remPlayer: function(name){
      if(this.isExist(name)){
        var findPlayer = null;
        this.players = this.players.filter(function(player){
            if(player.name === name) findPlayer = player;
            return player.name !== name;
        });

        return  findPlayer ? findPlayer : null;
      }  
    },
    addIterator: function(){
        this.iterator = new Iterator(this.players);
    },
    nextPlayer: function(){
        // Primero se verifica si hay mas de 2 jugadores con vida
        if(this.iterator.countPlayerLifes() < 1) return null;
        // Luego si el index del iterador es menor que el tamaño de la lista de jugadores
        // se devuelve el siguiente jugador con vida. en caso de que el siguiente jugador no tenga vida
        // se llama recursivamente a la funcion nextPlayer
        if(this.iterator.hasNext()){
            var player = this.iterator.next();
            if(player.getLife() > 0) {
                this.currentPlayer = player;
                return player;
            }
            return this.nextPlayer();
        }
        // si el index del iterador es igual al tamaño de la lista de jugadores se resetea el iterador.
        this.iterator.reset();
    },
    move: function(vroom){
        for(var i = 0; i < this.players.length; i++){
             user(this.players[i].name).vroom(vroom);
        }
    },
    getWinner: function(){
        var winner = this.players.find(function(player){
            return player.getLife() > 0;
        })
        return winner;
    }

}


