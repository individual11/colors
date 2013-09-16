Sammy.debug = true;
var app = Sammy('#main', function(){
	this.get('/#/track/:trackNumber', function(context) {
		console.log("here 1");
		var currentPosition = Number(this.params['trackNumber']);
		if(((isDesktop && isFullScreen) || isTouch) && currentPosition != NaN){
	        var currentPrev = (Colors.position > 1)? Colors.position-1:Colors.length,
			currentNext = (Colors.position < Colors.length)? Colors.position+1:1;
			
			//set the colors accordingly
			Colors.utils.changeColor($htmlBody, String("color" + Colors.position), String("color" + currentPosition));
			Colors.utils.changeColor($('#leftSide'), String("tri-color" + currentPrev), String("tri-color" + ((currentPosition > 1)? currentPosition-1:Colors.length)));
			Colors.utils.changeColor($('#rightSide'), String("tri-color" + currentNext), String("tri-color" + ((currentPosition < Colors.length)? currentPosition+1:1)));
			
			Colors.position = currentPosition;
			
			console.log('you getting here? - 1');
			
			//change the song
			$playa.jPlayer("setMedia", {
	            mp3: Colors.core.root + "public/music/" + Colors.position + ".mp3"
	        }).jPlayer("play");
			
			
		}else{
			//console.log(Colors.core.root);
			app.setLocation('#');
		}
     });

this.notFound = function(){
	    console.log("bad path");
	}
     this.get(/.*/, function() { 
		  console.log("HERE HERE");
	});

     this.get("/", function(context){
	    //console.log('meh'); 
	    console.log(context);
     });
});