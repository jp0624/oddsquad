/* global require, Vector2, MathUtils */

require.include("weblib/math/geom/Vector2");
require.include("weblib/math/MathUtils");

/*
* Class representing a bezier curve, defined by a set of control points.
* @param points: An array of Vector2s representing the control points of the Bezier curve, in order.
*/
function Bezier(points) {
	"use strict";

	// variable for iterating in loops for this class.
	this._i = 0 ;

	// the list of points.
	this._points = points;
	this._pointsCopy = [];

	for (this._i =0; this._i < points.length; this._i++) {
		this._pointsCopy.push(this._points[this._i].clone());
	}

	// temporary out vector used in calculations.
	this._tempOut = new Vector2(0,0);
}

Bezier.prototype.constructor = Bezier;

/*
* Get the list of points in the curve.
*/
Bezier.prototype.getPoints = function () {
	"use strict";

	return this._points;
};

/*
* Set the list of points in the curve.
*/
Bezier.prototype.setPoints = function (points) {
	"use strict";

	this._points = points;
	this._pointsCopy = [];
	for (this._i =0; this._i < this._points.length; this._i++) {
		this._pointsCopy.push(this._points[this._i].clone());
	}
};

Bezier.prototype.copyPoints = function (points, out) {
	"use strict";

	for (this._i =0; this._i < points.length; this._i++) {
		points[this._i].copyOut(out[this._i]);
	}
};

/*
* Set the point at a given index in the points list.
*/
Bezier.prototype.setPointAtIndex = function (point, index) {
	"use strict";

	this._points[index] = point;
};

/*
* Evaluate the curve at a point.
*/
Bezier.prototype.evaluate = function (t) {
	"use strict";

	this.copyPoints(this._points, this._pointsCopy);
	return this._evaluateRecursive(this._pointsCopy, t, this._pointsCopy.length);
};

/*
* Recursive function to evaluate the curve.
*/
Bezier.prototype._evaluateRecursive = function (points, t, length) {
	"use strict";

	if (length === 0) {
		return new Vector2(0,0);
	}

	if(length === 1) {
		return points[0];
	}

	if (length === 2){
		MathUtils.lerpOut(points[0], points[1], t, this._tempOut);
		return this._tempOut;
	}

	// time to recurse!
	for(this._i = 0; this._i < length - 1; this._i++) {
		MathUtils.lerpOut(points[this._i], points[this._i+1], t, this._tempOut);
		this._tempOut.copyOut(points[this._i]);
	}

	return this._evaluateRecursive(points, t, length-1);

};

Bezier.prototype.release = function() {
	"use strict";

	this._points = undefined;
	this._pointsCopy = undefined;
	this._i = undefined;
	this._tempOut = undefined;
};
