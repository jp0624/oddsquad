(function (bearlib, img, cjs, ss) {

var p; // shortcut to reference prototypes
bearlib.webFontTxtFilters = {}; 

// bearlibrary properties:
bearlib.properties = {
	width: 232,
	height: 261,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/bear/badge_100.png", id:"badge_100"},
		{src:"images/bear/badge_100b.png", id:"badge_100b"},
		{src:"images/bear/badge_100c.png", id:"badge_100c"},
		{src:"images/bear/badge_100d.png", id:"badge_100d"},
		{src:"images/bear/badge_100f.png", id:"badge_100f"},
		{src:"images/bear/badge_100g.png", id:"badge_100g"},
		{src:"images/bear/badge_100h.png", id:"badge_100h"},
		{src:"images/bear/badge_100i.png", id:"badge_100i"},
		{src:"images/bear/badge_100j.png", id:"badge_100j"},
		{src:"images/bear/bear_1.png", id:"bear_1"},
		{src:"images/bear/boarder_box_bear.png", id:"boarder_box"},
		{src:"images/bear/books_200.png", id:"books_200"},
		{src:"images/bear/shelf3_shadow.png", id:"shelf3_shadow"}
	]
};



bearlib.ssMetadata = [];


bearlib.webfontAvailable = function(family) { 
	bearlib.properties.webfonts[family] = true;
	var txtFilters = bearlib.webFontTxtFilters && bearlib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(bearlib.badge_100 = function() {
	this.initialize(img.badge_100);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,439,440);


(bearlib.badge_100b = function() {
	this.initialize(img.badge_100b);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,203,440);


(bearlib.badge_100c = function() {
	this.initialize(img.badge_100c);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,187,371);


(bearlib.badge_100d = function() {
	this.initialize(img.badge_100d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,203,371);


(bearlib.badge_100f = function() {
	this.initialize(img.badge_100f);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,370,369);


(bearlib.badge_100g = function() {
	this.initialize(img.badge_100g);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,284,371);


(bearlib.badge_100h = function() {
	this.initialize(img.badge_100h);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,205,373);


(bearlib.badge_100i = function() {
	this.initialize(img.badge_100i);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,206,433);


(bearlib.badge_100j = function() {
	this.initialize(img.badge_100j);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,439,440);


(bearlib.bear_1 = function() {
	this.initialize(img.bear_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,124,163);


(bearlib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,369);


(bearlib.boarder_box = function() {
	this.initialize(img.boarder_box);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,261);


(bearlib.books_200 = function() {
	this.initialize(img.books_200);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,114);


(bearlib.shelf3_shadow = function() {
	this.initialize(img.shelf3_shadow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,228,194);


(bearlib.panda = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.instance = new bearlib.bear_1();
	this.instance.setTransform(-11,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,0,124,163);


(bearlib.boarder = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bearlib.boarder_box();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,232,261);


(bearlib.badge_spin = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.instance = new bearlib.badge_100();
	this.instance.setTransform(-56,-48);

	this.instance_1 = new bearlib.badge_100b();
	this.instance_1.setTransform(48,-48);

	this.instance_2 = new bearlib.badge_100c();
	this.instance_2.setTransform(65,-2);

	this.instance_3 = new bearlib.badge_100d();
	this.instance_3.setTransform(78,-2);

	this.instance_4 = new bearlib.Bitmap2();
	this.instance_4.setTransform(-2,-2);

	this.instance_5 = new bearlib.badge_100f();
	this.instance_5.setTransform(-26,-2);

	this.instance_6 = new bearlib.badge_100g();
	this.instance_6.setTransform(37,-2);

	this.instance_7 = new bearlib.badge_100h();
	this.instance_7.setTransform(47,-4);

	this.instance_8 = new bearlib.badge_100i();
	this.instance_8.setTransform(76,-46);

	this.instance_9 = new bearlib.badge_100j();
	this.instance_9.setTransform(-56,-48);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56,-48,439,440);


(bearlib.bear_bounce = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bearlib.panda("synched",0);
	this.instance.setTransform(61,157.3,1,1,0,0,0,50.5,157.3);
	this.instance.filters = [new cjs.ColorFilter(0.9, 0.9, 0.9, 1, 0, 0, 0, 0)];
	this.instance.cache(-13,-2,128,167);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:157.5,scaleX:1.12,scaleY:0.94,y:157.5},6).to({regY:157.3,scaleX:0.9,scaleY:1.04,x:61.1,y:157.4},6).to({regY:157.5,scaleX:0.98,scaleY:1.02,x:61},4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,124,163);


(bearlib.shelf3_panda = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// badge_spin
	this.instance = new bearlib.badge_spin("synched",1);
	this.instance.setTransform(164.3,171.2,0.2,0.2,-5.5,0,0,154.6,382);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18));

	// Layer 3
	this.instance_1 = new bearlib.boarder("synched",0);
	this.instance_1.setTransform(113,128.5,1,1,0,0,0,116,130.5);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(18));

	// panda
	this.instance_2 = new bearlib.bear_bounce("synched",0);
	this.instance_2.setTransform(109.2,91.7,1,1,0,0,0,60.9,79);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(18));

	// Layer 4
	this.instance_3 = new bearlib.books_200();
	this.instance_3.setTransform(10,141);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18));

	// Layer 5
	this.instance_4 = new bearlib.shelf3_shadow();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(18));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-2,232,261);


// stage content:
(bearlib.bear = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bearlib.shelf3_panda("synched",0);
	this.instance.setTransform(114,127.3,1,1,0,0,0,114,127.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(17));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(113,128.5,232,261);

})(bearlib = bearlib||{}, bearimages = bearimages||{}, createjs = createjs||{}, ss = ss||{});
var bearlib, bearimages, createjs, ss;