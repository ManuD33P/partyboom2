
function Notify(){
    this.context = null
    this.message = null;
    this.from = null;
}

Notify.prototype  = {
    addMessage : function(text){
        this.message = text;
    },
    addFrom : function(receptors){
        this.from = receptors;
    },

    addContextFormat : function(context){
        this.context = context;
    },

    sendNotify : function(){
        if(receptors);
    }
}