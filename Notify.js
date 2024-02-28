
function Notify(){
    this.context = null
    this.message = "";
    this.from = null;
}

Notify.prototype  = {
    addMessage : function(text){
        this.message = text;
    },
    addFrom : function(from){
        this.from = from;
    },

    addContextFormat : function(context){
        this.context = context;
    },
    formatText: function(){

         //remplazar los +sy
         if(this.message.includes('+sy')){
            if(this.context.currentSyllable){
                var currentSyllable = this.context.currentSyllable
                this.message = this.message.replace(/\+sy/g,currentSyllable);
            }
        }
        
        //remplazar los +s
        if(this.message.includes('+s')){
            if(this.context.currentPlayer){
                var currentPlayer = this.context.currentPlayer
                this.message = this.message.replace(/\+s/g,currentPlayer.score);
            } 
        }
        //remplazar los +n
        if(this.message.includes('+n')){
            if(this.context.currentPlayer){
                var currentPlayer = this.context.currentPlayer
                this.message = this.message.replace(/\+n/g,currentPlayer.name);
            }
        }

        //remplazar los +l
        if(this.message.includes('+l')){
            if(this.context.currentPlayer){
                var currentPlayer = this.context.currentPlayer
                this.message = this.message.replace(/\+l/g,currentPlayer.life);
            }
        }

        //remplazar los +v
        if(this.message.includes('+v')){
            if(this.context.vroom){
                var vroom = this.context.vroom
                this.message = this.message.replace(/\+v/g,vroom);
            }
        }

       

        if(this.message.includes('+o')){
            if(this.context.owner){
                var owner = this.context.owner;
                this.message = this.message.replace(/\+o/g, owner);
            }
        }
            
    },
    sendNotify : function(){
        if(this.from){
            //enviar el mensaje a particular
            this.formatText();
            var username = this.context.currentPlayer.name
            
            print(user(username),this.message);
        } else {
            //enviar mensajes a todos.
            this.formatText();
            var vroom = this.context.vroom
            print(parseInt(vroom),this.message);
        }
    }
}


var nofity = new Notify();



function generationMessage(context, text, from){
    if(context && text){
        nofity.addContextFormat(context);
        nofity.addMessage(text);
    }

    if(from){ 
        nofity.addFrom(from);
    } 
    

    nofity.formatText();
    nofity.sendNotify();
}