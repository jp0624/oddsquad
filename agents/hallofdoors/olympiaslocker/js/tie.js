(function (tielib, img, cjs, ss) {

var p; // shortcut to reference prototypes
tielib.webFontTxtFilters = {}; 

// tielibrary properties:
tielib.properties = {
	width: 113,
	height: 397,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/tie/boarder_tie.png", id:"boarder_tie"},
		{src:"images/tie/tie_100.png", id:"tie_100"},
		{src:"images/tie/tie_200.png", id:"tie_200"},
		{src:"images/tie/tie_300.png", id:"tie_300"},
		{src:"images/tie/tie_500.png", id:"tie_500"},
		{src:"images/tie/tie_end_2.png", id:"tie_end_2"},
		{src:"images/tie/tie_end_3.png", id:"tie_end_3"},
		{src:"images/tie/tie_shadow_1c.png", id:"tie_shadow_1c"},
		{src:"images/tie/tie_shadow_2c.png", id:"tie_shadow_2c"},
		{src:"images/tie/tie_shadow_3b.png", id:"tie_shadow_3b"}
	]
};



tielib.ssMetadata = [];


tielib.webfontAvailable = function(family) { 
	tielib.properties.webfonts[family] = true;
	var txtFilters = tielib.webFontTxtFilters && tielib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(tielib.boarder_tie = function() {
	this.initialize(img.boarder_tie);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,398);


(tielib.tie_100 = function() {
	this.initialize(img.tie_100);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,52,316);


(tielib.tie_200 = function() {
	this.initialize(img.tie_200);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,52,294);


(tielib.tie_300 = function() {
	this.initialize(img.tie_300);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,47,275);


(tielib.tie_500 = function() {
	this.initialize(img.tie_500);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,276);


(tielib.tie_end_2 = function() {
	this.initialize(img.tie_end_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,15);


(tielib.tie_end_3 = function() {
	this.initialize(img.tie_end_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,47,28);


(tielib.tie_shadow_1c = function() {
	this.initialize(img.tie_shadow_1c);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,380);


(tielib.tie_shadow_2c = function() {
	this.initialize(img.tie_shadow_2c);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,77,307);


(tielib.tie_shadow_3b = function() {
	this.initialize(img.tie_shadow_3b);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,73,291);


(tielib.tiepart1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new tielib.tie_300();

	this.instance_1 = new tielib.tie_500();
	this.instance_1.setTransform(7,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[]},1).to({state:[{t:this.instance_1}]},1).wait(1));

	// Layer 2
	this.instance_2 = new tielib.tie_shadow_3b();
	this.instance_2.setTransform(-16,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16,0,73,298);


(tielib.tiebottom1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.instance = new tielib.tie_end_2();
	this.instance.setTransform(0,2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1,8,55,13);


(tielib.tie_bottom2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.instance = new tielib.tie_end_3();
	this.instance.setTransform(3,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3,-1,47,28);


(tielib.Tie_2b = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new tielib.tie_200();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 2
	this.instance_1 = new tielib.tie_shadow_2c();
	this.instance_1.setTransform(-16,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16,0,77,314);


(tielib.tie = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new tielib.tie_100();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 2
	this.instance_1 = new tielib.tie_shadow_1c();
	this.instance_1.setTransform(-20,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,0,80,387);


(tielib.boarder_tie_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new tielib.boarder_tie();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,113,398);


(tielib.tie_rack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new tielib.tiebottom1("single",1);
	this.instance.setTransform(37.4,295.1,0.743,0.463,0,0.2,0.4,25.4,8.8);
	this.instance._off = true;

	this.instance_1 = new tielib.tie_bottom2("synched",0);
	this.instance_1.setTransform(33.5,192.9,1.409,1.147,0,0.7,0,25.3,8.4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({regY:8.6,scaleX:1.07,scaleY:1.14,skewX:0,skewY:2.2,x:36.4,y:269.8},1).to({regX:25.3,scaleY:1.09,skewX:0.3,skewY:2.4,x:37.6,y:259.1},2).to({_off:true,regY:8.4,scaleX:1.41,scaleY:1.15,skewX:0.7,skewY:0,x:33.5,y:192.9,mode:"synched",startPosition:0},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},1).to({regX:25.1,regY:8.6,scaleX:1.32,scaleY:1.38,skewX:0,x:29.3,y:48.8},11,cjs.Ease.get(1)).to({regX:25.3,regY:8.4,scaleX:1.41,scaleY:1.15,skewX:0.7,x:33.5,y:192.9},4).to({_off:true},1).wait(34));

	// Layer 5
	this.instance_2 = new tielib.tie("synched",0);
	this.instance_2.setTransform(36.7,10.7,1,1,0,0,0,26.9,4.8);

	this.instance_3 = new tielib.Tie_2b();
	this.instance_3.setTransform(36,153,1,1,0,0,0,26,147);

	this.instance_4 = new tielib.tiepart1("single",0);
	this.instance_4.setTransform(36.4,4.1,1.061,0.996,0,0,0,25.5,-1.8);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},11).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},2).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},1).wait(20).to({_off:false,regX:27.1,regY:5,scaleX:0.81,scaleY:1.03,x:36.9,y:10.9},0).to({regY:5.1,scaleX:0.99,scaleY:1,x:36.8,y:10.7},7,cjs.Ease.get(1)).to({regX:26.9,regY:4.8,scaleX:1,scaleY:1,x:36.2,y:11.2},2).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2).to({_off:false},0).to({scaleY:0.95,y:4.4},2).to({regX:25.8,scaleX:1.13,scaleY:0.73,skewX:0.1,x:37.9,y:4.3,startPosition:2},1).to({regX:25.9,regY:-1.5,scaleX:1.05,scaleY:0.21,skewX:2.4,y:4.5},11,cjs.Ease.get(1)).to({regX:25.8,regY:-1.8,scaleX:1.13,scaleY:0.73,skewX:0.1,y:4.3},4).to({_off:true},1).wait(34));

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#313131").s().p("AigAJQgDAAgCgCQgDgCgDgFIgDgJIFPAAIADAJQAFAJAGAAg");
	this.shape.setTransform(36,16);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F4F4F").s().p("AimALQgCgGABgFIAAgKIFOAAIAAAKQAAAFABAGg");
	this.shape_1.setTransform(35.3,13.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#434343").s().p("AAAAgQgFAAgFgKIgDgKQgBgFAAgHIAAgIQABgHADgHQAFgKAFAAQAGAAAEAKQADAHACAHIAAAIIgBAMIgEAKQgDAHgDACIgEABg");
	this.shape_2.setTransform(53.6,13.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#696969").s().p("AiuALQABgHADgEQADgIAFgBIFRgCIAAABQgGAAgFAKQgDAEgBAHg");
	this.shape_3.setTransform(36,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(55));

	// Layer 6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#910000").s().p("AhrQbMAA+ggoQAAgUAUgMQAWgOAbAAQAdAAAUAOQAWAMAAAUMAAMAgoIhrAhg");
	this.shape_4.setTransform(37.5,114.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(55));

	// Layer 3
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4F4F4F").s().p("AgCB+IgCj9IAJAFIAAD6g");
	this.shape_5.setTransform(11.6,11.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3A3A3A").s();
	this.shape_6.setTransform(23.7,21.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#232323").s().p("AgjgBIgBAAIhZgRIBQAAIAJABIBvAVIAzAKIAAAEIgwABg");
	this.shape_7.setTransform(15.8,25.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#696969").s().p("AgkB/IgFgCIAAj6IBOgBIAAABIADgBIABD9g");
	this.shape_8.setTransform(7,11);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#434343").s().p("AhQByIAAj6IChBJIAABgIhdAAIArBog");
	this.shape_9.setTransform(20.3,12.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(55));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.2,-1.7,80,394.7);


(tielib.shelf2_tie1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new tielib.boarder_tie_1("synched",0);
	this.instance.setTransform(56.5,238,1,1,0,0,0,56.5,199);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55));

	// tie_rack
	this.instance_1 = new tielib.tie_rack("synched",0);
	this.instance_1.setTransform(49.3,238,0.96,0.96,0,0,0,31.9,190);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(55));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,39,216,398);


// stage content:
(tielib.Tie = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new tielib.shelf2_tie1("synched",0);
	this.instance.setTransform(195.6,201.4,1,1,0,0,0,196.3,241.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.8,197.6,113,398);

})(tielib = tielib||{}, tieimages = tieimages||{}, createjs = createjs||{}, ss = ss||{});
var tielib, tieimages, createjs, ss;