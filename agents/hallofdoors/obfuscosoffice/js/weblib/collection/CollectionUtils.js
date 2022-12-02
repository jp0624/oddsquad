/*
* Utility functions for working with collection.
*/
var CollectionUtils = CollectionUtils || new function () {
	"use strict";

	var _this = this;

	/*
	* Get a random object in an array.
	* @param arr: [Array] the array to get a random element from.
	*/
	_this.getRandomObjectInArray = function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	};
}; // jshint ignore:line