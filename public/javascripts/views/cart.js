var CartView = Backbone.View.extend({
  template: JST.cart,
  el: '#cart',
  duration: 300,

  events: {
    'click a.delete': 'destroy',
    'click a.empty': 'emptyCart',
  },

  open: function() {
    this.writeTemplate();
    this.$el.slideDown(this.duration);
  },

  close: function() {
    var self = this;
    self.$el.slideUp(this.duration, this.writeTemplate.bind(this));
  },

  render: function() {
    if (this.collection.length === 1) {
      this.open();
    } else if (this.collection.length === 0) {
      this.close();
    } else {
      this.writeTemplate();
    }
  },

  writeTemplate: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      quantity: this.collection.getQuantity(),
      total: this.collection.getTotal(),
    }));
  },

  destroy: function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    this.collection.removeItem(id);
  },

  emptyCart: function(e) {
    e.preventDefault();
    this.collection.empty();
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'cart_updated cart_empty change', this.render);
  }
});