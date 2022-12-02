(function($) {

	//initiate responsive font sizing
	$.fn.flowtype = function(options) {
	
	  var settings = $.extend({
		 maximum   : 9999,
		 minimum   : 1,
		 maxFont   : 9999,
		 minFont   : 1,
		 fontRatio : 35
	  }, options),
	
	  changes = function(el) {
		 var $el = $(el),
			elw = $el.width(),
			width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
			fontBase = width / settings.fontRatio,
			fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
		 $el.css('font-size', fontSize + 'px');
	  };
	
	  return this.each(function() {
	  // Context for resize callback
		 var that = this;
	  // Make changes upon resize
		 $(window).resize(function(){changes(that);});
	  // Set changes on load
		 changes(this);
	  });
	};
	
})(jQuery);

//global variables
var startPage = 0,
	pageScroll,
	position,
	scrollPages = [],
	pageWidth = 0,
	scrollPagesQty,
	scrollEase = 'cubic-bezier(0.1, 0.57, 0.1, 1)',
	featuredAgents = [],
	userLogin = [],
	site = [],
	pbsBarLoaded = false,
	awardsCreated = false,
	awardsLoaded = false,
	agentsCreated = false,
	doorsCreated = false,
	doorsLoaded = false,
	videoJSLoaded = false;

$(document).on ({ 
	"PBS_BAR_LOADED" : function ( event ) {
		console.log('PBS Bar loaded');
		
		var o = agent.getInfo(gotInfo);
		
		function gotInfo(data) {
			
			userLogin.push({
				name: data.name,
				code: data.code,
				avatar: data.avatar,
				username: PBS.KIDS.identity.getCurrentUsers()[0].username,
				userid: PBS.KIDS.identity.getCurrentUsers()[0].userid,
				accesstoken: PBS.KIDS.identity.getCurrentUsers()[0].accesstoken,
				isloggedin: PBS.KIDS.identity.getCurrentUsers()[0].isloggedin,
				anonymousGuid: PBS.KIDS.identity.getCurrentUsers()[0].anonymousGuid
			});
			if(userLogin[0].code == '' || userLogin[0].agent == '') {
				$('body').attr('data-agent-login', 'false');
				console.log('no agent info!!!!!');
			} else {
				$('body').attr('data-agent-login', 'true');
			}
		}
		
		achievements.get(achievementsLoaded);
		
		function achievementsLoaded(unlocked, viewed) {
			console.log('unlocked: ', unlocked);
			console.log('viewed: ', viewed);
			awardsLoaded = true;
			$ ( document ).trigger ( "AWARDS_LOADED" );
		}
		
		locker.get(initLockers);
		function initLockers(unlocked, viewed) {
			console.log('doors unlocked: ', unlocked);
			console.log('doors viewed: ', viewed);
			doorsLoaded = true;
			$ ( document ).trigger ( "DOORS_LOADED" );
		}
		
		if ( pbsBarLoaded && videoJSLoaded ) {
			console.log('VideoJS & PBS Loaded #1');
			initVideoPlayer();
		}
		
		

	}, 
	"VIDEOJS_LOADED" : function ( event ) {
		console.log('VideoJS Loaded');
		if ( pbsBarLoaded && videoJSLoaded ) {
			console.log('VideoJS & PBS Loaded #2');
			initVideoPlayer();
		}
	}, 
	"AWARDS_CREATED" : function ( event ) {
		console.log('Awards HTML Created');
		if ( pbsBarLoaded && awardsCreated && awardsLoaded ) {
			updateAwards ();
		}
	}, 
	"AWARDS_LOADED" : function ( event ) {
		console.log('User Awards Info Loaded');
		if ( pbsBarLoaded && awardsCreated && awardsLoaded ) {
			updateAwards();		
		}
		if ( $('.agent-dashboard').exists() && pbsBarLoaded && doorsLoaded && awardsLoaded ) {
			updateAgentSections();
		}
	}, 
	"AGENTS_CREATED" : function ( event ) {
		console.log('AGENTS HTML Created');
	}, 
	"DOORS_CREATED" : function ( event ) {
		console.log('Door HTML Created');
		if ( pbsBarLoaded && doorsCreated && doorsLoaded ) {
			updateDoors();
		}
	}, 
	"DOORS_LOADED" : function ( event ) {
		console.log('User Door Info Loaded');
		if ( pbsBarLoaded && doorsCreated && doorsLoaded ) {
			updateDoors();		
		}
		if ( $('.agent-dashboard').exists() && pbsBarLoaded && doorsLoaded && awardsLoaded ) {
			updateAgentSections();
		}
	},
	'OVERLAY_CREATED' : function(event, type){
		console.log('OVERLAY TYPE: ', type);
		
		$('.ov-wrapper[data-type="' + type + '"]').addClass('init-overlay');
		$('.pg-wrapper').addClass('hide');
	},
	'OVERLAY_REMOVED' : function(event, type){
		$('.pg-wrapper').removeClass('hide');
		if(type !== '') {
			$('.ov-wrapper[data-type="' + type + '"]').removeClass('init-overlay');
			
			setTimeout(function () {
				$('.ov-wrapper[data-type="' + type + '"]').remove();
			}, 500);
			
		} else {
			$('.ov-wrapper').removeClass('init-overlay');
			
			$('.ov-wrapper').remove();
		}
	}
});
		
