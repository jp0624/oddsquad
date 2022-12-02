/* global require, isEmpty */
require.include("weblib/core/Util.js");

/**
 * Class representing an axis aligned rectangle.
 * @param {Vector2} p1 - The top left point in the rectangle.
 * @param {Vector2} p2 - The bottom right point in the rectangle.
 */
function Rectangle(p1, p2) {
	"use strict";

	this.p1 = p1;
	this.p2 = p2;

}

Rectangle.prototype.constructor = Rectangle;

/**
 * Get the maximum x coordinate of the rectangle.
 * @return {Number} The maximum X coordinate.
 */
Rectangle.prototype.getMaxX = function () {
	"use strict";

	return Math.max(this.p1.x, this.p2.x);
};

/*
* Get the maximum y coordinate of the rectangle.
* @return {Number} The maximum y coordinate of the rectangle.
*/
Rectangle.prototype.getMaxY = function () {
	"use strict";

	return Math.max(this.p1.y, this.p2.y);
};

/*
* Get the minimum x coordinate of the rectangle.
* @return {Number} The minimum y coordinate of the rectangle.
*/
Rectangle.prototype.getMinX = function () {
	"use strict";

	return Math.min(this.p1.x, this.p2.x);
};

/*
* Get the minimum y coordinate of the rectangle.
* @return {Number} the minimum y coordinate of the rectangle.
*/
Rectangle.prototype.getMinY = function () {
	"use strict";

	return Math.min(this.p1.y, this.p2.y);
};

/*
* Get the width of the rectangle.
* @return {Number} the width of the rectangle.
*/
Rectangle.prototype.getWidth = function () {
	"use strict";

	return this.getMaxX() - this.getMinX();
};

/*
* Get the Height of the rectangle.
* @return {Number} the width of the rectangle.
*/
Rectangle.prototype.getHeight = function () {
	"use strict";

	return this.getMaxY() - this.getMinY();
};

/*
* Perform a hit test on the rectangle, to see if a point is within it.
* @param point {Vector2}: the point to test against the rectangle.
* @returns {Boolean}: true if the point is in the rectangle, false otherwise.
*/
Rectangle.prototype.hitTest = function (point) {
	"use strict";

	if (this.getMinX() > point.x) {
		return false;
	}
	if(this.getMaxX() < point.x) {
		return false;
	}
	if(this.getMinY() > point.y) {
		return false;
	}
	if(this.getMaxY() < point.y) {
		return false;
	}
	// we passed al the test, we're inside the rectangle!
	return true;
};

Rectangle.prototype.isIntersectingRectangle = function(other){
	"use strict";

	var inHorizontal = false;
	var inVertical = false;

	// check if there's an overlap in the horizontal span.
	if(this.getMinX() <= other.getMaxX() && this.getMaxX() >= other.getMinX()) {
		inHorizontal = true;
	}

	if(this.getMinX() <= other.getMaxX() && this.getMaxX() >= other.getMaxX()) {
		inHorizontal = true;
	}

	if(other.getMinX() <= this.getMinX() && other.getMaxX() >= this.getMinX()) {
		inHorizontal = true;
	}

	if(other.getMinX() <= this.getMaxX() && other.getMaxX() >= this.getMaxX()) {
		inHorizontal = true;
	}

	// check if there's an overlap in the vertical span.
	if(this.getMinY() <= other.getMinY() && this.getMaxY() >= other.getMinY()) {
		inVertical = true;
	}

	if(this.getMinY() <= other.getMaxY() && this.getMaxY() >= other.getMaxY()) {
		inVertical = true;
	}

	if(other.getMinY() <= this.getMinY() && other.getMaxY() >= this.getMinY()) {
		inVertical = true;
	}

	if(other.getMinY() <= this.getMaxY() && other.getMaxY() >= this.getMaxY()) {
		inVertical = true;
	}

	// if both, we have a hit.
	return inHorizontal && inVertical;
};

Rectangle.prototype.debugDraw = function (shape, outlineColour, fillColour) {
	"use strict";

	if(isEmpty(shape)) {
		return;
	}

	if (isEmpty(outlineColour)) {
		outlineColour = "#FFFFFF";
	}

	if (isEmpty(fillColour)) {
		fillColour = "rgba(255,255,255,0.25)";
	}

	shape.graphics.clear();

	// draw the outline.
	shape.graphics.setStrokeStyle(1);
	shape.graphics.beginStroke(outlineColour);
	shape.graphics.beginFill(fillColour);
	shape.graphics.moveTo(this.p1.x, this.p1.y);
	shape.graphics.lineTo(this.p2.x, this.p1.y);
	shape.graphics.lineTo(this.p2.x, this.p2.y);
	shape.graphics.lineTo(this.p1.x, this.p2.y);
	shape.graphics.lineTo(this.p1.x, this.p1.y);
};
