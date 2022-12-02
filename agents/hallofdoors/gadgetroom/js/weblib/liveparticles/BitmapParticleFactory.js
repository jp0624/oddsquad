// !!!!!  DEPRECATED !!!!!
//This has been moved to createjs/factory/BitmapParticleFactory
//This has been moved into the ss namespace

require.include("weblib/liveparticles/createjs/particle/BitmapParticle");
require.include("weblib/core/Util");

/*
* Class BitmapParticleFactory
*	Handles the instantiation of new bitmap particles
*/

/*
* Create a new BitmapParticleFactory
* @param image:Image - The image to use for each particle
*/
function BitmapParticleFactory(image){
	var _image = image;

	if(isEmpty(_image)){
		console.log("!! WARNING !! No valid image provided for bitmap particles!");
	}

	/*
	* Create a new particle
	* @return:AbstractParticle - The newly created particle
	*/
	this.createParticle = function(){
		return new BitmapParticle(_image, _image.width / 2, _image.height / 2);
	}
}