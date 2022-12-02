/* global require, ss */

require.include("weblib/ssnamespace");

/*
* class CoreUpdater Updater extends BaseParticleUpdater
*	Performs core updates required by all particles
*/

/*
* Create a new CoreUpdater
*/
ss.CoreUpdater = function(){
	"use strict";

	//Call base class constructor
	ss.BaseParticleUpdater.call(this);

	var _this = this;

	/*
	* Perform updates on all particles in a list
	* @param particles:Array[AbstractParticle] - List of particles to be updated
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.updateParticles = function(particles, delta){
		var curParticle;

		//Loop through all particles and perform core updates to them
		//NOTE: We loop from last to first since particles may be removed from the list here
		for(var i = particles.length - 1; i >= 0 ; i--){
			curParticle = particles[i];

			//Update position of particle based on its current velocity
			curParticle.x += delta * curParticle.velX;
			curParticle.y += delta * curParticle.velY;

			//Update lifetime of particle for time elapsed
			curParticle.curLife += delta;
			curParticle.normalizedLife = curParticle.curLife / curParticle.maxLife;

			//Check if this particle should be removed from the list
			if(curParticle.normalizedLife >= 1.0){
				particles.splice(i, 1);
			}
		}
	};
};

ss.CoreUpdater.prototype = new ss.BaseParticleUpdater();
ss.CoreUpdater.prototype.constructor = ss.CoreUpdater;

//Maintain backwards compatibility
var CoreUpdater = ss.CoreUpdater; //jshint ignore:line