(function($) {

	//initiate responsive font sizing
	$.fn.flowtype = function(options) {
	
	  var settings = $.extend({
		 maximum   : 9999,
		 minimum   : 1,
		 maxFont   : 9999,
		 minFont   : 1,
		 fontRatio : 30
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
var userLogin = [],
	site = [],
	pbsBarLoaded = false,
	agentInfoLoaded = false,
	awardsCreated = false,
	awardsLoaded = false,
	agentsCreated = false,
	doorsCreated = false,
	doorsLoaded = false;


$(document).on ({
	"PBS_BAR_LOADED" : function ( event ) {
		
		var o = agent.getInfo(gotInfo);
		
		function gotInfo(data) {
			
			userLogin.push({
				name: data.name,
				code: data.code,
				background: data.background,
				avatar: data.avatar,
				username: PBS.KIDS.identity.getCurrentUsers()[0].username,
				userid: PBS.KIDS.identity.getCurrentUsers()[0].userid,
				accesstoken: PBS.KIDS.identity.getCurrentUsers()[0].accesstoken,
				isloggedin: PBS.KIDS.identity.getCurrentUsers()[0].isloggedin,
				anonymousGuid: PBS.KIDS.identity.getCurrentUsers()[0].anonymousGuid
			});
			
			agentInfoLoaded = true;
			$(document).trigger( "AGENT_INFO_LOADED" );
			
			if(userLogin[0].code == '' || userLogin[0].agent == '') {
				$('body').attr('data-agent-login', 'false');

			} else {
				$('body').attr('data-agent-login', 'true');
				
			};
			
			if(userLogin[0].background !== ''){
				$('html').removeClass(function (index, css) {
					return (css.match (/(^|\s)bgImg-\S+/g) || []).join(' ');
				});
				
				$('html').addClass('bgImg-' + userLogin[0].background);
			};
			
		}
		
		achievements.get(achievementsLoaded);
		
		function achievementsLoaded(unlocked, viewed) {
			awardsLoaded = true;
			$ ( document ).trigger ( "AWARDS_LOADED" );
		}
		
		locker.get(initLockers);
		function initLockers(unlocked, viewed) {
			doorsLoaded = true;
			$ ( document ).trigger ( "DOORS_LOADED" );
		}
		
		if ( pbsBarLoaded && videoJSLoaded ) {
			//initVideoPlayer();
		}
		
		

	}, 
	"VIDEOJS_LOADED" : function ( event ) {
		if ( pbsBarLoaded && videoJSLoaded ) {
			initVideoPlayer();
		}
	}, 
	"AWARDS_CREATED" : function ( event ) {
		if ( pbsBarLoaded && awardsCreated && awardsLoaded ) {
			updateAwards ();
		}
	}, 
	"AWARDS_LOADED" : function ( event ) {
		if ( pbsBarLoaded && awardsCreated && awardsLoaded ) {
			updateAwards();		
		}
		if ( $('.agent-dashboard').exists() && pbsBarLoaded && doorsLoaded && awardsLoaded ) {
			updateAgentSections();
		}
	}, 
	"DOORS_CREATED" : function ( event ) {
		if ( pbsBarLoaded && doorsCreated && doorsLoaded ) {
			updateDoors();
		}
	}, 
	"DOORS_LOADED" : function ( event ) {
		if ( pbsBarLoaded && doorsCreated && doorsLoaded ) {
			updateDoors();		
		}
		if ( $('.agent-dashboard').exists() && pbsBarLoaded && doorsLoaded && awardsLoaded ) {
			updateAgentSections();
		}
	}
});

$(document).ready(function () {
	
	$('.mobileNav a').on('click', function() {
		$('body').toggleClass('showNav');
	});
		
	agent.loggedIn(function() {
		pbsBarLoaded = true;
		$(document).trigger( "PBS_BAR_LOADED" );
		
		//is user logged in?
		$('body').attr('data-pbs-login', loggedIn());
		
	});
	
	setTimeout(function () {
		
		$('body').flowtype({
			minimum   : 100,
			maximum   : 1500,
			fontRatio : 40
		});
		
	}, 50);
	
	setTimeout(function () {	
		
		
		//add active class to page to init load animations
		if($('[data-pagegenratr="true"]').exists() !== true) {
			
			setTimeout(function () {
				$('.pg-agents').addClass('active');
			}, 500);
		}		

	}, 0);
		

});
function loggedIn() {
	return PBS.KIDS.identity.getCurrentUsers()[0].isloggedin;
}

function buildAwards(num) {
	//console.log('STARTING TO BUILD AWARDS HTML');
	var container	= $('.award-lst');
	//$('.user-stats.awards-stats .accnt-tot').html(site.awards.length);
	$('.user-stats.awards-stats .accnt-tot').html('30');
	
	
	for (i = 0; i < site.awards.length; i++) {
		$(container).append('<li data-award="' + (i + 1) + '" data-status="locked" style="width: ' + 100 / site.awards.length + '%"><div class="sizer"></div><div class="sized"><div class="award-lights"></div><div class="award-stars"></div><div class="award-box"><img src="/oddsquad/img/agents/box-body.png" /></div><div class="award-lid"><img src="/oddsquad/img/agents/box-lid.png" /></div><div class="award-award"><img src="/oddsquad/img/awards/' + site.awards[i].src + '" /></div></div><div class="award-lock"><img src="/oddsquad/img/agents/box-lock.png" /></div></li>');
	};
	
//"""'
	$(container).width(100 * site.awards.length + '%');
	
	//console.log('STARTING TO BUILD AWARDS HTML CAROUSEL');
	awardScroll = new IScroll('.award-wrapper', {
		snap: true,
		momentum: false,
		scrollX: true,
		scrollY: false,
		probeType: 3,
		tap: true	
	});
	
	//console.log('SETTING AWARDS CREATED TRIGGER');
	awardsCreated = true;
	$(document).trigger ('AWARDS_CREATED');
	
}

function updateDoors() {
	
	if($('body').attr('data-agent-login') == 'false') {
	$('.user-stats.doors-stats .accnt-rec').html(0);
	} else {
	$('.user-stats.doors-stats .accnt-rec').html(locker.unlocked.length);
	}
	
		
	// check for UNLOCKED lockers/doors	
	if (locker.unlocked.length == 0 || locker.unlocked == null || locker.unlocked == 'undefined' || locker.unlocked == '') {
		
			//infoBox('dt', 'Doors - total(0/' + site.doors.length + ')');
		
	} else {
	
		//infoBox('dt', 'Doors - unlocked(' + locker.unlocked.length + '/' + site.doors.length + ')');
		for(var i=0; i < locker.unlocked.length; i++) {
			$('[data-door="' + locker.unlocked[i] + '"]').attr('data-status', 'unlocked');
			//infoBox('dd', 'door unlocked: ' + (locker.viewed[i]) + ' - ' + site.doors[locker.unlocked[i]-1].name);
		}

	};
	
	// check for VIEWED lockers/doors
	if(locker.viewed.length > 0 && locker.viewed[0] !== '') {
		
		//infoBox('dt', 'Doors - viewed(' + locker.viewed.length + '/' + site.doors.length + ')');
		for(var i=0; i < locker.viewed.length; i++) {
			
			//infoBox('dd', 'door viewed: ' + (locker.viewed[i]) + ' - ' + site.doors[locker.viewed[i]-1].name);
			$('[data-door="' + locker.viewed[i] + '"]').attr('data-status', 'viewed');
		}
		
	} else {
		//infoBox('dt', 'Doors - viewed(0/' + site.doors.length + ')');
	}
	
	gotoScroll('doorsScroll', 0, 1000);
	probeCarousel('doorsScroll');
			
	$('.doors-lst li').on('tap', function() {
		
		var door = parseInt($(this).attr('data-door'));
		gotoScroll('doorsScroll', door - 1, 1000);
		
		if($(this).attr('data-status') == 'unlocked') {
			
			//infoBox('dd', 'door viewed: ' + door + ' - ' + site.doors[door-1].name);
			//ADD DOOR HERE AS VIEWED!!
			locker.add(door, locker.VIEWED)
			$(this).attr('data-status', 'viewed');
		};
	});
	
}
function buildDoors(num) {
	var container	= $('.doors-lst');
	
	$('.user-stats.doors-stats .accnt-tot').html(site.doors.length);
	
	
	for (i = 0; i < site.doors.length; i++) {
		$(container).append('<li data-door="' + (i + 1) + '" data-status="locked" style="width: ' + 100 / site.doors.length + '%"><div class="sizer"></div><div class="sized"><h4>' + site.doors[i].name + '</h4><div class="door-door"><img src="/oddsquad/img/doors/' + site.doors[i].src + '-OPEN.png" class="door-open" /><img src="/oddsquad/img/doors/' + site.doors[i].src + '-CLOSED.png" class="door-closed" /></div></div><div class="award-lock"><img src="/oddsquad/img/doors/lock-locked.png" class="key-locked" /><img src="/oddsquad/img/doors/lock-unlocked.png" class="key-unlocked" /></div></li>');
	};
//'
	
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
	//console.log('UPDATE AGENT DASHBOARD');
	
		$('.agent-profile .photo .yespbs').attr('src', '/oddsquad/img/agents/' + agent.avatar );
		$('.agent-profile .badge.yespbs em').html(agent.code);
		$('.user-stats.awards-stats .accnt-tot').html(30);
		//$('.user-stats.awards-stats .accnt-tot').html(site.awards.length);
		//$('.user-stats.doors-stats .accnt-tot').html(site.doors.length);
	
	
	if ($('body').attr('data-agent-login') == 'false' || achievements.unlocked[0] == '' || achievements.unlocked[0] == null || achievements.unlocked[0] == undefined || achievements.unlocked.length == 0 || achievements.unlocked == null || achievements.unlocked == 'undefined' || achievements.unlocked == '') {
		
		//infoBox('dt', 'Achievements - total(0/' + site.awards.length + ')');
		$('.user-stats.awards-stats .accnt-rec').html(0);
		
	}
	
	if($('body').attr('data-agent-login') == 'false' || achievements.unlocked[0] == '' || achievements.unlocked[0] == null || achievements.unlocked[0] == undefined || achievements.unlocked.length == 0 || achievements.unlocked == null || achievements.unlocked == 'undefined' || achievements.unlocked == '') {
		$('.user-stats.awards-stats .accnt-rec').html(0);
	} else {
		$('.user-stats.awards-stats .accnt-rec').html(achievements.unlocked.length);
	}
	
	if($('body').attr('data-agent-login') == 'false') {
		
		$('.user-stats.doors-stats .accnt-rec').html(0);
	} else {
		$('.user-stats.doors-stats .accnt-rec').html(locker.unlocked.length);
		
	}
	
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
		$('[data-overlay]').removeClass('animate');
	});
	window[name].on('scrollEnd', function() {
		$('.'+scrollerElem+' > *:eq('+probeCurPage(name, itemWidth, this.x * -1, scrollerElem)+')').addClass('active');
		
		
		if($('.'+scrollerElem+' > *:eq('+probeCurPage(name, itemWidth, this.x * -1, scrollerElem)+')').attr('data-status') !== 'locked'){		
			$('[data-overlay]').addClass('animate');
		}
		//probeHighlightPage(scrollerElem, window[name].currentPage.pageX, 2)
		
	});
	window[name].on('scroll', function() {
		
		probeHighlightPage(scrollerElem, probeCurPage(name, itemWidth, this.x * -1, scrollerElem), 3);
		
			if(name == 'awardScroll') {
				
				var cleanGame = (site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].game).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
				
				$('[data-overlay="awards"] .banner span').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].name);
				$('[data-overlay="awards"] .award-desc').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].desc);
				$('[data-overlay="awards"] .award-game span').html(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].game);
				if(cleanGame == 'general'){
					
					$('.game-hex').replaceWith('<a href="/games/" data-genratrtarget onclick="closeOverlay(\'awards\'), pushUrl(\'/games/\', \'Games\', event)" class="game-hex"><img src="/oddsquad/img/hexagons/' + cleanGame + '-badge.png"></a>');
					
				} else {
					$('.game-hex').replaceWith('<a href="/oddsquad/games/' + cleanGame + '/" class="game-hex"><img src="/oddsquad/img/hexagons/' + cleanGame + '-badge.png"></a>');
				}

			// console.log(site.awards[probeCurPage(name, itemWidth, this.x * -1, scrollerElem)].name);
			
		}
	});
	
};
function gotoScroll(name, num, speed) {	
	$('[data-overlay]').removeClass('animate');
	
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
	//console.log('PUSH URL FIRED');
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
			/*
			$(this).width($(this).parent().width());
			$(this).height($(this).parent().height());
			*/
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
		calcBGSize();
		//setStageSize();
    }, 0);
	
});
function calcBGSize() {
	getWinSize();
	if(winSize.x < winSize.y) {
		$('body > .backgrounds img').css({
		   width : 'auto',
		   height : '100%'
		});
	} else if(winSize.x >= winSize.y) {
		$('body > .backgrounds img').css({
		   width : '100%',
		   height : 'auto'
		});
	}
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
};

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
	
	
	
	//only init video player when that page is hit.. this stops the auto play on playlist load
	if($('.pg-wrapper > section > article:eq(' + curStage + ')	').hasClass('pg-videos')){
		 if(player == undefined) {
			initVideoPlayer();
		 };
	}

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