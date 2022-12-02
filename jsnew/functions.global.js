// =======================================================
//                GLOBAL VARIABLES
// -------------------------------------------------------
var startPage = 0,
	pageScroll,
	position,
	scrollPages = [],
	pageWidth = 0,
	scrollPagesQty,
	userLogin = [],
	site = [],
	origin = '',
	playerLoaded = false,
	baseFolder = 'oddsquad',
	baseTitle = 'Odd Squad - ',
	winSize,

	// used for local build testing, pbs bar needs to be commented out.
	localTest = false,
	// sets user login status if site is in local test mode.
	localTestlogin = false;

$('img').draggable = false;
$('img').on('dragstart', function(event) { event.preventDefault(); });

// =======================================================
//           GLOBAL DOCUMENT FUNCTIONS
// -------------------------------------------------------
$(document).on('click', '.oddMem-signout', function(event) {
	event.preventDefault();
	org.pbskids.login.logout();
});

$(document).bind('org_pbskids_login_LoginEvent_LoggedIn', function () {
	updateUserLogin();	
});

$(document).bind('org_pbskids_login_LoginEvent_LoggedOut', function () {
	updateUserLogin();
});


window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	$(document).find('body').removeClass('load');
},false);

$(document).ready( function() {
	getWinSize();
	
	//startup the flowtype function
	$('body').flowtype({
		minimum   : 100,
		maximum   : 1500,
		fontRatio : 40
	});

	

});

function msgLog(msg, title){
	if(title){
		console.log('%c   '+ title +'   ', 'background: #26231a; color: #ffcf00; border-bottom: 2px solid #be1d2d');
	};
	console.log('%c  '+ msg +'  ', 'background: #f4e1a7; color: #26231a; border-bottom: 1px solid #796f53');
};

/**
 * Check if something exists.
 * @return {Boolean} - true if the object exists, false otherwise.
 */
$.fn.exists = function () {
    return this.length !== 0;
}

function setStartPage(page) {
	startPage = page;
}
function getScrollingStatus(newPage, curPosi) {
	
	startPosi 		= scrollPages[startPage]._position.x;
	
	if(startPage > newPage || (curPosi * (-1)) < startPosi ) {
		pageScroll.dir = '-1';
	}else if(startPage < newPage || (curPosi * (-1)) > startPosi) {
		pageScroll.dir = '1';
	}else {
		pageScroll.dir = '0';
	}
	
	pageScroll.dif = Math.abs(startPosi + curPosi)
	
	setStageStatus(newPage);
};

/**
 * @create {Object} Set available global functions on page events. 
 */
