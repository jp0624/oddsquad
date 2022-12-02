var user = ( function() {
		var locals = {}, exports = {}

		exports.init = function() {
			locals.cname = "pbskids.username";
			locals.cnameID = "pbskids.userid";
			userID = locals.checkCookie(locals.cnameID);
			userName = locals.checkCookie(locals.cname);
			
			//check with back
			if(userID){
				locals.checkBack(userID, userName);
				exports.results(userID);
			}
			
		};

		locals.getCookie = function(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name) == 0)
					return c.substring(name.length, c.length);
			}
			return "";
		}

		locals.checkCookie = function() {
			var userID = locals.getCookie(locals.cname);
			if (userID != "") {
				return userID;
			} else {
				return false;

			}
		}
		
		//check with the back
		locals.checkBack = function(user,userN){
			$.post( "/oddsquad/php/getAgent.php", { userID : user, userName : userN }).done(function( data ) {
			  alert( "Data Loaded: " + data );
			});
		}
		
		//show results
		exports.results = function(copy){
			$('#result').html(copy);
		}

		return exports;
	}());

$(document).ready(user.init); 