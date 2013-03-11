$(function() {
  
  var Release = Backbone.Model.extend({
    
  });
  
  var ReleaseList = Backbone.Collection.extend({
    model: Release
  });
  
  var ReleaseView = Backbone.View.extend({
    tagName = "li",
    
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
      if (!this.titleInput.val()) return;
    },
  });
  
  var diskover = new AppView;
  
});
