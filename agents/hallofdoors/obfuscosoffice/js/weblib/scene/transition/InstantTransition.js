/* global require, createjs, AbstractSceneTransition */

require.include("weblib/external/createjs.min.js");
require.include("weblib/core/Util");
require.include("weblib/scene/transition/AbstractSceneTransition");

/*
* Class InstantTransition extends AbstractSceneTransition
*	Transitions to the next scene immediately with no effects
*/

//Extend EventDispatcher
InstantTransition.prototype = new AbstractSceneTransition();
InstantTransition.prototype.constructor = InstantTransition;

/*
* Create a new InstantTransition
*/
function InstantTransition(){
	"use strict";

	//Call base class constructor
	AbstractSceneTransition.call(this);

	var _this = this;
	var _super = {};

	/*
	* OVERRIDE
	* Start executing a transition from one scene to another
	* @param curScene:AbstractScene - Current scene to be transitioned out
	*		NOTE: If curScene is null, the next scene will be transitioned in right away
	* @param nextScene:AbstractScene - Scene to transition to
	*/
	_this.startTransition = function(curScene, nextScene, sceneContainer){

		//If there is a current scene, remove it
		if(curScene !== null){
			sceneContainer.removeChild(curScene);
		}

		//Add the next scene and dispatch a complete event
		sceneContainer.addChild(nextScene);
		_this.dispatchEvent(new createjs.Event(AbstractSceneTransition.COMPLETE));
	};

	/*
	* Update this transition
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){ // jshint ignore:line
		//OVERRIDE in sub-classes
	};

	// _super.destroy = _this.destroy;
	// _this.destroy = function(){

	// 	_super.destroy();
	// }
}
