function BitmapParticle ( data, emitter) {
	
	var _super = {};
	var _this = AbstractObject ( this );

	var _emitter;
	var _bitmap;

	var _easeLogic;

	function _construct ( data ) {

		_emitter = emitter;

		_bitmap = data.bitmap.clone();//AssetManager.getBitmap ( data.bitmap );
		_bitmap.mouseEnabled = false;
			// each particle has it's own easeLogic
		_easeLogic = EaseLogic.getEaseLogic(_bitmap, data.ease);		
		_easeLogic.addEventListener ( "COMPLETE", _onParticleComplete_listener );

		return _this;
	}

	function _onParticleComplete_listener ( event ) {
		_emitter.particleComplete( _this );
	}

	_this.displayObject = function () {
		return _bitmap;
	}

	/**
	* Update function
	* @param timePassedMS: the time passed in milliseconds since last frame.
	* @param timePassedS: The time passed in seconds since last frame.
	**/
	_this.update = function (timePasssedMS, timePassedS) {
		_easeLogic.update(timePasssedMS, timePassedS);
	}

	_this.start = function () {

			// delegate the easing to the assigned ease logic
		_easeLogic.start ();
	}


	return _construct ( data, emitter );
}

BitmapParticle.isType = function ( type ) {
	if ( type == BitmapParticle.BITMAP ) {
		return true;
	}

	return false;
}


BitmapParticle.BITMAP = "BitmapParticle.BITMAP";