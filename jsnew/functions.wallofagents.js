var agentsLoaded = false,
	agentsCreated = false,
	wiggleInt = null,
	vars = {};

// =======================================================
//              WALL OF AGENTS PAGE LISTENERS
// -------------------------------------------------------


// =======================================================
//              AWARDS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var woaFunctions = function() {
	
	// standard functions to load on global dom is ready
	this.documentReady = function() {
		//makeHex();
		//this.documentEvents();	// setup dom element event listeners
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		    $('html').addClass('ie ie9 lte9 lte10');
		}

        setTimeout(function(){
			$('body.hoaload').removeClass('hoaload');
        }, 150);


        $(document).on('click', '.btn-toggle-mustache', function(event){
			//event.preventDefault();

			if($('.woa-wrapper.desktop.show-mustache').length > 0){
				endWiggles();
				$('.woa-wrapper.desktop.show-mustache').removeClass('show-mustache');
				$('.agents-panel .agent.show-stash').removeClass('show-stash');

			} else {

				// add class to make mustaches displayable
				$('.woa-wrapper.desktop').addClass('show-mustache');

				// create an array with the length of agents
				var a = [];
				for ( var i = 0; i < $('.agents-panel .agent').length; i++ ) {
					//push into array to build its size
					a.push( i );
				}
				
				//get a random value from length of array
				var agent = Math.floor((Math.random() * a.length));

				// start the cycle
				showMustache(agent, a);
			}

			function showMustache(id, a){
				
				$('.agents-panel .agent:eq(' + a[id] + ')').addClass('show-stash');
				$('.agents-panel .agent:eq(' + a[id] + ')').addClass('show-stash-start');
				
				// set random cycle time
				var randomSpeed = Math.floor((Math.random() * 150) + 1);

				if(a != 0 ) {
					a.splice(id, 1);

					setTimeout(function(){

						showMustache(Math.floor((Math.random() * a.length)), a);
						
					}, randomSpeed);

				} else {
					console.log('DONE ADDING STASHES');
					
					$('.agents-panel .agent').removeClass('show-stash-start');
					
					wiggle = setInterval(function(){
						
						startWiggles();

					}, 1000);

				}
			}

			function startWiggles() {
				console.log('WIGGLE COUNT 300');

				var agentsNumWiggle  = $('.agents-panel .agent').length
				
				var wiggleAgent = Math.floor((Math.random() * agentsNumWiggle) + 0);
				var targetAgent = $('.agents-panel .agent:eq(' + wiggleAgent + ')');
				
				if($('.agents-panel .agent:eq(' + wiggleAgent + ').wigglestash').length > 0){
					consolellog('DONT CHANGE');
					return;
				};

				targetAgent.addClass('wiggle-stash');

				wiggle = setInterval(function(){
					targetAgent.removeClass('wiggle-stash');
				}, 5000);
				
			}

			function endWiggles() {
			    clearInterval(wiggle);
			    console.log('END WIGGLE INT');
			}

        });

        $(document).on('click', '.agentSlides .slick-next, .agentSlides .slick-prev', function(event){
            event.stopPropagation();
		
            
        });


