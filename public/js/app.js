//VIDEOS//
//http://www.youtube.com/user/mpressof/videos?flow=grid&view=0

//PLUGINS//
//https://github.com/kayahr/jquery-fullscreen-plugin
//http://www.jplayer.org/

//shortcut for document.ready
$(function(){	
	//where am i?
	if(Modernizr.touch){
		//on touch device, so set it up that way
		Colors.initialize.touch();
	}else{
		//on desktop
		
		//make sure the desktop supports 
		if(Modernizr.fullscreen){
			Colors.initialize.desktop();
		}else{
			Colors.initialize.noFullScreen();
		}
	}
	

});