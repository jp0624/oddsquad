require.include("weblib/core/Util");

function AdaptiveTimer ( interval) {
	
	var _super = {};
	var _this = AbstractObject ( this );

	var _intervalTime;
	var _LastUpdateTimestamp;
	var _isActive;
	var _timeout;

	function _construct ( interval) {
		_intervalTime = Math.round ( interval );
		_isActive = false;
		_timeout = undefined;

		return _this;
	}

	function _onUpdate_listener () {

		//var currentTime = new Date ().getTime ();
		var currentTime = Date.now();
		//var newUpdateTime = _intervalTime - _LastUpdateTimestamp;
		//newUpdateTime = Math.max ( _intervalTime, newUpdateTime );

		var elapsedTime = currentTime - _LastUpdateTimestamp;
		var delta = elapsedTime / 1000.0; 

		_this.dispatchEvent ( new Event ( "UPDATE", { "elapsedTime" : elapsedTime, "delta" : delta } ) );

		_LastUpdateTimestamp = currentTime;

		if ( _isActive ) {
			_timeout = setTimeout (_onUpdate_listener, _intervalTime);
			//_timeout = setTimeout (function(){_onUpdate_listener();}, _intervalTime);
		}
	}

	_this.start = function () {

		_isActive = true;
		_LastUpdateTimestamp = new Date ().getTime ();

		//Stop any existing timeout
		if(isDefined(_timeout)){
			clearTimeout(_timeout);
		}

		_timeout = setTimeout (_onUpdate_listener, _intervalTime);
		//_timeout = setTimeout (function(){_onUpdate_listener();}, _intervalTime);
	}

	_this.stop = function () {
		_isActive = false;
		clearTimeout ( _timeout );
		_timeout = undefined;
	}

	_super.release = _this.release;
	_this.release = function () {

		_super.release ();
		_isActive = false;
		clearTimeout ( _timeout );

		_intervalTime = undefined;
		_LastprocessingTime = undefined;
		_isActive = undefined;
		_timeout = undefined;
	}

	return _construct ( interval );
}