var App = {
  $cartTotal: $('#cart-total'),
  $el: $('main'),
  $checkout: $('#checkout'),
  $menu: $('#menu'),

  menuView: function() {
    this.$checkout.hide();
    this.$menu.show();
    this.menu = new ItemsView({ collection: this.items });
  },

  infoView: function(id) {
    var direction = this.direction(id);

    this.menu = new ItemInfoView({
      currentId: id,
      direction: direction,
      model: this.items.get(id),
     });
  },

  checkoutView: function() {
    this.checkout.render();
    this.$menu.hide();
    this.$checkout.show();
  },

  direction: function(id) {
    return this.menu.currentId < id ? 'right' : 'left';
  },

  createCart: function() {
    this.cartItems = new CartItems();
    this.cartView = new CartView({
      collection: this.cartItems,
    });

    this.checkout = new CheckoutView({ collection: this.cartItems });
  },

  updateCartQuantity: function() {
    this.$cartTotal.text(this.cartItems.length);
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on('add_to_cart', this.cartItems.addItem.bind(this.cartItems));
    this.listenTo(this.cartItems, 'cart_updated cart_empty', this.updateCartQuantity);
  },

  init: function() {
    this.menuView();
    this.createCart();
    this.bindEvents();
  },
};

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
});

Handlebars.registerHelper('to_kcal', function(kj) {
  return (+kj / 4.184).toFixed(4);
});

Handlebars.registerPartial('itemDetail', JST.itemDetail);