$(document).bind("org_pbskids_login_LoginEvent_LoggedIn", function () {
	location.reload();
});

$(document).bind("org_pbskids_login_LoginEvent_LoggedOut", function () {
    location.reload();
});

var gameContainerSetup = false;
var	awardActive = false;
var containerId = $('root');


var gameInitFunctions = function() {

	constructAwards();

	var _this = this;

	
	// standard functions to load on useragent dom is ready
	_this.documentReady = function() {
		sizeGameFrame(containerId);

		$(document).on('click', '.gameNav a.btn-game', function(event){
			event.preventDefault();
		});


		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on useragent dom is resized
	_this.documentResize = function() {
		console.log('resizing');
		sizeGameFrame(containerId);
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

function getWinSize() {
	return winSize = {
		x:$(window).width(),
		y:$(window).height()
	};
};

function sizeGameFrame(containerId){

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

	$(containerId).css({
	});

	$(containerId).css({
		top: ((gameNavSize.y / 2) + (winSize.y / 2) - 40) + 'px',
		width: gameSize.x + 'px',
		height: gameSize.y + 'px'

	});

};

/**
* Game Initialization function to load game into iframe#game when both useragentInfoLoaded & springrollLoaded return true
**/
function setupGameContainer(){

	if(awardsLoaded === true && useragentInfoLoaded === true){

		console.log('userLogin: ', userLogin);
		console.log('Game is set to launch! Proceeding with any required load functions');

		userLogin[0].awardCache = userLogin[0].awardCache || [];

		gameContainerSetup = true;


	} else {
		console.log('Not Ready to Launch Game yet, Waiting for info to load still');
		return;
	}	
};



function initGameAchievement(id){


	if((userLogin[0].awardQueue.indexOf(id) === -1) && (userLogin[0].awardCache.indexOf(id) === -1) && (userLogin[0].awardsUnlocked.indexOf(id) === -1)){
		userLogin[0].awardQueue.push(id);
	}

	if(!awardActive) {
		showAward(id)
	}
	
};
function checkQueue(){
	if(userLogin[0].awardQueue.length > 0){

		if(userLogin[0].awardCache.indexOf(userLogin[0].awardQueue[0]) === -1){
			showAward(userLogin[0].awardQueue[0]);
		}
		else {
			userLogin[0].awardCache.shift();
			userLogin[0].awardQueue.shift();
		}
		

	}else{
		console.log('AWARD QUEUE IS EMPTY')
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

            $('.displayAward .award-img').html('<img src="/oddsquad/img/awards/' + site.awards[i].src + '" alt="Award">');
            $('.displayAward .award-info h4').html(site.awards[i].name);
            $('.displayAward .award-info p').html(site.awards[i].desc);

		};
	};
	

	//show the overlay with updated content
	$('[data-overlay="award"]').addClass('showOverlay');

	userLogin[0].awardQueue.shift();
}