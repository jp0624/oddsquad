require.config( {"baseUrl": "js","debug": false});

require.include("weblib/external/createjs.min.js");
require.include("ballroom.highscore.functions.js");
require.include("ballroom.obstacles.functions.js");
require.include("ballroom.randomitems.functions.js");
require.include("ballroom.characteranimation.functions.js");
require.include("weblib/core/Util.js");
require.include("characterAnims.json");


var SCROLL_BOOST_AMOUNT = -1000; // The amount to scroll the target position per obstacle clicked.
var SPRING_FACTOR = 3; //springyness
var SPRING_DAMPING = 0.05; //multiplier to slow

var KEY_CODE_UP_ARROW = 38; // key code for up arrow key.
var KEY_CODE_DOWN_ARROW = 40; // key code for down arrow key.
var KEY_CODE_PG_UP = 33; // key code for page up key.
var KEY_CODE_PG_DOWN = 34; // key code for page down key.
var KEY_CODE_HOME = 36; // key code for home key.
var ARROW_SCROLL_AMOUNT = 200; // the amount to scroll when the up or down arrow is hit.
var CLICK_SCROLL_AMOUNT = 2500;

var FEET_DIVISOR = 100; // number of pixels that represents 1 foot.
var MILES_DIVISOR = 528000; // the number of pixels that represents 1 mile.
var LOCATION_SWITCH = 25000;
var EVENT_SWITCH = 100000;

//GA_obj.trackEvent("ballroom", "1000feetscrolled");


var	velocity = 0, // current speed that we're moving towards the target.
	targetPosition = 0,	// the target position that w'ere aiming towards.
	lastMousePosY, // Y coordinate of the mouse last frame.
	lastMousePosX, // X coordinate of the mouse last frame.
	interacting = false, // whether or not the user is currently interacting with the page.
	prevTime, // the time of the last frame.
	curTime, // the time of this frame.
	backgroundPos, // the position of the background.
	nextDepth = 0, // the next depth that a powerup will spawn at.
	lastYPos,
	nextLocation,
	nextEvent; // the depth that the next obstacle will spawn at.


/**
 * Listener for mouse wheel changes.
 * @param  {Mouse Event} event - Wheel moved event.
 */
function onMouseWheel(event) {
	//This detects the mouse wheel movement/change
	var deltaY = event.originalEvent.deltaY * -1;
	// move the target position the amount that the scroll wheel moved.
	targetPosition += deltaY;
}

/**
 * Listener for keypresses, scrolls the window.
 * @param  {Keyboard Event} evt The keyboard event.
 */
function onKeyDown(evt) {
	// check which key code we got, and act accordingly.
	switch(evt.keyCode) {
		case KEY_CODE_UP_ARROW:
			// up arrow pressed.
			targetPosition += ARROW_SCROLL_AMOUNT;
		break;
		case KEY_CODE_DOWN_ARROW:
			// down arrow passed.
			targetPosition -= ARROW_SCROLL_AMOUNT;
		break;
		case KEY_CODE_HOME:
			// home button pressed.
			targetPosition = 0;
		break;
		case KEY_CODE_PG_UP:
			// page up button pressed.
			targetPosition += winSize.y;
		break;
		case KEY_CODE_PG_DOWN:
			// page down button pressed.
			targetPosition -= winSize.y;
		break;
	}
};

/**
 * Listener for the start of touch / mouse interactions.
 * @param  {Mouse/Touch Event} evt - The mouse event.
 */
function onTouchStart(evt) {
	interacting = true;
	lastMousePosY = evt.pageY;
	lastMousePosX = evt.pageX;
	targetPosition -= CLICK_SCROLL_AMOUNT;
};

/**
 * Listener for the end of touch / mouse interactions.
 * @param  {Mouse/Touch Event} evt - The mouse event.
 */
function onTouchEnd(evt) {
	interacting = false;
};

/**
 * Listener for when a touch / mouse interaction moves.
 * @param  {Mouse/Touch Event} evt - The mouse/ touch event.
 */
