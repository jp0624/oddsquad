/* global createjs, require, SceneEvent */

require.include("weblib/external/createjs.min.js");
require.include("weblib/scene/SceneEvent.js");

AbstractScene.prototype = new createjs.Container();
AbstractScene.prototype.constructor = AbstractScene;

/*
* Class AbstractScene extends AbstractEventDispatcher
*	Defines the interface that all scenes are expected to implement
*/
function AbstractScene(width, height){
	"use strict";

	createjs.Container.call(this);
	var _this =  this;//AbstractEventDispatcher(this);

	//[Number] - Width of this scene (in pixels)
	_this.sceneWidth = width;
	//[Number] - Height of this scene (in pixels)
	_this.sceneHeight = height;

	//[Boolean] - Whether this scene is currently paused
	_this._paused = false;

	function _construct(){
		return _this;
	}

	/*
	* Initialize this scene with data specific to it
	*/
	_this.initWithData = function(dataObj){ // jshint ignore:line

	};

	/*
	* Check if this scene is loaded and ready to be started
	* @return:[Boolean] - True if this scene is loaded, false otherwise
	*/
	_this.isLoaded = function(){
		return true;
	};

	/*
	* Have this scene load any additional content it requires
	*/
	_this.loadScene = function(){
		//OVERRIDE in subclasses to start loading additional content

		//Dispatch a loaded event right away by default
		this.dispatchEvent(new SceneEvent(SceneEvent.LOADED), null, null);
	};

	/*
	* Have the scene perform any necessary starting operations
	*/
	_this.startScene = function(){
	};

	/*
	* Update this scene
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.updateScene = function(delta){ // jshint ignore:line

	};

	/*
	* Pause this scene
	*/
	_this.pauseScene = function(){
		_this._paused = true;
	};

	/*
	* Resume running this scene
	*/
	_this.resumeScene = function(){
		_this._paused = false;
	};

	/*
	* Check if this scene is currently paused
	* @return:[Boolean] - True if the scene is paused, false otherwise
	*/
	_this.isPaused = function(){
		return _this._paused;
	};

	/*
	* Have this scene clean up any resources
	*/
	_this.destroyScene = function(){

	};

	return _construct();
}