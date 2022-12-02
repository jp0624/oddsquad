require.config( {
	"baseUrl": "../../../", "debug":true
});

require.include('weblib/external/pixi.js');
require.include('weblib/editors/Serialization.js');
require.include('weblib/math/geom/Vector2');
require.include('weblib/math/interpolation/Interpolation');
require.include('weblib/editors/BaseEditor');

require.include("weblib/liveparticles/pixi/PixiParticlePackage");

var stage;
var renderer;
var assets;
var loader;
var gameContainer;

//var loadQueue;
var particleImage;
var graphics;
var background;
var emitter;
var emitterVelX = 20;
var shape;

var _targetObj;

$(document).ready ( function () {

	//TESTING
	console.log("Document Ready");

	//Create the Pixi Stage and renderer and add them to the document
	stage = new PIXI.Stage(0x000000);
	renderer = PIXI.autoDetectRenderer(1024, 768);
	gameContainer = new PIXI.DisplayObjectContainer();
	stage.addChild(gameContainer);
	document.body.appendChild(renderer.view);

	//Start loading the assets for the example
	assets = ["images.json"];
	loader = new PIXI.AssetLoader(assets);
	loader.onComplete = _handleLoadComplete;
	loader.load();

	function _handleLoadComplete(){

		requestAnimFrame(_handleUpdate);
		var texture = new PIXI.Texture.fromImage("raspberry_particle.png");

		var factory = new ss.PixiSpriteParticleFactory(texture);
		shape = new ss.RadialSpawnShape(new Vector2(0, 0), 400, 20, 40, 0, 360);

		//var shape = new LineSpawnShape(-100, 0, 100, 0, 0, 50);
		var timer = new ss.UniformSpawnTimer(1000);
		//var timer = new BurstSpawnTimer(800, 100);

		emitter = new ss.PixiParticleEmitter();
		emitter.setupFromObjects(50000, 4, 4, factory, timer, shape, [
			new ss.CycleInterpolatePropertyUpdater("scale", 0, 4, Interpolation.sin, 2, 0, "x"),
			new ss.CycleInterpolatePropertyUpdater("scale", 0, 4, Interpolation.sin, 2, 0, "y"),
			//new ss.CycleInterpolatePropertyUpdater("alpha", 0, 1, Interpolation.smoothStep, 2, 0),
			//new InterpolatePropertyUpdater("scale", 1, 4, Interpolation.inverseSquared, "x"),
			//new InterpolatePropertyUpdater("tint", 0xFFFFFF, 0x00FF00, Interpolation.inverseSquared),
			new ss.ForceUpdater(0, 200),
			//new ss.RandomRotationUpdater(-10, 10)
			], gameContainer);
		gameContainer.addChild(emitter);
		emitter.x = 500;
		emitter.y = 200;
		emitter.startEmit();
	}

	function _handleUpdate(){
		requestAnimFrame(_handleUpdate);
		renderer.render(stage);
	}

	function _handleMouseDown(data){
		console.log("Mouse Down: data = " + data);
		if(emitter.isPaused()){
			emitter.resume();
		}else{
			emitter.pause();
		}
	}

});