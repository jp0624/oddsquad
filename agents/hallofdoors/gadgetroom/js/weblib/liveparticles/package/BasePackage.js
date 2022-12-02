//Includes all files that are common to all particle system packages

//Core files
require.include("weblib/liveparticles/AbstractParticle");
require.include("weblib/liveparticles/AbstractParticleEmitter");

//Spawn Timers
require.include("weblib/liveparticles/spawntimer/AbstractSpawnTimer");
require.include("weblib/liveparticles/spawntimer/BurstSpawnTimer");
require.include("weblib/liveparticles/spawntimer/UniformSpawnTimer");

//Spawn Shapes
require.include("weblib/liveparticles/spawnshape/AbstractSpawnShape");
require.include("weblib/liveparticles/spawnshape/LineSpawnShape");
require.include("weblib/liveparticles/spawnshape/RadialSpawnShape");
require.include("weblib/liveparticles/spawnshape/BoxSpawnShape");

//Particle Updaters
require.include("weblib/liveparticles/updater/BaseParticleUpdater");
require.include("weblib/liveparticles/updater/DragUpdater");
require.include("weblib/liveparticles/updater/ForceUpdater");
require.include("weblib/liveparticles/updater/InterpolateColourUpdater");
require.include("weblib/liveparticles/updater/InterpolatePropertyUpdater");
require.include("weblib/liveparticles/updater/ObjectSeekUpdater");
require.include("weblib/liveparticles/updater/PropertyRateChangeUpdater");
require.include("weblib/liveparticles/updater/RandomInitialRotationUpdater");
require.include("weblib/liveparticles/updater/RandomPropertyInitializer");
require.include("weblib/liveparticles/updater/RandomScaleInitializer");
require.include("weblib/liveparticles/updater/RandomRotationUpdater");
require.include("weblib/liveparticles/updater/CycleInterpolatePropertyUpdater");

// Interpolation
require.include("weblib/math/interpolation/Interpolation");
require.include("weblib/math/interpolation/Loopolation");