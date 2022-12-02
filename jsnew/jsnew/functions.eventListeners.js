
					
		$(document).on('click', '.mobileNav a', something);
		
		// Change faux url on click 
		var pushy = new makePushURL(target);
		
		$(document).on('click', '[data-genratrTarget]', pushy.steve);
		// this still to be refactored and turned into smaller functions
		
		
function makePushURL(target) {
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& THIS FIRED &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	this.target = target;
	
	this.steve = function () {
		this.target.doStuff();
	}
		
}