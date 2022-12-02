// =======================================================
//            HALL OF DOORS SPECIFIC VARIABLES
// -------------------------------------------------------

var doorsLoaded = false,
	doorsCreated = false,
	doorsUpdated = false;

// =======================================================
//            HALL OF DOORS SPECIFIC TRIGGERS
// -------------------------------------------------------

/**
 * Triggers used to order scripts firing at correct times and force them to wait for other dependancies
 */
$(document).on ({
	"DOORS_LOADED": function(event) {
		
		// Detect if hall of doors carousel needs to be built
		if($('.doors-lst').exists()) {
			// Execute the build doors carousel function
			buildDoors();
		};
		
		// update total of opened/unlocked doors details areas on site
		$('.doors-stats').find('.accnt-rec').html(getUnlockedDoors);
	},
	"DOORS_CREATED": function(event) {
		
		// fire update function to open doors based on current date and date to be open
		updateDoors();
		
	},
	"DOORS_UPDATED": function(event) {

		// probe the doors carousel to detect the active door and status(end or start)
		probeCarousel('doorsScroll');
	}
});

// =======================================================
//            HALL OF DOORS SPECIFIC PAGE LOAD
// -------------------------------------------------------

$(document).ready(function () {
	
	getDoors();
	
	// global event listeners for dynamicly created content post dom
	$(document).on('tap', '.doors-lst li', openDoor(this));
	//$('.doors-lst li').on('tap', openDoor(this));
	
});

// =======================================================
//           HALL OF DOORS SPECIFIC PAGE RESIZE
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
//            HALL OF DOORS SPECIFIC FUNCTIONS
// -------------------------------------------------------

/**
 * Get door details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing door details to be used throughout the site.
 */
function getDoors() {
	copyJSONIntoObject('/oddsquad/json/hallofdoors.json', site, getDoorsComplete);		
}
/**
 * Function to fire when json has load has completed.
 */
function getDoorsComplete() {
	doorsLoaded = true;
	$(document).trigger('DOORS_LOADED');	
}

/**
 * Redirect browser to hall of doors page
 * Fade out the current page before the redirect
 */
$(document).on('click', '[data-overlay="door"] .btn-close', function(event) {
	event.preventDefault();

	//get the hall of doors url from the link
	var newurl = $(this).attr('href');
	
	// start fading out the body before directing to the new url
	$('body').fadeOut(250, newpage(newurl));

});

/**
 * Using the site array built from the json fetch begin building the doors carousel
 * @return DOORS_CREATED {trigger} trigger set for function firing timing
 * @return doorsCreated {boolean} variable set to true once completed successfully
 */
function buildDoors() {
	// set the main container for the carousel item container
	var container	= $('.doors-lst');
	
	// set the total value doors unlocked details hexagon
	$('.user-stats.doors-stats .accnt-tot').html(site.doors.length);
	
	// cycle through the site.doors array and build the html for the carousel
	for (i = 0; i < site.doors.length; i++) {
		$(container).append('<li data-door="' + (i + 1) + '" data-status="locked" style="width: ' + 100 / site.doors.length + '%"><div class="sizer"></div><div class="sized"><h4>' + (i + 1) + ') ' + site.doors[i].name + '</h4><div class="door-door"><img src="/oddsquad/img/doors/' + site.doors[i].src + '-OPEN.png" class="door-open" /><img src="/oddsquad/img/doors/' + site.doors[i].src + '-CLOSED.png" class="door-closed" /></div></div><div class="award-lock"><img src="/oddsquad/img/doors/lock-locked.png" class="key-locked" /><img src="/oddsquad/img/doors/lock-unlocked.png" class="key-unlocked" /></div></li>');
	};
//'
	// determine the width needed for the carousel item container base on the number of doors to be displayed
	$(container).width(100 * site.doors.length + '%');
	
	// initialize a new carousel after all doors have been added
	doorsScroll = new IScroll('.doors-wrapper', {
		snap: true, // snaps to closest carousel item
		momentum: false, // stops excessive movement when set to false
		scrollX: true, // specifies left and right capabilities
		scrollY: false, // specifies left and right capabilities
		probeType: 3, // this probe type allows for tracking during carousel movement
		tap: true // allows for .on('tap') capabilities which only fires when scrolling movement hasnt been made.  This is to be used over on('click') as it fires in both sceneroes
	});
	
	doorsCreated = true;
	$(document).trigger ('DOORS_CREATED');
}

/**
 * Cycle through site.doors array and find total of opened/unlocked doors
 * @return {string} representing total of opened/unlocked doors.
 */
function getUnlockedDoors() {
	
	// variable used to show # of doors opened/unlocked details hexagon
	var doorsUnlocked = 0;
	
	for(var i=0; i < site.doors.length; i++) {
		if((site.doors[i].year <= curDate.y && site.doors[i].month <= curDate.m && site.doors[i].day <= curDate.d) || (site.doors[i].year <= curDate.y && site.doors[i].month < curDate.m) || (site.doors[i].year < curDate.y)) {
			doorsUnlocked++;
		}
	}
	return doorsUnlocked;
}

/**
 * Cycle through site.doors array and open doors based on current date and date to be available
 * @return DOOR_UPDATED {trigger} trigger set for function firing timing
 * @return doorsUpdated {boolean} variable set to true once completed successfully
 */
function updateDoors() {
	
	// cycle through all the doors and open the ones which have an open date which is less then or equal to the current date
	for(var i=0; i < site.doors.length; i++) {
		if((site.doors[i].year <= curDate.y && site.doors[i].month <= curDate.m && site.doors[i].day <= curDate.d) || (site.doors[i].year <= curDate.y && site.doors[i].month < curDate.m) || (site.doors[i].year < curDate.y)) {
			$('[data-door="' + (i+1) + '"]').attr({
				// set status to viewed which allows the door to be opened
				'data-status': 'viewed'
			});
		}
	}
	// fire the trigger and change variable for function timing with dependancies
	doorsUpdated = true;
	$(document).trigger ('DOORS_UPDATED');
	
}

/**
 * Open door page if it's unlocked otherwise scroll to it
 * @param  {string} self - a jQuery element in which to pull data from.
 */
function openDoor(self) {
	
	// check if the door is open or still locked
	if($(self).attr('data-status') == 'viewed') {
		
		// start fading out the body before directing to the new url
		$('body').fadeOut(250, newpage('/oddsquad/agents/hallofdoors/' + door + '/index.html'));
		
	} else {
		
		// Grab the door number from the data attr 
		var door = parseInt($(self).attr('data-door'));
		// scroll to the door that was clicked since it is still locked
		gotoScroll('doorsScroll', door - 1, 1000);
	};
}