$(document).ready(function () {
	
	// build page content and clean up urls
	if($('[data-pageGenratr="true"]').exists() == true) {
		genratrGrab('body');
	} else {		
		buildContent();
	};
	
	
	agent.loggedIn(function() {
		pbsBarLoaded = true;
		$(document).trigger( "PBS_BAR_LOADED" );
		
		//is user logged in?
		$('body').attr('data-pbs-login', loggedIn());
		
	});
	
	setTimeout(function () {
		
		$('body').flowtype({
			minimum   : 500,
			maximum   : 1200,
			fontRatio : 30
		});
		
	}, 50);
	
	setTimeout(function () {
		prefix();
		getWinSize();
		
		//lte9 white cover to prevent partial load while .htaccess runs
		if($('.lte9').exists() == true ) {
			setTimeout(function () {
				$('.iecover').remove();
			}, 500);
		} else {
			//clean up html if not needed
			$('.iecover').remove();
		};
		
		
		
		//add active class to page to init load animations
		if($('[data-pagegenratr="true"]').exists() !== true) {
			
			setTimeout(function () {
				$('.pg-agents').addClass('active');
			}, 500);
		}

	}, 0);
	

	
	
	if($('[data-pageDepth="root"]').exists() == true) {
		
		// <= ie9 html5 poly fill refresh & removal of /#/
		var url = window.location.href;
		var hashExist = url.search(new RegExp('#/', 'i'));
		
		if(hashExist >= 0) {
			
			//need to relook at...
			url = url.replace('#/', '');
			url = url.replace('index.html', '');
			window.location.replace(url);
		}
		
		setTimeout(function () {
			//setStageSize();
			//getPages(scrollPages);
			getPages();
		}, 0);
		
		setTimeout(function () {
				//init main page carousel
				pageScroll = new IScroll('.pg-wrapper', {
					snap: true,
					momentum: false,
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					disableMouse: true,
					disablePointer: true,
					probeType: 3
					
				});
				if(params !== undefined) {
					genratrSetURL(params[1].dir, '', true)
				};
				
				pageScroll.on('scrollStart', function() {
					$('html').addClass('grabbing');
					$('.scrollNav, .pageNav').addClass('disabled');
					
					setStartPage(this.currentPage.pageX);
					
					getScrollingStatus(this.currentPage.pageX);
					$('html').removeClass('scroll-done');
				});
				pageScroll.on('scrollEnd', function() {
					$('html').removeClass('grabbing');
					getScrollingStatus(this.currentPage.pageX, this.x);
					
					$('html').addClass('scroll-done');
					$('.scrollNav, .pageNav').removeClass('disabled');
				});
				pageScroll.on('scroll', function() {
					getScrollingStatus(this.currentPage.pageX, this.x);
				});
				
				setStageStatus(0);
					
				
				//set start button size and init
				$('.btn-animate').each( function() {
					$(this).width($(this).parent().width());
					$(this).height($(this).parent().height());
				});
				$('.btn-animate').sprite({
					fps: 20,
					no_of_frames: 14, 
					on_last_frame: function(obj) {
						obj.spStop();
						
						setTimeout(function () {
								obj.spStart();
						}, 3000);
					}
					
				});
			}, 100);
	};
	
	//background sliders init & funcs
	$('.bg-slider li').each( function() {
		var ranMin = 0,
			ranMax = 3;
			
		$(this).slider({
			orientation: "vertical",
			value: $(this).attr('data-value'),
			min: ranMin,
			max: ranMax,
			step: 1,
			slide: function( event, ui ) {
				$(this).attr('data-value', ui.value);
				$(this).removeClass (function (index, css) {
					return (css.match (/\blevel-\S+/g) || []).join(' ');
				});
				$(this).addClass('level-' + ui.value);
				calcBG();
			}
		})
	});	
	calcBG();
	
    $('.btn-continue').on('click', function(event) {
		event.preventDefault();
		
		$('html').addClass('loaded');
		
		setTimeout(function () {
			$('html').removeClass('delayload');
		}, 500);
		setTimeout(function () {
			$('[data-overlay="loading"]').remove();
		}, 1000);
		
	});

	// Change faux url on click 
	$('[data-genratrTarget]').on('click', function(event) {
		event.preventDefault();
		var url		= $(this).attr('href'),
			title	= 'Odd Squad - ' + url;
		pushUrl(url, title, event)
		
	});
	

});

