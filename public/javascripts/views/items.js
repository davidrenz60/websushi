var ItemsView = Backbone.View.extend({
  template: JST.items,
  attributes: {
    id: 'items',
  },

  events: {
    'click a.add': 'addToCart'
  },

  render: function() {
    this.$el.html(this.template({ items: this.collection.toJSON() }));
    App.$menu.html(this.$el);
  },

  addToCart: function(e) {
    e.preventDefault();
    var id = $(e.target).closest('li').data('id');
    var model = this.collection.get(id);
    App.trigger('add_to_cart', model);
  },

  initialize: function() {
    this.render();
  }
});