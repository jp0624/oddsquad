/**
* Class to handle easing of particles.
* @param target: The display object for the particle we're tweening.
* @param data: The data about the tween.
* 	See particles/dataref.txt for details on the data format.
**/
function SingleEaseLogic ( target, data ) {

	var _super = {};
	var _this = AbstractObject ( this, target );

	var _target;

	var _data;

	function _construct ( target, data ) {
		_target = target;

		_data = data || TIMELINE_DATA_DEFAULT;
	
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

			// do a shallow copy of the start properties
		for ( var name in _data.start ) {
			
				// find the value if it's not undefined then assign it, otherwise we overwrite the value in some circumstances
			var value = _getValue ( _data.start [ name ], _data.start, "start" );
			if ( !isEmpty ( value ) ) {
				_target [ name ] = value;
			}
		}


			// we can have timeline with some being async					
		var targetEase = _data.targetEase;

			// preprocess the target properties
		var tweenData = { onComplete: _onCompleteListener};
		for ( var name in _data.end ) {
			var value = _getValue ( _data.end [ name ], _data.end, "end" );
			if ( !isEmpty ( value ) ) {
				tweenData [ name ] = value;
			}
		}


		TweenMax.to ( _target, _getValue ( targetEase.duration ), tweenData );
			
		
		
	}; 

	function _onCompleteListener () {
		_this.dispatchEvent(new BaseEvent ( "COMPLETE" ) );
	}

	/**
	* Update function
	* @param timePassedMS: the time passed in milliseconds since last frame.
	* @param timePassedS: The time passed in seconds since last frame.
	**/
	_this.update = function (timePasssedMS, timePassedS) {
		// Do nothing here for tweens.
	};

	return _construct ( target, data );
}