// List of css classes for random items that spawn.
var RANDOM_ITEM_CLASSES = [
	"badge_1000001",
	"balls_bunch",
	"chest_100",
	"keys",
	"pencil_100",
	"pie0001",
	"sandwich",
	"shark_1000001",
	"shoe_shadow",
	"spidercat",
	"stinky_sock",
	"tentacles",
	"ufo_100",
	"dino"
]

var RANDOM_ITEMS_SPACE = [
	"cubes2",
	"lensflare",
	"shape_100",
	"shape_200",
	"star_100",
	"triangle_colour",
	"badge_1000001",
	"balls_bunch",
	"keys",
	"pencil_100",
	"pie0001",
	"sandwich",
	"ufo_100"
]

// the depth that the next random item will spawn
var nextRandomItemDepth = 0;

var ITEM_CSS_CLASS = "randomObject"; // CSS Class for random items.
var RANDOM_ITEM_POSITION_ATTRIBUTE = "data-position"; // data attribute that stores the position on the page.
var RANDOM_ITEM_CONTAINER = ".overlay-ballroom .ballroom-wrapper"; // container div that holds random items.

var currentRandomItem; // the current random item.

var currentList = RANDOM_ITEM_CLASSES;

function setCurrentRandomItemList(placeName) {
	switch(placeName) {
		case "ballroom":
			currentList = RANDOM_ITEM_CLASSES;
			break;
		case "space":
			currentList = RANDOM_ITEMS_SPACE;
			break;
	}
}

/**
 * Create a random item.
 */
function createRandomItem() {
	// select one from the list.
	console.dir(currentList);
	var itemTypeIndex = Math.floor(Math.random() * currentList.length);

	// set it's X position.
	var obstacleXPosition = (Math.floor(Math.random()* 61 + 20));

	var obstacleClass =  ITEM_CSS_CLASS + " " + currentList[itemTypeIndex];
	console.log("next item:" + currentList[itemTypeIndex]);

	// create the object.
	$(RANDOM_ITEM_CONTAINER).append('<div class="' + obstacleClass + '" style="left:' + obstacleXPosition + '%;"></div>');

	// set it's position data attribute.
	$("."+ITEM_CSS_CLASS).attr(RANDOM_ITEM_POSITION_ATTRIBUTE, (-yPos + winSize.y));
}

/**
 * Remove the random item that's on screen.
 */
function removeRandomItem() {
	$("."+ITEM_CSS_CLASS).remove();
}

/**
 * Get the depth of the next random item.
 */
function getNextRandomItemDepth() {
	nextRandomItemDepth -= Math.floor(Math.random() * 3000) + (winSize.y+1000);
}

/**
 * Replace the exiting random item.
 */
function replaceRandomItem() {
	getNextRandomItemDepth();
	removeRandomItem();
	createRandomItem();
}

/**
 * Update the position of the current random item.
 * @param  {Jquery Object} item - The item to update the position of.
 */
function updateRandomItem(item) {
	var pos = parseInt($("."+ITEM_CSS_CLASS).attr(RANDOM_ITEM_POSITION_ATTRIBUTE));
	translate(item, 0, yPos + pos + 200, 0);
	if(pos < -1 * winSize.y) {
		replaceRandomItem();
	}
}

/**
 * Update the random items.
 */
function updateRandomItems() {
	if (targetPosition <= nextRandomItemDepth) {
		replaceRandomItem();
	}

	if($("."+ITEM_CSS_CLASS).exists()) {
		updateRandomItem($("."+ITEM_CSS_CLASS));
	}
}