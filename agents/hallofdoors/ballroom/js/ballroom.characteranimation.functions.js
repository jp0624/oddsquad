var AGENT_CANVAS_ID = "agentCanvas"; // ID of the agent canvas.

var characterStage; // stage that draws the character.
var characterSpriteSheet; // character sprite sheet.
var characterSprite; // character sprite.

function getSimpleAvatar () {
    var avatar = "boy_1";
    if( typeof userLogin !== "undefined" && !isEmpty(userLogin) && userLogin.length > 0) {
        var avatarImage = userLogin[0]["avatar"];
        if(avatarImage.indexOf("male0") != -1 ) {
            avatar = "boy_1";
        }

        if(avatarImage.indexOf("male1") != -1 ) {
            avatar = "boy_2";
        }

        if(avatarImage.indexOf("male2") != -1 ) {
            avatar = "boy_3";
        }

        if(avatarImage.indexOf("female0") != -1 ) {
            avatar = "girl_1";
        }

        if(avatarImage.indexOf("female1") != -1 ) {
            avatar = "girl_2";
        }

        if(avatarImage.indexOf("female2") != -1 ) {
            avatar = "girl_3";
        }
    }
    //console.log("setting avatar to: " + avatar);
    return avatar;
}

var avatar = getSimpleAvatar();



var animList = ["float_","falling_", "tumble_"]; // list of animations.
var speedCutoffs = [0, 1, 25]; // speed cutoffs for each of the animations.

var animToPlay = "float_" + avatar; // the animation that should be playing.




/**
 * Set the speed of the character, to determine which animation to play.
 * @param {Number} speed - The number of pixels since last frame that the page has scrolled.
 */
function setCharacterSpeed(speed) {
	for(var i = 0; i < speedCutoffs.length; i++) {
        //console.log(speed);
		if(speed > speedCutoffs[i]) {
			// if we're greater than one of the speed cutoffs, set the animation to play to the new one.
			animToPlay = animList[i] + avatar;
		}
	}
}


/**
 * Called every frame by the createjs tick event to update the character animations.
 */
function updateCharacterAnimation() {
	// if the wrong animation is playing, play it.
	if(characterSprite.currentAnimation !== null && characterSprite.currentAnimation !== animToPlay){
		characterSprite.gotoAndPlay(animToPlay);
	}

	// update the stage.
	characterStage.update();
}

/**
 * Sets up the character animation.
 */
function setupCharacterAnimation() {

	characterStage = new createjs.Stage(AGENT_CANVAS_ID);
	characterSpriteSheet = new createjs.SpriteSheet(characterSpriteSheetData);
	characterSprite = new createjs.Sprite(characterSpriteSheet, animToPlay);

	characterStage.addChild(characterSprite);

	createjs.Ticker.addEventListener("tick", updateCharacterAnimation);
}