/*
* Class TransformData
*	Holds data describing a transformation for an object
*/

/*
* Create a new TransformData object
*/
function TransformData(locX, locY, scaleX, scaleY, rotation, skewX, skewY, regX, regY){
	"use strict";

	//Set provided values or default values for all properties
	this.locX = typeof locX !== undefined ? locX : 0;
	this.locY = typeof locY !== undefined ? locY : 0;
	this.scaleX = typeof scaleX !== undefined ? scaleX : 1;
	this.scaleY = typeof scaleY !== undefined ? scaleY : 1;
	this.rotation = typeof rotation !== undefined ? rotation : 0;
	this.skewX = typeof skewX !== undefined ? skewX : 0;
	this.skewY = typeof skewY !== undefined ? skewY : 0;
	this.regX = typeof regX !== undefined ? regX : 0;
	this.regY = typeof regY !== undefined ? regY : 0;

	//TODO: Function to set all values at once

}

TransformData.prototype.constructor = TransformData;