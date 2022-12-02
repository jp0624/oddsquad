
window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);

$(document).bind('USERAGENT_INFO_LOADED', function () {
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
	gender 		: {},
	
	// initialize buttons and events
	init: function() {
		var _this = this;

		newAgent.input.background.init();
		newAgent.info.set();
	},

	info: {
		set: function() {
			console.log('this: ', this);

			newAgent.name			= userLogin[0].name ? userLogin[0].name : null;
			newAgent.code			= userLogin[0].code ? userLogin[0].code : null;
			newAgent.avatar			= userLogin[0].avatar ? userLogin[0].avatar : null;
			newAgent.background 	= userLogin[0].background ? userLogin[0].background : null;
			newAgent.gender 		= newAgent.avatar ? newAgent.info.getGender(newAgent.avatar) : null;

			newAgent.step.refresh();
			newAgent.info.display();
		},
		getGender: function(avatar){

			var avatar = avatar.slice(0, -4);

			character	= {
				
				id: avatar.substr(avatar.length - 1),
				type: avatar.slice(0, -1)
			};

			return character;

		},
		change: function(name, code, avatar, background, gender){
			//addAgentInfo(name, code, avatar, background);

			newAgent.name		= name ? name : newAgent.name ? newAgent.name : userLogin[0].name ? userLogin[0].name : null;
			newAgent.code		= code ? code : newAgent.code ? newAgent.code : userLogin[0].code ? userLogin[0].code : null;
			newAgent.avatar		= avatar ? avatar : newAgent.avatar ? newAgent.avatar : userLogin[0].avatar ? userLogin[0].avatar : null;
			newAgent.background = background ? background : newAgent.background ? newAgent.background : userLogin[0].background ? userLogin[0].background : null;
			newAgent.gender 	= avatar ? newAgent.info.getGender(newAgent.avatar) : newAgent.avatar ? newAgent.info.getGender(newAgent.avatar) : null;

			newAgent.step.refresh();
			newAgent.info.display();
		},
		clear: function(name, code, avatar, background){
			//addAgentInfo(name, code, avatar, background);

			newAgent.name		= name ? null : newAgent.name;
			newAgent.code		= name ? null : newAgent.code;
			newAgent.code		= code ? null : newAgent.code;
			newAgent.avatar		= avatar ? null : newAgent.avatar;
			newAgent.background = background ? null : newAgent.background;
			newAgent.gender 	= avatar ? null : newAgent.info.getGender(newAgent.avatar);

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
				step.child = $('section.stage-1.5');

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
				step.child = $('section.stage-2.5');

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
			console.log('this is step ref: ', step);
			return step;

		},
		set: function(id){

			console.log('Im about to ask for details on id: ', id);

			var step = newAgent.step.ref(id);
		
			if(!step.parent && !step.child){
				$('.createagent').attr('data-stage' + step.id + '-complete', 'true');

			}else if(step.parent && step.parent.attr('data-complete') == 'true') {

				console.log('my parent has also been completed');
				$('.createagent').attr('data-stage' + step.parentid + '-complete', 'true');

			}else if(step.child && step.child.attr('data-complete') == 'true'){

				console.log('my child has also been completed')
				$('.createagent').attr('data-stage' + step.id + '-complete', 'true');
			}

			step.elem.attr('data-complete', 'true');

		},
		clear: function(id){

			/*
				var step = newAgent.step.ref(id);
				if(step.type) {
					$('.createagent').attr('data-stage' + id + '-complete', 'false');
				}
				step.elem.attr('data-complete', 'false');
			*/
		

			var step = newAgent.step.ref(id);
		
			console.log('step: ', step);

			if(step.clear){
				var clear = getFunctionForString(step.clear);
				clear();
			};

			if(!step.parent && !step.child){
				$('.createagent').attr('data-stage' + step.id + '-complete', 'false');

			//}else if(step.parent && step.parent.attr('data-complete') == 'false') {
			}else if(step.parent) {

				console.log('my parent has also been completed');
				$('.createagent').attr('data-stage' + step.parentid + '-complete', 'false');

			//}else if(step.child && step.child.attr('data-complete') == 'false'){
			}else if(step.child){

				console.log('my child has also been completed')
				$('.createagent').attr('data-stage' + step.id + '-complete', 'false');
			}

			step.elem.attr('data-complete', 'false');

		},
		change: function(elem) {


			var id = parseFloat($(elem).attr('data-gotostep')),
				activeStep = parseFloat($('.createagent').attr('data-stage'));
			

			var step = newAgent.step.ref(id);

			if(step.elem.attr('data-complete') == 'false' && step.parent && activeStep !== step.parentid){

				console.log('Change goto location to parent id');
				$('.createagent').attr('data-stage', step.parentid);

			}else{

				console.log('Leave goto location as is');
				$('.createagent').attr('data-stage', step.id);

			}
			

			/*
				if(gotoStep == 4 && $('.createagent').attr('data-stage1-complete') == true && $('.createagent').attr('data-stage2-complete') == true && $('.createagent').attr('data-stage3-complete') == true){
					console.log('good to save');
				};
			*/
		},
		refresh: function(){
			if(newAgent.name){
				newAgent.input.name.set(newAgent.name);
				newAgent.step.set(1);
			}else{
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
				newAgent.step.set(2);
			}else{
				newAgent.step.clear(2);
			};

			if(newAgent.avatar){
				newAgent.step.set(2);
			}else{
				newAgent.step.clear(2);
			};

			if(newAgent.background){
				newAgent.step.set(3);
			}else{
				newAgent.step.clear(3);
			};

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

				console.log('NAME clear function fired')
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

						console.log('letter: ', letter);
						console.log('letterCount: ', letterCount);

						if(letter == (letterCount - 1)) {
							console.log('IVE FIRED HERE')
							newAgent.info.change('', newAgent.code);
						};
						
					}, 1000);

				}, (letter + 1) * 1500);

			},
		},
		gender: {
			set: function(value){


				//should be done with gender clear function
				//$(_this).closest('section').siblings('.stage-2-5').attr('data-complete', 'false');
				//$('[data-stage2-complete]').attr('data-stage2-complete', 'false');

				//should be done with avatar clear function
				//$(_this).closest('section').siblings('.stage-2-5').find('.btn-ca-s2b > .sized > img').removeClass('active');

				$('.stage-2-5 .avatar-select[data-gender]').removeClass('selected');
				
				newAgent.gender.type

				//var gender = $(_this).attr('data-gender');

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

			},
			clear: function(){
				$('.stage-2-5').find('.btn-ca-s2b > .sized > img').removeClass('active');
				$('.stage-2-5').find('.avatar-select[data-gender]').removeClass('selected');
			}
		},
		avatar: {
			set: function(value){

			},
			clear: function(){
				
			}
		},
		background: {
			set: function(){
				/*
					agentBackground = $('.slick-active').find('img').attr('src');
					agentBackground = agentBackground.split('/').pop();
				*/
				
				var id = $('.ca-bg-carousel .slick-active').attr('data-backgroundid');

				newAgent.info.change('','','',id);

				$('.agent-background').find('img').attr('src', $('.ca-bg-carousel .slick-active').find('img').attr('src'));

			},
			clear: function(){
				
			},
			init: function(){

				if(($('.ca-bg-carousel').length > 0) && ($('.ca-bg-carousel.slick-initialized').length === 0)){
					
					console.log('init bg carousel');

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

					console.log('userinfo has created or updated');
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

			if(i == userLogin[0].awardCache.length){
				userLogin[0].awardCache = [];
			};
		};

		console.log('login detected');

		if($('.createagent').attr('data-stage') == '4' && $('.createagent').attr('data-stage1-complete') == 'true' && $('.createagent').attr('data-stage2-complete') == 'true' && $('.createagent').attr('data-stage3-complete') == 'true') {
			
			console.log('login detected & all info is complete - save agent to db');
			newAgent.saveInfo();

		};

	});

