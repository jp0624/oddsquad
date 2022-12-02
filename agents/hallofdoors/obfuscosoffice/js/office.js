var p; // shortcut to reference prototypes
var lib = {};
var cjs = createjs;

// library properties:
lib.properties = {
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	manifest: [
		{src:"images/armstraight.png", id:"armstraight"},
		{src:"images/BG.jpg", id:"BG"},
		{src:"images/face_02.png", id:"face_02"},
		{src:"images/face_03.png", id:"face_03"},
		{src:"images/face_04.png", id:"face_04"},
		{src:"images/face_05.png", id:"face_05"},
		{src:"images/face_06.png", id:"face_06"},
		{src:"images/face_07.png", id:"face_07"},
		{src:"images/face_10.png", id:"face_10"},
		{src:"images/face_11.png", id:"face_11"},
		{src:"images/face_13.png", id:"face_13"},
		{src:"images/face_14.png", id:"face_14"},
		{src:"images/face_15.png", id:"face_15"},
		{src:"images/face_16.png", id:"face_16"},
		{src:"images/face_19.png", id:"face_19"},
		{src:"images/face_20.png", id:"face_20"},
		{src:"images/hand_01.png", id:"hand_01"},
		{src:"images/hand_02.png", id:"hand_02"},
		{src:"images/hand_03.png", id:"hand_03"},
		{src:"images/hand_04.png", id:"hand_04"},
		{src:"images/hand_05.png", id:"hand_05"},
		{src:"images/hand_06.png", id:"hand_06"},
		{src:"images/hand_07.png", id:"hand_07"},
		{src:"images/hand_08.png", id:"hand_08"},
		{src:"images/hand_09.png", id:"hand_09"},
		{src:"images/hand_10.png", id:"hand_10"},
		{src:"images/hand_11.png", id:"hand_11"},
		{src:"images/obfuscobody02.png", id:"obfuscobody02"},
		{src:"images/overlay.png", id:"overlay"},
		{src:"images/Button_Down.png", id:"buttonDown"},
		{src:"images/Button_Up.png", id:"buttonUp"}
	]
};

