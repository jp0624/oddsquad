require.include("weblib/external/createjs.min.js");
require.include("weblib/core/Util");


/*
* !!!!!!!!!!!!!!!!!!!!!  DEPRECATED  !!!!!!!!!!!!!!!!!!!!!!
* !!! This has been replaced by createjs/CreateJSParticleEmitter !!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/*
* Class ParticleEmitter extends Container
*	Handles the spawning and updating of particles
*/

ParticleEmitter.prototype = new createjs.Container();
ParticleEmitter.prototype.constructor = ParticleEmitter;

/*
* Create a new ParticleEmitter
*/
function ParticleEmitter(){

	//Call base class constructor
	createjs.Container.call(this);

	var _this = this;

	//BaseSpawnShape - Object that determines the placement of newly spawned particles
	var _spawnShape;

	//BaseSpawnTimer - Object that handles the timing of particle spawning
	var _spawnTimer;

	//BaseParticleFactory - Object that instantiates new particle instances
	var _particleFactory;

	//Array[BaseParticleUpdater] - List of updates to be performed on particles
	var _particleUpdaters;

	//createjs.Contaner - The container that particles should be drawn to
	var _particleContainer;

	//Boolean - Whether the emitter is currently set to emit particles
	var _isEmitting;

	//Boolean - Whether the emitter is currently paused (no emission or updates)
	var _isPaused;

	//[Boolean] - Whether this emitter should destroy itself when all existing particles have finished
	var _destroyWhenDone;

	//Array[BaseParticle] - List of particles currently in existance
	//NOTE: It would likely be more efficient to use a linked list to prevent frequent array splices on this list
	var _particles;

	//Integer - Maximum number of particles that can exist at the same time
	var _maxParticles;

	//Number - Minimum lifetime for any particle
	var _minLifetime;
	//Number - Maximum lifetime for any particle
	var _maxLifetime;

	//Point - Origin to position particles relative to
	var _particleOrigin;

	//[Boolean] - Wheter new particles should inherit the transform of this emitter container
	var _inheritTransform;

	/*
	* Initialize this particle emitter
	*/
	function _construct(){
		_spawnShape = null;
		_spawnTimer = null;
		_particleUpdaters = new Array();

		//Use the emitter itself as the default container
		_particleContainer = _this;

		_particles = new Array();
		_isEmitting = false;
		_destroyWhenDone = false;

		//We pause the emitter to start with to ensure no updates are made before the emitter is set up
		_isPaused = true;

		//Don't inherit full transform by default
		_inheritTransform = false;

		_maxParticles = 0;
		_minLifetime = 0;
		_maxLifetime = 0;

		return _this;
	}

	/*
	* Set this particle emitter up with a set of instantiated objects
	* @param maxParticles:Integer - Maximum particles that can exist at once
	* @param minLife:Number - Minimum lifetime of a particle
	* @param maxLife:Number - Maximum lifetime of a particle
	* @param spawnShape:BaseSpawnShape - Determines location and other starting properties of particles
	* @param spawnTimer:BaseSpawnTimer - Handles the timing of when particles are spawned
	* @param updaterList:Array[BaseParticleUpdater] - List of particles updaters defining particle updates to be made
	* @param particleContainer:createjs.Container [Optional] - An optional container to draw the particles to.
	* 		If not provided, particles will be drawn to this emitter object itself.
	*/
	_this.setupFromObjects = function(maxParticles, minLife, maxLife, particleFactory, spawnTimer, spawnShape, updaterList, particleContainer){
		_maxParticles = maxParticles;
		_minLifetime = minLife;
		_maxLifetime = maxLife;

		_particleFactory = particleFactory;
		_spawnTimer = spawnTimer;
		_spawnShape = spawnShape;

		//Copy all updaters into a new array of updaters
		_particleUpdaters = updaterList.concat();

		_particleContainer = particleContainer ? particleContainer : _this;

		//Start running the update loop for this emitter
		_this.resume();
	}

	/*
	* Set up this emitter using a single generic object containing configuration data
	* @param dataObj:Object - Object containing configuration data for the emitter
	* @param particleContainer:createjs.Container [Optional] - An optional container to draw the particles to.
	* 		If not provided, particles will be drawn to this emitter object itself.
	*/
	_this.setupFromJson = function(dataObj, particleContainer){

		//Set the particle container if one was provided
		_particleContainer = particleContainer ? particleContainer : _particleContainer;

		//TODO: Parse JSON data and create all required objects

		//Start running the update loop for this emitter
		_this.resume();
	}	

	/*
	* Start emitting particles
	*/
	_this.startEmit = function(destroyWhenDone){
		//Start the emitter if not currently running
		if(!_isEmitting){
			_isEmitting = true;
		}

		//Reset the spawning timer to the initial state
		_spawnTimer.resetSpawning();

		if(!isUndefined(destroyWhenDone)){
			_destroyWhenDone = destroyWhenDone;			
		}
	}

	/*
	* Stop emitting particles (existing particles will continue updating)
	* @param destroyWhenDone:[Boolean] (Optional) - Whether the emitter should destroy itself when all existing particles are gone
	*												Defaults to false
	*/
	_this.stopEmit = function(destroyWhenDone){
		//Stop the emitter if currently running
		if(_isEmitting){			
			_isEmitting = false;
		}

		//If provided, set flag for destroying when existing particles are done
		if(!isUndefined(destroyWhenDone)){
			_destroyWhenDone = destroyWhenDone;
		}
	}

	/*
	* Check if this emitter is currently emitting
	* @return:[Boolean] - True if this emitter is set to emit, false otherwise
	*/
	_this.isEmitting = function(){
		return _isEmitting;
	}

	/*
	* Pause all updates for this emitter
	*	This will suspend particle emissions and particle updates
	*/
	_this.pause = function(){
		//Pause the emitter if not already paused
		if(!_isPaused){
			_disableUpdates();
			_isPaused = true;
		}
	}

	/*
	* Resume all updates for this emitter
	*	This will resume particle emissions (if active) and particle updates
	*/
	_this.resume = function(){
		//Resume the emitter if currently paused
		if(_isPaused){
			_enableUpdates();
			_isPaused = false;
		}
	}

	/*
	* Check if this emitter is currently paused or not
	* @return:[Boolean] - True if the emitter is currently paused, false otherwise
	*/
	_this.isPaused = function(){
		return _isPaused;
	}	

	/*
	* Immediately destroy this emitter and any particles associated with it
	*/
	_this.destroy = function(){
		//Disable all updates for this emitter		
		_this.pause();

		//Remove all particles from the display container
		for(var i = 0; i < _particles.length; i++){
			_particleContainer.removeChild(_particles[i]);
		}

		//Clear the particle array
		_particles = new Array();

		//TODO: Clear the particle pool
	}

	/*
	* Set whether spawned particles should be positioned according to the full transform of this emitter.
	* @param shouldInherit:[Boolean] - Whether spawned particles should be positioned according to the full transform of this emitter.
	*	If true, spawned particles will use the global location, rotation, and scale of this emitter. (more expensive)
	*	If false, spawned particles will be positioned relative to this emitter, but will ignore its rotation and scaling. (less expensive)
	*/
	_this.setParticleInheritTransform = function(shouldInherit){
		_inheritTransform = shouldInherit;
	}

	/*
	* Handles an update tick for the particle emitter
	*/
	function _handleUpdate(tickEvent){
		var numToSpawn = 0;
		var curParticle;
		var delta = tickEvent.delta / 1000.0;
		var spawnStartIndex;		
		var i;

		if (_spawnTimer.isComplete()) {
			_this.stopEmit();
		}

		//Perform common updates for all particles (lifetime and velocity)
		for(i = _particles.length - 1; i >= 0; i--){
			curParticle = _particles[i];

			//Update position of particle based on its current velocity
			curParticle.x += delta * curParticle.velX;
			curParticle.y += delta * curParticle.velY

			//Update particle lifetime
			curParticle.curLife += delta;
			curParticle.normalizedLife = curParticle.curLife / curParticle.maxLife;

			//Check if this particle should be removed from the list
			if(curParticle.normalizedLife >= 1.0){
				_removeParticleAt(i);
			}
		}

		//Perform additional updates on any exiting particles
		for(i = 0; i < _particleUpdaters.length; i++){
			_particleUpdaters[i].updateParticles(_particles, delta);
		}

		//Check for newly emitted particles if currently emitting
		if(_isEmitting){
			numToSpawn = _spawnTimer.getSpawnNumber(delta);

			//Constrain number of spawned particles to the maximum
			numToSpawn = Math.min(numToSpawn, _maxParticles - _particles.length);

			//If new particles should be spawned, spawn them and set them up
			if(numToSpawn > 0){

				//Update the origin point for positioning particles
				//This ensures that particles will be placed properly even when adding them to another container object
				_updateParticleOrigin();
				
				spawnStartIndex = _particles.length;
				
				//Spawn the new particles
				_spawnParticles(numToSpawn);

				//Have updaters perform any required initialization on the new particles
				for(i = 0; i < _particleUpdaters.length; i++){
					_particleUpdaters[i].initParticles(_particles, spawnStartIndex, _particles.length - 1);
				}
			}

		} else {

			//if not emitting, check if all particles have completed
			if(_destroyWhenDone && _particles.length <= 0){
				_this.destroy();
			}
		}



	}

	/*
	* Helper function that enables per-frame updating of this emitter
	*/
	function _enableUpdates(){
		createjs.Ticker.addEventListener("tick", _handleUpdate);
	}

	/*
	* Helper function that disables per-frame updating of this emitter
	*/
	function _disableUpdates(){
		createjs.Ticker.removeEventListener("tick", _handleUpdate);
	}

	/*
	* Spawn a set of new particles
	* @param numToSpawn:[Number] - The number of new particles to spawn
	*/
	function _spawnParticles(numToSpawn){
		var newParticle;
		var particlePos;


		//Spawn the requested number of particles
		for(var i = 0; i < numToSpawn; i++){

			//TODO: Get the particle from a particle pool

			newParticle = _particleFactory.createParticle();
			
			_particleContainer.addChild(newParticle);
			_spawnShape.setSpawnPosition(newParticle);

			//If requested, fully transform the particle according to this emitter
			if(_inheritTransform){
				particlePos = _this.localToGlobal(newParticle.x, newParticle.y);
				particlePos = _particleContainer.globalToLocal(particlePos.x, particlePos.y);
				newParticle.x = particlePos.x;
				newParticle.y = particlePos.y;			
			//Otherwise just offset particle to account for difference between emitter location and origin of particle container
			}else{
				newParticle.x += _particleOrigin.x;
				newParticle.y += _particleOrigin.y;
			}

			_particles.push(newParticle);

			//Set a lifetime for this particle
			newParticle.maxLife = _minLifetime + Math.random() * (_maxLifetime - _minLifetime);
		}
	}

	/*
	* Remove the particle at the provided index
	* @param index:int - The index of the particle to be removed
	*/
	function _removeParticleAt(index){
		var remParticle = _particles[index];

		_particleContainer.removeChild(remParticle);
		_particles.splice(index, 1);

		//TODO: Return the particle object to the available pool

	}

	/*
	* Helper function that updates the origin point 
	*/
	function _updateParticleOrigin(){

		//Position the spawn shape according to the emitter's position
		_particleOrigin = _this.localToGlobal(0, 0);
		_particleOrigin = _particleContainer.globalToLocal(_particleOrigin.x, _particleOrigin.y);
	}

	return _construct();
}



