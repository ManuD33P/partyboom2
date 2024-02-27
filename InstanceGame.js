include('GameObject.js');

function GamesInstance(){
    this.games = [];
}


GamesInstance.prototype = {

    // agregar un nuevo juego.
    addGame : function(owner){
        if(!this.isOwnerExists(owner)){
            var vroom = this.games.length ? this.games.length + 1 : 1;
            var newGame = new Game(owner,vroom);
            //asigna un vroom al juego
            newGame.addPlayer(owner);

            this.games.push(newGame);
        
            //mensaje de aviso que se creo un nuevo juego.


        } else {

            //mensaje si ya existe un juego con el mismo owner.
            
        }
    },
    
    
    // elimina un juego.
    remGame : function(owner){
        if(!this.isOwnerExists(owner)){
            //mensaje si no existe ninguna instancia de juego para ese owner.
            print('No tienes ninguna instancia de juego creada')
        } else {
            var findGame = this.games.find(function(game){
                return game.owner === owner
            });

             // cerrar el juego 
           //findGame.closeGame();

           this.games = this.games.filter(function(game){
                return game.owner !== owner
           })

           print('La Instancia de juego de '+owner+' ha sido terminada');
        }
    },
    // agrega players
    addPlayer: function(vroom,name){
        var gameFind = this.findGame(vroom);
            if(gameFind) gameFind.addPlayer(name);
    },
    // elimina players
    remPlayer : function(vroom,name){
        var gameFind = this.findGame(vroom);
        if(gameFind) gameFind.remPlayer(name);
    },

    // busca instancia de juego por vroom
    findGame:function(vroom){
        return this.games.find(function(game){
            return game.vroom === vroom 
        })
    },
    
   //busca si existe un game con un owner. 
    isOwnerExists : function(owner){
        return this.games.some(function(game){
            return game.owner === owner
        },this);
    },

    startGame: function(owner){
        if(this.isOwnerExists(owner)){
            var gameFind = this.games.find(function(game){
                return game.owner === owner
            });

            if(gameFind) gameFind.startGame();
        }
    },
    isRunningGames: function(){
        return this.games.some( function(game){
            return game.stateInstance
        },this);
    },
    handleInputPlayers: function(text,userobj){
        this.games.forEach(function(game){
            if(game.stateInstance){
               game.stateGame.evaluateInput(text,userobj)
            }
        })
    }
    
}