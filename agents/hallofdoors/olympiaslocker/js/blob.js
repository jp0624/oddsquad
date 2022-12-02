(function (bloblib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// bloblibrary properties:
bloblib.properties = {
	width: 232,
	height: 466,
	fps: 28,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/blob/blob1.png?1477319956890", id:"blob1"},
		{src:"images/blob/blob2.png?1477319956890", id:"blob2"},
		{src:"images/blob/blob3a.png?1477319956890", id:"blob3a"},
		{src:"images/blob/blob4a.png?1477319956890", id:"blob4a"},
		{src:"images/blob/boarder_blob.png?1477319956890", id:"boarder_blob"},
		{src:"images/blob/books_blob.png?1477319956890", id:"books_blob"}
	]
};



bloblib.ssMetadata = [];


// symbols:



(bloblib.blob1 = function() {
	this.initialize(img.blob1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,159,158);


(bloblib.blob2 = function() {
	this.initialize(img.blob2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,159,158);


(bloblib.blob3a = function() {
	this.initialize(img.blob3a);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,159,158);


(bloblib.blob4a = function() {
	this.initialize(img.blob4a);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,158);


(bloblib.boarder_blob = function() {
	this.initialize(img.boarder_blob);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,466);


(bloblib.books_blob = function() {
	this.initialize(img.books_blob);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,205,80);


(bloblib.boarder_gfx = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.boarder_blob, null, new cjs.Matrix2D(1,0,0,1,-116,-233)).s().p("EgSHAkaMAAAhIzMAkPAAAMAAABIzg");
	this.shape.setTransform(116,233);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,232,466);


(bloblib.blob_states = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 10
	this.instance = new bloblib.blob1();
	this.instance.setTransform(41,-56);

	this.instance_1 = new bloblib.blob2();
	this.instance_1.setTransform(41,-56);

	this.instance_2 = new bloblib.blob3a();
	this.instance_2.setTransform(41,-56);

	this.instance_3 = new bloblib.blob4a();
	this.instance_3.setTransform(40,-56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(41,-56,159,158);


(bloblib.blob_move_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bloblib.blob_states("single",1);
	this.instance.setTransform(131,23.3,1,1,0,0,0,120.3,22.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.07,scaleY:0.97,skewX:10.5,x:135.5,y:27.4},1,cjs.Ease.get(0.5)).to({scaleX:1.12,scaleY:0.95,skewX:17.3,x:138.4,y:32.2},1).to({regX:120.4,scaleX:1.26,scaleY:0.89,skewX:37.8,x:147,y:46.3,startPosition:0},3).to({scaleX:1.16,scaleY:1,skewX:19.8,x:141.8,y:28.2,startPosition:3},2,cjs.Ease.get(-0.25)).to({scaleX:1.02,scaleY:1.16,skewX:-3.3,x:125.7,y:10.7},2).to({scaleX:0.94,scaleY:1.24,skewX:-16.5,x:111.1,y:9.3,startPosition:2},1).to({scaleX:1.14,scaleY:1,skewX:-9.5,x:110.1,y:25.3,startPosition:0},2).to({regX:120.3,scaleX:1.11,scaleY:0.96,skewX:-1.3,x:121,y:28.2,startPosition:1},1,cjs.Ease.get(0.25)).to({regX:120.4,scaleX:1.09,scaleY:0.94,skewX:5,x:129.6,y:30.4},1).to({scaleX:1.08,scaleY:0.91,skewX:10.8,x:137.2,y:32.3},1).to({regX:120.3,scaleX:1,scaleY:1,skewX:0,x:130.1,y:24.3},2).to({scaleY:1,skewX:-3.7,x:128.1},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.7,-55.1,159,158);


(bloblib.blob_move_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bloblib.blob_states("single",1);
	this.instance.setTransform(108.3,101,1.481,0.877,0,31.7,0,120.8,103.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:119.9,regY:105.3,scaleX:0.7,scaleY:1.42,skewX:-1.2,x:130.5,y:99.1},2,cjs.Ease.get(-1)).to({scaleX:0.81,scaleY:1.31,skewX:1.3,x:127,y:78.5,startPosition:0},1).to({regX:119.2,regY:102.7,scaleX:1.16,scaleY:1,skewX:9.5,x:116.4,y:16.5,startPosition:2},2).to({regX:120.3,regY:96.7,scaleX:1.62,scaleY:0.48,skewX:24.5,x:111.9,y:-85.6},3).to({scaleX:1.75,scaleY:0.37,skewX:31.5,x:112.9,y:-112.7},2).to({regX:121.4,regY:101.2,scaleX:1.19,scaleY:0.74,skewX:12.7,x:114,y:-65.5},2).to({regY:101.6,scaleX:0.94,scaleY:1.32,skewX:9.3,x:106.9,y:60.9},3).to({regX:117.8,regY:98.7,scaleX:0.76,scaleY:1.4,skewX:6.7,x:105,y:99.5},2).to({regX:119.5,regY:101.6,scaleX:1.64,scaleY:0.52,skewX:45.6,x:115.2,y:101,startPosition:1},2).to({regX:119.4,scaleX:1.75,scaleY:0.43,skewX:43.3,x:120.5},2).to({regX:120.8,regY:103.2,scaleX:1.48,scaleY:0.78,skewX:35.9,x:108.3},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.3,-17.7,308.3,117.9);


(bloblib.shelf2_blobcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new bloblib.boarder_gfx();
	this.instance.setTransform(115,262,1,1,0,0,0,116,233);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(100));

	// Layer 5
	this.instance_1 = new bloblib.blob_move_6("synched",0);
	this.instance_1.setTransform(142.5,339.7,0.884,0.884,0,0,0,123.2,0.3);

	this.instance_2 = new bloblib.blob_move_5("synched",0);
	this.instance_2.setTransform(153.4,354.6,0.76,0.76,0,0,0,123.3,0.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(40).to({regX:128.3,regY:103.9,x:147,y:431.2,mode:"single",startPosition:20},0).to({regX:128.5,scaleX:1.08,scaleY:0.66,skewX:23.9,x:147.1,y:431.3},5).to({_off:true},1).wait(53).to({_off:false,regX:123.2,regY:0.3,scaleX:0.88,scaleY:0.88,skewX:0,x:142.5,y:339.7,mode:"synched",startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(46).to({_off:false},0).wait(49).to({regX:145.6,regY:99.5,x:170.4,y:429.9,mode:"single",startPosition:1},0).to({regX:145.4,regY:99.6,scaleX:0.73,scaleY:0.91,skewX:-15.1,x:170.3,y:430},3).to({_off:true},1).wait(1));

	// Layer 10
	this.instance_3 = new bloblib.books_blob();
	this.instance_3.setTransform(26,415);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(100));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,29,232,466);


// stage content:
(bloblib.Blob = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new bloblib.shelf2_blobcopy("synched",0);
	this.instance.setTransform(117,234,1,1,0,0,0,115,262);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(100));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(117,234,232,466);

})(bloblib = bloblib||{}, blobimages = blobimages||{}, createjs = createjs||{}, ss = ss||{});
var bloblib, blobimages, createjs, ss;