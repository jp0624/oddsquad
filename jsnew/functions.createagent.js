
// =======================================================
//              AGENTS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var CreateAgentFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		
		_this.documentEvents();	// setup dom element event listeners
		
	};
	
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {
		
	};
	
	_this.documentEvents = function() {
		
	};
	
};

var createagentInstance = createagentInstance || new CreateAgentFunctions();

// =======================================================
//              AGENTS PAGE FUNCTIONS
// -------------------------------------------------------
function constructCreateAgent() {
	
	newAgent.name = ''; // agent name
	newAgent.code = 0; // agent's code
	newAgent.str = ''; // used by animation
	newAgent.counter = 0; // used by animation
	newAgent.malePos = 0; // index of male avatar
	newAgent.femalePos = 0; // index of female avatar
	newAgent.avatarImg = ''; // url of avatar image

	console.log('boomey');
	newAgent.init();
	//$.getScript("/oddsquad/js/newAgent.js", function(){});
	
};

	
// new agent code
newAgent = {
	
	/*** constants ***/
	ENTER_FIRST: $('#agentName').attr('value'),
	
	/*** variables ***/
	name: "", // agent name
	code: 0, // agent's code
	str: "", // used by animation
	counter: 0, // used by animation
	malePos: 0, // index of male avatar
	femalePos: 0, // index of female avatar
	avatarImg: "", // url of avatar image
	
	/*** functions ***/
	
	// initialize buttons and events
	init: function() {
		var _this = this;
		_this.openPopup("enterName");
		
		//$("#agentName").val(newAgent.ENTER_FIRST);
		$('.btn-enter').on('click', _this.agentEnterClick);
		$("#agentName").keyup(function(event){ 
			if(event.keyCode === 13) { newAgent.agentEnterClick(); }
		});
		
		//$("#agentNext").click(this.nextClick);
		$('[data-overlay="createagent"] .btn-next').on('click', _this.nextClick);
		
		$(".maleAvatarWrapper .agent-prev").on('click', _this.maleLeftClick);
		$(".maleAvatarWrapper .agent-next").on('click', _this.maleRightClick);
		$(".femaleAvatarWrapper .agent-prev").on('click', _this.femaleLeftClick);
		$(".femaleAvatarWrapper .agent-next").on('click', _this.femaleRightClick);
		
		//$("#agentMaleSelect").click(this.maleClick);
		//$("#agentFemaleSelect").click(this.femaleClick);
		$('.btn-male').on('click', _this.maleClick);
		$('.btn-female').on('click', _this.femaleClick);
		
		$('.btn-confirm-yes').on('click', _this.confirmYesClick);
		$('.btn-confirm-no').on('click', _this.confirmNoClick);
		$('.btn-complete').on('click',_this.finishClick);
		
	},
	
	// close a popup dialogue
	closePopup: function(id) {
		$("#" + id).removeClass('show');
		//$("#" + id).css("display", "none");
	},
	
	// open a popup dialogue
	openPopup: function(id) {
		
		$("#" + id).addClass('show');
		//$("#" + id).css("display", "inline-block");
	},
	
	// agent clicks enter button
	agentEnterClick: function(event) {
		event.preventDefault();
		var i;
		var n;
		var s;
		
		newAgent.name = $("#agentName").val().toUpperCase();
		
		if (newAgent.name == '' || newAgent.name == newAgent.ENTER_FIRST) {
			$("#agentName").addClass('error');
			
			setTimeout(function () {
				$("#agentName").removeClass('error');
			}, 250);

			return;
		} else {
			var nameCheck = newAgent.name;
			//console.log(nameCheck.charAt(0));
			
			if(nameCheck.charAt(0) == 'o' || nameCheck.charAt(0) == 'O') {
				//console.log('FIRST LETTER IS AN O');
			} else {
				//console.log('FIRST LETTER NEEDS AN O');
				newAgent.name = 'O' + newAgent.name
			}
		}

		newAgent.closePopup("enterName");
		newAgent.openPopup("enterCalculating");
		//$("#agentCode2").html(newAgent.name);
		s = "";
		for (i = 0; i < newAgent.name.length; i++) {
			s += '<span id="let' + i + '" class="let">' + newAgent.name.charAt(i) + '</span>';
			s += '<span id="add' + i + '" class="add">&nbsp;&nbsp;</span>';
		}
		$("#agentCode1").html(s);
		$('#agentCode').addClass('generating');
		newAgent.str = "";
		newAgent.count = 0;
		newAgent.code = 0;
		
		
		for (i = 0; i < newAgent.name.length; i++) {
			n = newAgent.name.charCodeAt(i) - 64;
			if (n < 0) { n = 0; }
			newAgent.code += n;
			setTimeout(newAgent.animateLetter, (i + 1) * 1500);
		}
		setTimeout(newAgent.showCode, (i + 1) * 1500);
	},
	
	// animate a letter to number in agent code, pos being position within string
	animateLetter: function() {
				
		var n;
		
		if (newAgent.str !== "") { newAgent.str += " "; }
		n = newAgent.name.charCodeAt(newAgent.counter) - 64;
		
		var randNum = setInterval(function() {
			var number = 1 + Math.floor(Math.random() * 26);
			$("#let" + (newAgent.counter - 1)).html(number).addClass('active');
		}, 100);
		
		if (n < 0) { n = 0; }
		
		setTimeout(function () {
			clearInterval(randNum);
			$("#let" + (newAgent.counter - 1)).html(n);
			$("#let" + (newAgent.counter - 1)).attr("class", "num");
			
		}, 1000);
			
		if (newAgent.counter > 0 ) {
			$("#add" + (newAgent.counter - 1).toString()).html("+");
		}
		newAgent.counter++;
	},
	
	// show agent code
	showCode: function() {
		$("#agentTitleCalc").html("STEP 1?? OF 2");
		$("#agentSubtitleCalc").html("YOUR AGENT ID IS:");
		$("#agentCode2").html('<span class="num">' + newAgent.code + '</span>');
		$("#agentCode2").html('<span class="num">' + newAgent.code + '</span>');
		$("#agentConfirm h4").html(newAgent.code);
		$('.agent-step5 h5').html("AGENT " + newAgent.code + "!");
		$('#agentCode').removeClass('generating').addClass('complete');
		$('[data-overlay="createagent"] .btn-next').addClass('show');
	},
	
	// user clicks on next button
	nextClick: function(event) {
		event.preventDefault();
		newAgent.closePopup("enterCalculating");
		newAgent.openPopup("enterGender");
	},
	
	// user clicks male left
	maleLeftClick: function(event) {
		event.preventDefault();
		$("#agentMale" + newAgent.malePos).removeClass('selected');
		newAgent.malePos--;
		$('.maleAvatarWrapper').addClass('animate');
		if (newAgent.malePos < 0) { newAgent.malePos = 2; }
		$("#agentMale" + newAgent.malePos).addClass('selected');
		setTimeout(function () {
			$('.maleAvatarWrapper').removeClass('animate');
		}, 750);
	},
	
	// user clicks male right
	maleRightClick: function(event) {
		event.preventDefault();
		
		$("#agentMale" + newAgent.malePos).removeClass('selected');
		newAgent.malePos++;
		$('.maleAvatarWrapper').addClass('animate');
		if (newAgent.malePos >= 3) { newAgent.malePos = 0; }
		$("#agentMale" + newAgent.malePos).addClass('selected');
		setTimeout(function () {
			$('.maleAvatarWrapper').removeClass('animate');
		}, 750);
		
	},
	
	// user clicks female left
	femaleLeftClick: function(event) {
		event.preventDefault();
		
		$("#agentFemale" + newAgent.femalePos).removeClass('selected');
		newAgent.femalePos--;
		$('.femaleAvatarWrapper').addClass('animate');
		if (newAgent.femalePos < 0) { newAgent.femalePos = 2; }
		$("#agentFemale" + newAgent.femalePos).addClass('selected');
		
		setTimeout(function () {
			$('.femaleAvatarWrapper').removeClass('animate');
		}, 750);
	},
	
	// user clicks female right
	femaleRightClick: function(event) {
		event.preventDefault();
		
		$("#agentFemale" + newAgent.femalePos).removeClass('selected');
		newAgent.femalePos++;
		$('.femaleAvatarWrapper').addClass('animate');
		if (newAgent.femalePos >= 3) { newAgent.femalePos = 0; }
		$("#agentFemale" + newAgent.femalePos).addClass('selected');
		setTimeout(function () {
			$('.femaleAvatarWrapper').removeClass('animate');
		}, 750);
	},
	
	// user selects a male agent
	maleClick: function(event) {
		event.preventDefault();
		newAgent.avatarImg = "male" + newAgent.malePos + ".png";
		newAgent.confirmAgent();
	},
	
	// user selects a female agent
	femaleClick: function(event) {
		event.preventDefault();
		newAgent.avatarImg = "female" + newAgent.femalePos + ".png";
		newAgent.confirmAgent();
	},
	
	// show confirm agent screen
	confirmAgent: function() {
		newAgent.closePopup("enterGender");
		newAgent.openPopup("agentConfirm");
		$("#agentConfirmImg").attr("src", '/oddsquad/img/agents/' + newAgent.avatarImg);
	},
	
	// user confirms avatar
	confirmYesClick: function(event) {
		event.preventDefault();
		newAgent.closePopup("agentConfirm");
		newAgent.openPopup("agentComplete");
		newAgent.saveInfo();
		//if (newAgent.getCookie("pbskids.username") === "") { PBS.KIDS.identity.prompt(); }
	},
	// user confirms avatar
	finishClick: function(event) {
		event.preventDefault();
		if (newAgent.getCookie("pbskids.username") === "") {
			org.pbskids.login.displayLogin();
			
		} else {
			console.log('---------------------------- finish click ----------------------------');
			var url				= $(this).attr('href'),
				title			= 'Odd Squad - ' + url,
				doneFunction	= getFunctionForString($(this).attr('data-genratr-doneFunc')),
				specFunction	= getFunctionForString($(this).attr('data-genratr-specFunc'));
		
			console.log('url: ', url);
			console.log('title: ', title);
			console.log('doneFunction: ', doneFunction);
			console.log('specFunction: ', specFunction);
			
			if(specFunction){
				console.log('FIRING SPECIAL FUNCTION');
				specFunction();
			};
			
			$(document).on("USERAGENT_INFO_LOADED", function(){
				console.log('INFO LOADED DETECTED TRIGGER');
				dashboardInstance.agent();
			});
			
			console.log('FIRING PUSH URL FUNCTION');
			pushUrl(this, url, title, doneFunction);
	
		}
	},
	
	
	// user confirms avatar, saves info (or tries to save info every second until user is logged in
	confirmYesClick: function(event) {
		event.preventDefault();
		newAgent.closePopup("agentConfirm");
		newAgent.openPopup("agentComplete");
		$("#agentCompleteName").html("AGENT " + newAgent.code + "!");
		newAgent.saveInfo();
		if (newAgent.getCookie("pbskids.username") === "") { 
			org.pbskids.login.displayLogin();
			//PBS.KIDS.identity.prompt();
		}
	},
	
	
	// save agent's info
	saveInfo : function() {
		if (newAgent.getCookie("pbskids.username") !== "") {
			$.post("/oddsquad/php/createAgent.php", { username:newAgent.getCookie("pbskids.username"), userid:newAgent.getCookie("pbskids.userid"), agentName:newAgent.name, avatar:newAgent.avatarImg } );
		}
		else {
			setTimeout(newAgent.saveInfo, 1000);
		}
	},
	
	
	// user wants to edit avatar
	confirmNoClick: function(event) {
		event.preventDefault();
		newAgent.closePopup("agentConfirm");
		newAgent.openPopup("enterGender");
	},
	
	// read a cookie
	getCookie: function(c_name) {
		var c_start;
		var c_end;		
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start !== -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end === -1) { c_end = document.cookie.length; }
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}	
	
};


// =======================================================
//              CREATE AGENT PAGE LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(createagentInstance.documentReady);
$(window).resize(createagentInstance.documentResize);