var GlobalFunctions = function() {
	
	// standard functions to load on global dom is ready
	this.documentReady = function() {
		//start up the main generic functions
		getCurDate();				// get the current date to use for date verifications
		getWinSize();				// adds browser win size specs to winSize object with [x] & [y]
		getOrientationOf('html');
		prefixes();					// adds browser prefix objects for future use ex: {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}
		removeIECover();			// removes the html for the iecover used to hide content while .htaccess fixes lte-ie9 url
		checkHash();				// check for lte9 & /#/ detection then replace URL with a clean version
		
		setOrigin(baseFolder);	//set the website origin sub-directory if exists, leave blank setOrigin(); if site resides in root
		
		//startup the flowtype function
		$('body').flowtype({
			minimum   : 100,
			maximum   : 1500,
			fontRatio : 40
		});
		this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on global dom is resized
	this.documentResize = function() {
		//start up the main generic functions
		getWinSize();	// adds browser win size specs to winSize object with [x] & [y]
		getOrientationOf('html');
	};
	this.documentEvents = function() {
			
	};
	
};
window.onresize = function(event) {
	
	getWinSize();				// adds browser win size specs to winSize object with [x] & [y]
	getOrientationOf('html');
    //gameInitInstance.documentResize()
};
	
$(document).on('click', '.mobileNav a', toggleMobileNav);
$(document).on('click', 'a.btn-closeOverlay', hideOverlay);

/*
$(document).on('click', '.mobileNav a', function() {
	alert('clicked');
	$('body').toggleClass('showNav');
	
	setTimeout(function () {
		$('html, body').scrollTop();
	}, 5000);
	
});
*/
/*
var pushy = new makePushURL('blarg');

function makePushURL(target) {
	this.target = target;
	this.steve = function () {
		this.target.doStuff();
	};	
};
*/
		
var globalInstance = globalInstance || new GlobalFunctions();


// =======================================================
//                GLOBAL FUNCTIONS
// -------------------------------------------------------

/**
 * Get settings from data attribute
 * format example: data-object="imgCycle[frames:36;fps:30;startFrame:1;endFrame:1;cycles:1;]"
 * @param	{elem} element to find pull data from
 * @param	{_attr} the attribute to pull settings from and format in an array
 * @return	{array} - Settings from data attribute
 */

function attrSettingsMod(elem, _attr) {
	
	var settings = [];
	
	if($(elem).length > 0){
		var setArray = $(elem).attr(_attr).replace(/ /g,'').split(',');
	}else{
		return;
	};
	
	// cycle through and find the effects for the object
	for (var i = 0; i < setArray.length; i++){
		
		var _setDetails = setArray[i];
		
		var _set = [];
		
		_setDetails = _setDetails.replace(/]/g,'').split(/[[;]/);
		
		_set.title = _setDetails[0];
		_set.elem = elem;
		
		// remove first(name) item in array to clean up for attributes
		_setDetails.shift();
		
		// cycle through and seperate the attributes if they exist for the effects
		for (var x = 0; x < _setDetails.length; x++){
			
			var _thisSet = _setDetails[x];
			
			_thisSet = _thisSet.split(/[:]/);
			
			//check if string is a valid number else leave as string
			if(!isNaN(_thisSet[1])) {
				_set[_thisSet[0]] = parseFloat(_thisSet[1]);
			} else {
				_set[_thisSet[0]] = _thisSet[1];
			}
		};	
			
	};
	return _set;
};

/**
 * Set base site origin variable.
 * @param  {string} class/id of element to be check for its orientation.
 * @return {classname} - Set orientation class name to element specifie.
 */	
function getOrientationOf(element) {

		getWinSize();
		var layout;

		if(typeof site.layout == "undefined"){
			//console.warn('here 1');

			if(winSize.y >= winSize.x) {
				site.layout = 'portrait';

				$(element).addClass('portrait');
				$(document).trigger('LAYOUT_PORTRAIT');
				console.log('orientation of ' + element + ': portrait');
				return;

			} else if(winSize.x > winSize.y) {
				site.layout = 'landscape';

				$(element).addClass('landscape');
				$(document).trigger('LAYOUT_LANDSCAPE');
				console.log('orientation of ' + element + ': landscape');
				return;
			}

		} else {
			//console.warn('here 2');

			if(winSize.y >= winSize.x){
				//console.warn('here 2.1');
				layout = 'portrait';

				if(site.layout == layout) {
					//console.warn('here 2.1.1');
					return;
				};
				//console.warn('here 2.1.2');
				site.layout = 'portrait';

				$(document).trigger('LAYOUT_PORTRAIT');
				$(element).removeClass('landscape');
				$(element).addClass('portrait');

				console.log('orientation of ' + element + ': portrait');
				
			} else if (winSize.x > winSize.y){
				//console.warn('here 2.2');
				layout = 'landscape';
				
				if(site.layout == layout) {
				//console.warn('here 2.2.1');
					return;
				};
				//console.warn('here 2.2.2');

				$(element).removeClass('portrait');
				$(element).addClass('landscape');

				$(document).trigger('LAYOUT_LANDSCAPE');
				site.layout = 'landscape';
				
				console.log('orientation of ' + element + ': landscape');
				
				
			};

			if($('.dashboard-carousel').length > 0 && dashboard_init) {
				setCarouselItems();
			};

		};
};

/**
 * Set base site origin variable.
 * @param  {string} main subdirectory where the site resides (this also needs to be changed in .htaccess for lte ie9).
 */
function setOrigin(baseFolder) {
	if($('.lte9').exists() || !baseFolder) {
		//basefolder is not needed for lte i19 as .htaccess handles the subdirectory
		origin	= location.protocol + '//' + location.host;
	} else {
		origin	= location.protocol + '//' + location.host + '/' + baseFolder;
	};
};
/**
 * check for lte9 & /#/ detection then replace URL with a clean version
 */
function checkHash() {
	
	// <= ie9 html5 poly fill refresh & removal of /#/
	if($('.lte9').exists()) {
		
		// get active page location/url
		var url = window.location.href;
		
		// search string for existance of #/
		var hashExist = url.search(new RegExp('#/', 'i'));

		// check if a has exists in the active url	
		if(hashExist >= 0) {
			// Clean up url by removing /#? and file name
			url = url.replace('#/', '');
			url = url.replace('index.html', '');
			
			// send cleaned url to window
			window.location.replace(url);
		};
	};
};

/**
 * lte9 white cover to prevent partial load while .htaccess runs
 */
function removeIECover() {
	// detect if needed then remove at appropriate time
	if($('.lte9').exists() && $('.iecover').exists()) {
		//set delay to hide content while changing
		setTimeout(function () {
			$('.iecover').remove();
		}, 500);
	} else {
		//clean up html as its not needed
		$('.iecover').remove();
	};
};


function gotoStage(stage, speed) {
	
		if(playerLoaded == true) {
			player.pause();
		}
		
	//prevents bug with overclicking by disabling btns
	$('.scrollNav, .pageNav').addClass('disabled');
	
	var transition = speed || 500;
	
	//console.log('transition: ', transition);
	if(stage == 'next'){
		pageScroll.goToPage((pageScroll.currentPage.pageX + 1), 0, speed);
		return;
	} else if(stage == 'prev') {
		pageScroll.goToPage((pageScroll.currentPage.pageX - 1), 0, speed);
		return;
	}
	pageScroll.goToPage(stage, 0, speed);
	
	setTimeout(function () {
		$('.scrollNav, .pageNav').removeClass('disabled');
	}, speed);
};

/**
 * Change the active page to the first directory in the target.
 * @param  target {array} - The path to the sections to move to.
 */
function changePage(target, doneFunction){
	console.log('target: ', target)
	
	if(jQuery.type(target) === "string"){
		target = cleanPath(target);
		target = target.split('/');
		console.log('target: ', target);
	} else {
		msgLog('I am not a string', target);
	}
	
	console.log('******************************** TARGET: ', target);
	var newPage = findIndexByProperty(scrollPages, "_details.name", target[0]);
	
	console.log('newPage: ', newPage);
	console.log('params.status: ', params.status);

	if(params.status && newPage >= 0) {
		//check if linked to from static page and goto section without animation
		//timing set to 50 to fix load glitch
		console.log('Im here 1');
		gotoStage(newPage, 50)
		
		params.status = false;
		
	} else if(newPage >= 0){
		console.log('Im here 2');
		gotoStage(newPage, 500)
	};
	console.log('trace me');
	//if the target has a child element open it in an overlay
	if(target.length > 1) {
		if(doneFunction){
			console.log(' :) CHANGE PAGE FIRED WITH DONE FUNCTION');
			initOverlay(target, doneFunction);
		}else {
			console.log(' :( CHANGE PAGE FIRED WITH NO DONE FUNCTION');
			initOverlay(target);
		};
	} else {
		if(doneFunction){
			doneFunction();
		};
	};
};

/**
 * Detect if pushURL comes from home page or interrior page
 * If on home then set new URL using pushState
 * If on interrior landing page & gte ie9 then link to home and send params
 * Else link directly to the url provided
 */
function pushUrl(self, url, title, doneFunction) {
	
	console.log('this');

	var url		= url ? url : $(self).attr('href') ? cleanPath($(self).attr('href')) : baseFolder;
	var	title	= title ? title : baseTitle + url;
		
	//detect if video player is loaded and pause if it is
	if(playerLoaded) {
		// video player pause method
		player.pause();
	};
	console.log('url(line-350) ', url)
	//detect if on home page by pageDepth being set as Root else is interrior
	if($('[data-pageDepth="root"]').exists()) {
	// if linking from the home page then leverage push/replaceState for history change
		
		// if home page use this method to initiate history push/replaceState
		genratrSetURL(url, false);
		
		// load the page title from the url provided and replace active page title
		genratrSetTitle(url);
		
		// change the page based on the url change
		changePage(url, doneFunction);
		
	}else if($('iframe#game').exists()){

		// if home page use this method to initiate history push/replaceState
		//genratrSetURL(url, false);
		
		// load the page title from the url provided and replace active page title
		//genratrSetTitle(url);
		
		// change the page based on the url change
		changePage(url, doneFunction);

	}else if(!$('[data-pageDepth="root"]').exists()) {
	// if linking from an interrior page then redirect either directly to the page or to the home page and send proper parameters
	
		if($('.lte9').exists()) {
			//if ie9 or below handle as normal link and send to static page
			window.location.replace('/' + baseFolder + url);
		} else {
			//if interrior page build link to send params to home page for opening page
			window.location.replace('/' + baseFolder + '/index.html?dir=' + url);
		};
	};
};

/**
 * Toggle display of mobile nav 
 */
function toggleMobileNav() {
	//add show nav class for css animate to hide or display
	$('body').toggleClass('showNav');
	
	//animate page scroll to top on click
	$('article').animate({ scrollTop: '0' });
};

/**
 * Get the window size.
 * @return {Object} and object with {x,y} representing the width and height of the window respectively.
 * ex: prefix {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}
 */
function getWinSize() {
	return winSize = {
		x:$(window).width(),
		y:$(window).height()
	};
};

/**
 * Get the current date.
 * @return {Object} and object with {d,m,y} representing the day, month and year.
 */
function getCurDate() {
	var newDate = new Date();
	return curDate = {
		d: newDate.getDate(),
		m: newDate.getMonth()+1,
		y: newDate.getFullYear()
	};
};

/**
 * Translate an element a given amount in the x, y a z axes.
 * @param  {string} elem - A jQuery selector to find the element.
 * @param  {Number} x    - The amount to translate the object along the x axis.
 * @param  {Number} y    - The amount to translate the object along the y axis.
 * @param  {Number} z    - The amount to translate the object along the z axis.
 */
function translate(elem, x, y, z){
	var elemMatrix = 	getMatrix(elem),
		matrixType =	elemMatrix[1].length == 6 ? '2D' : elemMatrix[1].length == 17 ? '3D' : undefined,
		translateAxis = {
			x: x !== undefined ? x : matrixType == '2D' ? elemMatrix[1][4] : matrixType == '3D' ? elemMatrix[1][13] : 0,
			y: y !== undefined ? y : matrixType == '2D' ? elemMatrix[1][5] : matrixType == '3D' ? elemMatrix[1][14] : 0,
			z: z !== undefined ? z : matrixType == '2D' ? 0 : matrixType == '3D' ? elemMatrix[1][15] : 0
		};
	$(elem).css(prefix.css + 'transform', 'translateX(' + translateAxis.x + 'px) translateY(' + translateAxis.y + 'px) translateZ(' + translateAxis.z + 'px)');
};

/**
 * Get the transformation matrix for a given element.
 * @param  {string} element - A jQuery selector to find the element.
 * @return {Array}        - An array containing the matrix and it's values in the form [matrix, values].
 */
function getMatrix(element) {

	var	matrix = $(element).css(prefix.css + 'transform');
	matrixValues = matrix.match(/-?[0-9\.]+/g);

	return [matrix, matrixValues];
};

/**
 * Add css prefixes to elements that need them.
 * @return {[typ
 */
function prefixes() {
	var styles = window.getComputedStyle(document.documentElement, '');

	pre = (Array.prototype.slice
			.call(styles)
			.join('')
			.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	return prefix = {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
};


/**
 * Used to generate font size on body for em dynamic rezing on screen size change
 */
$.fn.flowtype = function(options) {

  var settings = $.extend({
	 maximum   : 9999,
	 minimum   : 1,
	 maxFont   : 9999,
	 minFont   : 1,
	 fontRatio : 30
  }, options),

  changes = function(el) {
	 var $el = $(el),
		elw = $el.width(),
		width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
		fontBase = width / settings.fontRatio,
		fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
	 $el.css('font-size', fontSize + 'px');
  };

  return this.each(function() {
  // Context for resize callback
	 var that = this;
  // Make changes upon resize
	 $(window).resize(function(){changes(that);});
  // Set changes on load
	 changes(this);
  });
};


/**
 * Copy JSON data into an object, using an asynchronous JQuery call.
 * @param  jsonFile {string} - Thje path to the JSON file to load.
 * @param  object {Object} - The object to put the data into.
 * @param  doneFunction {function} - The function to run on complete.
 * @return {JQuery Object} - JQuery object, if you want to chain more calls.
 */
function copyJSONIntoObject(jsonFile, object, doneFunction) {
	return $.getJSON(jsonFile, function(data) {
				getJSONData(data, object)
			})
			.error (
				getJSONError
			)
			.complete(
				doneFunction
			);
};
function getJSONData(data, object) {
	for (var attr in data) {
		object[attr] = data[attr];	
	}
	/*
	if(prefix.dom != 'MS'){
		console.table(data);
	} else {
		console.log(data);
	}
	*/
	console.log(data);
};

function getJSONError(object, jqXHR, textStatus, errorThrown) {
	console.log('getJSON object: ', object);
	console.log('getJSON error: ', textStatus);
	console.log('getJSON errorThrown: ', errorThrown);
	console.log('arguments: ', arguments);
	console.log("getJSON incoming Text " + jqXHR.responseText);
};

/**
 * Set window location to a new URL
 */
function newPage(newurl) {
	// set the new url in the window
	window.location = newurl;
}

/**
 * Show overlay and add/remove appropriate classes to containers
 */
function showOverlay() {
	setTimeout(function () {
		$('.ov-wrapper').addClass('init-overlay');
		$(document).trigger('PAUSE_GAME');
	}, 100);

	$('.pg-wrapper').addClass('hide');
};

/**
 * Remove active overlay and add/remove appropriate classes to containers
 */
function hideOverlay() {
	console.log($('.pg-wrapper').length);
	console.log($('.ov-wrapper').length);
	console.log('here we are');
	
	$(document).trigger('RESUME_GAME');

	$('.pg-wrapper').removeClass('hide');
	$('.ov-wrapper').each( function() {
		$('body').attr('data-ovload', '');
		$(this).removeClass('init-overlay');
	});

	setTimeout(function () {
		$(document).find('.ov-wrapper').remove();

	}, 500);
};

/**
 * Remove active overlay and add/remove appropriate classes to containers
 * @return {integer} index of the array item which contains the correct properties
 */
function findIndexByProperty(array, property, value) {
	
	// split the properties into an array to cycle through
	var propertyList = property.split(".");

	// cycle through all array items until the first property is found
	for (var i = 0; i < array.length; i++) {
		
		var obj = array[i];
		
		for(var j = 0; j < propertyList.length; j++) {
			obj = obj[propertyList[j]];
		};
				
		if(obj == value) {
			return i;	
		};
	};
	return -1;
};

/**
 * Clean up the Path and remove any starting or trailing "/"'s
 * We're also removing "dir=/" which is used to send params with pushUrl()
 * @return {string} clean link path with no starting or trailing "/"'s ex: some/directory
 */
function cleanPath(path){
		
	path = path.replace('dir=/','');
	
	//remove trailing "/" if one exists
	path = path[0] == "/" ? path.substring(1, path.length) : path;
	
	path = path[path.length - 1] == "/" ? path.substring(0, path.length-1) : path;
	
	return path;
}

/**
 * Check if value is even or odd
 * @return {Boolean} - true if the object exists, false otherwise.
 */
function isEven(value) {
	return (value%2 == 0);
}


function setStageStatus(newPage) {
	
	//setScrollPageStatus
	//clear active status if exists to clear active animations
	$('.pg-wrapper > section > article').removeClass('active');
	//add active status to current stage to init animations
	$('.pg-wrapper > section > article:eq(' + newPage + ')').addClass('active');
	
	curStage	= newPage
	
	for (var i = 0; i < scrollPagesQty; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').removeAttr('data-status');
	};
	
	for (var i = 0; i < curStage; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').attr('data-status', 'old');
	};
	for (var i = curStage + 1; i < scrollPagesQty; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').attr('data-status', 'new');
	};
	
	$('.pg-wrapper > section > article:eq(' + curStage + ')	').attr('data-status','cur');
	$('html').attr('data-activeStage', curStage);
	
	//only init video player when that page is hit.. this stops the auto play on playlist load
	if($('.pg-wrapper > section > article:eq(' + curStage + ')	').hasClass('pg-videos')){
		 if(!player){
			initVideoPlayer();
		 };
	} else if($('.pg-wrapper > section > article:eq(' + curStage + ')	').hasClass('pg-agents')){
		
		getWinSize();	// adds browser win size specs to winSize object with [x] & [y]
		getOrientationOf('html');
		
		if(dashboard_init){
			positionFloor();
		};
		
	};

};

(function($) {
	$.fn.preload = function() {
	    this.each(function(){
	        $('<img/>')[0].src = this;
	    });
	}
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function countInContainer(container, item){
	items = $(container).find(item).length;

	return items;
};

function findInContainer(container, item, i){
	item = $(container).find(item).eq(i);

	return item;
};

function getTitle(item){
	title = $(item).attr('title');

	return title;
};

function closeOverlay(type) {
	$(document).trigger('OVERLAY_REMOVED', type);
};

function cleanString(string){
	var cleaned = string.toLowerCase().replace(/([~!@#$%^’ &*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');
	//var cleaned = $(string).toLowerCase().replace(/ /g,'').replace(/\'/g, ' ').replace(/\./g, ' ');
	//var cleaned = 'boob';
	return cleaned;
}
function lowerString(string){
	var lower = string.toLowerCase()
	return lower;
};
