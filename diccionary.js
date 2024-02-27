

function Diccionary(){
    this.words = null;
    this.sylabbles = null;
}


Diccionary.prototype = {
    loadData : function(){
        if(File.exists('diccionary.json')){
            var data  = JSON.parse(File.load('diccionary.json'));
            this.words = new Set(data);
        } else {
            print('Error el archivo diccionary.json no existe');
        }

        if(File.exists('syllables.json')){
            var data = JSON.parse(File.load('syllables.json'));
            this.sylabbles = data;
        } else {
            print('Error el archivo syllables.json no existe.');
        }
    },
    getSylabble : function(){
            var numRandom = Math.floor(Math.random()* this.sylabbles.length);
            return this.sylabbles[numRandom];
    },
    hasWord: function(word){
        return this.words.has(word);
    }
}

var diccionary = new Diccionary();
diccionary.loadData();
