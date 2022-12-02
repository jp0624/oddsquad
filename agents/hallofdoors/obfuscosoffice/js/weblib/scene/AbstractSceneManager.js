/*
* Class AbstractSceneManager
*	Defines the interface for all scene managers
*/

/*
* Create a new AbstractSceneManager
* @param sceneContainer:[Container] - Container to draw scenes to
* @param sceneFactory:[AbstractSceneFactory] - Object to use to generate new scenes
* @param width:[Integer] - Width of the entire scene area (in pixels)
* @param height:[Integer] - Height of the entire scene area (in pixels)
*/
function AbstractSceneManager(sceneContainer, sceneFactory, width, height){ // jshint ignore:line
	"use strict";

	var _this = this;

	//[Integer] - Width of the entire scene area (in pixels)
	_this._sceneWidth = width;
	//[Integer] - Height of the entire scene area (in pixels)
	_this._sceneHeight = height;

	/*
	* Start transitioning to a scene of a particular name
	* @param sceneName:String - Name of the scene to go to
	* @param dataObj:Object - Object containing setup data for the scene
	*/
	_this.gotoScene = function(sceneName, dataObj){ // jshint ignore:line
		//OVERRIDE in sub-classes
	};

	/*
	* Update this scene manager and any current scene
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){ // jshint ignore:line
		//OVERRIDE in sub-classes
	};

	/*
	* Get the width of scenes being managed here
	* @return:[Number] - The width of scenes being managed here (in pixels)
	*/
	_this.getSceneWidth = function(){
		return _this._sceneWidth;
	};

	/*
	* Get the height of scenes being managed here
	* @return:[Number] - The height of scenes being managed here (in pixels)
	*/
	_this.getSceneHeight = function(){
		return _this._sceneHeight;
	};

	/*
	* Get the currently active scene
	* @return:[AbstractScene] - The currently active scene, or null if there isn't one
	*/
	_this.getCurrentScene = function(){
		//OVERRIDE in sub-classes
		return null;
	};

	/*
	* Pause the scene manager
	*/
	_this.pause = function(){
		//OVERRIDE in sub-classes
	}

	/*
	* Resume the scene manager
	*/
	_this.resume = function(){
		//OVERRIDE in sub-classes
	}

}