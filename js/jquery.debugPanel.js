function infoBox(type, info) {
	$('.info-box dl').append('<' + type + '>' + info + '</' + type + '>');
}