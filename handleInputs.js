include('Commands.js')

function onTextBefore(userobj, text){
    if(games.isRunningGames()){
        games.handleInputPlayers(text,userobj);
    }
    return text;
}