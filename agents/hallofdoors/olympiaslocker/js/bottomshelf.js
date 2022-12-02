(function (bottomshelflib, img, cjs, ss) {

var p; // shortcut to reference prototypes
bottomshelflib.webFontTxtFilters = {}; 

// bottomshelflibrary properties:
bottomshelflib.properties = {
	width: 232,
	height: 276,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/centigurps/centigurp.png", id:"centigurp"},
		{src:"images/centigurps/container_bmp.png", id:"container_bmp"}
	]
};



bottomshelflib.ssMetadata = [];


bottomshelflib.webfontAvailable = function(family) { 
	bottomshelflib.properties.webfonts[family] = true;
	var txtFilters = bottomshelflib.webFontTxtFilters && bottomshelflib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(bottomshelflib.centigurp = function() {
	this.initialize(img.centigurp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,61,53);


(bottomshelflib.container_bmp = function() {
	this.initialize(img.container_bmp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,276);


(bottomshelflib.centigurp_300 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.instance = new bottomshelflib.centigurp();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61,53);


(bottomshelflib.shelf4_containter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// centigurp_300
	this.instance = new bottomshelflib.centigurp_300();
	this.instance.setTransform(167.2,217.7,1.82,1.82,0,0,180,30.9,25.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:30.6,regY:25.9,scaleX:2.13,scaleY:1.39,skewX:19.7,skewY:199.7,x:146.7,y:209.3},0).to({regX:30.4,regY:26,scaleX:2.81,scaleY:0.69,skewX:22.5,x:96.9,y:187.9},2,cjs.Ease.get(1)).wait(1).to({regX:30.8,regY:25.9,scaleX:1.37,scaleY:2.06,skewX:0,skewY:180,x:41.2,y:154.9},0).to({regX:30.5,scaleX:1.12,scaleY:2.24,x:34.6,y:154.8},3,cjs.Ease.get(1)).wait(1).to({regX:30.4,regY:26,scaleX:1.1,scaleY:2.4,skewX:14.1,skewY:168.8,x:37.9,y:146.7},0).wait(1).to({regX:30.6,scaleX:2.63,scaleY:0.95,skewX:-42.6,skewY:127.4,x:61.2,y:109.9},0).wait(1).to({regX:30.9,regY:25.8,scaleX:1.82,scaleY:1.82,skewX:-11.7,skewY:168.3,x:99.8,y:53.1},0).wait(1).to({regX:30.7,regY:26.2,scaleX:2.29,scaleY:1.2,skewX:-1.2,skewY:178.8,x:111.4,y:32.9},0).wait(1).to({regX:30.6,scaleX:2.07,scaleY:1.42,skewX:-1.2,y:38.9},0).wait(1).to({regX:30.9,regY:25.8,scaleX:1.82,scaleY:1.82,skewX:5.7,skewY:185.7,x:117.9,y:55.5},0).wait(1).to({regX:30.6,regY:25.9,scaleX:1.15,scaleY:2.5,skewX:0.5,skewY:180.5,x:124.1,y:79.1},0).to({regX:30.5,scaleX:0.8,scaleY:3.11,skewX:-0.1,skewY:179.9,x:118.6,y:140.7},2).wait(1).to({regX:30.8,scaleX:2.26,scaleY:1.39,skewX:0,skewY:180,x:117.7,y:229},0).to({regX:30.7,scaleX:2.07,scaleY:1.74,skewX:15.5,x:126.8,y:222.9},2).wait(1).to({regX:30.6,scaleX:1.13,scaleY:2.28,skewX:40.4,skewY:220.4,x:142.7,y:204.7},0).wait(2).to({regX:29.9,regY:26.1,scaleX:0.83,scaleY:2.6,skewX:39.5,skewY:219.5,x:151,y:195.8},0).wait(1).to({regX:30,regY:25.9,scaleX:2.12,scaleY:1.59,skewX:96.1,skewY:269.2,x:188.5,y:134.6},0).to({regX:29.8,regY:25.8,scaleX:2.24,scaleY:1.44,skewX:107.1,skewY:269,x:193.4,y:132.3},2).wait(1).to({regX:30.7,regY:25.6,scaleX:1.23,scaleY:2.14,skewX:108.4,skewY:288.4,x:166.1,y:110.1},0).to({regY:25.3,scaleX:0.85,scaleY:3.07,x:137.1,y:99},2).wait(1).to({regX:30.8,regY:25.7,scaleX:1.82,scaleY:1.82,skewX:51.2,skewY:231.2,x:71.8,y:68.6},0).wait(1).to({regX:30.6,scaleX:1.83,scaleY:1.64,skewX:-75.8,skewY:104.2,x:44.6,y:61.7},0).to({regY:25.6,scaleX:2.03,scaleY:1.4,x:39,y:61.6},2).wait(1).to({regX:30.9,scaleX:0.97,scaleY:2.53,skewX:-96.5,x:65.1,y:54.6},0).wait(1).to({regX:30.8,regY:25.5,scaleX:0.9,scaleY:3.21,x:89.9,y:54.5},0).wait(1).to({regX:30,regY:25.9,scaleX:2.12,scaleY:1.59,skewX:-263.9,skewY:269.2,x:188.5,y:65.6},0).to({regX:29.8,regY:25.8,scaleX:2.24,scaleY:1.44,skewX:-252.9,skewY:269,x:193.4,y:74.3},2).wait(1).to({regX:30.6,regY:25.9,scaleX:1.15,scaleY:2.5,rotation:-0.5,skewX:-360,skewY:360,x:194.1,y:79.1},0).to({scaleX:0.8,scaleY:3.11,rotation:6.1,x:198.7,y:124.7},2).wait(1).to({regX:30.8,scaleX:2.17,scaleY:1.52,rotation:0,skewY:180,x:162.7,y:224.4},0).to({regX:30.9,regY:25.8,scaleX:1.82,scaleY:1.82,x:167.2,y:211.3},4,cjs.Ease.get(1)).to({scaleX:1.87,scaleY:1.8,y:219.7},3).to({scaleX:1.82,scaleY:1.82,y:217.7},2).to({_off:true},10).wait(20));

	// Layer 2
	this.instance_1 = new bottomshelflib.container_bmp();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},60).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,232,276);


// stage content:



(bottomshelflib.bottomshelf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bottomshelflib.shelf4_containter("synched",0);
	this.instance.setTransform(115.1,137.1,1,1,0,0,0,115.1,137.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(116,138,232,276);

})(bottomshelflib = bottomshelflib||{}, bottomshelfimages = bottomshelfimages||{}, createjs = createjs||{}, ss = ss||{});
var bottomshelflib, bottomshelfimages, createjs, ss;