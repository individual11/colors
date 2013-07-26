//main object
var Colors = Colors ||{};
Colors.position = 1;
Colors.length = 15;

Colors.core = {
	changeTrack:function(trackNumber){
		if(Colors.position != trackNumber){
			app.setLocation('#/track/'+trackNumber);
		}
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

Colors.utils = {
	preload:function(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	    	(new Image()).src = this;
	    });
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
	        ended: function() { // The $.jPlayer.event.ended event
				Colors.core.nextTrack(); // go to next song
			},
	        swfPath: "public/js/plugins",
	        supplied: "mp3",
	        solution:"flash,html"
	    });
		
	},
	desktop:function(){
		isDesktop = true;
		//setup the correct intro
		$main.html(_.template($('#desktop-standard').html()));
		
		var $intro = $('#intro'),
			$triNav = $('#tri-nav'),
			$socialNav = $('#social-nav'),
			$rightSide = $('#rightSide'),
			$leftSide = $('#leftSide');
			
		//hide the bottom and top nav immediately
		$triNav.slideUp(1);
		//$socialNav.slideUp(1);
			
			
		//hide the mouse stuff
		var justHidden = false,
			hideMouseTimeout,
			mouseTimer = 1000;
			
		//preload images		
		Colors.utils.preload([
			'public/img/triangles/bottom_nav.png',
		    'public/img/triangles/1.png',
		    'public/img/triangles/2.png',
		    'public/img/triangles/3.png',
		    'public/img/triangles/4.png',
		    'public/img/triangles/5.png',
		    'public/img/triangles/6.png',
		    'public/img/triangles/7.png',
		    'public/img/triangles/8.png',
		    'public/img/triangles/9.png',
		    'public/img/triangles/10.png',
		    'public/img/triangles/11.png',
		    'public/img/triangles/12.png',
		    'public/img/triangles/13.png',
		    'public/img/triangles/14.png',
		    'public/img/triangles/15.png',
		    'public/img/colorminutes_share.png'
		]);

		
		
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
				
				if($triNav.hasClass('up')){
					$triNav.removeClass('up').slideUp(1);
				}
				
				if($socialNav.hasClass('open')){
					$socialNav.removeClass('open');
				}
				
				clearTimeout(hideMouseTimeout);
				$('html').css({cursor: 'default'});
				isFullScreen = false;
				app.setLocation('/#');
				$('.sidebar').hide();//fixes a bug with body-width
			}else{
				$intro.fadeOut('fast', function(){
					$playa.jPlayer("play");
				});
				$htmlBody.addClass(String("color" + Colors.position));
				isFullScreen = true;
				$('.sidebar').show();//fixes a bug with body-width
			}
		});
		
		$(document).bind("fullscreenerror", function() {
		    console.log("Browser rejected fullscreen change");
		});
		
		$(document).keydown(function(e){
			switch(e.keyCode){
				case 37://left
					Colors.core.prevTrack();
					break;
				case 39://right
					Colors.core.nextTrack();
					break;
			}
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
		
		//bototm nav clicks
		$('.bottom-tri').click(function(e){
			Colors.core.changeTrack($(this).data('id'));
		});
	
		//checking for mousemovement
		$(document).mousemove(function(e){
			if(isFullScreen){
				var docWidth = $(window).width(),
				docHeight = $(window).height(),
				bottomThreshold = docHeight * .9,
				topThreshold = docHeight * .1,
				rightThreshold = docWidth * .8,
				leftThreshold = docWidth * .2;
				
				//left/right nav
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
				
				//for the bottom nav
				if(e.pageY > bottomThreshold){
					if(!$triNav.hasClass('up')){
						$triNav.addClass('up').slideDown('fast');
					}
				}else{
					if($triNav.hasClass('up')){
						$triNav.removeClass('up').slideUp('fast');
					}
				}
				
				//for the top social nav
				if(e.pageY < topThreshold){
					if(!$socialNav.hasClass('open')){
						$socialNav.addClass('open');
					}
				}else{
					if($socialNav.hasClass('open')){
						$socialNav.removeClass('open');
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
	        ended: function() { // The $.jPlayer.event.ended event
				Colors.core.nextTrack(); // go to next song
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
		$main.html(_.template($('#bad-browser').html()));
		var $intro = $('#intro');
	}
}