//
// global variables to use for the funtions storage
//
var bganim8 = [];
var myObj = {};

$(document).ready(function () {
	
	//start the script
	bganim8er();
	$('.classified-block .btn-skip').on('click', function() {
		$('.classified-wrapper').remove();
	});
	
});

$(window).resize(function(){
	
	//clear active bganim8 intervals
	for (i = 0; i < bganim8.length; i++) {
		//clear the interval to restart.. seems to be be stacking
		clearInterval(bganim8[i].interval);
	};
	//clear active bganim8 array
	bganim8 = [];
	//start the script again
	bganim8er();
});

//
//this functions calculates all the bg's to animate inits the other functions
//
function bganim8er() {
	var anim8Tot = $('[data-bganim8]').length;	
	for (i = 0; i < anim8Tot; i++) {
		bganim8Get($('[data-bganim8]:eq(' + i + ')'), i);
	};
	bganim8Go();
}

//
//this functions calculates sets all the bg's to animate in an array with their animation attributes
//
function bganim8Get(self, id) {
	bganim8.push({
		self:			$(self),
		height:			$(self).height(),
		width:			$(self).width(),
		fps:			$(self).data('bganim8-fps'),
		frames:			$(self).data('bganim8-frames'),
		start:			$(self).data('bganim8-start'),
		direction:		$(self).data('bganim8-direction')
	});
	
	bganim8[id].delta = bganim8[i].direction == 'right' ? -1 : bganim8[i].direction == 'down' ? -1 : bganim8[i].direction == 'up' ? 1 : bganim8[i].direction == 'left' ? 1 : 0,
	bganim8[id].x = bganim8[i].direction == 'right' ? bganim8[i].width * bganim8[i].frames : bganim8[i].direction == 'left' ? bganim8[i].width * bganim8[i].frames : 0;
	bganim8[id].y = bganim8[i].direction == 'down' ? bganim8[i].height * bganim8[i].frames : bganim8[i].direction == 'up' ? bganim8[i].height * bganim8[i].frames : 0;
	
};

//
//this functions determines which direction and starts the animation process
//
function bganim8Go() {
	
	console.log('bganim8.length: ', bganim8.length);
	
	for (i = 0; i < bganim8.length; i++) {
		var self = $('[data-bganim8]:nth(' + i + ')');
		
		if(bganim8[i].x !== 0) {
			$(self).css('background-position', bganim8[i].start * bganim8[i].width * bganim8[i].delta + 'px 0px');
			$(self).css('background-size', bganim8[i].frames * bganim8[i].width + 'px auto');
		} else if(bganim8[i].y !== 0) {
			$(self).css('background-position', '0px ' + bganim8[i].start * bganim8[i].width * bganim8[i].delta + 'px');
		} else {
			console.log('number of frames is not greater then the size');
		}	
		bganim8Init(self, i);
	}
}

//
// this functions is the actual animation
//
function bganim8Init(self, id) {
	//var self =  $('[data-bganim8]:eq(' + id + ')');
	
	bganim8[id].interval = setInterval(function() {
		
		//console.log($(self).css('background-position'));
		
		var bgPosi = $(self).css('background-position').split(' ');
		var xPos = parseInt(bgPosi[0]),
			yPos = bgPosi[1];
		
		//need to change this to go back to 0 when greater then frames * width in the direction it's moving
		$(self).css('background-position', (xPos - bganim8[id].width) + 'px 0px');
			
		
	}, 1000 / bganim8[i].fps);
	//}, bganim8[i].fps / bganim8[i].frames);
	//}, bganim8[id].speed );

}