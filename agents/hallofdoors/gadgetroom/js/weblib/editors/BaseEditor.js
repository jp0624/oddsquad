/* global $, isEmpty, require, Interpolation */

require.include('weblib/external/jquery.numeric.js');
require.include('weblib/core/Util');
require.include('weblib/math/interpolation/Interpolation');

// Regex to test if a string is a hex color.

var colorRegex, EditorHelpers;
colorRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

EditorHelpers = {};

/**
* Checks if a string is a hex color.
**/
EditorHelpers.isHtmlColour = function(color) {
	'use strict';

    if (colorRegex.test(color)) {
		return true;
	}
	return false;
};

/**
* Create a basic input box for properties of an object that don't have a custom input type.
* @param $div -> The div to put the editor into.
* @param currentComponent -> The component whose property we're exposing.
* @param currentProperty -> The property we're exposing.
**/
EditorHelpers.createInputEditor = function ($div, currentComponent, currentProperty) {
	'use strict';

	var $valueName, $input;

	$valueName = $('<div>'+currentProperty+':</div>');
	$input = $('<input type="text" name="'+currentProperty+'" value="'+ currentComponent[currentProperty] +'" />');
	$input.data ( 'dataObject', currentComponent );

	$div.append($valueName);
	$valueName.append($input);

	return $input;
};

/**
 * Create a select editor (list of options.)
 * @param  {<div>} $div              The div to put the editor into.
 * @param  {Object} currentComponent The component being edited.
 * @param  {string} currentProperty  The property being edited.
 * @param  {string} options          The list of all possible options.
 * @param  {string} current          The currently selected option.
 * @return {<select>}                The select form that was created.
 */
EditorHelpers.createSelectEditor = function ($div, currentComponent, currentProperty, options, current) {
	'use strict';

	var $valueName = $('<div>'+currentProperty+':</div>');

	var $sel = $('<select> </select>');
	$sel.data ( 'dataObject', currentComponent );
	$sel.data ( 'dataProperty', currentProperty );

	$valueName.append($sel);
	var opt;
	for (opt in options) {
		if (typeof opt === 'string') {
			$sel.append('<option value="' + options[opt] + '"> ' + options[opt] + ' </option>');
		}
	}

	$sel.val(current);

	$div.append($valueName);

	return $sel;

};

/**
* Create an editor input box for numbers.
* Validates that the input is numeric, and adds the ability to horizontally slide the number.
* @param $div -> The div to put the editor into.
* @param currentComponent -> The component whose property we're exposing.
* @param currentProperty -> The property we're exposing.
**/
EditorHelpers.addNumberEditor = function ($div, currentComponent, currentProperty) {
	'use strict';

	var $input, $this, tObject, $numberEditorDiv;

	$numberEditorDiv = $('<div></div>');

	$input = EditorHelpers.createInputEditor($numberEditorDiv, currentComponent, currentProperty);

	$input.change ( function () {
		$this = $ (this);
		tObject = $this.data ('dataObject');
		tObject [ $this.attr ('name') ] = eval($this.val ());
	} );

	$input.numeric();

	//TODO: Make Numbers slideable.
	/*$input.css('cursor', 'ew-resize');

	$input.mousedown( function () {

	} );*/

	$div.append($numberEditorDiv);

	return $numberEditorDiv;
};

/**
* Adds an editor for string properties.
* @param $div -> The div to put the editor into.
* @param currentComponent -> The component whose property we're exposing.
* @param currentProperty -> The property we're exposing.
**/
EditorHelpers.addStringEditor = function ($div, currentComponent, currentProperty) {
	'use strict';

	var $input, $this, tObject;

	$input = EditorHelpers.createInputEditor ($div, currentComponent, currentProperty);

	$input.change ( function () {
		$this = $ ( this );
		tObject = $this.data ('dataObject');
		tObject [ $this.attr ('name') ] = eval('"' + $this.val () + '"');
	} );
};

/**
* Adds an editor for color properties.
* @param $div -> The div to put the editor into.
* @param currentComponent -> The component whose property we're exposing.
* @param currentProperty -> The property we're exposing.
**/
EditorHelpers.addColorEditor = function ($div, currentComponent, currentProperty) {
	'use strict';

	var $valueName, $input, $this, tObject;

	$valueName = $('<div>'+currentProperty+':</div>');
	$input = $('<input type="color" name="'+currentProperty+'" value="'+ currentComponent[currentProperty] +'" />');
	$input.data ( 'dataObject', currentComponent );

	$input.change ( function () {
		$this = $ ( this );
		tObject = $this.data ('dataObject');
		tObject [ $this.attr ('name') ] = $this.val ();
	} );

	$div.append($valueName);
	$valueName.append($input);

	return $input;
};

/**
* Create an editor for a boolean field.
* @param $div -> The div to put the editor into.
**/
EditorHelpers.addBooleanEditor = function($div, component, property) {
	'use strict';

	var $valueName, $input, $this, tObject;
	$valueName = $('<div>'+property+':</div>');
	$input = $('<input type="checkbox" name="'+property+'" checked="'+ component[property] +'" />');
	$input.data ( 'dataObject', component );

	$input.change ( function () {
		$this = $ ( this );
		tObject = $this.data ('dataObject');
		tObject [ $this.attr ('name') ] = $this.prop('checked');
	} );

	$div.append($valueName);
	$valueName.append($input);
};

