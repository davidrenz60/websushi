var App = {
  $el: $('main'),
  $checkout: $('#checkout'),
  $menu: $('#menu'),

  menuView: function() {
    new ItemsView({ collection: this.items });
    this.$checkout.hide();
    this.$menu.show();
  },

  infoView: function(id) {
    new ItemInfoView({
      model: this.items.get(id),
     });
  },

  checkoutView: function() {
    this.$menu.hide();
    this.$checkout.show();
  },

  setCartItems: function() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.toJSON()));
  },

  createCart: function() {
    this.cartItems = new CartItems();
    this.cartView = new CartView({
      collection: this.cartItems,
    });

    this.checkout = new CheckoutView({ collection: this.cartItems });
  },
};

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
});

Handlebars.registerHelper('to_kcal', function(kj) {
  return (+kj / 4.184).toFixed(4);
});
