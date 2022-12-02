
var wsite = wsite || [];

// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------


window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);


$(document).on('org_pbskids_parentsbar_HeadbandEvent_HeadbandReady', function(event) {

	setTimeout(function(){
	    $('body').addClass('openLoad');
				initPageLoad();

		setTimeout(function(){
			$('[data-overlay="loader"]').remove();
		}, 2250	);
	}, 500	);
	
});

//page and window specific listeners
$(document).ready(globalInstance.documentReady());
$(document).ready( function() {
	
	if($('[data-overlay="loader"]').length > 0){
		createLoader();	
	}

	$(document).on('click', '[data-overlay="loader"] .main-logo', function(){
		$('body').addClass('openLoad');
			initPageLoad();

		setTimeout(function(){
			$('[data-overlay="loader"]').remove();
		}, 2250	);
	
	})
});

$(window).resize( function(){
	getWinSize();
	rePositionPanels();
	sizeLogo();
});

$(window).resize(globalInstance.documentResize());

function createLoader() {
	wsite.loader = [];
	wsite.loaderScale = false;
	detectPanels('[data-overlay="loader"]', '.panel');

};

function detectPanels(container, panel){
	var cont 		= $(container),
		pan 		= $(panel),
		scaleup		= false;
		scaledown	= false;

	var panels = countInContainer(container, panel);


	for(var i=0; i < panels; i++) {
		var item = findInContainer(container, panel, i);
		var panelInfo = attrSettings(item, 'data-panel');

		wsite.loader.push(panelInfo);

		sizePanel(wsite.loader[i]);
		

		wsite.loader[i].regheight =  wsite.loader[i].nheight * wsite.loader[i].regy * 0.01;
		wsite.loader[i].regwidth =  wsite.loader[i].nwidth * wsite.loader[i].regx * 0.01;

		positionPanel(wsite.loader[i])
	};
		sizeLogo();

};

function sizePanel(panel){

	// change this to a detection size for responsivness
	// sizePanel() to replace this.
	if(panel.width < (winSize.x /2) && wsite.loaderScale !== 'down'){
		wsite.loaderScale = 'up';
		var ratio = 100 / panel.width * panel.height * 0.01;

		console.log('ratio: ', ratio)
		panel.nwidth = winSize.x / 1.9;

		panel.nheight = panel.nwidth * ratio;

	} else if(panel.title = 'bottom-panel' && wsite.loaderScale == 'up'){

		var ratio = 100 / panel.width * panel.height * 0.01;

		console.log('ratio: ', ratio)
		panel.nwidth = winSize.x / 1.9 * 2;

		panel.nheight = panel.nwidth * ratio;


	}else {
		panel.nheight = panel.height;
		panel.nwidth = panel.width;

	};

	$(panel.elem).css({
		'width' : panel.nwidth,
		'height' : panel.nheight
	});
};


function sizeLogo(){

	var logoInfo = attrSettings('.panel-mid', 'data-info');
	var ratio = 100 / logoInfo.width * logoInfo.height * 0.01;
	var conW = $('[data-overlay="loader"] .main-logo').parent().width();

	if(logoInfo.width > winSize.x * 0.8){
		$('.panel-mid').width(winSize.x * 0.5);
		$('[data-overlay="loader"] .main-logo').width(winSize.x * 0.5);

	} else {
		$('.panel-mid').width(logoInfo.width);
		$('[data-overlay="loader"] .main-logo').width(logoInfo.width);
	};

	$('.panel-mid').height($('.panel-mid').width() * ratio);
	$('[data-overlay="loader"] .main-logo').height($('[data-overlay="loader"] .main-logo').width() * ratio);
	
	$('.panel-mid').css({
		top: $('.panel-mid').height() / 2 * (-1) + 23,
		left: (conW / 2) - ($('.panel-mid').width() / 2)
	});

	$('[data-overlay="loader"] .main-logo').css({
		top: $('[data-overlay="loader"] .main-logo').height() / 2 * (-1) + 23,
		left: (conW / 2) - ($('[data-overlay="loader"] .main-logo').width() / 2)
	});

}
function rePositionPanels(){
	var panels = wsite.loader.length

	for(var i=0; i < panels; i++) {
		positionPanel(wsite.loader[i])
	}
}
function positionPanel(panel){

	var left = winSize.x / 2 - panel.regwidth;
	var top = winSize.y / 2 - panel.regheight;

	$(panel.elem).css({
		'left' : left,
		'top' : top
	});


};