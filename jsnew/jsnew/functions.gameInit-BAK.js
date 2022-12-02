var bellhopClient,
	bellhopReady = false,
	springrollLoaded = false;

var _gameSettingsURL = "../../php/gameSettings.php";

var gameInitFunctions = function() {
	var _this = this;

	var bellhop;
	
	// standard functions to load on useragent dom is ready
	_this.documentReady = function() {
		
		/**
		 * Load spring roll script, then initialize trigger to load game and check for useragentInfoLoaded === true or wait for it
		 */
		$.getScript( "http://springroll-tc.pbskids.org/dist/container.min.js" )
		  .done(function( script, textStatus ) {
		    console.log('JS GET SCRIPT DONE');
		    console.log('------------------');
		    console.log( textStatus );
		   
		    springrollLoaded = true;
			$(document).trigger( "SPRINGROLL_LOADED" );
			
		  })
		  .fail(function( jqxhr, settings, exception ) {
		    console.log('JS GET SCRIPT FAIL');
		    console.log('------------------');
		    console.log('jqxhr: ', jqxhr);
		    console.log('settings: ', settings);
		    console.log('exception: ', exception);
		});

		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on useragent dom is resized
	_this.documentResize = function() {
		
	};
	_this.documentEvents = function() {
		/**
		* Triggers to watch for launch game and check for each to be true
		**/
		$(document).on('USERAGENT_INFO_LOADED', setupGameContainer);
		$(document).on('SPRINGROLL_LOADED', setupGameContainer);
		$(document).on('click', '.btn-game-showAward, [data-overlay]', function(event) {
			$('body').toggleClass('showOverlay');
		});
	};
	
};
var gameInitInstance = gameInitInstance || new gameInitFunctions();

$(document).ready(gameInitInstance.documentReady());	

/**
* Game Initialization function to load game into iframe#game when both useragentInfoLoaded & springrollLoaded return true
**/
function setupGameContainer(){

	if(useragentInfoLoaded === true && springrollLoaded === true){
		console.log('Game is set to launch! Proceeding with springroll and bellhop load');

		var containerId = 'game';
		var container = new springroll.Container('#' + containerId, {
			soundButton: '.btn-game-toggleMute',
			captionsButton: '.btn-game-toggleCaptions',
			pauseButton: '.btn-game-togglePlay'
		});

		initGame(container, containerId);

	} else {
		console.error('Not Ready to Launch Game yet, Waiting for info to load still');
		return;
	}	
}



function initGame(container, containerId){

	container.on('open', function() {
		
		// Create the bellhop object
	    bellhop = new Bellhop();

	    // Pass in the iframe DOM object
	    bellhop.connect(document.getElementById(containerId));

	    // Listen for the 'init' event from the iframe
	    bellhop.on('init', function(event){

		    // Send user data to the iframe
			console.log('User info being sent: ', userLogin[0]);
		    bellhop.send('user', userLogin[0]);
	    });

		bellhop.on('user', function(event){
			console.log("received bellhop user:");
			// Capture the data from the event
			var user = event.data;
			console.log(user);
		});

		bellhop.on('set-item', setInDB);

		bellhop.on('get-item', getFromDB);

		function setInDB (event){

			console.log("SET |   "+event.data.key+" to "+event.data.value);

			var settings = {
				a     : "set",
				key   : event.data.key,
				value : event.data.value
			};

			try {
				$.ajax({
					type     : "POST",
					url      : _gameSettingsURL,
					data     : settings,
					success  : _setValueComplete,
					error    : _setValueError,
					dataType : "json"
				});
			} catch (e) {
				console.warn("error setting value to db: " + e);
			}
		}

		function getFromDB (event){

			console.log("GET |   "+event.data.key);

			var settings = {
				a    		 : "get",
				key  		 : event.data.key
			};

			try {
				$.ajax({
					type     : "POST",
					url      : _gameSettingsURL,
					data     : settings,
					success  : function(evt) {_getValueComplete(evt,event.data.group); },
					error    : _getValueError,
					dataType : "json"
				});
			} catch (e) {
				console.log("error getting value from db: " + e);
			}
		}
		/**
		var sendEvent = new Event("SEND_TEST");
		sendEvent.data = {key:"testKey3", value:"threeeepeeoh"};
		setInDB(sendEvent);

		setTimeout(function(){ 
			var getEvent = new Event("GET_TEST");
			getEvent.data = {key:"testKey3", group: "theOneAndOnly"};
			getFromDB(getEvent);

		}, 5000);
		*/

	});

	container.open();
}