function onTouchMove(evt) {
	if(interacting) {
		var mouseDelta = evt.pageY - lastMousePosY;
		targetPosition += mouseDelta * 2;
		lastMousePosY = evt.pageY;
		lastMousePosX = evt.pageX;
	}
};

/**
 * Add all the interaction listeners.
 */
function addInteractionListeners() {
	$(window).on('mousewheel', onMouseWheel);
	window.addEventListener("keydown",		onKeyDown, true);
	window.addEventListener("mousedown", 	onTouchStart);
	window.addEventListener("touchstart", 	onTouchStart);
	window.addEventListener("mousemove", 	onTouchMove);
	window.addEventListener("touchmove", 	onTouchMove);
	window.addEventListener("mouseup", 		onTouchEnd);
	window.addEventListener("mouseout", 	onTouchEnd);
	window.addEventListener("touchend", 	onTouchEnd);
	window.addEventListener("touchleave", 	onTouchEnd);
	window.addEventListener("touchcancel", 	onTouchEnd);
}

/**
 * Add the css classes for the start animations.
 */
function setupStartAnimations() {
	setTimeout( function() {
		$('body').addClass('startAnim1');
	}, 250);
	setTimeout( function() {
		$('body').addClass('startAnim2');
	}, 750);
	setTimeout( function() {
		$('body').addClass('startAnim3');
	}, 1300);
	setTimeout( function() {
		$('body').addClass('startAnim4');
	}, 1850);
	setTimeout( function() {
		targetPosition -= (winSize.y * 2);
	}, 2000);
}

function setupLayer () {
	if($('.layer').length < 1){
		setTimeout( setupLayer , 200);
	}

	for (i = 0; i < $('.layer').length; i++) {

		var layerReq = getNormalizedPosition('.layer'+i, 'img:nth-child(1)');
		if(layerReq.y >= 1000) {
			//console.log("I'M LOOPIN!");
			setupLayers();
			return;
		}

		if(!isFinite(layerReq.y) || !isFinite(layerReq.x)) {
			setupLayer();
			return;
		}

		//add an extra 2 to cover the top and bottom movements
		for (r = 0; r < layerReq.y + 1; r++) {
			$('.layer' + i + ' > img:nth-child(1)').clone().addClass('this-'+r).appendTo('.layer'+i);
		};
	};
}


/**
 * Setup the layers.
 */
function setupLayers() {
	//need a pre loader to avoid this detection height of less then actual like 0 on loading
	setTimeout( setupLayer , 400);
}

/**
 * Start the update loop.
 */
function startUpdateLoop()
{
	setTimeout( function() {
		window.requestAnimationFrame(update);
	}, 500);
}

/**
 * Update the text for distance travelled.
 */
function updateDistanceTravelledText() {
	var distText = (Math.floor(Math.abs(yPos / FEET_DIVISOR))) + " ft <br/>("; 	// add the distance travelled in feet."
	distText += (Math.abs(yPos / MILES_DIVISOR).toFixed(2)) + " mi)"; // add the distance travelled in miles.
	$('.distTrav').find('em').html(distText); // set the text on the element.
}

/*
 * Clamp the target position to keep it over zero.
 */
function clampTargetPosition() {
	if(targetPosition > 0) {
		targetPosition = 0;
	}
}

/**
 * Update the delta time, determining how much time has passed since the last frame.
 */
function updateDeltaTime() {
	prevTime = curTime;
	curTime = (new Date()).getTime();
	deltaTime = (curTime - prevTime) / 1000;
}

/**
 * Move the y position towards the target, using the SPRING_FACTOR and SPRING_DAMPING.
 */
function moveYPositionTowardsTarget() {
	var direction = (targetPosition) - yPos;

	direction = direction * SPRING_FACTOR;
	velocity = (velocity * SPRING_DAMPING) + direction;
	yPos = yPos + velocity * deltaTime;
}

/**
 * Update the positions of the layers.
 */
function updateLayerPositions(){
		//make animation changes here
	$('.main-scene').find('[data-drag]').each( function() {
		var drag = $(this).attr('data-drag');
		translate(this, 0, yPos*drag, 0);
	});

	$('.layer img').each( function() {
		var drag = $(this).closest('.layer').attr('data-drag');
		translate(this, 0, (yPos * drag) % ($(this).siblings().length +1 * $(this).height()), 0);
	});
};

