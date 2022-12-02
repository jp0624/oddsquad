
// new agent code
newAgent = {
		
	/*** variables ***/
	name: "", // agent name
	code: 0, // agent's code
	background: "", // used by animation
	avatarImg: "", // url of avatar image
	
	/*** functions ***/
	
	// initialize buttons and events
	init: function() {
	
	},
	
	
	// user confirms avatar
	confirmYesClick: function() {
		newAgent.saveInfo();
		//if (newAgent.getCookie("pbskids.username") === "") { PBS.KIDS.identity.prompt(); }
	},
	// user confirms avatar
	finishClick: function(event) {
		if (newAgent.getCookie("pbskids.username") === "") {
			org.pbskids.login.displayLogin();

		} else {

			pushUrl('/agents/', 'Agents', event);
			closeOverlay('createagent');
			updateAgentSections();
		}
	},
	
	
	// user confirms avatar, saves info (or tries to save info every second until user is logged in
	confirmYesClick: function() {

		newAgent.saveInfo();
		
		if (newAgent.getCookie("pbskids.username") === "") { 

			org.pbskids.login.displayLogin();

		};
	},
	
	
	// save agent's info
	saveInfo : function() {

		if (newAgent.getCookie("pbskids.username") !== "") {

			$.post("/oddsquad/php/createAgent.php", {
				username	: newAgent.getCookie("pbskids.username"),
				userid		: newAgent.getCookie("pbskids.userid"),
				agentName	: newAgent.name,
				avatar 		: newAgent.avatarImg
			});

		} else {

			setTimeout(newAgent.saveInfo, 1000);

		};
	},
	
	
	// user wants to edit avatar
	confirmNoClick: function() {
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

newAgent.init();