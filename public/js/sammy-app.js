var app = Sammy('#main', function(){
	this.get('/#/track/:trackNumber', function(context) {
		console.log(isDesktop, isFullScreen);
		if(isDesktop && isFullScreen || isTouch){
	        var currentPosition = this.params['trackNumber'];
	        
	        var currentPrev = (currentPosition > 1)? currentPosition-1:Colors.length,
			currentNext = (currentPosition < Colors.length)? currentPosition+1:1;
			
			//set the colors accordingly
			changeColor($htmlBody, String("color" + Colors.position), String("color" + currentPosition));
			changeColor($('#leftSide'), String("color" + currentPrev), String("color" + ((currentPosition > 1)? currentPosition-1:Colors.length)));
			changeColor($('#rightSide'), String("color" + currentNext), String("color" + ((currentPosition < Colors.length)? currentPosition+1:1)));
			
			Colors.position = currentPosition;
			
			//change the song
			$playa.jPlayer("setMedia", {
	            mp3: "public/music/" + Colors.position + ".mp3"
	        }).jPlayer("play");
			
			function changeColor(who, from, to){
				if(who.hasClass(from)) who.removeClass(from);
				
				who.addClass(to);
			}
		}
     });
     
     this.get("/", function(context){
	    //console.log('meh'); 
     });
});