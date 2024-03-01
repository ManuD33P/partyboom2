include('Commands.js')


function onTextAfter(userobj, text){
    if(games.isRunningGames()){
        var textFormat = skipColors(text);
        games.handleInputPlayers(textFormat,userobj);
    }
}

