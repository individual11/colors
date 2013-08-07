var app = Sammy('#main', function(){
	this.get(Colors.core.root + '/#/track/:trackNumber', function(context) {
		var currentPosition = Number(this.params['trackNumber']);
		if((isDesktop && isFullScreen || isTouch) && currentPosition != NaN){
	        var currentPrev = (Colors.position > 1)? Colors.position-1:Colors.length,
			currentNext = (Colors.position < Colors.length)? Colors.position+1:1;
			
			//set the colors accordingly
			changeColor($htmlBody, String("color" + Colors.position), String("color" + currentPosition));
			changeColor($('#leftSide'), String("tri-color" + currentPrev), String("tri-color" + ((currentPosition > 1)? currentPosition-1:Colors.length)));
			changeColor($('#rightSide'), String("tri-color" + currentNext), String("tri-color" + ((currentPosition < Colors.length)? currentPosition+1:1)));
			
			Colors.position = currentPosition;
			
			//change the song
			$playa.jPlayer("setMedia", {
	            mp3: "public/music/" + Colors.position + ".mp3"
	        }).jPlayer("play");
			
			function changeColor(who, from, to){
				console.log('new');
				if(who.hasClass(from)) who.removeClass(from);
				console.log(from, to);
				who.addClass(to);
			}
		}else{
			app.setLocation(Colors.core.root + '#');
		}
     });
     
     this.get("/", function(context){
	    //console.log('meh'); 
     });
});