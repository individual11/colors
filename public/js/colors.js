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
		var docWidth = $(window).width(),
			rightThreshold = docWidth * .8,
			leftThreshold = docWidth * .2,
			isFullScreen = false;
		//setup the correct intro
		var intro = _.template($('#desktop-standard').html());
		$('#intro').html(intro);
		
		$('#fullScreen').click(function(e){
			$(document).fullScreen(true);
			$('#intro').fadeOut('fast');
		});
		
		
		$(document).bind("fullscreenchange", function() {
			isFullScreen = $(document).fullScreen();
			if(!isFullScreen){
				$('#intro').fadeIn('fast');
			}
		   // console.log("Fullscreen " + ($(document).fullScreen() ? "on" : "off"));
		});
		
		$(document).bind("fullscreenerror", function() {
		    alert("Browser rejected fullscreen change");
		});
		
		//checking for mousemovement
		$(document).mousemove(function(e){
			if(isFullScreen){
				var $rightSide = $('#rightSide'),
					$leftSide = $('#leftSide');
				if(e.pageX > rightThreshold){
					if(!$rightSide.hasClass('open')){
						$rightSide.addClass('open')
					}
				}else{
					if($rightSide.hasClass('open')){
						$rightSide.removeClass('open')
					}
				}
				
				if(e.pageX < leftThreshold){
					if(!$leftSide.hasClass('open')){
						$leftSide.addClass('open')
					}
				}else{
					if($leftSide.hasClass('open')){
						$leftSide.removeClass('open')
					}
				}
			}
		});
	},
	noFullScreen:function(){
		
	}
}