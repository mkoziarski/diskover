(function() {
  var apiQueriesOn = false;
  
  var origin = (function() {
    var loc = window.location;
    return loc.protocol + "//" + loc.hostname;
  })();
  
  window.addEventListener("message", function(event) {
    if (event.origin != origin ||
        event.source != window) {
      console.log("diskover.io: unexpected cross-origin message received" +
          " from " + event.origin);
      return;
    }
    
    if (event.data.allowApiQueries) {
      apiQueriesOn = true;
    } else {
      alert("api queries not allowed");
    }
  }, false);
  
  var originalBackboneAjax = Backbone.ajax;
  
  Backbone.ajax = function() {
    // TODO what does backbone do when this happens?
    if (!apiQueriesOn)
      throw new Error("diskover.io extension missing or malfunctioning");
    
    return originalBackboneAjax.apply(Backbone, arguments);
  };
})();
