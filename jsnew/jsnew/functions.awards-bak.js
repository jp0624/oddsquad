// =======================================================
//                AWARDS SPECIFIC VARIABLES
// -------------------------------------------------------

var awardsLoaded = false,
	awardsCreated = false,
	awardsUpdated = false
	achievements = {};

// =======================================================
//              AWARDS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var AwardsFunctions = function(doneFunction) {
	var _this = this		
		unlocked =  [ ],
		viewed =  [ ],
		VIEWED = "viewed",
	
	// check if user is logged in (only works after PBS module is loaded)
	_this.loggedIn = function() {
		if (typeof org === 'undefined' || typeof org.pbskids === 'undefined' || typeof org.pbskids.login === 'undefined') { 
			 return false; }
		else {
			return true;
		}
	},
	
	// returns current username
	_this.username = function() {
		return locker.getCookie("pbskids.username");
	},
	
	// add achievement id, execute doneFunction when completed
	// to set achievement to having been viewed set type to awardsInstance.VIEWED, otherwise blank will unlock the achievement
	_this.add = function(achievementId, type, doneFunction) {
		$.post("/oddsquad/php/addAchievement.php", {
			username:awardsInstance.getCookie("pbskids.username"),
			userid:awardsInstance.getCookie("pbskids.userid"),
			achievement:achievementId, type:type
		}).done(doneFunction);
	},
	
	// gets all achievements, execute doneFunction when completed passing along array of achievement ids
	// achievements that are unlocked are stored awardsInstance.unlocked, viewed achievements are stored awardsInstance.viewed
	// achievement ids are also stored in achievements
	_this.get = function(doneFunction) {
		console.log('achievements get fired');
		// keep trying until pbs object is loaded
		if (typeof org === 'undefined' || typeof org.pbskids === 'undefined' || typeof org.pbskids.login === 'undefined') { 
		//if (typeof PBS === 'undefined' || typeof PBS.KIDS === 'undefined' || typeof PBS.KIDS.identity === 'undefined') { 
			setTimeout(function() { awardsInstance.get(doneFunction); }, 500);
			return;
		}
		$.post("/oddsquad/php/getAchievements.php", {
			username:awardsInstance.getCookie("pbskids.username"),
			userid:awardsInstance.getCookie("pbskids.userid")
		}).done(function(data) {
			var a = data.split("|");
			awardsInstance.unlocked = a[0].split("/");
			awardsInstance.viewed = a[1].split("/");
			doneFunction(awardsInstance.unlocked, awardsInstance.viewed);
		});
	},
	
	// clear all achievements, execute doneFunction when completed
	_this.clear = function(doneFunction) {
		$.post("/oddsquad/php/clearAchievement.php", {
			username:awardsInstance.getCookie("pbskids.username"),
			userid:awardsInstance.getCookie("pbskids.userid")
		}).done(doneFunction);
	},
	
	// read a cookie
	_this.getCookie = function(c_name) {
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
	};
	
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
		if(!awardsInstance.unlocked) {
			awardsInstance.unlocked = [];
			awardsInstance.viewed = [];
			if(localTestlogin){
				awardsInstance.unlocked[0] = 1;
				awardsInstance.unlocked[1] = 2;
				awardsInstance.unlocked[2] = 3;
				awardsInstance.unlocked[3] = 4;
				awardsInstance.unlocked[4] = 5;
				
				awardsInstance.viewed[0] = 1;
				awardsInstance.viewed[1] = 2;
				awardsInstance.viewed[2] = 3;
				awardsInstance.viewed[3] = 4;
				awardsInstance.viewed[4] = 5;	
			} else {
				awardsInstance.unlocked[0] = 1;
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
		awardsInstance.add(parseInt($(self).attr('data-award')), 'VIEWED', function(){
						
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
	
	console.log('getUnlockedAwards(): ', getUnlockedAwards());
	// set the total value of awards available in the details hexagon
	$('.user-stats.awards-stats .accnt-tot').html(getUnlockedAwards());
	
	// cycle through the site.awards array and build the html for the carousel
	for (i = 0; i < site.awards.length; i++) {
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
	
	console.log('about to set the awards created trigger');
	// fire the trigger and change variable for function timing with dependancies
	awardsCreated = true;
	$(document).trigger('AWARDS_CREATED');
	
};
/**
 * Calculate number of Unlocked awards
 * @return {string} representing total of opened/unlocked doors.
 */
function getUnlockedAwards() {

	return awardsInstance.unlocked.length;
}

/**
 * Cycle through achievements array and unlock or open awards based on their status
 * @return AWARDS_UPDATED {trigger} trigger set for function firing timing
 * @return awardsUpdated {boolean} variable set to true once completed successfully
 */
function updateAwards() {
	console.log('updating awards');
		if(loggedIn()) {
			console.log('updating awards - logged in true');
			// cycle through achievements and unlock any which are specified in achievements array as unlocked
			for(var i=0; i < awardsInstance.unlocked.length && awardsInstance.unlocked[i] !== ''; i++) {
				$('[data-award="' + awardsInstance.unlocked[i] + '"]').attr('data-status', 'unlocked');
				console.log('This award was unlocked: ', awardsInstance.unlocked[i]);
			};
			
			// cycle through achievements and open any which are specified in achievements array as viewed
			for(var i=0; i < awardsInstance.viewed.length && awardsInstance.viewed[i] !== ''; i++) {
				console.log('This award was viewed: ', awardsInstance.viewed[i]);
				$('[data-award="' + awardsInstance.viewed[i] + '"]').attr('data-status', 'viewed');
			};
		} else {
			console.log('updating awards - logged in false');
			$('[data-award]').attr('data-status', 'locked');
		};
	
	// fire the trigger and change variable for function timing with dependancies
	awardsUpdated = true;
	$(document).trigger('AWARDS_UPDATED');
	
	console.log('time to probe the awards carousel');
	probeCarousel('awardScroll');
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
				awardsInstance.get(achievementsLoaded);
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
		awardsInstance.get();
	});
	$(document).on('AWARDS_CONFIRMED', function() {
		console.log('start updating awards 1');
		updateAwards();
	});
	
	$(document).on('AWARDS_CREATED', function() {
		console.log('start updating awards 2');
		updateAwards();
	});

	$(document).on('AWARDS_UPDATED', function() {
		dashboardInstance.awards
	});
	

});
$(window).resize(awardsInstance.documentResize());
