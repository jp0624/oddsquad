
// Create a scene container object
function SceneContainer( parentCanvas ) {

	var _this = new createjs.Container();

	function _construct () {
		_this.width = parentCanvas.canvas.width;
		_this.height = parentCanvas.canvas.height;
		parentCanvas.addChild(_this);
		return _this;
	}


	_this.Destroy = function() {
		parentCanvas.removeChild(_this);
		_this = null;
	}


	return _construct();
}