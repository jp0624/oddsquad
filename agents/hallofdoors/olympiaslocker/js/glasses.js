(function (glasseslib, img, cjs, ss) {

var p; // shortcut to reference prototypes
glasseslib.webFontTxtFilters = {}; 

// glasseslibrary properties:
glasseslib.properties = {
	width: 230,
	height: 242,
	fps: 24,
	color: "#000000",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/glasses/boarder.png", id:"boarder"},
		{src:"images/glasses/glasses_case.png", id:"glasses_case"},
		{src:"images/glasses/redglasses.png", id:"redglasses"},
		{src:"images/glasses/shine_bmp.png", id:"shine_bmp"},
		{src:"images/glasses/star_shine.png", id:"star_shine"}
	]
};



glasseslib.ssMetadata = [];


glasseslib.webfontAvailable = function(family) { 
	glasseslib.properties.webfonts[family] = true;
	var txtFilters = glasseslib.webFontTxtFilters && glasseslib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(glasseslib.boarder = function() {
	this.initialize(img.boarder);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,244);


(glasseslib.glasses_case = function() {
	this.initialize(img.glasses_case);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,178,39);


(glasseslib.redglasses = function() {
	this.initialize(img.redglasses);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,307,75);


(glasseslib.shine_bmp = function() {
	this.initialize(img.shine_bmp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,416,122);


(glasseslib.star_shine = function() {
	this.initialize(img.star_shine);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,128);


(glasseslib.sparkling_fx1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.star_shine();
	this.instance.setTransform(0,-11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-11,121,128);


(glasseslib.shine1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.shine_bmp();
	this.instance.setTransform(-214,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214,0,416,122);


(glasseslib.outline = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.boarder();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,232,244);


(glasseslib.glasses_red = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.redglasses();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,307,75);


(glasseslib.glasses_casecopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new glasseslib.glasses_case();
	this.instance.setTransform(-3,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,1,178,39);


(glasseslib.sparkling_fx_anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.sparkling_fx1("synched",0);
	this.instance.setTransform(61.6,63.4,1,1,0,0,0,61.6,52.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.4,121,128);


(glasseslib.sparkling_fx_anim2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.sparkling_fx_anim1("synched",0,false);
	this.instance.setTransform(9.8,10.4,0.094,0.094,0,0,0,60.4,64.2);
	this.instance.alpha = 0.191;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:60.6,regY:64.1,scaleX:0.47,scaleY:0.47,alpha:0.73,startPosition:8},8,cjs.Ease.get(0.68)).to({regX:60.3,regY:64,scaleX:0.41,scaleY:0.41,alpha:1,startPosition:14},8).to({regX:60.6,regY:64.5,scaleX:0.05,scaleY:0.05,alpha:0.191},11,cjs.Ease.get(1)).to({_off:true},1).wait(13));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.1,4.3,11.4,12.1);


(glasseslib.sparkling_fx_all4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 8
	this.instance = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance.setTransform(-19.2,2.7,0.19,0.19,-24.5,0,0,-0.4,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).wait(15).to({regX:0,regY:0,scaleX:0.14,scaleY:0.14,rotation:-5.3,x:-48.2,y:8.3},0).wait(61));

	// Layer 6
	this.instance_1 = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance_1.setTransform(-80.4,10.2,0.22,0.22,47.4,0,0,0.1,0.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).wait(18).to({regX:0,regY:0,scaleX:0.04,scaleY:0.04,x:-5.6,y:4.2},0).wait(53));

	// Layer 2
	this.instance_2 = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance_2.setTransform(-35.6,12.9,0.23,0.23,0,0,180,1.1,0.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5).to({_off:false},0).wait(13).to({regX:0,regY:0,scaleX:0.18,scaleY:0.18,x:-36.8,y:0.3},0).wait(60));

	// Layer 3
	this.instance_3 = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance_3.setTransform(-47.1,-1.9,0.24,0.24,30.6,0,0,-0.6,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(33).to({regX:0,regY:0,scaleX:0.29,scaleY:0.29,x:-17.5,y:0.5},0).wait(45));

	// Layer 4
	this.instance_4 = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance_4.setTransform(-78,-3.6,0.17,0.17,21.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({_off:false},0).wait(22).to({scaleX:0.16,scaleY:0.16,rotation:-62.4,x:-21.7,y:1.8},0).wait(52));

	// Layer 5
	this.instance_5 = new glasseslib.sparkling_fx_anim2("synched",0,false);
	this.instance_5.setTransform(-15.7,11.2,0.12,0.12,-37.1,0,0,-0.3,0.4);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(8).to({_off:false},0).wait(22).to({regX:0,regY:0,scaleX:0.09,scaleY:0.09,x:-15.9,y:-1.8},0).wait(48));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48,-0.4,3.8,3.9);


(glasseslib.glasses2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 9
	this.instance = new glasseslib.sparkling_fx_all4("synched",0,false);
	this.instance.setTransform(275.1,7.7,3.24,3.24);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Layer 6 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AqgEHIgBAAIgTgCIgSgBQhDgMgugZIgLgGIgVgMQgggWgaggIgCgDIgFgGQgbglgRgoQgQglgIgmIgKgwQgairCXgeIAKgBIADgBQApgEAogBIAogCIAZAAIAQAAIAYAAIAhABIAKABQA9ACA9AIIACAAQA/AIA/AOIAaAGQBPATAuAfQAiAXAQAeIAFAJIAEAOQAEATgCAUQgDAggGAfQgKAqgQAoIgDAHIgCADQg5B2iGAnQgUAGgUAEIgKABQgoAGgoACIgNABIgWAAQg2AAg1gGgAIhENIgOgBIgdgCQgZgCgZgEIgKgBQgVgEgTgGQgngLgggSQhQgsgphUIgBgDIgCgFIgBgCQgRgogJgqQgGgfgDggQgCgUAEgTIAEgOIAEgJQARgeAhgXQAvgfBPgTIAagGQA+gOBAgIIACAAIAqgFQAogEAogBIAKgBIAggBIAZAAIAQAAIAZAAIAnACIAlACIAtADIACABIALABQBDANAhAqQAgArgEBHIgEAgIgKAwQgHAmgQAlQgSAogbAlIgEAGIgDADQgaAggfAWIgVAMIgLAGQgvAZhCAMIgTABIgTACIgBAAIgbADQgpADgoAAIgUAAg");
	mask.setTransform(121.6,36.3);

	// Layer 7
	this.instance_1 = new glasseslib.shine1();
	this.instance_1.setTransform(-15.6,19,1,1,0,0,0,27.7,60.1);
	this.instance_1.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.instance_1.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:500.4},27,cjs.Ease.get(1)).wait(33));

	// Layer 5
	this.instance_2 = new glasseslib.glasses_red("synched",0);
	this.instance_2.setTransform(153.6,37.4,1,1,0,0,0,153.6,37.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,307,75);


(glasseslib.shelf1_glasses = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new glasseslib.outline("synched",0);
	this.instance.setTransform(115,-36,1,1,0,0,0,116,122);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// glasses_case copy
	this.instance_1 = new glasseslib.glasses_casecopy();
	this.instance_1.setTransform(138.2,67.1,1,1,0,0,0,94.5,21.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

	// glasses2
	this.instance_2 = new glasseslib.glasses2("synched",0,false);
	this.instance_2.setTransform(129.1,30.1,0.58,0.58,0,0,0,154.5,36.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-158,232,244);


// stage content:
(glasseslib.glasses = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new glasseslib.shelf1_glasses("synched",0,false);
	this.instance.setTransform(115,202,1,1,0,0,0,115,45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(114,120,232,244);

})(glasseslib = glasseslib||{}, glassesimages = glassesimages||{}, createjs = createjs||{}, ss = ss||{});
var glasseslib, glassesimages, createjs, ss;