function loggedIn() {
	return PBS.KIDS.identity.getCurrentUsers()[0].isloggedin;
}
function buildContent(num) {
	var num = num || 0;
	console.log('num: ', num);
	
	if($('.award-lst').exists() || $('.agent-sections').exists()){
		$.getJSON('http://ernie.pbskids.org/oddsquad/json/awards.json', function(data) {
			site.awards = data.awards;
		})
		.success( function() {
			if($('.award-lst').exists()) {
				buildAwards(0);
			};
		})
		.error( function(jqXHR, textStatus, errorThrown) {
			console.log('getJSON error: ', textStatus);
			console.log('getJSON errorThrown: ', errorThrown);
			console.log('arguments: ', arguments);
			console.log("getJSON incoming Text " + jqXHR.responseText);
		})
		.complete( function() {
			console.log('awards JSON loaded in JSON get');
			if($('.award-lst').exists()) {
				awardsCreated = true;
				$(document).trigger ('AWARDS_CREATED');
			};
			
		});
	};
	
	if($('.doors-lst').exists() || $('.agent-sections').exists()){
		$.getJSON('http://ernie.pbskids.org/oddsquad/json/hallofdoors.json', function(data) {
			site.doors = data.doors;
		})
		.success( function() {
			if($('.doors-lst').exists()) {
				buildDoors(0);
			};
		})
		.error( function(jqXHR, textStatus, errorThrown) {
			console.log('getJSON error: ', textStatus);
			console.log('getJSON errorThrown: ', errorThrown);
			console.log('arguments: ', arguments);
			console.log("getJSON incoming Text " + jqXHR.responseText);
		})
		.complete( function() {
			console.log('awards JSON loaded in JSON get');
			if($('.doors-lst').exists()) {
				doorsCreated = true;
				$(document).trigger ('DOORS_CREATED');
			};
			
		});
	};
	
	if($('.agents-lst').exists()){
		$.getJSON('http://ernie.pbskids.org/oddsquad/json/agents.json', function(data) {
			site.agents = data.agents;		
		})
		.success( function() {
			buildAgents();
		})
		.error( function(jqXHR, textStatus, errorThrown) {
			console.log('getJSON error: ', textStatus);
			console.log('getJSON errorThrown: ', errorThrown);
			console.log('arguments: ', arguments);
			console.log("getJSON incoming Text " + jqXHR.responseText);
		})
		.complete( function() {
			console.log('awards JSON loaded in JSON get');
			agentsCreated = true;
			$(document).trigger ('AGENTS_CREATED');
			
		});
	};
	
	if($('[data-overlay="createagent"]').exists()){
		console.log('start building agent create section');
		$.getScript("/oddsquad/js/newAgent.js", function(){
			console.log('newAgent.js loaded with new content');
		});
	};
};

