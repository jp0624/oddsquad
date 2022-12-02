/* global require, isUndefined, Vector2, Rectangle */

require.include("weblib/core/Util");
require.include("weblib/math/geom/Vector2");
require.include("weblib/math/geom/Rectangle");

function Quad(p1, p2, p3, p4) {
	"use strict";

	this.p1 = isUndefined(p1) ? new Vector2(0, 0) : p1;
	this.p2 = isUndefined(p2) ? new Vector2(0, 0) : p2;
	this.p3 = isUndefined(p3) ? new Vector2(0, 0) : p3;
	this.p4 = isUndefined(p4) ? new Vector2(0, 0) : p4;

	return this;
}

Quad.prototype.constructor = Quad;

/*
* Gets the center of mass of this quad
* @return:Vector2 - A point indicating the center of mass of this quad
*/
Quad.prototype.getCenter = function(){
	"use strict";

	return new Vector2( (this.p1.x + this.p2.x + this.p3.x + this.p4.x) / 4, (this.p1.y + this.p2.y + this.p3.y + this.p4.y) / 4);
};

/*
* Get an axis aligned bounding box for this quad
* @return:[Rectangle] - A rectangle specifying an axis-aligned bounding box for this quad
*/
Quad.prototype.getBounds = function(){
	"use strict";

	var retRect = new Rectangle(
		new Vector2(Math.min(this.p1.x, this.p2.x, this.p3.x, this.p4.x), Math.min(this.p1.y, this.p2.y, this.p3.y, this.p4.y)),
		new Vector2(Math.max(this.p1.x, this.p2.x, this.p3.x, this.p4.x), Math.max(this.p1.y, this.p2.y, this.p3.y, this.p4.y))
	);

	return retRect;
};
