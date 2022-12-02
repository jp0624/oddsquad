var dashboard_init = false,
	carouselItemCount = 3;

window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	$(document).find('body').removeClass('load');
},false);

window.onresize = function(event) {
	$('.dashboard-carousel').addClass('fadeOut');

	getWinSize();
	getOrientationOf('html');
	//$('.dashboard-carousel').slick('slickSetOption', 'centerMode', true, true);

	if(dashboard_init && agentInfoLoaded){
		positionFloor();
	};
};

$(document).on('USERAGENT_INFO_LOADED', function(){
		console.log('USER AGENT LOADED 1');
		getOrientationOf('html');
	if(agentInfoLoaded && dashboard_init){
		console.log('USER AGENT LOADED 2');
		positionFloor();
	};
});

$(document).on('DASHBOARD_INIT', function(){
		console.log('DASHBOARD INIT 1');
		getOrientationOf('html');
	if(agentInfoLoaded && dashboard_init){
		console.log('DASHBOARD INIT 2');
		positionFloor();
	};
});

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

	console.trace('Tracing here');
	console.log('carousel: ', carousel);
};

function loadDash(){
	console.log('Load Dashboard JS');
	//alert('Load Dashboard JS');

	if(dashboard_init === false){
		$('.dashboard-carousel').slick({
	  		speed: 300,
	  		cssEase: 'ease-in-out',
			centerMode: true,
			slidesToShow: 3,
			swipeToSlide: true,
			responsive: [
			    {
			      breakpoint: 68,
			      settings: {
			        slidesToShow: 1
			      }
			    }
			  ]
		});


		$('.dashboard-carousel').on('init', function(){

			positionFloor();
			dashboard_init = true;
			$(document).trigger('DASHBOARD_INIT');

			$('.dashboard-carousel').removeClass('fadeOut');
			//alert('DASHBOARD INIT');
			positionFloor();
			dashboard_init = true;
			$(document).trigger('DASHBOARD_INIT');
		});
		/*
		
		setTimeout(function(){
			positionFloor();
		}, 1000);
		*/
	
		$('.dashboard-carousel').on('reInit', function(){
			$('.dashboard-carousel').removeClass('fadeOut');
			//alert('DASHBOARD RE-INIT');
			if(dashboard_init){
				//positionFloor(details.$slides[0].clientHeight);
				positionFloor();
			};
		});
		$('.dashboard-carousel').on('setPosition', function(){
			
			var details = $('.dashboard-carousel').slick('getSlick');

			console.log('details: ', details);
			console.log('slide height: ', details.$slides[0].clientHeight);

			//positionFloor(details.$slides[0].clientHeight);
			positionFloor();

		});
	};
	


};

$(document).on('click', '.door', function(event){
	// look into further

	/*	if($(this).hasClass('slick-current')){
	} else{
		event.preventDefault();
	}
	*/
});

$(document).on('USERAGENT_INFO_LOADED', function(){
	$('.agent-profile .badge span em').html(userLogin[0].code);
	$('.agent-profile .photo .yespbs').attr('src', '/oddsquad/img/agents/' + userLogin[0].avatar);
});

$(document).on('LAYOUT_LANDSCAPE', function(){
	$('.dashboard-carousel').addClass('fadeOut');

	console.log('LAYOUT LANDSCAPE TRIGGER FIRED');
	//alert('landscape fired from page');

	carouselItemCount = 3;
	if(dashboard_init === true && agentInfoLoaded){
	//if(dashboard_init && site.layout == 'landscape'){
		//alert('landscape fired from page 2');
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 3, true);
	};
});

$(document).on('LAYOUT_PORTRAIT', function(){
	$('.dashboard-carousel').addClass('fadeOut');

	console.log('LAYOUT PORTRAIT TRIGGER FIRED');
	//alert('portrait fired from page');

	carouselItemCount = 1;
	if(dashboard_init === true && agentInfoLoaded){
		//alert('portrait fired from page 2');
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 1, true);
	};
});

$(document).on('DASHBOARD_INIT', function(){

	//alert('dashboard init fired from page');

	console.log('DASHBOARD INIT TRIGGER FIRED');
	
	if(dashboard_init && site.layout == 'landscape'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 3, true);
	};
	if(dashboard_init && site.layout == 'portrait'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 1, true);
 	};
 	
});