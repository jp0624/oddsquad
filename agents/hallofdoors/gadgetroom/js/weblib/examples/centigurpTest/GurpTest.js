/* global require, $, console */

require.config( {
	"baseUrl": "../../../",
	"alias": {},
    "debug": true
});

require.include("weblib/effects/Fullscreen")

var numGurps = 3000;
var gurps = [];
$(document).ready( function () {


    stage = new createjs.Stage("testCanvas");

	for(var i = 0; i < numGurps; i++) {
		var newGurp = { image:null, vX:null, vY:null};

		newGurp.image = new createjs.Bitmap("centigurp.png");
		newGurp.image.mouseEnabled = false;
		
		newGurp.image.x = Math.random() * 2048;
		newGurp.image.y = Math.random() * 1024;
		
		newGurp.vX =  (Math.random() * 10) - 5;
		newGurp.vY = (Math.random() * 10) - 5;
				
		newGurp.image.regX = 72;
		newGurp.image.regY = 72;
	
		newGurp.size = Math.random() + 0.2;
		
		//console.dir(newGurp);
		newGurp.zero1Velocity = 0;
		//newGurp.image.cache(-72,-72,72,72);
		gurps.push(newGurp);
		
		stage.addChild(newGurp.image);
				
		
	}	

	var forceDir = 0;
	var forceAmt = 0;
	var forceAmtAccel = 0.0001;

	var i;
	var gurp;

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", function (evt) {

	forceAmt += forceAmtAccel;

	forceDir +=  0.02;

		for (i = 0; i < gurps.length; i++) {
			gurp = gurps[i];

			gurp.image.x += gurp.vX;
			gurp.image.y += gurp.vY;

			if(gurp.image.x > 2048 || gurp.image.x < 0){
				gurp.vX *= -1;
			}

			if(gurp.image.y > 1024 || gurp.image.y < 0) {
				gurp.vY *= -1;
			}

			gurp.vX += Math.sin(forceDir) * forceAmt;
			gurp.vY += Math.cos(forceDir) * forceAmt;

			gurp.targetOrientation = Math.atan2(gurp.vY, gurp.vX) + Math.PI / 2;			
			gurp.image.rotation = ((gurp.targetOrientation * 180) / Math.PI + 360) % 360;


			gurp.zero1Velocity = (gurp.zero1Velocity * 9 + (Math.sqrt((gurp.vX * gurp.vX) + (gurp.vY * gurp.vY)) / 1.41)) / 10;

			gurp.image.scaleY = (1 + (0.08 * gurp.zero1Velocity)) * gurp.size;
			gurp.image.scaleX = (1 - (0.08 * gurp.zero1Velocity)) * gurp.size;

		}

		stage.update();
	}
	);

});

