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
			isFullScreen = false,
			$playa = $("#playa");
			
		//setup the correct intro
		var intro = _.template($('#desktop-standard').html());
		$('#intro').html(intro);
		
		$('#fullScreen').click(function(e){
			$(document).fullScreen(true);
		});
		
		
		$(document).bind("fullscreenchange", function() {
			isFullScreen = $(document).fullScreen();
			if(!isFullScreen){
				$playa.jPlayer("stop");
				$('body,html').removeClass($('html, body').data('colorClass'));
				$('#intro').fadeIn('fast');
			}else{
				$('#intro').fadeOut('fast', function(){
					$playa.jPlayer("play");
				});
				$('body, html').addClass('color1').data('colorClass', 'color1');
			}
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
		
		//AUDIO PART
		$playa.jPlayer({
	        ready: function(event) {
	            $(this).jPlayer("setMedia", {
	                m4a: "/public/music/test.m4a"
	            });
	        },
	        swfPath: "public/js/plugins",
	        supplied: "m4a",
	        solution:"flash,html"
	    });
	},
	noFullScreen:function(){
		
	}
}