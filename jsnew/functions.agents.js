var agentsLoaded = false,
	agentsCreated = false;


// =======================================================
//              AGENTS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var AgentsFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		_this.documentEvents();	// setup dom element event listeners
		
	};
	
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {
		
	};
	
	_this.documentEvents = function() {

		$(document).on('click', '.agents-lst.disp-desktop figure', showAgent);
		$(document).on('click', 'a.close-agent', closeAgent);
	};
	
};

	
var agentsInstance = agentsInstance || new AgentsFunctions();

// =======================================================
//              AGENTS PAGE FUNCTIONS
// -------------------------------------------------------
function constructAgents() {
	
	getAgents(getAgentsComplete);
	$(document).on('AGENTS_LOADED', buildAgents);
	
};
/**
 * Get awards details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing award details to be used throughout the site.
 */
function getAgents(doneFunction) {
	if(!agentsLoaded){
		copyJSONIntoObject('/oddsquad/json/agents.json', site, doneFunction);
	} else {
		doneFunction();
	};
};
/**
 * Function to fire when json has load has completed.
 */
function getAgentsComplete() {
	agentsLoaded = true;
	$(document).trigger('AGENTS_LOADED');
};
/**
 * Create/Build agents html from loaded agents json doc
 */
function buildAgents() {
		// specify container to place html within
	var container 		= $('.agents-wrapper'),
		// get total number of agents to build
		agentsTotal		= site.agents.length;
	
	$(container).find('ul.agents-lst.disp-desktop').html('');
	$(container).find('ul.agents-bgs.disp-desktop').html('');
	$(container).find('ul.agents-lst.disp-mobile').html('');
	
	// build html for each agent
	for (i = 0; i < agentsTotal; i++) {
		// build each agent html
		$(container).find('ul.agents-lst.disp-desktop').append('<li class="agent-' + (i + 1) +'" data-agentid="' + i + '"><div class="sizer"></div><div class="img-wrap sized"><figure class="agent-hex agent-hex-1"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure><figure class="agent-hex agent-hex-2"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure><figure class="agent-hex agent-hex-3"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure></div></li>');
		// build hexagon background in reference to the agent created
		// this creates the independant border and details background
		$(container).find('ul.agents-bgs.disp-desktop').append('<li class="agent-' + (i + 1) +'"><div class="sizer"></div><div class="border-hex sized"><div class="bg-hex bg-hex-1"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-2"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-3"><div class="sizer"></div><div class="sized"><span></span></div></div></div></li>');
		// build agent details for the mobile view
		$(container).find('ul.agents-lst.disp-mobile').append('<li class="agent-' + (i + 1) +'" data-agentid="' + i + '"><figure><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></figure><dl><dt class="name">' + site.agents[i].name + '</dt><dt>Department</dt><dd>' + site.agents[i].department + '</dd><dt>Partner</dt><dd>' + site.agents[i].partner + '</dd><dt>' + site.agents[i].accessory + ' size</dt><dd>' + site.agents[i].accessorysize + '</dd><dt>Hobbies</dt><dd>' + site.agents[i].hobby + '</dd><dt>Favorite Food</dt><dd>' + site.agents[i].favoritefood + '</dd><dt>Quote</dt><dd>' + site.agents[i].quote + '</dd><dt>Status</dt><dd>' + site.agents[i].status + '</dd></dl></li>');
	};
	
	
	agentsCreated = true;
	$(document).trigger ('AGENTS_CREATED');

};
/**
 * Close the agent details area and show all agent hexagons again
 */
function closeAgent() {	
	$('ul.agents-lst li[data-agentid]').removeClass('hide');
	$('.agent-details').removeClass('show').css('z-index', 0);
};

/**
 * Show a particular agents details and hide the overall view
 */
function showAgent() {
	$('ul.agents-lst li[data-agentid]').removeClass('hide');
		
	var aid = $(this).closest('li').attr('data-agentid'),
		detailsContainer = $('dl.agent-details');
	
	console.log('AID: ', aid);
	$(detailsContainer).find('figure img').attr('src', '/oddsquad/img/agents/' + site.agents[aid].img1);
	
	$(detailsContainer).find('dt.name span').html(site.agents[aid].name);
	$(detailsContainer).find('dd.dept span').html(site.agents[aid].department);
	
	if(site.agents[aid].partner !== '') {
		$(detailsContainer).find('dd.partner span').html(site.agents[aid].partner);
	} else {
		$(detailsContainer).find('dd.partner span').html('n/a');
	}
	
	$(detailsContainer).find('dt.accessory span').html(site.agents[aid].accessory + ' size:');
	$(detailsContainer).find('dd.accessory span').html(site.agents[aid].accessorysize);
	
	
	$(detailsContainer).find('dd.hobbies span').html(site.agents[aid].hobby);
	$(detailsContainer).find('dd.favoritefood span').html(site.agents[aid].favoritefood);
	$(detailsContainer).find('dd.quote span').html(site.agents[aid].quote);
	
	$(detailsContainer).find('dd.status span').html(site.agents[aid].status);
	
	$(detailsContainer).addClass('show').css('z-index', 1);
	
	
	for (i = 0; i < site.agents.length; i++) {
		$('ul.agents-lst li[data-agentid="' + i + '"]').addClass('hide');
	};
};

// =======================================================
//              AGENTS PAGE LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(agentsInstance.documentReady);
$(window).resize(agentsInstance.documentResize);
