var Colors = Colors ||{};
Colors.ids = ['MU27T04Zlok',
			  'PPpe9J196JM',
			  'DjHxwO87uM4',
			  'PO6iM8AnonY',
			  'XGz0BGL6xdI',
			  'wqmctOeHJDs',
			  'E2SlHNAkD6Q',
			  '6IaTV943zIE',
			  'gtN8CkY898U',
			  'U-UuhSUMtQY',
			  'COgo3fPYBjg',
			  '9UUqqcRmGAk',
			  'o6n0c2SkIN0',
			  '2wOdHoRI0Gs',
			  'T5jAU3HhIRE'];
			  
Colors.initialize = {
	touch:function(){
		
	},
	desktop:function(){
		$('#fullScreen').click(function(e){
			$(document).fullScreen(true);
			$('#intro').fadeOut('fast');
		});
		
		
		$(document).bind("fullscreenchange", function() {
		    console.log("Fullscreen " + ($(document).fullScreen() ? "on" : "off"));
		});
		
		$(document).bind("fullscreenerror", function() {
		    alert("Browser rejected fullscreen change");
		});
	},
	noFullScreen:function(){
		
	}
}