var Colors = Colors ||{};
Colors.position = 1;
Colors.length = 15;
			  
Colors.initialize = {
	touch:function(){
		
	},
	desktop:function(){
		var docWidth = $(window).width(),
			rightThreshold = docWidth * .8,
			leftThreshold = docWidth * .2,
			isFullScreen = false,
			$playa = $("#playa"),
			$intro = $('#intro'),
			$htmlBody = $('html,body');
			
		//setup the correct intro
		$intro.html(_.template($('#desktop-standard').html()));
		
		$('#fullScreen').click(function(e){
			$(document).fullScreen(true);
		});
		
		
		$(document).bind("fullscreenchange", function() {
			isFullScreen = $(document).fullScreen();
			if(!isFullScreen){
				$playa.jPlayer("stop");
				$htmlBody.removeClass(String("color" + Colors.position));
				$intro.fadeIn('fast');
				$('.sidebar.open').removeClass('open');
			}else{
				$intro.fadeOut('fast', function(){
					$playa.jPlayer("play");
				});
				$htmlBody.addClass(String("color" + Colors.position));
				
			}
		});
		
		$(document).bind("fullscreenerror", function() {
		    console.log("Browser rejected fullscreen change");
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
		
		//side clicks
		$('.sidebar').click(function(e){
			var $this = $(this),
				dir = $this.data('direction');
				currentPosition = Colors.position,
				currentPrev = (currentPosition > 1)? currentPosition-1:Colors.length,
				currentNext = (currentPosition < Colors.length)? currentPosition+1:1;
				
			//ok, so where are we going?
			if(dir === 'next'){
				currentPosition++;
				if(currentPosition > Colors.length){
					currentPosition = 1;
				}
			}else{
				currentPosition--;
				if(currentPosition < 1){
					currentPosition = Colors.length;
				}
			}
			//set the colors accordingly
			changeColor($htmlBody, String("color" + Colors.position), String("color" + currentPosition));
			changeColor($('#leftSide'), String("color" + currentPrev), String("color" + ((currentPosition > 1)? currentPosition-1:Colors.length)));
			changeColor($('#rightSide'), String("color" + currentNext), String("color" + ((currentPosition < Colors.length)? currentPosition+1:1)));
			
			Colors.position = currentPosition;
			
			//change the song
			$playa.jPlayer("setMedia", {
                mp3: "/public/music/" + Colors.position + ".mp3"
            }).jPlayer("play");
			
			function changeColor(who, from, to){
				if(who.hasClass(from)) who.removeClass(from);
				
				who.addClass(to);
			}
			
		})
		
		//AUDIO PART
		$playa.jPlayer({
	        ready: function(event) {
	            $(this).jPlayer("setMedia", {
	                mp3: "/public/music/" + Colors.position + ".mp3"
	            });
	        },
	        swfPath: "public/js/plugins",
	        supplied: "mp3",
	        solution:"flash,html"
	    });
	},
	noFullScreen:function(){
		
	}
}