/* -----------------------------------------------------------

						BUILD AGENTS

----------------------------------------------------------- */
function buildAgents() {
	console.log('site agents: ', site.agents);
	var container 		= $('.agents-wrapper'),
		agentsPerPg		= 13,
		agentsTotal		= site.agents.length;
	
	console.log('NUM OF AGENTS: ', site.agents.length);
	console.log('TOT NUM OF AGENTS: ', agentsTotal);
	
	
		for (i = 0; i < agentsTotal; i++) {
			
			$(container).find('.agents-lst').append('<li class="agent-' + (i + 1) +'" data-agentid="' + i + '"><div class="sizer"></div><div class="img-wrap sized"><figure class="agent-hex agent-hex-1"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure><figure class="agent-hex agent-hex-2"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure><figure class="agent-hex agent-hex-3"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/' + site.agents[i].img1 + '" /></div></figure></div></li>');
		
			$(container).find('ul.agents-bgs').append('<li class="agent-' + (i + 1) +'"><div class="sizer"></div><div class="border-hex sized"><div class="bg-hex bg-hex-1"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-2"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-3"><div class="sizer"></div><div class="sized"><span></span></div></div></div></li>');
			
		};
	
	
	
	$('a.close-agent').on('click', function() {
		$('ul.agents-lst li[data-agentid]').removeClass('hide');
		$('.agent-details').removeClass('show');
	});
	
	$('.agents-lst figure').on('click', function() {
		$('ul.agents-lst li[data-agentid]').removeClass('hide');
		
		var aid = $(this).closest('li').attr('data-agentid');
		console.log('aid: ', aid);	
		
		var detailsContainer = $('.agent-details');
		$(detailsContainer).find('dt.name span').html(site.agents[aid].name);
		$(detailsContainer).find('dd.dept span').html(site.agents[aid].department);
		$(detailsContainer).find('dd.partner span').html(site.agents[aid].partner);
		$(detailsContainer).find('dd.accessory span').html(site.agents[aid].accessory);
		$(detailsContainer).find('dd.status span').html(site.agents[aid].status);
		$(detailsContainer).addClass('show');
		
		
		for (i = 0; i < agentsTotal; i++) {
			if(aid != i){
				$('ul.agents-lst li[data-agentid="' + i + '"]').addClass('hide');
			}
		};
			
	});
};
function updateAwards() {
	
	$('.user-stats.awards-stats .accnt-rec').html(achievements.unlocked.length);
	
		console.log('achievements.unlocked[' + achievements.unlocked.length + ']: ', achievements.unlocked);
		console.log('achievements.viewed[' + achievements.viewed.length + ']: ', achievements.viewed );
			
	if (achievements.unlocked == null || achievements.unlocked == 'undefined' || achievements.unlocked == '') {
		console.log('user does not have any awards');
		
	} else {
	
		for(var i=0; i < achievements.unlocked.length; i++) {
			console.log(achievements.unlocked[i]);
			$('[data-award="' + achievements.unlocked[i] + '"]').attr('data-status', 'unlocked');
		}
		for(var i=0; i < achievements.viewed.length; i++) {
			console.log(achievements.viewed[i]);
			$('[data-award="' + achievements.viewed[i] + '"]').attr('data-status', 'viewed');
		}
		console.log('user has these awards: ', achievements.unlocked);

	};
	
	gotoScroll('awardScroll', 0, 1000);
	probeCarousel('awardScroll');
			
	$('.award-lst li').on('tap', function() {
		
		var award = $(this).attr('data-award');
		gotoScroll('awardScroll', award - 1, 1000);
		
		if($(this).attr('data-status') == 'unlocked') {
			
			//ADD ACHIEVEMENT HERE AS VIEWED!!
			achievements.add(1, achievements.VIEWED);
			$(this).attr('data-status', 'viewed');
		};
	});
	
}
function buildAwards(num) {
	var container	= $('.award-lst');
	
	console.log('this is working');
	$('.user-stats.awards-stats .accnt-tot').html(site.awards.length);
	
	console.log('time to build!', site.awards.length);
	
	for (i = 0; i < site.awards.length; i++) {
		$(container).append('<li data-award="' + (i + 1) + '" data-status="locked" style="width: ' + 100 / site.awards.length + '%"><div class="sizer"></div><div class="sized"><div class="award-lights"></div><div class="award-stars"></div><div class="award-box"><img src="/oddsquad/img/agents/box-body.png" /></div><div class="award-lid"><img src="/oddsquad/img/agents/box-lid.png" /></div><div class="award-award"><img src="/oddsquad/img/awards/' + site.awards[i].src + '" /></div></div><div class="award-lock"><img src="/oddsquad/img/agents/box-lock.png" /></div></li>');
	};
//'"
	$(container).width(100 * site.awards.length + '%');
	awardScroll = new IScroll('.award-wrapper', {
		snap: true,
		momentum: false,
		scrollX: true,
		scrollY: false,
		probeType: 3,
		tap: true	
	});
	
}

