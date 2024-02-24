include('game.js');

function onCommand(userobj,cmd,target,args){
    if(cmd === 'newGame'){
        var game = games.addGame(userobj.name);
        if(game){
            var notify = new Notify(MSG_NEWGAME, 0);
            notify.send(userobj);
        }
    }
}