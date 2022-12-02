// =======================================================
//            HALL OF DOORS SPECIFIC VARIABLES
// -------------------------------------------------------

var doorsLoaded = false,
	doorsCreated = false,
	doorsUpdated = false;

// =======================================================
//              HALL OF DOORS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var HodFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {

		_this.documentEvents();	// setup dom element event listeners
		
	};
	
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {
		//only do this reload if the hod overlay exists incase this is loaded on other pages
		/*
		if($('[data-overlay="hod"]').exists() == true) {
			//page reload/refresh
			location.reload();
		}
		*/
		
	};
	
	_this.documentEvents = function() {

		
		
	};
	
};
		
var hodInstance = hodInstance || new HodFunctions();

// =======================================================
//            HALL OF DOORS SPECIFIC FUNCTIONS
// -------------------------------------------------------
function constructDoors() {
	console.log('boom! 3');
	
	getDoors(getDoorsComplete);
	
	
};
/**
 * Get door details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing door details to be used throughout the site.
 */
function getDoors(doneFunction) {
	console.log('boom! 4');
	if(!doorsLoaded) {
		copyJSONIntoObject('/oddsquad/json/hallofdoors.json', site, doneFunction);
	}else{
		doneFunction();
	};
};
/**
 * Function to fire when json has load has completed.
 */
function getDoorsComplete(doneFunction) {
	doorsLoaded = true;
	console.log('doors 2 +_+_+_+_+_+_+_+_+_+_+_+_+_+_+');
	$(document).trigger('DOORS_LOADED');
	//doneFunction();
};

/**
 * Redirect browser to hall of doors page
 * Fade out the current page before the redirect
 */
function closeDoor(event) {
	event.preventDefault();

	//get the hall of doors url from the link
	var newurl = $(this).attr('href');
	
	// start fading out the body before directing to the new url
	$('body').fadeOut(250, newpage(newurl));

};

/**
 * Using the site array built from the json fetch begin building the doors carousel
 * @return DOORS_CREATED {trigger} trigger set for function firing timing
 * @return doorsCreated {boolean} variable set to true once completed successfully
 */
function buildDoors() {
	
	// set the main container for the carousel item container
	var container	= $('.doors-lst');
		
	// cycle through the site.doors array and build the html for the carousel
	for (i = 0; i < site.doors.length; i++) {
		//$(container).append('<li data-door="' + (i + 1) + '" data-status="locked" data-folder="' + site.doors[i].folder + '" style="width: ' + 100 / site.doors.length + '%"><div class="sizer"></div><div class="sized"><h4>' + (i + 1) + ') ' + site.doors[i].name + '</h4><div class="door-door"><img src="/oddsquad/img/doors/' + site.doors[i].src + '-OPEN.png" class="door-open" /><img src="/oddsquad/img/doors/' + site.doors[i].src + '-CLOSED.png" class="door-closed" /></div></div><div class="award-lock"><img src="/oddsquad/img/doors/lock-locked.png" class="key-locked" /><img src="/oddsquad/img/doors/lock-unlocked.png" class="key-unlocked" /></div></li>'); //''
		
		if((site.doors[i].year <= curDate.y && site.doors[i].month <= curDate.m && site.doors[i].day <= curDate.d) || (site.doors[i].year <= curDate.y && site.doors[i].month < curDate.m) || (site.doors[i].year < curDate.y)) {
			$(container).append('<li data-door="' + (i + 1) + '" data-status="viewed" data-folder="' + site.doors[i].folder + '" style="width: ' + 100 / site.doors.length + '%"><div class="sizer"></div><div class="sized"><h4>' + (i + 1) + ') ' + site.doors[i].name + '</h4><div class="door-door"><img src="/oddsquad/img/doors/' + site.doors[i].src + '-OPEN.png" class="door-open" /><img src="/oddsquad/img/doors/' + site.doors[i].src + '-CLOSED.png" class="door-closed" /></div></div><div class="award-lock"><img src="/oddsquad/img/doors/lock-locked.png" class="key-locked" /><img src="/oddsquad/img/doors/lock-unlocked.png" class="key-unlocked" /></div></li>'); //''
		};

	};

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
	
		$('.doors-lst li').on('tap', function(){
			openDoor(this)
		});
		
	doorsCreated = true;
	$(document).trigger ('DOORS_CREATED');
};

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
		};
	};
	return doorsUnlocked;
};

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
		};
	};
	// fire the trigger and change variable for function timing with dependancies
	doorsUpdated = true;
	$(document).trigger ('DOORS_UPDATED');
	
};

/**
 * Open door page if it's unlocked otherwise scroll to it
 * @param  {string} self - a jQuery element in which to pull data from.
 */
function openDoor(self) {
		
	// check if the door is open or still locked
	if($(self).attr('data-status') == 'viewed') {
		
		var doorFolder = $(self).attr('data-folder');
		
		// start fading out the body before directing to the new url
		$('body').fadeOut(250, newPage('/' + baseFolder + '/agents/hallofdoors/' + doorFolder + '/index.html'));
		
	} else {
		
		// Grab the door number from the data attr 
		var door = parseInt($(self).attr('data-door'));
		
		// scroll to the door that was clicked since it is still locked
		gotoScroll('doorsScroll', door - 1, 1000);
	};
};


// =======================================================
//              HALL OF DOORS PAGE LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(hodInstance.documentReady());
$(window).resize(hodInstance.documentResize());
$(document).ready( function() {
	
	$(document).on('DOORS_LOADED', buildDoors);
	
	$(document).on('DOORS_CREATED', updateDoors);

	$(document).on('DOORS_UPDATED', dashboardInstance.doors);
	

});
