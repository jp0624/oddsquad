/* global require, ok, module, test, Vector2, throws, Line2D */

require.config( {
	"baseUrl": "../../../",
	"alias": {
		"geom": [ "weblib/math/geom/GeomPackage"]
	}

});

require.include("geom");

var maxFloatingPointErrorMargin = 0.000000000000001;


function floatingPointEqual(actual, expected, message) {
  "use strict";

  var delta = Math.abs(actual - expected);
  ok(delta < maxFloatingPointErrorMargin, message);
}


module ("Vector2");
test("constructor and basic properties.", function() {
	"use strict";

	var zero = new Vector2(0,0);

	ok( 0 === zero.x, "(0,0).x === 0");
	ok( 0 === zero.y, "(0,0).y === 0");

	var one = new Vector2(1,1);

	ok( 1 === one.x, "(1,1).x === 1");
	ok( 1 === one.y, "(1,1).y === 1");

	var two = new Vector2(2, 0);

	ok (2 === two.x, "(2,0).x === 2");
	ok (0 === two.y, "(2,0).y === 0");

	var three = new Vector2(0, -3);

	ok (0 === three.x, "(0, -3).x === 0");
	ok (-3 === three.y, "(0, -3).y === -3");
});

test ("equals.", function () {
	"use strict";

	var v1, v2;
	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);

	ok(v1.equals(v2), "(0,0) equals (0,0)");

	v1 = new Vector2(1,0);
	v2 = new Vector2(1,0);

	ok(v1.equals(v2), "(1,0) equals (1,0)");

	v1 = new Vector2(-1000, 0);
	v2 = new Vector2(0, -1000);

	ok(!v1.equals(v2), "(-1000,0) !equals (0, -1000)");

	v1 = new Vector2(0, 0);
	v2 = new Vector2(0.00001, 0);

	ok (!v1.equals(v2), "(0,0) !equals (0.00001, 0)");
	ok (v1.equals(v2, 0.001), "(0,0) equals (0.0001, 0) within 0.001");
});


test ("magnitude and squared magnitude.", function () {
	"use strict";

	var zero = new Vector2(0,0);

	ok (0 === zero.magnitude(), "(0,0).magnitude === 0" );
	ok (0 === zero.sqrMagnitude(), "(0,0).sqrMagnitude === 0");

	var one = new Vector2(0, 1);

	ok (1 === one.magnitude(), "(0,1).magnitude === 1");
	ok (1 === one.sqrMagnitude(), "(0,1).sqrMagnitude === 1");

	var two = new Vector2(3, 4);

	ok (5 === two.magnitude(), "(3,4).magnitude === 5");
	ok (25 === two.sqrMagnitude(), "(3,4).sqrMagnitude === 25");

});

test ("normalize.", function () {
	"use strict";

	var zero = new Vector2(0,0);
	zero.normalize();

	floatingPointEqual(0, zero.magnitude(), "(0,0).normalize().magnitude() === 0");

	var one = new Vector2(1, 0);
	one.normalize();
	floatingPointEqual(1, one.magnitude(), "(1,0).normalize().magnitude() === 1");

	var two = new Vector2(1, 1);
	two.normalize();
	floatingPointEqual(1, two.magnitude(), "(1,1).normalize().magnitude() === 1");

	var three = new Vector2(1.25, 3.5);
	three.normalize();
	floatingPointEqual(1, three.magnitude(), "(1.25, 3.5).normalize().magnitude() === 1");
});

test ("dot product", function () {
	"use strict";

	var zero1 = new Vector2(0,0);
	var zero2 = new Vector2(0,0);

	floatingPointEqual(zero1.dot(zero2), 0, "(0,0) dot (0,0) === 0");

	var one1 = new Vector2(0,1);
	var one2 = new Vector2(0,0);
	floatingPointEqual(one1.dot(one2), 0, "(0,1) dot (0,0) === 0");
	floatingPointEqual(one2.dot(one1), 0, "(0,0) dot (0,1) === 0");

	var two1 = new Vector2(1,1);
	var two2 = new Vector2(0,1);
	floatingPointEqual(two1.dot(two2), 1, "(1,1) dot (0,1) === 1");
	floatingPointEqual(two2.dot(two1), 1, "(0,1) dot (1,1) === 1");

});

test ("add", function () {
	"use strict";

	var v1, v2, v3, v4;
	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);

	v3 = v1.add(v2);
	v4 = new Vector2(0,0);

	ok(v3.equals(v4), "(0,0) add (0,0) === (0,0)");

	v1 = new Vector2(1,1);
	v2 = new Vector2(1,1);
	v3 = v1.add(v2);
	v4 = new Vector2(2,2);

	ok(v3.equals(v4), "(1,1) add (1,1) === (2,2)");

	v1 = new Vector2(1.5, 1.5);
	v2 = new Vector2(-1.5, -1.5);
	v3 = v1.add(v2);
	v4 = new Vector2(0,0);
	ok(v3.equals(v4), "(1.5, 1.5) add (-1.5, -1.5) === (0,0)");

	v1 = new Vector2(100, 22.2);
	v2 = new Vector2(-50, 22.2);
	v3 = v1.add(v2);
	v4 = new Vector2(50, 44.4);
	ok(v3.equals(v4), "(100, 22.2) add (-50, 22.2) === (50, 44.4)");
});

test ("addSelf", function () {
	"use strict";

	var v1, v2, v4;
	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);
	v1.addSelf(v2);
	v4 = new Vector2(0,0);

	ok(v1.equals(v4), "(0,0) addSelf (0,0) === (0,0)");

	v1 = new Vector2(1,1);
	v2 = new Vector2(1,1);
	v1.addSelf(v2);
	v4 = new Vector2(2,2);

	ok(v1.equals(v4), "(1,1) addSelf (1,1) === (2,2)");

	v1 = new Vector2(1.5, 1.5);
	v2 = new Vector2(-1.5, -1.5);
	v1.addSelf(v2);
	v4 = new Vector2(0,0);
	ok(v1.equals(v4), "(1.5, 1.5) addSelf (-1.5, -1.5) === (0,0)");

	v1 = new Vector2(100, 22.2);
	v2 = new Vector2(-50, 22.2);
	v1.addSelf(v2);
	v4 = new Vector2(50, 44.4);
	ok(v1.equals(v4), "(100, 22.2) addSelf (-50, 22.2) === (50, 44.4)");
});

