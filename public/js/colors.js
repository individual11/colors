//main object
var Colors = Colors ||{};
Colors.position = 1;
Colors.length = 15;

Colors.core = {
	changeTrack:function(trackNumber){
		app.setLocation('#/track/'+trackNumber);
	},
	nextTrack:function(){
		var currentPosition = Colors.position + 1;
		if(currentPosition > Colors.length){
			currentPosition = 1;
		}
		Colors.core.changeTrack(currentPosition);
	},
	prevTrack:function(){
		var currentPosition = Colors.position - 1;
		if(currentPosition < 1){
			currentPosition = Colors.length;
		}
		Colors.core.changeTrack(currentPosition);
	}
}
			  
Colors.initialize = {
	touch:function(){
		isTouch = true;
		
		$main.html(_.template($('#mobile-standard').html()));
		var $intro = $('#intro');
		
		var fadeInTimeout = setTimeout(init, 1500);
		function init(){
			$intro.fadeOut('fast', function(){
				$playa.jPlayer("play");
			});
			$htmlBody.addClass(String("color" + Colors.position));
							
			/*
		http://stackoverflow.com/questions/2701139/standalone-jquery-touch-method
		$('.swipe').swipe({
		 swipeLeft: function() { $('#someDiv').fadeIn() },
		 swipeRight: function() { $('#someDiv').fadeOut() },
		})
		
		*/
		}
		
		//AUDIO PART
		$playa.jPlayer({
	        ready: function(event) {
	            $(this).jPlayer("setMedia", {
	                mp3: "public/music/" + Colors.position + ".mp3"
	            });
	        },
	        swfPath: "public/js/plugins",
	        supplied: "mp3",
	        solution:"flash,html"
	    });
		
	},
	desktop:function(){
	
		//setup the correct intro
		$main.html(_.template($('#desktop-standard').html()));
		
		var docWidth = $(window).width(),
			rightThreshold = docWidth * .8,
			leftThreshold = docWidth * .2,
			isDesktop = true,
			$intro = $('#intro');
			
			
		//hide the mouse stuff
		var justHidden = false,
			hideMouseTimeout,
			mouseTimer = 1000;
			
		
		
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
				clearTimeout(hideMouseTimeout);
				$('html').css({cursor: 'default'});
			}else{
				console.log('ok');
				$intro.fadeOut('fast', function(){
					$playa.jPlayer("play");
				});
				$htmlBody.addClass(String("color" + Colors.position));
			}
		});
		
		$(document).bind("fullscreenerror", function() {
		    console.log("Browser rejected fullscreen change");
		});
		
		//side clicks
		$('.sidebar').click(function(e){
			var $this = $(this),
				dir = $this.data('direction');
				
			//ok, so where are we going?
			if(dir === 'next'){
				Colors.core.nextTrack();
			}else{
				Colors.core.prevTrack();
			}
			
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
				
				//mouseMoveStuff
				if (!justHidden) {
		            justHidden = false;
		            clearTimeout(hideMouseTimeout);
		            $('html').css({cursor: 'default'});
		            hideMouseTimeout = setTimeout(hide, mouseTimer);
		        }
				
			}
			
		});
	
	
		function hide() {
		    $('html').css({cursor: 'none'});
		    justHidden = true;
		    setTimeout(function() {
		        justHidden = false;
		    }, 500);
		}
				
		//AUDIO PART
		$playa.jPlayer({
	        ready: function(event) {
	            $(this).jPlayer("setMedia", {
	                mp3: "public/music/" + Colors.position + ".mp3"
	            });
	        },
	        swfPath: "public/js/plugins",
	        supplied: "mp3",
	        solution:"flash,html"
	    });
	    
	    //SAMMY PART.. run the app
	    //app.raise_errors = true;
	    app.run();
	},
	noFullScreen:function(){
		
	}
}