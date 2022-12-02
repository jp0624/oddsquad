require.include("weblib/storage/KeyValueStorage.js");

var HIGH_SCORE_KEY = "ballroom_highscore"; // Key in the key value storage for the high score.

var currentHighScore; // the current high score.

/**
 * Update the key value high score.
 */
function updateKeyValueHighScore() {
	if(isEmpty(KeyValueStorage.getFloat(HIGH_SCORE_KEY)) || isNaN(KeyValueStorage.getFloat(HIGH_SCORE_KEY)) || KeyValueStorage.getFloat(HIGH_SCORE_KEY) < currentHighScore) {
		KeyValueStorage.set(HIGH_SCORE_KEY, currentHighScore, true);
	}
}

/**
 * Display the high score on an element.
 * @param  {JQuery Object} element - The element.
 */
function displayHighScore(element) {
	$(element).text(currentHighScore);
}

/**
 * Update the local high score.
 * @param  {Number} newScore - The score.
 */
function updateHighScore(newScore) {
	if(currentHighScore < newScore) {
		currentHighScore = newScore;
	}
}

/**
 * Listener for when the value for the high score is ready in the key value storage.
*/
function keyValueStorageReady() {
	if(!isNaN(KeyValueStorage.getFloat(HIGH_SCORE_KEY))) {
		currentHighScore = Math.max(KeyValueStorage.getFloat(HIGH_SCORE_KEY), currentHighScore);
	}
}

/**
 * Start up the high score manager.
 */
function startUpHighScores() {
	currentHighScore = 0;

	// add a listener for when cache update is complete.
	KeyValueStorage.addEventListener("CacheUpdateComplete", keyValueStorageReady)
	KeyValueStorage.setGameSettingsURL("../../../php/gameSettings.php");

	// set the defaults for the high score.
	KeyValueStorage.setDefaults({HIGH_SCORE_KEY:0});
	KeyValueStorage.resetToDefaults(false);

	// udpate the local cache.
	KeyValueStorage.updateLocalCache([HIGH_SCORE_KEY]);

	// Save your score every 10 seconds.
	setInterval(updateKeyValueHighScore, 10000);

	// before the window closes, update the key value high score.
	window.onbeforeunload = updateKeyValueHighScore;
}