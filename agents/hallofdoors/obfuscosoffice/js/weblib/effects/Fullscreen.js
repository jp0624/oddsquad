/* global isEmpty */

require.include("weblib/ssnamespace");

var Effects = Effects || {};

//Create a namespaced instance of this object
ss.Effects = Effects;

//[Element] - The DOM Element on which fullscreen will be called by default
Effects._defaultFullScreenElem = document.body;

/*
* Enter fullscreen mode on a given element.
* @param element (optional) -> the element on the page to make fullscreen.
*/
ss.Effects.enterFullScreen = function (element) {
	"use strict";

	// use document as the default.
	if(isEmpty(element)) {
		//element = document.body;
		element = ss.Effects._defaultFullScreenElem;
	}

	if(element.webkitRequestFullScreen) {
		element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);		
	}else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	}else if (element.requestFullScreen) {
		element.requestFullScreen();
	}else if(element.msRequestFullscreen){
		if(document.msFullscreenElement){
			document.msExitFullscreen();
		}else{
			element.msRequestFullscreen();			
		}
	}

	ss.Effects.isFullScreen = true;
};

/*
* Exit Fullscreen mode.
*/
ss.Effects.exitFullScreen = function () {
	"use strict";

	if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();		
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();		
	} else if (document.exitFullScreen) {
		document.exitFullScreen();		
	} else if(document.msExitFullscreen){
		document.msExitFullscreen();
	}

	ss.Effects.isFullScreen = false;
};

/*
* Toggle fullscreen mode on a given element.
* @param element (optional) -> the element on the page to make fullscreen.
*/
ss.Effects.toggleFullScreen = function (element) {	
	if(isEmpty(element)) {
		//element = document.body;
		element = ss.Effects._defaultFullScreenElem;
	}

	if(ss.Effects.isFullScreen) {
		ss.Effects.exitFullScreen ();
	} else {
		ss.Effects.enterFullScreen(element);
	}

}

/*
* Set the element from which any fullscreen requests should be called
* @param element:[Element] - The DOM Element on which fullscreen will be called by default
*/
ss.Effects.setDefaultFullScreenElement = function(element){
	ss.Effects._defaultFullScreenElem = element;
}