include('players.js');
include('notify.js');
include('message.js');
include('diccionary.js');


function Game(){
    this.players = new Players();
    this.timer = 15;
    this.currentSyllable = null;
    this.vroom = 0;
    this.stateGame= null;
    this.currentState = null;
    this.owner = null;
}


Game.prototype = {
    addPlayer: function(name){
       var result = this.players.addPlayer(name);
       if(result){
           var notify = new Notify(MSG_ADDPLAYER, this.vroom);
           notify.send(result);
       } else {
           var notify = new Notify(MSG_EXIST, this.vroom);
           notify.send({name: name},'current');
       }
    },
    remPlayer: function(name){
        var player = this.players.remPlayer(name);
        if(player){
            var notify = new Notify(MSG_REMPLAYER, this.vroom);
            notify.send(player);
        } else {
            var notify = new Notify(MSG_NOTFOUND, this.vroom);
            notify.send({name: name},'current');
        }
    },
    startGame: function(){
        this.players.addIterator();
        this.stateGame = true;
        this.currentState = 'start'
        this.timer = 5;        
    },

    
}


function Games () {
    this.games = [];
    this.iterator = null;
    this.currentGame = null;
}
Games.prototype = {
    addGame: function(owner){
        var game = new Game();
        game.vroom = this.games.length;
        game.owner = owner;
        this.games.push(game);
        return game;
    },
    remGame: function(owner){
        var findGame = null;
        this.games = this.games.filter(function(game){
            if(game.owner === owner) findGame = game;
            return game.owner !== owner;
        });
        /* 
            crear logica para cerrar el juego.
        */
        return findGame ? findGame : null;
    },
    addIterator: function(){
        // añadir iterador para recorrer los juegos

        this.iterator = new IteratorGames(this.games);
    },
    nextGame: function(){
        // recorrer los juegos
         if(this.iterator.hasNext()){
             var game = this.iterator.next();
             if(this.iterator.isRunning()){
                    this.currentGame = game;
                    return true
             }
             return null
         }
        return null;
    }
}

var games = new Games();

function onTimer(){
    while(games.iterator.hasNext()){
        var game = games.currentGame;
        switch(game.currentState){
            case 'start':
              if(game.timer){
                var notify = new Notify(MSG_STARTGAME.replace(/\+t/,game.timer), game.vroom);
                notify.send(null);
                game.timer -= 1;
              } else {
                game.currentState = 'play';
              }
            break;
            case 'play':
                var player = game.players.nextPlayer();
                var syllable = diccionary.getSyllable();
                game.currentSyllable = syllable;
                if(player){
                    var notify = new Notify(MSG_TURN.replace(/\+sy/g,game.currentSyllable), game.vroom);
                    notify.send(player);
                    var numeroAleatorio = Math.floor(Math.random() * 6) + 10;
                    game.timer = numeroAleatorio;
                    game.currentState = 'expecting'
                } else {
                    game.currentState = 'end';
                }
            break;
            case 'expecting':
                if(game.timer){
                    game.timer -= 1;
                } else {
                    game.players.currentPlayer.removesLife();
                    var notify = new Notify(MSG_TIMEOUT, game.vroom);
                    notify.send(game.players.currentPlayer);
                    game.currentState = 'play';
                }
            break;
            case 'end':
                var player = game.players.getWinner();
                    player.addScore();
                    var notify = new Notify(MSG_WIN, game.vroom);
                    notify.send(player);
                    game.stateGame = false;
                    game.move(0);
                    game.currentState = null;
            break;
            
        }
        games.iterator.next();
    }
    games.iterator.reset();
}