// stage content:
(lib.office = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{"Obfusco's mysterious arrival Sting.mp3":0,"Obfusco1_TwoButterfleis.wav":102,"Obfusco2_SmoothKetchup.wav":282,"Obfusco3_TruerWords.wav":420,"Obfusco4_BeautifulToothbrushes.wav":570,"Obfusco5_FrecklesPillow.wav":720,"Obfusco6_CandleMoon.wav":800,"Obfusco7_FlamingoFriends.wav":901,"Obfusco8_ApplePicking.wav":1041,"Obfusco9_BeautifulBanana.wav":1111,"Obfusco10_OscarKite.wav":1221,"Obfusco11_HamSandwiches.wav":1341,"Obfusco12_ObfuscoSombrero.wav":1441,"Obfusco13_RhinocerousPiano.wav":1561});

	// timeline functions:
	this.frame_101 = function() {
		this.stop();
	}
	this.frame_281 = function() {
		this.stop();
	}
	this.frame_419 = function() {
		this.stop();
	}
	this.frame_569 = function() {
		this.stop();
	}
	this.frame_719 = function() {
		this.stop();
	}
	this.frame_799 = function() {
		this.stop();
	}
	this.frame_900 = function() {
		this.stop();
	}
	this.frame_1040 = function() {
		this.stop();
	}
	this.frame_1110 = function() {
		this.stop();
	}
	this.frame_1220 = function() {
		this.stop();
	}
	this.frame_1340 = function() {
		this.stop();
	}
	this.frame_1440 = function() {
		this.stop();
	}
	this.frame_1560 = function() {
		this.stop();
	}
	this.frame_1631 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(101).call(this.frame_101).wait(180).call(this.frame_281).wait(138).call(this.frame_419).wait(150).call(this.frame_569).wait(150).call(this.frame_719).wait(80).call(this.frame_799).wait(101).call(this.frame_900).wait(140).call(this.frame_1040).wait(70).call(this.frame_1110).wait(110).call(this.frame_1220).wait(120).call(this.frame_1340).wait(100).call(this.frame_1440).wait(120).call(this.frame_1560).wait(71).call(this.frame_1631).wait(2));

	// desk
	this.instance = new lib.Tween6("synched",0);
	this.instance.setTransform(960.2,785.4);

	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(960.2,785.4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},759).to({_off:true},840).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(759).to({_off:false},840).to({startPosition:0},5).to({startPosition:0},4).to({startPosition:0},4).to({startPosition:0},4).wait(6).to({startPosition:0},0).to({_off:true},10).wait(1));

	// forarm right
	this.instance_2 = new lib.forarm();
	this.instance_2.setTransform(1153.2,1213.8,0.888,0.888,45,0,0,89.9,202.8);

	this.instance_3 = new lib.hand("single",2);
	this.instance_3.setTransform(1334.1,679.8,0.581,0.581,0,0.8,-179.2,39.6,288.2);
	this.instance_3._off = true;

	this.instance_4 = new lib.fix("synched",0);
	this.instance_4.setTransform(932.3,432.1,1,1,0,0,0,-26.6,-106.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_2}]},102).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},69).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},14).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},27).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},29).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},28).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},12).to({state:[{t:this.instance_3}]},11).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},9).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},26).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_2}]},16).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},21).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},25).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},50).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},35).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},25).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},27).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},26).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},31).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_4}]},16).to({state:[]},47).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:546.8},102).to({rotation:79.5,x:1202,y:492.1},12).to({scaleX:0.89,scaleY:0.89,rotation:140.3,x:1196,y:503.7},5).to({scaleX:0.89,scaleY:0.89,rotation:223.5,x:1193.7,y:514.5},7).wait(1).to({rotation:223.7,x:1195.5,y:514.6},0).to({rotation:296.9,x:1197.3,y:507.2},4).to({rotation:340.9,x:1226.2,y:482.6},4).to({rotation:292.4,x:1263.5,y:374.9},5).to({x:1249.5,y:490.9},4).to({regX:89.8,rotation:346.2,x:1275.1,y:414.2},4).to({regX:89.9,rotation:292.4,x:1263.5,y:374.9},5).to({x:1249.5,y:490.9},4).to({regX:89.8,rotation:346.2,x:1275.1,y:414.2},4).wait(1).to({regX:89.9,rotation:485.4,x:1188.6,y:498.7},3).to({regY:202.7,rotation:603.6,x:1157.3,y:520.2},6).to({rotation:644.9,x:1171,y:548.1},11,cjs.Ease.get(1)).to({rotation:616.7,x:1222.8,y:445.4},6).wait(7).to({rotation:627.1,x:1220.8,y:386.7},9).to({regY:202.8,rotation:765,x:1153.2,y:546.8},9).wait(69).to({regY:202.7,rotation:603.6,x:1157.3,y:520.2},6).to({x:1212.1,y:455.7},14).to({regX:90,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:720,skewX:4.8,skewY:1.7,x:1266.1,y:448.5},3).to({regY:202.7,scaleX:0.89,scaleY:0.89,skewX:46.6,skewY:41.8,x:1186.9,y:455.3},22).to({regY:202.8,scaleX:0.9,scaleY:0.88,skewX:88.6,skewY:81.8,x:1089.9,y:485.4},27).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:816.6,skewX:0,skewY:0,x:1200.8,y:422.6},1).to({rotation:872.8,x:1147.9,y:549.6},10).wait(29).to({rotation:818.8,x:1150.5,y:548.2},2).to({regY:202.8,rotation:765,x:1153.2,y:546.8},2).wait(22).to({rotation:717.2,x:1153.4,y:524.7},2).to({regY:202.9,rotation:621.2,x:1153.9,y:480.7},4).to({regY:202.8,scaleX:0.89,scaleY:0.89,rotation:595.4,x:1178.3,y:379.2},28).to({regY:202.9,scaleX:0.89,scaleY:0.89,rotation:621.2,x:1153.9,y:480.7},20).to({regY:202.8,rotation:750.3,x:1258.9,y:447.6},5).to({_off:true},1).wait(62).to({_off:false,regX:90,scaleX:0.91,scaleY:0.91,x:1226.9,y:510.6},1).wait(13).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:765,x:1153.2,y:546.8},1).wait(13).to({scaleX:0.89,scaleY:0.89,rotation:720,skewX:49,skewY:41,x:1160,y:584.5},4).to({regX:89.8,scaleX:0.91,scaleY:0.91,skewX:41.8,skewY:48.2,x:1275.7,y:388.1},3).to({regX:89.9,regY:202.7,skewX:98,skewY:104.4,x:1227,y:528.8},3).to({scaleX:0.91,scaleY:0.91,skewX:69.9,skewY:76.2,x:1241.3,y:450.8},3).to({scaleX:0.91,scaleY:0.91,skewX:32.3,skewY:38.6,x:1260.3,y:346.8},4).to({scaleX:0.91,scaleY:0.91,skewX:58.7,skewY:65,x:1256.8,y:419.6},2).to({scaleX:0.91,scaleY:0.91,skewX:98,skewY:104.4,x:1227,y:528.8},3).to({regY:202.8,scaleX:0.91,scaleY:0.91,skewX:71.7,skewY:78.2,x:1240.3,y:456},2).to({regY:202.7,scaleX:0.91,scaleY:0.91,skewX:32.3,skewY:38.6,x:1260.3,y:346.8},3).to({skewX:98,skewY:104.4,x:1227,y:528.8},5).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:825.2,skewX:0,skewY:0,x:1248.9,y:462.8},4).wait(1).to({regX:89.9,rotation:765,x:1153.2,y:546.8},0).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:827,x:1210.1,y:513.3},3).to({scaleX:0.89,scaleY:0.89,rotation:868.3,x:1248.1,y:490.9},2).to({scaleX:0.89,scaleY:0.89,rotation:918.6,x:1247,y:453.9},3).to({scaleX:0.89,scaleY:0.89,rotation:952.2,x:1246.2,y:429.3},2).to({scaleX:0.89,scaleY:0.89,rotation:969.1,x:1245.9,y:416.9},1).to({regX:89.9,rotation:999.2,x:1252.9,y:440.9},5).wait(26).to({regX:89.8,rotation:900.5,x:1260.4,y:366},5).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:866.1,x:1252,y:393.8},3).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:843.1,x:1246.5,y:412.1},2).to({scaleX:0.89,scaleY:0.89,rotation:820,x:1240.8,y:430.6},2).to({regX:89.9,rotation:827.2,x:1249.4,y:496.7},10).wait(23).to({rotation:765,x:1153.2,y:546.8},7).wait(35).to({regY:202.9,rotation:883.3,x:1235.2,y:515.6},5).to({regX:89.8,regY:202.8,rotation:937,y:515.7},5).to({x:1147.2,y:599.8},5).to({regY:202.9,rotation:948.7,x:1147.1,y:652.5},8).wait(21).to({scaleX:0.89,scaleY:0.89,rotation:1024.3,x:1130.2,y:607.1},3).to({regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1049.4,x:1135.9,y:592},1).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:1125,x:1153.2,y:546.8},3).wait(22).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:1127.6,x:1158.8,y:550.9},5).to({scaleX:0.89,scaleY:0.89,rotation:1130.7,x:1165.7,y:555.9},6).wait(24).to({scaleX:0.89,scaleY:0.89,rotation:1142.7,x:1185.6,y:511.5},3).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:1158.4,x:1212.2,y:452.3},4).wait(25).to({rotation:1125,x:1153.2,y:546.8},6).wait(19).to({regX:89.8,rotation:1131,x:1164.6,y:558.3},7).wait(50).to({regX:89.9,rotation:1145.2,x:1233.9,y:424.4},11).wait(2).to({rotation:1120.3,x:1230,y:428.3},5).to({rotation:1145.2,x:1233.9,y:424.4},6).wait(3).to({rotation:1120.3,x:1230,y:428.3},7).to({rotation:1145.2,x:1233.9,y:424.4},6).wait(3).to({rotation:1125,x:1153.2,y:546.8},5).wait(35).to({regX:89.8,rotation:982.2,x:1181.3,y:470},4).to({x:1201.3,y:346},5).to({regX:89.7,rotation:973.8,x:1233.4,y:358.1},7).wait(1).to({x:1181.4,y:546.1},6,cjs.Ease.get(1)).wait(30).to({regX:89.9,rotation:1125,x:1153.2,y:546.8},4).wait(13).to({regX:90,regY:202.9,scaleY:0.8,rotation:1080,skewX:91.2,skewY:80,x:1153.1,y:546.9},3).to({regX:89.9,regY:202.8,scaleY:0.86,skewX:104.7,skewY:89.7,x:1183.2,y:525.8},7).to({regX:89.8,scaleY:0.89,rotation:1185.5,skewX:0,skewY:0,x:1233.2,y:490.7},9).to({x:1267.2,y:440.7},10).to({regX:89.9,rotation:1230.9,x:1277.1,y:458.7},8).wait(11).to({regX:89.8,rotation:1339.2,x:1217.1,y:472.7},5).wait(1).to({rotation:1367},4).wait(31).to({regX:89.9,rotation:1485,x:1153.2,y:546.8},6).wait(15).to({regY:202.9,rotation:1471.8,x:1151.1,y:503.9},5).wait(52).to({x:1207.1,y:533.9},5).wait(16).to({regY:202.8,scaleX:0.89,scaleY:0.88,rotation:1440,skewX:29.4,skewY:29.8,x:1205.3,y:525.4},3).to({regY:202.9,scaleX:0.86,scaleY:0.91,skewX:28.3,skewY:26.2,x:1205.2,y:509.1},4).to({regY:202.8,scaleX:0.83,scaleY:0.95,skewX:30.7,skewY:25.3,x:1222,y:500.7},3).to({scaleX:0.84,scaleY:0.94,skewX:28.2,skewY:23.9,x:1220.3,y:495.9},3).to({scaleX:0.89,scaleY:0.89,rotation:1485,skewX:0,skewY:0,x:1153.2,y:546.8},9).wait(20).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:1547,x:1210.1,y:513.3},3).to({scaleX:0.89,scaleY:0.89,rotation:1588.3,x:1248.1,y:490.9},2).to({scaleX:0.89,scaleY:0.89,rotation:1638.6,x:1247,y:453.9},3).to({scaleX:0.89,scaleY:0.89,rotation:1672.2,x:1246.2,y:429.3},2).to({scaleX:0.89,scaleY:0.89,rotation:1689.1,x:1245.9,y:416.9},1).to({regX:89.9,rotation:1719.2,x:1252.9,y:440.9},5).wait(5).to({regX:89.8,rotation:1620.5,x:1260.4,y:366},5).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:1586.1,x:1252,y:393.8},3).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1563.1,x:1246.5,y:412.1},2).to({scaleX:0.89,scaleY:0.89,rotation:1540,x:1240.8,y:430.6},2).to({regX:89.9,rotation:1547.2,x:1249.4,y:496.7},10).wait(23).to({rotation:1485,x:1153.2,y:546.8},7).wait(27).to({rotation:1489.3,x:1163.1,y:549.4},6).wait(23).to({regX:89.8,rotation:1476.1,x:1136.6,y:503.9},4).wait(10).to({regX:89.9,regY:202.9,rotation:1310.1,x:1214.6,y:529.9},5).wait(31).to({scaleX:0.88,scaleY:0.89,rotation:1440,skewX:-128.2,skewY:-131.7,x:1220.6,y:545.5},0).wait(1).to({scaleX:0.89,scaleY:0.89,rotation:1310.1,skewX:0,skewY:0,x:1214.6,y:529.9},0).to({regX:90,rotation:1339.1,x:1186,y:352.5},12).wait(10).to({regY:203,scaleX:0.89,scaleY:0.89,rotation:1350.2,x:1192.9,y:466.2},2).to({scaleX:0.89,scaleY:0.89,rotation:1395.1,x:1179.7,y:493},1).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1485,x:1153.2,y:546.8},2).wait(13).to({rotation:1312,x:1174.4,y:427.2},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(480).to({_off:false},0).to({x:1343.9,y:603.6},10).to({x:1326.3,y:687.6},10).to({scaleX:0.64,scaleY:0.64,x:1280.7,y:754.6},12).to({regY:288.1,scaleX:0.48,scaleY:0.48,skewX:21.7,skewY:-158.3,x:1209.3,y:656.7},11).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:0.8,skewY:-179.2,x:1343.9,y:603.6},10).to({regY:288.1,scaleX:0.6,scaleY:0.6,skewX:0.8,x:1292.1,y:747.2},9).to({_off:true,regX:90,regY:202.8,scaleX:0.91,scaleY:0.91,rotation:30.3,skewX:0,skewY:0,x:1226.9,y:510.6,mode:"independent"},1).wait(1090));

	// hand right
	this.instance_5 = new lib.hand("single",0);
	this.instance_5.setTransform(1123.6,1350.1,0.581,0.581,0,-172.3,7.7,39.6,288.1);

	this.instance_6 = new lib.forarm();
	this.instance_6.setTransform(1270.6,449.5,0.888,0.888,30.3,0,0,89.9,202.8);
	this.instance_6._off = true;

	this.instance_7 = new lib.handcopy("single",2);
	this.instance_7.setTransform(1007.7,693,0.581,0.581,0,140.2,-39.8,39.6,288.2);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:683.1},102).to({regY:288.2,skewX:-109.1,skewY:70.9,x:1082.6,y:644.3,startPosition:3},12).to({regY:288.1,skewX:-92.7,skewY:87.3,x:1013.4,y:462.6},5).to({regY:288.2,skewX:-26.6,skewY:153.4,x:1211.6,y:302.2},7).wait(1).to({skewX:-26.6,startPosition:4},0).to({regY:288.1,skewX:59.3,skewY:239.3,x:1401.7,y:454.6},4).to({regY:288,skewX:121.8,skewY:301.8,x:1394,y:582.1},4).to({regX:39.7,skewX:105.6,skewY:285.6,x:1441,y:302.5},5).to({regX:39.8,regY:287.9,skewX:37.9,skewY:217.9,y:438.5},4).to({regY:287.8,skewX:106.9,skewY:286.9,x:1422.8,y:533.9},4).to({regX:39.7,regY:288,skewX:105.6,skewY:285.6,x:1441,y:302.5},5).to({regX:39.8,regY:287.9,skewX:37.9,skewY:217.9,y:438.5},4).to({regY:287.8,skewX:106.9,skewY:286.9,x:1422.8,y:533.9},4).wait(1).to({startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:163.1,skewY:343.1,x:1269.4,y:650.2,startPosition:9},1).to({scaleX:0.58,scaleY:0.58,skewX:228.9,skewY:408.9,x:1104.4,y:625.2},1).to({regX:39.8,regY:287.7,scaleX:0.58,scaleY:0.58,skewX:294.4,skewY:474.4,x:983.2,y:512.2},1).to({regX:39.7,regY:287.8,skewX:311.5,skewY:491.5,x:1048.9,y:339.4},3).to({regY:287.7,skewX:393.2,skewY:573.2,x:1231.6,y:322.5,startPosition:10},3).to({regX:39.8,skewX:398.7,skewY:578.7,x:1357.4,y:446},11,cjs.Ease.get(1)).to({skewX:370.5,skewY:550.5,x:1338.7,y:267.3},6).to({skewX:377.7,skewY:557.7,x:1354.3,y:269.2,startPosition:1},1).to({startPosition:1},6).to({regX:39.9,skewX:407.2,skewY:587.2,x:1373.9,y:241.8},9).to({scaleX:0.58,scaleY:0.58,skewX:422.9,skewY:602.9,y:313.4,startPosition:6},1).to({regX:39.8,regY:287.9,scaleX:0.58,scaleY:0.58,skewX:423.1,skewY:603.1,x:1374.1,y:528},3).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:547.7,skewY:727.7,x:1123.6,y:683.1,startPosition:0},5).wait(69).to({startPosition:0},0).to({scaleX:0.58,scaleY:0.58,skewX:496.1,skewY:676.1,x:1293.8,y:671.6},2).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:470.3,skewY:650.3,x:1349.7,y:586.9,startPosition:1},1).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:450.9,skewY:630.9,x:1308,y:394.9},2).to({regX:39.7,regY:287.7,scaleX:0.58,scaleY:0.58,skewX:393.2,skewY:573.2,x:1231.6,y:322.5,startPosition:10},1).to({regX:39.6,skewX:422.7,skewY:602.7,x:1286.3,y:260.1},14).to({scaleX:0.57,scaleY:0.57,skewX:387.6,skewY:567.6,x:1403.1,y:362.1,startPosition:4},1).to({regX:39.8,regY:287.8,skewX:415.1,skewY:595.1,x:1424.6,y:489.2},1).to({regX:39.6,regY:287.7,scaleX:0.56,scaleY:0.53,skewX:319.7,skewY:499.3,x:1406.9,y:580,startPosition:7},1).to({regX:39.8,regY:287.6,scaleX:0.56,scaleY:0.53,skewX:349.4,skewY:530.4,x:1326.2,y:636.5},10).to({regX:39.6,regY:287.7,scaleY:0.53,skewX:357,skewY:539.7,x:1203.7,y:644.3},12).to({scaleY:0.53,skewX:361.5,skewY:545.8,x:1083.7,y:655.9},13).to({regY:287.6,scaleY:0.54,skewX:366.6,skewY:552.8,x:954.3,y:627.9},14).to({regY:287.8,scaleX:0.55,scaleY:0.55,skewX:254.6,skewY:434.6,x:1049.6,y:523.5,startPosition:3},1).to({regX:39.5,regY:287.7,scaleX:0.55,scaleY:0.55,skewX:308.9,skewY:488.9,x:963.2,y:471.8},10).wait(29).to({startPosition:3},0).to({scaleX:0.56,scaleY:0.56,skewX:271.9,skewY:451.9,x:1043.4,y:635.9},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},2).wait(22).to({startPosition:0},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:153.4,skewY:333.4,x:1268.2,y:645.7},2).to({regX:39.5,regY:288.1,skewX:136,skewY:316,x:1340.4,y:594.8},1).to({regX:39.4,regY:287.9,skewX:69.7,skewY:249.7,x:1336.4,y:408.3},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:36.5,skewY:216.5,x:1275.8,y:315},1).to({regY:287.9,skewX:0.3,skewY:180.5,x:1245.7,y:185.2},28).to({regY:288.1,skewX:36.5,skewY:216.5,x:1275.8,y:315},20).wait(1).to({x:1359.9,y:399.1,startPosition:5},0).to({scaleX:0.58,scaleY:0.58,skewX:63.9,skewY:243.9,x:1364.7,y:472.3},1).to({skewX:91.3,skewY:271.3,x:1353.3,y:539.1},1).to({skewX:118.6,skewY:298.6,x:1341.9,y:605.9},1).to({scaleX:0.58,scaleY:0.58,skewX:146,skewY:326,x:1279.8,y:620},1).to({_off:true},1).wait(62).to({_off:false,scaleX:0.6,scaleY:0.6,skewX:0.8,skewY:180.8,x:1292.1,y:747.2,startPosition:2},1).to({skewX:0.8},13).to({scaleX:0.58,scaleY:0.58,skewX:-172.3,skewY:7.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({skewY:7.7},0).to({scaleX:0.62,scaleY:0.54,skewX:-171.1,skewY:6.7,x:1128.3,y:711.5},4).to({regY:288.2,scaleX:0.61,scaleY:0.58,skewX:-111.1,skewY:72.4,x:1288.2,y:591.7,startPosition:3},3).to({regY:288.1,skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},3).to({scaleY:0.58,skewX:-83.2,skewY:100.3,x:1162.4,y:626.3},3).to({scaleY:0.58,skewX:-120.7,skewY:62.8,x:1306.4,y:545.6},4).to({skewX:-94.3,skewY:89.2,x:1219.6,y:606},2).to({skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},3).to({regY:288,scaleY:0.58,skewX:-81.2,skewY:102.3,x:1161.4,y:609.8},2).to({regY:288.1,scaleY:0.58,skewX:-120.7,skewY:62.8,x:1306.4,y:545.6},3).to({skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},5).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:-68.7,skewY:111.3,x:1096.2,y:554.1},4).wait(1).to({regY:288.1,skewX:-172.3,skewY:7.7,x:1123.6,y:683.1},0).to({scaleX:0.58,scaleY:0.58,skewX:-133.6,skewY:46.4,x:1023,y:590.2},3).to({regX:39.5,scaleX:0.58,scaleY:0.58,skewX:-107.8,skewY:72.2,x:1052.6,y:418.2},2).to({regY:288,scaleX:0.58,scaleY:0.58,skewX:-55.4,skewY:124.6,x:1179.1,y:260.1},3).to({skewX:-20.5,skewY:159.5,x:1297.8,y:230.1},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-3.1,skewY:176.9,x:1337.5,y:254.1,startPosition:6},1).to({regX:39.5,skewX:63.4,skewY:243.4,x:1418.6,y:344.1},5).wait(26).to({startPosition:6},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:35.6,skewY:215.6,x:1300.1,y:234.8},2).to({regX:39.5,regY:288,scaleX:0.58,scaleY:0.58,skewX:7.7,skewY:187.7,x:1181.8,y:203.4},2).to({regY:288.2,skewX:-35.3,skewY:144.7,x:1131.8,y:217,startPosition:9},1).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:-39.3,skewY:140.7,x:1063.2,y:368.8},3).to({skewX:-42.1,skewY:137.9,x:1063.1,y:460.8},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-44.7,skewY:135.3,x:1062.9,y:552.8},2).to({regY:288,skewX:-37.5,skewY:142.5,x:1057.6,y:595.6},10).wait(23).to({startPosition:9},0).to({regX:39.6,regY:288.1,skewX:-172.3,skewY:7.7,x:1123.6,y:702.6,startPosition:0},7).wait(19).to({skewY:7.7,y:683.1},0).wait(16).to({regX:39.5,regY:288.2,skewX:-156.7,skewY:23.3,x:1149.1,y:743.7,startPosition:5},0).to({regY:288.1,skewX:-47.7,skewY:132.3,x:1066.9,y:415.3},5).wait(1).to({skewX:-62.4,skewY:117.6,x:1096.1,y:372.4,startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:-26.6,skewY:153.4,x:1162.7,y:336.1},2).to({scaleX:0.58,scaleY:0.58,skewX:-13.7,skewY:166.3,x:1221.3,y:313.7},2).to({skewX:4.7,skewY:184.7,x:1123.4,y:427.1},5).to({regX:39.5,skewX:16.4,skewY:196.4,x:1159,y:478.6},8).wait(21).to({startPosition:4},0).to({regY:288.2,skewX:90,skewY:270,x:1304.2,y:581.9},3).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:114.3,skewY:294.3,x:1296.2,y:640.4},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(13).to({startPosition:0},0).wait(9).to({startPosition:0},0).to({skewX:190.3,skewY:370.3,x:1123.3,y:685.7},5).to({skewX:193.5,skewY:373.5,x:1122.8,y:688.6},6).wait(1).to({startPosition:0},0).wait(23).to({startPosition:0},0).to({regY:288.2,scaleY:0.54,skewX:180.3,skewY:360.3,x:1102.4,y:658.6},3).to({scaleY:0.48,skewX:162.8,skewY:342.8,x:1075.1,y:618.7,startPosition:3},4).wait(25).to({startPosition:3},0).to({regY:288.1,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},6).wait(19).to({startPosition:0},0).to({startPosition:0},7).wait(50).to({startPosition:11},0).to({regY:288.3,skewX:128.3,skewY:308.3,x:1151.9,y:601,startPosition:10},11).wait(2).to({startPosition:10},0).to({x:1234,y:624.5},5).to({x:1151.9,y:601},6).wait(3).to({startPosition:10},0).to({x:1234,y:624.5},7).to({x:1151.9,y:601},6).wait(3).to({startPosition:10},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:202.6,skewY:382.6,x:1160.1,y:651.5},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(35).to({startPosition:0},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:124.4,skewY:304.4,x:1333,y:589.2},2).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:61.2,skewY:241.2,x:1318.5,y:323.3,startPosition:10},2).to({regY:288.2,skewX:21.2,skewY:201.2,x:1338.5,y:199.3},5).to({skewX:17,skewY:197,x:1344.6,y:179.3},7).wait(1).to({startPosition:3},0).to({regX:39.6,regY:288.1,skewX:6.3,skewY:186.3,x:1302.6,y:375.3},6,cjs.Ease.get(1)).wait(8).to({skewX:6.3},0).wait(22).to({startPosition:3},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:40.6,skewY:220.6,x:1370.8,y:497.3},1).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:75.1,skewY:255.1,x:1351,y:619.2},1).to({regX:39.3,scaleX:0.58,scaleY:0.58,skewX:131.4,skewY:311.4,x:1259.3,y:707.2},1).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({startPosition:0},0).to({_off:true,regY:288.2,skewX:140.2,skewY:320.2,x:1007.7,y:693,startPosition:2},2).wait(52).to({_off:false,regX:39.5,skewX:31.4,skewY:211.4,x:1347.7,y:301,startPosition:10},0).to({regX:39.4,skewX:13.5,skewY:193.5,x:1411.8,y:399},4).to({regX:39.5,regY:288.3,skewX:69.7,skewY:249.7,x:1411.7},6).wait(25).to({startPosition:10},0).to({scaleX:0.58,scaleY:0.58,skewX:128.6,skewY:308.6,x:1327.7,y:601.1},3).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(15).to({startPosition:0},0).to({x:1181.6,y:703.1},5).wait(27).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(20).to({startPosition:0},0).to({startPosition:0},5).wait(11).to({startPosition:0},0).wait(5).to({startPosition:0},0).to({skewX:185.2,skewY:365.8,x:1187.4,y:695.5},3).to({regY:288.2,scaleX:0.58,scaleY:0.59,skewX:185.1,skewY:361.3,y:680.6},4).to({scaleY:0.59,skewX:188.8,skewY:359.4,x:1192.8,y:672.9},3).to({scaleY:0.59,skewX:185.8,skewY:358.3,x:1200.1,y:668.4},3).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1},9).wait(20).to({startPosition:3},0).to({scaleX:0.58,scaleY:0.58,skewX:226.4,skewY:406.4,x:1023,y:590.2},3).to({regX:39.5,scaleX:0.58,scaleY:0.58,skewX:252.2,skewY:432.2,x:1052.6,y:418.2},2).to({regY:288,scaleX:0.58,scaleY:0.58,skewX:304.6,skewY:484.6,x:1179.1,y:260.1},3).to({skewX:339.5,skewY:519.5,x:1297.8,y:230.1},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:356.9,skewY:536.9,x:1337.5,y:254.1,startPosition:6},1).to({regX:39.5,skewX:423.4,skewY:603.4,x:1418.6,y:344.1},5).wait(5).to({startPosition:6},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:395.6,skewY:575.6,x:1300.1,y:234.8},2).to({regX:39.5,regY:288,scaleX:0.58,scaleY:0.58,skewX:367.7,skewY:547.7,x:1181.8,y:203.4},2).to({regY:288.2,skewX:324.7,skewY:504.7,x:1131.8,y:217,startPosition:9},1).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:320.7,skewY:500.7,x:1063.2,y:368.8},3).to({skewX:317.9,skewY:497.9,x:1063.1,y:460.8},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:315.3,skewY:495.3,x:1062.9,y:552.8},2).to({regY:288,skewX:322.5,skewY:502.5,x:1057.6,y:595.6},10).wait(23).to({startPosition:9},0).to({regX:39.6,regY:288.1,skewX:187.7,skewY:367.7,x:1123.6,y:702.6,startPosition:0},7).wait(1).to({y:683.1},0).wait(26).to({startPosition:0},0).to({startPosition:0},6).to({startPosition:0},23).to({regY:288.2,skewX:174.5,skewY:354.5,x:1128.7,y:643.2},4).wait(10).to({x:1136.7,y:697.2},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:146.2,skewY:326.2,x:1275.2,y:668.8},1).to({skewX:117.8,skewY:297.8,x:1353.9,y:582.5},1).to({regX:39.8,scaleX:0.58,scaleY:0.58,skewX:89.7,skewY:269.7,x:1377.5,y:478.6},1).to({scaleX:0.58,scaleY:0.58,skewX:91.9,skewY:271.9,x:1329.1,y:364.9},1).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,skewX:33,skewY:213,x:1244.7,y:331.2},1).wait(31).to({scaleX:0.59,scaleY:0.57,skewX:34.7,skewY:211.4,x:1251.5,y:353.6},0).wait(1).to({scaleX:0.58,scaleY:0.58,skewX:33,skewY:213,x:1244.7,y:331.2,startPosition:6},0).to({regX:39.5,regY:288.1,skewX:10.8,skewY:190.8,x:1309.1,y:193.4},12).wait(10).to({startPosition:6},0).to({regX:39.6,regY:288.3,skewX:14.5,skewY:194.5,x:1340.9,y:347.2},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:45,skewY:225,x:1404.5,y:523.2},1).to({skewX:116.3,skewY:296.3,x:1284.1,y:663.1},1).to({scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({startPosition:0},0).to({scaleX:0.58,scaleY:0.58,skewX:140.2,skewY:320.2,x:1257.8,y:671},2).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:92.6,skewY:272.6,x:1379.8,y:522.7},2).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:40.4,skewY:220.4,x:1345.9,y:348.6},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-11.7,skewY:168.3,x:1227.9,y:226.5},2).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(480).to({_off:false},0).to({x:1280.4,y:373.2},10).to({x:1262.8,y:457.3},10).to({regX:90,scaleX:0.98,scaleY:0.98,x:1211.1,y:501.8},12).to({regY:202.9,scaleX:0.73,scaleY:0.73,rotation:51.2,x:1228.1,y:462.3},11).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:30.3,x:1280.4,y:373.2},10).to({regX:90,scaleX:0.91,scaleY:0.91,x:1226.9,y:510.6},9).to({_off:true,regX:39.6,regY:288.1,scaleX:0.6,scaleY:0.6,rotation:0,skewX:0.8,skewY:-179.2,x:1292.1,y:747.2,mode:"single",startPosition:2},1).wait(1090));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1111).to({_off:false},2).wait(1).to({x:1000.7,y:665},0).to({x:1005.7,y:573},16).to({x:1047.7,y:525},10).to({skewX:100.5,skewY:280.5,x:1060.7,y:542,startPosition:7},1).to({regX:39.5,skewX:137.7,skewY:317.7,x:1060.6,y:404.9},7).wait(11).to({x:1071.6,y:414.9},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,x:1148,y:293.4},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,x:1347.6,y:301.9},3).to({_off:true},1).wait(468));

	// forearm left
	this.instance_8 = new lib.forarm();
	this.instance_8.setTransform(807.4,1178.9,0.888,0.888,0,-44,136,89.9,202.9);

	this.instance_9 = new lib.hand("single",2);
	this.instance_9.setTransform(690.5,657.3,0.581,0.581,-21,0,0,39.6,288.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:512},102).to({skewX:-80.5,skewY:99.5,x:715.5,y:506.1},12).to({regY:203,skewX:-214.5,skewY:-34.5,y:529.5},12).wait(1).to({regY:203.1,skewX:-282.2,skewY:-102.2,x:734.8,y:463.6},4).to({regX:89.8,skewX:-334.1,skewY:-154.1,x:738.4,y:430.5},4).to({skewX:-276.2,skewY:-96.2,x:724.8,y:344.4},5).to({x:726.8,y:472.4},4).to({skewX:-347.9,skewY:-167.9,x:710.8,y:402.5},4).to({skewX:-276.2,skewY:-96.2,x:724.8,y:344.4},5).to({x:726.8,y:472.4},4).to({skewX:-347.9,skewY:-167.9,x:710.8,y:402.5},4).wait(1).to({skewX:-322.4,skewY:-142.4,x:740.8,y:482.4},0).to({regY:203.2,skewX:-256.9,skewY:-76.9,x:707.5,y:380.5},3).to({x:740.7,y:495.8},6).to({regY:203.3,skewX:-303.6,skewY:-123.6,x:758.5,y:484.1},11,cjs.Ease.get(1)).to({scaleX:0.96,scaleY:0.89,skewX:-378,skewY:-176.2,x:749.7,y:486.1},3).to({regY:203.2,scaleX:0.89,scaleY:0.89,skewX:-454.7,skewY:-274.7,x:724.8,y:485.5},3).to({regY:203.3,skewX:-478.7,skewY:-298.7,x:728.8,y:495.2},7).wait(9).to({regX:89.9,regY:202.9,skewX:-404,skewY:-224,x:807.4,y:512},9).wait(69).to({regX:89.8,regY:203.2,skewX:-256.9,skewY:-76.9,x:740.7,y:495.8},6).to({x:715.3,y:431.3},14).to({regX:89.7,regY:203.3,scaleX:0.89,scaleY:0.89,skewX:-152.9,skewY:27.1,x:741.5,y:517.9},2).to({regX:89.8,scaleX:0.88,scaleY:0.9,skewX:-100.6,skewY:82.3,x:818.3,y:502.7},1).to({regX:89.9,scaleX:0.9,scaleY:0.88,skewX:-61.1,skewY:122.9,x:741.5,y:456.7},22).to({regX:89.7,scaleX:0.92,scaleY:0.86,skewX:11,skewY:196.8,x:708.1,y:473.9},27).to({regX:89.6,scaleX:0.89,scaleY:0.89,skewX:-99.5,skewY:80.5,x:610.3,y:419.5},1).to({regX:89.7,skewX:-146.7,skewY:33.3,x:783.5,y:534},10).wait(29).to({skewX:-95.3,skewY:84.7,x:795.6,y:523},2).to({regX:89.9,regY:202.9,skewX:-44,skewY:136,x:807.4,y:512},2).wait(22).to({skewX:-53.2,skewY:126.8,x:736.8,y:505.7},6).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-55.3,skewY:124.6,x:719.7,y:512.7},28).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-53.2,skewY:126.8,x:736.8,y:505.7},20).to({skewX:-45.2,skewY:134.8,x:687.8,y:445.7},5).to({_off:true},1).wait(62).to({_off:false,regX:89.8,scaleX:0.97,scaleY:0.97,x:752.6,y:482},1).wait(13).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:807.4,y:512},1).wait(13).to({scaleX:0.9,scaleY:0.89,skewX:-48,skewY:140,x:788.9,y:551.9},4).to({scaleX:0.91,scaleY:0.91,skewX:-40.8,skewY:132.8,x:715.9,y:332.3},3).to({skewX:-24.3,skewY:149.3,x:748.5,y:280.5},3).to({scaleX:0.9,scaleY:0.91,skewX:-55.7,skewY:117.8,x:727.8,y:392.4},3).to({regY:203,scaleX:0.91,scaleY:0.91,skewX:-97.5,skewY:76.1,x:755.1,y:523.5},4).to({scaleX:0.9,scaleY:0.91,skewX:-68.2,skewY:105.3,x:729,y:422.5},2).to({regY:202.9,scaleX:0.91,scaleY:0.91,skewX:-24.3,skewY:149.3,x:746.6,y:292.2},3).to({scaleX:0.9,scaleY:0.91,skewX:-53.6,skewY:120.1,x:730.5,y:382.7},2).to({regY:203,scaleX:0.91,scaleY:0.91,skewX:-97.5,skewY:76.1,x:755.1,y:523.5},3).to({regY:202.9,skewX:-24.3,skewY:149.3,x:748.5,y:280.5},5).to({scaleX:0.89,scaleY:0.89,skewX:-37.5,skewY:142.5,x:717.5,y:408.3},4).wait(1).to({skewX:-44,skewY:136,x:807.4,y:512},0).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-109.3,skewY:70.7,x:755.8,y:492.2},3).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,skewX:-153,skewY:27,x:721.5,y:479.1},2).to({scaleX:0.89,scaleY:0.89,skewX:-202.6,skewY:-22.6,x:724.5,y:457.5},3).to({scaleX:0.89,scaleY:0.89,skewX:-235.9,skewY:-55.9,x:726.5,y:443.1},2).to({regX:89.8,regY:203,scaleX:0.89,scaleY:0.89,skewX:-252.4,skewY:-72.4,x:727.5,y:435.9},1).to({regX:89.9,skewX:-291.9,skewY:-111.9,x:742.3,y:455.9},5).wait(26).to({skewX:-200.7,skewY:-20.7,x:693.3,y:401.6},5).to({regX:90,scaleX:0.89,scaleY:0.89,skewX:-163.2,skewY:16.8,x:699.3,y:426.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-137.9,skewY:42.1,x:703.3,y:443.5},2).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-112.8,skewY:67.2,x:707.1,y:460.3},2).to({skewX:-105.5,skewY:74.5,x:716.2,y:459},10).wait(23).to({regY:202.9,skewX:-44,skewY:136,x:807.4,y:512},7).wait(35).to({regX:89.8,regY:202.8,skewX:-79.9,skewY:100.1,x:768.3,y:488.3},5).to({regX:89.9,skewX:-150.7,skewY:29.3,x:772.3,y:508},5).to({regX:89.8,skewX:-169.6,skewY:10.4,x:856.4,y:517.7},5).to({skewX:-157.9,skewY:22.1,x:879,y:513.1},8).wait(21).to({regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-109,skewY:71,x:821,y:518.4},3).to({skewX:-92.8,skewY:87.2,x:817.7,y:516.8},1).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:807.4,y:512},3).wait(22).to({scaleX:0.89,scaleY:0.89,skewX:-61.1,skewY:118.9,x:749.2,y:460.1},5).to({regX:90,scaleX:0.86,scaleY:0.78,skewX:-49.9,skewY:167.3,x:752.8,y:367.4},6).wait(1).to({regY:203,skewX:-122.9,skewY:199.9,x:765.4,y:407.3},0).to({scaleX:0.98,scaleY:0.89,skewX:-160.2,skewY:197,x:802.2,y:343.7},5).wait(18).to({regY:203.1,scaleX:0.94,scaleY:0.85,skewX:-91.3,skewY:266,x:716.3,y:417.5},3).to({scaleX:0.88,scaleY:0.79,skewX:0.6,skewY:357.8,x:697.5,y:484.1},4).wait(25).to({skewX:0.6},0).to({skewX:29.8,skewY:387,x:783.5,y:521.2},5).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:496,x:807.4,y:512},1).wait(19).to({regX:89.8,regY:202.8,skewX:0,skewY:540,x:795,y:482},2).to({regX:89.9,skewX:109.2,skewY:649.2,x:763.8,y:407.6},5).wait(50).to({skewX:100.3,skewY:640.3,x:732,y:428.7},11).wait(2).to({regX:89.8,regY:202.7,skewX:111.2,skewY:651.2,x:716.4,y:387.7},5).to({regX:89.9,regY:202.8,skewX:100.3,skewY:640.3,x:732,y:428.7},6).wait(3).to({regX:89.8,regY:202.7,skewX:111.2,skewY:651.2,x:716.4,y:387.7},7).to({regX:89.9,regY:202.8,skewX:100.3,skewY:640.3,x:732,y:428.7},6).wait(3).to({regY:202.9,skewX:-44,skewY:496,x:807.4,y:512},5).wait(35).to({skewX:-44},0).to({regX:89.8,regY:203,skewX:-55,skewY:485,x:795.5,y:533.8},4).wait(5).to({regX:89.9,skewX:-50.2,skewY:489.8,x:823.5,y:518},7).wait(37).to({regY:202.9,skewX:-44,skewY:496,x:807.4,y:512},4).wait(13).to({regX:89.8,regY:202.8,scaleY:0.77,skewX:-72.5,skewY:476.8,y:511.8},3).to({regX:89.9,regY:202.9,scaleY:0.85,skewX:-97.3,skewY:456,x:775,y:495.4},7).to({regY:202.8,scaleY:0.89,skewX:-110.4,skewY:429.6,x:733.3,y:473.9},9).to({skewX:-121.7,skewY:418.3,x:699.3,y:478},10).to({regX:89.8,skewX:-152.1,skewY:387.9,x:699.2,y:477.9},8).wait(11).to({skewX:-254.6,skewY:285.4,x:755.3,y:507.8},5).wait(1).to({skewX:-286.3,skewY:253.7,y:507.9},4).to({skewX:-286.3},6).wait(25).to({regX:89.9,regY:202.9,skewX:-404,skewY:136,x:807.4,y:512},6).wait(15).to({regX:89.8,regY:203,skewX:-534.7,skewY:5.3,x:738.5,y:562.7},5).wait(27).to({skewY:5.3},0).to({skewX:-590.9,skewY:-50.9},5).wait(20).to({regX:89.7,skewX:-630.6,skewY:-90.6,x:744.5,y:380.7},5).wait(11).to({regY:203.1,skewX:-723.8,skewY:-183.8,x:817.2,y:486.4},5).to({regX:89.6,scaleX:0.89,scaleY:0.89,skewX:-726.3,skewY:-185.7,x:813.8,y:490.7},3).to({scaleX:0.9,scaleY:0.88,skewX:-726.4,skewY:-190.2,y:505.9},4).to({regY:203,scaleX:0.91,scaleY:0.87,skewX:-722.7,skewY:-191.9,x:829.8,y:510.4},3).to({regX:89.7,scaleX:0.91,scaleY:0.88,skewX:-725.7,skewY:-193,x:828.6,y:512.9},3).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-764,skewY:-224,x:807.4,y:512},9).wait(20).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-829.3,skewY:-289.3,x:755.8,y:492.2},3).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,skewX:-873,skewY:-333,x:721.5,y:479.1},2).to({scaleX:0.89,scaleY:0.89,skewX:-922.6,skewY:-382.6,x:724.5,y:457.5},3).to({scaleX:0.89,scaleY:0.89,skewX:-955.9,skewY:-415.9,x:726.5,y:443.1},2).to({regX:89.8,regY:203,scaleX:0.89,scaleY:0.89,skewX:-972.4,skewY:-432.4,x:727.5,y:435.9},1).to({regX:89.9,skewX:-1011.9,skewY:-471.9,x:742.3,y:455.9},5).wait(5).to({skewX:-920.7,skewY:-380.7,x:693.3,y:401.6},5).to({regX:90,scaleX:0.89,scaleY:0.89,skewX:-883.2,skewY:-343.2,x:699.3,y:426.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-857.9,skewY:-317.9,x:703.3,y:443.5},2).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-832.8,skewY:-292.8,x:707.1,y:460.3},2).to({skewX:-825.5,skewY:-285.5,x:716.2,y:459},10).wait(23).to({regY:202.9,skewX:-764,skewY:-224,x:807.4,y:512},7).wait(27).to({scaleX:0.92,scaleY:0.82,skewX:-798.2,skewY:-215.6,x:819.8,y:525.7},2).to({regY:203.2,scaleX:0.94,scaleY:0.78,skewX:-815.1,skewY:-211.6,x:826,y:532.6},1).to({regX:89.7,regY:203.1,skewX:-836.4,skewY:-179.8,x:844.1,y:540.7},1).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:-160,skewX:-720,skewY:0,x:844.9,y:565},2).to({regX:90,regY:202.9,rotation:-179.3},23).to({regX:89.9,regY:202.8,rotation:-305,x:784.4,y:527.8},4).wait(46).to({regX:90,scaleX:0.88,scaleY:0.89,rotation:-360,skewX:-663.4,skewY:53.3,x:778.7,y:543.6},0).wait(1).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:-305,skewX:-720,skewY:0,x:784.4,y:527.8},0).to({rotation:-168,x:676.5,y:404.8},12).wait(10).to({regY:202.5,scaleX:0.89,scaleY:0.84,rotation:0,skewX:-543.2,skewY:169.7,x:738.9,y:487.7},2).to({regX:89.8,regY:202.8,scaleX:0.88,scaleY:0.9,skewX:-688.7,skewY:207.1,x:767.9,y:485.6},1).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-764,skewY:136,x:807.4,y:512},2).wait(13).to({regX:89.8,skewX:-759.2,skewY:140.8,x:759.2,y:497.5},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(480).to({_off:false},0).to({x:678.8,y:563.5},10).to({scaleX:0.68,scaleY:0.68,x:748,y:728.3},10).to({regX:39.5,regY:288.1,scaleX:0.49,scaleY:0.56,rotation:0,skewX:-37.8,skewY:-34.7,x:735.6,y:661.2},12).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:-21,skewX:0,skewY:0,x:678.8,y:563.5},11).to({scaleX:0.68,scaleY:0.68,x:748,y:728.3},10).to({regY:288.3,scaleX:0.64,scaleY:0.64,x:755.5,y:735.2},9).to({_off:true,regX:89.8,regY:202.9,scaleX:0.97,scaleY:0.97,rotation:0,skewX:-45.2,skewY:134.8,x:752.6,y:482,mode:"independent"},1).wait(1090));

	// hand left
	this.instance_10 = new lib.hand("single",0);
	this.instance_10.setTransform(811.9,1379.9,0.581,0.581,149,0,0,39.6,288.2);

	this.instance_11 = new lib.forarm();
	this.instance_11.setTransform(687.8,426.2,0.888,0.888,0,-45.2,134.8,89.9,202.9);
	this.instance_11._off = true;

	this.instance_12 = new lib.handcopy("single",2);
	this.instance_12.setTransform(915.1,702.9,0.581,0.581,-96.5,0,0,39.6,288.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({y:712.9},102).to({x:851,y:654.3,startPosition:3},12).to({regX:39.4,rotation:120.2,x:908.8,y:479},5).to({regX:39.6,rotation:30.8,x:731.8,y:318},7).wait(1).to({rotation:30.8,startPosition:4},0).to({regY:288.3,rotation:-40.7,x:553.9,y:370.9},4).to({rotation:-120.1,x:539.2,y:506.5},4).to({regY:288.2,rotation:-78.6,x:566.6,y:218.9},5).to({regX:39.5,rotation:-21.8,x:554.6,y:364.9},4).to({rotation:-120.1,x:564.6,y:514.9},4).to({regX:39.6,rotation:-78.6,x:566.6,y:218.9},5).to({regX:39.5,rotation:-21.8,x:554.6,y:364.9},4).to({rotation:-120.1,x:564.6,y:514.9},4).wait(1).to({x:566.6,y:500.9,startPosition:6},0).to({regX:39.4,rotation:-7.5,x:587.8,y:220.4},3).to({x:621,y:318.2,startPosition:10},6).to({regX:39.3,rotation:-45.9,x:552.1,y:460.6},11,cjs.Ease.get(1)).wait(1).to({startPosition:8},0).to({regX:39.2,rotation:-124.4,x:662.4,y:604.2,startPosition:5},2).to({regX:39.3,scaleX:0.58,scaleY:0.58,rotation:-226.6,x:785.8,y:633.5,startPosition:8},2).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:-287.9,x:865.4,y:601.4,startPosition:3},1).to({regY:288.1,rotation:-307.4,x:900.5,y:548.7},7).to({startPosition:3},9).to({regX:39.2,regY:287.9,rotation:-264.7,x:861.2,y:621.6},4).to({regX:39.6,regY:288.2,rotation:-211,x:811.9,y:712.9,startPosition:0},5).wait(69).to({startPosition:0},0).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:-138.4,x:641.5,y:662.7},2).to({regY:288,rotation:-102.1,x:585.5,y:587.9},1).to({regX:39.6,rotation:-102.9,x:595.5,y:390.6},2).to({regX:39.4,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:-7.5,x:621,y:318.2,startPosition:10},1).to({rotation:-52.9,x:591.7,y:257.6},14).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:42.9,x:784.9,y:276.9,startPosition:4},1).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:90.5,x:929,y:436.9,startPosition:6},1).to({regX:39.5,regY:288.1,scaleX:0.59,scaleY:0.57,rotation:0,skewX:-75.9,skewY:-73.2,x:994.5,y:634,startPosition:7},1).to({scaleX:0.59,scaleY:0.57,skewX:-7.6,skewY:-5.1,x:900.8,y:645.3},10).to({regX:39.4,scaleX:0.6,scaleY:0.56,skewX:-0.1,skewY:2.2,x:788.2,y:645.9},12).to({regY:288.2,scaleX:0.61,scaleY:0.55,skewX:16.5,skewY:18.6,x:638.6,y:630.2},13).to({regX:39.5,regY:288.1,scaleX:0.61,scaleY:0.55,skewX:34.5,skewY:36.4,x:517.9,y:564.5},14).to({regX:39.4,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:102.2,skewX:0,skewY:0,x:766.1,y:516.2,startPosition:3},1).to({regX:39.3,rotation:55,x:960.2,y:485.3},10).wait(29).to({startPosition:3},0).to({rotation:84.8,x:925.1,y:620.5},2).to({regX:39.6,rotation:149,x:811.9,y:712.9,startPosition:0},2).wait(22).to({startPosition:0},0).to({rotation:139.8,x:824.3,y:717},6).to({scaleX:0.58,scaleY:0.58,rotation:0,skewX:137.7,skewY:137.6,x:815.5,y:720.9},28).to({scaleX:0.58,scaleY:0.58,rotation:139.8,skewX:0,skewY:0,x:824.3,y:717},20).to({scaleX:0.58,scaleY:0.58,rotation:139.9,x:749.7,y:658.7,startPosition:3},1).to({scaleX:0.58,scaleY:0.58,rotation:139.8,x:695.3,y:619.3},4).to({_off:true},1).wait(62).to({_off:false,regY:288.3,scaleX:0.64,scaleY:0.64,rotation:-21,x:755.5,y:735.2,startPosition:2},1).to({startPosition:2},13).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},1).wait(13).to({startPosition:0},0).to({scaleX:0.6,scaleY:0.56,rotation:0,skewX:145.4,skewY:152.5,x:793.8,y:739.3},4).to({regY:288.1,scaleX:0.6,scaleY:0.59,skewX:129.4,skewY:123.4,x:715,y:528.9,startPosition:3},3).to({skewX:145.9,skewY:139.9,x:691.9,y:468.7},3).to({regX:39.7,regY:288,scaleX:0.6,scaleY:0.59,skewX:114.5,skewY:108.5,x:759.8,y:570.1},3).to({regX:39.6,regY:288.1,scaleX:0.6,scaleY:0.59,skewX:72.7,skewY:66.7,x:918.8,y:632.3},4).to({regY:287.9,scaleY:0.59,skewX:101.8,skewY:95.8,x:794.9,y:588.4},2).to({regY:288.1,scaleY:0.59,skewX:145.9,skewY:139.9,x:689.9,y:480.4},3).to({scaleX:0.6,scaleY:0.59,skewX:116.6,skewY:110.6,x:752.2,y:558.7},2).to({scaleX:0.6,scaleY:0.59,skewX:72.7,skewY:66.7,x:918.8,y:632.3},3).to({skewX:145.9,skewY:139.9,x:691.9,y:468.7},5).to({scaleX:0.58,scaleY:0.58,rotation:129.8,skewX:0,skewY:0,x:686.8,y:587.8},4).wait(1).to({regY:288.2,rotation:149,x:811.9,y:712.9},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:143.8,x:938.7,y:550.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:91.8,x:909.9,y:390},2).to({scaleX:0.58,scaleY:0.58,rotation:49.4,x:778.4,y:263.2},3).to({rotation:20.8,x:665.8,y:246.1},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:6.8,x:622.9,y:260.3,startPosition:6},1).to({regX:39.6,rotation:-57.9,x:550,y:386.9},5).wait(26).to({rotation:-57.9},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:-38.4,x:636.6,y:285.2},2).to({scaleX:0.58,scaleY:0.58,rotation:-19,x:723.1,y:226.4},2).to({regX:39.5,regY:288.2,rotation:33.3,x:766.3,y:210.6},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:27.7,x:860.4,y:341.4},3).to({regY:288.2,rotation:42.6,x:892.4,y:442.3},2).to({scaleX:0.58,scaleY:0.58,rotation:57.5,x:885.3,y:543.1},2).to({rotation:64.7,x:882.7,y:563.6},10).wait(23).to({startPosition:6},0).to({rotation:149,x:831.4,y:732.4,startPosition:0},7).wait(19).to({x:811.9,y:712.9},0).wait(16).to({startPosition:0},0).to({rotation:103,x:888.2,y:646.5,startPosition:8},5).to({x:970.3,y:433.4},5).wait(1).to({regY:288.1,rotation:33.6,x:960.6,y:458.7,startPosition:6},0).to({rotation:33.6,x:1021.2,y:403.9},4).to({regX:39.5,rotation:45.3,x:1063.5,y:435.2},8).wait(21).to({startPosition:6},0).to({regX:39.6,rotation:115.4,x:981,y:599.3},3).to({scaleX:0.58,scaleY:0.58,rotation:123.8,x:938.8,y:627.8},1).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(13).to({startPosition:0},0).wait(9).to({startPosition:9},0).to({scaleX:0.58,scaleY:0.58,rotation:131.9,x:807.2,y:645.9},5).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:174.2,x:723.7,y:464.3},6).wait(1).to({regY:287.9,rotation:26.2,x:732.9,y:293.9,startPosition:11},0).to({regX:39.8,regY:288.2,rotation:-47.4,x:704.4,y:164.4},5).wait(18).to({rotation:-47.4},0).to({scaleX:0.56,scaleY:0.53,rotation:22.6,x:789.7,y:208.9},2).to({scaleX:0.55,scaleY:0.51,rotation:57.7,x:832.4,y:260.3},1).to({regY:288.1,scaleX:0.54,scaleY:0.46,rotation:56.4,x:890,y:439.1},2).to({regX:39.7,scaleX:0.52,scaleY:0.41,rotation:196.1,x:861.8,y:602.3,startPosition:3},2).wait(25).to({startPosition:3},0).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},6).wait(19).to({startPosition:0},0).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:190.5,x:665.8,y:644.9},2).to({regX:39.6,regY:288,rotation:232.1,x:597.6,y:459.8},2).to({regX:39.7,regY:287.9,rotation:297.6,x:622,y:301.4},2).to({regX:39.8,regY:288.3,scaleX:0.61,scaleY:0.58,rotation:360,skewX:9.2,skewY:-7,x:659.6,y:212.4},1).to({regX:39.6,regY:288.2,scaleX:0.58,rotation:330.3,skewX:0,skewY:0,x:669.4,y:222.2},2).wait(48).to({regY:288.3,rotation:327.5,x:669.3,startPosition:4},0).to({rotation:318.5,x:609.7,y:260.2},11).wait(2).to({startPosition:4},0).to({regY:288.4,rotation:350.3,x:613.7,y:209.5},5).to({regY:288.3,rotation:318.5,x:609.7,y:260.2},6).wait(3).to({startPosition:4},0).to({regY:288.4,rotation:350.3,x:613.7,y:209.5},7).to({regY:288.3,rotation:318.5,x:609.7,y:260.2},6).wait(3).to({startPosition:4},0).to({rotation:250.7,x:593.2,y:476.4},2).to({regY:288.2,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(35).to({startPosition:0},0).to({regX:39.5,regY:288.1,rotation:138,x:838.3,y:730.2},4).to({startPosition:0},5).to({regY:288.2,rotation:142.8,x:850,y:717.2},7).wait(1).to({startPosition:0},0).to({startPosition:0},6,cjs.Ease.get(1)).wait(8).to({startPosition:0},0).wait(22).to({startPosition:0},0).to({regX:39.6,rotation:149,x:811.9,y:712.9},4).wait(13).to({startPosition:0},0).to({x:859.9,y:674},2).to({_off:true},1).wait(51).to({_off:false,rotation:328.6,x:642,y:326.9,startPosition:10},0).to({regY:288.3,rotation:345.1,x:564,y:416.9},4).to({regY:288.2,rotation:284.6},6).wait(25).to({startPosition:10},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:216.8,x:628,y:604.9},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(15).to({startPosition:9},0).to({regX:39.7,rotation:122,x:944.6,y:661.7},2).to({regX:39.6,rotation:15.5,x:893.9,y:434.9},3).wait(25).to({rotation:36.5,x:893.8},0).wait(2).to({rotation:15.5,x:893.9},0).to({regY:288.3,rotation:2.8,x:707.8,y:354.9},5).wait(1).to({rotation:2.8,startPosition:10},0).wait(19).to({regX:39.5,regY:288.2,rotation:-21.5},0).to({x:587.8,y:248.9,startPosition:4},5).wait(11).to({startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,rotation:-29.8,x:554.4,y:427.3},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:-114.7,x:694.3,y:650.2},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:0,skewX:-116.7,skewY:-117.1,x:698.5,y:658.5},3).to({regX:39.5,scaleX:0.56,scaleY:0.6,skewX:-120.3,skewY:-118,y:683},4).to({regY:288.1,scaleX:0.54,scaleY:0.62,skewX:-120.7,skewY:-115.5,x:702.7,y:691.5},3).to({regX:39.6,scaleX:0.55,scaleY:0.62,skewX:-122.2,skewY:-118.1,x:710.9,y:696.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,skewX:0,skewY:0,x:811.9,y:712.9,startPosition:0},9).wait(20).to({startPosition:3},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:143.8,x:938.7,y:550.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:91.8,x:909.9,y:390},2).to({scaleX:0.58,scaleY:0.58,rotation:49.4,x:778.4,y:263.2},3).to({rotation:20.8,x:665.8,y:246.1},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:6.8,x:622.9,y:260.3,startPosition:6},1).to({regX:39.6,rotation:-57.9,x:550,y:386.9},5).wait(5).to({rotation:-57.9},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:-38.4,x:636.6,y:285.2},2).to({scaleX:0.58,scaleY:0.58,rotation:-19,x:723.1,y:226.4},2).to({regX:39.5,regY:288.2,rotation:33.3,x:766.3,y:210.6},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:27.7,x:860.4,y:341.4},3).to({regY:288.2,rotation:42.6,x:892.4,y:442.3},2).to({scaleX:0.58,scaleY:0.58,rotation:57.5,x:885.3,y:543.1},2).to({rotation:64.7,x:882.7,y:563.6},10).wait(23).to({startPosition:6},0).to({rotation:149,x:831.4,y:732.4,startPosition:0},7).to({_off:true},1).wait(26).to({_off:false,regX:39.5,rotation:260.2,x:858,y:750.9,startPosition:2},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:323.7,x:852.7,y:688.3},2).to({regX:39.6,regY:288.2,rotation:333.1,x:836.1,y:647.4},1).to({regX:39.5,rotation:191.5,x:816.6,y:436.6},1).to({scaleX:0.58,scaleY:0.58,rotation:184.5,x:770.9,y:329.8},2).to({x:704.9,y:371.8},22).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:187.9,x:699.6,y:373.2},1).to({regX:39.4,regY:288.2,rotation:269.1,x:644.4,y:512.6,startPosition:4},1).wait(1).to({rotation:220.1,x:651.1,y:590.9},0).wait(1).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:171.3,x:657.6,y:669.1},0).wait(11).to({x:748.6,y:703},0).to({_off:true},5).wait(33).to({_off:false,regX:39.4,regY:288.3,rotation:205.6,x:722.8,y:802.9,startPosition:6},0).to({regY:288.4,rotation:258.8,x:529.6,y:505.8},6).to({regX:39.3,scaleX:0.58,scaleY:0.58,rotation:283.1,x:517.1,y:355.4},3).to({regX:39.5,regY:288.3,scaleX:0.58,scaleY:0.58,rotation:330.4,x:554.7,y:226.9},3).wait(10).to({y:227.9},0).to({regX:39.4,regY:288.4,scaleX:0.58,scaleY:0.58,rotation:339,x:593.6,y:376.5},2).to({regY:288.3,rotation:284.5,x:570.3,y:562.3},1).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},2).wait(13).to({startPosition:0},0).to({rotation:153.8,x:747.1,y:698.1},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(480).to({_off:false},0).to({x:676.1,y:332.4},10).to({scaleX:1.03,scaleY:1.03,x:744.9,y:459.5},10).to({regX:89.8,scaleX:0.73,scaleY:0.73,skewX:-43.8,skewY:140.8,x:732.9,y:459.6},12).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-45.2,skewY:134.8,x:676.1,y:332.4},11).to({scaleX:1.03,scaleY:1.03,x:744.9,y:459.5},10).to({regX:89.8,scaleX:0.97,scaleY:0.97,x:752.6,y:482},9).to({_off:true,regX:39.6,regY:288.3,scaleX:0.64,scaleY:0.64,rotation:-21,skewX:0,skewY:0,x:755.5,y:735.2,mode:"single",startPosition:2},1).wait(1091));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1114).to({_off:false},0).to({regY:288.1,rotation:-131,x:958,y:555.9},16).to({regY:288.2,rotation:-112.3,x:946.1,y:532.9},10).wait(1).to({regX:39.7,rotation:-123.5,x:921.1,y:527.9,startPosition:7},0).to({x:918.1,y:425.9},7).wait(11).to({x:888.1,y:424.9},0).to({regX:39.8,scaleX:0.58,scaleY:0.58,rotation:-123.4,x:827.6,y:317.7},2).to({regX:39.7,scaleX:0.58,scaleY:0.58,rotation:-123.5,x:642,y:326.9},3).to({_off:true},1).wait(469));

	// head
	this.instance_13 = new lib.headdown("single",0);
	this.instance_13.setTransform(994.7,995.6,1.057,1.057,0,0,0,112.4,278.6);

	this.instance_14 = new lib.head("single",0);
	this.instance_14.setTransform(994.7,328.7,1.057,1.057,0,0,0,112.4,278.6);
	this.instance_14._off = true;

	this.instance_15 = new lib.head34("synched",1);
	this.instance_15.setTransform(945,294.6,1.081,1.081,0,0,0,112.4,278.6);
	this.instance_15._off = true;

	this.instance_16 = new lib.headup("synched",3);
	this.instance_16.setTransform(945,242.5,1.057,1.105,0,3,-177,112.3,278.7);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({scaleX:0.95,scaleY:0.95,x:972.9,y:322},101).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},1).wait(121).to({_off:false,regX:136.6,regY:167.5,scaleX:1,scaleY:1,x:993.6,y:201.2,mode:"independent"},0).to({x:1001.4,mode:"synched",startPosition:0},2).to({x:1013.1,startPosition:3},3).to({x:993.6,startPosition:0},5).to({x:1013.1,mode:"single"},5).to({x:993.6,mode:"independent"},5).to({x:1013.1,mode:"single",startPosition:0},5).to({x:993.6},5).to({_off:true},29).wait(193).to({_off:false,regX:112.4,regY:278.6,scaleX:1,scaleY:1,rotation:-1.3,x:937.3,y:305.6,mode:"synched",startPosition:9},0).to({x:1001.8,y:348.7,startPosition:2},5).to({x:996,y:372.2,startPosition:0},10).to({startPosition:10},10).to({startPosition:10},12).to({startPosition:9},11).to({startPosition:0},10).to({scaleX:1,scaleY:1,rotation:-1,x:995.8,y:367.5,mode:"single",startPosition:1},4).to({scaleX:1.01,scaleY:1.01,rotation:-0.8,x:995.6,y:360.4,startPosition:0},6).to({scaleX:0.98,scaleY:0.98,rotation:0,x:994.8,y:329.9},13).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},1).wait(201).to({_off:false,scaleX:0.96,scaleY:0.96,rotation:54,x:1051.9,y:322.1,mode:"synched",startPosition:11},1).wait(16).to({mode:"single",startPosition:0},0).wait(5).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:30.8,x:1027.4,y:325},3).to({regX:112.3,scaleX:1.01,scaleY:1.01,rotation:23.1,x:1019.2,y:326},1).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,rotation:0,x:994.7,y:328.7},3).wait(63).to({_off:false,regX:112.3,scaleX:0.91,scaleY:0.91,skewX:-1.3,skewY:178.7,x:981.2,y:299.4,mode:"synched",startPosition:4},1).wait(5).to({startPosition:1},0).to({x:965.5,startPosition:5},8).to({x:981.2,mode:"single",startPosition:0},12).to({x:1004.6},5).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,skewX:0,skewY:0,x:994.7,y:328.7},1).wait(282).to({_off:false,scaleX:0.95,scaleY:0.95,x:978.7,y:322.7,mode:"synched"},0).wait(1).to({startPosition:1},0).to({startPosition:5},4).to({regX:112.3,scaleX:1.01,scaleY:1.01,x:978.6,y:346.7,startPosition:11},6).wait(25).to({startPosition:0},0).to({scaleX:0.98,scaleY:0.98,x:980,y:327.7,startPosition:5},5).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},1).wait(93).to({_off:false,scaleX:0.99,scaleY:0.99,skewX:-7.3,skewY:172.7,x:1035.6,y:293.7,mode:"synched"},0).to({x:1019.6,y:323.7},3).to({x:1029.6,y:357.7},4).to({x:1075.6,y:349.7},3).to({x:1069.6,y:301.7},3).to({x:1049.6,mode:"single",startPosition:4},4).to({x:1019.6,y:295.7,startPosition:0},5).to({_off:true},20).wait(292));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(101).to({_off:false},1).to({x:976.1,y:326.2,mode:"synched"},7).to({x:965.4,y:324.8,mode:"single"},4).to({_off:true,scaleX:1.08,scaleY:1.08,x:945,y:294.6,mode:"synched",startPosition:1},1).wait(99).to({_off:false,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},0).to({_off:true},10).wait(59).to({_off:false},0).to({x:961.5,y:311.1},3).to({_off:true},1).wait(86).to({_off:false,scaleX:1.08,scaleY:1.08,rotation:-5.3,x:997.7,y:321.9,startPosition:4},0).to({rotation:-6.8,x:996.3,y:322.2,startPosition:3},2).to({regX:112.5,regY:278.7,scaleX:1.08,scaleY:1.08,rotation:-12.3,x:995.4,y:323.2,startPosition:4},7).to({regX:112.4,regY:278.6,scaleX:1.08,scaleY:1.08,rotation:-16.2,x:995.7,y:323.9},5).wait(8).to({startPosition:4},0).to({scaleX:1.06,scaleY:1.06,rotation:0,x:994.7,y:328.7,startPosition:0},4).wait(22).to({startPosition:0},0).to({regX:112.5,rotation:-7.6,x:954.3,y:314.9},5).to({_off:true,regX:112.4,regY:278.7,rotation:-9.2,x:954.8,y:245.9,mode:"synched"},1).wait(130).to({_off:false,regY:278.6,rotation:0,x:994.7,y:328.7,mode:"single"},1).wait(13).to({startPosition:0},0).to({scaleX:1.14,scaleY:0.99,x:990,y:381.1},4).to({scaleX:1.02,scaleY:1.14,x:1000.5,y:321.9},3).to({_off:true},1).wait(24).to({_off:false,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},4).wait(1).to({startPosition:0},0).to({x:994.8},3).to({x:994.7},2).to({x:994.8},3).to({x:994.7},2).to({startPosition:0},1).to({mode:"synched"},5).to({_off:true},26).wait(21).to({_off:false,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).to({regY:278.7,rotation:26.2,x:970.1,y:343.1,mode:"single",startPosition:4},22).wait(1).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},7).wait(19).to({startPosition:0},0).wait(16).to({startPosition:0},0).to({_off:true},5).wait(43).to({_off:false},3).wait(13).to({startPosition:0},0).wait(9).to({mode:"synched"},0).to({rotation:6.6,x:1005.5,y:325.7,startPosition:5},5).to({regX:112.3,rotation:13.5,x:1016.1,y:322.8,mode:"single",startPosition:0},5).to({_off:true,rotation:0,skewX:11.7,skewY:-168.3,x:1024,y:260.5,mode:"synched"},1).wait(61).to({_off:false,regX:112.4,skewX:0,skewY:0,x:994.7,y:328.7,mode:"single"},1).wait(19).to({startPosition:0},0).to({_off:true},1).wait(97).to({_off:false,regY:278.4,rotation:-17.8,x:978.3,y:302.4,startPosition:4},0).wait(2).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},5).to({_off:true},35).wait(53).to({_off:false,regY:278.7,rotation:-4.2,x:998.1,y:322.9},0).to({regY:278.6,rotation:0,x:994.7,y:328.7},4).wait(13).to({startPosition:0},0).to({_off:true},3).wait(91).to({_off:false},1).to({_off:true},15).wait(120).to({_off:false},0).to({x:994.8},3).to({x:994.7},2).to({x:994.8,mode:"synched"},3).to({x:994.7},2).to({startPosition:0},1).to({startPosition:0},5).to({_off:true},5).wait(21).to({_off:false,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).to({regY:278.7,rotation:26.2,x:970.1,y:343.1,mode:"single",startPosition:4},22).wait(1).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},7).wait(1).to({startPosition:0},0).wait(26).to({startPosition:0},0).to({rotation:-2.2,x:1031.3,y:322.1,mode:"synched"},6).to({startPosition:0},23).to({rotation:2.8,x:942.4,y:318.8,mode:"single",startPosition:4},4).wait(10).to({startPosition:4},0).to({rotation:-17.4,x:958.4,y:314.8,mode:"synched"},5).wait(13).to({mode:"single",startPosition:0},0).wait(18).to({scaleX:1.08,scaleY:1.03,rotation:0,skewX:-18.5,skewY:-16.4,x:957.4,y:337.9,mode:"synched",startPosition:7},0).to({_off:true},1).wait(25).to({_off:false,scaleX:1.06,scaleY:1.06,skewX:0,skewY:0,x:994.7,y:328.7,mode:"single",startPosition:0},2).wait(13).to({mode:"synched"},0).to({rotation:3.8,x:932.6,y:299.4,startPosition:7},7).to({_off:true,rotation:4.5,x:951.5,y:238.2,startPosition:8},1).wait(64));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(113).to({_off:false},1).to({startPosition:2},12).wait(1).to({startPosition:3},0).to({rotation:6,x:980.7,y:281,startPosition:7},4).to({rotation:0,x:983,y:298.6,startPosition:6},4).to({x:978.2,y:298.5,startPosition:1},5).to({startPosition:5},4).to({startPosition:9},4).to({startPosition:1},3).to({startPosition:1},2).to({startPosition:5},4).to({startPosition:9},4).to({x:946.2,y:278.5,startPosition:1},3).to({_off:true},1).wait(138).to({_off:false,x:945,y:294.6,mode:"single",startPosition:15},0).to({scaleY:1.08,skewX:3.1,x:990.8},2).to({skewX:2.8,x:982.8,y:294.3,startPosition:0},3).to({scaleY:1.08,skewX:2.5,x:977.5,y:294.2,startPosition:4},2).to({regX:112.5,skewX:2.3,skewY:-0.3,x:969.8,y:293.9,startPosition:21},3).to({skewX:2,x:964.4,y:293.7,startPosition:16},2).to({regY:278.5,scaleX:1.08,skewX:1.5,skewY:-0.8,x:943.4,y:292.9,startPosition:11},8).to({skewX:1.3,x:938.1,y:292.7,startPosition:6},2).to({regX:112.6,regY:278.6,skewX:1,x:930.2,y:292.5,startPosition:5},3).to({scaleX:1.08,skewX:0.6,skewY:-1,x:916.9,y:292.1,startPosition:11},5).to({regY:278.5,scaleY:1.08,skewX:0.3,skewY:-1.1,x:911.6,y:291.8,startPosition:5},2).to({skewX:0.1,skewY:-1.3,x:906.3,y:291.6,startPosition:12},2).to({skewX:0,skewY:-1.5,x:898.4,y:291.3,startPosition:2},3).to({skewY:-1.6,x:893.1,y:291.1,startPosition:18},2).to({skewY:-1.8,x:887.8,y:291,startPosition:6},2).to({regX:112.4,regY:278.6,skewY:-2.1,x:882.5,y:290.8,startPosition:15},2).to({scaleX:1.08,skewY:-180,x:905.9,y:288.7,startPosition:5},1).to({scaleY:1.08,skewX:-3,x:892.7},7).wait(1).to({scaleY:1.08,skewX:0,x:931.3,y:292.6,startPosition:0},0).to({x:941.1,startPosition:10},2).to({x:987.9,y:304.3,startPosition:15},4).to({x:1009.3,y:302.3,startPosition:3},2).to({y:304.3,startPosition:7},2).to({startPosition:4},2).to({_off:true},5).wait(206).to({_off:false,scaleX:1.07,scaleY:1.1,skewY:0,x:977.2,y:292.4,mode:"synched",startPosition:0},0).to({startPosition:2},2).to({startPosition:5},3).to({startPosition:9},4).to({startPosition:11},2).to({startPosition:2},3).to({startPosition:4},2).to({startPosition:9},3).to({startPosition:2},5).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},4).wait(296).to({_off:false,regX:112.3,rotation:5.9,x:977.6,y:297.6,mode:"synched"},0).to({x:1012.7},6).wait(40).to({mode:"single"},0).wait(10).to({startPosition:0},0).to({regY:278.5,rotation:-2.1,x:965.4,y:282.5},10).to({_off:true,rotation:0,skewX:3,skewY:-177,x:962.5,y:240,startPosition:8},1).wait(72).to({_off:false,regX:112.4,regY:278.6,skewX:0,skewY:-180,x:1014.6,y:300.7,startPosition:0},0).to({regY:278.7,skewX:-11,skewY:-191,x:948,y:285,mode:"synched"},4).to({x:940,y:289,startPosition:6},5).to({skewX:13.4,skewY:-166.6,x:1004.1,y:299.6,startPosition:0},7).wait(7).to({skewX:13.4,x:1006.1,y:303.6,startPosition:1},0).to({_off:true},1).wait(49).to({_off:false,regY:278.6,skewX:0,skewY:0,x:980.7,y:320.7,startPosition:0},0).to({_off:true},16).wait(391).to({_off:false,rotation:2.8,x:930.4,y:296.8,startPosition:4},0).to({regY:278.7,rotation:-1.9,x:913,y:292.6,mode:"single"},12).wait(10).to({rotation:-1.9},0).to({rotation:-1,x:945.6,y:307},2).to({rotation:-0.5,x:962,y:314.2},1).to({_off:true,regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},2).wait(85));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(165).to({_off:false},0).to({regX:112.4,skewX:11.2,skewY:-168.8,x:944.9,startPosition:9},6).to({skewX:16.7,skewY:-163.3,x:986,y:251.4,startPosition:14},11,cjs.Ease.get(1)).to({skewX:14.5,skewY:-165.5,x:960.5,y:239.7,startPosition:0},6).to({startPosition:7},7).to({startPosition:16},9).to({x:985.9,y:261.1,startPosition:4},8).to({_off:true},1).wait(73).to({_off:false,skewX:11.2,skewY:-168.8,x:944.9,y:242.5,mode:"single",startPosition:5},0).to({startPosition:5},16).to({_off:true},1).wait(122).to({_off:false,scaleY:1.06,rotation:-9.2,skewX:0,skewY:0,x:954.8,y:245.9,mode:"synched",startPosition:0},1).to({scaleX:1.06,scaleY:1.06,rotation:0,skewX:-11.5,skewY:-11.3,x:927.1,y:245.1,startPosition:8},28).to({scaleX:1.06,scaleY:1.06,rotation:-9.2,skewX:0,skewY:0,x:954.8,y:245.9},20).to({_off:true},1).wait(174).to({_off:false,regY:278.6,rotation:0,x:1012.3,y:260.2,startPosition:4},0).to({rotation:-9,x:967.1,y:218.5,startPosition:9},5).to({regX:112.3,rotation:-8.8,startPosition:12},3).to({startPosition:14},2).to({regX:112.4,rotation:-9,startPosition:16},2).to({rotation:-2.3,x:1003.6,y:248.5,startPosition:5},9).to({_off:true,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).wait(70).to({_off:false,rotation:0,x:1010.3,y:262.2,startPosition:0},0).to({startPosition:5},5).to({startPosition:10},5).to({regX:112.3,scaleX:0.97,scaleY:0.97,rotation:47.2,x:1083.9,y:320.4,startPosition:17},7).to({_off:true,regX:112.4,scaleX:0.96,scaleY:0.96,rotation:54,x:1051.9,y:322.1,startPosition:11},1).wait(60).to({_off:false,regX:112.3,scaleX:1.06,scaleY:1.06,rotation:0,skewX:11.7,skewY:-168.3,x:1024,y:260.5,startPosition:0},1).wait(1).to({startPosition:1},0).wait(23).to({mode:"single",startPosition:4},0).to({x:992.8,y:246.8},3).to({x:957.6,y:239},3).to({_off:true,scaleX:0.91,scaleY:0.91,skewX:-1.3,skewY:-181.3,x:981.2,y:299.4,mode:"synched"},1).wait(117).to({_off:false,regY:278.5,scaleX:1.06,scaleY:1.06,skewX:3,skewY:-177,x:962.5,y:240,mode:"single",startPosition:8},1).wait(2).to({startPosition:4},0).to({x:950.8,y:224.3},5).to({x:962.5,y:240},6).wait(1).to({startPosition:8},0).wait(2).to({startPosition:4},0).to({x:950.8,y:224.3},7).to({x:962.5,y:240},6).to({_off:true},1).wait(66).to({_off:false,regX:112.4,regY:278.7,skewX:4.2,skewY:-175.8,x:972,y:254.9,mode:"synched",startPosition:0},0).wait(7).to({startPosition:0},0).to({_off:true},22).wait(36).to({_off:false,regY:278.6,skewX:0,skewY:0,x:1010.8,y:266.7},0).to({mode:"single",startPosition:7},18).to({_off:true},16).wait(57).to({_off:false,x:1016.7,y:264.6,startPosition:0},0).to({rotation:-13.2,x:947.6,y:259.7,mode:"synched"},5).wait(27).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(20).to({rotation:0,skewX:13.2,skewY:-166.8,x:935.5,y:267.7},0).to({x:1009.5,y:257.7},5).wait(11).to({startPosition:0},0).to({_off:true},5).wait(63).to({_off:false,skewX:0,skewY:0,x:1012.3,y:260.2,startPosition:4},0).to({rotation:-9,x:967.1,y:218.5,startPosition:9},5).to({regX:112.3,rotation:-8.8,startPosition:12},3).to({startPosition:14},2).to({regX:112.4,rotation:-9,startPosition:16},2).to({rotation:-2.3,x:1003.6,y:248.5,startPosition:5},9).to({_off:true,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).wait(184).to({_off:false,rotation:4.5,x:951.5,y:238.2,startPosition:8},1).to({_off:true},16).wait(48));

	// torso
	this.instance_17 = new lib.torso();
	this.instance_17.setTransform(974.1,1310.4,1,1,-7.6,0,0,144.5,370.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({y:643.4},102).to({rotation:-14.5,x:987.7,y:639.6},12).to({regY:370.8,scaleX:1,scaleY:1,y:639.5},12).wait(1).to({regY:370.9,scaleX:1,scaleY:1,rotation:-7.8,x:984.7,y:617.8},4).wait(31).to({rotation:-16.2,x:984.8,y:617.9},3).wait(6).to({regY:370.8,rotation:-10.8,x:989.8,y:628.7},11,cjs.Ease.get(1)).to({rotation:-13,x:979,y:616.6},6).wait(16).to({regY:370.9,rotation:-7.6,x:974.1,y:643.4},9).wait(69).to({rotation:-16.2,x:984.8,y:617.9},6).wait(14).to({scaleX:1.01,scaleY:0.99,rotation:0,skewX:-13.3,skewY:-16,x:1012.9},3).to({regY:370.8,scaleX:0.99,scaleY:1.01,skewX:-17.3,skewY:-16.3,x:984.6,y:617.8},22).to({regY:370.9,scaleX:0.97,scaleY:1.04,skewX:-22.3,skewY:-16.8,x:950.2,y:617.9},27).to({scaleX:0.97,scaleY:1.03,skewX:-19.8,skewY:-15.3,x:954.2,y:622.1},1).to({scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},10).wait(55).to({rotation:-16.8,x:973.2,y:622.5},6).to({regX:144.6,scaleX:1,scaleY:1,rotation:0,skewX:-19,skewY:-18.9,x:960.4,y:620.9},28).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.8,skewX:0,skewY:0,x:973.2,y:622.5},20).to({rotation:-8.8,x:980.1,y:619.7},6).wait(20).to({scaleX:1,rotation:0,skewX:-8.8,skewY:-5.7},12).to({scaleX:1,skewY:-13.8},11).to({scaleX:1,rotation:-8.8,skewX:0,skewY:0},10).to({rotation:-8.3,x:978.4,y:626.1},10).wait(13).to({rotation:-7.6,x:974.1,y:643.4},1).wait(13).to({regX:144.4,scaleX:1.07,scaleY:0.94,rotation:0,skewX:-8.7,skewY:-6.6,x:967.7,y:674.5},4).to({scaleX:0.97,scaleY:1.08,skewX:-6.8,skewY:-8.5,x:980.5,y:660.7},3).to({scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},3).to({regX:144.3,scaleX:0.97,scaleY:1.06,skewY:-8,x:979.1,y:657.2},3).to({scaleX:0.98,scaleY:1.05,x:978.2,y:654.8},4).to({regX:144.4,scaleX:0.97,scaleY:1.06,x:978.9,y:656.4},2).to({scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},3).to({scaleX:0.97,scaleY:1.06,skewY:-8,x:979.2,y:657.3},2).to({regX:144.3,scaleX:0.98,scaleY:1.05,x:978.2,y:654.8},3).to({regX:144.4,scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},5).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},4).wait(1).to({regX:144.4,rotation:-7.5,x:974},3).to({regX:144.5,rotation:-7.6,x:974.1},2).to({regX:144.4,rotation:-7.5,x:974},3).to({scaleX:1,scaleY:1,y:643.3},2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},1).wait(31).to({regY:370.8,rotation:-16.6,x:989.1,y:601},5).to({regX:144.4,scaleX:1,scaleY:1,rotation:-16.5,x:989,y:601.1},3).wait(2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.6,x:989.1,y:601},2).to({regY:370.9,rotation:-9.3,x:978.4,y:634.2},10).wait(23).to({rotation:-7.6,x:974.1,y:643.4},7).wait(50).to({rotation:4.2,x:968.7,y:660.1},8).wait(21).to({rotation:4.2},0).to({rotation:-0.8,x:971,y:653},3).to({regX:144.6,rotation:-2.3,x:971.9,y:650.6},1).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},3).wait(22).to({rotation:-4.8,x:975.8,y:639.2},5).to({regX:144.4,rotation:-1.8,x:977.9,y:634.2},6).wait(1).to({rotation:-1.8},0).wait(23).to({rotation:-7.3,x:977.3,y:625.5},3).to({rotation:-14.8,x:976.5,y:613.9},4).wait(25).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},6).wait(19).to({regX:144.4,rotation:-1.6,x:976.4,y:635.9},7).wait(50).to({rotation:-1.6},0).to({rotation:-10.6,x:977.6,y:620.9},11).wait(32).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},5).wait(35).to({regY:370.8,rotation:-18.6,x:984.1,y:631},4).wait(5).to({rotation:-13.8,x:1003.5,y:630.5},7).wait(37).to({regY:370.9,rotation:-7.6,x:974.1,y:643.4},4).wait(123).to({rotation:-20.8,x:998.8,y:638.8},5).wait(52).to({regY:370.8,rotation:-4.3,x:976.8,y:630.8},5).wait(11).to({rotation:-4.3},0).wait(5).to({scaleX:1,scaleY:1,rotation:0,skewX:-6.8,skewY:-6.2,x:979.6,y:629.9},3).to({scaleX:1.01,scaleY:0.99,skewX:-6.9,skewY:-10.7,y:631.7},4).to({regX:144.6,regY:370.9,scaleX:1.03,scaleY:0.98,skewX:-3.2,skewY:-12.3,x:987.9,y:630.9},3).to({regX:144.5,scaleX:1.02,scaleY:0.99,skewX:-6.2,skewY:-13.5,x:992.9,y:630.3},3).to({scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},9).wait(20).to({regX:144.4,rotation:-7.5,x:974},3).to({regX:144.5,rotation:-7.6,x:974.1},2).to({regX:144.4,rotation:-7.5,x:974},3).to({scaleX:1,scaleY:1,y:643.3},2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},1).wait(10).to({regY:370.8,rotation:-16.6,x:989.1,y:601},5).to({regX:144.4,scaleX:1,scaleY:1,rotation:-16.5,x:989,y:601.1},3).wait(2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.6,x:989.1,y:601},2).to({regY:370.9,rotation:-9.3,x:978.4,y:634.2},10).wait(23).to({rotation:-7.6,x:974.1,y:643.4},7).wait(27).to({regX:144.4,rotation:-3.3,x:977.3,y:632.4},6).wait(23).to({regX:144.3,rotation:-16.5,x:974.6,y:627.3},4).wait(46).to({scaleX:1.02,scaleY:0.97,rotation:0,skewX:-17.5,skewY:-15.6,x:974.1,y:639.6},0).wait(1).to({scaleX:1,scaleY:1,rotation:-16.5,skewX:0,skewY:0,x:974.6,y:627.3},0).to({regX:144.4,rotation:-21.2,x:984.4,y:618.2},12).wait(10).to({regX:144.5,scaleX:1,scaleY:1,rotation:-15.8,x:980.3,y:628.2},2).to({rotation:-13,x:978.2,y:633.2},1).to({scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},2).wait(13).to({rotation:-19.5,x:977.3,y:612.8},8).to({_off:true},16).wait(48));

	// waist
	this.instance_18 = new lib.waist();
	this.instance_18.setTransform(1007,1379.6,1,1,0,0,0,177.2,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).to({y:712.6},102).wait(80).to({regX:177.3,rotation:-2.2,x:999.5,y:699.7},6).wait(16).to({regX:177.2,rotation:0,x:1007,y:712.6},9).wait(89).to({scaleY:1,skewX:3.1,x:1029.9},3).to({regY:98.9,scaleY:1,skewX:-1.3,x:1009.2,y:712.7},22).to({regY:98.8,scaleY:1.01,skewX:-6.8,x:983.7,y:712.6},27).to({scaleY:1.01,skewX:-5.5,x:987.6},1).to({scaleY:1,skewX:0,x:1007},10).wait(61).to({scaleX:1,scaleY:1,skewX:-2.3,skewY:-2.1,x:997.7,y:709.9},28).to({scaleX:1,scaleY:1,skewX:0,skewY:0,x:1007,y:712.6},20).to({regX:177.3,rotation:8,x:1001.1,y:713.6},6).wait(53).to({rotation:5.8,x:1002.7,y:713.3},10).wait(13).to({regX:177.2,rotation:0,x:1007,y:712.6},1).wait(13).to({scaleX:1.07,scaleY:0.93,x:1003.1,y:739},4).to({scaleX:0.96,scaleY:1.08,x:1012.3,y:735.2},3).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},3).to({scaleX:0.97,scaleY:1.06,x:1011.2,y:730.5},3).to({scaleX:0.98,scaleY:1.05,x:1010.4,y:727.4},4).to({scaleX:0.97,scaleY:1.06,x:1010.9,y:729.7},2).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},3).to({scaleX:0.97,scaleY:1.06,x:1011.2,y:730.7},2).to({scaleX:0.98,scaleY:1.05,x:1010.4,y:727.4},3).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},5).to({scaleX:1,scaleY:1,x:1007,y:712.6},4).wait(693).to({scaleX:1,scaleY:1,skewX:-2.6,skewY:-1.9,x:1013.4,y:710.7},3).to({scaleX:1,scaleY:1,skewY:-6.5,y:709.9},4).to({scaleX:1.02,scaleY:1,skewX:1.1,skewY:-8.3,x:1016.7,y:707.9},3).to({scaleX:1.01,skewX:-1.8,skewY:-9.4,x:1025.7,y:706.7},3).to({scaleX:1,scaleY:1,skewX:0,skewY:0,x:1007,y:712.6},9).wait(199).to({scaleX:1.03,scaleY:0.97,x:1007.3,y:722},0).wait(1).to({scaleX:1,scaleY:1,x:1007,y:712.6},0).wait(48).to({_off:true},16).wait(48));

	// shoulder left
	this.instance_19 = new lib.shoulder();
	this.instance_19.setTransform(853.2,1066.3,0.888,0.888,0,-22.2,157.8,73.8,95.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({y:399.4},102).to({regX:73.7,regY:95.4,skewX:8.5,skewY:188.5,x:823.9,y:430.8},12).wait(12).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,x:825,y:430.4},1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:34,skewY:214,x:851.6,y:402.5},4).to({skewX:28,skewY:208,x:837.1,y:389.9},4).to({regY:95.4,skewX:65.9,skewY:245.9,x:863.2,y:377},5).to({regX:73.7,skewX:26.2,skewY:206.2,x:839.3,y:405.1},4).to({skewX:43.1,skewY:223.1,y:389.1},4).to({regX:73.8,skewX:65.9,skewY:245.9,x:863.2,y:377},5).to({regX:73.7,skewX:26.2,skewY:206.2,x:839.3,y:405.1},4).to({skewX:43.1,skewY:223.1,y:389.1},4).wait(1).to({skewX:13.2,skewY:193.2,x:849.4},0).to({regX:73.6,skewX:56.1,skewY:236.1,x:835.8,y:396.5},3).to({regX:73.7,skewX:14.5,skewY:194.5,x:835.7,y:396.4},6).to({regX:73.8,skewX:19.9,skewY:199.9,x:862.5,y:394.2},11,cjs.Ease.get(1)).to({regX:73.6,regY:95.5,skewX:-6,skewY:174,x:825.2,y:387.9},6).wait(16).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},9).wait(69).to({regX:73.7,regY:95.4,skewX:14.5,skewY:194.5,x:835.7,y:396.4},6).to({skewX:38.4,skewY:218.4},14).to({scaleX:0.91,scaleY:0.87,skewX:-24.7,skewY:153.4,x:876,y:396.5},3).to({scaleX:0.9,scaleY:0.88,skewX:-0.6,skewY:181.5,x:830.6,y:396.4},22).to({regX:73.8,scaleX:0.9,scaleY:0.89,skewX:-3.1,skewY:183.7,x:774.8,y:396.5},27).to({regX:73.7,scaleX:0.89,skewX:33.5,skewY:219.2,x:766.4,y:402.9},1).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},10).wait(29).to({skewX:-22.2},0).wait(26).to({regX:73.7,regY:95.4,skewX:-8.9,skewY:171.1,x:814.8,y:401},6).to({scaleX:0.89,scaleY:0.89,skewX:-11.2,skewY:169,x:793.4,y:405.2},28).to({scaleX:0.89,scaleY:0.89,skewX:-8.9,skewY:171.1,x:814.8,y:401},20).to({skewX:23.4,skewY:203.4,x:828.5,y:390.1},6).to({regX:73.8,scaleX:0.91,scaleY:0.87,skewX:59,skewY:235.5,x:853.8,y:386.1},10).to({skewX:10.3,skewY:186.8},10).to({scaleX:0.79,scaleY:0.84,skewX:10.3,x:840.1,y:382.3},12).to({scaleX:0.91,scaleY:0.87,skewX:59,skewY:235.5,x:853.8,y:386.1},11).to({skewX:10.3,skewY:186.8},10).to({scaleX:0.9,scaleY:0.88,skewX:1.3,skewY:179,x:853.7,y:389.8},10).to({skewX:1.3},13).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},1).wait(13).to({scaleX:0.94,scaleY:0.85,skewX:-25.2,skewY:160.5,x:838.1,y:447},4).to({regY:95.2,scaleX:0.92,scaleY:0.89,skewX:58.8,skewY:242.1,x:864.2,y:397.9},3).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},3).to({regX:73.7,regY:95,scaleX:0.91,scaleY:0.89,skewX:37.3,skewY:219.9,x:868,y:390.3},3).to({regX:73.8,regY:95.2,scaleX:0.91,skewX:-10.2,skewY:172,x:863.8,y:397.4},4).to({scaleX:0.91,skewX:23,skewY:205.6,x:866.7,y:392.4},2).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},3).to({regY:95.1,scaleX:0.91,scaleY:0.89,skewX:39.6,skewY:222.4,x:868.1,y:390},2).to({regY:95.2,scaleX:0.91,skewX:-10.2,skewY:172,x:863.8,y:397.4},3).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},5).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:35.8,skewY:215.8,x:853.2,y:399.5},4).wait(1).to({skewX:-22.2,skewY:157.8,y:399.4},0).to({skewX:0,skewY:180},3).to({skewX:15,skewY:195,y:399.5},2).to({regX:73.7,regY:95.2,scaleX:0.89,scaleY:0.89,skewX:28.8,skewY:208.8,x:852.2,y:399.7},3).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:37.9,skewY:217.9,x:851.3,y:400},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:42.5,skewY:222.5,x:850.9},1).to({regX:73.9,skewX:30.3,skewY:210.3,x:853.1,y:399.4},5).wait(26).to({skewX:48,skewY:228,x:829.5,y:373.3},5).to({scaleX:0.89,scaleY:0.89,skewX:32.6,skewY:212.6,y:379.2},3).to({scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,y:383.2},2).to({scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,y:387},2).to({regX:73.8,regY:95.4,skewX:19.5,skewY:199.5,x:846.9,y:401.8},10).wait(23).to({regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},7).wait(19).to({skewX:-22.2},0).wait(16).to({skewX:-2.7,skewY:177.3,x:853.3},5).to({skewX:-2.7},5).to({skewX:-33.5,skewY:146.5},5).to({skewX:-21.7,skewY:158.3,x:900.1,y:396.6},8).wait(21).to({scaleX:0.89,scaleY:0.89,skewX:-21.8,skewY:158.2,x:880,y:397.8},3).to({scaleX:0.89,scaleY:0.89,x:873.3,y:398.1},1).to({scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},3).wait(22).to({skewX:7.5,skewY:187.5,x:866.4,y:390.2},5).to({regX:73.7,regY:95.4,skewX:43.3,skewY:223.3,x:882.1,y:379.3},6).to({skewX:76.7,skewY:256.7,x:901.6},6).wait(18).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:45.1,skewY:225.1,x:868,y:383.2},3).to({regX:73.7,scaleX:0.89,scaleY:0.89,skewX:3,skewY:183,x:823.3,y:388.5},4).wait(25).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},6).wait(19).to({regY:95.2,skewX:46,skewY:226,x:881.6,y:380.5},7).wait(50).to({regX:73.7,regY:95.3,skewX:37,skewY:217,x:844.1,y:383.6},11).wait(2).to({regX:73.8,skewX:51.4,skewY:231.4},5).to({regX:73.7,skewX:37,skewY:217},6).wait(3).to({regX:73.8,skewX:51.4,skewY:231.4},7).to({regX:73.7,skewX:37,skewY:217},6).wait(3).to({regX:73.8,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},5).wait(35).to({skewX:-22.2},0).to({skewX:-33.2,skewY:146.8,x:818.9,y:414.6},4).wait(5).to({regX:73.7,skewX:-28.5,skewY:151.5,x:856.8,y:401.1},7).wait(37).to({regX:73.8,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},4).wait(16).to({regY:95.4,skewX:6.5,skewY:186.5,y:399.5},16).to({regX:73.7,skewX:14.8,skewY:194.8},10).wait(60).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,y:399.4},6).wait(15).to({regX:73.7,regY:95.4,skewX:-5.4,skewY:174.6,x:825.5,y:428.8},5).wait(27).to({skewX:-5.4},0).wait(25).to({regY:95.3,skewX:56.8,skewY:236.8,x:873.5,y:384.7},5).wait(11).to({skewX:-1,skewY:179,x:889.9,y:392.7},5).to({regY:95.4,scaleX:0.89,scaleY:0.89,skewX:-3.5,skewY:177.1,x:882.2,y:394.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-3.6,skewY:172.6,y:404.4},4).to({regY:95.3,scaleX:0.91,scaleY:0.88,skewX:0.2,skewY:170.8,x:905,y:406.7},3).to({scaleX:0.9,skewX:-2.8,skewY:169.7,x:898.4,y:407.9},3).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},9).wait(20).to({skewX:0,skewY:180},3).to({skewX:15,skewY:195,y:399.5},2).to({regX:73.7,regY:95.2,scaleX:0.89,scaleY:0.89,skewX:28.8,skewY:208.8,x:852.2,y:399.7},3).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:37.9,skewY:217.9,x:851.3,y:400},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:42.5,skewY:222.5,x:850.9},1).to({regX:73.9,skewX:30.3,skewY:210.3,x:853.1,y:399.4},5).wait(5).to({skewX:48,skewY:228,x:829.5,y:373.3},5).to({scaleX:0.89,scaleY:0.89,skewX:32.6,skewY:212.6,y:379.2},3).to({scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,y:383.2},2).to({scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,y:387},2).to({regX:73.8,regY:95.4,skewX:19.5,skewY:199.5,x:846.9,y:401.8},10).wait(23).to({regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},7).wait(1).to({skewX:-22.2},0).wait(26).to({regX:73.7,regY:95.4,skewX:-28.2,skewY:151.8,x:875.1,y:380.2},6).wait(23).to({scaleX:0.89,scaleY:0.89,skewX:-17.1,skewY:162.9,x:846.3,y:392.6},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-25.7,skewY:154.3,x:817.4,y:405},2).wait(46).to({regX:73.7,scaleX:0.9,scaleY:0.87,skewX:-27.1,skewY:155.6,x:812.7,y:424.8},0).wait(1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-25.7,skewY:154.3,x:817.4,y:405},0).to({regY:95.3,skewX:52.3,skewY:232.3,x:809.2,y:409.5},12).wait(10).to({regY:95.2,scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,x:826.8,y:405.4},2).to({regX:73.7,regY:95.3,skewX:7.3,skewY:187.3,x:835.7,y:403.5},1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},2).wait(13).to({regY:95.4,skewX:-17.5,skewY:162.5,x:814.1,y:389.2},8).to({_off:true},16).wait(48));

	// shoulder right
	this.instance_20 = new lib.shoulder();
	this.instance_20.setTransform(1105.4,1091.4,0.888,0.888,21.5,0,0,73.8,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).to({y:424.4},102).to({regX:73.9,rotation:-4.7,x:1101.6,y:408.9},12).to({rotation:-4.7},12).wait(1).to({regY:95.3,rotation:-8,x:1121.6,y:409.2},4).to({rotation:-14,x:1137.4,y:411.2},4).to({regY:95.4,rotation:-61.5,x:1129.4,y:403.3},5).to({regY:95.3,rotation:-23.2,x:1145.3,y:423.3},4).to({rotation:-45.4,x:1143.3,y:403.3},4).to({regY:95.4,rotation:-61.5,x:1129.4},5).to({regY:95.3,rotation:-23.2,x:1145.3,y:423.3},4).to({rotation:-45.4,x:1143.3,y:403.3},4).wait(1).to({regX:73.8,rotation:8.6,x:1096.4,y:384.3},3).to({rotation:8.6},6).to({rotation:14.1,x:1123.2,y:407.1},11,cjs.Ease.get(1)).to({regY:95.4,rotation:-36.1,x:1103.7,y:389.9},6).wait(7).to({rotation:-62.8},9).to({rotation:21.5,x:1105.4,y:424.4},9).wait(69).to({regY:95.3,rotation:8.6,x:1096.4,y:384.3},6).to({regX:73.7,regY:95.4,rotation:-30.1,y:384.4},14).to({scaleX:0.9,scaleY:0.88,rotation:0,skewX:-13.4,skewY:-16.1,x:1137.2},3).to({regX:73.8,regY:95.5,scaleX:0.92,scaleY:0.86,skewX:2.3,skewY:2.8,x:1091,y:384.5},22).to({regY:95.4,scaleX:0.93,scaleY:0.85,skewX:22,skewY:26.2,x:1034.1,y:384.4},27).to({regX:73.9,regY:95.5,scaleX:0.92,scaleY:0.85,skewX:-28.1,skewY:-24.6,x:1046.1,y:391.2},1).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},10).wait(55).to({regX:73.9,regY:95.3,rotation:-3.4,x:1067.7,y:385.2},6).to({scaleX:0.89,scaleY:0.89,rotation:0,skewX:-54.8,skewY:-54.9,x:1045.2,y:380.2},28).to({scaleX:0.89,scaleY:0.89,rotation:-3.4,skewX:0,skewY:0,x:1067.7,y:385.2},20).to({regX:73.8,rotation:-26.2,x:1135.9,y:407.6},6).to({scaleX:0.9,scaleY:0.89,rotation:0,skewX:-55.9,skewY:-45,x:1133.9,y:405.6},10).to({skewX:-27.4,skewY:-16.5},10).to({regX:73.7,regY:95.4,skewX:0.3,skewY:11.2,x:1133.8},12).to({regX:73.8,scaleX:0.89,skewX:-6.1,skewY:-6.1,x:1124.1,y:393.9},11).to({regY:95.3,scaleX:0.9,skewX:-55.9,skewY:-45,x:1133.9,y:405.6},10).to({regX:73.7,regY:95.4,skewX:0.3,skewY:11.2,x:1133.8},10).to({skewX:0.3,skewY:11.2},13).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},1).wait(13).to({scaleX:0.94,scaleY:0.85,rotation:0,skewX:24.4,skewY:18.9,x:1108.7,y:470.4},4).to({regY:95.3,scaleX:0.91,scaleY:0.9,skewX:-51.2,skewY:-55.2,x:1133,y:435},3).to({regX:73.7,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},3).to({regX:73.8,scaleX:0.9,scaleY:0.9,skewX:-25.3,skewY:-28.5,x:1113.9,y:425.8},3).to({scaleX:0.9,skewX:-68.6,skewY:-71.3,x:1122,y:415.8},4).to({regY:95.4,scaleX:0.9,scaleY:0.9,skewX:-38.3,skewY:-41.4,x:1116.4,y:422.9},2).to({regX:73.7,regY:95.3,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},3).to({scaleX:0.9,scaleY:0.9,skewX:-23.1,skewY:-26.3,x:1113.5,y:426.4},2).to({regX:73.8,scaleX:0.9,skewX:-68.6,skewY:-71.3,x:1122,y:415.8},3).to({regX:73.7,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},5).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:-30.3,skewX:0,skewY:0,x:1105.4,y:424.4},4).wait(1).to({rotation:21.5},0).to({rotation:-5.3},3).to({regX:73.7,rotation:-23.5,x:1105.3},2).to({scaleX:0.89,scaleY:0.89,rotation:-45.4,x:1114.9,y:430.9},3).to({scaleX:0.89,scaleY:0.89,rotation:-59.9,x:1121.2,y:435.3},2).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-67.2,x:1124.3,y:437.4},1).to({regY:95.4,rotation:-50.7,x:1124.4},5).wait(26).to({regY:95.3,rotation:-59.7,x:1105.4,y:374},5).to({scaleX:0.89,scaleY:0.89,rotation:-42.1,y:374.1},3).to({scaleX:0.89,scaleY:0.89,rotation:-30.6},2).to({scaleX:0.89,scaleY:0.89,rotation:-19,y:374},2).to({regY:95.4,rotation:-11.7,x:1122.2,y:423.6},10).wait(23).to({rotation:21.5,x:1105.4,y:424.4},7).wait(19).to({rotation:21.5},0).wait(16).to({rotation:-13.5},5).wait(5).to({rotation:26.2,x:1105.3},5).to({rotation:38,x:1141.7,y:472.4},8).wait(21).to({regX:73.9,scaleX:0.89,scaleY:0.89,rotation:30.8,x:1126.2,y:451.9},3).to({regY:95.5,scaleX:0.89,scaleY:0.89,rotation:28.5,x:1120.9,y:445.1},1).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,x:1105.4,y:424.4},3).wait(22).to({regY:95.3,scaleX:0.89,scaleY:0.89,rotation:24.1,x:1116.8,y:426.6},5).to({regX:73.9,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:27.2,x:1130.5,y:429.5},6).wait(24).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:10.5,x:1108.4,y:408.3},3).to({regX:73.9,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-11.8,x:1079.1,y:380},4).wait(25).to({regX:73.8,regY:95.4,rotation:21.5,x:1105.4,y:424.4},6).wait(19).to({rotation:21.5},0).to({rotation:27.4,x:1129.7,y:431.6},7).wait(50).to({regX:73.9,rotation:-35,x:1097.3,y:395.1},11).wait(2).to({regY:95.3,rotation:-26.8,x:1097.2},5).to({regY:95.4,rotation:-35,x:1097.3},6).wait(3).to({regY:95.3,rotation:-26.8,x:1097.2},7).to({regY:95.4,rotation:-35,x:1097.3},6).wait(3).to({regX:73.8,rotation:21.5,x:1105.4,y:424.4},5).wait(35).to({regY:95.3,rotation:-19.3,x:1071.2,y:391},4).to({rotation:-70.2},5).to({x:1117.2,y:389},7).wait(1).to({regX:73.7,rotation:5.2,x:1111.2,y:395},6,cjs.Ease.get(1)).wait(8).to({rotation:5.2},0).wait(22).to({regX:73.8,regY:95.4,rotation:21.5,x:1105.4,y:424.4},4).wait(16).to({regY:95.3,rotation:-11.2},16).to({regY:95.4,rotation:-39.6},10).wait(60).to({rotation:21.5},6).wait(15).to({rotation:8.3,x:1076.6,y:395.6},5).wait(52).to({x:1132.7,y:425.6},5).wait(16).to({scaleX:0.89,scaleY:0.89,rotation:0,skewX:5.7,skewY:6.4,x:1126.1,y:419.6},3).to({scaleX:0.88,scaleY:0.9,skewY:1.8,y:409.6},4).to({regY:95.3,scaleX:0.88,scaleY:0.91,skewX:9.3,skewY:-0.1,x:1149.1,y:403.8},3).to({scaleY:0.9,skewX:6.4,skewY:-1.1,x:1142.3,y:400.4},3).to({regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},9).wait(20).to({rotation:-5.3},3).to({regX:73.7,rotation:-23.5,x:1105.3},2).to({scaleX:0.89,scaleY:0.89,rotation:-45.4,x:1114.9,y:430.9},3).to({scaleX:0.89,scaleY:0.89,rotation:-59.9,x:1121.2,y:435.3},2).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-67.2,x:1124.3,y:437.4},1).to({regY:95.4,rotation:-50.7,x:1124.4},5).wait(5).to({regY:95.3,rotation:-59.7,x:1105.4,y:374},5).to({scaleX:0.89,scaleY:0.89,rotation:-42.1,y:374.1},3).to({scaleX:0.89,scaleY:0.89,rotation:-30.6},2).to({scaleX:0.89,scaleY:0.89,rotation:-19,y:374},2).to({regY:95.4,rotation:-11.7,x:1122.2,y:423.6},10).wait(23).to({rotation:21.5,x:1105.4,y:424.4},7).wait(1).to({rotation:21.5},0).wait(26).to({rotation:25.7,x:1124.6,y:423.8},6).wait(23).to({scaleX:0.89,scaleY:0.89,rotation:19.1,x:1097.5,y:407.1},2).to({regY:95.3,scaleX:0.89,scaleY:0.89,rotation:12.6,x:1070.4,y:390.5},2).wait(10).to({regY:95.4,rotation:-13.7},5).wait(31).to({regX:73.9,scaleX:0.91,scaleY:0.86,rotation:0,skewX:-14.5,skewY:-12.9,x:1072.5,y:410.9},0).wait(1).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:-13.7,skewX:0,skewY:0,x:1070.4,y:390.5},0).to({regX:73.9,rotation:-66.6,x:1060.3,y:374.2},12).wait(10).to({scaleX:0.89,scaleY:0.89,rotation:-31.3,x:1078.4,y:394.3},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:-13.6,x:1087.3,y:404.4},1).to({scaleX:0.89,scaleY:0.89,rotation:21.5,x:1105.4,y:424.4},2).wait(13).to({regX:73.9,rotation:-32.5,x:1060.4,y:371.3},8).to({_off:true},16).wait(48));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.BG, null, new cjs.Matrix2D(1,0,0,1,-1731.8,-1575.6)).s().p("EiW5BVPMAAAiqeMEtzAAAMgAZCqfg");
	this.shape.setTransform(959.5,539.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(814).to({_off:true},818).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(953.6,533.6,1931.8,1572.7);


// symbols:
(lib.armstraight = function() {
	this.initialize(img.armstraight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,624,344);


(lib.BG = function() {
	this.initialize(img.BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3468,2564);


(lib.face_02 = function() {
	this.initialize(img.face_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,466);


(lib.face_03 = function() {
	this.initialize(img.face_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,466);


(lib.face_04 = function() {
	this.initialize(img.face_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,410);


(lib.face_05 = function() {
	this.initialize(img.face_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,494);


(lib.face_06 = function() {
	this.initialize(img.face_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,419,550);


(lib.face_07 = function() {
	this.initialize(img.face_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,372,481);


(lib.face_10 = function() {
	this.initialize(img.face_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,371,469);


(lib.face_11 = function() {
	this.initialize(img.face_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,384,471);


(lib.face_13 = function() {
	this.initialize(img.face_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,424,461);


(lib.face_14 = function() {
	this.initialize(img.face_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,373,464);


(lib.face_15 = function() {
	this.initialize(img.face_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,373,464);


(lib.face_16 = function() {
	this.initialize(img.face_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.face_19 = function() {
	this.initialize(img.face_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.face_20 = function() {
	this.initialize(img.face_20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.hand_01 = function() {
	this.initialize(img.hand_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,172,348);


(lib.hand_02 = function() {
	this.initialize(img.hand_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,183,328);


(lib.hand_03 = function() {
	this.initialize(img.hand_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,169,167);


(lib.hand_04 = function() {
	this.initialize(img.hand_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,145,289);


(lib.hand_05 = function() {
	this.initialize(img.hand_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,156,339);


(lib.hand_06 = function() {
	this.initialize(img.hand_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,193,242);


(lib.hand_07 = function() {
	this.initialize(img.hand_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,280,260);


(lib.hand_08 = function() {
	this.initialize(img.hand_08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,292,148);


(lib.hand_09 = function() {
	this.initialize(img.hand_09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,219,196);


(lib.hand_10 = function() {
	this.initialize(img.hand_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,270,255);


(lib.hand_11 = function() {
	this.initialize(img.hand_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,193,326);


(lib.obfuscobody02 = function() {
	this.initialize(img.obfuscobody02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,549,835);


(lib.overlay = function() {
	this.initialize(img.overlay);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2858,909);


(lib.Tween7 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.overlay, null, new cjs.Matrix2D(1,0,0,1,-1578.2,-401.4)).s().p("EiNWA+tMAAAh9aMEatAAAMAAAB9ag");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-904.7,-401.4,1809.5,802.8);


(lib.Tween6 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.overlay, null, new cjs.Matrix2D(1,0,0,1,-1578.2,-401.4)).s().p("EiNWA+tMAAAh9aMEatAAAMAAAB9ag");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-904.7,-401.4,1809.5,802.8);


(lib.waist = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.obfuscobody02, null, new cjs.Matrix2D(0.646,0,0,0.646,-177.2,-408.7)).s().p("A7rUXIAA+3IAOgHIBygUQEFn4CLhPQbHiKFvNNIORdWg");
	this.shape.setTransform(177.2,67.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-63,354.4,260.7);


(lib.torso = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.obfuscobody02, null, new cjs.Matrix2D(0.646,0,0,0.646,-185.3,-210.9)).s().p("A2gWSQk5k7FPpoIkx+nMAgGgI8IVxUdIh1InIvYZsQm5I5n3AAQoNAApSpjg");
	this.shape.setTransform(185.3,210.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(12.9,7.1,344.8,407.5);


(lib.shoulder = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.armstraight, null, new cjs.Matrix2D(0.255,0.593,-0.593,0.255,93.2,-148.9)).s().p("ADtRHIvbtuIlls7IQYnxISPW4IAACAQg3FAilCYQhoCXlLAAQhiAAh2gNg");
	this.shape.setTransform(110.8,147);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,36.2,221.7,221.7);


(lib.headup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_04, null, new cjs.Matrix2D(0.648,0,0,0.648,-113.4,-121)).s().p("Axsy4MAjZAAAMAAAAkrIvIpmQowEfjcD5QiEB1kNAZQg3AFg9ABg");
	this.shape.setTransform(100.8,191.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(20));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.842,-0.152,0.047,0.807,-181.8,-293.3)).s().p("ArdhIIBYg9QBehCBggoQAggNAsgPQILpEChGuQBYACB1ABQAXAbBLAnIBpA1QhMD2CDE8I33FOQCFrKhrApgAr5g1IACgBIgJAIIAHgHg");
	this.shape_1.setTransform(119.9,282.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.837,-0.14,0.06,0.798,-176.5,-297.1)).s().p("AlzE4QiWhGgYgOQhAglABgsQABgriPj9QBCBUABgWQABgmAfggQBGhIFXiHIFuhJQCVhBDhBxQBXAsBKAJQBLAKAMAUQALATjqG2QhdB4iPA9Qg3AYhrAiQimA3gxARQiIhOiVhIg");
	this.shape_2.setTransform(107.8,284.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.766,-0.122,0.048,0.735,-183.7,-321.1)).s().p("AlNGIQg8gxgyhGQgog/gHgIQgeglglg+Ig4hjQgFgHhFheQg+hUgBgMQgDgYD1hVQAwgRERhZIEXg2QDig8DeAaQBcALA6AYQA6AXADAcQAEAohKDKQgkBlgnBeIgUBEQgbBMgqBCQiHDOj4AwQhIAOhBAAQi9AAiNhxg");
	this.shape_3.setTransform(110.7,288.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.759,-0.151,0.039,0.82,-154.4,-307)).s().p("AiOHPQh8g4hohKQkdjMgUkCQAZgMD/iOQChhYCvg9IEshKQBlgIDNAWQBMAIA1ALIAAJZQhyDdi0BTImNBOQg4gQhHgfg");
	this.shape_4.setTransform(105.4,281.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.767,-0.172,0.072,0.743,-199.6,-252.9)).s().p("AlhFzQiiiEgPgSQgmgxgbglQgrhGhThRQhThUBGArQBFAogshEQgihfAng8IV1k7IAaEJQBRglg4B3IhUC5QgdA/ABABIgDAGQgdBOgGAkIgoDOIgGAaIrlCjQgSg9iOh8g");
	this.shape_5.setTransform(107.7,280.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.767,-0.121,0.072,0.521,-273.4,-195.7)).s().p("AgaAJIAXgzQAOgKANgSIASCAIhTANQADgkAMgag");
	this.shape_6.setTransform(181.6,299);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.898,-0.138,0.042,0.771,-175.3,-287.1)).s().p("ArzADQhqoBB6FEIXwkqIAYDWQg4AbkFJ5IpjBfg");
	this.shape_7.setTransform(110.6,278.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.807,-0.159,-0.068,0.778,-119.1,-288.1)).s().p("ArjgXQAHn/BhFTIVXkNQAhDdhjITIuACxg");
	this.shape_8.setTransform(111.3,278.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.863,-0.148,0.085,0.757,-167.1,-281.5)).s().p("AsGjaIYMkpIAAF3IlvIsIpBBkg");
	this.shape_9.setTransform(102.7,276.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.952,-0.171,0.101,0.836,-192.3,-288.6)).s().p("AtflEQLfi1PgA0InNMyIo+Blg");
	this.shape_10.setTransform(106.7,286.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.9,-0.147,0.112,0.899,-199,-295)).s().p("AsHA5IgBmkIXTkCIA+H0ImxKOIn+BZg");
	this.shape_11.setTransform(113.3,264.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_6},{t:this.shape_5}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},2).to({state:[{t:this.shape_11}]},2).wait(2));

	// Layer 4
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#704B3E","#381E19"],[0,1],-2.6,36.5,-0.5,-0.6).s().p("AmWDbQAIkXgEieIJOisIDbFvIjbE5QiWBliCAAQisAAiOisg");
	this.shape_12.setTransform(91.2,313.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(20));

	// Layer 3
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.bf(img.face_04, null, new cjs.Matrix2D(-0.616,0,0,-0.648,107.8,141.6)).s().p("Aw1PRIAA91IOZJmQIVkfDRj5QB+h1D/gZQA1gFA6gBIAAeeQq5A3pwAAQmyAAmQgag");
	this.shape_13.setTransform(90.8,216);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,70.7,231.3,281.7);


(lib.headdown = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.face_11();
	this.instance.setTransform(0,0,0.711,0.711);

	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_11, null, new cjs.Matrix2D(0.711,0,0,0.711,-136.5,-148.1)).s().p("AIpXJIgQgSQhHhMidgGQAogNglAJQgiAMhaAYQhZAXgigNQgigMgMABQiUgBhaAMQjqhMh3A+Qh3A+ADADQAEAEAAADIlyAAIAA0yIk2AAIAA5fMAqpAAAIAAZfIkFAAImGUiIAAgYIgfAAIAAAog");
	this.shape.setTransform(136.6,148.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},2).wait(10));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.657,-0.03,-0.025,0.61,-114.1,-242.7)).s().p("AoziWIAOgLQArgVAzgdQBOgmBNgVIA8gOIIXgsQBDALBaAMQAPAXA3AlIBMAxQhNCyBND6IyrBhQBPkogti3g");
	this.shape_1.setTransform(131.1,303.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.667,-0.03,-0.022,0.627,-104,-247.5)).s().p("AjnDTQhvhFgSgNQgvgkAFghQAEgiksl7QCqCoAHgUQAHgUBTgDQBSgCEYhIIEkgWQB7glCmBtQBAAqA6APQA6AOAHARQAIAQjeE+QhTBUh1AiQgtANhXARQiIAbgmAJQhjhKhvhFg");
	this.shape_2.setTransform(120.7,305.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.639,-0.021,-0.028,0.497,-124,-231.6)).s().p("AlQDdQguglgigzQgbgtgFgGQgWgbgYgtIglhFQgDgGgxhFQgqg+AAgIQAAgQDRgmIERgtIDpgPQDAgVCzAjQBLAPAtAUQAtAUAAATQAAAchQCBQgnBBgoA7IgXAtQgdAwgpApQiBCAjQANIguABQjJAAh+hqg");
	this.shape_3.setTransform(133.5,307.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.628,-0.019,-0.027,0.432,-106.6,-173.7)).s().p("AD5D1IlIAKQgsgNhig1QhKgololIIAAgdIBWBOIDvg7QCIghCTgSID6gPQBSAEClAbQDOAjABAdQgBAkk8EpIhYBTIgDgLg");
	this.shape_4.setTransform(129.7,299.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.591,-0.039,0,0.441,-135.2,-166.3)).s().p("AktC9QkokzAihDQAFgSAOgOIQ0hIIAACeQA/gPgyBBIhNBkIgaAlIgCACQgcAsgHAUIguB1IgFAQIo7AjQgHgghNhFgAovh/IgFgSQALAYgBAAIgFgGg");
	this.shape_5.setTransform(129.9,303.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.54,-0.032,0,0.365,-169.3,-153.4)).s().p("AgMAFIATghQAMgGAKgLIAABYIg5ADQAFgYALgRg");
	this.shape_6.setTransform(175.4,319.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.63,-0.017,-0.03,0.433,-99.1,-172.8)).s().p("Ao9iSQAQjNA8C9IQvhAIAAB6QgpAKjkFQImsALg");
	this.shape_7.setTransform(130.8,301.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.65,-0.039,-0.121,0.488,-67.6,-190.9)).s().p("Ap8i9QB3jGAvDeIRNhCQAzBolzF8IoHAeg");
	this.shape_8.setTransform(128.4,299.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.607,-0.026,0,0.435,-106.2,-172.3)).s().p("AqEi9IUJhNIoNIDImVASg");
	this.shape_9.setTransform(136.1,303.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.671,-0.04,0,0.515,-111.7,-188.1)).s().p("ApYj6QIKg+KnBjImCHRImUAXg");
	this.shape_10.setTransform(128.7,306.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.699,-0.039,0,0.702,-119.9,-245.9)).s().p("Ap9hyIB1j7ISGhNIAAGGImIHVImMAag");
	this.shape_11.setTransform(129.7,296.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,273.1,335);


(lib.head34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_07, null, new cjs.Matrix2D(0.607,0,0,0.607,-112.8,-147.4)).s().p("AxHXCIAAg3QABpzghgsMAAAgitMAjPAAAMAAAAtkIhlgCIAAgWIvIACIoLgGIggA7g");
	this.shape.setTransform(144,178.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_07, null, new cjs.Matrix2D(0.607,0,0,0.607,-112.8,-122.5)).s().p("ADyTIQjxiLlCivIseBvQgDgRgFgGMAAAgitMAjPAAAMAAAAmPg");
	this.shape_1.setTransform(144,153.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).wait(20));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.676,0.165,-0.171,0.555,-56.9,-259.8)).s().p("AqfBnQCXj4gCi3IARgGIBsgRQBZgPBTAEIBAAFIIsB1QBCAdBZAlQAJAaAwAyIBBBEQh4CMASD+g");
	this.shape_2.setTransform(108,276.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.673,0.161,-0.181,0.61,-56,-275.3)).s().p("AhMFPQiOgMgqgDQhRhmhdhjQhdhjgOgTQgmguANgfQANghgkjpQAaBTAHgRQAMgbAggOQBJgfEqAIIEpA/QCDgBCKCbQA1A7A3AfQA2AgADAQQADARkuD9QhoA6h9AAQgxAAhZgIg");
	this.shape_3.setTransform(112.3,270.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.615,0.15,-0.176,0.571,-55.1,-302.5)).s().p("Ah/GPQjigvhkixQgfg4gShEIgOhDQgNglgJg7IgOhcIgbhmQgWhTACgKQAFgSDSANQApACDoATIDjAwQC9AbCgBaQBCAlAlAkQAlAkgFAWQgJAghyB/Qg5BBg5A8IgjAuQgqAxgzAkQh2BTiKAAQgzAAg3gMg");
	this.shape_4.setTransform(115.4,277.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.674,0.167,-0.174,0.554,-64.2,-260.9)).s().p("ABcFzIlghXQgrgfgzgtQhahQhFhVQi8jpAxiyQAZABD4gEQCegCCiAWIEPA5QBWAeCmBWQDQBsgKAmQgMAtgxBJQg+BbhTBEQidB/i0AAIgbgBg");
	this.shape_5.setTransform(120.1,268);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.623,0.131,-0.13,0.505,-93.3,-232)).s().p("AGCGaQAQggASgVIAkgpQAQgEAQgNIghB+gAlOD/QACgthNh+QhaiHgHgQIgchOQgOg6grhQQgqhRAqAxQArAygQg7QgDhJAtgbIRvDvIguC0QBGABhIA6IhuBeIglAiIgEADQgpApgOAWIhSB4IgJAQg");
	this.shape_6.setTransform(112.1,272.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.719,0.181,-0.188,0.59,-58.5,-268.4)).s().p("Ak2FYIlVowQAOhYAMg6QAojRABDRIAAAJITTEDIgrCmQgzACl6GJg");
	this.shape_7.setTransform(118.2,265.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.655,0.137,-0.272,0.556,-15,-249.6)).s().p("Al0ElIj3oLQAihWAag0QBMibgFCbIgDArIRXDqQgmCtjiFsg");
	this.shape_8.setTransform(113.8,268);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.696,0.16,-0.155,0.603,-66.9,-268.8)).s().p("An0FBIjzrsIXPE4IsJIfg");
	this.shape_9.setTransform(125,269);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.774,0.162,-0.184,0.714,-67.7,-290.7)).s().p("AmLF9IkWteQC3AaDDAxQHFB1IED6IpcIJg");
	this.shape_10.setTransform(114.2,268.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.728,0.161,-0.205,0.794,-62.4,-312.1)).s().p("AmJHUIkYqbICIlkIS7D+IhyG4IobGhg");
	this.shape_11.setTransform(118,260.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},2).to({state:[{t:this.shape_11}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.2,30.7,225.7,294.9);


(lib.head = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_05, null, new cjs.Matrix2D(0.613,0,0,0.613,-123.8,-132.2)).s().p("AGJUFQj2iVjngaQjpgblRCMIAfANIiWAAIi3oNIAFAAIAAiXIjdpTIAprpILkocIBFAAIN+CfIJZM3IpWZ7g");
	this.shape.setTransform(123.8,132.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(11));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_05, null, new cjs.Matrix2D(0.613,0,0,0.613,-123.8,-153.3)).s().p("AqGQAIh/AAIi3oMIAFAAIAAiXIjdpTIAprqILkocIBFAAIN+CgIJZM2IpWZ8IidAAQgRhskBGMQhXCHh1AAQjoAAlin9g");
	this.shape_1.setTransform(123.8,153.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.591,0.023,-0.023,0.591,-102.6,-243.9)).s().p("AoZEcQBHkagoi0IAMgKIBVgoQBGghBFgOQAXgEAfgEIHiAAQA8APBRATQANAXAyAoIBEA3QhFClBFD6g");
	this.shape_2.setTransform(112.1,271.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.588,0.02,-0.019,0.648,-100.9,-266.6)).s().p("AkoC1QhihQgPgPQgqgpAEgiQAEghhPjiQAnBOACgSQAEgeAYgVQA1guD3g2IEBAAQBsgdCSB+QA5AxAzATQAzAUAGARQAHARjDE6QhKBQhnAbQgnAKhNALIiZAXQhXhUhihQg");
	this.shape_3.setTransform(110.2,271.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.537,0.021,-0.024,0.608,-104.2,-294.2)).s().p("AkbDvQglgygdhAIgbhCQgSgjgUg2IgghaQgCgIgphYQgkhPAAgKQAAgTCwgfQAigHDDgdIDEAAQChgNCWA4QA/AYAmAcQAmAcAAAXQAAAihDCZQggBLgiBIIgUA1QgYA6giAvQhtCTivAAQjDAAh3ibg");
	this.shape_4.setTransform(112.5,278);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.59,0.026,-0.026,0.59,-104.2,-248.1)).s().p("AhyFMQgqgVg0gjQhbg9hKhHQjNjBADi8QAUgEDMg4QCBgjCKgNIDqAAQBNAMCbA0QDCBAAAAoQAAAygZBTQgfBmg2BVQhuCsijAfg");
	this.shape_5.setTransform(115.7,265.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.54,0,0,0.533,-122,-213.2)).s().p("AG7FCQAGgkALgYIAVgxQAMgIAKgQIAACFgAi1E+QgIgthahuQhnh2gJgPQgXgmgRgfQgYg4g0hHQg0hIAtAoQAuAogag3QgShIAggkIPXAAIAAC+QA7gNgvBKQguBJgYAqIgYAqIgCAEQgZAygHAYIgqCKIgFASg");
	this.shape_6.setTransform(110,271);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.63,0.03,-0.03,0.63,-101,-260.5)).s().p("AiPFtImOnoQgimwA7EZIQvAAIAACxQgqANjjHWg");
	this.shape_7.setTransform(114.6,264.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.568,0,-0.106,0.613,-61.8,-248)).s().p("AjRFkIk6nXQAsmZApEfIPCAAQAGC4hsGZg");
	this.shape_8.setTransform(113.1,263.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.607,0.014,0,0.636,-106.2,-263)).s().p("AkdFYIlnq5IUJAAIoNLDg");
	this.shape_9.setTransform(118.1,272.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.671,0,0,0.753,-111.7,-282.4)).s().p("Ai9GWImbskQIKgsKnDLImCKGg");
	this.shape_10.setTransform(110.7,271.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.633,0.008,0,0.837,-112.1,-304.4)).s().p("AirHxIlzpgIAkmBIQZAAIAAHRIljIQg");
	this.shape_11.setTransform(115.2,261.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.5,0,234.7,306.7);


