var Item = Backbone.Model.extend({
  nextId: function() {
    var id = this.get('id');

    if (id === this.collection.length) {
      return 1;
    } else {
      return id + 1;
    }
  },

  prevId: function() {
    var id = this.get('id');

    if (id === 1) {
      return this.collection.length;
    } else {
      return id - 1;
    }
  },
});