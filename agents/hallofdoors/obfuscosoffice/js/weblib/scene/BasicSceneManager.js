/* global isEmpty, SceneEvent, require, AbstractSceneManager, isUndefined, console */

require.include("weblib/core/Util");

require.include("weblib/scene/AbstractSceneManager");
require.include("weblib/scene/AbstractScene");
require.include("weblib/scene/AbstractSceneFactory");

/*
* Class BasicSceneManager extends AbstractSceneManager
*	Manages the current scene being shown and transitions between scenes
*/

//Extend AbstractSceneManager
BasicSceneManager.prototype = new AbstractSceneManager();
BasicSceneManager.prototype.constructor = BasicSceneManager;

function BasicSceneManager(sceneContainer, sceneFactory, width, height){
	"use strict";

	//Call base class constructor
	AbstractSceneManager.call(this, sceneContainer, sceneFactory, width, height);

	var _this = this;

	//Container to draw all scene content to
	var _sceneContainer;

	//Factory to create scene objects with
	var _sceneFactory;

	//Integer - Width of the entire scene area in pixels
	var _sceneWidth;
	//Integer - Height of the entire scene area in pixels
	var _sceneHeight;

	//AbstractScene - Current game scene being displayed
	var _curScene;

	/*
	* Create a SceneManager
	* @param sceneContainer:Container - Container to draw all scene content to
	* @param sceneFactory:AbstractSceneFactory - Object which will create the actual scene objects
	* @param width:Integer - Width of the entire scene area
	* @param height:integer - Height of the entire scene area
	*/
	function _construct(sceneContainer, sceneFactory, width, height){
		_sceneContainer = sceneContainer;
		_sceneFactory = sceneFactory;

		_sceneWidth = width;
		_sceneHeight = height;

		_curScene = null;
	}

	/*
	* Start transitioning to a scene of a particular name
	* @param sceneName:String - Name of the scene to go to
	* @param dataObj:Object - Object containing setup data for the scene
	*/
	_this.gotoScene = function(sceneName, dataObj){
		var newScene;

		_clearCurrentScene();

		//Create the new scene and set it as the current one
		newScene = _sceneFactory.createSceneByName(sceneName, dataObj);
		_setCurrentScene(newScene);

		newScene.startScene();
	};

	/*
	* Update this scene manager and any current scene
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){
		if(!isEmpty(_curScene)){
			_curScene.updateScene(delta);
		}
	};

	/*
	* Get the width of scenes being managed here
	* @return:[Number] - The width of scenes being managed here (in pixels)
	*/
	_this.getSceneWidth = function(){
		return _sceneWidth;
	};

	/*
	* Get the height of scenes being managed here
	* @return:[Number] - The height of scenes being managed here (in pixels)
	*/
	_this.getSceneHeight = function(){
		return _sceneHeight;
	};

	/*
	* Get the currently active scene
	* @return:[AbstractScene] - The currently active scene	
	*/
	_this.getCurrentScene = function(){
		return _curScene;
	};

	/*
	* Helper function that sets the current scene
	* @param scene:AbstractScene - Scene to set at the current one
	*/
	function _setCurrentScene(scene){
		//Clear any current scene
		_clearCurrentScene();

		_curScene = scene;
		_sceneContainer.addChild(_curScene);
		_addSceneListeners(_curScene);
	}

	/*
	* Helper function that cleans up any current scene
	*/
	function _clearCurrentScene(){
		if(!isEmpty(_curScene)){
			_removeSceneListeners(_curScene);
			_sceneContainer.removeChild(_curScene);
			_curScene.destroyScene();
			_curScene = null;
		}

	}

	

	/*
	* Add required listeners to a scene
	* @param scene:AbstractScene - The scene to add listeners to
	*/
	function _addSceneListeners(scene){
		scene.addEventListener(SceneEvent.GOTO_SCENE, _handleGotoScene);
	}

	/*
	* Remove required listeners from a scene
	* @param scene:AbstractScene - The scene to remove listeners from
	*/
	function _removeSceneListeners(scene){
		scene.removeEventListener(SceneEvent.GOTO_SCENE, _handleGotoScene);
	}

	/*
	* Handle a request to go to a new scene
	* @param sceneEvent:SceneEvent - Object containing data related to the event
	*/
	function _handleGotoScene(sceneEvent){
		var targetSceneName = sceneEvent.eventData.sceneName;

		//Throw an error if no scene name was defined
		if(isUndefined(targetSceneName)){
			console.log("!! WARNING !! Received GOTO_SCENE event but no scene name was provided in the event data!");
			throw "!! ERROR !! Received GOTO_SCENE event but no scene name was provided in the event data!";
		}

		_this.gotoScene(targetSceneName, sceneEvent.eventData.sceneData);
	}


	return _construct(sceneContainer, sceneFactory, width, height);

}