test ("addOut", function () {
	"use strict";

	var v1, v2, v3, v4;

	v3 = new Vector2(0,0);

	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);

	v1.addOut(v2, v3);
	v4 = new Vector2(0,0);

	ok(v3.equals(v4), "(0,0) addOut (0,0) === (0,0)");

	v1 = new Vector2(1,1);
	v2 = new Vector2(1,1);
	v1.addOut(v2, v3);
	v4 = new Vector2(2,2);

	ok(v3.equals(v4), "(1,1) addOut (1,1) === (2,2)");

	v1 = new Vector2(1.5, 1.5);
	v2 = new Vector2(-1.5, -1.5);
	v1.addOut(v2, v3);
	v4 = new Vector2(0,0);
	ok(v3.equals(v4), "(1.5, 1.5) addOut (-1.5, -1.5) === (0,0)");

	v1 = new Vector2(100, 22.2);
	v2 = new Vector2(-50, 22.2);
	v1.addOut(v2, v3);
	v4 = new Vector2(50, 44.4);
	ok(v3.equals(v4), "(100, 22.2) addOut (-50, 22.2) === (50, 44.4)");
});

test ("subtract", function () {
	"use strict";

	var v1, v2, v3, v4;
	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);

	v3 = v1.subtract(v2);
	v4 = new Vector2(0,0);

	ok(v3.equals(v4), "(0,0) subtract (0,0) === (0,0)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,0);

	v3 = v1.subtract(v2);
	v4 = new Vector2(0,1);

	ok(v3.equals(v4), "(0,1) subtract (0,0) === (0,1)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,2);

	v3 = v1.subtract(v2);
	v4 = new Vector2(0, -1);

	ok(v3.equals(v4), "(0,1) subtract (0,2) === (0,-1)");

});

test ("subtractSelf", function () {
	"use strict";

	var v1, v2, v4;
	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);
	v1.subtractSelf(v2);
	v4 = new Vector2(0,0);

	ok(v1.equals(v4), "(0,0) subtractSelf (0,0) === (0,0)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,0);
	v1.subtractSelf(v2);
	v4 = new Vector2(0,1);

	ok(v1.equals(v4), "(0,1) subtractSelf (0,0) === (0,1)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,2);
	v1.subtractSelf(v2);
	v4 = new Vector2(0, -1);

	ok(v1.equals(v4), "(0,1) subtractSelf (0,2) === (0,-1)");

});

test ("subtractOut", function () {
	"use strict";

	var v1, v2, v3, v4;

	v3 = new Vector2(0,0);

	v1 = new Vector2(0,0);
	v2 = new Vector2(0,0);

	v1.subtractOut(v2, v3);
	v4 = new Vector2(0,0);

	ok(v3.equals(v4), "(0,0) subtractOut (0,0) === (0,0)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,0);

	v1.subtractOut(v2, v3);
	v4 = new Vector2(0,1);

	ok(v3.equals(v4), "(0,1) subtractOut (0,0) === (0,1)");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,2);

	v1.subtractOut(v2, v3);
	v4 = new Vector2(0, -1);

	ok(v3.equals(v4), "(0,1) subtractOut (0,2) === (0,-1)");

});

test ("angleBetween", function () {
	"use strict";

	var v1, v2, angleRad, angleDeg;
	v1 = new Vector2(0,1);
	v2 = new Vector2(1,0);

	angleRad = v1.angleBetween(v2, false);
	angleDeg = v1.angleBetween(v2, true);

	ok(angleDeg === 90, "(0,1) angleBetween (1,0) === 90 Degrees");
	ok(angleRad - 1.57079633 < 0.00000001, "(0,1) angleBetween (1,0) ===  1.57079633 Radians");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,0);

	throws(function() {v1.angleBetween(v2, false);}, "Throw error when using angleBetween on a zero vector.");
	throws(function() {v1.angleBetween(v2, true);}, "Throw error when using angleBetween on a zero vector.");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,1);

	angleRad = v1.angleBetween(v2, false);
	angleDeg = v1.angleBetween(v2, true);

	ok(angleDeg === 0, "(0,1) angleBetween (0,1) === 0 Degrees");
	ok(angleRad === 0, "(0,1) angleBetween (0,1) === 0 Radians");

});

test ("angleBetween2", function () {
	"use strict";

	var v1, v2, angleRad, angleDeg;
	v1 = new Vector2(0,1);
	v2 = new Vector2(1,0);

	angleRad = v1.angleBetween2(v2, false);
	angleDeg = v1.angleBetween2(v2, true);

	ok(angleDeg === 90, "(0,1) angleBetween2 (1,0) === 90 Degrees");
	ok(angleRad - 1.57079633 < 0.00000001, "(0,1) angleBetween2 (1,0) ===  1.57079633 Radians");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,0);

	throws(function() {v1.angleBetween2(v2, false);}, "Throw error when using angleBetween2 on a zero vector.");
	throws(function() {v1.angleBetween2(v2, true);}, "Throw error when using angleBetween2 on a zero vector.");

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,1);

	angleRad = v1.angleBetween2(v2, false);
	angleDeg = v1.angleBetween2(v2, true);

	ok(angleDeg === 0, "(0,1) angleBetween2 (0,1) === 0 Degrees");
	ok(angleRad === 0, "(0,1) angleBetween2 (0,1) === 0 Radians");

});

test ("mult", function () {
	"use strict";

	var v1, v2, v3;
	v1 = new Vector2(0,1);
	v2 = v1.mult(2);
	v3 = new Vector2(0,2);

	ok(v2.equals(v3), "(0,1) mult 2 === (0,2)");

	v2 = v1.mult(0);
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,1) mult 0 === (0,0)");

	v2 = v1.mult(-5);
	v3 = new Vector2(0,-5);

	ok(v2.equals(v3), "(0,1) mult -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v2 = v1.mult(0.5);
	v3 = new Vector2(0,1);

	ok(v2.equals(v3), "(0,2) mult 0.5 === (0,1)");

});

