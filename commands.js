include('instanceGame.js');

var games = new GamesInstance();



function onCommand(userobj,cmd,target,args){
    if(cmd === 'newGame'){
        games.addGame(userobj.name);
    }
    if(cmd.substr(0,9)==='joinGame '){
      var arg = cmd.substr(9);
      games.addPlayer(parseInt(arg),userobj.name);
    }
    if(cmd === 'leaveGame'){
        games.remPlayer(userobj.name);
    }
    if(cmd === 'startGame'){
       games.startGame(userobj.name);
    }

    if(cmd === 'stopGame'){
        games.remGame(userobj.name);
    }


}