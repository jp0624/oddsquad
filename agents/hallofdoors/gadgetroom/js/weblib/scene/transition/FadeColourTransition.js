/* global require, AbstractSceneTransition, isUndefined, createjs */

require.include("weblib/external/createjs.min.js");
require.include("weblib/core/Util");
require.include("weblib/scene/transition/AbstractSceneTransition");


/*
* Class FadeColourTransition extends AbstractSceneTransition
*	Fades the current scene to a solid colour, then fades the next scene in from that colour
*/

FadeColourTransition.prototype = new AbstractSceneTransition();
FadeColourTransition.prototype.constructor = FadeColourTransition;

/*
* Create a new FadeColourTransition
* @param fadeTime:[Number] - How long the fade out and fade in should each last (in seconds)
* @param fadeColour:[String] - String representing the colour to fade out to / in from
*/
function FadeColourTransition(fadeTime, fadeColour){
	"use strict";

	//Call base class constructor
	AbstractSceneTransition.call(this);

	var _this = this;
	var _super = {};

	//[Number] = How long the fade out and fade in should each last (in seconds)
	var _fadeTime = isUndefined(fadeTime) ? 0 : fadeTime;

	//[String] - String representing the colour to fade out to / in from
	var _fadeColour = isUndefined(fadeColour) ? "#000000" : fadeColour;

	//[AbstractScene] - The scene to transition out of
	var _curScene;
	//[AbstractScene] - The scene to transition into
	var _nextScene;

	//[Container] - Container to add/remove scenes to/from
	var _sceneContainer;

	//[DisplayObject] - The overlay to use for fading
	var _overlay;

	//[Tween] - Tween managing the fade operation
	var _fadeTween;

	/*
	* Start executing a transition from one scene to another
	* @param curScene:AbstractScene - Current scene to be transitioned out
	* @param nextScene:AbstractScene - Scene to transition to
	*/
	_this.startTransition = function(curScene, nextScene, sceneContainer){
		_curScene = curScene;
		_nextScene = nextScene;
		_sceneContainer = sceneContainer;

		//Create the overlay
		_overlay = new createjs.Shape();
		_overlay.graphics.beginFill(_fadeColour);
		_overlay.graphics.drawRect(0, 0, _nextScene.sceneWidth, _nextScene.sceneHeight);
		_overlay.graphics.endFill();
		_overlay.cache(0, 0, _nextScene.sceneWidth, _nextScene.sceneHeight);

		//Start fading in right away if there is no current scene
		if(_curScene === null){
			_startFadeIn();
		//Otherwise, start fading the current scene out first
		}else{
			_startFadeOut();
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

		//Pause the fade tween
		if(!isEmpty(_fadeTween)){
			_fadeTween.setPaused(true);
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

		//Resume the fade tween
		if(!isEmpty(_fadeTween)){
			_fadeTween.setPaused(false);
		}
	}

	/*
	* Destroy this transition
	*/
	_super.destroy = _this.destroy;
	_this.destroy = function(){
		//Remove references to the scene container
		if(!isEmpty(_sceneContainer)){
			_sceneContainer.removeChild(_overlay);			
		}
		_sceneContainer = undefined;

		//Clean up the overlay
		if(!isEmpty(_overlay )){
			createjs.Tween.removeTweens(_overlay);
		}
		_overlay = undefined;
		_fadeTween = undefined;

		_curScene = undefined;
		_nextScene = undefined;
		
		_super.destroy();
	}

	/*
	* Start fading the current scene out
	*/
	function _startFadeOut(){
		//Fade the overlay in on top of the current scene
		_overlay.alpha = 0;
		_sceneContainer.addChild(_overlay);
		_fadeTween = createjs.Tween.get(_overlay);
		_fadeTween.to({alpha:1}, _fadeTime * 1000);
		_fadeTween.call(_handleFadeOutComplete);
	}

	/*
	* Handle completion of the current scene fading out
	*/
	function _handleFadeOutComplete(tweenEvent){ //jshint ignore:line
		createjs.Tween.removeTweens(_overlay);

		//Remove the current scene and and overlay
		_sceneContainer.removeChild(_curScene);
		_sceneContainer.removeChild(_overlay);

		//Start fading in the next scene
		_startFadeIn();
	}

	/*
	* Start fading in the next scene
	*/
	function _startFadeIn(){
		_sceneContainer.addChild(_nextScene);

		//Fade the overlay out
		_overlay.alpha = 1;
		_sceneContainer.addChild(_overlay);
		_fadeTween = createjs.Tween.get(_overlay);
		_fadeTween.to({alpha:0}, _fadeTime * 1000);
		_fadeTween.call(_handleFadeInComplete);
	}

	/*
	* Handle completion of the next scene fading in
	*/
	function _handleFadeInComplete(tweenEvent){ // jshint ignore:line
		createjs.Tween.removeTweens(_overlay);
		_sceneContainer.removeChild(_overlay);

		//Inform others of the completion of the transition
		_this.dispatchEvent(new createjs.Event(AbstractSceneTransition.COMPLETE));
	}
}