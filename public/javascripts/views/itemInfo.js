var ItemInfoView = Backbone.View.extend({
  template: JST.info,
  partial: JST.itemDetail,
  duration: 100,

  attributes: {
    id: 'item-info',
  },

  events: {
    'click p.add': 'addToCart',
  },

  addToCart: function(e) {
    e.preventDefault();
    App.trigger('add_to_cart', this.model);
  },

  render: function() {
    var model = this.model.toJSON();
    model.nextId = this.model.nextId();
    model.prevId = this.model.prevId();

    if (this.viewRendered()) {
      this.renderPartial(model);
      this.navigate();
      return;
    }

    this.$el.html(this.template(model));
    App.$menu.html(this.$el);
  },

  renderPartial: function(model) {
    App.$menu.find('.item-detail').html(this.partial(model));
  },

  viewRendered: function() {
    return App.$menu.find('#item-info').length > 0;
  },

  navigate: function() {
    var $el = App.$el.find(".item-detail");

    if (this.direction === 'right') {
      $el.toggle('slide', {direction: 'left', duration: this.duration});
      $el.toggle('slide', {direction: 'right', duration: this.duration});
    } else if (this.direction === 'left') {
      $el.toggle('slide', {direction: 'right', duration: this.duration});
      $el.toggle('slide', {direction: 'left', duration: this.duration});
    }
  },

  initialize: function(options) {
    this.direction = options.direction;
    this.currentId = options.currentId;
    this.render();
  }
});