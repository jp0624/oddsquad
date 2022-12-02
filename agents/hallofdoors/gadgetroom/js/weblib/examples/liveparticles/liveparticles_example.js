require.config( {
	"baseUrl": "../../../", "debug":true
});

require.include('weblib/external/createjs.min.js');
require.include('weblib/editors/Serialization.js');
require.include('weblib/math/geom/Vector2');
require.include('weblib/math/interpolation/Interpolation');

require.include('weblib/liveparticles/createjs/CreateJSParticlePackage');
require.include('weblib/editors/BaseEditor');

var stage;
var loadQueue;
var particleImage;
var graphics;
var background;
var emitter;
var emitterVelX = 20;
var shape;

var _targetObj;

$(document).ready ( function () {



	stage = new createjs.Stage("testCanvas");
	
	//Draw a black background on the stage
	graphics = new createjs.Graphics();
	graphics.beginFill("#000000");
	graphics.lineTo(1024, 0);
	graphics.lineTo(1024, 768);
	graphics.lineTo(0, 768);
	graphics.lineTo(0, 0);
	//graphics.drawRect(0, 0, 1024, 768);
	graphics.endFill();
	background = new createjs.Shape(graphics);
	stage.addChild(background);

	console.log("Background added");

	stage.addEventListener("click", _handleStageClick);


	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);

	//Start preloading required assets
	_preloadAssets();

	function _handleStageClick(){
		//emitter.pause();

		//Restart particle emissions
		emitter.x = stage.mouseX;
		emitter.y = stage.mouseY;
		emitter.startEmit();
	}

	//Start preloading required assets
	function _preloadAssets(){
		loadQueue = new createjs.LoadQueue(true);
		loadQueue.addEventListener('fileload', _handleFileLoad);
		loadQueue.loadFile("testparticle.png");
	}

	//Handle completion of preloading
	function _handleFileLoad(loadEvent){
		var item = loadEvent.item;
		
		//Set the image to use for particles
		if(item.type == createjs.LoadQueue.IMAGE){
			particleImage = loadEvent.result;
		}

		//Create a test particle emitter
		_createTestEmitter();

	}

	function tick() {
		stage.update();

		if(emitter){
			_targetObj.x = stage.mouseX;
			_targetObj.y = stage.mouseY;

			emitter.x = stage.mouseX;
			emitter.y = stage.mouseY;

			//emitter.x = emitter.x + emitterVelX;
			if(emitter.x > 1024 || emitter.x < 0){
				emitterVelX = -emitterVelX;
			}
		}
	}

	var _theSeeker;

	/*
	* Create an emitter to use for testing
	*/
	function _createTestEmitter(){
		
		var factory = new ss.BitmapParticleFactory(particleImage);
		shape = new ss.RadialSpawnShape(new Vector2(0, 0),0, 0, 1, 0, 360);

		var serializedShape = SerializationHelpers.serialize(shape);
		serializedShape = SerializationHelpers.deserialize(serializedShape);

		//var shape = new LineSpawnShape(-100, 0, 100, 0, 0, 50);
		var timer = new ss.UniformSpawnTimer(30);
		//var timer = new BurstSpawnTimer(800, 100);

		emitter = new ss.CreateJSParticleEmitter();
		//emitter.setupFromObjects(6000, 1, 1, factory, timer, shape, [new InterpolatePropertyUpdater("alpha", 0.6, 0, Interpolation.inverseSquared), new ForceUpdater(800, 500)], stage);
		/*
		emitter.setupFromObjects(6000, 1, 1, factory, timer, shape,[new PropertyRateChangeUpdater("rotation", 360), 
			new InterpolatePropertyUpdater("scaleX", 1, 0, Interpolation.inverseSquared),
			new InterpolatePropertyUpdater("scaleY", 1, 0, Interpolation.inverseSquared),
			new InterpolatePropertyUpdater("alpha", 0.6, 0, Interpolation.inverseSquared),
			new ForceUpdater(0, 1000)], stage);
		*/
		

		//TEST TARGET
		_targetObj = new createjs.Container();
		stage.addChild(_targetObj);

		_theSeeker = new ss.ObjectSeekUpdater(_targetObj, 300);

		var _interpAlpha = new ss.InterpolatePropertyUpdater("alpha", 1, 0.075, Interpolation.squared);
		var _interpScaleX = new ss.InterpolatePropertyUpdater("scaleX", 2, 0.01, Interpolation.inverseSquared);
		var _interpScaleY = new ss.InterpolatePropertyUpdater("scaleY", 2, 0.01, Interpolation.inverseSquared);
		var _interpColour = new ss.InterpolateColourUpdater(1, 1, 1, 1, 0.25, 1, 1, 1, Interpolation.squared);
		var _dragUpdater = new ss.DragUpdater(0.005);
		emitter.setupFromObjects(10000, 5, 8, factory, timer, shape, 
			[_interpAlpha,
			_interpScaleX,
			_interpScaleY,
			//new PropertyRateChangeUpdater("rotation", 360),
			_dragUpdater,
			//new ForceUpdater(0, 500),
			_theSeeker,
			//_interpColour
			], stage);

		stage.addChild(emitter);
		emitter.x = 400;
		emitter.y = 300;
		emitter.startEmit();

		EditorHelpers.createEditor($('#editorDiv'), shape);
		EditorHelpers.createEditor($('#editorDiv'), timer);
		EditorHelpers.createEditor($('#editorDiv'), _theSeeker);
		EditorHelpers.createEditor($('#editorDiv'), _interpAlpha);
		EditorHelpers.createEditor($('#editorDiv'), _interpScaleX);
		EditorHelpers.createEditor($('#editorDiv'), _interpScaleY);
		EditorHelpers.createEditor($('#editorDiv'), _dragUpdater);
		//EditorHelpers.createEditor($('#editorDiv'), _interpColour);
		//
		
	}

});