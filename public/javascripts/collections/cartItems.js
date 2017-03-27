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

  getStorage: function() {
    var cartItems = JSON.parse(localStorage.getItem('cart'));
    this.reset(cartItems);
    this.update();
  },

  initialize: function() {
    this.getStorage();
    this.on('change update reset', this.update);
  }
});