test ("multSelf", function () {
	"use strict";

	var v1, v3;
	v1 = new Vector2(0,1);
	v1.multSelf(2);
	v3 = new Vector2(0,2);
	ok(v1.equals(v3), "(0,1) multSelf 2 === (0,2)");

	v1 = new Vector2(0,1);
	v1.multSelf(0);
	v3 = new Vector2(0,0);
	ok(v1.equals(v3), "(0,1) multSelf 0 === (0,0)");

	v1 = new Vector2(0,1);
	v1.multSelf(-5);
	v3 = new Vector2(0,-5);
	ok(v1.equals(v3), "(0,1) multSelf -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v1.multSelf(0.5);
	v3 = new Vector2(0,1);

	ok(v1.equals(v3), "(0,2) multSelf 0.5 === (0,1)");

});

test ("multOut", function () {
	"use strict";

	var v1, v2, v3;
	v2 = new Vector2(0,0);

	v1 = new Vector2(0,1);
	v1.multOut(2, v2);
	v3 = new Vector2(0,2);

	ok(v2.equals(v3), "(0,1) multOut 2 === (0,2)");

	v1.multOut(0, v2);
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,1) multOut 0 === (0,0)");

	v1.multOut(-5, v2);
	v3 = new Vector2(0,-5);

	ok(v2.equals(v3), "(0,1) multOut -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v1.multOut(0.5, v2);
	v3 = new Vector2(0,1);

	ok(v2.equals(v3), "(0,2) multOut 0.5 === (0,1)");

});

test ("scale", function () {
	"use strict";

	var v1, v2, v3;
	v1 = new Vector2(0,1);
	v2 = v1.scale(2);
	v3 = new Vector2(0,2);

	ok(v2.equals(v3), "(0,1) scale 2 === (0,2)");

	v2 = v1.scale(0);
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,1) scale 0 === (0,0)");

	v2 = v1.scale(-5);
	v3 = new Vector2(0,-5);

	ok(v2.equals(v3), "(0,1) scale -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v2 = v1.scale(0.5);
	v3 = new Vector2(0,1);

	ok(v2.equals(v3), "(0,2) scale 0.5 === (0,1)");

});

test ("scaleSelf", function () {
	"use strict";

	var v1, v3;
	v1 = new Vector2(0,1);
	v1.scaleSelf(2);
	v3 = new Vector2(0,2);
	ok(v1.equals(v3), "(0,1) scaleSelf 2 === (0,2)");

	v1 = new Vector2(0,1);
	v1.scaleSelf(0);
	v3 = new Vector2(0,0);
	ok(v1.equals(v3), "(0,1) scaleSelf 0 === (0,0)");

	v1 = new Vector2(0,1);
	v1.scaleSelf(-5);
	v3 = new Vector2(0,-5);
	ok(v1.equals(v3), "(0,1) scaleSelf -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v1.scaleSelf(0.5);
	v3 = new Vector2(0,1);

	ok(v1.equals(v3), "(0,2) scaleSelf 0.5 === (0,1)");

});

test ("scaleOut", function () {
	"use strict";

	var v1, v2, v3;
	v2 = new Vector2(0,0);

	v1 = new Vector2(0,1);
	v1.scaleOut(2, v2);
	v3 = new Vector2(0,2);

	ok(v2.equals(v3), "(0,1) scaleOut 2 === (0,2)");

	v1.scaleOut(0, v2);
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,1) scaleOut 0 === (0,0)");

	v1.scaleOut(-5, v2);
	v3 = new Vector2(0,-5);

	ok(v2.equals(v3), "(0,1) scaleOut -5 === (0,-5)");

	v1 = new Vector2(0,2);
	v1.scaleOut(0.5, v2);
	v3 = new Vector2(0,1);

	ok(v2.equals(v3), "(0,2) scaleOut 0.5 === (0,1)");

});

test ("distance", function () {
	"use strict";

	var v1, v2, dist;

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,2);

	dist = v1.distance(v2);

	ok (dist === 1, "(0,1) dist (0,2) === 1");

	v1 = new Vector2(0,0);
	v2 = new Vector2(0,2);
	dist = v1.distance(v2);

	ok (dist === 2, "(0,0) dist (0,2) === 2");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,1);
	dist = v1.distance(v2);

	ok (dist === Math.sqrt(2), "(0,0) dist (0,2) === sqrt(2)");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,2);
	dist = v1.distance(v2);

	ok (dist === Math.sqrt(5), "(0,0) dist (0,2) === sqrt(5)");
});

test ("distanceSquared", function () {
	"use strict";

	var v1, v2, dist;

	v1 = new Vector2(0,1);
	v2 = new Vector2(0,2);

	dist = v1.distanceSquared(v2);

	ok (dist === 1, "(0,1) distanceSquared (0,2) === 1");

	v1 = new Vector2(0,0);
	v2 = new Vector2(0,2);
	dist = v1.distanceSquared(v2);

	ok (dist === 4, "(0,0) distanceSquared (0,2) === 4");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,1);
	dist = v1.distanceSquared(v2);

	ok (dist === 2, "(0,0) distanceSquared (0,2) === sqrt(2)");

	v1 = new Vector2(0,0);
	v2 = new Vector2(1,2);
	dist = v1.distanceSquared(v2);

	ok (dist === 5, "(0,0) distanceSquared (0,2) === sqrt(5)");
});

test ("negative", function () {
	"use strict";

	var v1, v2, v3;
	v1 = new Vector2(0,0);
	v2 = v1.negative();
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,0) negative == (0,0)");

	v1 = new Vector2(0,1);
	v2 = v1.negative();
	v3 = new Vector2(0, -1);

	ok(v2.equals(v3), "(0,1) negative == (0,-1)");

	v1 = new Vector2(-5,5);
	v2 = v1.negative();
	v3 = new Vector2(5, -5);

	ok(v2.equals(v3), "(-5,5) negative == (5,-5)");

	v1 = new Vector2(2.25,-5.55);
	v2 = v1.negative();
	v3 = new Vector2(-2.25, 5.55);

	ok(v2.equals(v3), "(2.25,-5.55) negative == (-2.25, 5.55)");	

});

test ("negativeSelf", function () {
	"use strict";

	var v1, v3;
	v1 = new Vector2(0,0);
	v1.negativeSelf();
	v3 = new Vector2(0,0);

	ok(v1.equals(v3), "(0,0) negativeSelf == (0,0)");

	v1 = new Vector2(0,1);
	v1.negativeSelf();
	v3 = new Vector2(0, -1);

	ok(v1.equals(v3), "(0,1) negativeSelf == (0,-1)");

	v1 = new Vector2(-5,5);
	v1.negativeSelf();
	v3 = new Vector2(5, -5);

	ok(v1.equals(v3), "(-5,5) negativeSelf == (5,-5)");

	v1 = new Vector2(2.25,-5.55);
	v1.negativeSelf();
	v3 = new Vector2(-2.25, 5.55);

	ok(v1.equals(v3), "(2.25,-5.55) negativeSelf == (-2.25, 5.55)");	

});

test ("negativeOut", function () {
	"use strict";

	var v1, v2, v3;
	v2 = new Vector2(0,0);

	v1 = new Vector2(0,0);
	v1.negativeOut(v2);
	v3 = new Vector2(0,0);

	ok(v2.equals(v3), "(0,0) negativeOut == (0,0)");

	v1 = new Vector2(0,1);
	v1.negativeOut(v2);
	v3 = new Vector2(0, -1);

	ok(v2.equals(v3), "(0,1) negativeOut == (0,-1)");

	v1 = new Vector2(-5,5);
	v1.negativeOut(v2);
	v3 = new Vector2(5, -5);

	ok(v2.equals(v3), "(-5,5) negativeOut == (5,-5)");

	v1 = new Vector2(2.25,-5.55);
	v1.negativeOut(v2);
	v3 = new Vector2(-2.25, 5.55);

	ok(v2.equals(v3), "(2.25,-5.55) negativeOut == (-2.25, 5.55)");

});


