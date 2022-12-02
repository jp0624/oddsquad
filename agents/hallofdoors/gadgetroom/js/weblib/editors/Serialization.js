/* global require, console, isEmpty, Vector2 */

require.include("weblib/core/Util");
require.include("weblib/math/geom/Vector2");

/**
 * Class of static helper functions to help with serialization and deserialization of objects.
 */
var SerializationHelpers =  SerializationHelpers || {};

/////// BEGIN - list of constants for names of known types that can be automatically deserialized //////
SerializationHelpers.TYPE_VECTOR2 = "Vector2";
/////// END - list of constants for names of known types that can be automatically deserialized //////

/*
* Helper used to serialize an object to JSON.
* @param objectToSerialize {string}: The object to serialize. Will use JSON.stringify unless the object to serialize has a serialize method, which will be used instead.
* NOTE:
* 	 Objects that use this serialization system need:
* 	 	- a "name" property, which matches the name of the class of the object.
* 	  	- a "exposedVariables" property, which matches the variables that will be set on the object when deserializing.
* NOTE:
* 		By default, when deserializing, the object's constructor will be called with no parameters, and the exposed variables will be set individually, if a different
* 	 	behaviour is desired, a deserialize method is required.
* @return {string}:
*         a serialized representation of the object, in the following form:
*         {
*         	"name": "NAME_OF OBJECT",
*           "objectJSON": "JSON_REPRESENTATION_OF_OBJECT"
*         }
*/
SerializationHelpers.serialize = function (objectToSerialize) {
	"use strict";

	var objectJSON;

	if(typeof objectToSerialize.serialize === "function") {
		objectJSON = objectToSerialize.serialize();
	}

	objectJSON = JSON.stringify(objectToSerialize);

	return JSON.stringify({
		"name": objectToSerialize.name,
		"objectJSON":objectJSON
	});

};


/**
 * This method is used to detect known object types to deserialize.
 * @param  {Object} jsonObject The object whose type to try to determing.
 * @return {bool/string} false if the type is unkown, a string representing the type if the type is known.
 */
SerializationHelpers.getCustomType = function(jsonObject) {
	"use strict";

	if(typeof jsonObject === "object") {
		// we're looking at an object.

		// is it something we recognize?
		if (SerializationHelpers.isVector2(jsonObject) ) {
			// it's a vector2!
			return SerializationHelpers.TYPE_VECTOR2;
		}

		// hmm.. that's not good, it's an object, but I don't know what it it.
		console.warn("warning: Attempting to deserialize an unkown object: " + JSON.stringify(jsonObject));
		return false;
	}

	return false;
};

/**
 * Attempts to check if an object parsed from JSON is meant to be a vector2.
 * checks for exactly 2 properties, named x & y.
 * @param  {Object}  jsonObject: An object parsed from json data, that may represent a Vector2.
 * @return {Boolean}: true if the object seems to represent a Vector2, false if it doesn't.
 */
SerializationHelpers.isVector2  = function (jsonObject) {
	"use strict";
	var numProperties = Object.keys(jsonObject).length;
	if(numProperties === 2) {
		// I thought I saw a Vector2.
		if(!isEmpty(jsonObject.x) && !isEmpty(jsonObject.y)) {
			// I DID!, I DID SAW A VECTOR2!
			return true;
		}
	}
};

/*
* Custom deserializer for Vector2.
* @param {Object} jsonObject: an object with x and y properties that will be converted to Vector2.
* @return {Vector2}: a Vector2 build from the object representation.
*/
SerializationHelpers.deserializeVector2 = function(jsonObject) {
	"use strict";
	return new Vector2(jsonObject.x, jsonObject.y);
};

/*
* Deserialize a known custom type.
* @param jsonObject {Object}: An object, parsed from json data, to be converted into the proper custom type.
* @param type{string}: The type of object to deserialize.
* @return a deserialized version of the json object, or undefined if the type is unknown.
*/
SerializationHelpers.deserializeCustomType = function (jsonObject, type) {
	"use strict";

	switch(type) {
		case SerializationHelpers.TYPE_VECTOR2:
			return SerializationHelpers.deserializeVector2(jsonObject);
	}
	return undefined;
};

/*
* Perform basic deserialization of an object, this will call the constructor on the class
* then set each of the exposed variables to the values in the JSON object.
* NOTE:
* 	- All primitive types will be automatically deserialized.
* 	- Reference to the following custom classes will deserialize automatically:
* 		- Vector2
* 	- Any other classes will need to use a custom deserialization method to manually deserialize them.
* @serializedObject {string}: A serialized representation of the object, in the following form:
* 		{
*        	"name": "NAME_OF OBJECT",
*         	"objectJSON": "JSON_REPRESENTATION_OF_OBJECT"
*        }
* @return {Object}: the deserialized object.
*/
SerializationHelpers.basicDeserialize = function (serializedObject) {
	"use strict";
	var objDefinition = JSON.parse(serializedObject);
	var newObj = new window[objDefinition.name];

	var objData = JSON.parse(objDefinition.objectJSON);
	var exposedVar, i;

	if(!isEmpty(newObj.exposedVariables)) {
		for (i = 0; i < newObj.exposedVariables.length; i++) {
			exposedVar = newObj.exposedVariables[i];


			// check for custom data types:
			var customType = SerializationHelpers.getCustomType(objData[exposedVar]);
			if (customType) {
				var deserializedCustomObj = SerializationHelpers.deserializeCustomType(objData[exposedVar], customType);
				newObj[exposedVar] = deserializedCustomObj;
			} else {
				newObj[exposedVar] = objData[exposedVar];
			}
		}
	}

	return newObj;
};


/*
* Deserialize an object. If the object has a deserialize method, this will be called, otherwise,
* basicDeserialize will be used by default.
* NOTE:
* 	- All primitive types will be automatically deserialized.
* 	- Reference to the following custom classes will deserialize automatically:
* 		- Vector2
* 	- Any other classes will need to use a custom deserialization method to manually deserialize them.
* @serializedObject {string}: A serialized representation of the object, in the following form:
* 		{
*        	"name": "NAME_OF OBJECT",
*         	"objectJSON": "JSON_REPRESENTATION_OF_OBJECT"
*        }
* @return {Object}: the deserialized object.
*/
SerializationHelpers.deserialize = function (serializedObject) {
	"use strict";
	var objDefinition = JSON.parse(serializedObject);
	var newObj = new window[objDefinition.name];

	if(typeof newObj.deserialize === "function") {
		newObj = newObj.deserialize(serializedObject);
	} else {
		newObj = SerializationHelpers.basicDeserialize(serializedObject);
	}
	return newObj;
};