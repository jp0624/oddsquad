function SpriteSheetParticle ( data, emitter ) {


	var _super = {};
	var _this = AbstractObject ( this );

	var _spriteSheet;
	var _sprite;

	var _emitter;

	var _easeLogic;

	function _construct ( data ) {

		_emitter = emitter;

		_spriteSheet = new createjs.SpriteSheet ( data.spriteSheet );

		_sprite = new createjs.Sprite ( _spriteSheet );
		_sprite.mouseEnabled = false;
		_sprite.framerate = 1;
		_container.addChild ( _sprite );

			// each particle has it's own easeLogic
		_easeLogic = EaseLogic.getEaseLogic(_container, data.ease);		
		_easeLogic.addEventListener ( "COMPLETE", _onParticleComplete_listener );

		return _this;
	}

	function _onParticleComplete_listener ( event ) {
		_emitter.particleComplete( _this );
	}

	_this.displayObject = function () {
		return _sprite;
	}

	_this.start = function () {

		_sprite.gotoAndPlay ( "default" );

			// delegate the easing to the assigned ease logic
		_easeLogic.start ();
	}

	/**
	* Update function
	* @param timePassedMS: the time passed in milliseconds since last frame.
	* @param timePassedS: The time passed in seconds since last frame.
	**/
	_this.update = function (timePasssedMS, timePassedS) {
		_easeLogic.update(timePasssedMS, timePasssedS);
	}

	return _construct ( data, emitter );
}

SpriteSheetParticle.isType = function ( type ) {
	if ( type == SpriteSheetParticle.SPRITESHEET ) {
		return true;
	}

	return false;
}


SpriteSheetParticle.SPRITESHEET = "SpriteSheetParticle.SPRITESHEET";