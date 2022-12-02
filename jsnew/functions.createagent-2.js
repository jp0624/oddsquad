
window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	$(document).find('body').removeClass('load');
},false);

$(document).bind('USERAGENT_INFO_LOADED', function () {
	
	if($('.createagent').attr('data-stage') == '0' && userLogin[0].name && userLogin[0].code && userLogin[0].avatar && userLogin[0].background){
		$('.createagent').attr('data-stage', 4);
	};

	newAgent.info.set();

});

var agentComplete 	= false,
	carouselBuilt 	= false,
	userLoggedin 	= false;


// new agent code
newAgent = {

	name 		: null,
	code 		: null,
	avatar 		: null,
	background 	: null,
	gender 		: null,
	character 	: null,
	
	// initialize buttons and events
	init: function() {
		var _this = this;

		if($('.createagent').attr('data-stage') == '0' && userLogin[0].name && userLogin[0].code && userLogin[0].avatar && userLogin[0].background){
			$('.createagent').attr('data-stage', 4);
		};

		$(['/oddsquad/img/createagent/stage-2/boy-active.png','/oddsquad/img/createagent/stage-2/girl-active.png']).preload();

		newAgent.input.background.init();
		newAgent.info.set();
	},

	info: {
		set: function() {

			newAgent.name			= userLogin[0].name ? userLogin[0].name : null;
			newAgent.code			= userLogin[0].code ? userLogin[0].code : null;
			newAgent.avatar			= userLogin[0].avatar ? userLogin[0].avatar : null;
			newAgent.background 	= userLogin[0].background ? userLogin[0].background : null;
			newAgent.character		= userLogin[0].avatar ? newAgent.info.getCharacter(userLogin[0].avatar) : null;
			newAgent.gender 		= userLogin[0].avatar ? newAgent.character.type : null;

			newAgent.step.refresh();
			newAgent.info.display();
		},
		getCharacter: function(avatar){

			var avatar = avatar.slice(0, -4);

			character	= {
				
				id: avatar.substr(avatar.length - 1),
				type: avatar.slice(0, -1)
			};

			return character;

		},
		change: function(name, code, avatar, background, gender, character){

			newAgent.name		= name ? name : newAgent.name ? newAgent.name : userLogin[0].name ? userLogin[0].name : null;
			newAgent.code		= code ? code : newAgent.code ? newAgent.code : userLogin[0].code ? userLogin[0].code : null;
			newAgent.avatar		= avatar ? avatar : newAgent.avatar ? newAgent.avatar : userLogin[0].avatar ? userLogin[0].avatar : null;
			newAgent.background = background ? background : newAgent.background ? newAgent.background : userLogin[0].background ? userLogin[0].background : null;

			newAgent.character	= avatar ? newAgent.info.getCharacter(avatar) : newAgent.avatar ? newAgent.info.getCharacter(newAgent.avatar) : userLogin[0].avatar ? newAgent.info.getCharacter(userLogin[0].avatar) : null;
			newAgent.gender 	= gender ? gender : newAgent.gender ? newAgent.gender : newAgent.avatar ? newAgent.character.type : null;

			newAgent.step.refresh();
			newAgent.info.display();
		},
		clear: function(name, code, avatar, background, gender){

			newAgent.name		= name ? null : newAgent.name;
			newAgent.code		= name ? null : newAgent.code;
			newAgent.code		= code ? null : newAgent.code;
			newAgent.avatar		= avatar ? null : newAgent.avatar;
			newAgent.background = background ? null : newAgent.background;
			newAgent.character 	= avatar ? null : newAgent.character;
			newAgent.gender 	= gender ? null : newAgent.gender;

			userLogin[0].name		= name ? null : userLogin[0].name;
			userLogin[0].code		= name ? null : userLogin[0].code;
			userLogin[0].code		= code ? null : userLogin[0].code;
			userLogin[0].avatar		= avatar ? null : userLogin[0].avatar;
			userLogin[0].background = background ? null : userLogin[0].background;
			
			newAgent.step.refresh();
			newAgent.info.display();
		},
		display: function(){

			console.log('newAgent.name', newAgent.name);
			console.log('newAgent.code', newAgent.code);
			console.log('newAgent.avatar', newAgent.avatar);
			console.log('newAgent.background', newAgent.background);
			console.log('newAgent.gender', newAgent.gender);
			console.log('newAgent.character', newAgent.character);
		}

	},
	step: {
		ref: function(value){
			var step = {};

			if(value === 0){
				step.id = 0;
				step.elem = $('section.stage-0');

			}else if(value === 1){
				step.clear = 'newAgent.input.name.clear';
				step.id = 1;
				step.elem = $('section.stage-1');
				step.childid = 1.5;
				step.child = $('section.stage-1-5');

			}else if(value === 1.5){
				step.clear = 'newAgent.input.code.clear';
				step.id = 1.5;
				step.elem = $('section.stage-1-5');
				step.parentid = 1;
				step.parent = $('section.stage-1');

			}else if(value === 2){
				step.clear = 'newAgent.input.gender.clear';
				step.id = 2;
				step.elem = $('section.stage-2');
				step.childid = 2.5;
				step.child = $('section.stage-2-5');

			}else if(value === 2.5){
				step.clear = 'newAgent.input.avatar.clear';
				step.id = 2.5;
				step.elem = $('section.stage-2-5');
				step.parentid = 2;
				step.parent = $('section.stage-2');

			}else if(value === 3){
				step.clear = 'newAgent.input.background.clear';
				step.id = 3;
				step.elem = $('section.stage-3');

			}else if(value === 4){
				step.id = 4;
				step.elem = $('section.stage-4');

			}

			return step;

		},
		set: function(id){

			var step = newAgent.step.ref(id);
		
			if(!step.parent && !step.child){
				$('.createagent').attr('data-stage' + step.id + '-complete', 'true');

			}else if(step.parent && step.parent.attr('data-complete') == 'true') {

				$('.createagent').attr('data-stage' + step.parentid + '-complete', 'true');

			}else if(step.child && step.child.attr('data-complete') == 'true'){

				$('.createagent').attr('data-stage' + step.id + '-complete', 'true');
			}

			step.elem.attr('data-complete', 'true');

		},
		clear: function(id){

			var step = newAgent.step.ref(id);

			if(step.clear){
				var clear = getFunctionForString(step.clear);
				clear();
			};

			if(!step.parent && !step.child){
				$('.createagent').attr('data-stage' + step.id + '-complete', 'false');

			}else if(step.parent) {

				$('.createagent').attr('data-stage' + step.parentid + '-complete', 'false');

			}else if(step.child){
				$('.createagent').attr('data-stage' + step.id + '-complete', 'false');
			}

			step.elem.attr('data-complete', 'false');

		},
		change: function(elem) {

			var id = parseFloat($(elem).attr('data-gotostep')),
				activeStep = parseFloat($('.createagent').attr('data-stage'));
			
			var step = newAgent.step.ref(id);

			if(step.elem.attr('data-complete') == 'false' && step.parent && activeStep !== step.parentid){

				$('.createagent').attr('data-stage', step.parentid);

			}else{

				$('.createagent').attr('data-stage', step.id);

			}

		},
		refresh: function(id){
			if(id){

				console.log('Refresh was sent with an ID but nothing to do');

			}else{
				if(newAgent.name){
					newAgent.input.name.set(newAgent.name);
					newAgent.step.set(1);
				}else{
					if($('.createagent').attr('data-stage') == '1.5'){
						$('.createagent').attr('data-stage', 1)
					};
					newAgent.step.clear(1);
					newAgent.step.clear(1.5);
				};

				if(newAgent.code){
					newAgent.input.code.set(newAgent.code);
					newAgent.step.set(1.5);
				}else{
					newAgent.step.clear(1.5);
				};

				if(newAgent.gender){
					newAgent.input.gender.set(newAgent.gender);
					newAgent.step.set(2);
				}else{
					if($('.createagent').attr('data-stage') == '2.5'){
						$('.createagent').attr('data-stage', 2)
					};
					newAgent.step.clear(2);
					newAgent.step.clear(2.5);
				};

				if(newAgent.avatar){
					newAgent.input.avatar.set(newAgent.avatar);
					newAgent.step.set(2.5);
				}else{
					newAgent.step.clear(2.5);
				};

				if(newAgent.background){
					newAgent.input.background.set(newAgent.background);
					newAgent.step.set(3);
				}else{
					newAgent.step.clear(3);
				};
			}
			

		},
	},
	input: {
		name: {
			set: function(value) {
				if(value === '' || value === null || value === undefined) {
					$('#agentName').val('ENTER YOUR FIRST NAME');
				} else {
					$('#agentName').val(value);
				}
				
				/*
				$(_this).val();
				var valueDefault = $(_this).prop('defaultValue');
				*/
			},
			clear: function() {

				userLogin[0].name = null;
				$('#agentName').val('ENTER YOUR FIRST NAME');

			},
			init: function() {
				var name = newAgent.input.name.clean();
					name = name.replace(/\s/g, '');

				var agentNameHTML = '';

				for (i = 0; i <= name.length; i++) {

					agentNameHTML += '<span id="let' + i + '" class="let">' + name.charAt(i) + '</span>';
					if(i < (name.length-1)){
						agentNameHTML += '<span id="add' + i + '" class="add">+</span>';
					};
				};

				$('.genAgentId').html(agentNameHTML);

				newAgent.input.code.init(name);

			},
			clean: function(){
				var name = $('#agentName').val().toUpperCase();

				if(name.substring(0,1) == 'o' || name.substring(0,1) == 'O') {

				} else {
					name = 'O' + name;
				};

				newAgent.info.change(name);
				return name;

			}
		},
		code: {
			set: function(value) {

				var step = newAgent.step.ref(1.5);

				$('.agent-badge').find('span').html(value);

				step.elem.addClass('showCode');
				step.elem.find('.agentId').html(value);

			},
			clear: function() {

				userLogin[0].code = null;
				var step = newAgent.step.ref(1.5);

				$('.agent-badge').find('span').html('');

				step.elem.removeClass('showCode');
				step.elem.find('.agentId').html('');

			},
			init: function(name) {

				newAgent.code = null;
				
				$('.stage-1-5').removeClass('showCode');
				$('.createagent').attr('data-stage1-complete', false);
				$('.stage-1-5').attr('data-complete', false);

				$('#agentName').addClass('generating');

				for (i = 0; i < name.length; i++) {
					var n = name.charCodeAt(i) - 64;

					if (n < 0) { n = 0; }

					newAgent.code += n;
					newAgent.input.code.animate(name, i, name.length);

					$('.genAgentId').css('font-size', 2.5 - (i * 0.05) + 'em');
				};

			},
			animate: function(name, letter, letterCount) {

				setTimeout( function(){
					var n;
					
					n = name.charCodeAt(letter) - 64;
					
					randNum = setInterval(function() {
						var number = 1 + Math.floor(Math.random() * 26);
						$("#let" + (letter)).html(number).addClass('active');
					}, 100);
					
					if (n < 0) { n = 0; }
					
					setTimeout(function () {
						clearInterval(randNum);
						$("#let" + (letter)).html(n);
						$("#let" + (letter)).attr("class", "num");

						if(letter == (letterCount - 1)) {
							newAgent.info.change('', newAgent.code);
						};
						
					}, 1000);

				}, (letter + 1) * 1500);

			},
		},
		gender: {
			set: function(){
				$('.stage-2 [data-gender="' + newAgent.gender + '"]').addClass('active');
				$('.stage-2-5 [data-gender="' + newAgent.gender + '"]').addClass('selected');
				$('section.stage-2').attr('data-complete', 'true');


			},
			clear: function(){

				$('.stage-2 .btn-ca-s2').removeClass('active');
				$('.stage-2-5 .btn-ca-s2b').removeClass('active');
				$('.stage-2-5 .avatar-select').removeClass('selected');
				$('section.stage-2').attr('data-complete', 'false');
			}
		},
		avatar: {
			set: function(value){

				//var avatarImg = newAgent.character.type + (parseInt(newAgent.character.id) + 1);
				$('[data-value="' + (newAgent.character.type + newAgent.character.id) + '"]').addClass('active');
				$('.agent-avatar').attr('data-avatar', newAgent.character.type + (parseInt(newAgent.character.id) + 1));

			},
			clear: function(){
				
				$('.stage-2-5 .btn-ca-s2b').removeClass('active');
				$('section.stage-2-5').attr('data-complete', 'false');

			}
		},
		background: {
			set: function(){
				/*
					agentBackground = $('.slick-active').find('img').attr('src');
					agentBackground = agentBackground.split('/').pop();
				*/

				//var id = $('.ca-bg-carousel').find('[data-slick-index="' + $('.ca-bg-carousel').slick('slickCurrentSlide') + '"]').attr('data-backgroundid');
				var bgIndex = $('.ca-bg-carousel').find('[data-backgroundid="' + newAgent.background + '"]');

				$('.ca-bg-carousel').slick('slickGoTo', bgIndex.attr('data-slick-index'), true);
				$('.agent-background').find('img').attr('src', bgIndex.find('img').attr('src') );

				//$('.agent-background').find('img').attr('src', $('.ca-bg-carousel .slick-active').find('img').attr('src'));

			},
			clear: function(){
				
			},
			init: function(){
				if(($('.ca-bg-carousel').length > 0) && ($('.ca-bg-carousel.slick-initialized').length === 0)){

					$('.ca-bg-carousel').slick({
						dots: true,
						speed: 300,
						cssEase: 'ease-in-out'
					});
				};
			}
		}
	},
	saveInfo: function() {

		//$agent->addNewUser($username, $userid, $agentName, $avatar, $background, $agentNumber);
		if (org.pbskids.login.loggedin) {

			$.post("/oddsquad/php/createAgent.php", {
					username	: org.pbskids.login.user.name,
					userid		: org.pbskids.login.user.id,
					agentName	: newAgent.name,
					avatar 		: newAgent.avatar,
					background 	: newAgent.background,
					agentNumber : newAgent.code

				}).done( function(){
					updateUserLogin();
					closeOverlay('createagent');

				}
			);

		} else {

			setTimeout(newAgent.saveInfo(), 1000);

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
	
/* ---------------------------
		GLOBAL LISTENERS
--------------------------- */

	$(document).on('click', '[data-complete="true"] [data-gotostep]', function(){
		
		if($(this).closest('section').attr('data-stageid')){
			var stageId = $(this).closest('section').attr('data-stageid');
			$('.createagent aside').attr('data-stage' + stageId + '-complete', 'true');
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

	$(document).on('click',	'[data-complete="true"] [data-gotostep], nav [data-gotostep], .confirmAgent [data-gotostep], .btn-ca-prev[data-gotostep]', function(){
		newAgent.step.change(this)
	});

	$(document).bind("org_pbskids_login_LoginEvent_LoggedOut", function () {
	    //location.reload();
		userLoggedin = false;
	});

	$(document).bind('org_pbskids_login_LoginEvent_LoggedIn', function (){

		for (var i = 0; i < userLogin[0].awardCache.length; i++){
			achievements.add(userLogin[0].awardCache[i], 'UNLOCKED');

			if((i + 1) == userLogin[0].awardCache.length){
				userLogin[0].awardCache = [];
			};
		};

		if($('.createagent').attr('data-stage') == '4' && $('.createagent').attr('data-stage1-complete') == 'true' && $('.createagent').attr('data-stage2-complete') == 'true' && $('.createagent').attr('data-stage3-complete') == 'true') {
			newAgent.saveInfo();

		};

	});

/* ---------------------------
	BACKGROUND LISTENERS
--------------------------- */
	$(document).on('afterChange', '.ca-bg-carousel', function() {

		var curSlide = $('.ca-bg-carousel').find('[data-slick-index="' + $('.ca-bg-carousel').slick('slickCurrentSlide') + '"]');
		newAgent.info.change('','','',curSlide.attr('data-backgroundid'));
	});

	$(document).on('init', '.ca-bg-carousel', function() {

	});
	$(document).on('click', '[data-gotostep="3"]', function(){

		var curSlide = $('.ca-bg-carousel').find('[data-slick-index="' + $('.ca-bg-carousel').slick('slickCurrentSlide') + '"]');
		newAgent.info.change('','','',curSlide.attr('data-backgroundid'));
	
	});


/* ---------------------------
	NAME/ID LISTENERS
--------------------------- */
	$(document).on('click', '.stage-1[data-complete="true"] .btn-ca-next', function(){

		newAgent.code = 0;
		newAgent.input.name.init();

	});


	$(document).on('blur', '#agentName', function(){

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

	$(document).on('focus', '#agentName', function(){
		
		var _this = this;
		var valueCurrent = $(_this).val();
		var valueDefault = $(_this).prop('defaultValue');
		
		if(this.value == valueDefault || valueCurrent == 'O'){
			this.value = '';

			$(_this).closest('section').attr('data-complete', 'false');
		};

	});

	$(document).on('keypress', '#agentName', function(){

		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();

		if(valueCurrent == '' || valueCurrent == 'O'){

			$(_this).closest('section').attr('data-complete', 'false');
		};

		//65-90 = A-Z, 97-122 = a-z
	  	if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {

			$(_this).closest('section').attr('data-complete', 'true');
	  		return key;

	  	}else{

	  		return false;
	  	};

	});
	$(document).on('keyup', '#agentName', function(){

		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();

		if(valueCurrent == ''){
			$(_this).closest('section').attr('data-complete', 'false');
		};

		if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			return;
	  	};

		if((key == 8) || (key == 46)) {
	  		return key;
	  	} else if (key == 13 && $('.createagent').attr('data-stage') == '1') {

			$('.stage-1 .btn-ca-next').click();
			$('.stage-1-5 .btn-ca-next').focus();
	  	};
	});	

	$(document).on('keydown', '#agentName', function(){

		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();

		if(valueCurrent == ''){
			$(_this).closest('section').attr('data-complete', 'false');
		};

		if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			return;
	  	};

		if((key == 8) || (key == 46)) {
	  		return key;
	  	} else if (key == 13 && $('.createagent').attr('data-stage') == '1') {

			$('.stage-1 .btn-ca-next').click();
			$('.stage-1-5 .btn-ca-next').focus();
	  	};
	});	


/* ---------------------------
		AVATAR LISTENERS
--------------------------- */
	$(document).on('click', '[data-gotostep="2"]', function(){
		//newAgent.step.clear(2);
	});

	$(document).on('click', '.btn-ca-s2', function(event){
		event.preventDefault();
		
		var _this = this;

		if(newAgent.gender && $(_this).hasClass('active')) {
			
			newAgent.info.clear('','','avatar','','gender');

		} else {

			var gender = $(_this).attr('data-gender');

			newAgent.info.clear('','','avatar','','gender');
			newAgent.info.change('','','','',gender);
		};

	});

	$(document).on('click', '.btn-ca-s2b', function(){
		
		var _this = this;

		if($('section.stage-2-5').attr('data-complete') == 'true'){

			newAgent.info.clear('','','avatar');

		}else if($(_this).hasClass('active')){
			newAgent.info.clear('','','avatar');

		} else{
			newAgent.input.avatar.clear();
			newAgent.info.change('','',$(_this).attr('data-value') + '.png');
		}

	});

/* ---------------------------
	CONFIRMATION LISTENERS
--------------------------- */
	$(document).on('click', '.stage-4 .btn-ca-next', function(){

		if(($('.createagent').attr('data-stage1-complete') == 'true') && ($('.createagent').attr('data-stage2-complete') == 'true') && ($('.createagent').attr('data-stage3-complete') == 'true')){
			
			newAgent.info.display();

			agentComplete = true;

			if((org.pbskids.login.loggedin === true) || userLoggedin){
				newAgent.saveInfo();

			} else {
				org.pbskids.login.displayLogin();

			};

		} else {
			newAgent.info();
			agentComplete = false;
		};

	});