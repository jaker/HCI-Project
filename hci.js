var hci = {};

$(document).ready(function(){
  $("form").attr("action","javascript:hci.getInputToSearch()");

  $.address.change(hci.handleURLChange);
  var data = ["heart", "brain", "pain"];
  $("#searcher").autocomplete(data).result(function(event, item) {
    hci.getInputToSearch();
  });
});

hci.getInputToSearch = function() {
  var keywords = $("input:first").val();
  if (keywords !== '') {
    $.address.value(keywords);
  }
};

hci.searchPipes = function(keywords) {
 var request = "http://pipes.yahoo.com/pipes/pipe.run?_id=654155481dd4460e6353d5f46ad1dd73&_render=json&_callback=?&searchTerm=" + keywords;
 $.getJSON(request, function(json){
   if(json.count > 0) {
     hci.displayJSON(json);
   } else {
     $("#results").html("Search not found.");
   }}
 );
};

hci.displayJSON = function(data) {
  $.each(data.value.items, function(i,item){
    var aResult = $(document.createElement("div")).addClass("result");
    var aLink = $(document.createElement("a")).attr("href", item.link);
    var aTitle = $(document.createElement("h1")).html(item.title);
    var aDescription = $(document.createElement("p")).html(item.description);
    aLink.append(aResult.append(aTitle).append(aDescription));
    $("#results").append(aLink);
  });
};

hci.handleURLChange = function(event) {
  var term = event.value;
  $("#results").html("");

  if (term === '/') {
    return;
  }

  var termLength = term.length;

  // The default value is '/'
  if (termLength > 1) {
    // Strip the slash
    // TODO: Add spinner or progress
    hci.searchPipes(term.substring(1, termLength));
  }
};