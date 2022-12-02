/* global require, createjs, isDefined */

require.include("weblib/core/Util");
require.include("weblib/external/createjs.min.js");

//Request to go to another specific scene
SceneEvent.GOTO_SCENE = "gotoscene";
//Scene is loaded and ready to run
SceneEvent.LOADED = "loaded";
//Scene execution has completed
SceneEvent.COMPLETE = "complete";

SceneEvent.prototype = new createjs.Event();
SceneEvent.prototype.constructor = SceneEvent;

/*
* Class SceneEvent extends BaseEvent
*	An event related to the scene system
* @param type:[String] - The type of scene event
* @param eventData:[Object] (Optional) - Additional data related to this event
*/
function SceneEvent(type, eventData){
	"use strict";

	createjs.Event.call(this, type);
	var _this = this;
	
	//[Object] - Object holding addition data for this event
	//_this.sceneData = isEmpty(sceneData) ? {} : sceneData;

	//[Object] - Additional data related to this event
	_this.eventData = isDefined(eventData) ? eventData : {};

	//Create a data object if none was provided
	//if(data === null){
	//	_this.data = {};
	//}
	//_this.sceneData.sceneName = sceneName;

	/*
	* Get the name of the scene this event is targetting (if any)
	* @return:String - The name of the scene this event is targetting (if any)
	*/
	// _this.getTargetSceneName = function(){
	//  	return _this.sceneData.sceneName;
	// }

}