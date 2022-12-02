var startPage = 0,
	pageScroll,
	position,
	scrollPages = [],
	pageWidth = 0,
	scrollPagesQty,
	scrollEase = 'cubic-bezier(0.1, 0.57, 0.1, 1)',
	featuredAgents = [],
	userLogin = [];

//load
$(document).ready(function () {
	
	$('.hiddenKey').on('click', function() {
		 locker.add(3);
		 initOverlay('Locker Unlocked!', 'locker', 3);
	});
	prefix();
	
	setTimeout(function () {
		getWinSize();
		setStageSize();
		getPages(scrollPages);
		
		$('body').flowtype({
			minimum   : 500,
			maximum   : 1200,
			fontRatio : 30
		});

	}, 0);
	
	$('.info-box .toggle').on('click', function() {
		$(this).parent().toggleClass('collapse');
	});
	
	// ----------------------------------- AGENTS START -----------------------------------
	calcAgents();
		
	function calcAgents() {
		
		for (i = 0; i < site.agents.length; i++) {
			
			if(site.agents[i].featured == 'true') {
				
				featuredAgents.push({
					id: i
				});
			}
		};
		infoBox('dt', 'Featured Agents - Total(' + featuredAgents.length + '/' + site.agents.length + ')');
		
		for (i = 0; i < featuredAgents.length; i++) {
			infoBox('dd', 'Agent: ' + (featuredAgents[i].id + 1) + ' - ' + site.agents[featuredAgents[i].id].name);
		}
		
	};
	wallofagents();
	function wallofagents() {
		var container 		= $('.woa-wrapper section'),
			agentsPerPg		= 13,
			agentsTotal		= site.agents.length;
		
		for (g = 0; g < agentsTotal / agentsPerPg; g++) {
			$(container).append('<article class="agents-pg agents-pg-' + g + '"><ul class="agent-lst">');
			$(container).find('article.agents-pg-' + g).prepend('<ul class="agent-bgs">');
			
			for (i = 0; i < agentsPerPg && ((g * agentsPerPg) + i) < agentsTotal; i++) {
				
				var id = (g * agentsPerPg) + i;
				
				$(container).find('article.agents-pg-' + g + ' ul.agent-lst').append('<li class="agent-' + (i + 1) +'" data-agentid="' + id + '"><div class="img-wrap"><figure class="agent-hex agent-hex-1"><img src="' + site.agents[id].img1 + '" /></figure><figure class="agent-hex agent-hex-2"><img src="' + site.agents[id].img1 + '" /></figure><figure class="agent-hex agent-hex-3"><img src="' + site.agents[id].img1 + '" /></figure></div></li>');
				$(container).find('article.agents-pg-' + g + ' ul.agent-bgs').append('<li class="agent-' + (i + 1) +'" data-agentid="' + id + '"><div class="border-hex"><ins class="bg-hex bg-hex-1"></ins><ins class="bg-hex bg-hex-2"></ins><ins class="bg-hex bg-hex-3"></ins></div></li>');
				
				
			};
			
		};
		
		$('a.close-agent').on('click', function() {
			$('ul.agent-lst li[data-agentid]').removeClass('hide');
			$('.agent-details').removeClass('show');
		});
		
		$('.agents-pg figure').on('click', function() {
			$('ul.agent-lst li[data-agentid]').removeClass('hide');
			
			var aid = $(this).closest('li').attr('data-agentid');	
			
			var detailsContainer = $('.agent-details');
			$(detailsContainer).find('dt.name span').html(site.agents[aid].name);
			$(detailsContainer).find('dd.dept span').html(site.agents[aid].department);
			$(detailsContainer).find('dd.partner span').html(site.agents[aid].partner);
			$(detailsContainer).find('dd.accessory span').html(site.agents[aid].accessory);
			$(detailsContainer).find('dd.status span').html(site.agents[aid].status);
			$(detailsContainer).addClass('show');
			
			
			for (i = 0; i < agentsTotal; i++) {
				if(aid != i){
					$('ul.agent-lst li[data-agentid="' + i + '"]').addClass('hide');
				}
			};
				
		});
	};
	
	featureAgents();
	function featureAgents() {
		var container = $('.agents-section-wrapper-1 section')
		
		for (i = 0; i < featuredAgents.length; i++) {
			
			$(container).append('<article class="agent-' + i + '">');
			
			var thisAgentContainer 	= $('article.agent-' + i),
				thisAgent 			= site.agents[featuredAgents[i].id];
			
			$(thisAgentContainer).append('<figure><img src="' + thisAgent.img1 + '" /></figure>');
			$(thisAgentContainer).append('<dl class="agent-details">');
			
			var thisAgentDetailsContainer 	= $(thisAgentContainer).find('dl');
			
			$(thisAgentDetailsContainer).append('<dt class="name"><span>' + thisAgent.name + '</span></dt>');
			$(thisAgentDetailsContainer).append('<dt class="dept"><span>Department:</span></dt><dd class="dept"><span>' + thisAgent.department + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="partner"><span>Partner:</span></dt><dd class="partner"><span>' + thisAgent.partner + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="accessory"><span>' + thisAgent.accessory + ' Size:</span></dt><dd class="accessory"><span>' + thisAgent.accessorysize + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="status"><span>Status:</span></dt><dd class="status"><span>' + thisAgent.status + '</span></dd>');
			
		}
		
	}
	// ------- AGENTS END -------
		
	// ----------------------------------- ARCHIEVEMENT START -----------------------------------

	achievements.get(achievementsLoaded);
	function achievementsLoaded(a) {
		var i;
		
		if (achievements.achievements[0] == '') {
			infoBox('dt', 'Achievements - total(0/' + site.awards.length + ')');
			return
		} 
		
		infoBox('dt', 'Achievements - total(' + achievements.achievements.length + '/' + site.awards.length + ')');
		
		for (i = 0; i < achievements.achievements.length; i++) {
			$('[ data-achievement="' + achievements.achievements[i] + '"]').addClass('active');
			
			infoBox('dd', 'achievement: ' + parseInt(i + 1) + ' - ' + site.awards[i].name);
		}
		
	};
	// ------- ARCHIEVEMENT END -------
	
	// ----------------------------------- LOCKER START -----------------------------------
	locker.get(initLockers);
	function initLockers(data) {
		var i, n;
		
		if (data[0] == '') {
			infoBox('dt', 'Lockers - total(0/' + site.lockers.length + ')');
			return
		}
		
		infoBox('dt', 'Lockers - total(' + data.length + '/' + site.lockers.length + ')');
		
		for (i = 0; i < data.length; i++) {	
			
			$('[data-door="' + data[i] + '"]').addClass('active');
				
			infoBox('dd', 'locker: ' + (i + 1) + ' - ' + site.lockers[i].name);
		}
	};
	// ------- LOCKER END -------

	
	// ----------------------------------- LOGIN START -----------------------------------
	setTimeout(showIt, 10000);
			
	function showIt() {
		var o = agent.getInfo(gotInfo);
	}
	
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
		
		infoBox('dt', 'USER DETAILS');
		
		if(userLogin[0].isloggedin == true) {
			$('html').addClass('pbsUser-true');
			infoBox('dd', 'Logged-in as: ' + userLogin[0].username);
			
			if(userLogin[0].name == '') {
				$('html').addClass('oddUser-false');
			} else {
				$('html').addClass('oddUser-true');
				infoBox('dd', 'Agent: ' + userLogin[0].name + - + userLogin[0].code);
				
				$('.agentNum').html(userLogin[0].code);
			}
			
		}else if(userLogin[0].isloggedin == false) {
			$('html').addClass('oddUser-false');
			$('html').addClass('pbsUser-false');
			
			infoBox('dd', 'Not Logged-in');
			
		};
		
		$('html').addClass('userChecked');
	}
	
	$('.oddMem-signin').on('click', function() {
		console.log('clicked signin');
		$('#headband-sign-in').click();
	});
		
	// ------- LOGIN END -------
		
	
	$('.btn-close, .btn-complete').on('click', function(event) {
		event.preventDefault();
		clearGames();
		
		$(this).closest('[data-overlay]').removeClass('init-overlay');
	});
	
	
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
	
    $('[data-overlay-src]').on('click', function(event) {	
		event.preventDefault();
			
		var title	= $(this).attr('data-overlay-title'),
			type	= $(this).attr('data-overlay-type'),
			desc	= $(this).attr('data-overlay-desc') || undefined,
			img		= $(this).attr('data-overlay-desc') || undefined;
		
		initOverlay(title, type, desc, img);
		
	});
    setTimeout(function () {
		
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
			
		doorsScroll = new IScroll('.doors-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			scrollX: false,
			scrollY: true,
			probeType: 1
		});
		
		gameScroll = new IScroll('.game-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			scrollX: false,
			scrollY: true,
			probeType: 1
		});
			gameScroll.on('scrollStart', function() {
				clearGames();
			});
			
		agentsScroll = new IScroll('.agents-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			scrollX: false,
			scrollY: true,
			probeType: 1
		});
		
			
		agentsWall = new IScroll('.agents-section-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: false,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			disableTouch: true,
			disableMouse: true,
			probeType: 1
		});
		
		awardsScroll = new IScroll('.overlay .awards-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			scrollX: true,
			scrollY: false,
			probeType: 1
		});
		
		setStageStatus(0);
		
		
    }, 100);
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
	
});

