/* global isEmpty, SceneEvent, require, AbstractSceneManager, AbstractSceneTransition */

require.include("weblib/core/Util");
require.include("weblib/scene/AbstractSceneManager");
require.include("weblib/scene/AbstractScene");
require.include("weblib/scene/AbstractSceneFactory");

/*
* Class TransitionSceneManager extends AbstractSceneManager
*	Manages the current scene being shown and allows the specification of transitions between scenes
*/

//Extend AbstractSceneManager
TransitionSceneManager.prototype = new AbstractSceneManager();
TransitionSceneManager.prototype.constructor = TransitionSceneManager;

/*
* Create a new TransitionSceneManager
* @param sceneContainer:[Container] - Container to draw scenes to
* @param sceneFactory:[AbstractSceneFactory] - Object to use to generate new scenes
* @param width:[Integer] - Width of the entire scene area (in pixels)
* @param height:[Integer] - Height of the entire scene area (in pixels)
*/
function TransitionSceneManager(sceneContainer, sceneFactory, width, height){
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

	//[AbstractScene] - Current game scene being displayed
	var _curScene;
	//[AbstractScene] - The scene to transition to
	var _nextScene;

	//[AbstractSceneTransition] - The transition to use as the default
	var _defaultTransition;

	//[AbstractSceneTransition] - The currently active transition (if any)
	var _curTransition;

	/*
	* Create a TransitionSceneManager
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
		_nextScene = null;

		_defaultTransition = null;
		_curTransition = null;
	}

	/*
	* Set the transition that should be used if no other transition is specified
	* @param transition:[AbstractSceneTransition] - The transition to use as the default
	*/
	_this.setDefaultTransition = function(transition){
		_defaultTransition = transition;
	};

	/*
	* Start transitioning to a scene of a particular name
	* @param sceneName:String - Name of the scene to go to
	* @param dataObj:Object - Object containing setup data for the scene
	* @param transition:[AbstractSceneTransition] (Optional) - The transition to use between scenes instead of any set default
	* @return:[AbstractScene] - The actual scene object that will be transitioned to
	*/
	_this.gotoScene = function(sceneName, dataObj, transition){
		//DEBUG
		//console.log("Scene Manager: gotoScene " + sceneName);

		_curTransition = isEmpty(transition) ? _defaultTransition : transition;

		//Remove listeners for scene events from the current scene
		if(_curScene !== null){
			_removeSceneListeners(_curScene);
		}

		//Create the new scene
		_nextScene = _sceneFactory.createSceneByName(sceneName, dataObj);

		//If this scene is already loaded, start running the transition
		if(_nextScene.isLoaded()){
			//DEBUG
			//console.log("Scene loaded");

			_startTransition(_curTransition);
		//If this scene isn't loaded yet, wait for it to finish loading
		}else{
			//TODO: Have the option to display a loading indicator here?
			
			//DEBUG
			//console.log("Scene not loaded = loading scene");

			_nextScene.addEventListener(SceneEvent.LOADED, _handleNextSceneLoaded);
			_nextScene.loadScene();
		}

		return _nextScene;
	};

	/*
	* Update this scene manager and any current scene
	* @param delta:Number - Time elapsed since last update (in seconds)
	*/
	_this.update = function(delta){
		
		//DEBUG
		//console.log("Scene Manager: updating manager ");

		//If a transition is currently executing, update it 
		if(_curTransition !== null){
			_curTransition.update(delta);
			return;
		}

		//If there is a current scene, update it
		if(_curScene !== null){
			//DEBUG
			//console.log("Scene Manager: updating current scene");
			_curScene.updateScene(delta);
		}
	};

	/*
	* Get the currently active scene
	* @return:[AbstractScene] - The currently active scene	
	*/
	_this.getCurrentScene = function(){
		return _curScene;
	};

	/*
	* Pause the scene manager
	*/
	_this.pause = function(){
		if(_curScene !== null){
			_curScene.pauseScene();
		}

		//Pause any active transition
		if(!isEmpty(_curTransition)){
			_curTransition.pauseTransition();
		}
	}

	/*
	* Resume the scene manager
	*/
	_this.resume = function(){
		if(_curScene !== null){
			_curScene.resumeScene();
		}

		//Resume any active transition
		if(!isEmpty(_curTransition)){
			_curTransition.resumeTransition();
		}
	}

	/*
	* Handle the next scene finishing loading
	* @param sceneEvent:SceneEvent - Event object
	*/
	function _handleNextSceneLoaded(sceneEvent){ // jshint ignore:line
		//DEBUG
		//console.log("Scene manager: Handle scene loaded");

		_nextScene.removeEventListener(SceneEvent.LOADED, _handleNextSceneLoaded);

		//Start the actual transition
		_startTransition(_curTransition);
	}

	/*
	* Start executing the transition that was set up
	*/
	function _startTransition(transition){
		_curTransition = transition;

		//If there was no transition provided and no default transition, change scenes immediately
		if(_curTransition === null){
			_setCurrentScene(_nextScene);
			_nextScene.startScene();
		//If a transition was provided, start executing it
		}else{
			_curTransition.addEventListener(AbstractSceneTransition.COMPLETE, _handleTransitionComplete);
			_curTransition.startTransition(_curScene, _nextScene, _sceneContainer);
		}
		
	}

	/*
	* Handle completion of a scene transition
	*/
	function _handleTransitionComplete(e){ // jshint ignore:line
		//DEBUG
		//console.log("Scene Manager: Transition complete - Starting scene");

		_curTransition.removeEventListener(AbstractSceneTransition.COMPLETE, _handleTransitionComplete);
		_curTransition.destroy();
		_curTransition = null;

		//Destroy and replace the current scene
		if(_curScene !== null){
			_curScene.destroyScene();
		}
		_curScene = _nextScene;

		//Listen for events and start running the scene
		_addSceneListeners(_curScene);
		_curScene.startScene();
	}

	/*
	* Helper function that sets the current scene immediately
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
		if(_curScene !== null){
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
		var sceneData = sceneEvent.eventData.sceneData;
		var transition = sceneEvent.eventData.transition;

		_this.gotoScene(targetSceneName, sceneData, transition);
	}


	return _construct(sceneContainer, sceneFactory, width, height);

}