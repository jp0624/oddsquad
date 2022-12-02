
var login = {

	username:"",
	password:"",
	code:"",
	achievements: [],

	// close a popup dialogue
	closePopup: function(id) {
		$("#" + id).css("display", "none");
	},
	
	// open a popup dialogue
	openPopup: function(id) {
		$("#" + id).css("display", "inline-block");
	},
	
	// replace a popup with another popup
	replacePopup: function(idOld, idNew) {
		this.closePopup(idOld);
		this.openPopup(idNew);
	},
	
	// user just created a new username, generate a random password
	newUsername: function() {
		this.username = $("#username").val();
		$.post("/oddsquad/php/generatePassword.php", { username:this.username } ).done( function(data) {
			if (data === "alreadyExists") {
				$("#newUserMessage").html("This username already exists, please pick a different name.");
			}
			else {
				this.password = data;
				$("#password").val(data);
				login.closePopup("newUsername");
				login.openPopup("newPassword");
			}
		});
	},
	
	
	// user created a new password
	newPassword: function() {
		this.password = $("#password").val();
		this.replacePopup("newPassword", "newCode");
		this.populateCodes("newCodes");
	},
	
	
	// populate dialogue with new codes
	populateCodes: function(id) {
		var i;
		var s = "";

		for (i = 0; i < 15; i++) {
			s += "<img class='code' id='code" + i + "' src='img/code" + i + ".png' onclick='login.codeClick(this)' />";
			if (i === 4 || i === 9) { s += "</br>"; }
		}

		$("#" + id).html(s);
	
		for (i = 0; i < 15; i++) {
			$("#code" + i).css("opacity", "0.5");
		}
},
	
	// user clicks on a code
	codeClick: function(e) {

		if ($(e).css("opacity") !==	"1") { $(e).css("opacity", "1.0"); }
		else { $(e).css("opacity", "0.5"); }
	},
	
	
	// user creates a new secret code
	newCode: function() {
		
		var i;
		
		this.code = "";
		for (i = 0; i < 15; i++) {
			if ($("#code" + i).css("opacity") === "1") { this.code += String.fromCharCode(i + 65); }
		}
		
		this.closePopup("newCode");
		$.post("/oddsquad/php/createUser.php", { username:this.username, password:this.password, code:this.code } ).done( function(data) {
			login.openPopup("youDidIt");
			$("#printUsername").html(login.username);
			$("#printPassword").html(login.password);
			login.saveInfo();
		});
	},
	
	// user signs in with a username and password
	signin: function() {
		
		this.username = $("#loginUsername").val();
		this.password = $("#loginPassword").val();
		$.post("/oddsquad/php/verifyUser.php", { username:this.username, password:this.password } ).done(function(data) {
			switch (data) {
				case "notFound": 
					$("#loginMessage").html("Incorrect username.");
					break;
				case "wrongPassword":
					$("#loginMessage").html("Incorrect password.");
					break;
				default:
					login.closePopup("loginUser");
					login.saveInfo();
					break;
			}
		});
	},
	
	
	// user forgot their password, enters username
	getUsername: function() {
		
		this.username = $("#getUsername").val();
		this.password = "";
		$.post("/oddsquad/php/verifyUser.php", { username:this.username, password:this.password } ).done(function(data) {
			switch (data) {
				case "notFound":
					$("#enterUsernameMessage").html("Incorrect username.");
					break;
				default:
					login.replacePopup("getPasswordUsername", "getPassword");
					login.populateCodes("pickCodes");
					break;
			}
		});
	},
	
	
	// user needs to pick their secret code, populate dialogue with codes
	pickPassword: function() {
		
		var i;
		
		this.code = "";
		for (i = 0; i < 15; i++) {
			if ($("#code" + i).css("opacity") === "1") { this.code += String.fromCharCode(i + 65); }
		}
		
		$.post("/oddsquad/php/checkSecretCode.php", { username:this.username, code:this.code } ).done(function(data) {
			switch (data) {
				case "wrong":
					$("#getPasswordMessage").html("Incorrect code.");
					break;
				default:
					login.replacePopup("getPassword", "youDidIt");
					login.password = data;
					$("#printUsername").html(login.username);
					$("#printPassword").html(login.password);
					login.saveInfo();
					break;
			}
		});
	},
	
	
	// save user info as a cookie
	saveInfo: function() {
		
		this.setCookie("username", this.username, 365, "/");
		this.setCookie("password", this.password, 365, "/");
	},
	
	// retrieve user info as a cookie
	retrieveInfo: function() {
		
		this.username = this.getCookie("username");
		this.password = this.getCookie("password");
	},
	
	setCookie: function(cname, cvalue, exdays, path) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires + ";path=" + path;
	},
	
	getCookie: function(cname) {
		
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
		}
		return "";
	},
	
	// given an achievement to the user
	addAchievement: function(achievement) {
		
		this.retrieveInfo();
		$.post("/oddsquad/php/addAchievement.php", { username:this.username, password:this.password, achievement:achievement } );
	},
	
	// get achievements and execute function when done (result stored in array login.achievements)
	getAchievements: function(doneFunction) {
		
		$.post("/oddsquad/php/getAchievement.php", { username:this.username } ).done(function(data) {
			login.achievements = data.split("/");
			doneFunction();
		});
	},
	
	clearAchievements : function() {
		
		$.post("/oddsquad/php/clearAchievement.php", { username:this.username, password:this.password } );
	}
	

};