//resize
$(window).resize( function () {
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
		detectIframe()
		getWinSize();
		calcHex();
		setStageSize();
        pageScroll.refresh();
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
function clearGames() {
	
	$('.game-wrapper iframe').each( function() {
		
		var name 	= $(this).closest('article').attr('data-title'),
			loading	= 'http://ernie.pbskids.org/oddsquad/alpha/games/' + name + '/index.html',
			src		= document.getElementById('game-' + name ).contentWindow.location.href;
			
		if(loading !== src) {
			$(this).attr('src', loading); 
		}
		
	});
	
	return false;
};

function initOverlay(title, type, value) {
	console.log('This overlay is firing');
	var title = title || undefined;
	$('.loading-hex').remove();	
		
	$('body').prepend('<div class="loading-hex init-hex-' + type + '"><h4>' + title + '</h4></div>');
	
    setTimeout(function () {
		$('.loading-hex').addClass('init-hex');
    }, 50);
	
	setTimeout(function () {
		$('.loading-hex').remove();
	}, 750);
	
	if(type == 'award' || type == 'locker' || type == 'alert') {
		dvalue = value - 1
		
		var container 	= $('.alert-wrapper'),
			myBtn		= $(container).find('.btn-close.btn-awards.btn-green');
					
		if(type == 'alert'){
			alert('overlay type needs to be set to either: award or locker');
			return;
		}else if(type == 'award'){
			infoBox('dt', 'Achievement Added: ' + value + ' - ' + site.awards[dvalue].name );
			$('[ data-achievement="' + value + '"]').addClass('active');
			
			$(container).find('h5').html("You've Earned A New Award!");
			$(container).find('figure img').attr('src', site.awards[dvalue].src);
			$(container).find('figure p').html(site.awards[dvalue].name);
			$(myBtn).find('span em').html('View All Awards');
			
			$(myBtn).attr('data-overlay-type', 'awards');
			$(myBtn).attr('data-overlay-title', 'My Awards');
			
		}else if(type == 'locker'){
			infoBox('dt', 'Locker Unlocked: ' + value + ' - ' + site.lockers[dvalue].name );
			$('[ data-door="' + value + '"]').addClass('active');
			
			$(container).find('h5').html("You've Unlocked A New Door!");
			$(container).find('figure img').attr('src', site.lockers[dvalue].src);
			$(container).find('figure p').html(site.lockers[dvalue].name);
			$(myBtn).find('span em').html('View All Doors');
			
			$(myBtn).attr('data-overlay-type', 'doors');
			$(myBtn).attr('data-overlay-title', 'My Doors');
			
			
		}
		$('[data-overlay="alert"]').addClass('init-overlay');
		return;
	};
	
	$('[data-overlay="' + type + '"]').addClass('init-overlay');
		
}

function detectIframe() {
	if($('iframe').length > 0) {
		var video = {
				x: 1024,
				y: 768
		},
		ratio = 100 / video.x
	}
}

function sizeIframe(ratio) {
	if(winSize.x > winSize.y) {
	}
	var videoWrapper = {
			x: $('.game-wrapper').width(),
			y: $('.game-wrapper').height()
	}
	
	var onePerx	= videoWrapper.x / 100,
		onePery	= videoWrapper.y / 100,
		margin = {
			// percentage based
			x: 15,
			y: 2
		};
	
	$('iframe').width(videoWrapper.x - (onePerx * (margin.x * 2))).height(videoWrapper.y - (onePery * (margin.y * 2 + 7)));
	
	$('.iframe-wrapper').css('margin-left', '-' + (videoWrapper.x - (onePerx * (margin.x * 2))) / 2 + 'px');
	$('.iframe-wrapper').css('margin-top', '-' + (videoWrapper.y - (onePery * (margin.y * 2 + 5))) / 2 + 'px');
	
}
function destroyOverlay() {
	$('[data-overlay]').remove();
	$('.loading-hex').remove();
};

function setStageSize() {
	$('.pg-wrapper > section > article').width(winSize.x);
	$('.pg-wrapper > section > article').height(winSize.y);
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
		pageScroll.dir = '-1'
	}else if(startPage < newPage || (curPosi * (-1)) > startPosi) {
		pageScroll.dir = '1'
	//}else if (startPage == newPage) {
	}else {
		pageScroll.dir = '0'
	}
	
	pageScroll.dif = Math.abs(startPosi + curPosi)
	
	setStageStatus(newPage);
};
function setStageStatus(newPage) {
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
function gotoGame(game, event) {
	event.preventDefault();
	event.stopPropagation();
		
	var transition = 500;
	clearGames();
		
	if(game == 'next'){
		gameScroll.goToPage(0, (gameScroll.currentPage.pageY + 1), transition);
		return;
	} else if(game == 'prev') {
		gameScroll.goToPage(0, (gameScroll.currentPage.pageY - 1), transition);
		return;
	}
	gameScroll.goToPage(0, game, transition);
	
};
function gotoAgent(slide, event) {
	event.preventDefault();
	event.stopPropagation();
	
	var speed = 1000;
	if(slide == 'next'){
		agentsWall.goToPage((agentsWall.currentPage.pageX + 1), 0, speed);
		return;
	} else if(slide == 'prev') {
		agentsWall.goToPage((agentsWall.currentPage.pageX - 1), 0, speed);
		return;
	}
	agentsWall.goToPage(slide, 0, speed);
	
};
function gotoDoor(slide, event) {
	event.preventDefault();
	event.stopPropagation();
	
	var speed = 1000;
	if(slide == 'next'){
		console.log('scroll! ', doorsScroll.currentPage.pageX);
		doorsScroll.goToPage(0, (doorsScroll.currentPage.pageX + 1), speed);
		return;
	} else if(slide == 'prev') {
		doorsScroll.goToPage(0, (doorsScroll.currentPage.pageX - 1), speed);
		return;
	}
	doorsScroll.goToPage(0, slide, speed);
	
};
function gotoAwards(slide, event) {
	event.preventDefault();
	event.stopPropagation();
	
	var speed = 1000;
	if(slide == 'next'){
		awardsScroll.goToPage((awardsScroll.currentPage.pageX + 1), 0, speed);
		return;
	} else if(slide == 'prev') {
		awardsScroll.goToPage((awardsScroll.currentPage.pageX - 1), 0, speed);
		return;
	}
	awardsScroll.goToPage(slide, 0, speed);
	
};
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

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions || repetitions == 0) {
           window.clearInterval(intervalID);
       }
    }, delay);
}
	
