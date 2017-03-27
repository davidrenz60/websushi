var ItemsView = Backbone.View.extend({
  template: JST.items,
  attributes: {
    id: 'items',
  },

  events: {
    'click a.add': 'addToCart'
  },

  addToCart: function(e) {
    e.preventDefault();
    var id = $(e.target).closest('li').data('id');
    var model = this.collection.get(id);
    App.cartItems.addItem(model);
  },

  render: function() {
    this.$el.html(this.template({ items: this.collection.toJSON() }));
    App.$menu.html(this.$el);
  },

  initialize: function() {
    this.render();
  }
});