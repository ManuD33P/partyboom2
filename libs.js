

function Iterator(element){
    this.element = element;
    this.index = 0;
}

Iterator.prototype = {
    countPlayerLifes: function(){
        return this.element.reduce(function(acc, player){
            var inGame = 0;
            if(player.getLife()) inGame = 1;
            return acc + inGame
        }, 0);
    },
    hasNext: function(){
        return this.index < this.element.length;
    },
    next: function(){
         return this.element[this.index++];
    },
    reset: function(){
        this.index = 0;
    },
}