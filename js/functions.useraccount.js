// =======================================================
//                AGENT SPECIFIC VARIABLES
// -------------------------------------------------------

var pbsBarLoaded = false,
	agentInfoLoaded = false;

// =======================================================
//                 AGENT SPECIFIC TRIGGERS
// -------------------------------------------------------

/**
 * Triggers used to order scripts firing at correct times and force them to wait for other dependancies
 */
$(document).on({
	"USER_ACCOUNT_LOADED": function(event) {
		//Do the following once user details have been retrieved
		
		//send the user info into the userLogin object for future use
		var o = agent.getInfo(gotInfo);
	},
	"AGENT_INFO_LOADED": function(event) {
		if ($('.agent-dashboard').exists() && pbsBarLoaded && awardsLoaded && agentInfoLoaded && doorsLoaded ) {
			updateAgentSections();
		}
	},
	//PBS bar login trigger detect for logged in
	"org_pbskids_login_LoginEvent_LoggedIn": function(event) {
		//if on the create agent page refesh
		if(!$('[data-overlay="createagent"]').exists()){
			// browser page reload
			location.reload();
		}
	},
	//PBS bar login trigger detect for logged out
	"org_pbskids_login_LoginEvent_LoggedOut": function(event) {
		//browser page reload of logout
		location.reload();
	}
});

// =======================================================
//                AGENT SPECIFIC PAGE LOAD
// -------------------------------------------------------

$(document).ready(function () {

	agent.loggedIn(function() {
		//is user logged in?
		$('body').attr('data-pbs-login', loggedIn());
		
		//set the pbs bar as fully loaded and details received
		pbsBarLoaded = true;
		$(document).trigger( "USER_ACCOUNT_LOADED" );
	});

});

// =======================================================
//                AGENT SPECIFIC FUNCTIONS
// -------------------------------------------------------

function loggedIn() {
	return org.pbskids.login.loggedin;
}

function gotInfo(data) {

	userLogin.push({
		name: org.pbskids.login.user ? data.name : false,
		code: org.pbskids.login.user ? data.code : false,
		background: org.pbskids.login.user ? data.background : 1,
		avatar: org.pbskids.login.user ? data.avatar : false,
		username: org.pbskids.login.user ? org.pbskids.login.user.name : false,
		userid: org.pbskids.login.user ? org.pbskids.login.user.id : false,
		isloggedin: org.pbskids.login.user ? org.pbskids.login.loggedin : false
	});
	
	//detect if the user is logged in and has an agent account
	if(userLogin[0].code == '' || userLogin[0].agent == '') {
		$('body').attr('data-agent-login', 'false');

	} else {
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
	
	agentInfoLoaded = true;
	$(document).trigger( "AGENT_INFO_LOADED" );
	
};
	
var agent = {
	
	name: "", // agent name
	code: "", // agent code
	avatar: "", // agent avatar
	background: 0, // background #
	
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
		$.post("/oddsquad/php/getAgent.php", { username:agent.getCookie("pbskids.username"), userid:agent.getCookie("pbskids.userid") } ).done(
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
		$.post("/oddsquad/php/setBackground.php", { username:agent.getCookie("pbskids.username"), userid:agent.getCookie("pbskids.userid"), background:background } ).done(
				function (data) {
					if (doneFunction) { doneFunction(this); }
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
	