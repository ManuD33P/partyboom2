function Iterator(collection) {
    this.collection = collection;
    this.index = 0;
}


Iterator.prototype = {
    hasNext: function() {

        while (this.index < this.collection.length && this.collection[this.index].life <= 0) {
            this.index++;
        }
        return this.index < this.collection.length;
    },

    next: function() {
        if (this.hasNext()) {
            return this.collection[this.index++];
        }
        return null;
    }
};