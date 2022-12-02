// =======================================================
//                GLOBAL VARIABLES
// -------------------------------------------------------


// =======================================================
//           GLOBAL DOCUMENT FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var IndexAgentsFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		
		dashboardInstance.getData();
		setTimeout(function () {
			setStageStatus(0);
		}, 500);
			
		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {

	};
	_this.documentEvents = function() {

	};
	
};

var indexAgentsInstance = indexAgentsInstance || new IndexAgentsFunctions();


// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(indexAgentsInstance.documentReady());
$(window).resize(indexAgentsInstance.documentResize());