/* ---------------------------
	BACKGROUND LISTENERS
--------------------------- */
	$(document).on('afterChange', '.ca-bg-carousel', function() {
		newAgent.input.background.set();
	});

	$(document).on('init', '.ca-bg-carousel', function() {
		//newAgent.input.background.set();
	});
	$(document).on('click', '[data-gotostep="3"]', function(){

		//$('[data-stage3-complete]').attr('data-stage3-complete', true);

		console.log('----------------------- BG SET')
		newAgent.step.set(3);
		newAgent.input.background.set();

	});


/* ---------------------------
	NAME/ID LISTENERS
--------------------------- */
	$(document).on('click', '.stage-1[data-complete="true"] .btn-ca-next', function(){

		newAgent.code = 0;
		newAgent.input.name.init();

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

	$(document).on('focus', '#agentName', function(){
		
		console.log('input focus');
		var _this = this;
		var valueCurrent = $(_this).val();
		var valueDefault = $(_this).prop('defaultValue');
		
		if(this.value == valueDefault || valueCurrent == 'O'){
			this.value = '';

			$(_this).closest('section').attr('data-complete', 'false');
		};

	});

	$(document).on('keypress', '#agentName', function(){

		console.log('input keypress');
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
	  		//console.log('key: ', key)
	  		return false;
	  	};

	});
	$(document).on('keyup', '#agentName', function(){

		console.log('input keyup');
		var _this = this;
	  	var key = event.keyCode;
		var valueCurrent = $(_this).val();
		//console.log('key: ', key);

		if(valueCurrent == ''){
			$(_this).closest('section').attr('data-complete', 'false');
		};
		if((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			return;
	  	};
		// 8 = backspace, 46 = delete
		if((key == 8) || (key == 46)) {
	  		return key;
	  	} else if(key == 13) {
			$('.stage-1 .btn-ca-next').click();
	  	};
	});	


/* ---------------------------
		AVATAR LISTENERS
--------------------------- */
	$(document).on('click', '.btn-ca-s2', function(){
		
		/*
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
		*/
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
			$('.agent-avatar').attr('data-avatar', $(_this).attr('data-value'));

			var avatar = $(_this).attr('data-value') + '.png';
			newAgent.info.change('','', avatar,''); 
		};
	});

/* ---------------------------
	CONFIRM LISTENERS
--------------------------- */
	$(document).on('click', '.stage-4 .btn-ca-next', function(){

		if(($('.createagent').attr('data-stage1-complete') == 'true') && ($('.createagent').attr('data-stage2-complete') == 'true') && ($('.createagent').attr('data-stage3-complete') == 'true')){
			
			console.log('all sections complete');
			newAgent.info.display();

			agentComplete = true;

			if((org.pbskids.login.loggedin === true) || userLoggedin){

				console.log('save agent to db');
				newAgent.saveInfo();

			} else {

				console.log('pbs login overlay display');
				org.pbskids.login.displayLogin();

			};

		} else {

			console.log('missing some details');
			newAgent.info();

			agentComplete = false;
		};

	});