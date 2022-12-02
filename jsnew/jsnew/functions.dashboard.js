
function updateAgentSections() {
	console.error('ERROR: function[updateAgentSections] has been changed to function[updateDashboard]. view functions.dashboard.js for more details');
};

/**
 * Updates the user totals and available totals for agent/user specific elements pulled from json and database
 */
var UpdateDashboard = function() {
	var _this = this;

	// update the agent details
	_this.agent = function() {
		console.log('AGENT UPDATE FIRED');	
		$('.agent-profile .photo .yespbs').attr('src', '/' + baseFolder + '/img/agents/' + agent.avatar );
		
		
			$('.agent-profile .badge.yespbs em').countTo({
				from: 0,
				to: agent.code,
				speed: 2000,
				refreshInterval: 150,
				onComplete: function(value) {
					console.debug(this);
				}
			});
		
		//$('.agent-profile .badge.yespbs em').html(agent.code);
	};
	
	// update the agents awards totals
	_this.awards = function() {
		
		// set the total number of available awards
		//$('.awards-stats').find('.accnt-tot').html(site.awards.length);
		
		$('.awards-stats .accnt-tot').countTo({
			from: 0,
			to: site.awards.length,
			speed: 1000,
			refreshInterval: 150,
			onComplete: function(value) {
				console.debug(this);
			}
		});
		
		// detect if the user is logged in and set to 0 unlocked
		if(loggedIn()) {
			
			$('.user-stats.awards-stats .accnt-rec').countTo({
				from: 0,
				to: achievements.unlocked.length,
				speed: 1000,
				refreshInterval: 150,
				onComplete: function(value) {
					console.debug(this);
				}
			});
			//$('.user-stats.awards-stats .accnt-rec').html(awardsInstance.unlocked.length);
		} else {
			$('.user-stats.awards-stats .accnt-rec').html(0);
		}
	};
	
	// update the agent doors totals
	_this.doors = function() {
		// set the total number of available doors to be opened
		
			$('.doors-stats .accnt-tot').countTo({
				from: 0,
				to: site.doors.length,
				speed: 1000,
				refreshInterval: 150,
				onComplete: function(value) {
					console.debug(this);
				}
			});
			$('.doors-stats .accnt-rec').countTo({
				from: 0,
				to: getUnlockedDoors(),
				speed: 1000,
				refreshInterval: 150,
				onComplete: function(value) {
					console.debug(this);
				}
			});
			
		//$('.doors-stats').find('.accnt-tot').html(site.doors.length);
		
		// set the total number of unlocked doors based on date
		//$('.doors-stats').find('.accnt-rec').html(getUnlockedDoors());
	};
	_this.getData = function() {
		
		// if the agent info has been loaded then update dashboard. otherwise wait for the info loaded trigger to fire then update.
		if(useragentInfoLoaded){
			console.log('user info was already loaded');
			// update agent dashboard content
			_this.initLoad();
			
		}else{
			console.log('user info was NOT loaded waiting for trigger');
			// wait for trigger to fire then update agent dashboard content
			$(document).on("USERAGENT_INFO_LOADED", _this.initLoad);
		};

	};
	_this.initLoad = function() {
		
		if(localTest){
			if(!achievements.unlocked) {
				achievements.unlocked = [];
				achievements.viewed = [];
				if(localTestlogin){
					achievements.unlocked[0] = 1;
					achievements.unlocked[1] = 2;
					achievements.unlocked[2] = 3;
					achievements.unlocked[3] = 4;
					achievements.unlocked[4] = 5;
					
					achievements.viewed[0] = 1;
					achievements.viewed[1] = 2;
					achievements.viewed[2] = 3;
					achievements.viewed[3] = 4;
					achievements.viewed[4] = 5;	
				} else {
					achievements.unlocked[0] = 1;
				};
			};
			getAwards(dashboardInstance.awards);
			
		} else {
			//Get awards json then get user awards data then update the dashboard
			//getAwards(awardsInstance.get(dashboardInstance.awards));
			getAwards(dashboardInstance.awards);
		};
		
		//Get doors json then get user awards data then update the dashboard
		getDoors(dashboardInstance.doors);
		dashboardInstance.agent();
	}
};



var dashboardInstance = dashboardInstance || new UpdateDashboard();