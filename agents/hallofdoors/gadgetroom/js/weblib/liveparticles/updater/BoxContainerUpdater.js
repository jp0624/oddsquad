/* global require, ss, MathUtils */

require.include("weblib/ssnamespace");
require.include("weblib/math/geom/Rectangle");
require.include("weblib/math/MathUtils");
require.include("weblib/core/Util");
require.include("weblib/liveparticles/updater/BaseParticleUpdater");

/*
* class BoxContainerUpdater extends BaseParticleUpdater
*	Updates particles to keep them contained in a box
* @param rectBounds:[Rectangle] - Rectangle defining the bounds of the container box
* @param particleWidth:[Number] - Width to use for each particle
* @param particleHeight:[Number] - Height to use for each particle
*/
ss.BoxContainerUpdater = function(rectBounds, particleWidth, particleHeight){
	"use strict";

	//Call base class constructor
	ss.BaseParticleUpdater.call(this);

	var _this = this;

	//[Rectangle] - Rectangle defining the bounds for the particle
	var _bounds = rectBounds;


	//[Number] - Width to use for each particle
	var _partHalfWidth = particleWidth / 2;
	//[Number] - Height to use for each particle
	var _partHalfHeight = particleHeight / 2;

	/*
	* Initializes a set of particles for use by this updater
	* @param particles:Array[AbstractParticle] - List of particles to be updated	
	* @param startIndex:int - The index to start updating at
	* @param endIndex:int - The index to end updating at
	*/
	_this.initParticles = function(particles, startIndex, endIndex){

		for(var i = startIndex; i <= endIndex; i++){
			//Constrain spawned particles to the box
			particles[i].x = MathUtils.clamp(particles[i].x, _bounds.p1.x + 1, _bounds.p2.x - 1);
			particles[i].y = MathUtils.clamp(particles[i].y, _bounds.p1.y + 1, _bounds.p2.y - 1);
		}
	};

	/*
	* Perform updates on all particles in a list
	* @param particles:Array[AbstractParticle] - List of particles to be updated
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.updateParticles = function(particles, delta){ //jshint ignore:line
		var curParticle;

		for(var i = 0; i < particles.length; i++){
			curParticle = particles[i];

			if(curParticle.x < _bounds.p1.x + _partHalfWidth){
				curParticle.x = _bounds.p1.x + _partHalfWidth;
				if(curParticle.velX < 0){
					curParticle.velX = -curParticle.velX;
				}
			} 
			if(curParticle.x > _bounds.p2.x - _partHalfWidth){
				curParticle.x = _bounds.p2.x - _partHalfWidth;
				if(curParticle.velX > 0){
					curParticle.velX = -curParticle.velX;
				}
			}

			if(curParticle.y < _bounds.p1.y + _partHalfHeight){
				curParticle.y = _bounds.p1.y + _partHalfHeight;
				if(curParticle.velY < 0){
					curParticle.velY = -curParticle.velY;
				}
			} 
			if(curParticle.y > _bounds.p2.y - _partHalfHeight){
				curParticle.y = _bounds.p2.y - _partHalfHeight;
				if(curParticle.velY > 0){
					curParticle.velY = -curParticle.velY;
				}
			}

		}
	};

	_this.updateBounds = function(x1, y1, x2, y2){
		_bounds.p1.x = x1;
		_bounds.p1.y = y1;
		_bounds.p2.x = x2;
		_bounds.p2.y = y2;
	};

};

//Maintain backwards compatibility
var BoxContainerUpdater = ss.BoxContainerUpdater; //jshint ignore:line