function setLayerImages(location) {
	//console.log("WE IN THERE" + location);
	$('.layer0').children("img").each(function() {
		$(this).attr("src", "/oddsquad/img/agents/hod/ballroom/"+location+"/layer-1.jpg");
	});
	$('.layer1').children("img").each(function() {
		$(this).attr("src", "/oddsquad/img/agents/hod/ballroom/"+location+"/layer-2.png");
	});
	$('.layer2').children("img").each(function() {
		$(this).attr("src",  "/oddsquad/img/agents/hod/ballroom/"+location+"/layer-3.png");
	});
}

function fireEvent() {
	nextEvent = EVENT_SWITCH;
	// do the thing here.
	GA_obj.trackEvent("ballroom", "1000feetscrolled");
}

function switchLocations() {
	nextLocation = LOCATION_SWITCH;
	var locationPossibilities = ["ballroom", "space"];
	var location = locationPossibilities[Math.floor(Math.random() * locationPossibilities.length)];
	setCurrentRandomItemList(location);
	setLayerImages(location);
}

/**
 * Main update function.
 */
function update() {
	updateDeltaTime();

	clampTargetPosition();

	moveYPositionTowardsTarget();

	updateLayerPositions();

	updateObstacles();
	updateRandomItems();

	setCharacterSpeed(lastYPos - yPos);

	updateDistanceTravelledText();

	updateHighScore(Math.floor(Math.abs(yPos / FEET_DIVISOR)));
	displayHighScore(".highScore");
	if(!isNaN(yPos - lastYPos)) {
		nextLocation += yPos - lastYPos;
		nextEvent += yPos - lastYPos;
	}

	if(nextLocation <= 0) {
		switchLocations();
	}
	
	if(nextEvent <= 0) {
		fireEvent()
	}

	lastYPos = yPos;

	window.requestAnimationFrame(update);
}

/**
 * Gets the x and y index for an element, given the element and it's container.
 * @param  {JQuery object} container - The container that the element is in.
 * @param  {JQuery object} elem - The element in the container.
 * @return {Object}           - an Object with {x,y} properties for the x and y indices of the objects.
 */
function getNormalizedPosition(container, elem) {
	var conSize = {
			y: $(container).height(),
			x: $(container).width()
		},
		elemSize = {
			y: $(container).find($(elem)).height(),
			x: $(container).find($(elem)).width()
		}
	var elemReq = {
			y: Math.ceil(conSize.y / elemSize.y),
			x: Math.ceil(conSize.x / elemSize.x)
		}
	return elemReq;
}


/**
 * Get the window size.
 * @return {Object} and object with {x,y} representing the width and height of the window respectively.
 */
function getWinSize() {
	return winSize = {
		x:$(window).width(),
		y:$(window).height()
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
function prefix() {
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
 * Check if something exists.
 * @return {Boolean} - true if the object exists, false otherwise.
 */
$.fn.exists = function () {
    return this.length !== 0;
}

function documentReady() {
	
		$('body').flowtype({
			minimum   : 100,
			maximum   : 1500,
			fontRatio : 40
		});
		
	prefix(); // add prefixes to css.
	getWinSize(); // Get the size of the window.

	// determine SCOLL_BOOST_AMOUNT.
	SCROLL_BOOST_AMOUNT = winSize.y * -3;

	curTime = (new Date()).getTime();
	prevTime = curTime;

	backgroundPos = $('.overlay-ballroom').css('backgroundPosition').split(" ");
	xPos = backgroundPos[0],
	yPos = 0;

	addInteractionListeners();
	setupStartAnimations();
	setupLayers();

	nextLocation = LOCATION_SWITCH;
	nextEvent = EVENT_SWITCH;	

	getNextObstacleDepth();
	getNextRandomItemDepth();
	startUpHighScores();
	setupCharacterAnimation();

	startUpdateLoop();
}


(function($) {

	//initiate responsive font sizing
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
	
})(jQuery);

/**
 * Call on document ready to setup the page.
 */
$(document).ready(documentReady);