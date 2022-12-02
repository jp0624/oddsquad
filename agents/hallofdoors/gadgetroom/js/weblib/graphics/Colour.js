/*
* Class Colour
*	Stores a single RGBA value
*/

/*
* Create a new Colour object
* @param r:Number - Amount of red from 0 to 255
* @param g:Number - Amount of green from 0 to 255
* @param b:Number - Amount of blue from 0 to 255
* @param a:Number - Alpha from 0 to 255
*/
function Colour(r, g, b, a){
	var _this = this;

	_this.red = r;
	_this.green = g;
	_this.blue = b;
	_this.alpha = a;

	return _this;
}