test ("angleRad", function () {
	"use strict";

	var v1, angle;
	v1 = new Vector2(1,0);

	angle = v1.angleRad();
	ok(angle === 0, ("(1,0) angleRad == 0"));

	v1 = new Vector2(-1, 0);
	angle = v1.angleRad();
	ok(angle === Math.PI, ("(-1, 0) angleRad == Math.PI"));

	v1 = new Vector2(0, 1);
	angle = v1.angleRad();
	ok(angle === Math.PI / 2, ("(0,1) angleRad == Math.PI / 2"));

	v1 = new Vector2(1, 1);
	angle = v1.angleRad();
	ok(angle === Math.PI / 4, ("(1,1) angleRad == Math.PI / 4"));

});

test ("angleDeg", function () {
	"use strict";

	var v1, angle;
	v1 = new Vector2(1,0);

	angle = v1.angleDeg();
	ok(angle === 0, ("(1,0) angleDeg == 0"));

	v1 = new Vector2(-1, 0);
	angle = v1.angleDeg();
	ok(angle === 180, ("(-1, 0) angleDeg == 180"));

	v1 = new Vector2(0, 1);
	angle = v1.angleDeg();
	ok(angle === 90, ("(0,1) angleDeg == 90"));

	v1 = new Vector2(1, 1);
	angle = v1.angleDeg();
	ok(angle === 45, ("(1,1) angleDeg == 45"));

});

test ("shift", function () {
	"use strict";

	var v1, v2;

	v1 = new Vector2(0,0);
	v1.shift(0,1).shift(0,-1);
	v2 = new Vector2(0,0);

	ok(v1.equals(v2), "(0,0) shift (0,1) shift (0,-1) === (0,0)");

	v1 = new Vector2(0,0);
	v1.shift(0,1);
	v2 = new Vector2(0,1);

	ok(v1.equals(v2), "(0,0) shift (0,1) === (0,1)");

	v1 = new Vector2(20,30);
	v1.shift (-50, 10);
	v2 = new Vector2(-30, 40);

	ok(v1.equals(v2), "(20,30) shift (-50, 10) === (-30, 40)");
});

test ("rotate", function () {
	"use strict";

	var v1, v2, v3;

	v1 = new Vector2(0,0);
	v2 = v1.rotate(90);
	v3 = new Vector2(0,0);
	floatingPointEqual(0, v2.magnitude(), "(0,0) rotate 90 magnitude === 0");
	ok (v2.equals(v3), "(0,0) rotate 90 === (0,0)");

	v1 = new Vector2(0,-1);
	v2 = v1.rotate(90);
	v3 = new Vector2(1,0);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotate 90 magnitude === 1");
	ok (v2.equals(v3, maxFloatingPointErrorMargin), "(0,-1) rotate 90 === (1,0)");

	v1 = new Vector2(1,0);
	v2 = v1.rotate(-90);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v2.magnitude(), "(1,0) rotate -90 magnitude === 1");
	ok (v2.equals(v3, maxFloatingPointErrorMargin), "(1,0) rotate -90 === (0,-1)");

	v1 = new Vector2(0,-1);
	v2 = v1.rotate(180);
	v3 = new Vector2(0,1);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotate 180 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotate 180 === (0,1)");

	v1 = new Vector2(0,-1);
	v2 = v1.rotate(270);
	v3 = new Vector2(-1,0);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotate 270 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotate 270 === (-1,0)");

	v1 = new Vector2(0,-1);
	v2 = v1.rotate(360);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotate 360 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotate 360 === (0,-1)");

	v1 = new Vector2(0,-1);
	v2 = v1.rotate(45);
	v3 = new Vector2(0.707, -0.707);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotate 45 magnitude === 1");
	ok (v2.equals(v3, 0.001), "(0,-1) rotate 45 === (0.707, -0.707)");
});


test ("rotateSelf", function () {
	"use strict";

	var v1, v3;

	v1 = new Vector2(0,0);
	v1.rotateSelf(90);
	v3 = new Vector2(0,0);
	floatingPointEqual(0, v1.magnitude(), "(0,0) rotateSelf 90 magnitude === 0");
	ok (v1.equals(v3), "(0,0) rotateSelf 90 === (0,0)");

	v1 = new Vector2(0,-1);
	v1.rotateSelf(90);
	v3 = new Vector2(1,0);
	floatingPointEqual(1, v1.magnitude(), "(0,-1) rotateSelf 90 magnitude === 1");
	ok (v1.equals(v3, maxFloatingPointErrorMargin), "(0,-1) rotateSelf 90 === (1,0)");

	v1 = new Vector2(1,0);
	v1.rotateSelf(-90);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v1.magnitude(), "(1,0) rotateSelf -90 magnitude === 1");
	ok (v1.equals(v3, maxFloatingPointErrorMargin), "(1,0) rotateSelf -90 === (0,-1)");

	v1 = new Vector2(0,-1);
	v1.rotateSelf(180);
	v3 = new Vector2(0,1);
	floatingPointEqual(1, v1.magnitude(), "(0,-1) rotateSelf 180 magnitude === 1");
	ok (v1.equals(v3, 0.0000001), "(0,-1) rotateSelf 180 === (0,1)");

	v1 = new Vector2(0,-1);
	v1.rotateSelf(270);
	v3 = new Vector2(-1,0);
	floatingPointEqual(1, v1.magnitude(), "(0,-1) rotate 270 magnitude === 1");
	ok (v1.equals(v3, 0.0000001), "(0,-1) rotate 270 === (-1,0)");

	v1 = new Vector2(0,-1);
	v1.rotateSelf(360);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v1.magnitude(), "(0,-1) rotate 360 magnitude === 1");
	ok (v1.equals(v3, 0.0000001), "(0,-1) rotate 360 === (0,-1)");

	v1 = new Vector2(0,-1);
	v1.rotateSelf(45);
	v3 = new Vector2(0.707, -0.707);
	floatingPointEqual(1, v1.magnitude(), "(0,-1) rotate 45 magnitude === 1");
	ok (v3.equals(v1, 0.001), "(0,-1) rotate 45 === (0.707, -0.707)");
});