function updateDoors() {
	
	$('.user-stats.doors-stats .accnt-rec').html(locker.unlocked.length);
	
		console.log('locker.unlocked[' + locker.unlocked.length + ']: ', locker.unlocked);
		console.log('locker.viewed[' + locker.viewed.length + ']: ', locker.viewed );
			
	if (locker.unlocked == null || locker.unlocked == 'undefined' || locker.unlocked == '') {
		console.log('user does not have any doors');
		
	} else {
	
		for(var i=0; i < locker.unlocked.length; i++) {
			console.log(locker.unlocked[i]);
			$('[data-door="' + locker.unlocked[i] + '"]').attr('data-status', 'unlocked');
		}
		for(var i=0; i < locker.viewed.length; i++) {
			console.log(achievements.viewed[i]);
			$('[data-door="' + achievements.viewed[i] + '"]').attr('data-status', 'viewed');
		}
		console.log('user has these doors: ', locker.unlocked);

	};
	
	gotoScroll('doorsScroll', 0, 1000);
	probeCarousel('doorsScroll');
			
	$('.doors-lst li').on('tap', function() {
		
		var door = $(this).attr('data-door');
		gotoScroll('doorsScroll', door - 1, 1000);
		
		if($(this).attr('data-status') == 'unlocked') {
			
			//ADD DOOR HERE AS VIEWED!!
			locker.add(1, locker.VIEWED);
			$(this).attr('data-status', 'viewed');
		};
	});
	
}
function buildDoors(num) {
	var container	= $('.doors-lst');
	
	console.log('this is working');
	$('.user-stats.doors-stats .accnt-tot').html(site.doors.length);
	
	console.log('time to build doors!', site.doors.length);
	
	for (i = 0; i < site.doors.length; i++) {
		$(container).append('<li data-door="' + (i + 1) + '" data-status="locked" style="width: ' + 100 / site.doors.length + '%"><div class="sizer"></div><div class="sized"><h4>' + site.doors[i].name + '</h4><div class="door-door"><img src="/oddsquad/img/doors/' + site.doors[i].src + '-OPEN.png" class="door-open" /><img src="/oddsquad/img/doors/' + site.doors[i].src + '-CLOSED.png" class="door-closed" /></div></div><div class="award-lock"><img src="/oddsquad/img/doors/lock-locked.png" class="key-locked" /><img src="/oddsquad/img/doors/lock-unlocked.png" class="key-unlocked" /></div></li>');
	};
//'"
	
	$(container).width(100 * site.doors.length + '%');
	doorsScroll = new IScroll('.doors-wrapper', {
		snap: true,
		momentum: false,
		scrollX: true,
		scrollY: false,
		probeType: 3,
		tap: true	
	});
	
}
function updateAgentSections() {
	console.log('agent: ', agent);
	$('.agent-profile .photo .yespbs').attr('src', '/oddsquad/img/agents/' + agent.avatar );
	$('.agent-profile .badge.yespbs em').html(agent.code);
	$('.user-stats.awards-stats .accnt-rec').html(achievements.unlocked.length);
	$('.user-stats.awards-stats .accnt-tot').html(site.awards.length);
	$('.user-stats.doors-stats .accnt-rec').html(locker.unlocked.length);
	$('.user-stats.doors-stats .accnt-tot').html(site.doors.length);
	
}

