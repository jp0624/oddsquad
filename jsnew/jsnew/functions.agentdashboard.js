var dashboard_init = false;

window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);

window.onresize = function(event) {
	getWinSize();
	getOrientationOf('html');
	//$('.dashboard-carousel').slick('slickSetOption', 'centerMode', true, true);

	if(dashboard_init){
		positionFloor();
	};
};

function positionFloor(clientHeight){
	var caroDetails = $('.dashboard-carousel').slick('getSlick');

	var caro 		= $('.dashboard-carousel');
	var caroPosi 	= caro.position();
		caroPosi	= caroPosi.top;

	var caroItem		= caro.find('.agent-profile');
	var caroItemWidth 	= caroDetails.$slides[0].clientWidth; // || caroItem.width();
	var caroItemHeight 	= caroDetails.$slides[0].clientHeight;
	//var caroItemHeight 	= clientHeight || caroDetails.$slides[0].clientHeight; //caroItem.height();

	var wrapper 		= $('.agentdashboard-wrapper');
	var wrapperHeight	= wrapper.height();
	var wrapperWidth	= wrapper.width();
	var ratio 			= 1.1211072664359861591695501730104;

	//if(caroItemHeight > wrapperHeight){
	if(caroItemHeight > (winSize.y - 40)){
		console.warn('CAROUSEL IS BIGGER THAN WINDOW');
		var caroPosi = 0;

		wrapper.css('height', caroItemHeight + 'px');
		$('.agentdashboard').addClass('heightSet');

		var topPosition 	= caroItemWidth * ratio + caroPosi;
		$('.db-floor').css('top', (topPosition - 40) + 'px');

	} else {

		console.warn('CAROUSEL IS SMALLER THAN WINDOW');

		wrapper.css('height', (winSize.y - 80) + 'px');
		//wrapper.css('height', 'calc(100% - 80px)');
		$('.agentdashboard').removeClass('heightSet');

		var topPosition 	= caroItemWidth * ratio + caroPosi;
		$('.db-floor').css('top', topPosition + 'px');

	};

	console.log('=======================');
	console.log('caroPosi: ', caroPosi);
	console.log('caroItemWidth: ', caroItemWidth);
	console.log('caroItemHeight: ', caroItemHeight);
	console.log('topPosition: ', topPosition);
	
};

function loadDash(){
	console.log('Load Dashboard JS');
	//alert('Load Dashboard JS');

	if(dashboard_init === false){
	};
		$('.dashboard-carousel').slick({
	  		speed: 300,
	  		cssEase: 'ease-in-out',
			centerMode: true,
			focusOnSelect: true,
			slidesToShow: 3,
			swipeToSlide: true,
			responsive: [
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1
			      }
			    }
			  ]
		});

		$('.dashboard-carousel').on('init', function(){
			//alert('DASHBOARD INIT');
			positionFloor();
			dashboard_init = true;
			$(document).trigger('DASHBOARD_INIT');
		});
		setTimeout(function(){
			positionFloor();
		}, 1000);

		$('.dashboard-carousel').on('reInit', function(){
			//alert('DASHBOARD RE-INIT');
			if(dashboard_init){
				positionFloor();
			};
		});
		$('.dashboard-carousel').on('setPosition', function(){
			
			var details = $('.dashboard-carousel').slick('getSlick');

			console.warn('details: ', details);
			console.warn('slide height: ', details.$slides[0].clientHeight);

			positionFloor(details.$slides[0].clientHeight);

		});
	


};

$(document).on('click', '.door', function(event){
	// look into further
	if($(this).hasClass('slick-current')){

	} else{
		event.preventDefault();
	}
});

$(document).on('USERAGENT_INFO_LOADED', function(){
	$('.agent-profile .badge span em').html(userLogin[0].code);
	$('.agent-profile .photo .yespbs').attr('src', '/oddsquad/img/agents/' + userLogin[0].avatar);
});

$(document).on('LAYOUT_LANDSCAPE', function(){
	console.warn('LAYOUT LANDSCAPE TRIGGER FIRED');

	if(dashboard_init && site.layout == 'landscape'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 3, true);
	};
});

$(document).on('LAYOUT_PORTRAIT', function(){
	console.warn('LAYOUT PORTRAIT TRIGGER FIRED');
	//alert('portrait fired from page');

	if(dashboard_init && site.layout == 'landscape'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 1, true);
	};
});

$(document).on('DASHBOARD_INIT', function(){

	//alert('dashboard init fired from page');

	console.warn('DASHBOARD INIT TRIGGER FIRED');
	
	if(dashboard_init && site.layout == 'landscape'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 3, true);
	};
	if(dashboard_init && site.layout == 'portrait'){
		$('.dashboard-carousel').slick('slickSetOption', 'slidesToShow', 1, true);
 	};
 	
});