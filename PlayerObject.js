
function Player(name){
    this.name = name;
    this.life = 2;
    this.score = 0;
}


Player.prototype = {

    substracLife: function(){
        this.life -= 1;
        return this.life;
    },

    addLife: function (){
        this.life += 1;
        return this.life;
    },

    move : function (vroom){
        user(this.name).vroom= vroom;
    },

    getLife: function (){
        return this.life;
    },
    resetLife: function(){
        this.life = 2;
    }

}