function infoBox(type, info) {
	$('.info-box dl').append('<' + type + '>' + info + '</' + type + '>');
}

function animateBG(elem, direction, frames, cycles, delay, interval) {
	var containerW		= $(elem).width(),
		containerH		= $(elem).height(),
		sizePer			= 100 / frames;
		
	countInt	= 0;	
	setIntervalX(function () {
		countInt++
		var i = 0;
		
		bgLoop();
		 
		function bgLoop() {
			
		   setTimeout(function () {
			  console.log('gogo gadget4');
			  
			  console.log('size per', (sizePer * i));
			  console.log($(elem).css('background-position'));
			  var 	str		= $(elem).css('background-position'),
			  		str 	= str.replace('px', ''),
			  		str 	= str.replace('%', ''),
			  		str 	= str.split(' ');
					bgPosi	= {
						x: parseInt(str[0]),
						y: str[1]
					}
			console.log('bgPosi.x: ', bgPosi.x+ (sizePer * i));
			console.log('bgPosi: ', bgPosi);
			  
			  i++;
			  if (i < frames) {
				 
			  	$(elem).css('background-position', '-' + (bgPosi.x + (containerW * i)) + 'px 0px');
				 bgLoop();
				 
			  } else {
			  	$(elem).css('background-position', '0px 0px');
				  //reset img position
			  }
		   }, 50)
		}
		
	}, delay, 1);
	
}

// repsonsive font sizing
(function($) {
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
}(jQuery));