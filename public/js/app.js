//VIDEOS//
//http://www.youtube.com/user/mpressof/videos?flow=grid&view=0

//PLUGINS//
//https://github.com/kayahr/jquery-fullscreen-plugin

//shortcut for document.ready
$(function(){
	//console.log(Colors.ids);
	//test to see if we are already in fullscreen mode
	if($(document).fullScreen()){
		console.log('in fullscreen');
	}else{
		console.log('not in fullscreen');
	}
	
	//events
	$('#fullScreen').click(function(e){
		$(document).fullScreen(true);
		$('#intro').fadeOut('fast', function(){
			console.log('ok');
			console.log($(document))
		});
	});
	
	
	$(document).bind("fullscreenchange", function() {
	    console.log("Fullscreen " + ($(document).fullScreen() ? "on" : "off"));
	});
	
	$(document).bind("fullscreenerror", function() {
	    alert("Browser rejected fullscreen change");
	});
});