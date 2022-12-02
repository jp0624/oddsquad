/* global require, Polygon, Line2D*/

require.include("weblib/math/geom/GeomPackage");

/**
* Class that aids in drawing shadows for arbitrary convex polygons.
*
* NOTE: The assumption is that the polygon being used as a shape is convex.
* The vertices of the polygon should be defined in clockwise order.
* If either the polygon is concave, or the vertices are in counter-clockwise order,
* The shadow will not display correctly.
*
* @param shape: The polygon whose shadow we'll be drawing.
* @param distance: how far the shadow should extend from the points in the polygon.
**/
function ShapeShadow(shape, distance) {
	"use strict";

	// keep a locally scoped copy of this.
	var _this = this;

	/* The shape that this shadow is being applied to. */
	_this.shape = shape;

	/* The distance from the points in the shape that the shadow will extend. */
	_this.distance = distance;

	/**
	* Gets the shape of the base of the shadow, given a light position. 
	* This projects the starting shape, by extending each vertex in the direction
	* of the light position, by the distance of the shadow.
	* @param lightPosition: The position of the light that is casting the shadow.
	**/
	_this.getShadowShape = function (lightPosition)
	{
		var shadowVerts, i, currentVert, direction, newVert;

		// create a list to hold the vertices of the shadow shape.
		shadowVerts = [];

		for ( i = 0; i < _this.shape.points.length; i++ ) {

			currentVert = _this.shape.points[i];

			// determine the direction to extend the vertex.
			direction = currentVert.subtract(lightPosition);
			direction.normalize();

			// determine the new location of the vertex, by extending it by the distance,
			// in the correct direction.
			newVert = currentVert.add(direction.mult(_this.distance));
			shadowVerts.push(newVert);
		}

		// create a polygon from the new vertices.
		_this.shadowShape = new Polygon(shadowVerts);
		return _this.shadowShape;
	};

	/**
	* Checks whether a given line is facing away from the light source.
	* @param lineToCheck: The line whose facing we are checking.
	* @param lightPosition: The position of the light we are checking against.
	**/
	_this.isLineAwayFromLight = function(lineToCheck, lightPosition)
	{
		var center, normal, lightDirection;

		center = lineToCheck.getMidpoint();
		normal = lineToCheck.getNormal();

		lightDirection = lightPosition.subtract(center);

		return lightDirection.dot(normal) >= 0;
	};

	/**
	* Culls points in a polygon that are either facing towards or away from the light source.
	* @param points: The points that define the polygon. NOTE: The points should be sorted in
	* clockwise order. If they are in counter-clockwise order, this will cull the opposite
	* sides of the polygon.
	* @param lightPosition: Where the light being used in the culling is positioned.
	* @param cullTowardsLight: True to cull the sides of the polygon that are facing the light,
	* 	false to cull the sides of the polygin that are facing away from the light.
	**/
	_this.cullPoints = function(points, lightPosition, cullTowardsLight)
	{
		var potentialIndicesToCull, i, lineToCheck, lineAway, returnList;

		// Keep a count of how many edges linked to each vertex are facing the direction we want to cull.
		// We only want to cull the a point if both edges it's connected two are facing the culling direction.
		potentialIndicesToCull = new Array(points.length);
		for (i = 0; i < points.length; i++) {
			potentialIndicesToCull[i] = 0;
		}

		// loop through all the points, checking the line connecting each point to the next point
		// and check which direction they're facing.
		for (i = 0; i < points.length - 1; i++)
		{
			lineToCheck = new Line2D(points[i], points[i+1]);

			lineAway = _this.isLineAwayFromLight(lineToCheck, lightPosition);

			if((cullTowardsLight && !lineAway) || (!cullTowardsLight && lineAway))
			{
				// If an edge is facing the right direction,
				// increment the count of each point on it.
				potentialIndicesToCull[i] += 1;
				potentialIndicesToCull[i+1] += 1;
			}
		}

		// Check the line connecting the last point in the polygon to the first.
		// The loop above checks all other points, but we need to make sure to include this one too.
		lineToCheck = new Line2D(points[points.length - 1], points[0]);
		lineAway = _this.isLineAwayFromLight(lineToCheck, lightPosition);

		if((cullTowardsLight && !lineAway) || (!cullTowardsLight && lineAway))
		{
			// If the line connecting the last point to the first is facing the culling direction,
			// increment the count on it's vertices.
			potentialIndicesToCull[points.length - 1] += 1;
			potentialIndicesToCull[0] += 1;
		}

		// set up a list to contain the remaining vertices.
		returnList = [];

		for(i = 0; i < potentialIndicesToCull.length; i++)
		{
			// include any point in the list whose count is less than 2.
			if(potentialIndicesToCull[i] <= 1)
			{
				returnList.push(points[i]);
			}
		}

		return returnList;
	};

	/**
	* Gets the shadow volume for the shape for a given light position.
	* @param lightPosition: The position of the light that's casting this shadow volume.
	**/
	_this.getShadowVolume = function (lightPosition) {

		var shadowShape, culledShadowPoints, culledTilePoints, newShapePoints, culledPolygon;

		// Get the projected shape for the base of the shadow volume.
		shadowShape = _this.getShadowShape(lightPosition);

		// cull the points in the base of the volume that are facing towards the light.
		culledShadowPoints = _this.cullPoints(shadowShape.points, lightPosition, false);

		// cull the points in the shape itself that are facing away from the light.
		culledTilePoints = _this.cullPoints(_this.shape.points, lightPosition, true);

		// join the remaining points in the shape itself, and the base of the shadow volume.
		newShapePoints = culledTilePoints.concat(culledShadowPoints);

		// create a new polygon and sort it's vertices.
		culledPolygon = new Polygon(newShapePoints);
		culledPolygon.sortPointsClockwise(newShapePoints);

		return culledPolygon;

	};

	/**
	* Draws the shadow volume to a createjs graphics object.
	* @param lightPosition: The position of the light source that's casting this shadow.
	* @param graphics: The createjs graphics object that the shadow is being drawn to.
	**/
	_this.drawShadowToGraphics = function (lightPosition, graphics, cache) {
		var shadowVolume, objectCenter, direction, points, gradientEnd, i;

		// calculate the shape of the shadow volume.
		shadowVolume = _this.getShadowVolume(lightPosition);

		// start the gradient at the center of the shape that's casting the shadow.
		objectCenter = _this.shape.getCenter();

		// determine the gradient direction.
		direction = objectCenter.subtract(lightPosition);
		direction.normalize();

		points = shadowVolume.points;

		// determine where the gradient should end.
		gradientEnd = objectCenter.add(direction.mult(_this.distance * 0.75));

		// draw the shadow to the graphcis object.
		graphics.clear();
		graphics.beginLinearGradientFill(["rgba(0,0,0,0.075)","rgba(0,0,0,0)"], [0.1, 1],
										objectCenter.x, objectCenter.y,  gradientEnd.x ,  gradientEnd.y);
		graphics.moveTo(points[0].x, points[0].y);
		for(i = 0; i < points.length; i++ ) {
			graphics.lineTo(points[i].x, points[i].y);
		}
		graphics.lineTo(points[0].x, points[0].y);
		graphics.endFill();

		if(cache) {
			
		}
	};
}