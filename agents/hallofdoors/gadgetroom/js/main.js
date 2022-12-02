require.config({
	"baseUrl": "js",
	"debug": false,
	"alias" : {
		"core" : [ "weblib/command/CommandPackage" ]
	}
})

require.include("data/RandomLines.js");
require.include( [ "globals.js", "data/gadgets.js" ] );
require.include("classes/ui/RandomTextScroller.js");
require.include("weblib/external/createjs.min.js");
require.include("weblib/asset/CreateJSAssetManager.js");

require.include ( "classes/managers/GadgetManager" );
require.include ( "classes/managers/SiteManager" );

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/// The name of the file to display.
var file = "oscar_tablet";

// The sprite currently displaying the file.
var sprite;

// The current frame of the file.
var currentFrame = 0;

// The number of frames in the file.
var numFrames = 0;

// Whether the left arrow is currently pressed.
var leftPressed = false;

// Whether the right arrow is currently pressed.
var rightPressed = false;

// The asset manager to load the assets with.
var assetManager;

/**
 * Load complete handler, used to add a sprite to the stage.
 */
function loadComplete() {
	
}




/**
 * Clear the currently loaded file.
 */
function clearFile() {
	
}

/**
 * Load a given file.
 * @param  {string} fileName The name of the file to load, without an extension. For example "gridinator"
  */
function loadFile(fileName){

	file = fileName;

	// load the new file.
	CreateJSAssetManager.load ( {
		"assets" : [ { "id" : file, "src" : file } ]});
}

// Run init when the document is ready.
$(document).ready( function () {

	console.log ( ss.SiteManager );
	ss.SiteManager.init ();
	ss.SiteManager.load ( DATA [ 0 ] );

	$ ( window ).resize ( function () {
		ss.SiteManager.resize ();
	} )
} );