test ("rotateOut", function () {
	"use strict";

	var v1, v2, v3;

	v2 = new Vector2(0,0);

	v1 = new Vector2(0,0);
	v1.rotateOut(90, v2);
	v3 = new Vector2(0,0);
	floatingPointEqual(0, v2.magnitude(), "(0,0) rotateOut 90 magnitude === 0");
	ok (v2.equals(v3), "(0,0) rotateOut 90 === (0,0)");

	v1 = new Vector2(0,-1);
	v1.rotateOut(90, v2);
	v3 = new Vector2(1,0);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotateOut 90 magnitude === 1");
	ok (v2.equals(v3, maxFloatingPointErrorMargin), "(0,-1) rotateOut 90 === (1,0)");

	v1 = new Vector2(1,0);
	v1.rotateOut(-90, v2);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v2.magnitude(), "(1,0) rotateOut -90 magnitude === 1");
	ok (v2.equals(v3, maxFloatingPointErrorMargin), "(1,0) rotateOut -90 === (0,-1)");

	v1 = new Vector2(0,-1);
	v1.rotateOut(180, v2);
	v3 = new Vector2(0,1);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotateOut 180 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotateOut 180 === (0,1)");

	v1 = new Vector2(0,-1);
	v1.rotateOut(270, v2);
	v3 = new Vector2(-1,0);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotateOut 270 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotateOut 270 === (-1,0)");

	v1 = new Vector2(0,-1);
	v1.rotateOut(360, v2);
	v3 = new Vector2(0,-1);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotateOut 360 magnitude === 1");
	ok (v2.equals(v3, 0.0000001), "(0,-1) rotateOut 360 === (0,-1)");

	v1 = new Vector2(0,-1);
	v1.rotateOut(45, v2);
	v3 = new Vector2(0.707, -0.707);
	floatingPointEqual(1, v2.magnitude(), "(0,-1) rotateOut 45 magnitude === 1");
	ok (v2.equals(v3, 0.001), "(0,-1) rotateOut 45 === (0.707, -0.707)");
});

module("Line2D");

