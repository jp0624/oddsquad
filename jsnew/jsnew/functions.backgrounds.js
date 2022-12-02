
// =======================================================
//              BACKGROUNDS SECTION LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var BackgroundsFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {

		calcBGSize();			// calculates background size based on winsize
		_this.documentEvents();	// setup dom element event listeners
		
	};
	
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {
		calcBGSize();			// calculates background size based on winsize
		
	};
	
	_this.documentEvents = function() {
		
	};
	
};
var backgroundsInstance = backgroundsInstance || new BackgroundsFunctions();



// =======================================================
//              BACKGROUNDS SECTION FUNCTIONS
// -------------------------------------------------------

function addBackground(bgImg) {
	console.log('addBackground(bgImg): ', bgImg);

	if(bgImg) {
		$('.backgrounds').append('<img src="/oddsquad/img/global/backgrounds/bg-' + bgImg + '.jpg" class="bgImg-' + bgImg + ' loadImg-' + bgImg + '">');
		$('img.loadImg-' + bgImg).load(function() {
			
			$('img.loadImg-' + bgImg).removeClass('img.loadImg-' + bgImg);
				
			$('html').removeClass(function (index, css) {
				return (css.match (/(^|\s)bgImg-\S+/g) || []).join(' ');
			});
			
			$('html').addClass('bgImg-' + bgImg);
			
		});
	};
};

function setBackground(event, self){
	if(event){
		event.preventDefault();
	};
	console.log('addBackground(bgImg): here 2');
	
	$(self).removeClass('active');
	
	var bgImg = $(self).attr('data-bgnum');

	if(bgImg) {
		$(self).addClass('active');
		agent.setBackground(bgImg);
		addBackground(bgImg);
	};
};


if($('.backgroudSelect').exists()) {

	backgroundScroll = new IScroll('.backgroudSelect', {
		snap: true,
		momentum: false,
		scrollX: true,
		scrollY: false,
		probeType: 3,
		tap: true	
	});
	
	backgroundScroll.on('scrollEnd', function() {
		$('.backgroudSelect').removeClass('scrollStart scrollEnd-desktop scrollEnd-mobile');
		$('footer').removeClass('scrollStart scrollEnd-desktop scrollEnd-mobile');

		if(this.currentPage.pageX == 0) {
			$('.backgroudSelect').addClass('scrollStart');
			$('footer').addClass('scrollStart');
			
		}else if(this.currentPage.pageX == 4) {
			$('.backgroudSelect').addClass('scrollEnd-desktop');
			$('footer').addClass('scrollEnd-desktop');
			
		}else if(this.currentPage.pageX == 9) {
			$('.backgroudSelect').addClass('scrollEnd-mobile');
			$('footer').addClass('scrollEnd-mobile');
		};
	});
};

function calcBGSize() {
	getWinSize();
	if(winSize.x < winSize.y) {
		$('.odd-wrapper > .backgrounds img').css({
		   width : 'auto',
		   height : '100%'
		});
	} else if(winSize.x >= winSize.y) {
		$('.odd-wrapper > .backgrounds img').css({
		   width : '100%',
		   height : 'auto'
		});
	};
};

// =======================================================
//              BACKGROUNDS SECTION LISTENERS
// -------------------------------------------------------
$(document).on('USERAGENT_INFO_LOADED', function() {
	addBackground(agent.background);
});
//$(document).on('click', '.set-background, .bgSelectWrapper li', setBackground(event, this));
$(document).on('click', '.set-background, .bgSelectWrapper li', function() {
	console.log('clicked this: ', this);
	setBackground(event, this)
});

$(document).on('click', 'footer .btn-close, .toggleBgSelect a, .clickShield', function toggleBGSelect(event) {
	event.preventDefault();
	$('footer').toggleClass('collapse');
});

//page and window specific listeners
$(document).ready(backgroundsInstance.documentReady);
$(window).resize(backgroundsInstance.documentResize);

