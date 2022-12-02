function AbstractMaterial ( instance ) {

	var _super = {};
	var _this = AbstractObject ( instance );

	function _construct () {
		return _this;
	}

	_this.draw = function ( graphics ) {

	}

	return _construct ();
}