function probeCarousel(name) {
	var items			= window[name].pages.length,
		itemWidth		= window[name].pages[0][0].width,
		scrollerWidth	= window[name].scrollerWidth,
		scrollerElem	= $(window[name].scroller).attr('class');
	
	/*
	console.log('carousel '+name+': ', window[name]);
	console.log('items: ', items);
	console.log('item width: ', itemWidth);
	console.log('scroller width: ', scrollerWidth);
	console.log('scroller elem: ', scrollerElem);
	*/
	
	//gives active page an active class and depth class names
	probeHighlightPage(scrollerElem, window[name].currentPage.pageX, 3)
	
	window[name].on('scrollStart', function() {
		$('[data-overlay').removeClass('animate');
	});
	window[name].on('scrollEnd', function() {
		$('.'+scrollerElem+' > *:eq('+probeCurPage(name, itemWidth, this.x * -1, scrollerElem)+')').addClass('active');
		
		
		if($('.'+scrollerElem+' > *:eq('+probeCurPage(name, itemWidth, this.x * -1, scrollerElem)+')').attr('data-status') !== 'locked'){		
			$('[data-overlay').addClass('animate');
		}
		//probeHighlightPage(scrollerElem, window[name].currentPage.pageX, 2)
		
	});
	window[name].on('scroll', function() {
		//find the active page by scroll position and page size
		//clean up game name for src of image
		var cleanGame = (site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].game).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
		console.log('game name: ', cleanGame);
		
		probeHighlightPage(scrollerElem, probeCurPage(name, itemWidth, this.x * -1, scrollerElem), 3);
		if(name == 'awardScroll') {
			$('[data-overlay="awards"] .banner span').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].name);
			$('[data-overlay="awards"] .award-desc').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].desc);
			$('[data-overlay="awards"] .award-game span').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].game);
			if(cleanGame == 'general'){
				$('.game-hex').replaceWith('<a href="/games/" data-genratrtarget onclick="closeOverlay(\'awards\'), pushUrl(\'/games/\', \'Games\', event)" class="game-hex"><img src="/oddsquad/img/hexagons/' + cleanGame + '-hex.png"></a>');
			} else {
				$('.game-hex').replaceWith('<a href="/oddsquad/games/' + cleanGame + '/" class="game-hex"><img src="/oddsquad/img/hexagons/' + cleanGame + '-hex.png"></a>');
			}

			// console.log(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].name);
			
		}
	});
	
};
function gotoScroll(name, num, speed) {	
	$('[data-overlay').removeClass('animate');
	
	var transition = speed || 500;
	
	if(num == 'next'){
		window[name].goToPage((window[name].currentPage.pageX + 1), 0, speed);
		return;
	} else if(num == 'prev') {
		window[name].goToPage((window[name].currentPage.pageX - 1), 0, speed);
		return;
	}
	window[name].goToPage(num, 0, speed);
};

function probeCurPage(name, itemWidth, curPosi, scrollerElem) {
	var	activePg = Math.round(curPosi / itemWidth);
	if(activePg < 0) {
		activePg = 0;
	}
	return activePg;
};

