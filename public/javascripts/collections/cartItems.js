var CartItems = Backbone.Collection.extend({
  addItem: function(model) {
    var existingModel = this.get(model.get('id'));

    if (existingModel) {
      existingModel.set('quantity', existingModel.get('quantity') + 1);
    } else {
      existingModel = model.clone();
      existingModel.set('quantity', 1);
      this.add(existingModel);
    }

    this.update();
    this.trigger('cart_updated');
  },

  removeItem: function(id) {
    this.remove(id);
    this.update();
    this.trigger('cart_updated');
  },

  empty: function() {
    this.reset();
    this.update();
    this.trigger('cart_empty');
  },

  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this;
  },

  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.quantity * b.price;
    }, 0);

    return this;
  },

  getTotal: function() {
    return this.total;
  },

  getQuantity: function() {
    return this.quantity;
  },

  update: function() {
    this.setQuantity().setTotal();
  },

  initialize: function() {
    this.on('change', this.update);
  }
});