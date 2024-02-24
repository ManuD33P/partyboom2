include('archive.js');

function Diccionary(){
    this.syllables = [];
    this.words = null;
}


Diccionary.prototype = {
    loadDiccionary: function(){
        var newDiccionary = loadDiccionary();
        if(newDiccionary){
            this.words = newDiccionary;
            print('El Diccionario ha sido cargado con exito, total de palabras: ', this.words.size);
            return true;
        }
        print('Error al cargar el diccionario');
        return false;
    },
    loadSylabble: function(){
        var newSylabble = loadSylabble();
        if(newSylabble){
            this.syllables = newSylabble;
            print('El Diccionario de silabas ha sido cargado con exito, total de silabas: ', this.syllables.length);
            return true;
        }
        print('Error al cargar el diccionario de silabas');
        return false;
    },
    isExists: function(word){
        return this.words.has(word);
    },
    getSyllable: function(){
        return this.syllables[Math.floor(Math.random() * this.syllables.length)];
    },

}

var diccionary = new Diccionary();
