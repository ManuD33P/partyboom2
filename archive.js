

function loadDiccionary() {
  if(File.exists("diccionary.json")) {
    var newFile = JSON.parse(File.load('diccionary.json'));
    var newDiccionary = new Set(newFile);
    if(newDiccionary.size > 10000) return newDiccionary;
    print('Error al cargar el archivo diccionary.json,verificar si el archivo existe, y contiene mas de 10000 palabras');
    return null;
    }
}

function loadSylabble(){
    if(File.exists("sylabble.json")) {
        var newFile = JSON.parse(File.load('sylabble.json'));
        if(newFile.length > 500) return newFile
        print('Error al cargar el archivo sylabble.json,verificar si el archivo existe, y contiene mas de 10000 palabras');
        return null;
    }
}

function saveDiccionary(diccionary){
    File.save('diccionary.json', JSON.stringify(Array.from(diccionary)));
}