function probeHighlightPage(scrollerElem, activePg, depth) {
	$('.'+scrollerElem+' > *').removeClass();
	$('.'+scrollerElem+' > *:eq('+activePg+')').addClass('active');
	
	for (i = 1; i <= depth; i++) {
		$('.'+scrollerElem+' > *:eq('+(activePg - i)+')').addClass('prev' + i);
		$('.'+scrollerElem+' > *:eq('+(activePg + i)+')').addClass('next' + i);
	}
	
};

function pushUrl(url, title, event) {
	if($('[data-pageDepth="root"]').exists() == false ) {
		//if interrior page build link to send params to home page for opening correct point
		//if ie9 or below handle as normal link and send to static page
		if($('.lte9').exists() == false ) {
			event.preventDefault();
			window.location.replace('/oddsquad/index.html?dir=' + url);
		} else {
			event.preventDefault();
			window.location.replace('/oddsquad' + url);
		}
		return
	} else if ($('[data-pageDepth="root"]').exists() == true) {
		//if home page use this method for push state
		event.preventDefault();
			
		genratrSetURL(url, title, false);
	}
}
function closeOverlay(type) {
	$(document).trigger('OVERLAY_REMOVED', type);
};

$(window).resize( function () {
	$('.videoPlaylist-wrapper').height($('.videoPlayer-wrapper').height());
	
	if($('[data-pageDepth="root"]').exists() == true) {
		$('.btn-animate').destroy();
		$('.btn-animate').each( function() {
			$(this).width($(this).parent().width());
			$(this).height($(this).parent().height());
		});
		$('.btn-animate').sprite({
			fps: 20,
			no_of_frames: 14, 
			on_last_frame: function(obj) {
				obj.spStop();
				
				setTimeout(function () {
						obj.spStart();
				}, 3000);
			}
			
		});
		setTimeout(function () {
			calcHex();
			pageScroll.refresh();
		}, 0);
	};
    setTimeout(function () {
		getWinSize();
		//setStageSize();
    }, 0);
	
});
function calcBG() {
	var sliders = $('.bg-slider li').length,
		bgNum = 0;
	
	for (var i = 0; i < sliders; i++) {
		var value =  parseInt($('.bg-slider li:eq('+ i +')').attr('data-value'));
		bgNum = bgNum + value;
	};
	
	$('html').removeClass (function (index, css) {
		return (css.match (/\bbgImg-\S+/g) || []).join(' ');
	});
	
	$('html').addClass('bgImg-' + bgNum);
}

function getPages() {
	scrollPagesQty	= $('.pg-wrapper > section > article').length;
	
	for (var i = 0; i < scrollPagesQty; i++) {
		
		var self	= $('.pg-wrapper > section > article:eq(' + i + ')');
		
		scrollPages.push({
			_details: {				
				name: $(self).attr('data-title'),
				status: null
			},
			_size: {
				x: $(self).width(),
				y: $(self).height()
			},
			_position: {			
				x: $(self).offset().left,
				y: $(self).offset().top	
			}

		});
		pageWidth = pageWidth + scrollPages[i]._size.x;
	};
	console.log('scrollPages: ', scrollPages);
};
/*
function getScrollItems(name, wrapper, list) {

	var scrollItems		= $(list).children().length;
	
	site.carousels[name]	= [];
	site.carousels[name]._details = {
			name:		name,
			wrapper:	wrapper,
			list:		list,
			items:		scrollItems,
			active:		0
		};
	site.carousels[name].items	= [];
	
	for (var i = 0; i < scrollItems; i++) {
		var self	= $(list).find('*:eq(' + i + ')');
		
		site.carousels[name].items.push({
			_details: {		
				name: $(self).attr('data-title'),
				status: null
			},
			_size: {
				x: $(self).width(),
				y: $(self).height()
			},
			_position: {
				x: $(self).offset().left,
				y: $(self).offset().top	
			}

		});
	}
	console.log('SITE: ', site)
}
*/
/*
function setStageSize() {
	$('.pg-wrapper > section > article').width(winSize.x);
	$('.pg-wrapper > section > article').height(winSize.y);
}
*/
function setStartPage(page) {
	startPage = page;
}
function getScrollingStatus(newPage, curPosi) {
	
	startPosi 		= scrollPages[startPage]._position.x;
	
	if(startPage > newPage || (curPosi * (-1)) < startPosi ) {
		pageScroll.dir = '-1';
	}else if(startPage < newPage || (curPosi * (-1)) > startPosi) {
		pageScroll.dir = '1';
	//}else if (startPage == newPage) {
	}else {
		pageScroll.dir = '0';
	}
	
	pageScroll.dif = Math.abs(startPosi + curPosi)
	
	setStageStatus(newPage);
};
function setStageStatus(newPage) {
	//setScrollPageStatus
	//clear active status if exists to clear active animations
	$('.pg-wrapper > section > article').removeClass('active');
	//add active status to current stage to init animations
	$('.pg-wrapper > section > article:eq(' + newPage + ')').addClass('active');
	
	curStage	= newPage
	
	for (var i = 0; i < scrollPagesQty; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').removeAttr('data-status');
	};
	
	for (var i = 0; i < curStage; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').attr('data-status', 'old');
	};
	for (var i = curStage + 1; i < scrollPagesQty; i++) {
		//clear all stage status
		$('.pg-wrapper > section > article:eq(' + i + ')').attr('data-status', 'new');
	};
	
	$('.pg-wrapper > section > article:eq(' + curStage + ')	').attr('data-status','cur');
	$('html').attr('data-activeStage', curStage);

};

