include('GameObject.js');
include('Notify.js');
include('Template.js');
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
            print(MSG_NEWGAME.replace(/\+o/,owner).replace(/\+v/,vroom));

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

             //cierre del juego.
             var instance = findGame.stateGame
            if(instance.stateInstance) instance.closeGame();

           this.games = this.games.filter(function(game){
                return game.owner !== owner
           })
           
           generationMessage({currentPlayer: {name:owner}, vroom:0},MSG_CLOSED_INSTANCE);

        }
    },
    // agrega players
    addPlayer: function(vroom,name){
        var gameFind = this.findGame(vroom);
            if(gameFind){
                
                // fix corregir despues
                var game = gameFind.stateGame.game;
                if(game.stateInstance){
                    generationMessage({currentPlayer:{name:name}},MSG_ERROR_ADDPLAYER,1);
                } else {
                    gameFind.addPlayer(name);
                    generationMessage({currentPlayer:{name:name},vroom:0},MSG_JOINGAME);

                }
            } 
    },
    // elimina players
    remPlayer : function(name){
        var gameFind = this.findInstancePlayerGame(name);
        if(gameFind){
            gameFind.remPlayer(name);
            var game = gameFind.stateGame.game;
            if(game.stateInstance){
                generationMessage({currentPlayer:{name:name},vroom:game.vroom},MSG_LEAVEGAME);
            } else {
                generationMessage({currentPlayer:{name:name},vroom:0},MSG_LEAVEGAME);
            }
        } else {
            generationMessage({currentPlayer:{name:name}},MSG_ERROR_PLAYERINSTANCE,1);
        }
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
            var findGame = game.stateGame.game
            return findGame.stateInstance
        },this);
    },
    handleInputPlayers: function(text,userobj){
        this.games.forEach(function(game){
            var findGame = game.stateGame.game
            if(findGame.stateInstance){
               game.stateGame.evaluateInput(text,userobj)
            }
        })
    },
    findInstancePlayerGame: function(name){
        var findGame = this.games.find(function(game){
            return game.players.isExists(name);
        });

        return findGame;
    },
    closeGame: function(name){
            if(this.isOwnerExists(name)){
                var findGame = this.findInstancePlayerGame(name);
                if(findGame.stateInstance){
                    findGame.stateGame.closeGame();
                    generationMessage({currentPlayer:{name:name}, vroom: 0}, MSG_GAME_CLOSED)
                } else {
                    generationMessage({currentPlayer:{name:name}, vroom: 0}, MSG_ERROR_GAME_CLOSE);
                }
            }
    },
    listGames:function(userobj){
        print(userobj,"\x0304\x06 X-------------- \x0301Lista de Juegos \x0304--------------X")
        print(userobj,"")
        if(this.games.length){
        this.games.forEach(function(game){
                var estado = game.stateGame.game.stateInstance ? "\x0304\x06En curso" : "\x0304\x06Esperando Jugadores.";
                print(userobj, "\x0301ID: \x0304\x06"+game.vroom+"    \x0301\x06Owner: \x0304\x06"+game.owner+"    \x06\x0301Cantidad de Players: \x0304\x06"+game.players.players.length+"\x0301\x06      Estado: "+estado);
            })
        } else {
            print(userobj, "                La lista de Instancia de juegos esta vacia.");
        }
            print(userobj,"")
            print(userobj,"\x0304\x06 X-------------- \x0301Lista de Juegos \x0304--------------X")
    },
    listUser : function(owner){
        if(this.isOwnerExists(owner)){
            var findGame = this.findInstancePlayerGame(owner);
            
            if(findGame){
                findGame.players.listUsers();
            }
        }
    }
    
}