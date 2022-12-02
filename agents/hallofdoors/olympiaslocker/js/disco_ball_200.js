(function (discolib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// discolibrary properties:
discolib.properties = {
	width: 229,
	height: 206,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/discoball/circle_lights2.png?1476477774648", id:"circle_lights2"},
		{src:"images/discoball/discoball_gradient.png?1476477774648", id:"discoball_gradient"},
		{src:"images/discoball/highlight.png?1476477774648", id:"highlight"},
		{src:"images/discoball/lowlight.png?1476477774648", id:"lowlight"},
		{src:"images/discoball/pattern_bitmap.png?1476477774648", id:"pattern_bitmap"},
		{src:"images/discoball/star_shine.png?1476477774648", id:"star_shine"}
	]
};



discolib.ssMetadata = [];


// symbols:



(discolib.circle_lights2 = function() {
	this.initialize(img.circle_lights2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,109,175);


(discolib.discoball_gradient = function() {
	this.initialize(img.discoball_gradient);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,953,953);


(discolib.highlight = function() {
	this.initialize(img.highlight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,278,278);


(discolib.lowlight = function() {
	this.initialize(img.lowlight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,874,785);


(discolib.pattern_bitmap = function() {
	this.initialize(img.pattern_bitmap);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2281,982);


(discolib.star_shine = function() {
	this.initialize(img.star_shine);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,128);


(discolib.sparkling_fx1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.star_shine();
	this.instance.setTransform(0,-11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-11,121,128);


(discolib.discoball_holder = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7E7E7E").s().p("EgBBAg0MAAAhBnICDAAIAAONIAABQMAAAAyKg");
	this.shape.setTransform(223.1,271.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#838383").s().p("EgAeAg0MAAAgyJIAAhPIAAuPIA9AAMAAABBng");
	this.shape_1.setTransform(177.9,271.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A6A6A6").s().p("A2DCNQoqiugej4QACgVAGgUQBCDfH+CgQHvCeKaAYIAABQQqagZnvidgAEqDyQJ/gdHeiYQH+igBDjeIAEARIAAAtQgzDqoSCmQneCYp/Acg");
	this.shape_2.setTransform(199.9,128.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A1A1A1").s().p("AeRDXQiBiimJh7QpLi6s7AAQs7AApKC6QmJB7iBCiQgnAugPA0IgGgdQALhCAxg8QCBigGJh8QJKi7M7AAQM7AAJLC7QGJB8CBCgQAtA4ANA7IAAAXIgEASQgPg0gngvg");
	this.shape_3.setTransform(200,64.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("EgC9AilMAAAhBnIg+AAIAAOPQqbgZnvidQn+iihCjfQAPgzAngvQCBiiGJh8QJKi6M7AAQM7AAJLC6QGJB8CCCiQAmAwAPAzIAEgSIAAgWQAGAZAAAaQAAAagGAZIAAgtIgEgRQhDDen9CiQnfCYp+AcIAAuNIiGAAMAAABBngA/P5YIAAgMQABgSADgRIAGAdQgGAUgCAVIgCgXgA/F5qIAAAAg");
	this.shape_4.setTransform(200.1,260.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("A/PCXQABgQACgOQAijzIliuQJKi6M7AAQM7AAJLC6QIRCoAzDoQAGAZAAAaQAAAagGAZIAADoQgNg8gsg4QiCihmJh9QpLi4s7AAQs7AApKC4QmJB9iBChQgxA8gLBCQgDARgBASg");
	this.shape_5.setTransform(200.1,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,400.1,481.8);


(discolib.disco_tint = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(204,51,153,0.439)","rgba(102,153,255,0)"],[0.012,1],0,-109,0,109.1).s().p("Ax9PKIAA+TMAj7AAAIAAeTg");
	this.shape.setTransform(115,97);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,230.1,194);


(discolib.circle_tint = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(102,255,255,0.8)","rgba(102,255,255,0)"],[0,0.831],0,0,0,0,0,282).s().p("A5LXPQqcpoAAtnQAAtmKcpoQKcpoOvAAQOwAAKbJoQKdJoAANmQAANnqdJoQqbJouwAAQuvAAqcpog");
	this.shape.setTransform(228,210.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,456,420.7);


(discolib.circle_line = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.circle_lights2();
	this.instance.setTransform(-71,4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71,4,109,175);


(discolib.ball_pattern = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.pattern_bitmap();
	this.instance.setTransform(-4,-4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,2281,982);


(discolib.sparkling_fx_anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.sparkling_fx1("synched",0);
	this.instance.setTransform(61.6,63.4,1,1,0,0,0,61.6,52.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.4,121,128);


(discolib.circles = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.instance = new discolib.circle_line();
	this.instance.setTransform(216,170.9,0.48,0.48,0,180,0,22.5,214.1);

	this.instance_1 = new discolib.circle_line();
	this.instance_1.setTransform(218.4,172,0.48,0.48,0,-135,45,22.6,214.1);

	this.instance_2 = new discolib.circle_line();
	this.instance_2.setTransform(219.5,174.4,0.48,0.48,0,-90,90,22.5,214.1);

	this.instance_3 = new discolib.circle_line();
	this.instance_3.setTransform(218.5,177,0.48,0.48,0,-45,135,22.4,214.2);

	this.instance_4 = new discolib.circle_line();
	this.instance_4.setTransform(216,178.1,0.48,0.48,0,0,180,22.5,214.1);

	this.instance_5 = new discolib.circle_line();
	this.instance_5.setTransform(216,170.9,0.48,0.48,180,0,0,22.5,214.1);

	this.instance_6 = new discolib.circle_line();
	this.instance_6.setTransform(213.6,172,0.48,0.48,135,0,0,22.6,214.1);

	this.instance_7 = new discolib.circle_line();
	this.instance_7.setTransform(212.5,174.4,0.48,0.48,90,0,0,22.5,214.1);

	this.instance_8 = new discolib.circle_line();
	this.instance_8.setTransform(213.5,177,0.48,0.48,45,0,0,22.4,214.2);

	this.instance_9 = new discolib.circle_line();
	this.instance_9.setTransform(216,178.1,0.48,0.48,0,0,0,22.5,214.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.4,73.9,201.3,197.9);


(discolib.sparkling_fx_anim2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.sparkling_fx_anim1("synched",0,false);
	this.instance.setTransform(9.8,10.4,0.094,0.094,0,0,0,60.4,64.2);
	this.instance.alpha = 0.191;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:60.6,regY:64.1,scaleX:0.47,scaleY:0.47,alpha:0.73,startPosition:8},8,cjs.Ease.get(0.68)).to({regX:60.3,regY:64,scaleX:0.41,scaleY:0.41,alpha:1,startPosition:14},8).to({regX:60.6,regY:64.5,scaleX:0.05,scaleY:0.05,alpha:0.191},11,cjs.Ease.get(1)).to({_off:true},1).wait(13));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.1,4.3,11.4,12.1);


(discolib.sparkling_fx_all4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 8
	this.instance = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance.setTransform(-19.2,2.7,0.19,0.19,-24.5,0,0,-0.4,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).wait(15).to({regX:0,regY:0,scaleX:0.14,scaleY:0.14,rotation:-5.3,x:-48.2,y:8.3},0).wait(61));

	// Layer 6
	this.instance_1 = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance_1.setTransform(-80.4,10.2,0.22,0.22,47.4,0,0,0.1,0.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).wait(18).to({regX:0,regY:0,scaleX:0.04,scaleY:0.04,x:-5.6,y:4.2},0).wait(53));

	// Layer 2
	this.instance_2 = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance_2.setTransform(-35.6,12.9,0.23,0.23,0,0,180,1.1,0.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5).to({_off:false},0).wait(13).to({regX:0,regY:0,scaleX:0.18,scaleY:0.18,x:-36.8,y:0.3},0).wait(60));

	// Layer 3
	this.instance_3 = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance_3.setTransform(-47.1,-1.9,0.24,0.24,30.6,0,0,-0.6,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(33).to({regX:0,regY:0,scaleX:0.29,scaleY:0.29,x:-17.5,y:0.5},0).wait(45));

	// Layer 4
	this.instance_4 = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance_4.setTransform(-78,-3.6,0.17,0.17,21.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({_off:false},0).wait(22).to({scaleX:0.16,scaleY:0.16,rotation:-62.4,x:-21.7,y:1.8},0).wait(52));

	// Layer 5
	this.instance_5 = new discolib.sparkling_fx_anim2("synched",0,false);
	this.instance_5.setTransform(-15.7,11.2,0.12,0.12,-37.1,0,0,-0.3,0.4);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(8).to({_off:false},0).wait(22).to({regX:0,regY:0,scaleX:0.09,scaleY:0.09,x:-15.9,y:-1.8},0).wait(48));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48,-0.4,3.8,3.9);


(discolib.lights_test_rotate = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.circles();
	this.instance.setTransform(219.6,170.7,2.48,2.48,0,0,0,219.6,170.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 2
	this.instance_1 = new discolib.circle_tint("synched",0);
	this.instance_1.setTransform(225,178.4,1,1,0,0,0,228,210.3);
	this.instance_1.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.9,-69.1,499.1,490.6);


(discolib.lights_dots = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.lights_test_rotate();
	this.instance.setTransform(219.6,170.6,1,1,0,0,0,219.6,170.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-360},59).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.9,-69.1,499.1,490.6);


(discolib.lights_move = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.lights_dots("synched",0);
	this.instance.setTransform(219.7,170.6,2.021,0.341,0,0,0,219.6,170.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-302.7,88.7,1008.4,167.4);


(discolib.disco_ball_100 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new discolib.highlight();
	this.instance.setTransform(-306,-274);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Layer 3
	this.instance_1 = new discolib.lowlight();
	this.instance_1.setTransform(-367,-216);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

	// Layer 4
	this.instance_2 = new discolib.discoball_gradient();
	this.instance_2.setTransform(-444,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

	// Layer 5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0pA0qQ1110AB+2QgB+1V111QV010e1AAQe2AAV0V0QV1V1AAe1QAAe211V0Q10V0+2ABQ+1gB1010g");
	mask.setTransform(33.1,92.7);

	// Layer 1
	this.instance_3 = new discolib.sparkling_fx_all4("synched",0,false);
	this.instance_3.setTransform(884.4,177.9,18.789,18.789);

	this.instance_4 = new discolib.sparkling_fx_all4("synched",0,false);
	this.instance_4.setTransform(563.2,-245.6,11.249,11.249);

	this.instance_3.mask = this.instance_4.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(60));

	// Layer 6
	this.instance_5 = new discolib.ball_pattern();
	this.instance_5.setTransform(-515.3,90.1,1,1,0,0,0,1249.6,486.9);

	this.instance_5.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:604.7},59).wait(1));

	// Layer 10 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Ei6mCndMAAAlO5MF1NAAAMAAAFO5g");
	mask_1.setTransform(-44.7,301.9);

	// Layer 7
	this.instance_6 = new discolib.lights_move("synched",0);
	this.instance_6.setTransform(-20.3,-728.3,3.106,13.414,0,0,0,199.3,90);

	this.instance_6.mask = mask_1;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(60));

	// Layer 9
	this.instance_7 = new discolib.discoball_holder("synched",0);
	this.instance_7.setTransform(28.1,-378.1,1,1,0,0,0,200.1,240.9);
	this.instance_7.filters = [new cjs.ColorFilter(0.72, 0.72, 0.72, 1, 0, 0, 0, 0)];
	this.instance_7.cache(-2,-2,404,486);

	this.instance_7.mask = mask_1;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(60));

	// Layer 11
	this.instance_8 = new discolib.disco_tint();
	this.instance_8.setTransform(-1245.2,-762.1,10.383,11.049,0,0,0,-0.6,0.7);
	this.instance_8.alpha = 0.801;
	this.instance_8.filters = [new cjs.BlurFilter(4, 4, 1)];
	this.instance_8.cache(-2,-2,234,198);

	this.instance_8.mask = mask_1;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(60));

	// Layer 8
	this.instance_9 = new discolib.lights_move("synched",0);
	this.instance_9.setTransform(40.3,-938.1,3.012,5.735,0,0,0,202.9,89);
	this.instance_9.alpha = 0.672;
	this.instance_9.filters = [new cjs.ColorFilter(0, 0, 0, 1, 255, 255, 255, 0)];
	this.instance_9.cache(-305,87,1012,171);

	this.instance_9.mask = mask_1;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1239,-769.9,2388.7,2143.6);


// stage content:
(discolib.disco_ball_200 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new discolib.disco_ball_100("synched",0);
	this.instance.setTransform(125,72.7,0.096,0.096,0,0,0,64.7,-17.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(114.5,103.6,229,205.5);

})(discolib = discolib||{}, discoimages = discoimages||{}, createjs = createjs||{}, ss = ss||{});
var discolib, discoimages, createjs, ss;