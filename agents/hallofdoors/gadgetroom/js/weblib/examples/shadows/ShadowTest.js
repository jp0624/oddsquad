/* global require, $, Vector2, createjs, Polygon, ShapeShadow*/

require.config( {
	"baseUrl": "../../../",
	"alias": {
		"geom": [ "weblib/math/geom/GeomPackage"]
	}

});

require.include("geom");
require.include("weblib/effects/ShapeShadow");


$( document ).ready(function() {
	"use strict";
	var lightPosition, stage, numPolys, numPerRow, tilePolygons, i, xOffset, yOffset,
		shadowShapes, newShape, tileShapes, newTileShape, shadows, newShadow;

	/**
	* Define a tick function to update all of the shadows every frame.
	**/
	function tick() {
		for(var i = 0; i < numPolys; i++ )	 {
			tilePolygons[i].drawToGraphics("#FFF", tileShapes[i].graphics);
			shadows[i].drawShadowToGraphics(lightPosition, shadowShapes[i].graphics);
		}

			stage.update();
	}

	// Set a position for the light source.
	lightPosition = new Vector2(0, 0);

	// create a stage to draw to.
	stage = new createjs.Stage("testCanvas");

	numPolys = 5;
	numPerRow = 3;
	tilePolygons = [];

	// Make some random polygons to cast shadows.
	for( i = 0; i < numPolys; i++ ) {
		xOffset = 300 * i;
		yOffset = 200 * ( i % numPerRow) + 300;

		tilePolygons.push(new Polygon([new Vector2(xOffset, yOffset),
						 new Vector2(xOffset + 100, yOffset),
						 new Vector2(xOffset + 100, yOffset + 100),
						 new Vector2(xOffset, yOffset + 200)
						]));
	}

	// Make a createjs shape for each polygon and 
	// add them to the stage.
	shadowShapes =  [];

	for( i = 0; i < numPolys; i++ )
	{
		newShape = new createjs.Shape();
		stage.addChild(newShape);
		shadowShapes.push(newShape);
	}

	
	// Make a createjs shape for each object that's
	// casting a shadow and add them to the stage.
	tileShapes = [];

	for( i = 0; i < numPolys; i++ ) {
		newTileShape = new createjs.Shape();
		stage.addChild(newTileShape);
		tileShapes.push(newTileShape);
	}

	// Create shape shadow objects for each shape.
	shadows = [];

	for( i = 0; i < numPolys; i++ ) {
		newShadow = new ShapeShadow(tilePolygons[i], 400);
		shadows.push(newShadow);
	}

	// add the tick listener.
	createjs.Ticker.addEventListener("tick", tick);

	// on mouse move, set the light position to the position of the mouse.
	$(document).mousemove( function () {
		lightPosition = new Vector2(event.pageX, event.pageY);
	});



});

