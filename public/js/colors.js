//main object
var Colors = Colors ||{};
Colors.position = 1;
Colors.length = 15;

Colors.core = {
	root:(window.location.hostname == 'github.io')? 'colors/':'//colorminutes.nfshost.com/',
	changeTrack:function(trackNumber){
		if(Colors.position != trackNumber){
			app.setLocation('#/track/'+trackNumber);
		}
	},
	nextTrack:function(){
		var currentPosition = Colors.position + 1;
		console.log(currentPosition);
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
    },
	changeColor:function(who, from, to){
		if(who.hasClass(from)) who.removeClass(from);
		
		who.addClass(to);
	}
}
			  
Colors.initialize = {
	touch:function(){
		isTouch = true;
		
		$main.html(_.template($('#mobile-standard').html()));

		var $intro = $('#intro'),
			$triNav = $('#bottom-nav'),
			$socialNav = $('#social-nav');
		
		$('#fullScreen').click(function(e){
			init();
		});

		//preload images		
		Colors.utils.preload([
			Colors.core.root + 'public/img/bottom-nav-mobile.png',
		    Colors.core.root + 'public/img/colorminutes_share.png'
		]);


		function swipeUp(){
			if($triNav.hasClass('up')){
		 		$triNav.removeClass('up');
		 	}else if(!$socialNav.hasClass('open')){
		 		$socialNav.addClass('open');
		 	}
		}

		function swipeDown(){
			if($socialNav.hasClass('open')){
				$socialNav.removeClass('open');
			}else if(!$triNav.hasClass('up')){
		 		$triNav.addClass('up');
			}
		}

		function init(){
			$("#bottom-nav").css("width", "100%")
			$intro.fadeOut('fast', function(){
				$playa.jPlayer("play");
			});
			$htmlBody.addClass(String("color" + Colors.position));
			
			var insurePlay = setTimeout(function(){
				$playa.jPlayer("play");
			}, 1000);

			$intro.fadeOut('fast', function(){
				$playa.jPlayer("play");
				clearTimeout(insurePlay)
			});

			$('body').on('tap', function(e, touch){
				var w = document.width;
				var h = document.height;
				var tapZonePercent = .15;
				var tapZoneW = w * tapZonePercent;
				var x = touch.position.x;
				var y = touch.position.y;
				if(x > w - tapZoneW){
					Colors.core.nextTrack();
				}else if(x < tapZoneW ){
					Colors.core.prevTrack();
				}else if(y > 50 && y < h - 100){
					if($socialNav.hasClass('open')){
						$socialNav.removeClass('open');
					}
					if($triNav.hasClass('up')){
				 		$triNav.removeClass('up');
				 	}
				}
			});

			//detect swipes
    		$("body").touchwipe({
			     wipeLeft: Colors.core.nextTrack,
			     wipeRight: Colors.core.prevTrack,
			     wipeUp: swipeUp,
			     wipeDown: swipeDown,
			     min_move_x: 20,
			     min_move_y: 20,
			     preventDefaultEvents: true
			});

			//bototm nav clicks
			$('.bottom-tri').click(function(e){
				Colors.core.changeTrack($(this).data('id'));
			});
			//gotta kick it off
			app.run();
		}
		
		//AUDIO PART
		$playa.jPlayer({
	        ready: function(event) {
	        	console.log("said it was good");	
	            $(this).jPlayer("setMedia", {
	                mp3: Colors.core.root + "public/music/" + Colors.position + ".mp3"
	            });
	        },
	        ended: function() { // The $.jPlayer.event.ended event
				Colors.core.nextTrack(); // go to next song
			},
	        swfPath: Colors.core.root + "public/js/plugins",
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
			$leftSide = $('#leftSide'),
			$popup = $('#popup');
			
		//hide the bottom and top nav immediately
		$triNav.slideUp(1);
		//$socialNav.slideUp(1);
			
			
		//hide the mouse stuff
		var justHidden = false,
			hideMouseTimeout,
			mouseTimer = 1000;
			
		//preload images		
		Colors.utils.preload([
			Colors.core.root + 'public/img/triangles/bottom_nav.png',
		    Colors.core.root + 'public/img/triangles/1.png',
		    Colors.core.root + 'public/img/triangles/2.png',
		    Colors.core.root + 'public/img/triangles/3.png',
		    Colors.core.root + 'public/img/triangles/4.png',
		    Colors.core.root + 'public/img/triangles/5.png',
		    Colors.core.root + 'public/img/triangles/6.png',
		    Colors.core.root + 'public/img/triangles/7.png',
		    Colors.core.root + 'public/img/triangles/8.png',
		    Colors.core.root + 'public/img/triangles/9.png',
		    Colors.core.root + 'public/img/triangles/10.png',
		    Colors.core.root + 'public/img/triangles/11.png',
		    Colors.core.root + 'public/img/triangles/12.png',
		    Colors.core.root + 'public/img/triangles/13.png',
		    Colors.core.root + 'public/img/triangles/14.png',
		    Colors.core.root + 'public/img/triangles/15.png',
		    Colors.core.root + 'public/img/colorminutes_share.png'
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
				app.setLocation('#');
				$('.sidebar').hide();//fixes a bug with body-width
			}else{
				var insurePlay = setTimeout(function(){
														$playa.jPlayer("play");
													}, 1000);
				$intro.fadeOut('fast', function(){
					$playa.jPlayer("play");
					clearTimeout(insurePlay)
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
	                mp3: Colors.core.root + "public/music/" + Colors.position + ".mp3"
	            });
	        },
	        ended: function() { // The $.jPlayer.event.ended event
				Colors.core.nextTrack(); // go to next song
			},
	        swfPath: Colors.core.root + "public/js/plugins",
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