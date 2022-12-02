require.include("weblib/particles/SingleEaseLogic");

var EaseLogic = EaseLogic || new function () {

	var _this = this;

	_this.easeTypes = [];

	function _construct () {

		_this.TIMELINE = "EaseLogic.TIMELINE";
		_this.SINGLE = "EaseLogic.SINGLE";
	}

	_this.getEaseLogic = function ( target, data ) {
		switch(data.type) {
			case _this.TIMELINE:
				return new TimelineEaseLogic( target, data );
			case _this.SINGLE:
				return new SingleEaseLogic( target, data );
		}

	}

	return _construct ();
}

EaseLogic.TIMELINE = "EaseLogic.TIMELINE";


function getMouseX ( target, data ) {
	var val = 200;//GameModel.stage ().mouseX; 
	return val;
}

function getMouseY ( target, data ) {
	var val = 200;//GameModel.stage ().mouseY; 
	return val;
}

function _random ( target, data ) {
	return Math.random () * 400;
}

var test = {
	"value" : function ( target, data ) {
		return 500;
	} 
}

function RadialSpread () {

	var _this = this;

	function _construct () {

	}

	_this.value = function ( target, data, local ) {

		var startAngle = local.startAngle;
		var endAngle = local.endAngle;
		
		var distance = local.distance;

		startAngle = startAngle * Math.PI / 180.0;
		endAngle = endAngle * Math.PI / 180.0;

		var t = Math.random ();
		var angle = ( t * startAngle ) + ( ( 1.0 - t ) * endAngle );

			// asign the new x and y value to the local
		local.x = target.x + ( Math.cos ( angle ) * distance );
		local.y = target.y + ( Math.sin ( angle ) * distance );

		return undefined;
	}

	return _construct ();
}

var BasicRadialSpread = new RadialSpread ();


var TIMELINE_DATA_DEFAULT = {
	"type" : EaseLogic.TIMELINE,
	"start" : { "x" : getMouseX, "y" : getMouseY, "alpha" : [ 0, 1 ] },
	"targetEase" : [
		{ "duration" : [ 0, 2 ], "data" : { "radialSpread" : BasicRadialSpread, "distance" : 200, "startAngle" : -45, "endAngle" : 90, "t" : 1, "alpha" : 0 } }
		
	]
}

/**
* Class to handle easing of particles.
* @param target: The display object for the particle we're tweening.
* @param data: The data about the tween.
* 	See particles/dataref.txt for details on the data format.
**/
function TimelineEaseLogic ( target, data ) {

	var _super = {};
	var _this = AbstractObject ( this, target );

	var _target;

	var _duration;

	var _commandQueue;

	var _data;

	function _construct ( target, data ) {
		_target = target;

		_data = data || TIMELINE_DATA_DEFAULT;

			// Create a commandQueue and start it
		_commandQueue = new CommandQueue ();
		_commandQueue.start ();


		return _this;
	}

	function _getValue ( value, local, accessor ) {

			// allow for a range
		if ( value instanceof Array ) {
			var t = Math.random ();
			return ( t * value [ 0 ] ) + ( ( 1.0 - t ) * value [ 1 ] );

			// allow for a simple function call
		} else if ( value instanceof Function ) {
			return value ( _target, _data, local );

			// allow for a class that uses start ( target, data ) or end ( target, data )
		} else if ( ( typeof ( value ) == "object" ) && value [ accessor ] instanceof Function )  {
			return value [ accessor ] ( _target, _data, local );
		
			// generic value that tests value ( target, data )
		} else if ( value.value instanceof Function ) {
			return value.value ( _target, _data, local );
		}

		return value;
	}

	_this.start = function () {


			// cancel the commandSet
		_commandQueue.cancel ();

			// do a shallow copy of the start properties
		for ( var name in _data.start ) {
			
				// find the value if it's not undefined then assign it, otherwise we overwrite the value in some circumstances
			var value = _getValue ( _data.start [ name ], _data.start, "start" );
			if ( !isEmpty ( value ) ) {
				_target [ name ] = value;
			}
		}

			// we can have timeline with some being async
		var commandSet = new CommandSet ();
		for ( var i = 0; i < _data.targetEase.length; i++ ) {
						
			var targetEase = _data.targetEase [ i ];

				// preprocess the target properties
			var tweenData = {};
			for ( var name in targetEase.data ) {
				var value = _getValue ( targetEase.data [ name ], targetEase.data, "end" );
				if ( !isEmpty ( value ) ) {
					tweenData [ name ] = value;
				}
			}

			//commandSet.apply ( function () { console.log ( "About to dispatch" ) } ) ;
			commandSet.tweenTo ( _target, _getValue ( targetEase.duration ), tweenData ).async ( setDefault ( targetEase.async, false ) );
			
		}

		commandSet.dispatchEvent ( _this, new BaseEvent ( "COMPLETE" ) );
		_commandQueue.queue ( commandSet );
	}; 

	/**
	* Update function
	* @param timePassedMS: the time passed in milliseconds since last frame.
	* @param timePassedS: The time passed in seconds since last frame.
	**/
	_this.update = function (timePasssedMS, timePassedS) {
		// Do nothing here for tweens.
	}

	return _construct ( target, data );
}

