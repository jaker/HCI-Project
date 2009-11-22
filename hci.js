var hci = {};

$(document).ready(function(){
  $("form").attr("action","javascript:hci.getInputToSearch()");
});

hci.getInputToSearch = function() {
  var keywords = $("input:first").val();
  if (keywords !== '') {
    hci.searchPipes(keywords);
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
    var aTitle = $(document.createElement("h1")).html(item.title);
    var aDescription = $(document.createElement("p")).html(item.description);
    aResult.append(aTitle).append(aDescription);
    $("#results").append(aResult);
  });
};