/*
		var vars = {};
		var carouselName = $(this).closest('.agent').attr('data-agent')+ '-agentCarousel';
		console.log('carouselName: ', carouselName);
		
		vars[carouselName] = $(this).slick({
			swipeToSlide: true
		});

		console.log('vars[carouselName]: ', vars[carouselName])


*/

		// click of agents name will transition their carousel if one exists
        $(document).on('click', '.woa-wrapper .agent-details figcaption dt.name', function(event){
            event.stopPropagation();

            //detect if carousel exists
            if($(this).closest('.agent').find('.slick-slider').length == 0) {
            	console.log('no carousel');
            	return;
            }
            //create empty object to store variable name
			var carouselName = $(this).closest('.agent').attr('data-agent')+ 'AgentCarousel';

			vars[carouselName].slick('slickNext', +1);

        });

        $(document).on('click', '.agent, .agent-details', function(event){
            event.preventDefault();
            event.stopPropagation();
            var agent = $(this).attr('data-agent');

            if($(this).closest('.agent').hasClass('active') || $(this).closest('.agent-details').hasClass('active')){
            	console.log('sit 1');
	            $('.agent.active').removeClass('active');
            	$('.woa-wrapper.mobile .agent-details').removeClass('active');
	            $('.woa-wrapper.mobile').removeClass('selected');

				$(this).closest('.agent').removeClass('active');
            	$('.agents-panel').removeClass('selected');

            } else {
            	console.log('sit 2');
            	$('.woa-wrapper.mobile .agent-details').removeClass('active');
	            $('.woa-wrapper.mobile').removeClass('selected');



	            $('.woa-wrapper.mobile').addClass('selected');
            	$('.woa-wrapper.mobile .agent-details[data-agent="' + agent + '"]').addClass('active');

	            $('.agent.active').removeClass('active');

	            $(this).closest('.agent').addClass('active');

	            $('.agents-panel').addClass('selected');

            }

        });

        setTimeout(function(){
        	$('body').addClass('loaded');
        }, 1500);
	};
	
	// standard functions to load/refresh on global dom is resized
	this.documentResize = function() {
		
	};
	
	this.documentEvents = function() {
		// global event listeners for dynamicly created content post dom
	
	};
	
};

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
		/*
		site.agents[i].img
		site.agents[i].department
		
		site.agents[i].partner
		site.agents[i].accessorysize
		site.agents[i].accessory
		site.agents[i].quote
		site.agents[i].favoritefood
		site.agents[i].status

		' + site.agents[i].department + '

		 */
		var agentImg = '';

		if(jQuery.type(site.agents[i].img) == 'array'){

			agentImg = '<div class="agentSlides agentSlides-' + cleanString(site.agents[i].name) + '">';

			for (p = 0; p < site.agents[i].img.length; p++) {
        		agentImg += '<img src="/oddsquad/img/agents/' + site.agents[i].img[p] + '">'
			}
			agentImg += '</div>';

			console.log('agentImg: ', agentImg);

		} else {
			agentImg = '<img src="/oddsquad/img/agents/' + site.agents[i].img + '">';
		}
								
		$('.agents-panel').append('\
		<li class="agent agent-' + cleanString(site.agents[i].name) + '" data-agent="' + cleanString(site.agents[i].name) + '">\
		    <div class="sizer"></div>\
		    <div class="sized">\
		        <div class="agent-photo">\
		            <div class="sizer"></div>\
		            <div class="sized">\
		                <figure>' + 
		                	(site.agents[i].new == "true" ? '<div class="newAgent"><span>New<br />Agent</span></div>': '') +
		                	(jQuery.type(site.agents[i].img) == 'array' ?
		                    	'<img src="/oddsquad/img/agents/' + site.agents[i].img[0] + '">'
		                    :
		                    	'<img src="/oddsquad/img/agents/' + site.agents[i].img + '">'
		                    )
		                    + '<div class="mustache mustache-'+ i + '">\
		                    	<div class="sizer"></div>\
		                    	<div class="sized">\
		                    	</div>\
		                    </div>\
		                </figure>\
		                <figcaption>\
		                    <span>' + site.agents[i].name + '</span>\
		                </figcaption>\
		            </div>\
		        </div>\
		        <div class="agent-details">\
		            <div class="sizer"></div>\
		            <div class="sized">\
		                <figure>\
		                	<div class="sizer"></div>\
		                	<div class="sized">\
			                	<a href="#back" class="btn btn-back">\
			                		<div class="sizer"></div>\
			                		<div class="sized">\
			                			<span>Back</span>\
			                		</div>\
			                	</a>' + 
			                    agentImg
			                    + '<div class="mustache mustache-'+ i + '">\
			                    	<div class="sizer"></div>\
			                    	<div class="sized">\
			                    	</div>\
			                    </div>\
		                    </div>\
		                </figure>\
		                <figcaption>\
		                    <dl>\
		                        <dt class="name"><span>' + site.agents[i].name + '</span></dt>\
		                        <dt class="dept"><span>Department:</span></dt>\
		                        <dd class="dept"><span>' + site.agents[i].department + '</span></dd>\
		                        <dt class="partner"><span>Partner:</span></dt>\
		                        <dd class="partner"><span>' + site.agents[i].partner + '</span></dd>\
		                        <dt class="accessory"><span>' + site.agents[i].accessory + ' size:</span></dt>\
		                        <dd class="accessory"><span>' + site.agents[i].accessorysize + '</span></dd>\
		                        <dt class="hobbies"><span>Hobbies:</span></dt>\
		                        <dd class="hobbies"><span>' + site.agents[i].hobby + '</span></dd>\
		                        <dt class="favoritefood"><span>Favorite Food:</span></dt>\
		                        <dd class="favoritefood"><span>' + site.agents[i].favoritefood + '</span></dd>\
		                        <dt class="quote"><span>Quote:</span></dt>\
		                        <dd class="quote"><span>' + site.agents[i].quote + '</span></dd>\
		                        <dt class="status"><span>Status:</span></dt>\
		                        <dd class="status"><span>' + site.agents[i].status + '</span></dd>\
		                    </dl>\
		                </figcaption>\
		            </div>\
		        </div>\
		    </div>\
		</li>\
		');
		$('.woa-wrapper.mobile').append('\
				<div class="agent-details agent-' + cleanString(site.agents[i].name) + '" data-agent="' + cleanString(site.agents[i].name) + '">\
		            <div class="sizer"></div>\
		            <div class="sized">\
		                <figure>' +
		                	(site.agents[i].new == "true" ? '<div class="newAgent"><span>New<br />Agent</span></div>': '') +
		                    (jQuery.type(site.agents[i].img) == 'array' ?
		                    	'<img src="/oddsquad/img/agents/' + site.agents[i].img[0] + '">'
		                    :
		                    	'<img src="/oddsquad/img/agents/' + site.agents[i].img + '">'
		                    ) +
		                '</figure>\
		                <figcaption>\
		                	<a href="#back" class="btn btn-back">\
		                		<div class="sizer"></div>\
		                		<div class="sized">\
		                			<span>Back</span>\
		                		</div>\
		                	</a>\
		                    <dl>\
		                        <dt class="name"><span>' + site.agents[i].name + '</span></dt>\
		                        <dt class="dept"><span>Department:</span></dt>\
		                        <dd class="dept"><span>' + site.agents[i].department + '</span></dd>\
		                        <dt class="partner"><span>Partner:</span></dt>\
		                        <dd class="partner"><span>' + site.agents[i].partner + '</span></dd>\
		                        <dt class="accessory"><span>' + site.agents[i].accessory + ' size:</span></dt>\
		                        <dd class="accessory"><span>' + site.agents[i].accessorysize + '</span></dd>\
		                        <dt class="hobbies"><span>Hobbies:</span></dt>\
		                        <dd class="hobbies"><span>' + site.agents[i].hobby + '</span></dd>\
		                        <dt class="favoritefood"><span>Favorite Food:</span></dt>\
		                        <dd class="favoritefood"><span>' + site.agents[i].favoritefood + '</span></dd>\
		                        <dt class="quote"><span>Quote:</span></dt>\
		                        <dd class="quote"><span>' + site.agents[i].quote + '</span></dd>\
		                        <dt class="status"><span>Status:</span></dt>\
		                        <dd class="status"><span>' + site.agents[i].status + '</span></dd>\
		                    </dl>\
		                </figcaption>\
		            </div>\
		        </div>\
			');
	};
	

	//Initiate carousels for agents which had arrays in json doc
	$('.agentSlides').each( function() {
		//create empty object to store variable name
		carouselName = $(this).closest('.agent').attr('data-agent')+ 'AgentCarousel';
		console.log('carouselName: ', carouselName);

		vars[carouselName] = $(this).slick({
			swipeToSlide: true
		});

		console.log('vars[carouselName]: ', vars[carouselName]);
		$(this);
	});

	agentsCreated = true;
	$(document).trigger ('AGENTS_CREATED');

};
/*
<li class="agent agent-olive">
    <div class="sizer"></div>
    <div class="sized">
        <div class="agent-photo">
            <div class="sizer"></div>
            <div class="sized">
                <figure>
                    <img src="/oddsquad/img/agents/agent-olive.jpg">
                </figure>
                <figcaption>
                    <span>Olive</span>
                </figcaption>
            </div>
        </div>
        <div class="agent-details">
            <div class="sizer"></div>
            <div class="sized">
                <figure>
                    <img src="/oddsquad/img/agents/agent-olive.jpg">
                </figure>
                <figcaption>
                    <dl>
                        <dt class="name"><span>Olive</span></dt>
                        <dt class="dept"><span>Department:</span></dt>
                        <dd class="dept"><span>Investigation</span></dd>
                        <dt class="partner"><span>Partner:</span></dt>
                        <dd class="partner"><span>Otto</span></dd>
                        <dt class="accessory"><span>Tie size:</span></dt>
                        <dd class="accessory"><span>7</span></dd>
                        <dt class="hobbies"><span>Hobbies:</span></dt>
                        <dd class="hobbies"><span>Playing or watching basketball, football, soccer, baseball, hockey, badminton, volley ball, cricket, curling, foosball,  bowling, archery, golf, sailing, skiing, lacrosse, polo, water polo (list continued on other page)</span></dd>
                        <dt class="favoritefood"><span>Favorite Food:</span></dt>
                        <dd class="favoritefood"><span>Anything but pie</span></dd>
                        <dt class="quote"><span>Quote:</span></dt>
                        <dd class="quote"><span>Let’s go.</span></dd> 
                        <dt class="status"><span>Status:</span></dt>
                        <dd class="status"><span>Active</span></dd> 
                    </dl>
                </figcaption>
            </div>
        </div>
    </div>
</li>
*/
function makeHex() {
	console.log('here');
	var hex = $('.space-hexs li').first();

	//var hexWidth = 100;
	var hexWidth = winSize.x * 0.1;
	//var hexWidth = Math.floor($(hex).width());
	var hexHeight = Math.floor(hexWidth * 0.57735);
	var hexTriHalf = hexWidth / 2;
	var hexTriHeight = hexWidth * 0.2887;

	var style = $('<style>\
		.space-hexs li {\
			width: ' + hexWidth + 'px;\
			height: ' + hexHeight + 'px;\
		}\
		.space-hexs li span i.btm,\
		.space-hexs li span i.top {\
			border-right-width: ' + hexTriHalf + 'px;\
			border-left-width: ' + hexTriHalf + 'px;\
		}\
		.space-hexs li span i.top {\
			top: -' + Math.floor(hexTriHeight) + 'px;\
			border-bottom-width: ' + hexTriHeight + 'px;\
		}\
		.space-hexs li span i.btm {\
			bottom: -' + Math.floor(hexTriHeight) + 'px;\
			border-top-width: ' + hexTriHeight + 'px;\
		}\
		</style>');
	$('html > head').append(style);
}
var woaInstance = woaInstance || new woaFunctions();


//page and window specific listeners

$(document).ready(woaInstance.documentReady);
$(window).resize(woaInstance.documentResize);
