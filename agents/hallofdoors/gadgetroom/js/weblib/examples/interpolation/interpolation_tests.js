require.config( {
	"baseUrl": "../../../",
	"alias": {
		"interpolation": [ "weblib/math/interpolation/interpolation"]
	},
	"debug": true

});

require.include('interpolation');
require.include('weblib/math/interpolation/Bezier');

$(document).ready ( function () {

	var rate = 0.005;
	var currentVal = 0;
	var _xPos;
	var _bezPoint;

	function tick() {
		_xPos = Interpolation.evaluate(0, 800, currentVal, Interpolation.linear);
		shape.x = _xPos;
		currentVal += rate;
		if(currentVal > 1) {
			currentVal = 1;
			rate = -rate;
		}
		if(currentVal < 0) {
			currentVal = 0;
			rate = -rate;
		}
		stage.update();

		_bezPoint = bezier.evaluate(Interpolation.evaluate(0, 1, currentVal, Interpolation.linear));

		shape2.x = _bezPoint.x;
		shape2.y = _bezPoint.y;
	}


	stage = new createjs.Stage("testCanvas");

	var bezPoints = [new Vector2(50,50), new Vector2(200,200), new Vector2(0, 400), new Vector2(300, 700), new Vector2(600, 400),  new Vector2(800, 800),  new Vector2(900, 800),   new Vector2(800, 900),   new Vector2(900, 900)];

	// DRAW THE BEZIER POINTS, SO YOU CAN SEE WHAT'S HAPPENING.
	for (var i = 0; i < bezPoints.length; i++) {
		var bezPointShape = new createjs.Shape();
		bezPointShape.mouseEnabled = false;
		bezPointShape.graphics.beginFill("#00FF00").drawRect(0,0,5,5);
		bezPointShape.x = bezPoints[i].x;
		bezPointShape.y = bezPoints[i].y;
		stage.addChild(bezPointShape);
	}

	// CREATE THE BEZIER CURVE.
	var bezier = new Bezier(bezPoints);

	// CREATE THE SHAPE FOR REGULAR INTERPOLATION
	var shape = new createjs.Shape();
	shape.mouseEnabled = false;
	shape.graphics.beginFill("#0000FF").drawRect(0, 0, 50, 50);

	var shape2 = new createjs.Shape();
	shape2.mouseEnabled = false;
	shape2.graphics.beginFill("#FF0000").drawCircle(0,0,25);


	stage.addChild(shape);
	stage.addChild(shape2);

	createjs.Ticker.setFPS(120);
	createjs.Ticker.addEventListener("tick", tick);
});