(lib.handcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.hand_02, null, new cjs.Matrix2D(1,0,0,1,-99.3,-165.4)).s().p("AtDAbIObtCIDCtOIIqAAMAAAAzOI3wAdg");
	this.shape.setTransform(99.3,165.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.hand_01, null, new cjs.Matrix2D(0.931,0,0,0.931,-80,-161.9)).s().p("AsOYWUADqgOIgD7gjgIY/AAMAAAAylQ1xhZi9Acg");
	this.shape_1.setTransform(94.2,187.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.hand_03, null, new cjs.Matrix2D(-0.91,0.414,-0.414,-0.91,111.5,41)).s().p("AxZmZIYAq8IKzXuI4AK8g");
	this.shape_2.setTransform(63.7,264.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.hand_04, null, new cjs.Matrix2D(0.977,0,0,0.977,-66.9,-147.6)).s().p("AqcVDMgAfgpSINagzIFhBxIhWEOID7BQIAXLlIj6BcIgEFdIkzQYg");
	this.shape_3.setTransform(85.9,183.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.hand_05, null, new cjs.Matrix2D(0.96,-0.279,0.279,0.96,-114.5,-161.8)).s().p("AuQsxIEGsyILvDxIGPJMIAyAQIDNHqICeHQQhMDziMPJIt+EFg");
	this.shape_4.setTransform(29.9,166.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-119.7,-89.4)).s().p("AokTrImBz+IFRwdIOakWIGIB9IDYLRIgNgFIoVaBIqIDDg");
	this.shape_5.setTransform(60.1,185.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.hand_07, null, new cjs.Matrix2D(-0.832,0.555,0.555,0.832,52.7,-202.1)).s().p("ADNUmIozF5Ik2nRIgdgrIgIgMIAqiFIia8LIAYhJIGFlYIBakYIP1kEIA0AiIBDBlIibHlQjWA7j+BJIgiBqIDFLMIkgOBID7PGg");
	this.shape_6.setTransform(73.8,188.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-65,-213.7)).s().p("AgBAPIgMgjIAbApg");
	this.shape_7.setTransform(5.4,309.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.hand_08, null, new cjs.Matrix2D(-1,0,0,1,151,-74)).s().p("ArFLkIqyjdIGTzpIJ3AAIIFCmIHxG/ILvGsIjYGIIyWl4IiFGlg");
	this.shape_8.setTransform(90.7,319.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.hand_09, null, new cjs.Matrix2D(-0.705,0.709,0.709,0.705,7.8,-146.7)).s().p("A25BUIYG4OIVuVnI4HYOg");
	this.shape_9.setTransform(49.3,215.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.hand_10, null, new cjs.Matrix2D(0.731,-0.682,0.682,0.731,-177.4,-31.6)).s().p("AjLVWIlPnOIj7zfIAKmvIixjdIG+ikIKbJ0IIXtpIEJA9IjQXBIk/LAIgiE5IhzBrInACXg");
	this.shape_10.setTransform(54.8,195.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.hand_11, null, new cjs.Matrix2D(0.986,-0.169,0.169,0.986,-122.6,-144.3)).s().p("AzJ2iIdtlGMAImAyLI9sFGg");
	this.shape_11.setTransform(71.4,164.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.7,0,167.4,330.9);


