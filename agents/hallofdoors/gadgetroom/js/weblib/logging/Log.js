/*
* Logging utility. Allows you turn debug logging on / off, with optional stack traces.
*/
var Log = Log || new function () {

	// Locally scoped copy of this.
	var _this = this;

	// Whether or not we're in debug mode. Set to true to show debug traces, false otherwise.
	_this.DEBUG_MODE = false;

	// Whether or not to show stack traces with logs. Set to true to show stack traces, false otherwise.
	_this.SHOW_STACK = true;

	/*
	* Display a debug message, if DEBUG_MODE is set to true.
	* This will also show the line that called it if SHOW_STACK is set to true.
	* @param string, the string to display.
	*/
	_this.debug = function(string) {

		if(_this.DEBUG_MODE) {

			console.log(string);

			if(_this.SHOW_STACK) {
				try {
					// Throw a fake error and use it to get a stack trace.
					throw new Error("fake_error");
				} catch (e) {
					console.log(e.stack.split("\n")[2]);
				}
			}
		}
	}

	/*
	* Display a console dir, if DEBUG_MODE is set to true.
	* This will also show the line that called it if SHOW_STACK is set to true.
	* @param string, the string to display.
	*/
	_this.dir = function(string) {
		if(_this.DEBUG_MODE) {

			console.dir(string);

			if(_this.SHOW_STACK) {
				try {
					// Throw a fake error and use it to get a stack trace.
					throw new Error("fake_error");
				} catch (e) {
					console.log(e.stack.split("\n")[2]);
				}
			}
		}
	}

	return _this;
}