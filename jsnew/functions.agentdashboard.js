var dashboard_init = false,
	dashboard_created = false,
	carouselItemCount = 3;

window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	$(document).find('body').removeClass('load');
},false);

window.onresize = function(event) {
	getWinSize();
	getOrientationOf('html');

	positionFloor();
};


function positionFloor(itemCount){

	getWinSize();

	var navHeight = 80;
	
	var itemCount = carouselItemCount || false;

	if(!itemCount){
		if(winSize.x > 600){
			itemCount = 3;
		}else if(winSize.x <= 600){
			itemCount = 1;
		}
	}
	
	var carousel = {
		width: winSize.x - 100
	};

	carousel.itemWidth 	= carousel.width / itemCount;
	carousel.itemHeight = carousel.itemWidth * 1.555555555;
	carousel.top 		= (winSize.y / 2) - (carousel.itemHeight / 2) - navHeight;
	
	var ratio 			= 1.1211072664359861591695501730104;

	var floor = {
		top : carousel.itemWidth * ratio + carousel.top
	}

	if (itemCount == 1){

		$('.db-floor').css('top', (floor.top - 20) + 'px');
	} else if(itemCount == 3){
		if(winSize.x < 900){
			$('.db-floor').css('top', (floor.top - 20) + 'px');
		}else{
			$('.db-floor').css('top', floor.top + 'px');

		}
	}
};

function loadDash(){

	$('.dashboard-carousel').removeClass('fadeOut');

	if(dashboard_init){
		return
	};

	positionFloor();

	$('.dashboard-carousel').on('reInit', function(slick){
		$('.dashboard-carousel').removeClass('fadeOut');

		$(document).trigger('DASHBOARD_REINIT');

	});

	$('.dashboard-carousel').slick({
		//accessibility: false,
		centerMode: true,
		slidesToShow: 3,
		swipeToSlide: true
	});

	$('.dashboard-carousel').on('init', function(slick){
		//this doesnt fire
	});

	dashboard_init = true;
	$(document).trigger('DASHBOARD_INIT');
	console.log('Load Dashboard JS');
};


$(document).on('USERAGENT_INFO_LOADED', function(){
	$('.agent-profile .badge span em').html(userLogin[0].code);
	$('.agent-profile .photo .yespbs').attr('src', '/oddsquad/img/agents/' + userLogin[0].avatar);
});

$(document).on('LAYOUT_LANDSCAPE', function(){

	console.log('LAYOUT LANDSCAPE TRIGGER FIRED');
	setCarouselItems();
});

$(document).on('LAYOUT_PORTRAIT', function(){

	console.log('LAYOUT PORTRAIT TRIGGER FIRED');
	setCarouselItems();
});

$(document).on('DASHBOARD_INIT', function(){

	$('.dashboard-carousel').removeClass('fadeOut');
	console.log('DASHBOARD INIT TRIGGER FIRED');
	setCarouselItems(true);
 	
});

$(document).on('DASHBOARD_REINIT', function(){

	$('.dashboard-carousel').removeClass('fadeOut');

	console.log('DASHBOARD RE_INIT TRIGGER FIRED');
	positionFloor();
});

function setCarouselItems(init){
	if(!dashboard_init){
		return;
	};
	var carousel = $('.dashboard-carousel');
	if(init){
		console.log('cancel cause of init');

	 	if(site.layout === 'landscape'){
			carouselItemCount = 3;
			carousel.slick('slickSetOption', 'slidesToShow', 3, true);
			carousel.attr('data-layout', 'landscape');

		}else if(site.layout === 'portrait'){

			carouselItemCount = 1;
			carousel.slick('slickSetOption', 'slidesToShow', 1, true);
			carousel.attr('data-layout', 'portrait');
	 	};
		return;

	} else {
		console.log('SKIPPED cancel cause of init');

		if(carousel.attr('data-layout') === site.layout){
			console.log('PAGE LAYOUT MATCHES CAROUSEL');
			//console.warn('site.layout: ', site.layout)
			//console.warn('carousel.attr(data-layout): ', carousel.attr('data-layout'));
			return;
		};

		$('.dashboard-carousel').addClass('fadeOut');

		//carousel.attr('data-layout', 'landscape');
			console.log('PAGE DOESNT MATCHES CAROUSEL');
			console.log('site layout: ', site.layout);
			//console.warn('carousel.attr(data-layout): ', carousel.attr('data-layout'));

		if(site.layout === 'landscape'){

			console.log('SETTING CAROUSEL TO LANDSCAPE 3 items');
			carousel.attr('data-layout', 'landscape');
			carouselItemCount = 3;
			carousel.slick('slickSetOption', 'slidesToShow', 3, true);

		}else if(site.layout === 'portrait'){

			console.log('SETTING CAROUSEL TO PORTRAIT 1 item');
			carousel.attr('data-layout', 'portrait');
			carouselItemCount = 1;
			carousel.slick('slickSetOption', 'slidesToShow', 1, true);
	 	};
 	};
};

$(document).on('USERAGENT_INFO_LOADED', function(){
	console.log('USER AGENT LOADED IN AGENTDASH');
	getOrientationOf('html');
	/*
		if(agentInfoLoaded && dashboard_created){
			console.log('USER AGENT LOADED 2');
			positionFloor();
		};
	*/
});