/* global require, isDefined */
require.include("weblib/core/Util");

/*
* Class SceneTransitionEventData
*	Encapsulates all data required for an event to transition to another scene
*/

/*
* Create a new SceneTransitionEventData object
* @param sceneName:[String] - Name of the scene type to transition to
* @param sceneData:[Object] (Optional) - Data object to be passed to the newly created scene
* @param transition:[AbstractSceneTransition] (Optional) - Specific transition to use.
*/
function SceneTransitionEventData(sceneName, sceneData, transition){ // jshint ignore:line
	"use strict";

	var _this = this;

	//[String] - Name of the scene type to transition to
	_this.sceneName = sceneName;
	//[Object] - Data object to be passed to the newly created scene
	_this.sceneData = isDefined(sceneData) ? sceneData : {};
	//[AbstractSceneTransition] - Specific transition to use
	_this.transition = isDefined(transition) ? transition : null;
}