(lib.hand = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.hand_02, null, new cjs.Matrix2D(1,0,0,1,-99.3,-165.4)).s().p("AtDAbIObtCIDCtOIIqAAMAAAAzOI3wAdg");
	this.shape.setTransform(99.3,165.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.hand_01, null, new cjs.Matrix2D(0.931,0,0,0.931,-80,-161.9)).s().p("AsOYWUADqgOIgD7gjgIY/AAMAAAAylQ1xhZi9Acg");
	this.shape_1.setTransform(94.2,187.7);

	this.instance = new lib.hand_03();
	this.instance.setTransform(175.2,305.4,1,1,155.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.hand_04, null, new cjs.Matrix2D(0.977,0,0,0.977,-66.9,-147.6)).s().p("AqcVDMgAfgpSINagzIFhBxIhWEOID7BQIAXLlIj6BcIgEFdIkzQYg");
	this.shape_2.setTransform(85.9,183.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.hand_05, null, new cjs.Matrix2D(0.96,-0.279,0.279,0.96,-114.5,-161.8)).s().p("AuQsxIEGsyILvDxIGPJMIAyAQIDNHqICeHQQhMDziMPJIt+EFg");
	this.shape_3.setTransform(29.9,166.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-119.7,-89.4)).s().p("AokTrImBz+IFRwdIOakWIGIB9IDYLRIgNgFIoVaBIqIDDg");
	this.shape_4.setTransform(60.1,185.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.hand_07, null, new cjs.Matrix2D(-0.832,0.555,0.555,0.832,52.7,-202.1)).s().p("ADNUmIozF5Ik2nRIgdgrIgIgMIAqiFIia8LIAYhJIGFlYIBakYIP1kEIA0AiIBDBlIibHlQjWA7j+BJIgiBqIDFLMIkgOBID7PGg");
	this.shape_5.setTransform(73.8,188.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-65,-213.7)).s().p("AgBAPIgMgjIAbApg");
	this.shape_6.setTransform(5.4,309.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.hand_08, null, new cjs.Matrix2D(-1,0,0,1,151,-74)).s().p("ArFLkIqyjdIGTzpIJ3AAIIFCmIHxG/ILvGsIjYGIIyWl4IiFGlg");
	this.shape_7.setTransform(90.7,319.8);

	this.instance_1 = new lib.hand_09();
	this.instance_1.setTransform(57.1,68.8,1,1,0,-45.1,134.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.hand_10, null, new cjs.Matrix2D(0.731,-0.682,0.682,0.731,-177.4,-31.6)).s().p("AjLVWIlPnOIj7zfIAKmvIixjdIG+ikIKbJ0IIXtpIEJA9IjQXBIk/LAIgiE5IhzBrInACXg");
	this.shape_8.setTransform(54.8,195.3);

	this.instance_2 = new lib.hand_11();
	this.instance_2.setTransform(-51.3,19.7,1,1,-9.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.7,0,167.4,330.9);