test("getTangent", function () {
	"use strict";

	var l1, v1;

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,1));
	v1 = new Vector2(0,1);

	ok(v1.equals(l1.getTangent()), "[(0,0), (0,1)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,100));
	v1 = new Vector2(0,1);

	ok(v1.equals(l1.getTangent()), "[(0,0), (0,100)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,-0.1));
	v1 = new Vector2(0,-1);

	ok(v1.equals(l1.getTangent()), "[(0,0), (0,-0.1)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (1,0));
	v1 = new Vector2(1,0);

	ok(v1.equals(l1.getTangent()), "[(0,0), (1,0)] getTangent === (1,0)");

	l1 = new Line2D(new Vector2(1,0), new Vector2 (0,0));
	v1 = new Vector2(-1,0);

	ok(v1.equals(l1.getTangent()), "[(1,0), (0,0)] getTangent === (-1,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (1,1));
	v1 = new Vector2(0.707,0.707);

	ok(v1.equals(l1.getTangent(), 0.001), "[(0,0), (1,1)] getTangent === (0.707,0.707)");

	l1 = new Line2D(new Vector2(1,1), new Vector2 (0,0));
	v1 = new Vector2(-0.707,-0.707);
	ok(v1.equals(l1.getTangent(), 0.001), "[(1,1), (0,0)] getTangent === (-0.707,-0.707)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	throws (function () {l1.getTangent();}, "[(0,0), (0,0)] getTangent should throw error.");

	l1 = new Line2D(new Vector2(999999,111111), new Vector2(999999,111111));
	throws (function () {l1.getTangent();}, "[(999999,111111), (999999,111111)] getTangent should throw error.");

});

test("getTangentOut", function () {
	"use strict";

	var l1, v1, out;
	out = new Vector2(0,0);

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,1));
	v1 = new Vector2(0,1);

	l1.getTangentOut(out);
	ok(v1.equals(out), "[(0,0), (0,1)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,100));
	v1 = new Vector2(0,1);

	l1.getTangentOut(out);
	ok(v1.equals(out), "[(0,0), (0,100)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (0,-0.1));
	v1 = new Vector2(0,-1);

	l1.getTangentOut(out);
	ok(v1.equals(out), "[(0,0), (0,-0.1)] getTangent === (0,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (1,0));
	v1 = new Vector2(1,0);

	l1.getTangentOut(out);
	ok(v1.equals(out), "[(0,0), (1,0)] getTangent === (1,0)");

	l1 = new Line2D(new Vector2(1,0), new Vector2 (0,0));
	v1 = new Vector2(-1,0);

	l1.getTangentOut(out);
	ok(v1.equals(out), "[(1,0), (0,0)] getTangent === (-1,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2 (1,1));
	v1 = new Vector2(0.707,0.707);

	l1.getTangentOut(out);
	ok(v1.equals(out, 0.001), "[(0,0), (1,1)] getTangent === (0.707,0.707)");

	l1 = new Line2D(new Vector2(1,1), new Vector2 (0,0));
	v1 = new Vector2(-0.707,-0.707);
	l1.getTangentOut(out);
	ok(v1.equals(out, 0.001), "[(1,1), (0,0)] getTangent === (-0.707,-0.707)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	throws (function () {l1.getTangentOut(out);}, "[(0,0), (0,0)] getTangent should throw error.");

	l1 = new Line2D(new Vector2(999999,111111), new Vector2(999999,111111));
	throws (function () {l1.getTangentOut(out);}, "[(999999,111111), (999999,111111)] getTangent should throw error.");

});

test("getNormal", function () {
	"use strict";
	var l1, v1;

	l1 = new Line2D(new Vector2(0,0), new Vector2(1,0));
	v1 = new Vector2(0, -1);

	ok(v1.equals(l1.getNormal()), "[(0,0), (1,0)] getNormal === (0,-1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-1,0));
	v1 = new Vector2(0, 1);

	ok(v1.equals(l1.getNormal()), "[(0,0), (-1,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(-1,0), new Vector2(0,0));
	v1 = new Vector2(0, -1);

	ok(v1.equals(l1.getNormal()), "[(-1,0), (0,0)] getNormal === (0,-1)");

	l1 = new Line2D(new Vector2(1,0), new Vector2(0,0));
	v1 = new Vector2(0, 1);

	ok(v1.equals(l1.getNormal()), "[(1,0), (0,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(100,0), new Vector2(20,0));
	v1 = new Vector2(0, 1);

	ok(v1.equals(l1.getNormal()), "[(100,0), (20,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(999999,0), new Vector2(-999999,0));
	v1 = new Vector2(0, 1);

	ok(v1.equals(l1.getNormal()), "[(999999,0), (-999999,0)] getNormal === (0,1)");
});

test("getNormalOut", function () {
	"use strict";
	var l1, v1, v2;
	v2 = new Vector2(0,0);

	l1 = new Line2D(new Vector2(0,0), new Vector2(1,0));
	v1 = new Vector2(0, -1);
	l1.getNormalOut(v2);

	ok(v1.equals(v2), "[(0,0), (1,0)] getNormal === (0,-1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-1,0));
	l1.getNormalOut(v2);
	v1 = new Vector2(0, 1);

	ok(v1.equals(v2), "[(0,0), (-1,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(-1,0), new Vector2(0,0));
	l1.getNormalOut(v2);
	v1 = new Vector2(0, -1);

	ok(v1.equals(v2), "[(-1,0), (0,0)] getNormal === (0,-1)");

	l1 = new Line2D(new Vector2(1,0), new Vector2(0,0));
	l1.getNormalOut(v2);
	v1 = new Vector2(0, 1);

	ok(v1.equals(v2), "[(1,0), (0,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(100,0), new Vector2(20,0));
	l1.getNormalOut(v2);
	v1 = new Vector2(0, 1);

	ok(v1.equals(v2), "[(100,0), (20,0)] getNormal === (0,1)");

	l1 = new Line2D(new Vector2(999999,0), new Vector2(-999999,0));
	l1.getNormalOut(v2);
	v1 = new Vector2(0, 1);

	ok(v1.equals(v2), "[(999999,0), (-999999,0)] getNormal === (0,1)");
});

test ("getMidpoint", function () {
	"use strict";

	var l1, v1;

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 0));
	v1 = new Vector2(1, 0);

	ok (v1.equals(l1.getMidpoint()), "[(0,0), (2, 0)] getMidpoint === (1, 0)");

	l1 = new Line2D(new Vector2(10, 0), new Vector2(2, 0));
	v1 = new Vector2(6,0);

	ok(v1.equals(l1.getMidpoint()), "[(10,0), (2, 0)] getMidpoint === (6,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-10, 0));
	v1 = new Vector2(-5, 0);
	ok(v1.equals(l1.getMidpoint()), "[(0,0), (-10, 0)] getMidpoint === (-5, 0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 2));
	v1 = new Vector2(1,1);

	ok(v1.equals(l1.getMidpoint()), "[(0,0), (2,2)] getMidpoint === (1,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(20, 2));
	v1 = new Vector2(10,1);

	ok(v1.equals(l1.getMidpoint()), "[(0,0), (20,2)] getMidpoint === (10,1)");

	l1 = new Line2D(new Vector2(10,-10), new Vector2(20,-20));
	v1 = new Vector2(15,-15);

	ok (v1.equals(l1.getMidpoint()), "[(10,-10), (20, -20)] getMidpoint === (15, -15)");
});

test ("getMidpoint", function () {
	"use strict";

	var l1, v1;

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 0));
	v1 = new Vector2(1, 0);

	ok (v1.equals(l1.getMidpoint()), "[(0,0), (2, 0)] getMidpoint === (1, 0)");

	l1 = new Line2D(new Vector2(10, 0), new Vector2(2, 0));
	v1 = new Vector2(6,0);

	ok(v1.equals(l1.getMidpoint()), "[(10,0), (2, 0)] getMidpoint === (6,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-10, 0));
	v1 = new Vector2(-5, 0);
	ok(v1.equals(l1.getMidpoint()), "[(0,0), (-10, 0)] getMidpoint === (-5, 0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 2));
	v1 = new Vector2(1,1);

	ok(v1.equals(l1.getMidpoint()), "[(0,0), (2,2)] getMidpoint === (1,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(20, 2));
	v1 = new Vector2(10,1);

	ok(v1.equals(l1.getMidpoint()), "[(0,0), (20,2)] getMidpoint === (10,1)");

	l1 = new Line2D(new Vector2(10,-10), new Vector2(20,-20));
	v1 = new Vector2(15,-15);

	ok (v1.equals(l1.getMidpoint()), "[(10,-10), (20, -20)] getMidpoint === (15, -15)");
});

test ("getMidpointOut", function () {
	"use strict";

	var l1, v1, v2;

	v2 = new Vector2(0,0);

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 0));
	v1 = new Vector2(1, 0);
	l1.getMidpointOut(v2);

	ok (v1.equals(v2), "[(0,0), (2, 0)] getMidpoint === (1, 0)");

	l1 = new Line2D(new Vector2(10, 0), new Vector2(2, 0));
	v1 = new Vector2(6,0);
	l1.getMidpointOut(v2);

	ok(v1.equals(v2), "[(10,0), (2, 0)] getMidpoint === (6,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-10, 0));
	v1 = new Vector2(-5, 0);
	l1.getMidpointOut(v2);

	ok(v1.equals(v2), "[(0,0), (-10, 0)] getMidpoint === (-5, 0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(2, 2));
	v1 = new Vector2(1,1);
	l1.getMidpointOut(v2);

	ok(v1.equals(v2), "[(0,0), (2,2)] getMidpoint === (1,1)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(20, 2));
	v1 = new Vector2(10,1);
	l1.getMidpointOut(v2);

	ok(v1.equals(v2), "[(0,0), (20,2)] getMidpoint === (10,1)");

	l1 = new Line2D(new Vector2(10,-10), new Vector2(20,-20));
	v1 = new Vector2(15,-15);
	l1.getMidpointOut(v2);

	ok (v1.equals(v2), "[(10,-10), (20, -20)] getMidpoint === (15, -15)");
});

test ("getSlope", function () {
	"use strict";

	var l1;

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	ok(isNaN(l1.getSlope()), "[(0,0), (0,0)] getSlope === NaN");

	l1 = new Line2D(new Vector2(0,0), new Vector2(1,1));
	ok(l1.getSlope() === 1, "[(0,0), (1,1)] getSlope === 1");

	l1 = new Line2D(new Vector2(0,0), new Vector2(-1,-1));
	ok(l1.getSlope() === 1, "[(0,0), (-1,-1)] getSlope === 1");


	l1 = new Line2D(new Vector2(0,0), new Vector2(1,-1));
	ok(l1.getSlope() === -1, "[(0,0), (-1,1)] getSlope === -1");

	l1 = new Line2D(new Vector2(1,0), new Vector2(-1, 0));
	ok(l1.getSlope() === 0, "[(1,0), (-1,0)] getSlope === 0");

	l1 = new Line2D(new Vector2(1,10), new Vector2(1, 50));
	ok(isNaN(l1.getSlope()), "[(1,1000), (1,50)] getSlope === NaN");
});


test ("withinLineBounds", function () {
	"use strict";

	var l1, v1;
	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(1,1);

	ok(l1.withinLineBounds(v1) === false, "[(0,0), (0,0)] withinLineBounds (1,1) === false");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);

	ok(l1.withinLineBounds(v1) === true, "[(0,0), (0,0)] withinLineBounds (0,0) === true");

	l1 = new Line2D(new Vector2(-10,-10), new Vector2(-5,-5));
	v1 = new Vector2(0,0);
	ok(l1.withinLineBounds(v1) === false, "[(-10,-10), (-5,-5)] withinLineBounds (0,0) === false");

	l1 = new Line2D(new Vector2(-10,-10), new Vector2(-5,-5));
	v1 = new Vector2(-5,-5);
	ok(l1.withinLineBounds(v1) === true, "[(-10,-10), (-5,-5)] withinLineBounds (-5,-5) === true");

	l1 = new Line2D(new Vector2(-10,-10), new Vector2(-5,-5));
	v1 = new Vector2(-7,-7);
	ok(l1.withinLineBounds(v1) === true, "[(-10,-10), (-5,-5)] withinLineBounds (-7,-7) === true");

	l1 = new Line2D(new Vector2(-5,-5), new Vector2(-10,-10));
	v1 = new Vector2(-7,-7);
	ok(l1.withinLineBounds(v1) === true, "[(-5,-5), (-10,-10)] withinLineBounds (-7,-7) === true");
});

test ("shift", function () {
	"use strict";
	var l1, l2;
	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(1,1), new Vector2(1,1));
	l1.shift(1,1);

	ok(l1.equals(l2), "[(0,0), (0,0)] shift (1,1) === [(1,1), (1,1)]");


	l1 = new Line2D(new Vector2(-1,-1), new Vector2(-1,-1));
	l2 = new Line2D(new Vector2(0,0), new Vector2(0,0));

	l1.shift(1,1);

	ok(l1.equals(l2), "[(-1,-1), (-1,-1)] shift (1,1) === [(0,0), (0,0)]");


	l1 = new Line2D(new Vector2(0,-15), new Vector2(-13,6));
	l2 = new Line2D(new Vector2(5,-13), new Vector2(-8,8));

	l1.shift(5,2);

	ok(l1.equals(l2), "[(0,-15), (-13,6)] shift (5,2) === [(5,-13), (-8,8)]");
});

test ("tryGetIntersection", function () {
	"use strict";

	var l1, l2, intersection, expected;

	// check no intersection.
	l1 = new Line2D(new Vector2(0,0), new Vector2(1,0));
	l2 = new Line2D(new Vector2(2,0), new Vector2(3, 0));

	ok(!l1.tryGetIntersection(l2), "[(0,0)-(1,0)] does not intersect [(2,0)-(3,0)]");


	// check 
	l1 = new Line2D(new Vector2(-1, 0), new Vector2(1, 0));
	l2 = new Line2D(new Vector2(0, 1), new Vector2(0, -1));

	intersection = l1.tryGetIntersection(l2);
	expected = new Vector2(0,0);

	ok(intersection.equals(expected), "[(-1,0)-(1,0)] intersects [(0,1)-(0,-1)] at (0,0)");
});

test("getClosestPointOnLine", function() {
	"use strict";

	var l1, v1, v2;

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);
	v2 = l1.getClosestPointOnLine(new Vector2(10,10), true);

	ok(v1.equals(v2), "[(0,0),(0,0)] getClosestPointOnLine (10,10), true === (0,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);
	v2 = l1.getClosestPointOnLine(new Vector2(10,10), true);

	ok(v1.equals(v2), "[(0,0),(0,0)] getClosestPointOnLine (10,10), false === (0,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,1));
	v1 = new Vector2(0,1);
	v2 = l1.getClosestPointOnLine(new Vector2(10,10), true);

	ok(v1.equals(v2), "[(0,0),(0,1)] getClosestPointOnLine (10,10), true === (0,1)");

	l1 = new Line2D(new Vector2(-1,-1), new Vector2(5,5));
	v1 = new Vector2(5,5);
	v2 = l1.getClosestPointOnLine(new Vector2(10,10), true);

	ok(v1.equals(v2), "[(-1,-1),(5,5)] getClosestPointOnLine (10,10), true === (5,5)");

	l1 = new Line2D(new Vector2(-5,0), new Vector2(5,0));
	v1 = new Vector2(0,0);
	v2 = l1.getClosestPointOnLine(new Vector2(0,5), true);

	ok(v1.equals(v2), "[(-5,0),(5,0)] getClosestPointOnLine (0,5), true === (0,0)");

	l1 = new Line2D(new Vector2(-5,0), new Vector2(5,0));
	v1 = new Vector2(0,0);
	v2 = l1.getClosestPointOnLine(new Vector2(0,5), true);

	ok(v1.equals(v2), "[(-5,0),(5,0)] getClosestPointOnLine (0,5), true === (0,0)");


	l1 = new Line2D(new Vector2(-5,-10), new Vector2(-5,10));
	v1 = new Vector2(-5,0);
	v2 = l1.getClosestPointOnLine(new Vector2(-10,0), true);

	ok(v1.equals(v2), "[(-5,-10),(-5,10)] getClosestPointOnLine (-10,0), true === (-5,0)");
});

test("getClosestPointOnLineOut", function() {
	"use strict";

	var l1, v1, v2;
	v2 = new Vector2(0,0);

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);
	l1.getClosestPointOnLineOut(new Vector2(10,10), true, v2);

	ok(v1.equals(v2), "[(0,0),(0,0)] getClosestPointOnLine (10,10), true === (0,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);
	l1.getClosestPointOnLineOut(new Vector2(10,10), true, v2);

	ok(v1.equals(v2), "[(0,0),(0,0)] getClosestPointOnLine (10,10), false === (0,0)");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,1));
	v1 = new Vector2(0,1);
	l1.getClosestPointOnLineOut(new Vector2(10,10), true, v2);

	ok(v1.equals(v2), "[(0,0),(0,1)] getClosestPointOnLine (10,10), true === (0,1)");

	l1 = new Line2D(new Vector2(-1,-1), new Vector2(5,5));
	v1 = new Vector2(5,5);
	l1.getClosestPointOnLineOut(new Vector2(10,10), true, v2);

	ok(v1.equals(v2), "[(-1,-1),(5,5)] getClosestPointOnLine (10,10), true === (5,5)");

	l1 = new Line2D(new Vector2(-5,0), new Vector2(5,0));
	v1 = new Vector2(0,0);
	l1.getClosestPointOnLineOut(new Vector2(0,5), true, v2);

	ok(v1.equals(v2), "[(-5,0),(5,0)] getClosestPointOnLine (0,5), true === (0,0)");

	l1 = new Line2D(new Vector2(-5,0), new Vector2(5,0));
	v1 = new Vector2(0,0);
	l1.getClosestPointOnLineOut(new Vector2(0,5), true, v2);

	ok(v1.equals(v2), "[(-5,0),(5,0)] getClosestPointOnLine (0,5), true === (0,0)");


	l1 = new Line2D(new Vector2(-5,-10), new Vector2(-5,10));
	v1 = new Vector2(-5,0);
	l1.getClosestPointOnLineOut(new Vector2(-10,0), true, v2);

	ok(v1.equals(v2), "[(-5,-10),(-5,10)] getClosestPointOnLine (-10,0), true === (-5,0)");
});

test ("rotate", function () {
	"use strict";

	var l1, v1, l2;

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	v1 = new Vector2(0,0);
	l2 = new Line2D(new Vector2(0,0), new Vector2(0,0));

	ok(l1.rotate(0, v1).equals(l2, maxFloatingPointErrorMargin), "[(0,0),(0,0)] rotate 0 around (0,0) === [(0,0),(0,0)]");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,-1));
	v1 = new Vector2(0,0);
	l2 = new Line2D(new Vector2(0,0), new Vector2(1,0));

	ok(l1.rotate(90, v1).equals(l2, maxFloatingPointErrorMargin), "[(0,0),(0,-1)] rotate 90 around (0,0) === [(0,0),(1,0)]");

	l1 = new Line2D(new Vector2(0,1), new Vector2(0,-1));
	v1 = new Vector2(0,0);
	l2 = new Line2D(new Vector2(-1,0), new Vector2(1,0));

	ok(l1.rotate(90, v1).equals(l2, maxFloatingPointErrorMargin), "[(0,1),(0,-1)] rotate 90 around (0,0) === [(-1,0),(1,0)]");

	l1 = new Line2D(new Vector2(2,3), new Vector2(2,1));
	v1 = new Vector2(2,2);
	l2 = new Line2D(new Vector2(1,2), new Vector2(3,2));

	ok(l1.rotate(90, v1).equals(l2, maxFloatingPointErrorMargin), "[(2,3),(2,1)] rotate 90 around (2,2) === [(1,2),(3,2)]");

});

test ("clone", function () {
	"use strict";

	var l1, l2, l3;
	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l3 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = l1.clone();

	// mess with l1 so we know we're looking at a clone.
	l1.p1.x = 1999;
	l1.p2.x = 9199;
	l1.p1.y = 9919;
	l1.p2.y = 9991;

	ok(l2.equals(l3), "[(0,0), (0,0)] clone === [(0,0), (0,0)]");


	l1 = new Line2D(new Vector2(22,5), new Vector2(9,-12345));
	l3 = new Line2D(new Vector2(22,5), new Vector2(9,-12345));
	l2 = l1.clone();

	// mess with l1 so we know we're looking at a clone.
	l1.p1.x = 1999;
	l1.p2.x = 9199;
	l1.p1.y = 9919;
	l1.p2.y = 9991;

	ok(l2.equals(l3), "[(22,5), (9,-12345))] clone === [(22,5), (9,-12345)]");

	l1 = new Line2D(new Vector2(-1.24,22.111), new Vector2(99.83,-12345.0));
	l3 = new Line2D(new Vector2(-1.24,22.111), new Vector2(99.83,-12345.0));
	l2 = l1.clone();

	// mess with l1 so we know we're looking at a clone.
	l1.p1.x = 9333.33;
	l1.p2.x = -3933.44;
	l1.p1.y = 3393.55;
	l1.p2.y = -3339.66;

	ok(l2.equals(l3), "[(22,5), (9,-12345))] clone === [(22,5), (9,-12345)]");

});

test ("toString", function () {
	"use strict";

	var l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	ok(l1.toString() == "(x=0, y=0) - (x=0, y=0)", "[(0,0), (0,0)] toString === (x=0, y=0) - (x=0, y=0)");

	l1 = new Line2D(new Vector2(1,2), new Vector2(3,4));
	ok(l1.toString() == "(x=1, y=2) - (x=3, y=4)", "[(1,2), (3,4)] toString === (x=1, y=2) - (x=3, y=4)");

	l1 = new Line2D(new Vector2(-10,-20), new Vector2(-30,-40));
	ok(l1.toString() == "(x=-10, y=-20) - (x=-30, y=-40)", "[(-10,-20), (-30,-40)] toString === (x=-10, y=-20) - (x=-30, y=-40)");

	l1 = new Line2D(new Vector2(-1.2,3.4), new Vector2(-5.6,7.8));
	ok(l1.toString() == "(x=-1.2, y=3.4) - (x=-5.6, y=7.8)", "[(-1.2,3.4), (-5.6,7.8)] toString === (x=-1.2, y=3.4) - (x=-5.6, y=7.8)");
});

test ("setAll", function () {
	"use strict";

	var l1, l2;

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l1.setAll(0,0,0,0);

	ok(l1.equals(l2), "[(0,0)-(0,0)] setAll (0,0,0,0) === [(0,0)-(0,0)]");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0,1), new Vector2(0,1));
	l1.setAll(0,1,0,1);

	ok(l1.equals(l2), "[(0,0)-(0,0)] setAll (0,1,0,1) === [(0,1)-(0,1)]");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(-5,10), new Vector2(-15,20));
	l1.setAll(-5,10,-15,20);

	ok(l1.equals(l2), "[(0,0)-(0,0)] setAll (-5,10,-15,20) === [(-5,10)-(-15,20)]");

	l1 = new Line2D(new Vector2(40,30), new Vector2(20,10));
	l2 = new Line2D(new Vector2(1.23,4.56), new Vector2(7.89,10.1112));
	l1.setAll(1.23,4.56,7.89,10.1112);

	ok(l1.equals(l2), "[(40,30)-(20,10)] setAll (1.23,4.56,7.89,10.1112) === [(1.23,4.56)-(7.89,10.1112)]");

	l1 = new Line2D(new Vector2(1337,2448), new Vector2(3559,4660));
	l2 = new Line2D(new Vector2(-9999999999,-9999999999), new Vector2(-9999999999,-9999999999));
	l1.setAll(-9999999999,-9999999999,-9999999999,-9999999999);

	ok(l1.equals(l2), "[(1337,2448)-(3559,4660)] setAll (-9999999999,-9999999999,-9999999999,-9999999999) === [(-9999999999,-9999999999)-(-9999999999,-9999999999)]");

});

test ("equals", function () {
	"use strict";

	var l1, l2;
	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0,0), new Vector2(0,0));

	ok(l1.equals(l2), "[(0,0), (0,0)] equals [(0,0), (0,0)]");

	l1 = new Line2D(new Vector2(1.2,2.3), new Vector2(3.4,4.5));
	l2 = new Line2D(new Vector2(1.2,2.3), new Vector2(3.4,4.5));

	ok(l1.equals(l2), "[(1.2,2.3), (3.4,4.5)] equals [(1.2,2.3), (3.4,4.5)]");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0.01,0.05), new Vector2(0.09,0.1));

	ok(l1.equals(l2, 0.1), "[(0,0), (0,0)] equals [(0.01,0.05), (0.09,0.1)] with tolerance of 0.1");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0.01,0.05), new Vector2(0.09,0.1));

	ok(!l1.equals(l2, 0.05), "[(0,0), (0,0)] !equals [(0.01,0.05), (0.09,0.1)] with tolerance of 0.05");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,0));
	l2 = new Line2D(new Vector2(0.0000001,0.0000005), new Vector2(0.00000009,0.0000001));
	ok(!l1.equals(l2), "[(0,0), (0,0)] !equals [(0.0000001,0.0000005), (0.00000009,0.0000001)]");
});

test ("getAngle", function () {
	var l1;
	l1 = new Line2D(new Vector2(0,0), new Vector2(1,0));

	ok(l1.getAngle() === 0, "[(0,0), (1,0)] getAngle === 0");

	l1 = new Line2D(new Vector2(0,0), new Vector2(0,1));

	ok(l1.getAngle() === Math.PI / 2, "[(0,0), (1,0)] getAngle === Math.PI / 2");

});