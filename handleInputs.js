include('game.js');
include('notify.js');
include('message.js');
include('diccionary.js');

var script = false 
function onTextBefore(userobj, text){
        if(script){
            while(games.iterator.hasNext()){
                var game = games.iterator.next();
                if(game.stateGame && game.currentState === 'expecting'){
                    var player = game.players.currentPlayer;
                    if(player.name === userobj.name){
                        if(text.includes(game.currentSyllable)){
                            var res = text.replace(/[^a-zA-Z]/g, '');
                            if(diccionary.isExists(res.toLowerCase())){
                                var notify = new Notify(MSG_CORRECT, game.vroom);
                                notify.send(player);
                            } else {
                                var notify = new Notify(MSG_NOTEXISTS, game.vroom);
                                notify.send(player);
                            }
                        } else {
                            var notify = new Notify(MSG_INCORRECT.replace(/\+sy/,game.currentSyllable), game.vroom);
                            notify.send(player);
                        }
                    }
                }
            }
        }
}