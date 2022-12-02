// =======================================================
//                AWARDS SPECIFIC VARIABLES
// -------------------------------------------------------

var awardsLoaded = false,
	awardsCreated = false,
	awardsUpdated = false,
	awardsChecked = false,
	achievements = {};

// =======================================================
//              AWARDS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var AwardsFunctions = function() {
	var _this = this;		
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		console.log('--------------------- awards dom ready fired');

		_this.documentEvents();	// setup dom element event listeners
	};
	
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {

		//only do this reload if the hod overlay exists incase this is loaded on other pages
		/*
		if($('[data-overlay="awards"]').exists() == true) {
			//page reload/refresh
			location.reload();
		}
		*/
	};
	
	_this.documentEvents = function() {
		console.log('--------------------- awards dom events fired');
		// global event listeners for dynamicly created content post dom
		
	};
	
};

var awardsInstance = awardsInstance || new AwardsFunctions();

// =======================================================
//               AWARDS SPECIFIC FUNCTIONS
// -------------------------------------------------------

function constructAwards() {
	
	console.log('boom! 4');
	getAwards(getAwardsComplete);	
	
};
/**
 * Get awards details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing award details to be used throughout the site.
 */
function getAwards(doneFunction) {
	
	if(localTest){
		if(!achievements.unlocked) {
			achievements.unlocked = [];
			achievements.viewed = [];
			if(localTestlogin){
				achievements.unlocked[0] = 1;
				achievements.unlocked[1] = 2;
				achievements.unlocked[2] = 3;
				achievements.unlocked[3] = 4;
				achievements.unlocked[4] = 5;
				
				achievements.viewed[0] = 1;
				achievements.viewed[1] = 2;
				achievements.viewed[2] = 3;
				achievements.viewed[3] = 4;
				achievements.viewed[4] = 5;	
			} else {
				achievements.unlocked[0] = 1;
			};
		};
	};
		
	console.log('boom! 1');
	if(!awardsLoaded) {
		console.log('awards 1');
		copyJSONIntoObject('/oddsquad/json/awards.json', site, doneFunction);	
	}else{
		console.log('skipped - awards 1');
		doneFunction();
	};
}
/**
 * Function to fire when json has load has completed.
 */
function getAwardsComplete(doneFunction) {
	console.log('awards 2 +_+_+__+_+_+_+_+_+_+_+__++_+_+');
	awardsLoaded = true;
	$(document).trigger('AWARDS_LOADED');
	//doneFunction();
}
/**
 * Function to fire which grabs the award status and adds them to an achievements object.
 * @return {Object} - [achievements] An object containing award status to be used to open/unlock awards visually.
 */
function achievementsLoaded(unlocked, viewed) {
	awardsConfirmed = true;
	$(document).trigger('AWARDS_CONFIRMED');
}

/**
 * Scroll to the award
 * Open the award if it is unlocked but not yet set to viewed
 * @param  {string} self - a jQuery element in which to pull data from.
 */
function openAward(self) {
	
	var award = $(self).index('.award-lst li') + 1;
	gotoScroll('awardScroll', award - 1, 1000);
	
	// if award is unlocked then continue
	if($(self).attr('data-status') == 'unlocked') {

		// get the award # from its data attr then set award as viewed in database
		achievements.add(parseInt($(self).attr('data-award')), 'VIEWED', function(){
						
			// change status to viewed to animate award opening after added to database
			$(self).attr('data-status', 'viewed');
			
		});

	};
};
/**
 * Using the site array built from the json fetch begin building the awards carousel
 * @return AWARDS_CREATED {trigger} trigger set for function firing timing
 * @return awardsCreated {boolean} variable set to true once completed successfully
 */
