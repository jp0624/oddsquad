// =======================================================
//                AWARDS SPECIFIC VARIABLES
// -------------------------------------------------------

var awardsLoaded = false,
	awardsCreated = false,
	awardsUpdated = false;

// =======================================================
//                AWARDS SPECIFIC TRIGGERS
// -------------------------------------------------------

/**
 * Triggers used to order scripts firing at correct times and force them to wait for other dependancies
 */
$(document).on ({
	// fired after successful json load completion
	"AWARDS_LOADED": function(event) {
		
		// Detect if hall of doors carousel needs to be built
		if($('.award-lst').exists()) {
			// Execute the build doors carousel function
			buildAwards();
		};
		
		// update total of opened/unlocked doors details areas on site
		$('.doors-stats').find('.accnt-rec').html(doorsUnlocked);
	},
	// fired after html & js for carousel has been created/loaded
	"AWARDS_CREATED": function(event) {
		
		// fire update function to open doors based on current date and date to be open
		if(awardsCreated && pbsBarLoaded) {
			achievements.get(achievementsLoaded);
		};
		
	},
	// fired after databased is checked with
	"AWARDS_CONFIRMED": function(event) {
		// update total of opened/unlocked award details areas on site
		$('.user-stats.awards-stats .accnt-rec').html(getUnlockedAwards);
		
		updateAwards();
		
		if($('.agent-dashboard').exists() && awardsCreated && pbsBarLoaded) {
			updateAgentSections();
		};
	},
	"AWARDS_UPDATED": function(event) {

		// probe the doors carousel to detect the active door and status(end or start)
		probeCarousel('awardScroll');
	}
});

// =======================================================
//                AWARDS SPECIFIC PAGE LOAD
// -------------------------------------------------------

$(document).ready(function () {
	
	getAwards();
	
	// global event listeners for dynamicly created content post dom
	$(document).on('tap', '.award-lst li', openAward(this));
	
});


// =======================================================
//              AWARDS SPECIFIC PAGE RESIZE
// -------------------------------------------------------

/**
 * Reload page on resize to re-create the carousel
 */
$(window).resize( function () {
	//only do this reload if the hod overlay exists incase this is loaded on other pages
	if($('[data-overlay="hod"]').exists() == true) {
		//page reload/refresh
		location.reload();
	}
});

// =======================================================
//               AWARDS SPECIFIC FUNCTIONS
// -------------------------------------------------------

/**
 * Get awards details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing award details to be used throughout the site.
 */
function getAwards() {
	copyJSONIntoObject('/oddsquad/json/awards.json', site, getAwardsComplete);		
}
/**
 * Function to fire when json has load has completed.
 */
function getAwardsComplete() {
	awardsLoaded = true;
	$(document).trigger('AWARDS_LOADED');	
}
/**
 * Function to fire which grabs the award status and adds them to an achievements object.
 * @return {Object} - [achievements] An object containing award status to be used to open/unlock awards visually.
 */
function achievementsLoaded(unlocked, viewed) {
	awardsConfirmed = true;
	$ ( document ).trigger ( "AWARDS_CONFIRMED" );
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
	// set the main container for the carousel item container
	var container	= $('.award-lst');
	
	// set the total value of awards available in the details hexagon
	$('.user-stats.awards-stats .accnt-tot').html(site.awards.length);
	
	// cycle through the site.awards array and build the html for the carousel
	for (i = 0; i < site.awards.length; i++) {
		$(container).append('<li data-award="' + site.awards[i].id + '" data-status="locked" style="width: ' + 100 / site.awards.length + '%"><div class="sizer"></div><div class="sized"><div class="award-lights"></div><div class="award-stars"></div><div class="award-box"><img src="/oddsquad/img/agents/box-body.png" /></div><div class="award-lid"><img src="/oddsquad/img/agents/box-lid.png" /></div><div class="award-award"><img src="/oddsquad/img/awards/' + site.awards[i].src + '" /></div></div><div class="award-lock"><img src="/oddsquad/img/agents/box-lock.png" /></div></li>');
	};	
//'
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

/**
 * Cycle through achievements array and unlock or open awards based on their status
 * @return AWARDS_UPDATED {trigger} trigger set for function firing timing
 * @return awardsUpdated {boolean} variable set to true once completed successfully
 */
function updateAwards() {
	
	// cycle through achievements and unlock any which are specified in achievements array as unlocked
	for(var i=0; i < achievements.unlocked.length && achievements.unlocked[i] !== ''; i++) {
		$('[data-award="' + achievements.unlocked[i] + '"]').attr('data-status', 'unlocked');
	};

	// cycle through achievements and open any which are specified in achievements array as viewed
	for(var i=0; i < achievements.viewed.length && achievements.viewed[i] !== ''; i++) {
		$('[data-award="' + achievements.viewed[i] + '"]').attr('data-status', 'viewed');
	};
	
	// fire the trigger and change variable for function timing with dependancies
	awardsUpdated = true;
	$(document).trigger('AWARDS_UPDATED');
	
};