require.config( {
	"baseUrl": "../../../",
	"alias": {
		"particles": [ "weblib/particles/ParticlePackage"]
	},
	"debug": true

});

require.include("particles");

$( document ).ready(function() {
		
	var canvas = document.getElementById('testCanvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var stage = new createjs.Stage("testCanvas");


	
	this.myX = 100;
	this.myY = 100;

	this.getX = function () {
		return this.myX;
	}

	this.getY = function () {
		return this.myY;
	}

	var emitterData = {
				"interval" : 10,
				"maxCount" : 500,
				"emitCount" : 10,				
				"particle" : { "type" : BitmapParticle.BITMAP, "bitmap": new createjs.Bitmap("smoke-particle.png"),							
								"ease":  {
									"type" : EaseLogic.SINGLE,
									"start" : { "x" : this.getX, "y" : this.getY, "alpha" : [ 0.2,1 ] },
									"targetEase" : 
										{ "duration" : [ 0, 2 ], "data" : { "radialSpread" : BasicRadialSpread, "distance" : 200, "startAngle" : 0, "endAngle" : 360, "alpha": 0 }}
									
								}
							}
			};



	

	var emitter = new BaseEmitter(emitterData, stage);
	emitter.start();

	// add the tick listener.
	createjs.Ticker.addEventListener("tick", tick);

	stage.addEventListener("stagemousemove", function (evt)
	{

		this.myX = evt.stageX;
		this.myY = evt.stageY;
	});


	function tick () {		
		
			stage.update();	
		

	}
});

