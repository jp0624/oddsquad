
function probeCarousel(name) {
	var items			= window[name].pages.length,
		itemWidth		= window[name].pages[0][0].width,
		scrollerWidth	= window[name].scrollerWidth,
		scrollerElem	= $(window[name].scroller).attr('class');
	
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