// <= ie9 html5 poly fill refresh & removal of /#/
var url = window.location.href;
var hashExist = url.search(new RegExp('#/', 'i'));

if(hashExist >= 0) {
	
	//need to relook at...
	url = url.replace('#/', '');
	url = url.replace('index.html', '');
	window.location.replace(url);
}

if(params !== undefined) {
	//console.log('PARAMS DETECTED NOW FIRING SET URL FUNC');
	genratrSetURL(params[1].dir, '', true)
};

setTimeout(function () {
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
	
	
	pageScroll.on({
		'scrollStart'	:  pageScrollStart(this),
		'scrollEnd'		:  pageScrollEnd(this),
		'scroll'		:  pageScroll(this)
	});
	
	function pageScrollStart(self) {
		$('html').addClass('grabbing');
		$('.scrollNav, .pageNav').addClass('disabled');
		
		setStartPage(self.currentPage.pageX);
		
		getScrollingStatus(self.currentPage.pageX);
		$('html').removeClass('scroll-done');
	};
	
	function pageScrollEnd(self) {
		$('html').removeClass('grabbing');
		getScrollingStatus(self.currentPage.pageX, self.x);
		
		$('html').addClass('scroll-done');
		$('.scrollNav, .pageNav').removeClass('disabled');
	};
	
	function pageScroll(self) {
		getScrollingStatus(self.currentPage.pageX, self.x);
	};
	
	setStageStatus(0);

}, 100);