(lib.forarm = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.armstraight, null, new cjs.Matrix2D(0.255,0.593,-0.593,0.255,-42.9,-288.5)).s().p("AyImuQgGrWK3AnIAAgKIXBYkICfFyIrYE5g");
	this.shape.setTransform(179.4,288.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(63.3,175.7,232.3,225.7);


(lib.fix = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// forarm right
	this.instance = new lib.forarm();
	this.instance.setTransform(214.4,-112.8,0.888,0.888,-128,0,0,89.9,202.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:89.8,rotation:-111.8,x:236.5,y:-198.8},3).to({x:231.5,y:-189.8},6).to({regX:89.7,regY:202.6,scaleX:0.91,scaleY:0.71,rotation:0,skewX:35.4,skewY:-12.3,x:226.2,y:-95.4},3).to({regX:89.8,regY:202.8,scaleX:0.77,scaleY:0.74,skewX:43,skewY:26.9,x:217.6,y:-37.3},2).to({regX:90.1,regY:202.5,scaleX:0.76,scaleY:0.84,skewX:49,skewY:21.8,x:239.9,y:-160.4},5).to({regY:202.6,x:219.8,y:-1.7},4).to({regY:202.5,x:239.9,y:-160.4},4).to({regY:202.6,x:219.8,y:-1.7},4).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:45,skewX:0,skewY:0,x:193.2,y:6.8},6).wait(1));

	// hand right
	this.instance_1 = new lib.hand("single",0);
	this.instance_1.setTransform(267.9,-313.5,0.581,0.581,0,-11.7,168.3,39.6,288.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:288.2,skewX:62.8,skewY:242.8,x:314,y:-371.5},3).to({regY:288.1,skewX:-3.2,skewY:176.8,x:330,y:-349.6,startPosition:4},6).to({skewX:48.7,skewY:228.7,x:351.9,y:-195.7},1).to({skewX:85.4,skewY:265.4,x:292,y:-93.9},1).to({regX:39.5,skewX:107.1,skewY:287.1,x:270.1,y:-24.9},1).to({regX:39.6,regY:287.9,skewX:-3,skewY:177,x:296,y:49.4,startPosition:7},1).to({regY:288.1,skewX:-3.2,skewY:176.8,x:254.9,y:112.6},1).to({skewX:-13.7,skewY:166.3,x:266.4,y:-35.9},5).to({skewX:-3.7,skewY:176.3,x:240.3,y:115.6},4).to({skewX:-13.7,skewY:166.3,x:266.4,y:-35.9},4).to({skewX:-3.7,skewY:176.3,x:240.3,y:115.6},4).to({_off:true},1).wait(5).to({_off:false,skewX:-172.3,skewY:7.7,x:163.6,y:143.1,startPosition:0},0).wait(1));

	// forearm left
	this.instance_2 = new lib.forarm();
	this.instance_2.setTransform(-200.8,-42.5,0.888,0.888,0,-39.2,140.8,89.8,202.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({scaleX:0.89,scaleY:0.89,skewX:45.3,skewY:225.3,y:-30.6},3).to({scaleX:0.89,scaleY:0.89,skewX:103.2,skewY:283.2,x:-268.4,y:-77.1},3).to({regY:202.8,skewX:114.9,skewY:294.9,x:-220.8,y:-166.9},5).to({regX:90,regY:203,scaleX:0.81,scaleY:0.8,skewX:107.2,skewY:328.8,x:-216,y:-68.9},2).to({scaleX:0.84,scaleY:0.83,skewX:-63.6,skewY:148.8,x:-207,y:-79.4},1).to({regX:89.8,regY:202.7,scaleX:0.77,scaleY:0.8,skewX:-53.9,skewY:135.9,x:-189.1,y:-46.6},2).to({regX:89.6,regY:202.8,scaleX:0.73,scaleY:0.76,skewX:-60.3,skewY:144.6,x:-230.4,y:-195.8},4).to({regX:90,regY:203,scaleX:0.77,scaleY:0.78,skewX:-57.9,skewY:133,x:-189.1,y:-46.4},4).to({regX:89.6,regY:202.8,scaleX:0.73,scaleY:0.76,skewX:-60.3,skewY:144.6,x:-230.4,y:-195.8},4).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:-152.6,y:-28},6).wait(1));

	// hand left
	this.instance_3 = new lib.hand("single",4);
	this.instance_3.setTransform(-222.9,140.2,0.581,0.581,153.8,0,0,39.6,288.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({regX:39.4,regY:288,rotation:186.2,x:-209.8,y:137.1},0).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:267.1,x:-351.5,y:79.5},2).to({regY:288.2,rotation:288,x:-374.8,y:-4.8},1).to({regX:39.4,rotation:323.4,x:-389.2,y:-141.8},2).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:341.2,x:-383,y:-237.5},1).to({regY:288.2,rotation:352.9,x:-305.2,y:-333.9},5).to({regX:39.4,rotation:355,x:-245.1,y:-132.1},2).to({rotation:356,x:-212,y:57.3,startPosition:7},1).to({regX:39.5,regY:288,rotation:357.7,x:-187.9,y:116.4},2).to({regX:39.6,regY:287.9,rotation:367.7,x:-232.4,y:-75.8},4).to({regX:39.5,regY:288,rotation:357.7,x:-167.9,y:120.4},4).to({regX:39.6,regY:287.9,rotation:367.7,x:-232.4,y:-75.8},4).to({x:-180.4,y:108.3},5).wait(1).to({regY:288.2,rotation:509,x:-148.1,y:172.9,startPosition:0},0).wait(1));

	// head
	this.instance_4 = new lib.headup("synched",4);
	this.instance_4.setTransform(-10.5,-305.8,1.057,1.057,4.5,0,0,112.4,278.6);

	this.instance_5 = new lib.head34("synched",14);
	this.instance_5.setTransform(-16.6,-245.9,1.057,1.057,0,14.7,-165.3,112.4,278.6);
	this.instance_5._off = true;

	this.instance_6 = new lib.head("single",0);
	this.instance_6.setTransform(34.7,-211.3,1.057,1.057,0,0,0,112.4,278.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_4}]},6).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_6}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-14.7,x:-28.5,y:-311.9,startPosition:7},3).to({startPosition:13},6).to({_off:true},1).wait(28));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(10).to({_off:false},0).to({skewX:3,skewY:-177,x:91.8,y:-231.4,startPosition:18},4).to({skewX:14,skewY:-166,x:16.6,y:-220.9,startPosition:1},5).to({skewX:4,skewY:-176,x:64.4,y:-209.9,startPosition:5},4).to({skewX:14,skewY:-166,x:16.6,y:-220.9,startPosition:1},4).to({skewX:4,skewY:-176,x:64.4,y:-209.9,startPosition:5},4).to({x:48.4,y:-211.9},5).to({_off:true,skewX:0,skewY:0,x:34.7,y:-211.3,mode:"single",startPosition:0},1).wait(1));

	// torso
	this.instance_7 = new lib.torso();
	this.instance_7.setTransform(17.3,72.8,1,1,-19.5,0,0,144.5,370.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(9).to({regX:144.6,rotation:-7.8,x:38.9,y:72.6},5).to({rotation:-18.3,x:33.8,y:71.7},5).to({regX:144.5,rotation:-8.3,x:30.5,y:81.2},4).to({regX:144.6,rotation:-18.3,x:33.8,y:71.7},4).to({regX:144.5,rotation:-8.3,x:30.5,y:81.2},4).to({rotation:-7.6,x:14.1,y:103.4},6).wait(1));

	// waist
	this.instance_8 = new lib.waist();
	this.instance_8.setTransform(47,172.6,1,1,0,0,0,177.2,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(38));

	// shoulder left
	this.instance_9 = new lib.shoulder();
	this.instance_9.setTransform(-145.9,-150.8,0.888,0.888,0,-17.5,162.5,73.8,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3).to({regY:95.3,skewX:32,skewY:212,y:-150.9},6).to({regY:95.2,skewX:43.7,skewY:223.7,x:-75.6,y:-179.6},5).to({regX:73.7,skewX:-18.2,skewY:161.8,x:-124.7,y:-155.5},5).to({regY:95.3,skewX:49.5,skewY:229.5,x:-86.2,y:-169.9},4).to({regY:95.2,skewX:-18.2,skewY:161.8,x:-124.7,y:-155.5},4).to({regY:95.3,skewX:49.5,skewY:229.5,x:-86.2,y:-169.9},4).to({regX:73.8,skewX:-22.2,skewY:157.8,x:-106.8,y:-140.6},6).wait(1));

	// shoulder right
	this.instance_10 = new lib.shoulder();
	this.instance_10.setTransform(100.4,-168.7,0.888,0.888,-32.5,0,0,73.9,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({regY:95.5,rotation:-66.7,x:100.5,y:-168.6},3).wait(6).to({rotation:20,x:169.1,y:-147},5).to({rotation:-35.2,x:122,y:-168},5).to({rotation:18.8,x:159,y:-139.6},4).to({rotation:-35.2,x:122,y:-168},4).to({rotation:18.8,x:159,y:-139.6},4).to({regX:73.8,regY:95.4,rotation:21.5,x:145.4,y:-115.6},6).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-357.7,-542.9,725.6,819.3);


