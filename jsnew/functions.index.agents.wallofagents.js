// =======================================================
//                GLOBAL VARIABLES
// -------------------------------------------------------


// =======================================================
//           GLOBAL DOCUMENT FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var IndexAgentsWallofAgentsFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		
			
		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {

	};
	_this.documentEvents = function() {

	};
	
};

var indexAgentsWallofAgentsInstance = indexAgentsWallofAgentsInstance || new IndexAgentsWallofAgentsFunctions();


// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(indexAgentsWallofAgentsInstance.documentReady());
$(window).resize(indexAgentsWallofAgentsInstance.documentResize());

