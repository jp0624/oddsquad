
window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);


$(document).ready( function() {

	//startup the flowtype function
	$('body').flowtype({
		minimum   : 100,
		maximum   : 1500,
		fontRatio : 40
	});

	loadAwardRoom();
	/*
	loadDash();
	*/
});

function loadAwardRoom(){
	
	$('.awardroom-carousel').slick({
  		speed: 300,
  		cssEase: 'ease-in-out',
		centerMode: true,
		slidesToShow: 1,
		swipeToSlide: true
	});

};
function loadDash(){
	console.log('Load Dashboard JS');

	$('.dashboard-carousel').slick({
  		speed: 300,
  		cssEase: 'ease-in-out',
		centerMode: true,
		slidesToShow: 3,
		swipeToSlide: true,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 1
		      }
		    }
		  ]
	});
};