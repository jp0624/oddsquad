// list of obstacle types.
var OBSTACLES = [
	bonus = [
		'bonus1',
		'bonus2',
		'bonus3'
	],
	images = [
		'bonus1',
		'bonus2',
		'bonus3'
	]
];

/**
 * Function that's run when an obstacle is clicked.
 */
function clickedObstacle() {
    var obstacleValue = parseInt($('.obstacle a').attr("data-value"));
	targetPosition += (obstacleValue + 1) * SCROLL_BOOST_AMOUNT;
}

/**
 * Function to create an obstacle.
 */
function createObstacle() {

	// randomize the obstacle type.
	var obstacleType	= Math.floor(Math.random() * OBSTACLES.length);
	// randomize the obstacle value.
	var obstacleValue	= Math.floor(Math.random() * OBSTACLES[obstacleType].length);
	// find the obstacle's name.
	var obstacleName	= OBSTACLES[obstacleType][obstacleValue];
	// randomize the obstacle's x position;
	obstaclePosition = (Math.floor(Math.random() * (1 + 80 - 20)) + 20);

	// create the obstacle.
	$('.overlay-ballroom .ballroom-wrapper').append('<div class="obstacle" data-drag="0.9"><a href="#" data-value="' + obstacleValue + '" class="' + obstacleName + '" style="left:' + obstaclePosition + '%;"><img src="/oddsquad/img/agents/hod/ballroom/' + obstacleName + '.png"></a></div>');

	// move the obstacle.
	$('.obstacle').attr('data-position', (-yPos + winSize.y));

	// setup the obstacle's listener.
	$('.obstacle a').on('mousedown', clickedObstacle);
	$('.obstacle a').on('touchstart', clickedObstacle);
}

/**
 * Function to remove an obstacle.
 */
function removeObstacle() {
	// remove the listener.
	$('.obstacle').off('mousedown', clickedObstacle);
	$('.obstacle').off('touchstart', clickedObstacle);
	// remove the element.
	$('.obstacle').remove();
}

/**
 * After collecting / passing an obstacle, get a new depth for the next one to spawn at.
 */
function getNextObstacleDepth() {
	nextDepth += (Math.floor(Math.random() * (1 + (winSize.y+5000) - (winSize.y+1000))) + (winSize.y+1000)) * (-1);
}

/**
 * Replaces an obstacle with a new one.
 */
function replaceObstacle() {
	getNextObstacleDepth();
	removeObstacle();
	createObstacle();
}

/**
 * Update a given obstacle's position.
 * @param  {JQuery Div} obstacle The obstacle whose position to update.
 */
function updateObstacle(obstacle) {
	var pos = parseInt($('.obstacle').attr('data-position'));
	translate(obstacle, 0, yPos + pos, 0);
	if(pos < -1 * winSize.y) {
		replaceObstacle();
	}
}

/**
 * Update the obstacles.
 */
function updateObstacles() {

	// if we passed the depth of the obstacle, replace it.
	if(targetPosition <= nextDepth){
		replaceObstacle();
	}

	// if there's an obstacle on the page, update it.
	if($('.obstacle').exists()){
		updateObstacle($('.obstacle'));
	}
}