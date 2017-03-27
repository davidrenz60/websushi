var CartView = Backbone.View.extend({
  template: JST.cart,
  el: '#cart',
  $cartTotal: $('#cart-total'),
  duration: 300,

  events: {
    'click a.delete': 'destroy',
    'click a.empty': 'emptyCart',
  },

  updateCartQuantity: function() {
    this.$cartTotal.text(this.collection.length);
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
    this.updateCartQuantity();
    this.collection.length > 0 ? this.open() : this.close();
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
    this.collection.remove(id);
  },

  emptyCart: function(e) {
    e.preventDefault();
    this.collection.reset();
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'change update reset', this.render);
  }
});
