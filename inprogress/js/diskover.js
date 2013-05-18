$(function() {
  
  var Release = Backbone.Model.extend({
    
  });
  
  var ReleaseList = Backbone.Collection.extend({
    model: Release,
    
    initialize: function(models, options) {
      this.query = options.query;
    },
    
    url: function() {
      return "http://api.discogs.com/database/search?q=" +
             encodeURIComponent(this.query) +
             "&per_page=10";
    },
    
    parse: function(resp) {
      return resp.data.results;
    }
  });
  
  var ReleaseView = Backbone.View.extend({
    tagName: "li",
    
    template: _.template($("#relItemTemplate").html()),
    
    render: function() {
      this.$el.replaceWith(this.template(this.model.toJSON()));
      return this;
    }
  });
  
  var ReleaseListView = Backbone.View.extend({
    tagName: "ol",
    
    className: "slats",
    
    render: function() {
      this.collection.forEach(function(item) {
        var itemView = new ReleaseView({model: item});
        this.$el.append(itemView.render().el);
      }, this);
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
      var that = this;
      results.fetch({
        dataType: "jsonp",
        cache: true,
        success: function(collection, response) {
          var view = new ReleaseListView({collection: results});
          that.$("ul").remove();
          that.$el.append(view.render().el);
        },
        error: function(collection, response) {
          console.log("search failed");
          console.log(response);
        }
      });
    },
  });
  
  var diskover = new AppView;
  
});
