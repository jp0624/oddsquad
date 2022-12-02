/* global require, CommandSet, CommandQueue, IsNumeric */
require.include ("weblib/command/CommandPackage");

// Singleton effects class to hold various effects.
var Effects = Effects || new function() {};

// Time between each shake cycle.
Effects.BETWEEN_SHAKES_TIME = 0.05;

// make a command queue to cancel old shakes optionally.
Effects.shakeQueue = new CommandQueue(null, true);

/*
* Shake a createjs Display Object.
* @param displayObject: The object to shake.
* @param duration (optional): how long to shake (in seconds, defaults to 0.25).
* @param amount (optional) : the max diameter of the shake, in pixels. The object will shake 1/2 this value away from it's starting  point. Defaults to 50.
* @param interrupt: true to stop any currently running shakes before starting this one.
*/
Effects.shakeDisplayObject = function (displayObject, duration, amount, interrupt) {
	"use strict";

	// check if the duration is set, and if not, use the default.
	if(typeof duration !== "number") {
		duration = 0.25;
	}

	// check if the amount is set, and if not, use the default.
	if (typeof amount !== "number") {
		amount = 50;
	}

	// If interrupt is set, cancel any previously running shakes.
	if(interrupt === true) {
		Effects.shakeQueue.cancel ();
	}

	// get the original position of the object.
	var originalX = displayObject.x;
	var originalY = displayObject.y;

	// create a command set for the shake, tweening to a new random position every 0.05 seconds.
	var commandSet = new CommandSet();
	for(var i = 0; i < duration - Effects.BETWEEN_SHAKES_TIME; i+= Effects.BETWEEN_SHAKES_TIME) {
		commandSet.tweenTo(displayObject, Effects.BETWEEN_SHAKES_TIME, {
				"x": originalX + Math.random() * amount - (amount / 2),
				"y": originalY + Math.random() * amount - (amount / 2)
			});
	}
	commandSet.tweenTo(displayObject, Effects.BETWEEN_SHAKES_TIME, { "x": originalX, "y": originalY });

	// execute the shake.
	Effects.shakeQueue.queue ( commandSet );
};

/*
* Shake a DOM Object.
* @param displayObject: The object to shake.
* @param duration (optional): how long to shake (in seconds, defaults to 0.25).
* @param amount (optional) : the max diameter of the shake, in pixels. The object will shake 1/2 this value away from it's starting  point. Defaults to 50.
* @param interrupt: true to stop any currently running shakes before starting this one.
*/
Effects.shakeDomObject = function (domObject, duration, amount, interrupt) {
	"use strict";

	// check if the duration is set, and if not, use the default.
	if(isNaN(duration)) {
		duration = 0.25;
	}

	// check if the amount is set, and if not, use the default.
	if (isNaN(amount)) {
		amount = 50;
	}

	// If interrupt is set, cancel any previously running shakes.
	if(interrupt === true) {
		Effects.shakeQueue.cancel ();
	}

	// get the original position of the object.
	var originalX = domObject.style.left;
	var originalY = domObject.style.top;

	// create a command set for the shake, tweening to a new random position every 0.05 seconds.
	var commandSet = new CommandSet();
	for(var i = 0; i < duration - Effects.BETWEEN_SHAKES_TIME; i+= Effects.BETWEEN_SHAKES_TIME) {
		commandSet.tweenTo(domObject, Effects.BETWEEN_SHAKES_TIME, {
				"left": originalX + Math.random() * amount - (amount / 2),
				"top": originalY + Math.random() * amount - (amount / 2)
			});
	}
	commandSet.tweenTo(domObject, Effects.BETWEEN_SHAKES_TIME, { "left": originalX, "top": originalY });

	// execute the shake.
	Effects.shakeQueue.queue ( commandSet );
};