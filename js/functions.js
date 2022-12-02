//test
var debug = {
	_display:	$('html').hasClass('debug-js'),
	_load:		true,
	_resize:	true,
	_scroll: 	true,
	_mouse: 	false
};

var startPage = 0,
	pageScroll,
	position,
	scrollPages = [],
	pageWidth = 0,
	scrollPagesQty,
	scrollEase = 'cubic-bezier(0.1, 0.57, 0.1, 1)',
	featuredAgents = [];

	
//load
$(document).ready(function () {
	
	prefix();
	
	
	setTimeout(function () {
		getWinSize();
		setStageSize();
		getPages(scrollPages);
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
	featureAgents();
	function featureAgents() {
		var container = $('.agents-section-wrapper-1 section')
		
		
		for (i = 0; i < featuredAgents.length; i++) {
			
			$(container).append('<article class="agent-' + i + '">');
			
			var thisAgentContainer 	= $('article.agent-' + i),
				thisAgent 			= site.agents[featuredAgents[i].id];
			
			$(thisAgentContainer).append('<dl class="agent-details">');
			
			var thisAgentDetailsContainer 	= $(thisAgentContainer).find('dl');
			
			
			$(thisAgentDetailsContainer).append('<dt class="name"><span>' + thisAgent.name + '</span></dt>');
			
			$(thisAgentDetailsContainer).append('<dt class="dept"><span>Department:</span></dt><dd><span>' + thisAgent.department + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="dept"><span>Partner:</span></dt><dd><span>' + thisAgent.partner + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="dept"><span>' + thisAgent.accessory + ' Size:</span></dt><dd><span>' + thisAgent.accessorysize + '</span></dd>');
			$(thisAgentDetailsContainer).append('<dt class="dept"><span>Status:</span></dt><dd><span>' + thisAgent.status + '</span></dd>');
			
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
			$('[data-achievment="' + achievements.achievements[i] + '"]').addClass('active');
			
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
			infoBox('dd', 'locker: ' + (i + 1) + ' - ' + site.lockers[i].name);
		}
	};
	
	
	/*
	var key = locker.addKey(($(document).width() - 150) * Math.random(), ($(document).height() - 300) * Math.random() + 220, 1 + Math.floor(Math.random() * 12));
	key.addEventListener("click", function() {
		setTimeout(function(){ 
			location.reload();
		}, 500);
	});
	*/
	
	// ------- LOCKER END -------

	
	// ----------------------------------- LOGIN START -----------------------------------
	
	checkLogin();
	function checkLogin() {
		infoBox('dt', 'USER DETAILS');
		
		if(locker.loggedIn() == true) {
			infoBox('dd', 'Logged-in as: ' + locker.username());
			
		}else if(locker.loggedIn() == false) {
			infoBox('dd', 'Not Logged-in');
			
		};
		
	};
		
	console.log('achievements.loggedIn() ?: ', achievements.loggedIn());
	console.log('achievements.username() ?: ', achievements.username());
	
	console.log('locker.loggedIn() ?: ', locker.loggedIn());
	console.log('locker.username() ?: ', locker.username());
		
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
			//mouseWheel: true,
			//scrollbars: true,
			//interactiveScrollbars: true,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			//directionLockThreshold: 10,
			//preventDefault: false,
			//probe type 1 & 2 seem to be fine, 3 seems to glitch mid stage at times need to disable movement until completed
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
				/*
				setStartPage(this.currentPage.pageX);
				getScrollingStatus(this.currentPage.pageX);
				*/
				getScrollingStatus(this.currentPage.pageX, this.x);
				
				$('html').addClass('scroll-done');
				//gotoStage(this.currentPage.pageX);
				$('.scrollNav, .pageNav').removeClass('disabled');
			});
			pageScroll.on('scroll', function() {
				//$('.scrollNav, .pageNav').addClass('disabled');
				getScrollingStatus(this.currentPage.pageX, this.x);
				updateLaxPosi();
				
				/*
				console.log('DURING SCROLL - POSITION: ', this.x);
				console.log('DURING SCROLL - CURRENT PAGE: ', this.currentPage);
				*/
			});
			
		gameScroll = new IScroll('.game-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			//scrollbars: true,
			//interactiveScrollbars: true,
			//eventPassthrough: true,
			scrollX: false,
			scrollY: true,
			//preventDefault: false,
			//probe type 1 & 2 seem to be fine, 3 seems to glitch mid stage at times
			probeType: 1
		});
			gameScroll.on('scrollStart', function() {
				clearGames();
			});
			
		agentsScroll = new IScroll('.agents-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			//scrollbars: true,
			//interactiveScrollbars: true,
			//eventPassthrough: true,
			scrollX: false,
			scrollY: true,
			//preventDefault: false,
			//probe type 1 & 2 seem to be fine, 3 seems to glitch mid stage at times
			probeType: 1
		});
		
			
		agentsWall = new IScroll('.agents-section-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: false,
			//scrollbars: true,
			//interactiveScrollbars: true,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			disableTouch: true,
			disableMouse: true,
			//preventDefault: false,
			//probe type 1 & 2 seem to be fine, 3 seems to glitch mid stage at times
			probeType: 1
		});
		
		awardsScroll = new IScroll('.overlay .awards-wrapper', {
			snap: true,
			momentum: false,
			mouseWheel: true,
			//scrollbars: true,
			//interactiveScrollbars: true,
			//eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			//preventDefault: false,
			//probe type 1 & 2 seem to be fine, 3 seems to glitch mid stage at times
			probeType: 1
		});
		
		setStageStatus(0);
		
		
    }, 100);
	$('.bg-slider li').each( function() {
		var ranMin = 0,
			ranMax = 3,
			random = Math.floor(Math.random() * (ranMax - ranMin + 1)) + ranMin;
			
			$(this).attr('data-value', random);
			
		$(this).slider({
			orientation: "vertical",
			value: random,
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
	
if(debug._display === true && debug._load === true){globalConsole()};
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
	
if(debug._display === true && debug._resize === true){globalConsole()};
});

//scroll
$(document).scroll( function(){
	
if(debug._display === true && debug._scroll === true){globalConsole()};
});

$(document).mousemove(function(event){

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
				//alert(bgNum);
}
function clearGames() {
	/*
	$('.game-wrapper iframe').each( function() {
		
		var name 	= $(this).closest('article').attr('data-title'),
			loading	= 'http://ernie.pbskids.org/oddsquad/alpha/games/' + name + '/index.html',
			//needs to be same domain to avoid cross domain issue
			src		= document.getElementById('game-' + name ).contentWindow.location.href;
			
		console.log('iframe name:', name);
		console.log('iframe src:', src);
		console.log('iframe loading:', loading);
		if(loading !== src) {
			$(this).attr('src', loading); 
		}
		
	});
	*/ 
	return false;
};
/*
function calcHex() {
	$('.hex').remove();
	
	var hex = {
			size: 60,
			spacing: 4
		};
	
	$('.hexbg').each( function() {
		var	hexStage = {
				x: $(this).width(),
				y: $(this).height()	
		}
		
		hexStage.cols = Math.ceil((hexStage.x / (hex.size + (hex.spacing * 2))) + 2);
		hexStage.rows = Math.ceil((hexStage.y / (hex.size + (hex.spacing * 2))) * 2) + 2;
		
		var direction = $(this).attr('data-startFrom') || 'top';
		
		drawHexs(hexStage.rows, this, direction, hex.size, hexStage.cols);
		
	});
	
}

function isEven(value) {
	return (value%2 == 0);
}
function drawHexs(qty, elem, direction, size, cols) {
	for (var ri = 0; ri < qty; ri++) {
		
		var evenodd = isEven(ri) === true ? 'even' : 'odd';
		
		if(direction == 'top') {
			var hexOffset = ri * 31.5 - 30;
		} else {
			var hexOffset = ri * 31.5 + 30;
		}
		
		for (var i = 0; i < cols; i++) {
			$(elem).append('<span class="hex ' + evenodd + '" style="' + direction + ': ' + hexOffset + 'px; left: ' + (i * (size + (size / 2) + 20)) + 'px"><em></em></span>');
		}
		
		//'$(elem).prepend('<ul class="hexRow hexRow-' + i + ' " style="' + direction + ': ' + hexOffset + 'px" ></ul>');
	}
}
*/
function initOverlay(title, type, value) {
	console.log('this one is firing');
	var title = title || undefined;
	
	if(type == 'award' || type == 'locker' || type == 'alert') {
		return;
	}
	
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
		if(type == 'alert'){
			alert('overlay type needs to be set to either: award or locker');
			return;
		}else if(type == 'award'){
			infoBox('dt', 'Achievement Added: ' + value + ' - ' + site.awards[dvalue].name );
			
		}else if(type == 'locker'){
			infoBox('dt', 'Locker Unlocked: ' + value + ' - ' + site.lockers[dvalue].name );
		}
		$('[data-overlay="alert"]').addClass('init-overlay');
		return;
	};
	
	
	$('[data-overlay="' + type + '"]').addClass('init-overlay');
		
}
function loadIframe(iframeName, url) {
	/*
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
	*/
}
function detectIframe() {
	if($('iframe').length > 0) {
		var video = {
				x: 1024,
				y: 768
		},
		ratio = 100 / video.x

		//console.log('ratio: ', ratio);
		//0.09765625
		//winSize.y & winSize.x is already pulled
		//sizeIframe(ratio);
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
	
	/*
	console.log('winsize X: ', winSize.x);
	console.log('one percnt: ', winSize.x / 100);
	console.log('iframe width: ', winSize.x - (onePerx * 4));
	*/
	
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

function updateLaxPosi() {
	
	// scroll difference:	pageScroll.dif
	// scroll direction: 	pageScroll.dir
	
	/*
	var cssProp = {};
		cssProp['transition']	= prefix.css + 'transform' + ' ' + '0' + 'ms ' + 'ease-in-out';
			
	$('[data-lax]').each( function() {
		var depth	= $(this).attr('data-depth'),
			change	= pageScroll.dif / depth;
			
			$(this).css(cssProp);
			translate($(this), change, undefined, undefined);
	});
	*/

};

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
		//pageScroll.goToPage(pageScroll.next(), 0, 500);
		return;
	} else if(stage == 'prev') {
		pageScroll.goToPage((pageScroll.currentPage.pageX - 1), 0, speed);
		//pageScroll.goToPage(pageScroll.prev(), 0, 500);
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

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}
	
function infoBox(type, info) {
	$('.info-box dl').append('<' + type + '>' + info + '</' + type + '>');
}
// This will be repeated every for 5 times with 1 second intervals:
/*
setIntervalX(function () {

}, 1000, 5);
*/