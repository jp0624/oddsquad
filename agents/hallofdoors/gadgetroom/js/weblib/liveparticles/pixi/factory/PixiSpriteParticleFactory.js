/*
* Class PixiSpriteParticleFactory
*	Creates Pixi Sprite particles for use by a particle emitter
*/

require.include("weblib/external/pixi.js");
require.include("weblib/ssnamespace");
require.include("weblib/liveparticles/pixi/particle/PixiSpriteParticle");

/*
* Create a new PixiSpriteParticleFactory
* @param texture:[PIXI.Texture] - The texture to create the particles from
*/
ss.PixiSpriteParticleFactory = function(texture){
	var _this = this;

	//[PIXI.Texture] - The texture used to create new particles
	var _texture;

	//[Number] - X coordinate for the particle to rotate and scale around
	var _spritePivotX;
	//[Number] - Y coordinate for the particle to rotate and scale around
	var _spritePivotY;

	function _construct(texture){
		
		_texture = texture;

		_spritePivotX = _texture.width / 2;
		_spritePivotY = _texture.height / 2;

		return _this;
	}

	/*
	* Create a new particle
	*/
	_this.createParticle = function(){
		
		return new ss.PixiSpriteParticle(_texture, _spritePivotX, _spritePivotY);
	}

	return _construct(texture);
}
