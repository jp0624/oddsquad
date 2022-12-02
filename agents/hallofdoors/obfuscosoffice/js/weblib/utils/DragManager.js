function DragObserver ( container, stage ) {

	var _super = {};
	var _this = AbstractEventDispatcher ( this );

	var _item;
	var _stage;
	var _mouseOffset;
	var _interval;

	var _initialMouseX;
	var _initialMouseY;

	var _lastMouseX;
	var _lastMouseY;

	var dragX;
	var dragY;

	function _construct ( container, stage ) {

		_item = container;
		_stage = stage;
	}

	function _onStageMouseMove_listener ( event ) {
		_dragX = _lastMouseX - _stage.mouseX;
		_dragY = _lastMouseY - _stage.mouseY;

		_lastMouseX = _stage.mouseX;
		_lastMouseY = _stage.mouseY;

		_this.dispatchEvent ( new Event ( "ITEM_DRAG", { "item" : _item, "eventJS" : event } ) );
	}

	function _onStageMouseUp_listener ( event ) {
		_this.dispatchEvent ( new Event ( "ITEM_DROP", { "item" : _item, "eventJS" : event } ) );
	}

	_this.initialMouseX = function () {
		return _initialMouseX;
	}

	_this.initialMouseY = function () {
		return _initialMouseY
	}

	_this.lastMouseX = function () {
		return _lastMouseX;
	}

	_this.lastMouseY = function () {
		return _lastMouseY;
	}

	_this.dragX = function () {
		return _dragX;	
	}

	_this.dragY = function () {
		return _dragY;
	}

	_this.activate = function () {

		_initialMouseX = _stage.mouseX;
		_initialMouseY = _stage.mouseY;

		_stage.addEventListener ( "stagemousemove", _onStageMouseMove_listener );
		_stage.addEventListener ( "stagemouseup", _onStageMouseUp_listener );
	}	

	_super.release = _this.release;
	_this.release = function () {
		_stage.removeEventListener ( "stagemousemove", _onStageMouseMove_listener );
		_stage.removeEventListener ( "stagemouseup", _onStageMouseUp_listener );

			// clean up all the listeners
		_super.release ();
	}

	return _construct ( container, stage );
} 