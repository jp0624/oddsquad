/* global setDefault, AbstractObject, createjs, TimelineEaseLogic, isEmpty, Event */

function ShapeParticle ( data, emitter ) {
	"use strict";

	var _super = {};
	var _this = AbstractObject ( this );

	var _shape;

	var _data;
	var _type;
	var _radius;
	var _width;
	var _height;
	var _pointSize;
	var _angle;
	var _sides;
	var _fill;

	var _emitter;

	var _fillColour;
	var _strokeColour;

	var _graphicsDef;

	var _easeLogic;

	function _construct ( data ) {

		_emitter = emitter;
		_shape = new createjs.Shape ();
		_shape.mouseEnabled = false;

		_data = data;
		_type = data.type;
		_radius = setDefault ( data.radius, ShapeParticle.DEFAULT_RADIUS );
		_width = setDefault ( data.width, ShapeParticle.DEFAULT_WIDTH );
		_height = setDefault ( data.height, ShapeParticle.DEFAULT_HEIGHT );
		_pointSize = setDefault ( data.pointSize, ShapeParticle.DEFAULT_POINT_SIZE );
		_angle = setDefault ( data.angle, ShapeParticle.DEFAULT_ANGLE );
		_sides = setDefault ( data.sides, ShapeParticle.DEFAULT_SIDES );
		_fill = data.fill;

		_fillColour = setDefault ( data.fillColour, ShapeParticle.DEFAULT_FILL_COLOUR );
		_strokeColour = data.strokeColour;

		_graphicsDef = data.graphicsDef;

			// each particle has it's own easeLogic
		_easeLogic = EaseLogic.getEaseLogic(_shape, data.ease);		
		_easeLogic.addEventListener ( "COMPLETE", _onParticleComplete_listener );

		_draw ();

		
		/** Set the update function for the ease.
		* Should have two parameters:
		* @param timePassedMS: the time passed in milliseconds since last frame.
		* @param timePassedS: The time passed in seconds since last frame.
		*/
		_this.update = _easeLogic.update;

		return _this;
	}

	function _prepareShapeRedraw () {

		_shape.graphics.clear ();

		if ( _graphicsDef instanceof Function ) {
			_graphicsDef ( _shape, _data );
		} else {

			if ( !isEmpty ( _fillColour ) ) {				
				_shape.graphics.beginFill( _fillColour );
			}

			if ( !isEmpty ( _strokeColour ) ) {
				_shape.graphics.beginStroke( _strokeColour );
			}

		}
	}

	function _draw () {

		switch ( _type ) {
			case ShapeParticle.CIRCLE :
				_prepareShapeRedraw ();				
				_shape.graphics.drawCircle ( 0, 0, _radius );
				break;
			case ShapeParticle.ELLIPSE :
				_prepareShapeRedraw ();
				_shape.graphics.drawEllipse ( 0, 0, _width, _height );
				break;
			case ShapeParticle.RECT :
				_prepareShapeRedraw ();
				_shape.graphics.drawRect ( -_width * 0.5, -_height * 0.5, _width, _height );
				break;
			case ShapeParticle.POLYSTAR :
				_prepareShapeRedraw ();
				_shape.graphics.drawPolyStar ( 0, 0, _radius, _sides, _pointSize, _angle );
				break;
			case ShapeParticle.CUSTOM :
				_this.dispatchEvent ( new BaseEvent ( "REDRAW", { "graphics" : _shape.graphics, "fill" : _fill } ) );
				break;
		}

		// If we aren't using cust\om graphics, set the stoke and fill appropriately.
		if( ! ( _graphicsDef instanceof Function ) ) {
			if ( !isEmpty ( _fillColour ) ) {
				_shape.graphics.endFill ();	
			}

			if ( !isEmpty ( _strokeColour ) ) {
				_shape.graphics.endStroke ();
			}

		}
		
		switch ( _type ) {
			case ShapeParticle.CIRCLE :
				_shape.cache(-_radius, -_radius, _radius * 2, _radius *2);
				break;
			case ShapeParticle.ELLIPSE :
				_shape.cache(-_width , -_height, _width * 2, _height * 2);				
				break;
			case ShapeParticle.RECT :				
				_shape.cache( -_width * 0.5, -_height * 0.5, _width, _height );
				break;
			case ShapeParticle.POLYSTAR :
				//_prepareShapeRedraw ();
				//_shape.graphics.drawPolyStar ( 0, 0, _radius, _sides, _pointSize, _angle );
				break;
			case ShapeParticle.CUSTOM :
				_this.dispatchEvent ( new BaseEvent ( "CACHE", { "graphics" : _shape.graphics, "fill" : _fill } ) );
				break;
		}

	}

	function _onParticleComplete_listener ( event ) {
		_emitter.particleComplete( _this );
	}

	_this.displayObject = function () {
		return _shape;
	};

	_this.start = function () {

			// redraw the shape. More so for changing colours
		// _draw ();

			// delegate the easing to the assigned ease logic					
		_easeLogic.start ();

	};

	return _construct ( data, emitter );
}

ShapeParticle.isType = function ( type ) {
	"use strict";
	switch ( type ) {
		case ShapeParticle.CIRCLE :
		case ShapeParticle.ELLIPSE :
		case ShapeParticle.RECT :
		case ShapeParticle.POLYSTAR :
		case ShapeParticle.CUSTOM :
			return true;
	}

	return false;
};

// Set shape types:
ShapeParticle.CIRCLE = "ShapeParticle.CIRCLE";
ShapeParticle.ELLIPSE = "ShapeParticle.ELLIPSE";
ShapeParticle.RECT = "ShapeParticle.RECT";
ShapeParticle.POLYSTAR = "ShapeParticle.POLYSTAR";
ShapeParticle.CUSTOM = "ShapeParticle.CUSTOM";

// Set defaults:
ShapeParticle.DEFAULT_RADIUS = 10;
ShapeParticle.DEFAULT_WIDTH = 25;
ShapeParticle.DEFAULT_HEIGHT = 25;
ShapeParticle.DEFAULT_POINT_SIZE = 0.5;
ShapeParticle.DEFAULT_ANGLE = 0;
ShapeParticle.DEFAULT_SIDES = 5;
ShapeParticle.DEFAULT_FILL_COLOUR = "#FFF";