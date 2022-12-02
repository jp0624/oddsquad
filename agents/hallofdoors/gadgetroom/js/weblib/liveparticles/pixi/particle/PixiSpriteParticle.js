/*
* Class PixiSpriteParticle extends PIXI.Sprite, AbstractParticle
*	Handles a particle based on a Pixi Sprite
*/
require.include("weblib/external/pixi.js");
require.include("weblib/ssnamespace");
require.include("weblib/liveparticles/AbstractParticle");

/*
* Create a new PixiSpriteParticle
* @param texture:[PIXI.Texture] - Texture specifying what to draw for this particle
* @param pivotX:[Number] (Optional) - X coordinate to use for the pivot point for this particle
* @param pivotY:[Number] (Optional) - Y coordinate to use for the pivot point for this particle
*/
ss.PixiSpriteParticle = function(texture, pivotX, pivotY){
	//Call base class constructors
	PIXI.Sprite.call(this, texture);
	ss.AbstractParticle.call(this);

	//Set the pivot point for this particle
	this.pivot.x = pivotX !== undefined ? pivotX : 0;
	this.pivot.y = pivotY !== undefined ? pivotY : 0;
}

//Extend PIXI.Sprite
ss.PixiSpriteParticle.prototype = Object.create(PIXI.Sprite.prototype);
ss.PixiSpriteParticle.prototype.constructor = ss.PixiSpriteParticle;