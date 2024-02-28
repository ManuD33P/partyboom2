include('Commands.js')

function onTextAfter(userobj, text){
    if(games.isRunningGames()){
        games.handleInputPlayers(text,userobj);
    }
}