function buildAwards() {
	console.log('awards 3');
	// set the main container for the carousel item container
	var container	= $('.award-lst');
	
	//console.log('getUnlockedAwards(): ', getUnlockedAwards());
	// set the total value of awards available in the details hexagon
	//$('.user-stats.awards-stats .accnt-tot').html(getUnlockedAwards());
	
	// cycle through the site.awards array and build the html for the carousel
	for (i = 0; i < site.awards.length; i++) {
		console.log('add award: ', site.awards[i].name);
		$(container).append('<li data-award="' + site.awards[i].id + '" data-status="locked" style="width: ' + 100 / site.awards.length + '%"><div class="sizer"></div><div class="sized"><div class="award-lights"></div><div class="award-stars"></div><div class="award-box"><img src="/oddsquad/img/agents/box-body.png" /></div><div class="award-lid"><img src="/oddsquad/img/agents/box-lid.png" /></div><div class="award-award"><img src="/oddsquad/img/awards/' + site.awards[i].src + '" /></div></div><div class="award-lock"><img src="/oddsquad/img/agents/box-lock.png" /></div></li>'); //'
	};	

	// determine the width needed for the carousel item container base on the number of doors to be displayed
	$(container).width(100 * site.awards.length + '%');
	
	// initialize a new carousel after all doors have been added
	awardScroll = new IScroll('.award-wrapper', {
		snap: true, // snaps to closest carousel item
		momentum: false, // stops excessive movement when set to false
		scrollX: true, // specifies left and right capabilities
		scrollY: false, // specifies left and right capabilities
		probeType: 3, // this probe type allows for tracking during carousel movement
		tap: true // allows for .on('tap') capabilities which only fires when scrolling movement hasnt been made.  This is to be used over on('click') as it fires in both sceneroes
	});
	
	probeCarousel('awardScroll');
	
	console.log('about to set the awards created trigger');
	// fire the trigger and change variable for function timing with dependancies
	awardsCreated = true;
	$(document).trigger ('AWARDS_CREATED');
	
};
/**
 * Calculate number of Unlocked awards
 * @return {string} representing total of opened/unlocked doors.
 */
function getUnlockedAwards() {

	return achievements.unlocked.length;
}
function updateAwardStats() {
	
	console.log('update award stats');
	
		$('.user-stats.awards-stats .accnt-tot').countTo({
			from: 0,
			to: site.awards.length,
			speed: 1000,
			refreshInterval: 150,
			onComplete: function(value) {
				console.debug(this);
			}
		});
		
		// detect if the user is logged in and set to 0 unlocked
		if(loggedIn()) {
			
			$('.user-stats.awards-stats .accnt-rec').countTo({
				from: 0,
				to: achievements.unlocked.length,
				speed: 1000,
				refreshInterval: 150,
				onComplete: function(value) {
					console.debug(this);
				}
			});
			//$('.user-stats.awards-stats .accnt-rec').html(awardsInstance.unlocked.length);
		} else {
			$('.user-stats.awards-stats .accnt-rec').html(0);
		};
};

function achievementsLoaded(unlocked, viewed) {
	
	console.log('AWARDS_CHECKED: FIRED');
	awardsChecked = true;
	$(document).trigger('AWARDS_CHECKED');
};

/**
 * Cycle through achievements array and unlock or open awards based on their status
 * @return AWARDS_UPDATED {trigger} trigger set for function firing timing
 * @return awardsUpdated {boolean} variable set to true once completed successfully
 */
