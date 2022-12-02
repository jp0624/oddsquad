/**
* Class representing a circle.
**/
function Circle (point, radius) {
	"use strict";

	/**
	* Declare the center point of the circle
	**/
	this.x = point.x;
	this.y = point.y;

	/**
	* Declare the radius of the circle
	**/
	this.radius = radius;
}

Circle.prototype.constructor = Circle;

/**
* Find if there is a collision between self and the other circle
* Return true if collision exist
**/
Circle.prototype.detectCollision = function ( other ) {
	"use strict";

	return ((this.x - other.x) * (this.x - other.x) +
		(this.y - other.y) * (this.y - other.y)	< (this.radius + other.radius) * (this.radius + other.radius));
};