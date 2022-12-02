require.include("weblib/external/createjs.min.js");

/*
* Class DebugUtil
* 	Singleton class that provides the ability to display debugging information in multiple different ways
*/

//Constants for possible message priority levels
DebugUtil.LEVEL_DEBUG = 0;
DebugUtil.LEVEL_WARNING = 1;
DebugUtil.LEVEL_ERROR = 2;

//Constants for possible types of message display
DebugUtil.DISPLAY_NONE = 0;
DebugUtil.DISPLAY_CONSOLE = 1;
DebugUtil.DISPLAY_SCREEN = 2;

/*
* Get the singleton instance of this class
*/
var DebugUtil = DebugUtil || new function DebugUtil(){

	//Prefixes to apply to messages of different levels
	var WARNING_PREFIX = "--WARNING-- ";
	var ERROR_PREFIX = "*** ERROR *** ";

	//How much to offset text fields along the Y axis
	var TEXT_OFFSET_Y = 15;	
	var TEXT_START_X = 5;	
	var FONT = "Arial";
	var COLOUR = "#000000";

	var _this = this;

	//Array[int] - Enumerations defining display levels for all message levels
	var _displayLevels;	

	//Object - Associative array mapping message tag names to their on-screen text displays
	var _taggedTextDisplays;

	//Container - Container used to display test messages to the screen
	var _displayContainer;

	//int - Counter for how many text fields are being displayed on screen
	var _textFieldCount;

	/*
	* Initialize this object
	*/
	_construct = function(){

		_displayLevels = new Array();
		_displayLevels[DebugUtil.LEVEL_DEBUG] = DebugUtil.DISPLAY_CONSOLE;
		_displayLevels[DebugUtil.LEVEL_WARNING] = DebugUtil.DISPLAY_CONSOLE;
		_displayLevels[DebugUtil.LEVEL_ERROR] = DebugUtil.DISPLAY_CONSOLE;

		_taggedTextDisplays = new Object();

		_textFieldCount = 0;

		return _this;
	}

	/*
	* Set the display levels for all message levels
	* @param debugDisplay:int - Enumerated display level for debug messages
	* @param warningDisplay:int - Enumerated display level for warning messages
	* @param errorDisplay:int - Enumerated display level for error messages
	*/
	_this.setDisplayLevels = function(debugDisplay, warningDisplay, errorDisplay){
		_displayLevels[DebugUtil.LEVEL_DEBUG] = debugDisplay;
		_displayLevels[DebugUtil.LEVEL_WARNING] = warningDisplay;
		_displayLevels[DebugUtil.LEVEL_ERROR] = errorDisplay;
	}

	_this.setDisplayContainer = function(container){
		_displayContainer = container;
	}

	_this.displayDebug = function(message, tag){
		_displayMessageAtLevel(message, _displayLevels[DebugUtil.LEVEL_DEBUG], tag);
	}

	_this.displayWarning = function(message, tag){
		_displayMessageAtLevel(WARNING_PREFIX + message, _displayLevels[DebugUtil.LEVEL_WARNING], tag);
	}

	/*
	* Display an Error message
	*/
	_this.displayError = function(message, tag){
		_displayMessageAtLevel(ERROR_PREFIX + message, _displayLevels[DebugUtil.LEVEL_ERROR], tag);
	}

	/*
	* Display a message at a particular display level
	* @param message:String - The message to display
	* @param displayLevel:int - The enumerated display level to display this message at
	* @param tag:String (Optional) - A tag name to associate with this message in order to avoid spamming text on screen.
	*	Any existing message with the same tag will be overwritten by this new one.
	*/
	function _displayMessageAtLevel(message, displayLevel, tag){
		var textField;

		//Return immediately if there should be no display
		if(displayLevel == DebugUtil.DISPLAY_NONE){
			return;
		}

		//Display to console if requested
		if(displayLevel >= DebugUtil.DISPLAY_CONSOLE){
			console.log(message);
		}

		//Display to screen if requested
		if(displayLevel >= DebugUtil.DISPLAY_SCREEN){
			//If a tag was provided, check if a text object already exists for it
			if(tag){
				textField = _taggedTextDisplays[tag];
				if(textField){
					textField.text = message;
				//Create a new text field for this tag
				}else{
					textField = new Text(message, FONT, COLOUR);
					_taggedTextDisplays[tag] = textField;
					_addTextField(textField);
				}
			//If no tag was provided, create a new un-tagged text object
			}else{
				textField = new Text(message, FONT, COLOUR);
				_addTextField(textField);
			}
		}
	}

	/*
	* Helper function that adds a text field the display and positions it
	* @param textField:Text - The text field to add
	*/
	function _addTextField(textField){
		_displayContainer.addChild(textField);
		textField.x = TEXT_START_X;
		textField.y = TEXT_START_Y + TEXT_OFFSET_Y * _textFieldCount;
		_textFieldCount++;
	}

	return _construct();
}