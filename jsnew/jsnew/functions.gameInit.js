
var bellhopClient,
	bellhopReady = false,
	springrollLoaded = false,
	gameContainerSetup = false,
	awardActive = false;

var _gameSettingsURL = "../../php/gameSettings.php";

var gameInitFunctions = function() {

	constructAwards();

	var _this = this;

	var bellhop;
	
	// standard functions to load on useragent dom is ready
	_this.documentReady = function() {
		sizeGameFrame();

		$(document).on('click', '.gameNav a.btn-game', function(event){
			event.preventDefault();
		});

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
		console.log('resizing');
		sizeGameFrame();
	};
	_this.documentEvents = function() {
		/**
		* Triggers to watch for launch game and check for each to be true
		**/
		$(document).on('USERAGENT_INFO_LOADED', function(){
			if(gameContainerSetup === false){
				console.log('No previous game container detected so start creating a new one')
				setupGameContainer();
			};

		});
		$(document).on('SPRINGROLL_LOADED', setupGameContainer);
		$(document).on('AWARDS_LOADED', setupGameContainer);

		$(document).on('click', '.btn-game-showAward', function() {
			
			initGameAchievement(5);
			initGameAchievement(10);
			initGameAchievement(28);
			initGameAchievement(31);

		});


		$(document).on('click', '.award-info .btn-ao', function(event) {

			$('[data-overlay="award"]').removeClass('showOverlay');
			awardActive = false;
			

			setTimeout(function(){

				$(document).trigger('RESUME_GAME');				
				checkQueue();
			}, 250);

			//bellhop.send('resumeGame');

		});
		
		$(document).on('click', '.displayLogin .btn-ao-join, .overlay-minimize', function(event) {
			$('[data-overlay="createagent"]').toggleClass('showOverlay');
		});
		
	};
	
};
var gameInitInstance = gameInitInstance || new gameInitFunctions();

$(document).ready(gameInitInstance.documentReady());

window.onresize = function(event) {
    gameInitInstance.documentResize()
};

$(document).on('org_pbskids_parentsbar_HeadbandEvent_HeadbandReady', function(event) {
    gameInitInstance.documentResize();
});



function getWinSize() {
	return winSize = {
		x:$(window).width(),
		y:$(window).height()
	};
};

function sizeGameFrame(){

		getWinSize();

	var gameNavSize = {
		y: $('.gameNav').outerHeight(true) + 40,
		x: $('.gameNav').outerWidth(true)
	};

	console.log('gameNavSize: ', gameNavSize);
	console.log('winSize: ', winSize);

	// 1024 x 768 (height to width) ratio: 133.33333333333333333333333333333
	// 1024 x 768 (width to height) ratio: 75
	var ratio = {
		y: 1.3333333333333333333333333333333,
		x: 0.75
	};

	var gameSize = {

		y: (winSize.y - gameNavSize.y) / 100 * 98,
		x: ((winSize.y - gameNavSize.y) / 100 * 98) * ratio.y

	};

	if(gameSize.x > winSize.x) {

		gameSize = {
			y: winSize.x * ratio.x,
			x: winSize.x
		};

	};

	console.log('gameSize: ', gameSize);

	$('#game').css({
	});

	$('#game').css({
		top: ((gameNavSize.y / 2) + (winSize.y / 2) - 40) + 'px',
		width: gameSize.x + 'px',
		height: gameSize.y + 'px'

	});
/*
	$('#game').height(gameSize.y);
	$('#game').width(gameSize.x);
*/
};

/**
* Game Initialization function to load game into iframe#game when both useragentInfoLoaded & springrollLoaded return true
**/
function setupGameContainer(){

	if(awardsLoaded === true && useragentInfoLoaded === true && springrollLoaded === true){

		console.error('userLogin: ', userLogin);
		console.log('Game is set to launch! Proceeding with springroll and bellhop load');

		userLogin[0].awardCache = userLogin[0].awardCache || [];

		var containerId = 'game';
		
		gameContainer = new springroll.Container('#' + containerId, {
			soundButton: '.btn-game-toggleMute',
			captionsButton: '.btn-game-toggleCaptions',
			pauseButton: '.btn-game-togglePlay',
			helpButton: '.btn-game-toggleHelp',
			keepFocus: false
		});

		gameContainerSetup = true;

		initGame(gameContainer, containerId);

	} else {
		console.error('Not Ready to Launch Game yet, Waiting for info to load still');
		return;
	}	
};



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

		bellhop.on('add-award', function(event){


			var id = event.data;
			initGameAchievement(id, bellhop)
		});
		$(document).on('PAUSE_GAME', function() {
			bellhop.send('pauseGame');
			console.log('pauseGame has been sent');
		});
		$(document).on('RESUME_GAME', function() {
			bellhop.send('resumeGame');
			console.log('resumeGame has been sent');
		});

		$(document).on('USERAGENT_INFO_LOADED', function(){
			console.log('User info being sent: ', userLogin[0]);
		    bellhop.send('user', userLogin[0]);
		});

		
		function _setValueComplete (result) { // jshint ignore:line
			console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SET!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("* Set value successfully in DB.");
			console.trace(result);
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");
		}

		function _setValueError (result) {
			console.warn("* Error setting value in DB: " + result);
		}
			
		function _getValueComplete (result,group) {
			// DEBUG
			console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GOT!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("* Received Key " + result.key + " with value " + result.value  + " from group "+ group);
			console.log("* Now trying to send it back to the game via "+bellhop);
			console.trace(result);
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");

			var returnData = {key: result.key, value:result.value, group:group};

			bellhop.send('get-result', returnData);
		}

		function _getValueError (result) {
			console.log("* ERROR GETTING VALUE from DB: " + result);
		}

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



function initGameAchievement(id){

	userLogin[0].awardQueue.push(id);
	
	if(!awardActive) {
		showAward(id)
	};

	//bellhop.send('pauseGame');
	
};
function checkQueue(){
	if(userLogin[0].awardQueue.length > 0){
		showAward(userLogin[0].awardQueue[0]);
	}else{
		console.error('AWARD QUEUE IS EMPTY')
	}
};
function showAward(id) {

	$(document).trigger('PAUSE_GAME');

	awardActive = true;
	//gameContainer.set('paused');

	console.log('userLogin[0]: ', userLogin[0])
	//gameContainer.set(paused);

	//store awards in cach incase user doesnt have an active pbs account to link with
	userLogin[0].awardCache.push(id);

	// add achievement to user account
	achievements.add(id, 'UNLOCKED');

	//loop threough all the looaded site awards to find matching id
	for(var i=0; i < site.awards.length; i++) {

		if(site.awards[i].id == id) {

            $('.displayAward .award-img img').attr('src', '/oddsquad/img/awards/' + site.awards[i].src);
            $('.displayAward .award-info h4').html(site.awards[i].name);
            $('.displayAward .award-info p').html(site.awards[i].desc);

		};
	};
	

	//show the overlay with updated content
	$('[data-overlay="award"]').addClass('showOverlay');

	userLogin[0].awardQueue.shift();
}