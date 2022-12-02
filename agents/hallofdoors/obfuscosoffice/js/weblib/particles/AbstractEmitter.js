/* global AbstractObject, setDefault, AdaptiveTimer, ShapeParticle, 
			BitmapParticle, require, SpriteSheetParticle, BaseEvent, isEmpty*/
require.include("weblib/core/AbstractObject");
require.include("weblib/utils/AdaptiveTimer");
require.include("weblib/particles/ShapeParticle");
require.include("weblib/particles/BitmapParticle");
require.include("weblib/particles/SpriteSheetParticle");
require.include("weblib/event/BaseEvent");

/**
* Abstract particle emitter class.
* 	@param instance: subclass of the emitter.
* 	@param container: the createjs container to add the particles to.
* 	@param data: the data object containing a definition of the particles to emit.
* 		see particles/dataref.txt for details on the data format.
**/
function BaseEmitter ( data, container ) {
	"use strict";
	
	var _this = AbstractObject ( this );

		// The maximum number of particles in the emitter at any given time.
	var _maxCount;

		// Update method.
	var _updateTimer;

		// How many particles to emit at each update interval.
	var _emitCount;
		
		// Pool of particle objects ready to use, so we don't need to garbage collect and create new instances.
	var _availableParticleSet;

		// if the emitter is forever repeating
	var _repeat;

		// initially spawn particles or wait for the timeout
	var _initialSpawn;

		//	The time between each set of particle emissions, in milliseconds.
	var _spawnTimer;

		// List of all particles (active and inactive)
	var _particleList;

		// List of the currently active particles.
	var _activeParticleList;

	var _container;

	/**
	* Constructor for Abstract particle emitter.
	* @param container: A create js container to attach the particles to.
	* @param data: A data object containing details of the particles to emit.
	* 		See particles/dataref.txt for examples of data objects, and a reference.
	**/
	function _construct ( data, container ) {

		_updateTimer = false;
		_container = container;

		_maxCount = setDefault ( data.maxCount, BaseEmitter.MAX_COUNT_DEFAULT);
		_emitCount = setDefault ( data.emitCount , BaseEmitter.MIN_EMIT_DEFAULT );
		_repeat = setDefault ( data.repeat, BaseEmitter.REPEAT_DEFAULT );
		_initialSpawn = setDefault ( data.initialSpawn, BaseEmitter.INITIAL_SPAWN_DEFAULT );

		// set up the pool of available particles, the list of all particles, and the list of active particles.
		_availableParticleSet = new Array( _maxCount );
		_particleList = new Array( _maxCount );

		for ( var i = 0; i < _maxCount; i++ ) {
			var particle = _getParticleType ( data.particle );
			//particle.addEventListener ( "PARTICLE_COMPLETE", _onParticleComplete_listener );
			_availableParticleSet[i] = particle;
			_particleList[i] = particle ;
		}

		_spawnTimer = new AdaptiveTimer ( setDefault ( data.interval, BaseEmitter.INTERVAL_DEFAULT ) ) ;
		_spawnTimer.addEventListener ( "UPDATE", _onSpawnParticle_listener );

		return _this;
	}

	/**
	* Sets the type of particle for the emitter.
	* @param particleData: Data about the particle to create. 
	* @returns : A particle of the given type.
	**/
	function _getParticleType ( particleData ) {
		if ( ShapeParticle.isType ( particleData.type ) ) {
			return new ShapeParticle ( particleData, _this );
		} else if ( BitmapParticle.isType ( particleData.type ) ) {
			return new BitmapParticle ( particleData, _this );
		} else if ( SpriteSheetParticle.isType ( particleData.type ) ) {
			return new SpriteSheetParticle ( particleData, _this );
		}
	}

	/**
	* Gets a new particle from the available particles pool.
	* @returns: a new particle.
	**/
	function _getNewParticleFromPool () {

			// check if there are any particle left to spawn
		if ( _availableParticleSet.length > 0 ) {
			return _availableParticleSet.pop ();
		}
			
			// too many particles, so stop spawning
		return false;
	}

	/*
	* Event handler for when particles are spawned.
	*/	
	function _onSpawnParticle_listener ( ) {
		
		//TESTING
		//console.log("On Spawn Particle!");

			// check if we hit our maximum particle count, if not find an available particle
		for ( var i = 0; i < _emitCount; i++ ) {
			var particle = _getNewParticleFromPool ();

			if ( particle !== false ) {
					// push the particle onto the active list.
				if(_updateTimer) {
					_activeParticleList.push ( particle );
				}
				particle.start ();

				// add the particle's ( material ) to the stage
				_container.addChild ( particle.displayObject () );
			}
		}
	}

	this.particleComplete = function( particle ) {		
			// add this to the available partic set. The source should be the particle instance
		
		if ( _repeat ) {
			_availableParticleSet.unshift ( particle );
			if ( _availableParticleSet.length == 0 ) {
				_this.stop ();
			}
		} 



			// remove the particle from the active list.
		if(_updateTimer) {
			_activeParticleList.splice(_activeParticleList.indexOf(particle), 1);
		}
		if(!isEmpty(_container)) {
			_container.removeChild ( particle.displayObject () );
		}
	}

	function _onUpdate_listener ( event ) {
		for ( var i = 0; i < _activeParticleList.length; i++ ) {
			_activeParticleList [ i ].update ( event.elapsedTime, event.delta );
		}
	}

	_this.start = function () {
		_spawnTimer.start ();

		if ( _initialSpawn ) {
			_onSpawnParticle_listener ();
		}
	};

	_this.stop = function () {
		_spawnTimer.stop();
	}

	_this.updateTimer = function ( val ) {
		if ( isEmpty ( val ) && val !== _updateTimer ) {

			_activeParticleList = undefined;
			_activeParticleList = [];

			if( !isEmpty( _updateTimer ) ) {
				_updateTimer.removeEventListener ( "UPDATE", _onUpdate_listener );
			}

			_updateTimer = val;
			_updateTimer.addEventListener ( "UPDATE", _onUpdate_listener );
		}

		return _updateTimer;
	};

	_this.release = function () {
		_this = undefined;
		_maxCount = undefined;
		_updateTimer = undefined;
		_emitCount = undefined;
		_availableParticleSet = undefined;
		_repeat = undefined;
		_initialSpawn = undefined;
		_spawnTimer = undefined;
		_particleList = undefined;
		_activeParticleList = undefined;
		_container = undefined;
	}

	return _construct ( data, container );
}

// default value for the max count of particles active at any given time.
BaseEmitter.MAX_COUNT_DEFAULT = 100;

// default minimum emession amount.
BaseEmitter.MIN_EMIT_DEFAULT = 1;

// default interval between emissions.
BaseEmitter.INTERVAL_DEFAULT = 100;

// default value for whether or not to repeat.
BaseEmitter.REPEAT_DEFAULT = true;

// default value for whether or not to spawn particles on start (as opposed to after a timeout).
BaseEmitter.INITIAL_SPAWN_DEFAULT = true;