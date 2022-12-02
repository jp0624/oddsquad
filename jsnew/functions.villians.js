var	villansCreated = false;

$(document).on ({
	"VILLIANS_CREATED" : function(event) {

	}
});

	
if($('.villans-lst').exists()){
	$.getJSON('/oddsquad/json/villans.json', function(data) {
		site.villans = data.villans;		
	})
	.success( function() {
		buildVillans();
	})
	.error( function(jqXHR, textStatus, errorThrown) {
		console.log('getJSON error: ', textStatus);
		console.log('getJSON errorThrown: ', errorThrown);
		console.log('arguments: ', arguments);
		console.log("getJSON incoming Text " + jqXHR.responseText);
	})
	.complete( function() {
		
	});
};
	
	
function buildVillans() {
	var container 		= $('.villans-wrapper'),
		villansPerPg		= 13,
		villansTotal		= site.villans.length;
	
	
		for (i = 0; i < villansTotal; i++) {
			
			$(container).find('ul.villans-lst.disp-desktop').append('<li class="villan-' + (i + 1) +'" data-villanid="' + i + '"><div class="sizer"></div><div class="img-wrap sized"><figure class="villan-hex villan-hex-1"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/hod/villans/' + site.villans[i].img1 + '" /></div></figure><figure class="villan-hex villan-hex-2"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/hod/villans/' + site.villans[i].img1 + '" /></div></figure><figure class="villan-hex villan-hex-3"><div class="sizer"></div><div class="sized"><img src="/oddsquad/img/agents/hod/villans/' + site.villans[i].img1 + '" /></div></figure></div></li>');
		
			$(container).find('ul.villans-bgs.disp-desktop').append('<li class="villan-' + (i + 1) +'"><div class="sizer"></div><div class="border-hex sized"><div class="bg-hex bg-hex-1"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-2"><div class="sizer"></div><div class="sized"><span></span></div></div><div class="bg-hex bg-hex-3"><div class="sizer"></div><div class="sized"><span></span></div></div></div></li>');
			
			$(container).find('ul.villans-lst.disp-mobile').append('<li class="villan-' + (i + 1) +'" data-villanid="' + i + '"><figure><img src="/oddsquad/img/agents/hod/villans/' + site.villans[i].img1 + '" /></figure><dl><dt class="name">' + site.villans[i].name + '</dt><dt>knownfor</dt><dd>' + site.villans[i].knownfor + '</dd><dt>lastseen</dt><dd>' + site.villans[i].lastseen + '</dd></dl></li>');
			
		};
	
	
	
	$('a.close-villan, .villan-details').on('click', function() {
		$('ul.villans-lst li[data-villanid]').removeClass('hide');
		$('.villan-details').removeClass('show').css('z-index', 0);
	});
	
	$('.villans-lst.disp-desktop figure').on('click', function() {
		$('ul.villans-lst li[data-villanid]').removeClass('hide');
		
		var aid = $(this).closest('li').attr('data-villanid');		
		var detailsContainer = $('dl.villan-details');
		
		
		$(detailsContainer).find('figure img').attr('src', '/oddsquad/img/agents/hod/villans/' + site.villans[aid].img1);
		
		$(detailsContainer).find('dt.name span').html(site.villans[aid].name);
			
		
		$(detailsContainer).find('dd.knownfor span').html(site.villans[aid].knownfor);
		$(detailsContainer).find('dd.lastseen span').html(site.villans[aid].lastseen);
		
		$(detailsContainer).addClass('show').css('z-index', 1);
		
		
		for (i = 0; i < villansTotal; i++) {
			$('ul.villans-lst li[data-villanid="' + i + '"]').addClass('hide');
		};
			
	});
	
	villansCreated = true;
	$(document).trigger ('VILLANS_CREATED');

};