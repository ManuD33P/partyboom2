include('libs.js');


function Notify(text,vroom) {
    this.message = text
    this.vroom = vroom
}


Notify.prototype.send = function (playerCurrent, from = 'all' ) {

    if(from === 'all')
     print(this.vroom, formatMessage(this.message, playerCurrent))
    
    if(from === 'current')
     print(playerCurrent.name, formatMessage(this.message, playerCurrent))
}
