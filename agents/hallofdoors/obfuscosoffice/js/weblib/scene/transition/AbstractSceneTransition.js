/* global require, createjs */

require.include("weblib/external/createjs.min.js");

/*
* Class AbstractSceneTransition extends EventDispatcher
*	Defines the interface for a scene transition
*/

//Event type fired on completion of a scene transition
AbstractSceneTransition.COMPLETE = "complete";

//Extend EventDispatcher
AbstractSceneTransition.prototype = new createjs.EventDispatcher();
AbstractSceneTransition.prototype.constructor = AbstractSceneTransition;

/*
* Create a new AbstractSceneTransition
*/
function AbstractSceneTransition(){
	"use strict";

	//Call base class constructor
	createjs.EventDispatcher.call(this);

	var _this = this;

	//[Boolean] - Whether this transition is currently paused
	_this._paused = false;

	/*
	* Start executing a transition from one scene to another
	* @param curScene:AbstractScene - Current scene to be transitioned out
	* @param nextScene:AbstractScene - Scene to transition to
	*/
	_this.startTransition = function(curScene, nextScene, sceneContainer){ //jshint ignore:line
		//OVERRIDE in sub-classes

		//Dispatch a complete event immediately
		_this.dispatchEvent(new createjs.Event(AbstractSceneTransition.COMPLETE));
	};

	/*
	* Pause this transition
	*/
	_this.pauseTransition = function(){
		_this._paused = true;
	}


	/*
	* Resume this transition
	*/
	_this.resumeTransition = function(){
		_this._paused = false;
	}

	/*
	* Update this transition
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){ // jshint ignore:line
		//OVERRIDE in sub-classes
	};

	/*
	* Destroy this transition and clean up any references
	*/
	_this.destroy = function(){
		_this.removeAllEventListeners();
	}
}