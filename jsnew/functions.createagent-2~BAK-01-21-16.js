
window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);

var agentCode 		= 0,
	agentFirstName 	= '',
	agentAvatar 	= '',
	agentBackground = '',
	agentComplete 	= false,
	carouselBuilt 	= false,
	userLoggedin 	= false;


// new agent code
newAgent = {
		
	/*
	name 			: "", // agent name
	code 			: 0, // agent's code
	avatar 			: "", // url of avatar image
	background 		: '',
	*/
	
	// initialize buttons and events
	init: function() {
		var _this = this;

		populateCreateForm();
	},
	changeStep: function(elem){
		var gotoStep = $(elem).attr('data-gotostep');
		$('.createagent').attr('data-stage', gotoStep);

		/*
		if(gotoStep == 4 && $('.createagent').attr('data-stage1-complete') == true && $('.createagent').attr('data-stage2-complete') == true && $('.createagent').attr('data-stage3-complete') == true){
			console.error('good to save');
		};
		*/
	},
	setAgentBg: function(){

			/*
			agentBackground = $('.slick-active').find('img').attr('src');
			agentBackground = agentBackground.split('/').pop();
			*/
			
			agentBackground = $('.ca-bg-carousel .slick-active').attr('data-backgroundid');

			console.log('agentBackground: ', agentBackground)

			$('.agent-background').find('img').attr('src', $('.ca-bg-carousel .slick-active').find('img').attr('src'));

	},
	formatAgentName: function(){
		var agentName = newAgent.genAgentName();

		agentName = agentName.replace(/\s/g, '');
		var agentNameHTML = '';

		console.log('agentFirstName2: ', agentFirstName);

		for (i = 0; i <= agentName.length; i++) {

			agentNameHTML += '<span id="let' + i + '" class="let">' + agentName.charAt(i) + '</span>';
			
			if(i < (agentName.length-1)){
				agentNameHTML += '<span id="add' + i + '" class="add">+</span>';
			};
		};
		$('.genAgentId').html(agentNameHTML);

		newAgent.startAnimation();
	},
	startAnimation: function() {
		$('.stage-1-5').removeClass('showCode');

		$('.createagent').attr('data-stage1-complete', false);
		$('.stage-1-5').attr('data-complete', false);

		var agentName = newAgent.genAgentName();

		$('#agentName').addClass('generating');
		
		for (i = 0; i < agentName.length; i++) {
			var n = agentName.charCodeAt(i) - 64;

			if (n < 0) { n = 0; }
			agentCode += n;

			newAgent.animateLetter(agentName, i, agentName.length);

			$('.genAgentId').css('font-size', 2.5 - (i * 0.05) + 'em');
		
		};
	},
	animateLetter: function(agentName, letter, letterCount) {

		setTimeout( function(){
			var n;
			
			n = agentName.charCodeAt(letter) - 64;
			
			randNum = setInterval(function() {
				var number = 1 + Math.floor(Math.random() * 26);
				$("#let" + (letter)).html(number).addClass('active');
			}, 100);
			
			if (n < 0) { n = 0; }
			
			setTimeout(function () {
				clearInterval(randNum);
				$("#let" + (letter)).html(n);
				$("#let" + (letter)).attr("class", "num");

				console.log('letter: ', letter);
				console.log('letterCount: ', letterCount);
				if(letter == (letterCount - 1)) {
					newAgent.showCode(agentCode);
				};
				
			}, 1000);

		}, (letter + 1) * 1500);

	},
	showCode: function(agentCode) {
		var codeContainer = $('.stage-1-5');

		$('.confirmAgent .agent-badge').find('span').html(agentCode);
		$(codeContainer).find('.agentId').html(agentCode);
		$('.createagent').find('.agent-badge').find('span').html(agentCode);
		
		setTimeout(function () {
			$(codeContainer).addClass('showCode');
			$(codeContainer).attr('data-complete', true);
			$('.createagent').attr('data-stage1-complete', true);
		}, 500);

	},
	genAgentName: function(){
		var firstName = $('#agentName').val().toUpperCase();

		if(firstName.substring(0,1) == 'o' || firstName.substring(0,1) == 'O') {

		} else {
			firstName = 'O' + firstName;
		};
		console.log('firstName: ', firstName);
		console.log('agentFirstName1: ', agentFirstName);
		agentFirstName = firstName;
		return firstName;

	},
	
	
	// user confirms avatar, saves info (or tries to save info every second until user is logged in
	confirmYesClick: function() {
		
		if (newAgent.getCookie("pbskids.username") === "") { 
			org.pbskids.login.displayLogin();
		} else {
			newAgent.saveInfo()
		};
	},
	
	
	// save agent's info
	saveInfo: function() {

		//$agent->addNewUser($username, $userid, $agentName, $avatar, $background, $agentNumber);
		if (org.pbskids.login.loggedin) {

			$.post("/oddsquad/php/createAgent.php", {
					username	: org.pbskids.login.user.name,
					userid		: org.pbskids.login.user.id,
					agentName	: agentFirstName,
					avatar 		: agentAvatar,
					background 	: agentBackground,
					agentNumber : agentCode

				}).done( function(){

					console.log('userinfo has created or updated');
					updateUserLogin();
					closeOverlay('createagent');

				}
			);

		} else {

			setTimeout(newAgent.saveInfo, 1000);

		};
	},
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

newAgent.init();


function populateCreateForm() {
	initBGCarousel();
	populateUserInfo();
};

function initBGCarousel() {
	
	if(($('.ca-bg-carousel').length > 0) && ($('.ca-bg-carousel.slick-initialized').length === 0)){
		
		console.log('init bg carousel');

		$('.ca-bg-carousel').slick({
			dots: true,
			speed: 300,
			cssEase: 'ease-in-out'
		});
	};

}

function populateUserInfo() {

	/*
	agentCode 		= 0,
	agentFirstName 	= '',
	agentAvatar 	= '',
	agentBackground = '',
	agentComplete 	= false,
	*/

	if($('body').attr('data-agent-login') == 'true'){

		$('#agentName').prop('defaultValue', userLogin[0].name);


	};

};

	$(document).on('afterChange', '.ca-bg-carousel', function(slick, currentSlide) {
		newAgent.setAgentBg();
	});

	$(document).on('init', '.ca-bg-carousel', function(slick, currentSlide) {

		$('.agent-background').find('img').attr('src', $('.ca-bg-carousel .slick-active').find('img').attr('src'));
		newAgent.setAgentBg();
		
	});
	
	$(document).on('click', '[data-complete="true"] [data-gotostep]', function(){
		console.log('HERE');
		if($(this).closest('section').attr('data-stageid')){
			var stageId = $(this).closest('section').attr('data-stageid');
			$('.createagent aside').attr('data-stage' + stageId + '-complete', 'true');
		};

	});

	$(document).on('click', '.stage-1[data-complete="true"] .btn-ca-next', function(){

		agentCode = 0;
		newAgent.formatAgentName();
	});

	$(document).on('click', '[data-gotostep="3"]', function(){
		$('[data-stage3-complete]').attr('data-stage3-complete', true);
		newAgent.setAgentBg();
		/*
		if(carouselBuilt === false){
			console.error('build carousel');
			
			carouselBuilt = true;
		} else {
			console.error('carousel already built');
		};
		*/

	});

	$(document).on('blur', '#agentName', function(){
		console.log('input blur');

		var _this = this;
		var valueCurrent = $(_this).val();
		var valueDefault = $(_this).prop('defaultValue');
		
		if(this.value == ''){
			agentName = '';
			this.value = valueDefault;
			$(_this).closest('section').attr('data-complete', 'false');
		} else {
			agentName = this.value;
			$(_this).closest('section').attr('data-complete', 'true');

		};

	});

	$(document).on('focus', '#agentName', function(event){
		event.preventDefault();
		
		console.log('input focus');

		var _this = this;
		var valueCurrent = $(_this).val();
		var valueDefault = $(_this).prop('defaultValue');
		
		if(this.value == valueDefault || valueCurrent == 'O'){
			this.value = '';
			$(_this).closest('section').attr('data-complete', 'false');
		} else {
		};
	});

	$(document).on('keypress', '#agentName', function(){
		console.log('input keypress');
		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();

		if(valueCurrent == '' || valueCurrent == 'O'){
			$(_this).closest('section').attr('data-complete', 'false');
		} else {
		};

		//65-90 = A-Z, 97-122 = a-z
	  	if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			$(_this).closest('section').attr('data-complete', 'true');
	  		return key;

	  	}else {
	  		//console.log('key: ', key)
	  		return false;
	  	};
	});
	$(document).on('keyup', '#agentName', function(){
		console.log('input keyup');

		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();

		if(valueCurrent == ''){
			$(_this).closest('section').attr('data-complete', 'false');
		};
		if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			
	  	};
		// 8 = backspace, 46 = delete
		if((key == 8) || (key == 46)) {
	  		return key;
	  	};
	});	

	$(document).on('click', '[data-complete="false"] [data-gotostep]', function(){
		var _this = this;

		$(_this).parent().addClass('error');
		
		setTimeout(function(){
			$(_this).parent().removeClass('error');
		}, 250);

		setTimeout(function(){
			$(_this).parent().addClass('error');
		}, 500);
		
		setTimeout(function(){
			$(_this).parent().removeClass('error');
		}, 750);
		
	});


	$(document).on('click', '.btn-ca-s2', function(){
		var _this = this;
		$(_this).closest('section').siblings('.stage-2-5').attr('data-complete', 'false');
		$('[data-stage2-complete]').attr('data-stage2-complete', 'false');
		$(_this).closest('section').siblings('.stage-2-5').find('.btn-ca-s2b > .sized > img').removeClass('active');
		$(_this).closest('section').siblings('.stage-2-5').find('.avatar-select[data-gender]').removeClass('selected');

		var gender = $(_this).attr('data-gender');

		if($(_this).hasClass('active')) {
			$(_this).removeClass('active');
			$(_this).closest('section').attr('data-complete', 'false');
			$('[data-stage2-complete]').attr('data-stage2-complete', 'false');

		} else{
			$(_this).closest('section').find('.btn-ca-s2').each(function(){
				$(this).removeClass('active');
			});
			$(_this).addClass('active');
			$(_this).closest('section').attr('data-complete', 'true');

			$(_this).closest('section').siblings('.stage-2-5').find('.avatar-select[data-gender="' + gender + '"]').addClass('selected');
		};
	});

	$(document).on('click', '.btn-ca-s2b', function(){
		var _this = $(this).closest('.btn-ca-s2b');

		if($(_this).closest('section').attr('data-complete') == 'true'){
			$(_this).closest('section').find('.btn-ca-s2b').removeClass('active');
			$(_this).closest('section').attr('data-complete', 'false');
			$('[data-stage2-complete]').attr('data-stage2-complete', 'false');

		} else if ($(_this).hasClass('active')) {
			$(_this).removeClass('active');
			$(_this).closest('section').attr('data-complete', 'false');
			$('[data-stage2-complete]').attr('data-stage2-complete', 'false');

		} else {
			$(_this).closest('section').find('.btn-ca-s2b').each(function(){
				$(this).removeClass('active');
			});
			$(_this).addClass('active');
			$(_this).closest('section').attr('data-complete', 'true');
			$('[data-stage2-complete]').attr('data-stage2-complete', 'true');
			$('.agent-avatar').attr('data-avatar', $(_this).attr('data-value'))
			agentAvatar = $(_this).attr('data-value') + '.png';
		};
	});

	$(document).on('click', '.stage-4 .btn-ca-next', function(){

			console.log('X userLoggedin:', userLoggedin);

		if(($('.createagent').attr('data-stage1-complete') == 'true') && ($('.createagent').attr('data-stage2-complete') == 'true') && ($('.createagent').attr('data-stage3-complete') == 'true')){
			
			console.log('all sections complete');
			console.log('agentFirstName', agentFirstName);
			console.log('agentCode', agentCode);
			console.log('agentAvatar', agentAvatar);
			console.log('agentBackground', agentBackground);

			agentComplete = true;

			if(org.pbskids.login.loggedin === true){
					userLoggedin = true;
					console.log('setting user loggedin as true')
			}

			console.log('userLoggedin:', userLoggedin);

			if(userLoggedin){
				console.error('save agent to db');

				newAgent.saveInfo();

			} else { 
				console.error('pbs login overlay display');

				org.pbskids.login.displayLogin();

			}

		} else {
			console.error('missing some details');
			console.log('agentFirstName', agentFirstName);
			console.log('agentCode', agentCode);
			console.log('agentAvatar', agentAvatar);
			console.log('agentBackground', agentBackground);

			agentComplete = false;
		};

	});

	$(document).bind("org_pbskids_login_LoginEvent_LoggedIn", function () {
		userLoggedin = true;
		if($('.createagent').attr('data-stage1-complete') == 'true' && $('.createagent').attr('data-stage2-complete') == 'true' && $('.createagent').attr('data-stage3-complete') == 'true'){

			newAgent.saveInfo();

		};
	});

	$(document).bind("org_pbskids_login_LoginEvent_LoggedOut", function () {
	    //location.reload();
		userLoggedin = false;
	});


$(document).on('click',	'[data-complete="true"] [data-gotostep], nav [data-gotostep], .confirmAgent [data-gotostep], .btn-ca-prev[data-gotostep]', function(){
		newAgent.changeStep(this)
});

$(document).bind('org_pbskids_login_LoginEvent_LoggedIn', function (){

	for (var i = 0; i < userLogin[0].awardCache.length; i++){

		achievements.add(userLogin[0].awardCache[i], 'UNLOCKED');

	};

	console.log('login detected');

	if($('.createagent').attr('data-stage') == '4' && $('.createagent').attr('data-stage1-complete') == 'true' && $('.createagent').attr('data-stage2-complete') == 'true' && $('.createagent').attr('data-stage3-complete') == 'true') {
		console.log('login detected - save agent to db');

		newAgent.saveInfo();

	};

});