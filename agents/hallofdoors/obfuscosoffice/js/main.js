require.config( {
	"baseUrl": "js",
	"debug": false
});

require.include("weblib/external/createjs.min.js");
require.include("weblib/external/movieclip.min.js");
require.include("weblib/sound/SoundPackage.js");
require.include("../audio/obfuscoAudio.js");
require.include("office.js");
var canvas, stage, exportRoot;
var soundManager;
var buttonDown, buttonUp;

var audioChoices = [
	{
		"frame": "Obfusco10_OscarKite.wav",
		"audioClip": "Obfusco10_OscarKite"
	},
	{
		"frame": "Obfusco11_HamSandwiches.wav",
		"audioClip": "Obfusco11_HamSandwiches"
	},
	{
		"frame": "Obfusco12_ObfuscoSombrero.wav",
		"audioClip": "Obfusco12_ObfuscoSombrero"
	},
	{
		"frame": "Obfusco13_RhinocerousPiano.wav",
		"audioClip": "Obfusco13_RhinocerousPiano"
	},
	{
		"frame": "Obfusco1_TwoButterfleis.wav",
		"audioClip": "Obfusco1_TwoButterfleis"
	},
	{
		"frame": "Obfusco2_SmoothKetchup.wav",
		"audioClip": "Obfusco2_SmoothKetchup"
	},
	{
		"frame": "Obfusco3_TruerWords.wav",
		"audioClip": "Obfusco3_TruerWords"
	},
	{
		"frame": "Obfusco4_BeautifulToothbrushes.wav",
		"audioClip": "Obfusco4_BeautifulToothbrushes"
	},
	{
		"frame": "Obfusco5_FrecklesPillow.wav",
		"audioClip": "Obfusco5_FrecklesPillow"
	},
	{
		"frame": "Obfusco6_CandleMoon.wav",
		"audioClip": "Obfusco6_CandleMoon"
	},
	{
		"frame": "Obfusco7_FlamingoFriends.wav",
		"audioClip": "Obfusco7_FlamingoFriends"
	},
	{
		"frame": "Obfusco8_ApplePicking.wav",
		"audioClip": "Obfusco8_ApplePicking"
	},
	{
		"frame": "Obfusco9_BeautifulBanana.wav",
		"audioClip": "Obfusco9_BeautifulBanana"
	}
]
var images = images||{};
var img = images;
function init() {
	canvas = document.getElementById("canvas");
	

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
	exportRoot = new lib.office();

	stage = new createjs.Stage(canvas);
	stage.update();
	createjs.Touch.enable(stage);

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	createjs.Ticker.addEventListener("tick", stage);

 	soundManager = ss.SoundManager;
 	soundManager.addEventListener(ss.SoundManager.LOADED, startUp);

	soundManager.loadSoundSprite(audioSprite);

	
}


function buttonUp(evt) {
	buttonUp.visible = true;
	buttonDown.visible = false;
}

function startUp() {

	$('#loading').hide();
	$("#canvas").css("visibility", "visible");
	stage.addChild(exportRoot);
	exportRoot.gotoAndPlay("Obfusco's mysterious arrival Sting.mp3");
	//ss.SoundManager.playSound("Obfusco1_TwoButterfleis");

	buttonDown = new createjs.Bitmap("images/Button_Down.png");
	buttonUp = new createjs.Bitmap("images/Button_Up.png");

	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 128, 93);
	buttonUp.hitArea = hit;

	var hit2 = new createjs.Shape();
	hit2.graphics.beginFill("#000").drawRect(0, 0, 128, 83);
	buttonDown.hitArea = hit2;

	buttonDown.x = 950;
	buttonDown.y = 750;

	buttonUp.x = 950;
	buttonUp.y = 740;

	buttonDown.visible = false;

	stage.addChild(buttonUp);
	stage.addChild(buttonDown);

	buttonUp.addEventListener("click", playRandom);
	buttonDown.addEventListener("click", playRandom);

	buttonUp.addEventListener("mousedown", function() {	buttonUp.visible = false;
	buttonDown.visible = true;});

	buttonUp.addEventListener("pressup", function() {	buttonUp.visible = true;
	buttonDown.visible = false;
	playRandom();});
}



function playRandom() {

	if(exportRoot.paused){

		var choice = Math.floor(Math.random() * audioChoices.length);

		exportRoot.gotoAndPlay(audioChoices[choice].frame);
		ss.SoundManager.stopAllSounds();
		ss.SoundManager.playSound(audioChoices[choice].audioClip);
	}

}

$('document').ready(function() {init();});