function gotoStage(stage, speed) {
	
	//prevents bug with overclicking by disabling btns
	$('.scrollNav, .pageNav').addClass('disabled');
	
	var transition = speed || 500;
	
	//console.log('transition: ', transition);
	if(stage == 'next'){
		pageScroll.goToPage((pageScroll.currentPage.pageX + 1), 0, speed);
		return;
	} else if(stage == 'prev') {
		pageScroll.goToPage((pageScroll.currentPage.pageX - 1), 0, speed);
		return;
	}
	pageScroll.goToPage(stage, 0, speed);
};

function calcBG() {
	var sliders = $('.bg-slider li').length,
		bgNum = 0;
	
	for (var i = 0; i < sliders; i++) {
		var value =  parseInt($('.bg-slider li:eq('+ i +')').attr('data-value'));
		bgNum = bgNum + value;
	};
	
	$('html').removeClass (function (index, css) {
		return (css.match (/\bbgImg-\S+/g) || []).join(' ');
	});
	
	$('html').addClass('bgImg-' + bgNum);
}
/* -------------------------------------------------
                   GLOBAL FUNCTIONS
------------------------------------------------- */
function translate(elem, x, y, z){
	
	var elemMatrix = 	getMatrix(elem),
		matrixType =	elemMatrix[1].length == 6 ? '2D' : elemMatrix[1].length == 17 ? '3D' : undefined,
		translateAxis = {
			x: x !== undefined ? x : matrixType == '2D' ? elemMatrix[1][4] : matrixType == '3D' ? elemMatrix[1][13] : 0,
			y: y !== undefined ? y : matrixType == '2D' ? elemMatrix[1][5] : matrixType == '3D' ? elemMatrix[1][14] : 0,
			z: z !== undefined ? z : matrixType == '2D' ? 0 : matrixType == '3D' ? elemMatrix[1][15] : 0
		};

	$(elem).css(prefix.css + 'transform', 'translateX(' + translateAxis.x + 'px) translateY(' + translateAxis.y + 'px) translateZ(' + translateAxis.z + 'px)');

};
function getMatrix(target) {
	
	var	matrix = $(target).css(prefix.css + 'transform');	
	matrixValues = matrix.match(/-?[0-9\.]+/g);
	
	return [matrix, matrixValues];
};

function getWinSize() {
	return winSize = {
		x: $(window).width(),
		y: $(window).height()
	};
};

function prefix() {
	var styles = window.getComputedStyle(document.documentElement, '');
	
	pre = (Array.prototype.slice
			.call(styles)
			.join('') 
			.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	return prefix = {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
};

$.fn.exists = function () {
    return this.length !== 0;
}