/*
* Get the name of a given interpolation function.
* @param property: the function itself.
*/
EditorHelpers.getInterpolationFunction = function (property) {
	'use strict';

	var prop;
	for (prop in Interpolation) {
		if (property === Interpolation[prop]) {
			return prop;
		}
	}
};

// cache for getting the list of interpolation functions.
var interpolationFunctions = [];

/*
* Get a list of the interpolation functions.
* @return {Array} A list of the interpolation functions.
*/
EditorHelpers.getListOfInterpolationFunctions = function () {
	'use strict';

	if (interpolationFunctions.length === 0) {
		var prop;
		interpolationFunctions = [];
		for (prop in Interpolation) {
			if (Interpolation[prop].length === 1) {
				interpolationFunctions.push(prop);
			}
		}
	}
	return interpolationFunctions;
};

/**
 * Create an editor for an interpolation function.
 * @param {JQuery Div} $div      The div to put the editor into.
 * @param {object} component the component the editor is being created for.
 * @param {string} property  The property that the editor is being created for.
 * @param {interp} interp    The current interpolation function.
 */
EditorHelpers.addInterpolationFunctionEditor = function ($div, component, property, interp) {
	'use strict';

	var options = EditorHelpers.getListOfInterpolationFunctions();
	var $input = EditorHelpers.createSelectEditor($div, component, property, options, interp);

	$input.change ( function () {
		var $this = $ (this);
		var tObject = $this.data ('dataObject');
		var tProp = $this.data ('dataProperty');
		tObject [ tProp ] = Interpolation[$this[0].value];
	} );

};

/**
* Create a custom editor for a given property.
* @param $div -> 
**/
EditorHelpers.createEditorForProperty = function ($div, component, property) {
	'use strict';

	var data;

	data = component[property];

	switch (typeof data) {
		case 'boolean':
			// Add Editor for boolean properties.
			EditorHelpers.addBooleanEditor($div, component, property);
		break;
		case 'number':
			// Add editor for numeric properties.
			EditorHelpers.addNumberEditor($div, component, property);
		break;
		case 'object':
			// if we're looking at an object, see if it has a custom editor.
			if(typeof data.customEditor === 'function') {
				// if we have a custom editor, display it.
				data.customEditor($div, property, data);
			} else {
				if(data.exposedVariables === undefined) {
					// If we don't have a component, hide it.
					data.exposedVariables = Object.keys(data);
					data.name = property;
					EditorHelpers.createStandardEditorForComponent($div, data);
				} else {
					// If we have a component, display it.
					EditorHelpers.createStandardEditorForComponent($div, data);
				}
			}
		break;
		case 'string':
			if(EditorHelpers.isHtmlColour(data)) {
				// check if the string represents a color, if so, add a colour editor.
				EditorHelpers.addColorEditor($div, component, property);
			} else {
				// if it doesn't represent a color, use a regular computer editor.
				EditorHelpers.addStringEditor($div, component, property);
			}
		break;
		case 'function':
			// if we found a function that was exposed, see if it's an interpolation function,
			// if so show the interpolation editor, otherwise, use a string editor.
			var interp = EditorHelpers.getInterpolationFunction(component[property]);
			if(!isEmpty(interp)) {
				EditorHelpers.addInterpolationFunctionEditor($div, component, property, interp);
			} else {
				EditorHelpers.addStringEditor($div, component, property);
			}
			break;

		default:
			// if we don't know how to edit something, put in a standard editor.
			EditorHelpers.addStringEditor($div, component, property);
		break;
	}
};

/*
* Create a standard editor for the component.
* @param $container -> The container element to put the component into.
* @param currentComponent -> The component to create an editor for.
*/
EditorHelpers.createStandardEditorForComponent = function ($container, currentComponent){
	'use strict';

	var properties, propIndex, currentProperty;

	$container.append($('<div class="componentName">' + currentComponent.name + '</div>'));

	properties = currentComponent.exposedVariables;
	for (propIndex = 0; propIndex < properties.length; propIndex++) {
		// create an editor for each propery of the object.
		currentProperty = properties[propIndex];
		EditorHelpers.createEditorForProperty($container, currentComponent, currentProperty);
	}
};

/*
* Create a standard editor for the component.
* @param $container -> The container element to put the component into.
* @param obj -> The component to create an editor for.
*/
EditorHelpers.createStandardEditorForObject = function ($container, obj){
	'use strict';

	var properties, propIndex, currentProperty;

	$container.append($('<div class="componentName">' + obj.name + '</div>'));

	properties = Object.keys(obj);
	for (propIndex = 0; propIndex < properties.length; propIndex++) {
		// create an editor for each propery of the object.
		currentProperty = properties[propIndex];
		EditorHelpers.createEditorForProperty($container, obj, currentProperty);
	}
};

/*
* Create a standard editor.
* @param $container -> the container element to put the editor into.
* @param obj -> the object whose editor you're creating.
*/
EditorHelpers.createStandardEditor = function ($container, obj) {
	'use strict';

	 if (!isEmpty(obj.exposedVariables)) {
		EditorHelpers.createStandardEditorForComponent($container, obj);
	} else {
		EditorHelpers.createStandardEditorForObject($container, obj);
	}
};

/*
* Create an editor.
* @param $container -> the container element to put the editor into.
* @param obj -> the object whose editor you're creating.
*/
EditorHelpers.createEditor = function ($container, obj) {
	'use strict';

	if(!isEmpty(obj.createCustomEditor)) {
		obj.createCustomEditor($container);
	} else {
		EditorHelpers.createStandardEditor($container, obj);
	}
};