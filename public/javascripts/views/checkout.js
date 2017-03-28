var CheckoutView = Backbone.View.extend({
  el: '#checkout',
  template: JST.checkout,

  events: {
    'click a': 'reset',
    'click #up': 'incrementQuantity',
    'click #down': 'incrementQuantity',
    'blur input': 'updateTotal'
  },

  setQuantity: function(id, quantity) {
    this.collection.get(id).set('quantity', quantity);
  },

  updateTotal: function(e) {
    var $input = $(e.target);
    var quantity = +Math.round($input.val());

    if (quantity < 0) { quantity = 0; }

    this.setQuantity($input.data('id'), quantity);
  },

  incrementQuantity: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    var $input = $e.parent().prev();
    var direction = $e.attr('id');
    var quantity = +$input.val();

    direction === 'up' ? quantity++ : quantity--;
    if (quantity < 0) { quantity = 0; }

    this.setQuantity($input.data('id'), quantity);
  },

  reset: function(e) {
    e.preventDefault();
    this.collection.reset();
    router.navigate('/', { trigger: true });
  },

  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.collection.getTotal(),
    }));
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'change update reset', this.render);
  }
});