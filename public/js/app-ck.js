/*! build 2013-09-14 */
var $playa=$("#playa"),$main=$("#main"),$htmlBody=$("html,body"),isDesktop=!1,isTouch=!1,isFullScreen=!1,Colors=Colors||{};Colors.position=1,Colors.length=15,Colors.core={root:"github.io"==window.location.hostname?"colors/":"",changeTrack:function(a){Colors.position!=a&&app.setLocation("#/track/"+a)},nextTrack:function(){var a=Colors.position+1;a>Colors.length&&(a=1),Colors.core.changeTrack(a)},prevTrack:function(){var a=Colors.position-1;1>a&&(a=Colors.length),Colors.core.changeTrack(a)}},Colors.utils={preload:function(a){$(a).each(function(){(new Image).src=this})},changeColor:function(a,b,c){console.log("ok"),a.hasClass(b)&&a.removeClass(b),a.addClass(c)}},Colors.initialize={touch:function(){isTouch=!0,$main.html(_.template($("#mobile-standard").html())),$("#intro"),"standalone"in window.navigator&&!window.navigator.standalone&&($("body").css("min-height",$(window).height()+60),setTimeout(function(){window.scrollTo(0,1)},100)),$playa.jPlayer({ready:function(){$(this).jPlayer("setMedia",{mp3:"public/music/"+Colors.position+".mp3"})},ended:function(){Colors.core.nextTrack()},swfPath:"public/js/plugins",supplied:"mp3",solution:"flash,html"})},desktop:function(){function a(){$("html").css({cursor:"none"}),h=!0,setTimeout(function(){h=!1},500)}isDesktop=!0,$main.html(_.template($("#desktop-standard").html()));var b=$("#intro"),c=$("#tri-nav"),d=$("#social-nav"),e=$("#rightSide"),f=$("#leftSide");$("#popup"),c.slideUp(1);var g,h=!1,i=1e3;Colors.utils.preload(["public/img/triangles/bottom_nav.png","public/img/triangles/1.png","public/img/triangles/2.png","public/img/triangles/3.png","public/img/triangles/4.png","public/img/triangles/5.png","public/img/triangles/6.png","public/img/triangles/7.png","public/img/triangles/8.png","public/img/triangles/9.png","public/img/triangles/10.png","public/img/triangles/11.png","public/img/triangles/12.png","public/img/triangles/13.png","public/img/triangles/14.png","public/img/triangles/15.png","public/img/colorminutes_share.png"]),$("#fullScreen").click(function(){$(document).fullScreen(!0)}),$(document).bind("fullscreenchange",function(){if(isFullScreen=$(document).fullScreen()){var a=setTimeout(function(){$playa.jPlayer("play")},1e3);b.fadeOut("fast",function(){$playa.jPlayer("play"),clearTimeout(a)}),$htmlBody.addClass(String("color"+Colors.position)),isFullScreen=!0,$(".sidebar").show()}else $playa.jPlayer("stop"),$htmlBody.removeClass(String("color"+Colors.position)),b.fadeIn("fast"),$(".sidebar.open").removeClass("open"),c.hasClass("up")&&c.removeClass("up").slideUp(1),d.hasClass("open")&&d.removeClass("open"),clearTimeout(g),$("html").css({cursor:"default"}),isFullScreen=!1,app.setLocation("#"),$(".sidebar").hide()}),$(document).bind("fullscreenerror",function(){console.log("Browser rejected fullscreen change")}),$(document).keydown(function(a){switch(a.keyCode){case 37:Colors.core.prevTrack();break;case 39:Colors.core.nextTrack()}}),$(".sidebar").click(function(){var a=$(this),b=a.data("direction");"next"===b?Colors.core.nextTrack():Colors.core.prevTrack()}),$(".bottom-tri").click(function(){Colors.core.changeTrack($(this).data("id"))}),$(document).mousemove(function(b){if(isFullScreen){var j=$(window).width(),k=$(window).height(),l=.9*k,m=.1*k,n=.8*j,o=.2*j;b.pageX>n?e.hasClass("open")||e.addClass("open"):e.hasClass("open")&&e.removeClass("open"),b.pageX<o?f.hasClass("open")||f.addClass("open"):f.hasClass("open")&&f.removeClass("open"),b.pageY>l?c.hasClass("up")||c.addClass("up").slideDown("fast"):c.hasClass("up")&&c.removeClass("up").slideUp("fast"),b.pageY<m?d.hasClass("open")||d.addClass("open"):d.hasClass("open")&&d.removeClass("open"),h||(h=!1,clearTimeout(g),$("html").css({cursor:"default"}),g=setTimeout(a,i))}}),$playa.jPlayer({ready:function(){$(this).jPlayer("setMedia",{mp3:"public/music/"+Colors.position+".mp3"})},ended:function(){Colors.core.nextTrack()},swfPath:"public/js/plugins",supplied:"mp3",solution:"flash,html"}),app.run()},noFullScreen:function(){$main.html(_.template($("#bad-browser").html())),$("#intro")}},Sammy.debug=!0;var app=Sammy("#main",function(){this.get("/#/track/:trackNumber",function(){var a=Number(this.params.trackNumber);if((isDesktop&&isFullScreen||isTouch)&&0/0!=a){var b=Colors.position>1?Colors.position-1:Colors.length,c=Colors.position<Colors.length?Colors.position+1:1;console.log(typeof changeColor),Colors.utils.changeColor($htmlBody,String("color"+Colors.position),String("color"+a)),Colors.utils.changeColor($("#leftSide"),String("tri-color"+b),String("tri-color"+(a>1?a-1:Colors.length))),Colors.utils.changeColor($("#rightSide"),String("tri-color"+c),String("tri-color"+(a<Colors.length?a+1:1))),Colors.position=a,console.log("you getting here? - 1"),$playa.jPlayer("setMedia",{mp3:Colors.core.root+"public/music/"+Colors.position+".mp3"}).jPlayer("play")}else app.setLocation("#")}),this.get("/",function(a){console.log(a)})});$(function(){Modernizr.touch?Colors.initialize.touch():Modernizr.fullscreen?Colors.initialize.desktop():Colors.initialize.noFullScreen()});