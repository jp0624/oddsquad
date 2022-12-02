(function (calendarlib, img, cjs, ss) {

var p; // shortcut to reference prototypes
calendarlib.webFontTxtFilters = {}; 

// calendarlibrary properties:
calendarlib.properties = {
	width: 144,
	height: 293,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/calendar/calander_100.png", id:"calander_100"},
		{src:"images/calendar/curl2.png", id:"curl2"},
		{src:"images/calendar/curl3.png", id:"curl3"},
		{src:"images/calendar/curl4.png", id:"curl4"},
		{src:"images/calendar/curl_1.png", id:"curl_1"},
		{src:"images/calendar/shadow_calander.png", id:"shadow_calander"}
	]
};



calendarlib.ssMetadata = [];


calendarlib.webfontAvailable = function(family) { 
	calendarlib.properties.webfonts[family] = true;
	var txtFilters = calendarlib.webFontTxtFilters && calendarlib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(calendarlib.calander_100 = function() {
	this.initialize(img.calander_100);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,144,293);


(calendarlib.curl2 = function() {
	this.initialize(img.curl2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,38,22);


(calendarlib.curl3 = function() {
	this.initialize(img.curl3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,46,31);


(calendarlib.curl4 = function() {
	this.initialize(img.curl4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,46,31);


(calendarlib.curl_1 = function() {
	this.initialize(img.curl_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,21,18);


(calendarlib.shadow_calander = function() {
	this.initialize(img.shadow_calander);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,117,218);


(calendarlib.pagecurl_100 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new calendarlib.curl_1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,21,18);


(calendarlib.page_curl_400 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new calendarlib.curl4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46,31);


(calendarlib.page_curl_300 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new calendarlib.curl3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46,31);


(calendarlib.page_curl_200 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new calendarlib.curl2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38,22);


(calendarlib.page_curl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.instance = new calendarlib.pagecurl_100("synched",0);
	this.instance.setTransform(10.6,22.3,1,1,0,0,0,10.7,8.9);

	this.instance_1 = new calendarlib.page_curl_200("synched",0);
	this.instance_1.setTransform(19.1,20.3,1,1,0,0,0,19.1,11);

	this.instance_2 = new calendarlib.page_curl_300("synched",0);
	this.instance_2.setTransform(23.2,15.7,1,1,0,0,0,23.2,15.7);

	this.instance_3 = new calendarlib.page_curl_400("synched",0);
	this.instance_3.setTransform(23.2,15.7,1,1,0,0,0,23.2,15.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[]},13).wait(18));

	// Layer 7
	this.instance_4 = new calendarlib.page_curl_400("synched",0);
	this.instance_4.setTransform(23.2,15.7,1,1,0,0,0,23.2,15.7);

	this.instance_5 = new calendarlib.page_curl_200("synched",0);
	this.instance_5.setTransform(19.1,20.3,1,1,0,0,0,19.1,11);

	this.instance_6 = new calendarlib.pagecurl_100("synched",0);
	this.instance_6.setTransform(10.6,22.3,1,1,0,0,0,10.7,8.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},17).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[]},1).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


// stage content:
(calendarlib.calendar_page_curl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new calendarlib.page_curl("synched",0);
	this.instance.setTransform(26.5,262.8,1,1,0,0,0,23,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35));

	// shadow_calander
	this.instance_1 = new calendarlib.shadow_calander();
	this.instance_1.setTransform(23,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(35));

	// Bitmap 2
	this.instance_2 = new calendarlib.calander_100();
	this.instance_2.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(73,146.5,144,293);

})(calendarlib = calendarlib||{}, calendarimages = calendarimages||{}, createjs = createjs||{}, ss = ss||{});
var calendarlib, calendarimages, createjs, ss;