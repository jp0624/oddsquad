( function (ns) {

	/**
	 * Scroll through lines of text.
	 * @param {jquery div} $div     a jquery object pointing to a div.
	 * @param {array [string] } text     	lines of text to display.
	 * @param {int} numLines Number of lines to display.
	 * @param {Number} timeout time between scrolls.
	 */
	function RandomTextScroller ($div, text, numLines, timeout) {

		// create a locally scoped copy of this.
		var _this = this;

		// The interval that's animating the scrolling text.
		var _myInterval;

		// The div containing the scrolling text.
		var _$div;

		// The text.
		var _text;

		// The length of the text array.
		var _textLength;

		// The current offset in the text array.
		var _currentOffset;

		// the number of lines to display.
		var _numLines;

		/**
		 * Construct a random text scroller.
	 	 * @param {jquery div} $div     a jquery object pointing to a div.
		 * @param {array [string] } text     	lines of text to display.
	 	 * @param {int} numLines Number of lines to display.
	 	 * @param {Number} timeout time between scrolls.
		 * @return {RandomTextScroller}  the object that was created.
		 */
		function _construct($div, text, numLines, timeout) {
			_myInterval = setInterval(_scrollText, timeout);
			_text = text;
			_$div = $div;
			_currentOffset = 0;
			_numLines = numLines;
			_textLength = text.length;

			return _this;
		}

		/**
		 * Scroll the text by one line.
		 */
		function _scrollText() {
			_currentOffset += 1 % _numLines;
			var output = "";

			for (var i = 0; i < _numLines; i++) {
				output += text[(_currentOffset + i) % _textLength];
				output += "<br/>";
			}
			_$div.html(output);
		};

		/**
		 * Release this instance.
		 */
		_this.release = function() {
			clearInterval(_myInterval);
			_this = undefined;
			_myInterval = undefined;
			_$div = undefined;
			_text = undefined;
			_textLength = undefined;
			_currentOffset = undefined;
			_numLines = undefined;
		}

		return _construct ($div, text, numLines, timeout);
	}

	ss.RandomTextScroller = RandomTextScroller;
} (ss) );