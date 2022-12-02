/* global require, AbstractSceneTransition, Vector2, isEmpty, createjs, console, ss */

require.include("weblib/external/createjs.min.js");
require.include("weblib/core/Util");
require.include("weblib/math/geom/Vector2");
require.include("weblib/scene/transition/AbstractSceneTransition");
require.include("weblib/sound/SoundManager");

/*
* Class PanTransition extends AbstractSceneTransition
*	Transitions to the next scene by panning the current one out and simultaneously panning the next one in
*/

//Extend EventDispatcher
PanTransition.prototype = new AbstractSceneTransition();
PanTransition.prototype.constructor = PanTransition;

//Possible directions for panning
PanTransition.LEFT = "left";
PanTransition.RIGHT = "right";
PanTransition.UP = "up";
PanTransition.DOWN = "down";

/*
* Create a new PanTransition
* @param panTime:[Number] - Duration of the pan effect (in seconds)
* @param panDirection:[String] (Optional) - An enumerated value indicating the direction to pan (Defaults to LEFT)
* @param interpolationFunc:[Function] (Optional) - An interpolation function for the panning (Defaults to linear)
* @param panSound:[String] (Optional) - Name of a sound effect to play 
*/
function PanTransition(panTime, panDirection, interpolationFunc, panSound){
	"use strict";

	//Call base class constructor
	AbstractSceneTransition.call(this);

	var _this = this;
	var _super = {};

	//[Number] - Duration of the pan effect (in seconds)
	var _panTime = panTime;

	//[String] - Enumerated value for the direction of panning
	var _panDirection = isEmpty(panDirection) ? PanTransition.LEFT : panDirection;

	//[Function] - An interpolation function for the panning
	var _interpFunc = isEmpty(interpolationFunc) ? createjs.Ease.linear : interpolationFunc;

	//[String] - Name of a sound to play when performing the pan effect
	var _panSoundName = isEmpty(panSound) ? null : panSound;

	//[AbstractScene] - The currently displayed scene
	var _curScene = null;
	//[AbstractScene] - The scene to be displayed next
	var _nextScene = null;

	//[Container] - The container which scenes are displayed in
	var _sceneContainer = null;

	//[Tween] - Tween moving the current scene
	var _curSceneTween = null;
	//[Tween] - Tween moving the next scene
	var _nextSceneTween = null;

	

	//[Vector2] - Ve
	//var _panVelocity;

	/*
	* OVERRIDE
	* Start executing a transition from one scene to another
	* @param curScene:AbstractScene - Current scene to be transitioned out
	*		NOTE: If curScene is null, the next scene will be transitioned in right away
	* @param nextScene:AbstractScene - Scene to transition to
	*/
	_this.startTransition = function(curScene, nextScene, sceneContainer){
		var curTarget;		

		_curScene = curScene;
		_nextScene = nextScene;
		_sceneContainer = sceneContainer;

		//Position the next scene and current scene destination based on direction
		switch(_panDirection){
			case PanTransition.LEFT:
				_nextScene.x = _nextScene.sceneWidth;
				_nextScene.y = 0;
				curTarget = new Vector2(-nextScene.sceneWidth, 0);
				break;
			case PanTransition.RIGHT:
				_nextScene.x = -_nextScene.sceneWidth;
				_nextScene.y = 0;
				curTarget = new Vector2(nextScene.sceneWidth, 0);
				break;
			case PanTransition.UP:
				_nextScene.x = 0;
				_nextScene.y = _nextScene.sceneHeight;
				curTarget = new Vector2(0, -_nextScene.sceneHeight);
				break;
			case PanTransition.DOWN:
				_nextScene.x = 0;
				_nextScene.y = -nextScene.sceneHeight;
				curTarget = new Vector2(0, _nextScene.sceneHeight);
				break;
			default:
				console.log("!! WARNING !! - Unsupported pan direction: " + _panDirection);
				break;
			
		}

		//If there is a current scene, create and start a tween for it
		if(_curScene !== null){
			_curSceneTween = createjs.Tween.get(_curScene);
			_curSceneTween.to({x:curTarget.x, y:curTarget.y}, _panTime * 1000, _interpFunc);
		}

		//Create and start a tween for the next scene
		_sceneContainer.addChild(_nextScene);
		_nextSceneTween = createjs.Tween.get(_nextScene);
		_nextSceneTween.to({x:0, y:0}, _panTime * 1000, _interpFunc);
		_nextSceneTween.call(_handlePanComplete);

		//Play a sound effect for the panning
		if(_panSoundName !== null){
			ss.SoundManager.playSound(_panSoundName, ss.SoundPriority.MULTI_CHANNEL_ONLY);
		}
	};

	/*
	* OVERRIDE
	* Pause this transition
	*/
	_super.pauseTransition = _this.pauseTransition;
	_this.pauseTransition = function(){
		//Do nothing if already paused
		if(_this._paused){
			return;
		}

		_super.pauseTransition();

		if(!isEmpty(_curSceneTween)){
			_curSceneTween.setPaused(true);
		}

		if(!isEmpty(_nextSceneTween)){
			_nextSceneTween.setPaused(true);
		}

	}


	/*
	* Resume this transition
	*/
	_super.resumeTransition = _this.resumeTransition;
	_this.resumeTransition = function(){
		//Do nothing if not paused
		if(!_this._paused){
			return;
		}

		_super.resumeTransition();

		if(_curSceneTween !== null){
			_curSceneTween.setPaused(false);
		}

		if(_nextSceneTween !== null){
			_nextSceneTween.setPaused(false);
		}
	}

	/*
	* Update this transition
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){ // jshint ignore:line
		//OVERRIDE in sub-classes
	};

	/*
	* Destroy this transition
	*/
	_super.destroy = _this.destroy;
	_this.destroy = function(){
		if(!isEmpty(_curScene)){
			createjs.Tween.removeTweens(_curScene);
		}
		_curScene = undefined;
		_curSceneTween = undefined;

		if(!isEmpty(_nextScene)){
			createjs.Tween.removeTweens(_nextScene);
		}
		_nextScene = undefined;
		_nextSceneTween = undefined;

		_sceneContainer = undefined;
		
		_super.destroy();
	}

	/*
	* Handle completion of the panning operation
	*/
	function _handlePanComplete(tweenEvent){ // jshint ignore:line
		//Clean the current scene and any tweens on it
		if(_curScene !== null){
			createjs.Tween.removeTweens(_curScene);
			_sceneContainer.removeChild(_curScene);
			_curSceneTween = null;
		}
		createjs.Tween.removeTweens(_nextScene);
		_nextSceneTween = null;

		//Dispatch a complete event 
		_this.dispatchEvent(new createjs.Event(AbstractSceneTransition.COMPLETE));
	}
}

