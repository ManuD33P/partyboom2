include('players.js');
include('notify.js');
include('message.js');

function Game(){
    this.players = new Players();
    this.timer = 15;
    this.iterador = null;
    this.currentSyllable = null;
    this.vroom = 0;
    this.stateGame= null;
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
        this.stateGame = 'start';
        this.nextPlayer();
    },
    
}