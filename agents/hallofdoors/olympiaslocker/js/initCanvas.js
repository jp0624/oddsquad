window.ss = window.ss || {};

	function initCanvas(){
		tieinit();
		discoinit();
		bottomshelfinit();
		blobinit();
		glassesinit();
		bearinit();
		calendarinit();
	}

	var bottomshelfcanvas, bottomshelfstage, bottomshelfexportRoot;	

	function bottomshelfinit() {
		bottomshelfcanvas = document.getElementById("bottomshelfCanvas");
		bottomshelfimages = bottomshelfimages||{};
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", bottomshelfhandleFileLoad);
		loader.addEventListener("complete", bottomshelfhandleComplete);
		loader.loadManifest(bottomshelflib.properties.manifest);
	}
	function bottomshelfhandleFileLoad(evt) {	
		if (evt.item.type === "image") { bottomshelfimages[evt.item.id] = evt.result; }	
	}
	function bottomshelfhandleComplete(evt) {
		var queue = evt.target;
		var ssMetadata = bottomshelflib.ssMetadata;
		for(i=0; i<ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
		}
		bottomshelfexportRoot = new bottomshelflib.bottomshelf();
		bottomshelfstage = new createjs.Stage(bottomshelfcanvas);
		bottomshelfstage.addChild(bottomshelfexportRoot);
		bottomshelfexportRoot.gotoAndStop(0);
		createjs.Ticker.setFPS(bottomshelflib.properties.fps);
		createjs.Ticker.addEventListener("tick", bottomshelfstage);		    
	
	}


	var discocanvas, discostage, discoexportRoot;
	function discoinit() {
		discocanvas = document.getElementById("discoCanvas");
		discoimages = discoimages||{};
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", discohandleFileLoad);
		loader.addEventListener("complete", discohandleComplete);
		loader.loadManifest(discolib.properties.manifest);
	}
	function discohandleFileLoad(evt) {	
		if (evt.item.type == "image") { discoimages[evt.item.id] = evt.result; }	
	}
	function discohandleComplete(evt) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var queue = evt.target;
		var ssMetadata = discolib.ssMetadata;
		for(i=0; i<ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
		}
		discoexportRoot = new discolib.disco_ball_200();
		discostage = new createjs.Stage(discocanvas);
		discostage.addChild(discoexportRoot);	
		discoexportRoot.gotoAndStop(0);
		//Registers the "tick" event listener.
		createjs.Ticker.setFPS(discolib.properties.fps);
		createjs.Ticker.addEventListener("tick", discostage);
   
	}



var glassescanvas, glassesstage, glassesexportRoot;
function glassesinit() {
	glassescanvas = document.getElementById("glassesCanvas");
	glassesimages = glassesimages||{};
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", glasseshandleFileLoad);
	loader.addEventListener("complete", glasseshandleComplete);
	loader.loadManifest(glasseslib.properties.manifest);
}
function glasseshandleFileLoad(evt) {	
	if (evt.item.type == "image") { glassesimages[evt.item.id] = evt.result; }	
}
function glasseshandleComplete(evt) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = evt.target;
	var ssMetadata = glasseslib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	glassesexportRoot = new glasseslib.glasses();
	glassesstage = new createjs.Stage(glassescanvas);
	glassesstage.addChild(glassesexportRoot);	
	glassesexportRoot.gotoAndStop(0);
	//Registers the "tick" event listener.
	createjs.Ticker.setFPS(glasseslib.properties.fps);
	createjs.Ticker.addEventListener("tick", glassesstage);
}






var bearcanvas, bearstage, bearexportRoot;
function bearinit() {
	bearcanvas = document.getElementById("bearCanvas");
	bearimages = bearimages||{};
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", bearhandleFileLoad);
	loader.addEventListener("complete", bearhandleComplete);
	loader.loadManifest(bearlib.properties.manifest);
}
function bearhandleFileLoad(evt) {	
	if (evt.item.type == "image") { bearimages[evt.item.id] = evt.result; }	
}
function bearhandleComplete(evt) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = evt.target;
	var ssMetadata = bearlib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	bearexportRoot = new bearlib.bear();
	bearstage = new createjs.Stage(bearcanvas);
	bearstage.addChild(bearexportRoot);	
	bearexportRoot.gotoAndStop(0);
	//Registers the "tick" event listener.
	createjs.Ticker.setFPS(bearlib.properties.fps);
	createjs.Ticker.addEventListener("tick", bearstage);
}




var blobcanvas, blobstage, blobexportRoot;
function blobinit() {
	blobcanvas = document.getElementById("blobCanvas");
	blobimages = blobimages||{};
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", blobhandleFileLoad);
	loader.addEventListener("complete", blobhandleComplete);
	loader.loadManifest(bloblib.properties.manifest);
}
function blobhandleFileLoad(evt) {	
	if (evt.item.type == "image") { blobimages[evt.item.id] = evt.result; }	
}
function blobhandleComplete(evt) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = evt.target;
	var ssMetadata = bloblib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	blobexportRoot = new bloblib.Blob();

	blobstage = new createjs.Stage(blobcanvas);
	blobstage.addChild(blobexportRoot);	
	blobexportRoot.gotoAndStop(0);
	//Registers the "tick" event listener.
	createjs.Ticker.setFPS(bloblib.properties.fps);
	createjs.Ticker.addEventListener("tick", blobstage);

	blobstage.scaleX = 1;
	blobstage.scaleY = 1;

	blobstage.x = -100;
	blobstage.y = -225;

	blobexportRoot.y = 27;
	blobexportRoot.x = 60;
}


var tiecanvas, tiestage, tieexportRoot;
function tieinit() {
	tiecanvas = document.getElementById("tieCanvas");
	tieimages = tieimages||{};
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", tiehandleFileLoad);
	loader.addEventListener("complete", tiehandleComplete);
	loader.loadManifest(tielib.properties.manifest);
}
function tiehandleFileLoad(evt) {	
	if (evt.item.type == "image") { tieimages[evt.item.id] = evt.result; }	
}
function tiehandleComplete(evt) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = evt.target;
	var ssMetadata = tielib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	tieexportRoot = new tielib.Tie();
	tiestage = new createjs.Stage(tiecanvas);
	tiestage.addChild(tieexportRoot);	
	tieexportRoot.gotoAndStop(0);
	//Registers the "tick" event listener.
	createjs.Ticker.setFPS(tielib.properties.fps);
	createjs.Ticker.addEventListener("tick", tiestage);

	tiestage.scaleX = 1.75;			
	tiestage.scaleY = 0.85;	
}

var calendarcanvas, calendarstage, calendarexportRoot;
function calendarinit() {
	calendarcanvas = document.getElementById("calendarCanvas");
	calendarimages = calendarimages||{};
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", calendarhandleFileLoad);
	loader.addEventListener("complete", calendarhandleComplete);
	loader.loadManifest(calendarlib.properties.manifest);
}
function calendarhandleFileLoad(evt) {	
	if (evt.item.type == "image") { calendarimages[evt.item.id] = evt.result; }	
}
function calendarhandleComplete(evt) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = evt.target;
	var ssMetadata = calendarlib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	calendarexportRoot = new calendarlib.calendar_page_curl();
	calendarstage = new createjs.Stage(calendarcanvas);
	calendarstage.addChild(calendarexportRoot);	
	//Registers the "tick" event listener.
	createjs.Ticker.setFPS(calendarlib.properties.fps);
	createjs.Ticker.addEventListener("tick", calendarstage);
}