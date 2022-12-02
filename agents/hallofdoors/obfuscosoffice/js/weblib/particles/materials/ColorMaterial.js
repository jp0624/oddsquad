function ColorMaterial ( data ) {

	_super = {};
	_this = AbstractMaterial ( this );

	var _shape;
	var _graphics;

	var _type;
	var _colors;
	var _ratios;
	
	var _width;
	var _height;
	var _radius;

	var _isDirty;

	function _construct ( data ) {

		_width = 25;
		_height = 25;
		_radius = 25;

			// mark this material for an update
		_isDirty = true;

		_shape = new createjs.Shape ();
		_shape.mouseEnabled = false;
		_shape.alpha = 0.5;
		_graphics = _shape.graphics;

		//_colors = ( Array.isArray ( data.colors ) ) ? data.colors : [ data.colors ];
		//_ratio = data.ratios;

		_type = "CIRCLE"; // data.type;

		_this.update ();

		return _this;
	}

	_this.displayObject = function () {
		return _shape;
	}

	/* _this.draw = function ( ctx, x, y ) {
		
	} */

	_this.update = function ( elapsedTime, delta, context ) {
		if ( _isDirty && true ) {

				// clear the graphics to redraw
			_graphics.clear ();

			_graphics.beginFill ( "#ff0" );

			switch ( _type ) {
				case "CIRCLE" :
					_graphics.drawCircle ( 0, 0, _radius );
				case "RECT" :
				default : 
					_graphics.drawRect ( -_width * 0.5, -_height * 0.5, _width, _height );
			}
		}
	}

	_this.reset = function ( data ) {
		_shape.x = data.x
		_shape.y = data.y;
	}

	return _construct ( data );
}

/* Material.RECT_TYPE = "RECT_TYPE";
Material.CIRCLE_TYPE = "CIRCLE_TYPE";
Material.CIRCLE_TYPE = "CIRCLE_TYPE";

Material.SOLID_FILL = "SOLID_FILL"; */