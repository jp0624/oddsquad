
// =======================================================
//                USER ACCOUNT SPECIFIC VARIABLES
// -------------------------------------------------------

var useraccountLoaded = false,
	useragentInfoLoaded = false,
	agentInfoLoaded = false,
	userLogin = userLogin || [],
	localTest = false;


	//	if (userLogin == undefined || userLogin == null || userLogin.length == 0){
	//
	//	};

	userLogin.push({
		name: '',
		code: null,	
		background: '',
		avatar: '',
		username: '',
		userid: null,
		isloggedin: false,
		awardCache: [],
		awardQueue: []
	});

	//userLogin[0].awardCache = userLogin[0].awardCache || [];

if(localTest){
	var org = {},
		agent = {};
		
	agent.localtest = true;
	
	org.pbskids = {};
	org.pbskids.login = {};
}

// =======================================================
//           GLOBAL DOCUMENT FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available useragent functions on page events. 
 */
var UserAccountFunctions = function() {
	var _this = this;
	
	// standard functions to load on useragent dom is ready
	_this.documentReady = function() {
		
	if(localTest){
		
		msgLog('ACTIVE', 'LOCAL TEST MODE');

		org.pbskids.login.loggedin = true;
		
		agent.name = 'UTER-LOCAL';
		agent.code = '99';
		agent.avatar = 'male2.png';
		agent.background = 30;
		
		console.log(agent);
		
		$(document).trigger( "USER_ACCOUNT_LOADED" );
			
	} else {
		
		agent.loggedIn(function() {
			
			
			//set the pbs bar as fully loaded and details received
			useraccountLoaded = true;
			$(document).trigger( "USER_ACCOUNT_LOADED" );
		});	
	};
		
		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on useragent dom is resized
	_this.documentResize = function() {
		
		
	};
	_this.documentEvents = function() {
		
		//send the user info into the userLogin object for future use
		if(!localTest){
		}else{
			$('body').prepend('<div class="localTest"><span>LOCAL TEST MODE IS ACTIVE</span></div>');
			localGotInfo();
		};
	};
	
};

var userAccountInstance = userAccountInstance || new UserAccountFunctions();

			$(document).on("USER_ACCOUNT_LOADED", updateUserLogin);

// =======================================================
//                AGENT SPECIFIC FUNCTIONS
// -------------------------------------------------------

/**
 * Check dom object for status of loggedin
 * @return {Boolean} - true if user is logged in, false otherwise.
 */
function loggedIn() {
	var loginVal = org.pbskids.login.loggedin !== undefined ? org.pbskids.login.loggedin : false;
	console.log('loginVal: ', loginVal);
	
    console.trace();
	
	return loginVal;
};
function updateUserLogin() {
	agent.getInfo(gotInfo);

};
function localGotInfo() {
	console.log('------------------------ LOADING TEMP LOCAL DATA');
	
	if(localTestlogin == true) {
		//is user logged in? check dom object with loggedIn function for status
		$('body').attr('data-pbs-login', 'true');
		
		//clear any old data to run a clean update
		userLogin = userLogin || [];
		
		userLogin.push({
			name: agent.name,
			code: parseInt(agent.code) + 2,
			background: agent.background,
			avatar: agent.avatar,
			username: agent.name,
			userid: 296,
			isloggedin: true
		});
		
	} else {
		//is user logged in? check dom object with loggedIn function for status
		$('body').attr('data-pbs-login', 'false');
		
		//clear any old data to run a clean update
		userLogin = [];
		
		userLogin.push({
			name: '',
			code: null,
			background: '',
			avatar: '',
			username: '',
			userid: null,
			isloggedin: false
		});
	};
	
	if(prefix.dom != 'MS'){
		console.table(userLogin);
	}else {
		console.log(userLogin);
	}
	
	//detect if the user is logged in and has an agent account
	if(userLogin[0].code == null || userLogin[0].agent == null) {
		$('body').attr('data-agent-login', 'false');

	} else {
		$('body').attr('data-agent-login', 'true');
		//set agent num in login bar
		$('em.agentNum').html(userLogin[0].code);
		
	};
	
	console.log('addBackground(bgImg): here 1');
	//if the user has been customized their background then set the css class
	if(userLogin[0].background !== ''){
		addBackground(userLogin[0].background);
	};
	
	console.log('FIRING INFO LOADED DETECTED TRIGGER');
	
	useragentInfoLoaded = true;
	agentInfoLoaded = true;
	$(document).trigger( "USERAGENT_INFO_LOADED" );
	
}
function gotInfo(data) {
	
	console.log('------------------USER FETCH-------------------');
	console.trace('Call Trace')
	console.log('-----------------------------------------------');

	if (org.pbskids.login.loggedin) {

		//is user logged in? check dom object with loggedIn function for status
		$('body').attr('data-pbs-login', loggedIn());

		console.log('org.pbskids.login: ', org.pbskids.login);

		userLogin[0].name 		= org.pbskids.login.loggedin ? data.name : '';
		userLogin[0].code 		= org.pbskids.login.loggedin ? parseInt(data.code) : null;
		userLogin[0].background = org.pbskids.login.loggedin ? data.background : '';
		userLogin[0].avatar 	= org.pbskids.login.loggedin ? data.avatar : '';
		userLogin[0].username 	= org.pbskids.login.loggedin ? org.pbskids.login.user.name : '';
		userLogin[0].userid 	= org.pbskids.login.loggedin ? parseInt(org.pbskids.login.user.id) : null;
		userLogin[0].isloggedin = org.pbskids.login.loggedin ? org.pbskids.login.loggedin : false;
		//userLogin[0].awardCache = userLogin[0].awardCache : [];

		/*
			//clear any old data to run a clean update
			userLogin = [];

			userLogin.push({
				name: org.pbskids.login.loggedin ? data.name : '',
				code: org.pbskids.login.loggedin ? parseInt(data.code) : null,
				background: org.pbskids.login.loggedin ? data.background : 1,
				avatar: org.pbskids.login.loggedin ? data.avatar : '',
				username: org.pbskids.login.loggedin ? org.pbskids.login.user.name : '',
				userid: org.pbskids.login.loggedin ? parseInt(org.pbskids.login.user.id) : null,
				isloggedin: org.pbskids.login.loggedin ? org.pbskids.login.loggedin : false
			});
		*/

	} else {
	
		$('body').attr('data-pbs-login', 'false');

		userLogin[0].name = '';
		userLogin[0].code = null;
		userLogin[0].background = '';
		userLogin[0].avatar = '';
		userLogin[0].username = '';
		userLogin[0].userid = null;
		userLogin[0].isloggedin = false;
		userLogin[0].awardCache = [];
	}

	/*
	if(prefix.dom != 'MS'){
		console.table(userLogin);
	}else {
		console.log(userLogin);
	}
	*/
	
	//detect if the user is logged in and has an agent account
	//if(userLogin[0].code == '' || userLogin[0].agent == '') {
	
	console.log('userLogin[0].code: ', userLogin[0].code)

	if(userLogin[0].avatar == NaN || userLogin[0].avatar == undefined || userLogin[0].avatar == '') {
		console.log('NO AVATAR');
		
	} 
	if(userLogin[0].name == NaN || userLogin[0].name == undefined || userLogin[0].name == '') {
		console.log('NO NAME');
		
	} 

	if(!userLogin[0].code) {
	//if(userLogin[0].code == null || userLogin[0].code == NaN || userLogin[0].code == undefined || userLogin[0].code == '') {

		console.log('NO CODE');

		$('body').attr('data-agent-login', 'false');

	} else {

		console.log('Im adding it anyway!!')
		$('body').attr('data-agent-login', 'true');
		//set agent num in login bar
		$('em.agentNum').html(userLogin[0].code);
		
	};
	
	//if the user has been customized their background then set the css class
	if(userLogin[0].background !== ''){
		$('html').removeClass(function (index, css) {
			return (css.match (/(^|\s)bgImg-\S+/g) || []).join(' ');
		});
		$('html').addClass('bgImg-' + userLogin[0].background);
	};
	
	console.log('FIRING INFO LOADED DETECTED TRIGGER');
	

	useragentInfoLoaded = true;
	agentInfoLoaded = true;
	$(document).trigger( "USERAGENT_INFO_LOADED" );
	
};
	
var agent = {
	
	name: "",		// agent name
	code: "",		// agent code
	avatar: "",		// agent avatar
	background: 0,	// background #
	
	// keep checking if pbs module has loaded, then call callback function if user has logged in
	// passes true as parameter if user is logged in, otherwise passes false
	loggedIn: function(doneFunction) {
		
		if (typeof org === 'undefined' || typeof org.pbskids === 'undefined' || typeof org.pbskids.login === 'undefined') { 
			setTimeout(function() { agent.loggedIn(doneFunction); }, 500);
		}
		else {
			var a =  org.pbskids.login.user === 'undefined' ? 0 : 1;
			//var a = PBS.KIDS.identity.getCurrentUsers();
			var i;
			var loggedIn = false;
			for (i = 0; i < a.length; i++) {
				if (org.pbskids.login.loggedin) { loggedIn = true; }
			}
			doneFunction(loggedIn);
		}
	},
	
	// returns current username
	username: function() {
		return agent.getCookie("pbskids.username");
	},
	
	// get agent info, pass it to done function when complete
	getInfo: function(doneFunction) {
		console.trace('trace #2');
		$.post("/oddsquad/php/getAgent.php", {
			username:agent.getCookie("pbskids.username"),
			userid:agent.getCookie("pbskids.userid")
		})
		.done(

			function (data) {
				var a = data.split("~~");
				agent.name = a[0];
				agent.code = a[1];
				agent.avatar = a[2];
				agent.background = parseInt(a[3]);
				if (doneFunction) { doneFunction(agent); }
			}
		);
	},
	
	// set the background # for this user
	setBackground: function(background, doneFunction) {
		$.post("/oddsquad/php/setBackground.php", {
				username:agent.getCookie("pbskids.username"),
				userid:agent.getCookie("pbskids.userid"),
				background:background
		}).done(
			function(data) {
				if(doneFunction) {
					doneFunction(this);
				}
			}
		);
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
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------



//page and window specific listeners
$(document).ready(userAccountInstance.documentReady());
$(window).resize(userAccountInstance.documentResize());