/* global require */

require.include("weblib/scene/AbstractScene.js");

/*
* Abstract factory for creating scenes.
*/
function AbstractSceneFactory(reference) { // jshint ignore:line
	"use strict";

	// create a locally scoped copy of this.
	var _this = reference;

	/*
	* Create a new factory.
	*/
	function _construct() {
		return _this;
	}

	/*
	* Create a scene given its name
	* @param sceneName:String - Name of the scene to create
	* @param sceneData:Object - Data to use to set up the scene
	* @return:AbstractScene - The object to handle the actual scene
	*/
	_this.createSceneByName = function (sceneName, sceneData) { // jshint ignore:line
		return null;
	};

	return _construct();
}