function updateAwards() {
	console.log('loggedIn(): ', loggedIn());
	if(loggedIn()) {
			// cycle through achievements and unlock any which are specified in achievements array as unlocked
			for(var i=0; i < achievements.unlocked.length && achievements.unlocked[i] !== ''; i++) {
				$('[data-award="' + achievements.unlocked[i] + '"]').attr('data-status', 'unlocked');
				console.log('This award was unlocked: ', achievements.unlocked[i]);
			};
			
			// cycle through achievements and open any which are specified in achievements array as viewed
			for(var i=0; i < achievements.viewed.length && achievements.viewed[i] !== ''; i++) {
				console.log('This award was viewed: ', achievements.viewed[i]);
				$('[data-award="' + achievements.viewed[i] + '"]').attr('data-status', 'viewed');
			};
		} else {
			$('[data-award]').attr('data-status', 'locked');
	};
	
	// fire the trigger and change variable for function timing with dependancies
	awardsUpdated = true;
	$(document).trigger('AWARDS_UPDATED');
	
	console.log('time to probe the awards carousel');
	probeCarousel('awardScroll');
};

	
	achievements = {
		
		unlocked: [ ],
		viewed: [ ],
		VIEWED: "viewed",
		
		// returns current username
		username: function() {
			return locker.getCookie("pbskids.username");
		},
		
		
		// add achievement id, execute doneFunction when completed
		// to set achievement to having been viewed set type to achievements.VIEWED, otherwise blank will unlock the achievement
		add: function(achievementId, type, doneFunction) {
			$.post("/oddsquad/php/addAchievement.php", { username:achievements.getCookie("pbskids.username"), userid:achievements.getCookie("pbskids.userid"), achievement:achievementId, type:type } ).done(doneFunction);
		},
		
		// gets all achievements, execute doneFunction when completed passing along array of achievement ids
		// achievements that are unlocked are stored achievements.unlocked, viewed achievements are stored achievements.viewed
		// achievement ids are also stored in achievements
		get: function(doneFunction) {
			// keep trying until pbs object is loaded
			if (typeof org === 'undefined' || typeof org.pbskids === 'undefined' || typeof org.pbskids.login === 'undefined') { 
			//if (typeof PBS === 'undefined' || typeof PBS.KIDS === 'undefined' || typeof PBS.KIDS.identity === 'undefined') { 
				setTimeout(function() { achievements.get(doneFunction); }, 500);
				return;
			};
			$.post("/oddsquad/php/getAchievements.php", { username:achievements.getCookie("pbskids.username"), userid:achievements.getCookie("pbskids.userid") } ).done(function(data) {
				var a = data.split("|");
				achievements.unlocked = a[0].split("/");
				achievements.viewed = a[1].split("/");
				doneFunction(achievements.unlocked, achievements.viewed);
			});
		},
		
		// clear all achievements, execute doneFunction when completed
		clear: function(doneFunction) {
			$.post("/oddsquad/php/clearAchievement.php", { username:achievements.getCookie("pbskids.username"), userid:achievements.getCookie("pbskids.userid") } ).done(doneFunction);
		},
		
		// read a cookie
		getCookie: function(c_name) {
			var c_start;
			var c_end;		
			if (document.cookie.length > 0) {
				c_start = document.cookie.indexOf(c_name + "=");
				if (c_start !== -1) {
					c_start = c_start + c_name.length + 1;
					c_end = document.cookie.indexOf(";", c_start);
					if (c_end === -1) { c_end = document.cookie.length; }
					return unescape(document.cookie.substring(c_start, c_end));
				}
			}
			return "";
		}	
		
	};
	

/*
$(document).ready( function() {
		$(document).on('tap', '.award-lst li', openAward(this));
	
		$(document).on('AWARDS_LOADED', function(event) {
			
			// Detect if hall of doors carousel needs to be built
			if($('.award-lst').exists()) {
				// Execute the build doors carousel function
				buildAwards();
			};
			
		});
		// fired after html & js for carousel has been created/loaded
		$(document).on('AWARDS_CREATED', function(event) {
			
			// fire update function to open doors based on current date and date to be open
			if(awardsCreated && pbsBarLoaded) {
				achievements.get(achievementsLoaded);
			};
			
		});
		// fired after databased is checked with
		$(document).on('AWARDS_CONFIRMED', function(event) {
			// update total of opened/unlocked award details areas on site
			$('.user-stats.awards-stats .accnt-rec').html(getUnlockedAwards);
			
			updateAwards();
			
			if($('.agent-dashboard').exists() && awardsCreated && pbsBarLoaded) {
				updateAgentSections();
			};
		});
		$(document).on('AWARDS_UPDATED', function(event) {
	
			// probe the doors carousel to detect the active door and status(end or start)
			probeCarousel('awardScroll');
		});

});
*/


// =======================================================
//              AWARDS PAGE LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(awardsInstance.documentReady());
$(document).ready( function() {
	
	$(document).on('AWARDS_LOADED', function() {
		console.log('building achievements');
		buildAwards();
	});
	
	$(document).on('AWARDS_CREATED', function() {
		console.log('start updating awards 1');
		//updateAwards();
		if(awardsChecked && awardsCreated) {
			if($('[data-overlay="awards"]').length > 0){
				updateAwardStats();
				updateAwards();
			};
		};
	});
	
	$(document).on('AWARDS_CONFIRMED', function() {
		console.log('start updating awards 2');
		//updateAwards();
	});
	
	$(document).on('USERAGENT_INFO_LOADED', function() {
		console.log('checking achievements');
		achievements.get(achievementsLoaded);
		
	});
	$(document).on('AWARDS_CHECKED', function() {
		console.log('start updating awards 3');
		if(awardsChecked && awardsCreated) {
			if($('[data-overlay="awards"]').length > 0){
				updateAwardStats();
				updateAwards();
			};
		};
		
	});
	
	$(document).on('AWARDS_UPDATED', function() {
		dashboardInstance.awards
	});
	
	
	
	
});
$(window).resize( function() {
	awardsInstance.documentResize();
});
