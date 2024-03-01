include('instanceGame.js');

function skipColors(text){
    var textFormat = text.match(/[a-zA-Z\s]/g).join("");
    return textFormat;
 }

function skipColorsCommands(text){
    var textFormat = text.match(/([^\/]+)/g).join("");
    return textFormat;
}
 
var games = new GamesInstance();



function onCommand(userobj,cmd,target,args){
    
    // var newCmd = skipColorsCommands(cmd);
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