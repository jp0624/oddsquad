// !!! DEPRECATED !!!
//This package will be removed in future versions and shouldn't be used
//Use either createjs/CreateJSParticlePackage or pixi/PixiParticlePackage instead

//Core package
require.include("weblib/liveparticles/package/BasePackage");

//CreateJS specific includes
require.include("weblib/liveparticles/ParticleEmitter");
require.include("weblib/liveparticles/createjs/particle/BitmapParticle");
require.include("weblib/liveparticles/createjs/particle/SpriteParticle");
require.include("weblib/liveparticles/BitmapParticleFactory");
require.include("weblib/liveparticles/SpriteParticleFactory");