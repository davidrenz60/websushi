var router = new (Backbone.Router.extend({
  routes: {
    "menu/:id": 'info',
    "checkout": 'checkout',
  },

  checkout: function() {
    App.checkoutView();
  },

  info: function(id) {
    App.infoView(id);
  },

  index: function() {
    if (App.menu) {
      App.menuView();
    } else {
      App.init();
    }
  },

  initialize: function() {
    this.route(/^\/?$/, 'index', this.index);
  }
}))();

Backbone.history.start({
  pushState: true,
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/\//, ''), {
    trigger: true,
  });
});
