var ItemInfoView = Backbone.View.extend({
  template: JST.info,
  duration: 100,

  attributes: {
    id: 'item-info',
  },

  events: {
    'click p.add': 'addToCart',
    'click a.nav': 'navigate',
  },

  addToCart: function(e) {
    e.preventDefault();
    App.cartItems.addItem(this.model);
  },

  navigate: function(e) {
    e.preventDefault();
    App.lastId = this.model.get('id');
  },

  slide: function() {
    var transition = App.lastId < this.model.get('id') ? 'right' : 'left';
    var $itemDetail = this.$('.item-detail');

    if (transition === 'right') {
      $itemDetail.toggle('slide', {direction: 'left', duration: this.duration});
      $itemDetail.toggle('slide', {direction: 'right', duration: this.duration});
    } else if (transition === 'left') {
      $itemDetail.toggle('slide', {direction: 'right', duration: this.duration});
      $itemDetail.toggle('slide', {direction: 'left', duration: this.duration});
    }
  },

  render: function() {
    var model = this.model.toJSON();
    model.nextId = this.model.nextId();
    model.prevId = this.model.prevId();

    this.$el.html(this.template(model));
    App.$menu.html(this.$el);

    App.lastId && this.slide();
  },

  initialize: function() {
    this.render();
  }
});