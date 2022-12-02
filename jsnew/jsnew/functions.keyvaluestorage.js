function _setValueComplete (result) { // jshint ignore:line
	console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SET!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("* Set value successfully in DB.");
	console.trace(result);
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");
}

function _setValueError (result) {
	console.warn("* Error setting value in DB: " + result);
}
	
function _getValueComplete (result,group) {
	// DEBUG
	console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GOT!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("* Received Key " + result.key + " with value " + result.value  + " from group "+ group);
	console.log("* Now trying to send it back to the game via "+bellhop);
	console.trace(result);
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");

	var returnData = {key: result.key, value:result.value, group:group};

	bellhop.send('get-result', returnData);
}

function _getValueError (result) {
	console.log("* ERROR GETTING VALUE from DB: " + result);
}
