$(function() {
  
  var Release = Backbone.Model.extend({
    
  });
  
  var ReleaseList = Backbone.Collection.extend({
    model: Release,
    
    initialize: function(models, options) {
      this.query = options.query;
    },
    
    url: function() {
      return "http://api.discogs.com/database/search?q=" + this.query;
    }
  });
  
  var ReleaseView = Backbone.View.extend({
    tagName: "li",
    
    template: _.template($("#relItemTemplate").html()),
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  
  var AppView = Backbone.View.extend({
    el: $("#diskover"),
    
    events: {
      "keypress #searchInput": "searchOnEnter"
    },

    initialize: function() {
      this.searchInput = this.$("#searchInput");
    },
    
    searchOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.searchInput.val()) return;
      
      var query = this.searchInput.val();
      var results = new ReleaseList([], { query: query });
      results.fetch({dataType: "jsonp", cache: true});
    },
  });
  
  var diskover = new AppView;
  
});
