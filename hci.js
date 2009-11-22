$(document).ready(function(){
    searchPipes("heart+disease");
});

function searchPipes(keywords) {
 var request = "http://pipes.yahoo.com/pipes/pipe.run?_id=654155481dd4460e6353d5f46ad1dd73&_render=json&_callback=?&searchTerm=" + keywords;
 $.getJSON(request, function(json){
     if(json.count > 0) {
       displayJSON(json);
     } else {
       $("#results").html("Search not found.");
     }}
  );
}

function displayJSON(data) {
    data
    $.each(data.value.items, function(i,item){
        $("#results").append("<h1>"+item.title+"</h1>");
        $("#results").append("<h1>"+item.link+"</h1>");
        $("#results").append("<p>"+item.description+"</p>");
    });

}