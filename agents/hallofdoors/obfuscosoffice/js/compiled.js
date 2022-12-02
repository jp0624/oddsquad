/*!
* @license CreateJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype;b.type=null,b.target=null,b.currentTarget=null,b.eventPhase=0,b.bubbles=!1,b.cancelable=!1,b.timeStamp=0,b.defaultPrevented=!1,b.propagationStopped=!1,b.immediatePropagationStopped=!1,b.removed=!1,b.initialize=function(a,b,c){this.type=a,this.bubbles=b,this.cancelable=c,this.timeStamp=(new Date).getTime()},b.preventDefault=function(){this.defaultPrevented=!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){},b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent,a.willTrigger=b.willTrigger},b._listeners=null,b._captureListeners=null,b.initialize=function(){},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b){if("string"==typeof a){var c=this._listeners;if(!c||!c[a])return!1;a=new createjs.Event(a)}if(a.target=b||this,a.bubbles&&this.parent){for(var d=this,e=[d];d.parent;)e.push(d=d.parent);var f,g=e.length;for(f=g-1;f>=0&&!a.propagationStopped;f--)e[f]._dispatchEvent(a,1+(0==f));for(f=1;g>f&&!a.propagationStopped;f++)e[f]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;a.currentTarget=this,a.eventPhase=b,a.removed=!1,e=e.slice();for(var f=0;c>f&&!a.immediatePropagationStopped;f++){var g=e[f];g.handleEvent?g.handleEvent(a):g(a),a.removed&&(this.off(a.type,g,1==b),a.removed=!1)}}},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";createjs.indexOf=function(a,b){for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1}}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"UID cannot be instantiated"};a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"Ticker cannot be instantiated."};a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.useRAF=!1,a.timingMode=null,a.maxDelta=0,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){return!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._paused=!1,a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.setInterval(a._interval))},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick")},a.setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.getInterval=function(){return a._interval},a.setFPS=function(b){a.setInterval(1e3/b)},a.getFPS=function(){return 1e3/a._interval},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(d.length<1)return-1;b=Math.min(d.length,b||0|a.getFPS());for(var e=0;b>e;e++)c+=d[e];return c/b},a.getMeasuredFPS=function(b){var c=a._times;return c.length<2?-1:(b=Math.min(c.length-1,b||0|a.getFPS()),1e3/((c[0]-c[b])/b))},a.setPaused=function(b){a._paused=b},a.getPaused=function(){return a._paused},a.getTime=function(b){return a._getTime()-a._startTime-(b?a._pausedTime:0)},a.getEventTime=function(b){return(a._lastTime||a._startTime)-(b?a._pausedTime:0)},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){var b=a._getTime()-a._startTime;a._timerId=null,a._setupTick(),b-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode||a.useRAF&&a.RAF_SYNCHED;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),a._raf=!0,void 0}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a._getTime()-a._startTime,c=b-a._lastTime,d=a._paused;if(a._ticks++,d&&(a._pausedTicks++,a._pausedTime+=c),a._lastTime=b,a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&c>f?f:c,e.paused=d,e.time=b,e.runTime=b-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-b);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(b);a._times.length>100;)a._times.pop()};var b=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);a._getTime=function(){return b&&b.call(performance)||(new Date).getTime()},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g,h,i,j){this.initialize(a,b,c,d,e,f,g,h,i,j)},b=a.prototype=new createjs.Event;b.stageX=0,b.stageY=0,b.rawX=0,b.rawY=0,b.nativeEvent=null,b.pointerID=0,b.primary=!1,b.addEventListener=null,b.removeEventListener=null,b.removeAllEventListeners=null,b.dispatchEvent=null,b.hasEventListener=null,b._listeners=null,createjs.EventDispatcher.initialize(b),b._get_localX=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x},b._get_localY=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y};try{Object.defineProperties(b,{localX:{get:b._get_localX},localY:{get:b._get_localY}})}catch(c){}b.Event_initialize=b.initialize,b.initialize=function(a,b,c,d,e,f,g,h,i,j){this.Event_initialize(a,b,c),this.stageX=d,this.stageY=e,this.nativeEvent=f,this.pointerID=g,this.primary=h,this.rawX=null==i?d:i,this.rawY=null==j?e:j},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f){this.initialize(a,b,c,d,e,f)},b=a.prototype;a.identity=null,a.DEG_TO_RAD=Math.PI/180,b.a=1,b.b=0,b.c=0,b.d=1,b.tx=0,b.ty=0,b.alpha=1,b.shadow=null,b.compositeOperation=null,b.initialize=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.prepend=function(a,b,c,d,e,f){var g=this.tx;if(1!=a||0!=b||0!=c||1!=d){var h=this.a,i=this.c;this.a=h*a+this.b*c,this.b=h*b+this.b*d,this.c=i*a+this.d*c,this.d=i*b+this.d*d}return this.tx=g*a+this.ty*c+e,this.ty=g*b+this.ty*d+f,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return this.a=a*g+b*i,this.b=a*h+b*j,this.c=c*g+d*i,this.d=c*h+d*j,this.tx=e*g+f*i+this.tx,this.ty=e*h+f*j+this.ty,this},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty),this.prependProperties(a.alpha,a.shadow,a.compositeOperation),this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty),this.appendProperties(a.alpha,a.shadow,a.compositeOperation),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a,e=this.c,f=this.tx;return this.a=d*b-this.b*c,this.b=d*c+this.b*b,this.c=e*b-this.d*c,this.d=e*c+this.d*b,this.tx=f*b-this.ty*c,this.ty=f*c+this.ty*b,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.d*=b,this.c*=a,this.b*=b,this.tx*=a,this.ty*=b,this},b.translate=function(a,b){return this.tx+=a,this.ty+=b,this},b.identity=function(){return this.alpha=this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this.shadow=this.compositeOperation=null,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0==this.tx&&0==this.ty&&1==this.a&&0==this.b&&0==this.c&&1==this.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a);return c==d?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.reinitialize=function(a,b,c,d,e,f,g,h,i){return this.initialize(a,b,c,d,e,f),this.alpha=null==g?1:g,this.shadow=h,this.compositeOperation=i,this},b.copy=function(a){return this.reinitialize(a.a,a.b,a.c,a.d,a.tx,a.ty,a.alpha,a.shadow,a.compositeOperation)},b.appendProperties=function(a,b,c){return this.alpha*=a,this.shadow=b||this.shadow,this.compositeOperation=c||this.compositeOperation,this},b.prependProperties=function(a,b,c){return this.alpha*=a,this.shadow=this.shadow||b,this.compositeOperation=this.compositeOperation||c,this},b.clone=function(){return(new a).copy(this)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b){this.initialize(a,b)},b=a.prototype;b.x=0,b.y=0,b.initialize=function(a,b){return this.x=null==a?0:a,this.y=null==b?0:b,this},b.copy=function(a){return this.initialize(a.x,a.y)},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype;b.x=0,b.y=0,b.width=0,b.height=0,b.initialize=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.copy=function(a){return this.initialize(a.x,a.y,a.width,a.height)},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g){this.initialize(a,b,c,d,e,f,g)},b=a.prototype;b.target=null,b.overLabel=null,b.outLabel=null,b.downLabel=null,b.play=!1,b._isPressed=!1,b._isOver=!1,b.initialize=function(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,a.cursor="pointer",this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this.setEnabled(!0),this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))},b.setEnabled=function(a){var b=this.target;a?(b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this)):(b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this))},b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype;a.identity=null,b.color=null,b.offsetX=0,b.offsetY=0,b.blur=0,b.initialize=function(a,b,c,d){this.color=a,this.offsetX=b,this.offsetY=c,this.blur=d},b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},a.identity=new a("transparent",0,0,0),createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.EventDispatcher;b.complete=!0,b.framerate=0,b._animations=null,b._frames=null,b._images=null,b._data=null,b._loadCount=0,b._frameHeight=0,b._frameWidth=0,b._numFrames=0,b._regX=0,b._regY=0,b.initialize=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=document.createElement("img"),f.src=g}e.push(f),f.getContext||f.complete||(this._loadCount++,this.complete=!1,function(a){f.onload=function(){a._handleImageLoad()}}(this))}if(null==a.frames);else if(a.frames instanceof Array)for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(k instanceof Array)if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimations=function(){return this._animations.slice(0)},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).initialize(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){var b=new a;return b.complete=this.complete,b._animations=this._animations,b._frames=this._frames,b._images=this._images,b._data=this._data,b._frameHeight=this._frameHeight,b._frameWidth=this._frameWidth,b._numFrames=this._numFrames,b._loadCount=this._loadCount,b},b._handleImageLoad=function(){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];for(var a=0,b=this._frameWidth,c=this._frameHeight,d=0,e=this._images;d<e.length;d++){for(var f=e[d],g=0|f.width/b,h=0|f.height/c,i=this._numFrames>0?Math.min(this._numFrames-a,g*h):g*h,j=0;i>j;j++)this._frames.push({image:f,rect:new createjs.Rectangle(j%g*b,(0|j/g)*c,b,c),regX:this._regX,regY:this._regY});a+=i}this._numFrames=a}},createjs.SpriteSheet=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.f=a,this.params=b,this.path=null==c?!0:c}a.prototype.exec=function(a){this.f.apply(a,this.params)};var b=function(){this.initialize()},c=b.prototype;b.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=255&a>>8,a=255&a>>16),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},b.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},b.Command=a,b.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},b.STROKE_CAPS_MAP=["butt","round","square"],b.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");if(d.getContext){var e=b._ctx=d.getContext("2d");b.beginCmd=new a(e.beginPath,[],!1),b.fillCmd=new a(e.fill,[],!1),b.strokeCmd=new a(e.stroke,[],!1),d.width=d.height=1}c._strokeInstructions=null,c._strokeStyleInstructions=null,c._strokeIgnoreScale=!1,c._fillInstructions=null,c._fillMatrix=null,c._instructions=null,c._oldInstructions=null,c._activeInstructions=null,c._active=!1,c._dirty=!1,c.initialize=function(){this.clear(),this._ctx=b._ctx},c.isEmpty=function(){return!(this._instructions.length||this._oldInstructions.length||this._activeInstructions.length)},c.draw=function(a){this._dirty&&this._updateInstructions();for(var b=this._instructions,c=0,d=b.length;d>c;c++)b[c].exec(a)},c.drawAsPath=function(a){this._dirty&&this._updateInstructions();for(var b,c=this._instructions,d=0,e=c.length;e>d;d++)((b=c[d]).path||0==d)&&b.exec(a)},c.moveTo=function(b,c){return this._activeInstructions.push(new a(this._ctx.moveTo,[b,c])),this},c.lineTo=function(b,c){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.lineTo,[b,c])),this},c.arcTo=function(b,c,d,e,f){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.arcTo,[b,c,d,e,f])),this},c.arc=function(b,c,d,e,f,g){return this._dirty=this._active=!0,null==g&&(g=!1),this._activeInstructions.push(new a(this._ctx.arc,[b,c,d,e,f,g])),this},c.quadraticCurveTo=function(b,c,d,e){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.quadraticCurveTo,[b,c,d,e])),this},c.bezierCurveTo=function(b,c,d,e,f,g){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.bezierCurveTo,[b,c,d,e,f,g])),this},c.rect=function(b,c,d,e){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.rect,[b,c,d,e])),this},c.closePath=function(){return this._active&&(this._dirty=!0,this._activeInstructions.push(new a(this._ctx.closePath,[]))),this},c.clear=function(){return this._instructions=[],this._oldInstructions=[],this._activeInstructions=[],this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=this._fillMatrix=null,this._active=this._dirty=this._strokeIgnoreScale=!1,this},c.beginFill=function(b){return this._active&&this._newPath(),this._fillInstructions=b?[new a(this._setProp,["fillStyle",b],!1)]:null,this._fillMatrix=null,this},c.beginLinearGradientFill=function(b,c,d,e,f,g){this._active&&this._newPath();for(var h=this._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return this._fillInstructions=[new a(this._setProp,["fillStyle",h],!1)],this._fillMatrix=null,this},c.beginRadialGradientFill=function(b,c,d,e,f,g,h,i){this._active&&this._newPath();for(var j=this._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return this._fillInstructions=[new a(this._setProp,["fillStyle",j],!1)],this._fillMatrix=null,this},c.beginBitmapFill=function(b,c,d){this._active&&this._newPath(),c=c||"";var e=this._ctx.createPattern(b,c);return this._fillInstructions=[new a(this._setProp,["fillStyle",e],!1)],this._fillMatrix=d?[d.a,d.b,d.c,d.d,d.tx,d.ty]:null,this},c.endFill=function(){return this.beginFill()},c.setStrokeStyle=function(c,d,e,f,g){return this._active&&this._newPath(),this._strokeStyleInstructions=[new a(this._setProp,["lineWidth",null==c?"1":c],!1),new a(this._setProp,["lineCap",null==d?"butt":isNaN(d)?d:b.STROKE_CAPS_MAP[d]],!1),new a(this._setProp,["lineJoin",null==e?"miter":isNaN(e)?e:b.STROKE_JOINTS_MAP[e]],!1),new a(this._setProp,["miterLimit",null==f?"10":f],!1)],this._strokeIgnoreScale=g,this},c.beginStroke=function(b){return this._active&&this._newPath(),this._strokeInstructions=b?[new a(this._setProp,["strokeStyle",b],!1)]:null,this},c.beginLinearGradientStroke=function(b,c,d,e,f,g){this._active&&this._newPath();for(var h=this._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",h],!1)],this},c.beginRadialGradientStroke=function(b,c,d,e,f,g,h,i){this._active&&this._newPath();for(var j=this._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",j],!1)],this},c.beginBitmapStroke=function(b,c){this._active&&this._newPath(),c=c||"";var d=this._ctx.createPattern(b,c);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",d],!1)],this},c.endStroke=function(){return this.beginStroke(),this},c.curveTo=c.quadraticCurveTo,c.drawRect=c.rect,c.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e),this},c.drawRoundRectComplex=function(b,c,d,e,f,g,h,i){var j=(e>d?d:e)/2,k=0,l=0,m=0,n=0;0>f&&(f*=k=-1),f>j&&(f=j),0>g&&(g*=l=-1),g>j&&(g=j),0>h&&(h*=m=-1),h>j&&(h=j),0>i&&(i*=n=-1),i>j&&(i=j),this._dirty=this._active=!0;var o=this._ctx.arcTo,p=this._ctx.lineTo;return this._activeInstructions.push(new a(this._ctx.moveTo,[b+d-g,c]),new a(o,[b+d+g*l,c-g*l,b+d,c+g,g]),new a(p,[b+d,c+e-h]),new a(o,[b+d+h*m,c+e+h*m,b+d-h,c+e,h]),new a(p,[b+i,c+e]),new a(o,[b-i*n,c+e+i*n,b,c+e-i,i]),new a(p,[b,c+f]),new a(o,[b-f*k,c-f*k,b+f,c,f]),new a(this._ctx.closePath)),this},c.drawCircle=function(a,b,c){return this.arc(a,b,c,0,2*Math.PI),this},c.drawEllipse=function(b,c,d,e){this._dirty=this._active=!0;var f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;return this._activeInstructions.push(new a(this._ctx.moveTo,[b,l]),new a(this._ctx.bezierCurveTo,[b,l-h,k-g,c,k,c]),new a(this._ctx.bezierCurveTo,[k+g,c,i,l-h,i,l]),new a(this._ctx.bezierCurveTo,[i,l+h,k+g,j,k,j]),new a(this._ctx.bezierCurveTo,[k-g,j,b,l+h,b,l])),this},c.inject=function(b,c){return this._dirty=this._active=!0,this._activeInstructions.push(new a(b,[c])),this},c.drawPolyStar=function(b,c,d,e,f,g){this._dirty=this._active=!0,null==f&&(f=0),f=1-f,null==g?g=0:g/=180/Math.PI;var h=Math.PI/e;this._activeInstructions.push(new a(this._ctx.moveTo,[b+Math.cos(g)*d,c+Math.sin(g)*d]));for(var i=0;e>i;i++)g+=h,1!=f&&this._activeInstructions.push(new a(this._ctx.lineTo,[b+Math.cos(g)*d*f,c+Math.sin(g)*d*f])),g+=h,this._activeInstructions.push(new a(this._ctx.lineTo,[b+Math.cos(g)*d,c+Math.sin(g)*d]));return this},c.decodePath=function(a){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=a.length,g=[],h=0,i=0,j=b.BASE_64;f>e;){var k=a.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(1&l>>2)+2,q=0;o>q;q++){var r=j[a.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[a.charAt(e+1)],3==p&&(r=r<<6|j[a.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},c.clone=function(){var a=new b;return a._instructions=this._instructions.slice(),a._activeInstructions=this._activeInstructions.slice(),a._oldInstructions=this._oldInstructions.slice(),this._fillInstructions&&(a._fillInstructions=this._fillInstructions.slice()),this._strokeInstructions&&(a._strokeInstructions=this._strokeInstructions.slice()),this._strokeStyleInstructions&&(a._strokeStyleInstructions=this._strokeStyleInstructions.slice()),a._active=this._active,a._dirty=this._dirty,a._fillMatrix=this._fillMatrix,a._strokeIgnoreScale=this._strokeIgnoreScale,a},c.toString=function(){return"[Graphics]"},c.mt=c.moveTo,c.lt=c.lineTo,c.at=c.arcTo,c.bt=c.bezierCurveTo,c.qt=c.quadraticCurveTo,c.a=c.arc,c.r=c.rect,c.cp=c.closePath,c.c=c.clear,c.f=c.beginFill,c.lf=c.beginLinearGradientFill,c.rf=c.beginRadialGradientFill,c.bf=c.beginBitmapFill,c.ef=c.endFill,c.ss=c.setStrokeStyle,c.s=c.beginStroke,c.ls=c.beginLinearGradientStroke,c.rs=c.beginRadialGradientStroke,c.bs=c.beginBitmapStroke,c.es=c.endStroke,c.dr=c.drawRect,c.rr=c.drawRoundRect,c.rc=c.drawRoundRectComplex,c.dc=c.drawCircle,c.de=c.drawEllipse,c.dp=c.drawPolyStar,c.p=c.decodePath,c._updateInstructions=function(){this._instructions=this._oldInstructions.slice(),this._instructions.push(b.beginCmd),this._appendInstructions(this._fillInstructions),this._appendInstructions(this._strokeInstructions),this._appendInstructions(this._strokeInstructions&&this._strokeStyleInstructions),this._appendInstructions(this._activeInstructions),this._fillInstructions&&this._appendDraw(b.fillCmd,this._fillMatrix),this._strokeInstructions&&this._appendDraw(b.strokeCmd,this._strokeIgnoreScale&&[1,0,0,1,0,0])},c._appendInstructions=function(a){a&&this._instructions.push.apply(this._instructions,a)},c._appendDraw=function(b,c){c?this._instructions.push(new a(this._ctx.save,[],!1),new a(this._ctx.transform,c,!1),b,new a(this._ctx.restore,[],!1)):this._instructions.push(b)},c._newPath=function(){this._dirty&&this._updateInstructions(),this._oldInstructions=this._instructions,this._activeInstructions=[],this._active=this._dirty=!1},c._setProp=function(a,b){this[a]=b},createjs.Graphics=b}(),this.createjs=this.createjs||{},function(){var a=function(){this.initialize()},b=a.prototype=new createjs.EventDispatcher;a._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],a.suppressCrossDomainErrors=!1;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),a._nextCacheID=1,b.alpha=1,b.cacheCanvas=null,b.id=-1,b.mouseEnabled=!0,b.tickEnabled=!0,b.name=null,b.parent=null,b.regX=0,b.regY=0,b.rotation=0,b.scaleX=1,b.scaleY=1,b.skewX=0,b.skewY=0,b.shadow=null,b.visible=!0,b.x=0,b.y=0,b.compositeOperation=null,b.snapToPixel=!1,b.filters=null,b.cacheID=0,b.mask=null,b.hitArea=null,b.cursor=null,b._cacheOffsetX=0,b._cacheOffsetY=0,b._cacheScale=1,b._cacheDataURLID=0,b._cacheDataURL=null,b._matrix=null,b._rectangle=null,b._bounds=null,b.initialize=function(){this.id=createjs.UID.get(),this._matrix=new createjs.Matrix2D,this._rectangle=new createjs.Rectangle},b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.cacheCanvas;if(b||!c)return!1;var d,e=this._cacheScale,f=this._cacheOffsetX,g=this._cacheOffsetY;return(d=this._applyFilterBounds(f,g,0,0))&&(f=d.x,g=d.y),a.drawImage(c,f,g,c.width/e,c.height/e),!0},b.updateContext=function(a){var b,c=this.mask,d=this;c&&c.graphics&&!c.graphics.isEmpty()&&(b=c.getMatrix(c._matrix),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),c.graphics.drawAsPath(a),a.clip(),b.invert(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),b=d._matrix.identity().appendTransform(d.x,d.y,d.scaleX,d.scaleY,d.rotation,d.skewX,d.skewY,d.regX,d.regY),createjs.Stage._snapToPixelEnabled&&d.snapToPixel?a.transform(b.a,b.b,b.c,b.d,0|b.tx+.5,0|b.ty+.5):a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),a.globalAlpha*=d.alpha,d.compositeOperation&&(a.globalCompositeOperation=d.compositeOperation),d.shadow&&this._applyShadow(a,d.shadow)},b.cache=function(a,b,c,d,e){e=e||1,this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),this._cacheWidth=c,this._cacheHeight=d,this._cacheOffsetX=a,this._cacheOffsetY=b,this._cacheScale=e,this.updateCache()},b.updateCache=function(b){var c,d=this.cacheCanvas,e=this._cacheScale,f=this._cacheOffsetX*e,g=this._cacheOffsetY*e,h=this._cacheWidth,i=this._cacheHeight;if(!d)throw"cache() must be called before updateCache()";var j=d.getContext("2d");(c=this._applyFilterBounds(f,g,h,i))&&(f=c.x,g=c.y,h=c.width,i=c.height),h=Math.ceil(h*e),i=Math.ceil(i*e),h!=d.width||i!=d.height?(d.width=h,d.height=i):b||j.clearRect(0,0,h+1,i+1),j.save(),j.globalCompositeOperation=b,j.setTransform(e,0,0,e,-f,-g),this.draw(j,!0),this._applyFilters(),j.restore(),this.cacheID=a._nextCacheID++},b.uncache=function(){this._cacheDataURL=this.cacheCanvas=null,this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0,this._cacheScale=1},b.getCacheDataURL=function(){return this.cacheCanvas?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL()),this._cacheDataURL):null},b.getStage=function(){for(var a=this;a.parent;)a=a.parent;return a instanceof createjs.Stage?a:null},b.localToGlobal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);return null==c?null:(c.append(1,0,0,1,a,b),new createjs.Point(c.tx,c.ty))},b.globalToLocal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);return null==c?null:(c.invert(),c.append(1,0,0,1,a,b),new createjs.Point(c.tx,c.ty))},b.localToLocal=function(a,b,c){var d=this.localToGlobal(a,b);return c.globalToLocal(d.x,d.y)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this;return(a?a.identity():new createjs.Matrix2D).appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).appendProperties(b.alpha,b.shadow,b.compositeOperation)},b.getConcatenatedMatrix=function(a){a?a.identity():a=new createjs.Matrix2D;for(var b=this;null!=b;)a.prependTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).prependProperties(b.alpha,b.shadow,b.compositeOperation),b=b.parent;return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);
var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.initialize(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){null==a&&(this._bounds=a),this._bounds=(this._bounds||new createjs.Rectangle).initialize(a,b,c,d)},b.clone=function(){var b=new a;return this.cloneProps(b),b},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b.cloneProps=function(a){a.alpha=this.alpha,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a._bounds=this._bounds,a.mouseEnabled=this.mouseEnabled,a.compositeOperation=this.compositeOperation},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;if(b&&b.tick){var c=new createjs.Event("tick");c.params=a,this._dispatchEvent(c,this,2)}},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;a>e;e++)this.filters[e].applyFilter(b,0,0,c,d)},b._applyFilterBounds=function(a,b,c,d){var e,f,g=this.filters;if(!g||!(f=g.length))return null;for(var h=0;f>h;h++){var i=this.filters[h],j=i.getBounds&&i.getBounds();j&&(e||(e=this._rectangle.initialize(a,b,c,d)),e.x+=j.x,e.y+=j.y,e.width+=j.width,e.height+=j.height)}return e},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=c?this._matrix.identity():this.getMatrix(this._matrix);(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.initialize(o,q,p-o,r-q)},b._hasMouseEventListener=function(){for(var b=a._MOUSE_EVENTS,c=0,d=b.length;d>c;c++)if(this.hasEventListener(b[c]))return!0;return!!this.cursor},createjs.DisplayObject=a}(),this.createjs=this.createjs||{},function(){var a=function(){this.initialize()},b=a.prototype=new createjs.DisplayObject;b.children=null,b.mouseChildren=!0,b.tickChildren=!0,b.DisplayObject_initialize=b.initialize,b.initialize=function(){this.DisplayObject_initialize(),this.children=[]},b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(0),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.push(a),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this.removeChildAt(c[d]);return e}if(0>a||a>this.children.length-1)return!1;var f=this.children[a];return f&&(f.parent=null),this.children.splice(a,1),!0},b.removeAllChildren=function(){for(var a=this.children;a.length;)a.pop().parent=null},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.getNumChildren=function(){return this.children.length},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b){var c=[],d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,c),c},b.getObjectUnderPoint=function(a,b){var c=this.localToGlobal(a,b);return this._getObjectsUnderPoint(c.x,c.y)},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=new a;if(this.cloneProps(c),b)for(var d=c.children=[],e=0,f=this.children.length;f>e;e++){var g=this.children[e].clone(b);g.parent=c,d.push(g)}return c},b.toString=function(){return"[Container (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){if(this.tickChildren)for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c.tickEnabled&&c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._getObjectsUnderPoint=function(b,c,d,e,f){var g=createjs.DisplayObject._hitTestContext,h=this._matrix;f=f||e&&this._hasMouseEventListener();for(var i=this.children,j=i.length,k=j-1;k>=0;k--){var l=i[k],m=l.hitArea;if(l.visible&&(m||l.isVisible())&&(!e||l.mouseEnabled))if(!m&&l instanceof a){var n=l._getObjectsUnderPoint(b,c,d,e,f);if(!d&&n)return e&&!this.mouseChildren?this:n}else{if(!f&&!l._hasMouseEventListener())continue;if(l.getConcatenatedMatrix(h),m&&(h.appendTransform(m.x,m.y,m.scaleX,m.scaleY,m.rotation,m.skewX,m.skewY,m.regX,m.regY),h.alpha=m.alpha),g.globalAlpha=h.alpha,g.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-c),(m||l).draw(g),!this._testHit(g))continue;if(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:l;d.push(l)}}return null},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d,e,f,g,h=b?this._matrix.identity():this.getMatrix(this._matrix);a&&h.prependMatrix(a);for(var i=this.children.length,j=0;i>j;j++){var k=this.children[j];if(k.visible&&(c=k._getBounds(h))){var l=c.x,m=c.y,n=l+c.width,o=m+c.height;(d>l||null==d)&&(d=l),(n>e||null==e)&&(e=n),(f>m||null==f)&&(f=m),(o>g||null==g)&&(g=o)}}return null==e?null:this._rectangle.initialize(d,f,e-d,g-f)},createjs.Container=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Container;a._snapToPixelEnabled=!1,b.autoClear=!0,b.canvas=null,b.mouseX=0,b.mouseY=0,b.snapToPixelEnabled=!1,b.mouseInBounds=!1,b.tickOnUpdate=!0,b.mouseMoveOutside=!1,b.nextStage=null,b._pointerData=null,b._pointerCount=0,b._primaryPointerID=null,b._mouseOverIntervalID=null,b.Container_initialize=b.initialize,b.initialize=function(a){this.Container_initialize(),this.canvas="string"==typeof a?document.getElementById(a):a,this._pointerData={},this.enableDOMEvents(!0)},b.update=function(){if(this.canvas){this.tickOnUpdate&&(this.dispatchEvent("tickstart"),this.tickEnabled&&this._tick(arguments.length?arguments:null),this.dispatchEvent("tickend")),this.dispatchEvent("drawstart"),a._snapToPixelEnabled=this.snapToPixelEnabled,this.autoClear&&this.clear();var b=this.canvas.getContext("2d");b.save(),this.updateContext(b),this.draw(b,!1),b.restore(),this.dispatchEvent("drawend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){b||(b="image/png");var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b);return a&&(d.clearRect(0,0,e+1,f+1),d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:this.canvas,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){var b=new a(null);return this.cloneProps(b),b},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0},null==this._primaryPointerID&&(this._primaryPointerID=a),(null==this._primaryPointerID||-1==this._primaryPointerID)&&(this._primaryPointerID=a)),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d){if(this.canvas){var e=this._getPointerData(a),f=e.inBounds;if(this._updatePointerPosition(a,b,c,d),f||e.inBounds||this.mouseMoveOutside){-1==a&&e.inBounds==!f&&this._dispatchMouseEvent(this,f?"mouseleave":"mouseenter",!1,a,e,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,e,b),this._dispatchMouseEvent(e.target,"pressmove",!0,a,e,b);var g=e.event;g&&g.hasEventListener("mousemove")&&g.dispatchEvent(new createjs.MouseEvent("mousemove",!1,!1,e.x,e.y,b,a,a==this._primaryPointerID,e.rawX,e.rawY),e.target),this.nextStage&&this.nextStage._handlePointerMove(a,b,c,d)}}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,a==this._primaryPointerID&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c){var d=this._getPointerData(a);this._dispatchMouseEvent(this,"stagemouseup",!1,a,d,b);var e=d.target;e&&(this._getObjectsUnderPoint(d.x,d.y,null,!0)==e&&this._dispatchMouseEvent(e,"click",!0,a,d,b),this._dispatchMouseEvent(e,"pressup",!0,a,d,b));var f=d.event;f&&f.hasEventListener("mouseup")&&f.dispatchEvent(new createjs.MouseEvent("mouseup",!1,!1,d.x,d.y,b,a,a==this._primaryPointerID,d.rawX,d.rawY),e),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):d.event=d.target=null,this.nextStage&&this.nextStage._handlePointerUp(a,b,c)},b._handleMouseDown=function(a){this._handlePointerDown(-1,a,a.pageX,a.pageY)},b._handlePointerDown=function(a,b,c,d){null!=d&&this._updatePointerPosition(a,b,c,d);var e=this._getPointerData(a);this._dispatchMouseEvent(this,"stagemousedown",!1,a,e,b),e.target=this._getObjectsUnderPoint(e.x,e.y,null,!0),e.event=this._dispatchMouseEvent(e.target,"mousedown",!0,a,e,b),this.nextStage&&this.nextStage._handlePointerDown(a,b,c,d)},b._testMouseOver=function(a){if(-1==this._primaryPointerID&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var b,c,d,e,f=this._getPointerData(-1),g=f.posEvtObj,h=-1,i="";(a||this.mouseInBounds&&g&&g.target==this.canvas)&&(b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var j=this._mouseOverTarget||[],k=j[j.length-1],l=this._mouseOverTarget=[];for(c=b;c;)l.unshift(c),null!=c.cursor&&(i=c.cursor),c=c.parent;for(this.canvas.style.cursor=i,d=0,e=l.length;e>d&&l[d]==j[d];d++)h=d;for(k!=b&&this._dispatchMouseEvent(k,"mouseout",!0,-1,f,g),d=j.length-1;d>h;d--)this._dispatchMouseEvent(j[d],"rollout",!1,-1,f,g);for(d=l.length-1;d>h;d--)this._dispatchMouseEvent(l[d],"rollover",!1,-1,f,g);k!=b&&this._dispatchMouseEvent(b,"mouseover",!0,-1,f,g)}},b._handleDoubleClick=function(a){var b=this._getPointerData(-1),c=this._getObjectsUnderPoint(b.x,b.y,null,!0);this._dispatchMouseEvent(c,"dblclick",!0,-1,b,a),this.nextStage&&this.nextStage._handleDoubleClick(a)},b._dispatchMouseEvent=function(a,b,c,d,e,f){if(a&&(c||a.hasEventListener(b))){var g=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d==this._primaryPointerID,e.rawX,e.rawY);return a.dispatchEvent(g),g}},createjs.Stage=a}(),this.createjs=this.createjs||{},function(){var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.image=null,b.snapToPixel=!0,b.sourceRect=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){this.DisplayObject_initialize(),"string"==typeof a?(this.image=document.createElement("img"),this.image.src=a):this.image=a},b.isVisible=function(){var a=this.cacheCanvas||this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.sourceRect;return c?a.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):a.drawImage(this.image,0,0),!0},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.sourceRect||this.image,c=this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2);return c?this._rectangle.initialize(0,0,b.width,b.height):null},b.clone=function(){var b=new a(this.image);return this.sourceRect&&(b.sourceRect=this.sourceRect.clone()),this.cloneProps(b),b},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b){this.initialize(a,b)},b=a.prototype=new createjs.DisplayObject;b.currentFrame=0,b.currentAnimation=null,b.paused=!0,b.spriteSheet=null,b.snapToPixel=!0,b.offset=0,b.currentAnimationFrame=0,b.framerate=0,b._advanceCount=0,b._animation=null,b._currentFrame=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b){this.DisplayObject_initialize(),this.spriteSheet=a,b&&this.gotoAndPlay(b)},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this._animation&&this._animation.speed||1,c=this.framerate||this.spriteSheet.framerate,d=c&&null!=a?a/(1e3/c):1;this._animation?this.currentAnimationFrame+=d*b:this._currentFrame+=d*b,this._normalizeFrame()},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){var b=new a(this.spriteSheet);return this.cloneProps(b),b},b.toString=function(){return"[Sprite (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){this.paused||this.advance(a&&a[0]&&a[0].delta),this.DisplayObject__tick(a)},b._normalizeFrame=function(){var a,b=this._animation,c=this.paused,d=this._currentFrame,e=this.currentAnimationFrame;if(b)if(a=b.frames.length,(0|e)>=a){var f=b.next;if(this._dispatchAnimationEnd(b,d,c,f,a-1));else{if(f)return this._goto(f,e-a);this.paused=!0,e=this.currentAnimationFrame=b.frames.length-1,this._currentFrame=b.frames[e]}}else this._currentFrame=b.frames[0|e];else if(a=this.spriteSheet.getNumFrames(),d>=a&&!this._dispatchAnimationEnd(b,d,c,a-1)&&(this._currentFrame-=a)>=a)return this._normalizeFrame();this.currentFrame=0|this._currentFrame},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}var h=this._animation!=a||this._currentFrame!=b;return h||c||!this.paused||(this.currentAnimationFrame=e,h=!0),h},b.DisplayObject_cloneProps=b.cloneProps,b.cloneProps=function(a){this.DisplayObject_cloneProps(a),a.currentFrame=this.currentFrame,a._currentFrame=this._currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a._animation=this._animation,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate},b._goto=function(a,b){if(isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this.currentAnimationFrame=b||0,this._animation=c,this.currentAnimation=a,this._normalizeFrame())}else this.currentAnimationFrame=0,this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=a}(),this.createjs=this.createjs||{},function(){"use strict";var a="BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";if(!createjs.Sprite)throw a;(createjs.BitmapAnimation=function(b){console.log(a),this.initialize(b)}).prototype=new createjs.Sprite}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.graphics=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){this.DisplayObject_initialize(),this.graphics=a?a:new createjs.Graphics},b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a),!0)},b.clone=function(b){var c=new a(b&&this.graphics?this.graphics.clone():this.graphics);return this.cloneProps(c),c},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.DisplayObject,c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.text="",b.font=null,b.color=null,b.textAlign="left",b.textBaseline="top",b.maxWidth=null,b.outline=0,b.lineHeight=0,b.lineWidth=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b,c){this.DisplayObject_initialize(),this.text=a,this.font=b,this.color=c},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._prepContext(a._workingContext).measureText(this.text).width},b.getMeasuredLineHeight=function(){return 1.2*this._prepContext(a._workingContext).measureText("M").width},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""==this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.initialize(e,g,d,c.height)},b.clone=function(){var b=new a(this.text,this.font,this.color);return this.cloneProps(b),b},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b.DisplayObject_cloneProps=b.cloneProps,b.cloneProps=function(a){this.DisplayObject_cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth},b._prepContext=function(a){return a.font=this.font,a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a},b._drawText=function(b,c){var d=!!b;d||(b=this._prepContext(a._workingContext));for(var e=this.lineHeight||this.getMeasuredLineHeight(),f=0,g=0,h=String(this.text).split(/(?:\r\n|\r|\n)/),i=0,j=h.length;j>i;i++){var k=h[i],l=null;if(null!=this.lineWidth&&(l=b.measureText(k).width)>this.lineWidth){var m=k.split(/(\s)/);k=m[0],l=b.measureText(k).width;for(var n=1,o=m.length;o>n;n+=2){var p=b.measureText(m[n]+m[n+1]).width;l+p>this.lineWidth?(d&&this._drawTextLine(b,k,g*e),l>f&&(f=l),k=m[n+1],l=b.measureText(k).width,g++):(k+=m[n]+m[n+1],l+=p)}}d&&this._drawTextLine(b,k,g*e),c&&null==l&&(l=b.measureText(k).width),l>f&&(f=l),g++}return c&&(c.count=g,c.width=f,c.height=g*e),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},createjs.Text=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.initialize(a,b)}var b=a.prototype=new createjs.DisplayObject;b.text="",b.spriteSheet=null,b.lineHeight=0,b.letterSpacing=0,b.spaceWidth=0,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b){this.DisplayObject_initialize(),this.text=a,this.spriteSheet=b},b.DisplayObject_draw=b.draw,b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._drawText(a),void 0)},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.getBounds=function(){var a=this._rectangle;return this._drawText(null,a),a.width?a:null},b._getFrame=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&b.getFrame(d.frames[0])},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._drawText=function(a,b){var c,d,e,f=0,g=0,h=this.spaceWidth,i=this.lineHeight,j=this.spriteSheet,k=!!this._getFrame(" ",j);k||0!=h||(h=this._getSpaceWidth(j)),0==i&&(i=this._getLineHeight(j));for(var l=0,m=0,n=this.text.length;n>m;m++){var o=this.text.charAt(m);if(k||" "!=o)if("\n"!=o&&"\r"!=o){var p=this._getFrame(o,j);if(p){var q=p.rect;e=p.regX,c=q.width,a&&a.drawImage(p.image,q.x,q.y,c,d=q.height,f-e,g-p.regY,c,d),f+=c+this.letterSpacing}}else"\r"==o&&"\n"==this.text.charAt(m+1)&&m++,f-e>l&&(l=f-e),f=0,g+=i;else f+=h}f-e>l&&(l=f-e),b&&(b.width=l-this.letterSpacing,b.height=g+i)},createjs.BitmapText=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"SpriteSheetUtils cannot be instantiated"},b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.addFlippedFrames=function(b,c,d,e){if(c||d||e){var f=0;c&&a._flip(b,++f,!0,!1),d&&a._flip(b,++f,!1,!0),e&&a._flip(b,++f,!0,!0)}},a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=document.createElement("img");return g.src=f.toDataURL("image/png"),g},a.mergeAlpha=function(a,b,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),c.width=Math.max(b.width,a.width),c.height=Math.max(b.height,a.height);var d=c.getContext("2d");return d.save(),d.drawImage(a,0,0),d.globalCompositeOperation="destination-in",d.drawImage(b,0,0),d.restore(),c},a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);var l=document.createElement("img");l.src=g.toDataURL("image/png"),l.width=k.width,l.height=k.height,f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=l.width-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=l.height-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,speed:k.speed,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.initialize()},b=a.prototype=new createjs.EventDispatcher;a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.maxWidth=2048,b.maxHeight=2048,b.spriteSheet=null,b.scale=1,b.padding=1,b.timeSlice=.3,b.progress=-1,b._frames=null,b._animations=null,b._data=null,b._nextFrameIndex=0,b._index=0,b._timerID=null,b._scale=1,b.initialize=function(){this._frames=[],this._animations={}},b.addFrame=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=c||b.bounds||b.nominalBounds;return!h&&b.getBounds&&(h=b.getBounds()),h?(d=d||1,this._frames.push({source:b,sourceRect:h,scale:d,funct:e,params:f,scope:g,index:this._frames.length,height:h.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,frequency:e}},b.addMovieClip=function(b,c,d){if(this._data)throw a.ERR_RUNNING;var e=b.frameBounds,f=c||b.bounds||b.nominalBounds;if(!f&&b.getBounds&&(f=b.getBounds()),!f&&!e)return null;for(var g=this._frames.length,h=b.timeline.duration,i=0;h>i;i++){var j=e&&e[i]?e[i]:f;this.addFrame(b,j,d,function(a){var b=this.actionsEnabled;this.actionsEnabled=!1,this.gotoAndStop(a),this.actionsEnabled=b},[i],b)}var k=b.timeline._labels,l=[];for(var m in k)l.push({index:k[m],label:m});if(l.length){l.sort(function(a,b){return a.index-b.index});for(var i=0,n=l.length;n>i;i++){for(var o=l[i].label,p=g+l[i].index,q=g+(i==n-1?h:l[i+1].index),r=[],s=p;q>s;s++)r.push(s);this.addAnimation(o,r,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct.apply(a.scope,a.params),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.htmlElement=null,b._oldMtx=null,b._visible=!1,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){"string"==typeof a&&(a=document.getElementById(a)),this.DisplayObject_initialize(),this.mouseEnabled=!1,this.htmlElement=a;
var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%"},b.isVisible=function(){return null!=this.htmlElement},b.draw=function(){return this.visible&&(this._visible=!0),!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){var b=this.getStage();this._visible=!1,b&&b.on("drawend",this._handleDrawEnd,this,!0),this.DisplayObject__tick(a)},b._handleDrawEnd=function(){var a=this.htmlElement;if(a){var b=a.style,c=this._visible?"visible":"hidden";if(c!=b.visibility&&(b.visibility=c),this._visible){var d=this.getConcatenatedMatrix(this._matrix),e=this._oldMtx,f=1e4;if(e&&e.alpha==d.alpha||(b.opacity=""+(0|d.alpha*f)/f,e&&(e.alpha=d.alpha)),!e||e.tx!=d.tx||e.ty!=d.ty||e.a!=d.a||e.b!=d.b||e.c!=d.c||e.d!=d.d){var g="matrix("+(0|d.a*f)/f+","+(0|d.b*f)/f+","+(0|d.c*f)/f+","+(0|d.d*f)/f+","+(0|d.tx+.5);b.transform=b.WebkitTransform=b.OTransform=b.msTransform=g+","+(0|d.ty+.5)+")",b.MozTransform=g+"px,"+(0|d.ty+.5)+"px)",this._oldMtx=e?e.copy(d):d.clone()}}}},createjs.DOMElement=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.initialize()},b=a.prototype;b.initialize=function(){},b.getBounds=function(){return null},b.applyFilter=function(){},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.Filter;b.initialize=function(a,b,c){(isNaN(a)||0>a)&&(a=0),this.blurX=0|a,(isNaN(b)||0>b)&&(b=0),this.blurY=0|b,(isNaN(c)||1>c)&&(c=1),this.quality=0|c},b.blurX=0,b.blurY=0,b.quality=1,b.mul_table=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],b.shg_table=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(){var a=.5*Math.pow(this.quality,.6);return new createjs.Rectangle(-this.blurX*a,-this.blurY*a,2*this.blurX*a,2*this.blurY*a)},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}var k=this.blurX/2;if(isNaN(k)||0>k)return!1;k|=0;var l=this.blurY/2;if(isNaN(l)||0>l)return!1;if(l|=0,0==k&&0==l)return!1;var m=this.quality;(isNaN(m)||1>m)&&(m=1),m|=0,m>3&&(m=3),1>m&&(m=1);var b,c,n,o,p,q,r,s,t,u,v,w,x,y,z,A=i.data,B=k+k+1,C=l+l+1,D=d-1,E=e-1,F=k+1,G=l+1,H={r:0,b:0,g:0,a:0,next:null},I=H;for(n=1;B>n;n++)I=I.next={r:0,b:0,g:0,a:0,next:null};I.next=H;var J={r:0,b:0,g:0,a:0,next:null},K=J;for(n=1;C>n;n++)K=K.next={r:0,b:0,g:0,a:0,next:null};K.next=J;for(var L=null;m-->0;){r=q=0;var M=this.mul_table[k],N=this.shg_table[k];for(c=e;--c>-1;){for(s=F*(w=A[q]),t=F*(x=A[q+1]),u=F*(y=A[q+2]),v=F*(z=A[q+3]),I=H,n=F;--n>-1;)I.r=w,I.g=x,I.b=y,I.a=z,I=I.next;for(n=1;F>n;n++)o=q+((n>D?D:n)<<2),s+=I.r=A[o],t+=I.g=A[o+1],u+=I.b=A[o+2],v+=I.a=A[o+3],I=I.next;for(L=H,b=0;d>b;b++)A[q++]=s*M>>>N,A[q++]=t*M>>>N,A[q++]=u*M>>>N,A[q++]=v*M>>>N,o=r+((o=b+k+1)<D?o:D)<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next;r+=d}for(M=this.mul_table[l],N=this.shg_table[l],b=0;d>b;b++){for(q=b<<2,s=G*(w=A[q]),t=G*(x=A[q+1]),u=G*(y=A[q+2]),v=G*(z=A[q+3]),K=J,n=0;G>n;n++)K.r=w,K.g=x,K.b=y,K.a=z,K=K.next;for(p=d,n=1;l>=n;n++)q=p+b<<2,s+=K.r=A[q],t+=K.g=A[q+1],u+=K.b=A[q+2],v+=K.a=A[q+3],K=K.next,E>n&&(p+=d);if(q=b,L=J,m>0)for(c=0;e>c;c++)o=q<<2,A[o+3]=z=v*M>>>N,z>0?(A[o]=s*M>>>N,A[o+1]=t*M>>>N,A[o+2]=u*M>>>N):A[o]=A[o+1]=A[o+2]=0,o=b+((o=c+G)<E?o:E)*d<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next,q+=d;else for(c=0;e>c;c++)o=q<<2,A[o+3]=z=v*M>>>N,z>0?(z=255/z,A[o]=(s*M>>>N)*z,A[o+1]=(t*M>>>N)*z,A[o+2]=(u*M>>>N)*z):A[o]=A[o+1]=A[o+2]=0,o=b+((o=c+G)<E?o:E)*d<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next,q+=d}}return f.putImageData(i,g,h),!0},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},createjs.BlurFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.initialize=function(a){this.alphaMap=a},b.alphaMap=null,b._alphaMap=null,b._mapData=null,b.applyFilter=function(a,b,c,d,e,f,g,h){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k=i.data,l=this._mapData,m=k.length,n=0;m>n;n+=4)k[n+3]=l[n]||0;return f.putImageData(i,g,h),!0},b.clone=function(){return new a(this.alphaMap)},b.toString=function(){return"[AlphaMapFilter]"},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.initialize=function(a){this.mask=a},b.mask=null,b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g,h){this.initialize(a,b,c,d,e,f,g,h)},b=a.prototype=new createjs.Filter;b.redMultiplier=1,b.greenMultiplier=1,b.blueMultiplier=1,b.alphaMultiplier=1,b.redOffset=0,b.greenOffset=0,b.blueOffset=0,b.alphaOffset=0,b.initialize=function(a,b,c,d,e,f,g,h){this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k=i.data,l=k.length,m=0;l>m;m+=4)k[m]=k[m]*this.redMultiplier+this.redOffset,k[m+1]=k[m+1]*this.greenMultiplier+this.greenOffset,k[m+2]=k[m+2]*this.blueMultiplier+this.blueOffset,k[m+3]=k[m+3]*this.alphaMultiplier+this.alphaOffset;return f.putImageData(i,g,h),!0},b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},createjs.ColorFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype;a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.initialize=function(a,b,c,d){return this.reset(),this.adjustColor(a,b,c,d),this},b.reset=function(){return this.copyMatrix(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+127*(b/100):(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return(new a).copyMatrix(this)},b.toArray=function(){for(var b=[],c=0,d=a.LENGTH;d>c;c++)b[c]=this[c];return b},b.copyMatrix=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b.toString=function(){return"[ColorMatrix]"},b._multiplyMatrix=function(a){for(var b=[],c=0;5>c;c++){for(var d=0;5>d;d++)b[d]=this[d+5*c];for(var d=0;5>d;d++){for(var e=0,f=0;5>f;f++)e+=a[d+5*f]*b[f];this[d+5*c]=e}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.toArray()),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.matrix=null,b.initialize=function(a){this.matrix=a},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k,l,m,n,o=i.data,p=o.length,q=this.matrix,r=q[0],s=q[1],t=q[2],u=q[3],v=q[4],w=q[5],x=q[6],y=q[7],z=q[8],A=q[9],B=q[10],C=q[11],D=q[12],E=q[13],F=q[14],G=q[15],H=q[16],I=q[17],J=q[18],K=q[19],L=0;p>L;L+=4)k=o[L],l=o[L+1],m=o[L+2],n=o[L+3],o[L]=k*r+l*s+m*t+n*u+v,o[L+1]=k*w+l*x+m*y+n*z+A,o[L+2]=k*B+l*C+m*D+n*E+F,o[L+3]=k*G+l*H+m*I+n*J+K;return f.putImageData(i,g,h),!0},b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},createjs.ColorMatrixFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"Touch cannot be instantiated"};a.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_disable(b))},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};void 0===window.navigator.pointerEnabled?(c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none")):(c.addEventListener("pointerdown",d,!1),window.addEventListener("pointermove",d,!1),window.addEventListener("pointerup",d,!1),window.addEventListener("pointercancel",d,!1),b.__touch.preventDefault&&(c.style.touchAction="none")),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;void 0===window.navigator.pointerEnabled?(window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)):(window.removeEventListener("pointermove",b,!1),window.removeEventListener("pointerup",b,!1),window.removeEventListener("pointercancel",b,!1),a.canvas&&a.canvas.removeEventListener("pointerdown",b,!1))},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c||"pointerdown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c||"pointermove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c||"pointerup"==c||"pointercancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="NEXT",a.buildDate="Thu, 12 Dec 2013 23:37:07 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.PreloadJS=createjs.PreloadJS||{};a.version="NEXT",a.buildDate="Thu, 12 Dec 2013 23:37:07 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.init()};a.prototype=new createjs.EventDispatcher;var b=a.prototype,c=a;c.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?)|(.{0,2}\/{1}))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/,c.PATH_PATTERN=/^(?:(\w+:)\/{2})|(.{0,2}\/{1})?([/.]*?(?:[^?]+)?\/?)?$/,b.loaded=!1,b.canceled=!1,b.progress=0,b._item=null,b.getItem=function(){return this._item},b.init=function(){},b.load=function(){},b.close=function(){},b._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},b._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.Event("progress"),b.loaded=this.progress,b.total=1):(b=a,this.progress=a.loaded/a.total,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0)),b.progress=this.progress,this.hasEventListener("progress")&&this.dispatchEvent(b)}},b._sendComplete=function(){this._isCanceled()||this.dispatchEvent("complete")},b._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.Event("error")),this.dispatchEvent(a))},b._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},b._parseURI=function(a){return a?a.match(c.FILE_PATTERN):null},b._parsePath=function(a){return a?a.match(c.PATH_PATTERN):null},b._formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},b.buildPath=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this._formatQueryString(b,c):a+"?"+this._formatQueryString(b,c)},b._isCrossDomain=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},b._isLocal=function(a){var b=document.createElement("a");return b.href=a.src,""==b.hostname&&"file:"==b.protocol},b.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.init(a,b,c)},b=a.prototype=new createjs.AbstractLoader,c=a;c.loadTimeout=8e3,c.LOAD_TIMEOUT=0,c.BINARY="binary",c.CSS="css",c.IMAGE="image",c.JAVASCRIPT="javascript",c.JSON="json",c.JSONP="jsonp",c.MANIFEST="manifest",c.SOUND="sound",c.SVG="svg",c.TEXT="text",c.XML="xml",c.POST="POST",c.GET="GET",b._basePath=null,b._crossOrigin="",b.useXHR=!0,b.stopOnError=!1,b.maintainScriptOrder=!0,b.next=null,b._typeCallbacks=null,b._extensionCallbacks=null,b._loadStartWasDispatched=!1,b._maxConnections=1,b._currentlyLoadingScript=null,b._currentLoads=null,b._loadQueue=null,b._loadQueueBackup=null,b._loadItemsById=null,b._loadItemsBySrc=null,b._loadedResults=null,b._loadedRawResults=null,b._numItems=0,b._numItemsLoaded=0,b._scriptOrder=null,b._loadedScripts=null,b.init=function(a,b,c){this._numItems=this._numItemsLoaded=0,this._paused=!1,this._loadStartWasDispatched=!1,this._currentLoads=[],this._loadQueue=[],this._loadQueueBackup=[],this._scriptOrder=[],this._loadedScripts=[],this._loadItemsById={},this._loadItemsBySrc={},this._loadedResults={},this._loadedRawResults={},this._typeCallbacks={},this._extensionCallbacks={},this._basePath=b,this.setUseXHR(a),this._crossOrigin=c===!0?"Anonymous":c===!1||null==c?"":c},b.setUseXHR=function(a){return this.useXHR=0!=a&&null!=window.XMLHttpRequest,this.useXHR},b.removeAll=function(){this.remove()},b.remove=function(a){var b=null;if(!a||a instanceof Array){if(a)b=a;else if(arguments.length>0)return}else b=[a];var c=!1;if(b){for(;b.length;){var d=b.pop(),e=this.getResult(d);for(f=this._loadQueue.length-1;f>=0;f--)if(g=this._loadQueue[f].getItem(),g.id==d||g.src==d){this._loadQueue.splice(f,1)[0].cancel();break}for(f=this._loadQueueBackup.length-1;f>=0;f--)if(g=this._loadQueueBackup[f].getItem(),g.id==d||g.src==d){this._loadQueueBackup.splice(f,1)[0].cancel();break}if(e)delete this._loadItemsById[e.id],delete this._loadItemsBySrc[e.src],this._disposeItem(e);else for(var f=this._currentLoads.length-1;f>=0;f--){var g=this._currentLoads[f].getItem();if(g.id==d||g.src==d){this._currentLoads.splice(f,1)[0].cancel(),c=!0;break}}}c&&this._loadNext()}else{this.close();for(var h in this._loadItemsById)this._disposeItem(this._loadItemsById[h]);this.init(this.useXHR)}},b.reset=function(){this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);for(var b=[],c=0,d=this._loadQueueBackup.length;d>c;c++)b.push(this._loadQueueBackup[c].getItem());this.loadManifest(b,!1)},c.isBinary=function(a){switch(a){case createjs.LoadQueue.IMAGE:case createjs.LoadQueue.BINARY:return!0;default:return!1}},c.isText=function(a){switch(a){case createjs.LoadQueue.TEXT:case createjs.LoadQueue.JSON:case createjs.LoadQueue.MANIFEST:case createjs.LoadQueue.XML:case createjs.LoadQueue.HTML:case createjs.LoadQueue.CSS:case createjs.LoadQueue.SVG:case createjs.LoadQueue.JAVASCRIPT:return!0;default:return!1}},b.installPlugin=function(a){if(null!=a&&null!=a.getPreloadHandlers){var b=a.getPreloadHandlers();if(b.scope=a,null!=b.types)for(var c=0,d=b.types.length;d>c;c++)this._typeCallbacks[b.types[c]]=b;if(null!=b.extensions)for(c=0,d=b.extensions.length;d>c;c++)this._extensionCallbacks[b.extensions[c]]=b}},b.setMaxConnections=function(a){this._maxConnections=a,!this._paused&&this._loadQueue.length>0&&this._loadNext()},b.loadFile=function(a,b,c){if(null==a){var d=new createjs.Event("error");return d.text="PRELOAD_NO_FILE",this._sendError(d),void 0}this._addItem(a,null,c),b!==!1?this.setPaused(!1):this.setPaused(!0)},b.loadManifest=function(a,b,d){var e=null,f=null;if(a instanceof Array){if(0==a.length){var g=new createjs.Event("error");return g.text="PRELOAD_MANIFEST_EMPTY",this._sendError(g),void 0}e=a}else if("string"==typeof a)e=[{src:a,type:c.MANIFEST}];else{if("object"!=typeof a){var g=new createjs.Event("error");return g.text="PRELOAD_MANIFEST_NULL",this._sendError(g),void 0}if(void 0!==a.src){if(null==a.type)a.type=c.MANIFEST;else if(a.type!=c.MANIFEST){var g=new createjs.Event("error");g.text="PRELOAD_MANIFEST_ERROR",this._sendError(g)}e=[a]}else void 0!==a.manifest&&(e=a.manifest,f=a.path)}for(var h=0,i=e.length;i>h;h++)this._addItem(e[h],f,d);b!==!1?this.setPaused(!1):this.setPaused(!0)},b.load=function(){this.setPaused(!1)},b.getItem=function(a){return this._loadItemsById[a]||this._loadItemsBySrc[a]},b.getResult=function(a,b){var c=this._loadItemsById[a]||this._loadItemsBySrc[a];if(null==c)return null;var d=c.id;return b&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]},b.setPaused=function(a){this._paused=a,this._paused||this._loadNext()},b.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0,this._loadedScripts.length=0,this.loadStartWasDispatched=!1},b._addItem=function(a,b,c){var d=this._createLoadItem(a,b,c);if(null!=d){var e=this._createLoader(d);null!=e&&(this._loadQueue.push(e),this._loadQueueBackup.push(e),this._numItems++,this._updateProgress(),this.maintainScriptOrder&&d.type==createjs.LoadQueue.JAVASCRIPT&&e instanceof createjs.XHRLoader&&(this._scriptOrder.push(d),this._loadedScripts.push(null)))}},b._createLoadItem=function(a,b,c){var d=null;switch(typeof a){case"string":d={src:a};break;case"object":d=window.HTMLAudioElement&&a instanceof window.HTMLAudioElement?{tag:a,src:d.tag.src,type:createjs.LoadQueue.SOUND}:a;break;default:return null}var e=this._parseURI(d.src);null!=e&&(d.ext=e[6]),null==d.type&&(d.type=this._getTypeByExtension(d.ext));var f="",g=c||this._basePath,h=d.src;if(e&&null==e[1]&&null==e[3])if(b){f=b;var i=this._parsePath(b);h=b+h,null!=g&&i&&null==i[1]&&null==i[2]&&(f=g+f)}else null!=g&&(f=g);if(d.src=f+d.src,d.path=f,(d.type==createjs.LoadQueue.JSON||d.type==createjs.LoadQueue.MANIFEST)&&(d._loadAsJSONP=null!=d.callback),d.type==createjs.LoadQueue.JSONP&&null==d.callback)throw new Error("callback is //required for loading JSONP requests.");(void 0===d.tag||null===d.tag)&&(d.tag=this._createTag(d)),(void 0===d.id||null===d.id||""===d.id)&&(d.id=h);var j=this._typeCallbacks[d.type]||this._extensionCallbacks[d.ext];if(j){var k=j.callback.call(j.scope,d.src,d.type,d.id,d.data,f,this);if(k===!1)return null;k===!0||(null!=k.src&&(d.src=k.src),null!=k.id&&(d.id=k.id),null!=k.tag&&(d.tag=k.tag),null!=k.completeHandler&&(d.completeHandler=k.completeHandler),k.type&&(d.type=k.type),e=this._parseURI(d.src),null!=e&&null!=e[6]&&(d.ext=e[6].toLowerCase()))}return this._loadItemsById[d.id]=d,this._loadItemsBySrc[d.src]=d,d},b._createLoader=function(a){var b=this.useXHR;switch(a.type){case createjs.LoadQueue.JSON:case createjs.LoadQueue.MANIFEST:b=!a._loadAsJSONP;break;case createjs.LoadQueue.XML:case createjs.LoadQueue.TEXT:b=!0;break;case createjs.LoadQueue.SOUND:case createjs.LoadQueue.JSONP:b=!1;break;case null:return null}return b?new createjs.XHRLoader(a,this._crossOrigin):new createjs.TagLoader(a)},b._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0),this._numItems==this._numItemsLoaded?(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load()):this.loaded=!1;for(var a=0;a<this._loadQueue.length&&!(this._currentLoads.length>=this._maxConnections);a++){var b=this._loadQueue[a];if(this.maintainScriptOrder&&b instanceof createjs.TagLoader&&b.getItem().type==createjs.LoadQueue.JAVASCRIPT){if(this._currentlyLoadingScript)continue;this._currentlyLoadingScript=!0}this._loadQueue.splice(a,1),a--,this._loadItem(b)}}},b._loadItem=function(a){a.on("progress",this._handleProgress,this),a.on("complete",this._handleFileComplete,this),a.on("error",this._handleFileError,this),this._currentLoads.push(a),this._sendFileStart(a.getItem()),a.load()},b._handleFileError=function(a){var b=a.target;this._numItemsLoaded++,this._updateProgress();var c=new createjs.Event("error");c.text="FILE_LOAD_ERROR",c.item=b.getItem(),this._sendError(c),this.stopOnError||(this._removeLoadItem(b),this._loadNext())},b._handleFileComplete=function(a){var b=a.target,c=b.getItem();if(this._loadedResults[c.id]=b.getResult(),b instanceof createjs.XHRLoader&&(this._loadedRawResults[c.id]=b.getResult(!0)),this._removeLoadItem(b),this.maintainScriptOrder&&c.type==createjs.LoadQueue.JAVASCRIPT){if(!(b instanceof createjs.TagLoader))return this._loadedScripts[createjs.indexOf(this._scriptOrder,c)]=c,this._checkScriptLoadOrder(b),void 0;this._currentlyLoadingScript=!1}if(delete c._loadAsJSONP,c.type==createjs.LoadQueue.MANIFEST){var d=b.getResult();null!=d&&void 0!==d.manifest&&this.loadManifest(d,!0)}this._processFinishedLoad(c,b)},b._processFinishedLoad=function(a,b){this._numItemsLoaded++,this._updateProgress(),this._sendFileComplete(a,b),this._loadNext()},b._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,b=0;a>b;b++){var c=this._loadedScripts[b];if(null===c)break;if(c!==!0){var d=this._loadedResults[c.id];(document.body||document.getElementsByTagName("body")[0]).appendChild(d),this._processFinishedLoad(c),this._loadedScripts[b]=!0}}},b._removeLoadItem=function(a){for(var b=this._currentLoads.length,c=0;b>c;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}},b._handleProgress=function(a){var b=a.target;this._sendFileProgress(b.getItem(),b.progress),this._updateProgress()},b._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,b=this._numItems-this._numItemsLoaded;if(b>0){for(var c=0,d=0,e=this._currentLoads.length;e>d;d++)c+=this._currentLoads[d].progress;a+=c/b*(b/this._numItems)}this._sendProgress(a)},b._disposeItem=function(a){delete this._loadedResults[a.id],delete this._loadedRawResults[a.id],delete this._loadItemsById[a.id],delete this._loadItemsBySrc[a.src]},b._createTag=function(a){var b=null;switch(a.type){case createjs.LoadQueue.IMAGE:return b=document.createElement("img"),""==this._crossOrigin||this._isLocal(a)||(b.crossOrigin=this._crossOrigin),b;case createjs.LoadQueue.SOUND:return b=document.createElement("audio"),b.autoplay=!1,b;case createjs.LoadQueue.JSON:case createjs.LoadQueue.JSONP:case createjs.LoadQueue.JAVASCRIPT:case createjs.LoadQueue.MANIFEST:return b=document.createElement("script"),b.type="text/javascript",b;case createjs.LoadQueue.CSS:return b=this.useXHR?document.createElement("style"):document.createElement("link"),b.rel="stylesheet",b.type="text/css",b;case createjs.LoadQueue.SVG:return this.useXHR?b=document.createElement("svg"):(b=document.createElement("object"),b.type="image/svg+xml"),b}return null},b._getTypeByExtension=function(a){if(null==a)return createjs.LoadQueue.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.LoadQueue.IMAGE;case"ogg":case"mp3":case"wav":return createjs.LoadQueue.SOUND;case"json":return createjs.LoadQueue.JSON;case"xml":return createjs.LoadQueue.XML;case"css":return createjs.LoadQueue.CSS;case"js":return createjs.LoadQueue.JAVASCRIPT;case"svg":return createjs.LoadQueue.SVG;default:return createjs.LoadQueue.TEXT}},b._sendFileProgress=function(a,b){if(this._isCanceled())return this._cleanUp(),void 0;if(this.hasEventListener("fileprogress")){var c=new createjs.Event("fileprogress");c.progress=b,c.loaded=b,c.total=1,c.item=a,this.dispatchEvent(c)}},b._sendFileComplete=function(a,b){if(!this._isCanceled()){var c=new createjs.Event("fileload");c.loader=b,c.item=a,c.result=this._loadedResults[a.id],c.rawResult=this._loadedRawResults[a.id],a.completeHandler&&a.completeHandler(c),this.hasEventListener("fileload")&&this.dispatchEvent(c)}},b._sendFileStart=function(a){var b=new createjs.Event("filestart");b.item=a,this.hasEventListener("filestart")&&this.dispatchEvent(b)},b.toString=function(){return"[PreloadJS LoadQueue]"},createjs.LoadQueue=a;var d=function(){};d.init=function(){var a=navigator.userAgent;d.isFirefox=a.indexOf("Firefox")>-1,d.isOpera=null!=window.opera,d.isChrome=a.indexOf("Chrome")>-1,d.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1},d.init(),createjs.LoadQueue.BrowserDetect=d}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.init(a)},b=a.prototype=new createjs.AbstractLoader;b._loadTimeout=null,b._tagCompleteProxy=null,b._isAudio=!1,b._tag=null,b._jsonResult=null,b.init=function(a){this._item=a,this._tag=a.tag,this._isAudio=window.HTMLAudioElement&&a.tag instanceof window.HTMLAudioElement,this._tagCompleteProxy=createjs.proxy(this._handleLoad,this)},b.getResult=function(){return this._item.type==createjs.LoadQueue.JSONP||this._item.type==createjs.LoadQueue.MANIFEST?this._jsonResult:this._tag},b.cancel=function(){this.canceled=!0,this._clean()},b.load=function(){var a=this._item,b=this._tag;clearTimeout(this._loadTimeout);var c=createjs.LoadQueue.LOAD_TIMEOUT;0==c&&(c=createjs.LoadQueue.loadTimeout),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),c),this._isAudio&&(b.src=null,b.preload="auto"),b.onerror=createjs.proxy(this._handleError,this),this._isAudio?(b.onstalled=createjs.proxy(this._handleStalled,this),b.addEventListener("canplaythrough",this._tagCompleteProxy,!1)):(b.onload=createjs.proxy(this._handleLoad,this),b.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this));var d=this.buildPath(a.src,a.values);
switch(a.type){case createjs.LoadQueue.CSS:b.href=d;break;case createjs.LoadQueue.SVG:b.data=d;break;default:b.src=d}if(a.type==createjs.LoadQueue.JSONP||a.type==createjs.LoadQueue.JSON||a.type==createjs.LoadQueue.MANIFEST){if(null==a.callback)throw new Error("callback is //required for loading JSONP requests.");if(null!=window[a.callback])throw new Error('JSONP callback "'+a.callback+'" already exists on window. You need to specify a different callback. Or re-name the current one.');window[a.callback]=createjs.proxy(this._handleJSONPLoad,this)}(a.type==createjs.LoadQueue.SVG||a.type==createjs.LoadQueue.JSONP||a.type==createjs.LoadQueue.JSON||a.type==createjs.LoadQueue.MANIFEST||a.type==createjs.LoadQueue.JAVASCRIPT||a.type==createjs.LoadQueue.CSS)&&(this._startTagVisibility=b.style.visibility,b.style.visibility="hidden",(document.body||document.getElementsByTagName("body")[0]).appendChild(b)),null!=b.load&&b.load()},b._handleJSONPLoad=function(a){this._jsonResult=a},b._handleTimeout=function(){this._clean();var a=new createjs.Event("error");a.text="PRELOAD_TIMEOUT",this._sendError(a)},b._handleStalled=function(){},b._handleError=function(){this._clean();var a=new createjs.Event("error");this._sendError(a)},b._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this.getItem().tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleLoad()},b._handleLoad=function(){if(!this._isCanceled()){var a=this.getItem(),b=a.tag;if(!(this.loaded||this._isAudio&&4!==b.readyState)){switch(this.loaded=!0,a.type){case createjs.LoadQueue.SVG:case createjs.LoadQueue.JSON:case createjs.LoadQueue.JSONP:case createjs.LoadQueue.MANIFEST:case createjs.LoadQueue.CSS:b.style.visibility=this._startTagVisibility,(document.body||document.getElementsByTagName("body")[0]).removeChild(b)}this._clean(),this._sendComplete()}}},b._clean=function(){clearTimeout(this._loadTimeout);var a=this.getItem(),b=a.tag;null!=b&&(b.onload=null,b.removeEventListener&&b.removeEventListener("canplaythrough",this._tagCompleteProxy,!1),b.onstalled=null,b.onprogress=null,b.onerror=null,null!=b.parentNode&&a.type==createjs.LoadQueue.SVG&&a.type==createjs.LoadQueue.JSON&&a.type==createjs.LoadQueue.MANIFEST&&a.type==createjs.LoadQueue.CSS&&a.type==createjs.LoadQueue.JSONP&&b.parentNode.removeChild(b));var a=this.getItem();(a.type==createjs.LoadQueue.JSONP||a.type==createjs.LoadQueue.MANIFEST)&&(window[a.callback]=null)},b.toString=function(){return"[PreloadJS TagLoader]"},createjs.TagLoader=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b){this.init(a,b)},b=a.prototype=new createjs.AbstractLoader;b._request=null,b._loadTimeout=null,b._xhrLevel=1,b._response=null,b._rawResponse=null,b._crossOrigin="",b.init=function(a,b){this._item=a,this._crossOrigin=b,!this._createXHR(a)},b.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},b.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},b.load=function(){if(null==this._request)return this._handleError(),void 0;if(this._request.onloadstart=createjs.proxy(this._handleLoadStart,this),this._request.onprogress=createjs.proxy(this._handleProgress,this),this._request.onabort=createjs.proxy(this._handleAbort,this),this._request.onerror=createjs.proxy(this._handleError,this),this._request.ontimeout=createjs.proxy(this._handleTimeout,this),1==this._xhrLevel){var a=createjs.LoadQueue.LOAD_TIMEOUT;if(0==a)a=createjs.LoadQueue.loadTimeout;else try{console.warn("LoadQueue.LOAD_TIMEOUT has been deprecated in favor of LoadQueue.loadTimeout")}catch(b){}this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),a)}this._request.onload=createjs.proxy(this._handleLoad,this),this._request.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this);try{this._item.values&&this._item.method!=createjs.LoadQueue.GET?this._item.method==createjs.LoadQueue.POST&&this._request.send(this._formatQueryString(this._item.values)):this._request.send()}catch(c){var d=new createjs.Event("error");d.error=c,this._sendError(d)}},b.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},b.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},b._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.Event("progress");b.loaded=a.loaded,b.total=a.total,this._sendProgress(b)}},b._handleLoadStart=function(){clearTimeout(this._loadTimeout),this._sendLoadStart()},b._handleAbort=function(){this._clean();var a=new createjs.Event("error");a.text="XHR_ABORTED",this._sendError(a)},b._handleError=function(){this._clean();var a=new createjs.Event("error");this._sendError(a)},b._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()},b._handleLoad=function(){if(!this.loaded){if(this.loaded=!0,!this._checkError())return this._handleError(),void 0;this._response=this._getResponse(),this._clean();var a=this._generateTag();a&&this._sendComplete()}},b._handleTimeout=function(a){this._clean();var b=new createjs.Event("error");b.text="PRELOAD_TIMEOUT",this._sendError(a)},b._checkError=function(){var a=parseInt(this._request.status);switch(a){case 404:case 0:return!1}return!0},b._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},b._createXHR=function(a){var b=this._isCrossDomain(a),c=null;if(b&&window.XDomainRequest)c=new XDomainRequest;else if(window.XMLHttpRequest)c=new XMLHttpRequest;else try{c=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(d){try{c=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(d){try{c=new ActiveXObject("Msxml2.XMLHTTP")}catch(d){return!1}}}createjs.LoadQueue.isText(a.type)&&c.overrideMimeType&&c.overrideMimeType("text/plain; charset=utf-8"),this._xhrLevel="string"==typeof c.responseType?2:1;var e=null;return e=a.method==createjs.LoadQueue.GET?this.buildPath(a.src,a.values):a.src,c.open(a.method||createjs.LoadQueue.GET,e,!0),b&&c instanceof XMLHttpRequest&&1==this._xhrLevel&&c.setRequestHeader("Origin",location.origin),a.values&&a.method==createjs.LoadQueue.POST&&c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),createjs.LoadQueue.isBinary(a.type)&&(c.responseType="arraybuffer"),this._request=c,!0},b._clean=function(){clearTimeout(this._loadTimeout);var a=this._request;a.onloadstart=null,a.onprogress=null,a.onabort=null,a.onerror=null,a.onload=null,a.ontimeout=null,a.onloadend=null,a.onreadystatechange=null},b._generateTag=function(){var a=this._item.type,b=this._item.tag;switch(a){case createjs.LoadQueue.IMAGE:return b.onload=createjs.proxy(this._handleTagReady,this),""!=this._crossOrigin&&(b.crossOrigin="Anonymous"),b.src=this.buildPath(this._item.src,this._item.values),this._rawResponse=this._response,this._response=b,!1;case createjs.LoadQueue.JAVASCRIPT:return b=document.createElement("script"),b.text=this._response,this._rawResponse=this._response,this._response=b,!0;case createjs.LoadQueue.CSS:var c=document.getElementsByTagName("head")[0];if(c.appendChild(b),b.styleSheet)b.styleSheet.cssText=this._response;else{var d=document.createTextNode(this._response);b.appendChild(d)}return this._rawResponse=this._response,this._response=b,!0;case createjs.LoadQueue.XML:var e=this._parseXML(this._response,"text/xml");return this._rawResponse=this._response,this._response=e,!0;case createjs.LoadQueue.SVG:var e=this._parseXML(this._response,"image/svg+xml");return this._rawResponse=this._response,null!=e.documentElement?(b.appendChild(e.documentElement),this._response=b):this._response=e,!0;case createjs.LoadQueue.JSON:case createjs.LoadQueue.MANIFEST:var f={};try{f=JSON.parse(this._response)}catch(g){f=g}return this._rawResponse=this._response,this._response=f,!0}return!0},b._parseXML=function(a,b){var c=null;try{if(window.DOMParser){var d=new DOMParser;c=d.parseFromString(a,b)}else c=new ActiveXObject("Microsoft.XMLDOM"),c.async=!1,c.loadXML(a)}catch(e){}return c},b._handleTagReady=function(){this._sendComplete()},b.toString=function(){return"[PreloadJS XHRLoader]"},createjs.XHRLoader=a}(),"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),this.createjs=this.createjs||{},function(){var a=createjs.SoundJS=createjs.SoundJS||{};a.version="NEXT",a.buildDate="Thu, 12 Dec 2013 23:37:06 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Sound cannot be instantiated"}function b(a,b){this.init(a,b)}function c(){this.isDefault=!0,this.addEventListener=this.removeEventListener=this.removeAllEventListeners=this.dispatchEvent=this.hasEventListener=this._listeners=this._interrupt=this._playFailed=this.pause=this.resume=this.play=this._beginPlaying=this._cleanUp=this.stop=this.setMasterVolume=this.setVolume=this.mute=this.setMute=this.getMute=this.setPan=this.getPosition=this.setPosition=this.playFailed=function(){return!1},this.getVolume=this.getPan=this.getDuration=function(){return 0},this.playState=a.PLAY_FAILED,this.toString=function(){return"[Sound Default Sound Instance]"}}function d(){}var e=a;e.DELIMITER="|",e.INTERRUPT_ANY="any",e.INTERRUPT_EARLY="early",e.INTERRUPT_LATE="late",e.INTERRUPT_NONE="none",e.PLAY_INITED="playInited",e.PLAY_SUCCEEDED="playSucceeded",e.PLAY_INTERRUPTED="playInterrupted",e.PLAY_FINISHED="playFinished",e.PLAY_FAILED="playFailed",e.SUPPORTED_EXTENSIONS=["mp3","ogg","mpeg","wav","m4a","mp4","aiff","wma","mid"],e.EXTENSION_MAP={m4a:"mp4"},e.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/,e.defaultInterruptBehavior=e.INTERRUPT_NONE,e.alternateExtensions=[],e._lastID=0,e.activePlugin=null,e._pluginsRegistered=!1,e._masterVolume=1,e._masterMute=!1,e._instances=[],e._idHash={},e._preloadHash={},e._defaultSoundInstance=null,e.addEventListener=null,e.removeEventListener=null,e.removeAllEventListeners=null,e.dispatchEvent=null,e.hasEventListener=null,e._listeners=null,createjs.EventDispatcher.initialize(e),e._sendFileLoadEvent=function(a){if(e._preloadHash[a])for(var b=0,c=e._preloadHash[a].length;c>b;b++){var d=e._preloadHash[a][b];if(e._preloadHash[a][b]=!0,e.hasEventListener("fileload")){var f=new createjs.Event("fileload");f.src=d.src,f.id=d.id,f.data=d.data,e.dispatchEvent(f)}}},e.getPreloadHandlers=function(){return{callback:createjs.proxy(e.initLoad,e),types:["sound"],extensions:e.SUPPORTED_EXTENSIONS}},e.registerPlugin=function(a){try{console.log("createjs.Sound.registerPlugin has been deprecated. Please use registerPlugins.")}catch(b){}return e._registerPlugin(a)},e._registerPlugin=function(a){return e._pluginsRegistered=!0,null==a?!1:a.isSupported()?(e.activePlugin=new a,!0):!1},e.registerPlugins=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];if(e._registerPlugin(d))return!0}return!1},e.initializeDefaultPlugins=function(){return null!=e.activePlugin?!0:e._pluginsRegistered?!1:e.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1},e.isReady=function(){return null!=e.activePlugin},e.getCapabilities=function(){return null==e.activePlugin?null:e.activePlugin._capabilities},e.getCapability=function(a){return null==e.activePlugin?null:e.activePlugin._capabilities[a]},e.initLoad=function(a,b,c,d,f){a=a.replace(f,"");var g=e.registerSound(a,c,d,!1,f);return null==g?!1:g},e.registerSound=function(a,c,d,f,g){if(!e.initializeDefaultPlugins())return!1;if(a instanceof Object&&(g=c,c=a.id,d=a.data,a=a.src),e.alternateExtensions.length)var h=e._parsePath2(a,"sound",c,d);else var h=e._parsePath(a,"sound",c,d);if(null==h)return!1;null!=g&&(a=g+a,h.src=g+h.src),null!=c&&(e._idHash[c]=h.src);var i=null;null!=d&&(isNaN(d.channels)?isNaN(d)||(i=parseInt(d)):i=parseInt(d.channels));var j=e.activePlugin.register(h.src,i);if(null!=j&&(null!=j.numChannels&&(i=j.numChannels),b.create(h.src,i),null!=d&&isNaN(d)?d.channels=h.data.channels=i||b.maxPerChannel():d=h.data=i||b.maxPerChannel(),null!=j.tag?h.tag=j.tag:j.src&&(h.src=j.src),null!=j.completeHandler&&(h.completeHandler=j.completeHandler),j.type&&(h.type=j.type)),0!=f)if(e._preloadHash[h.src]||(e._preloadHash[h.src]=[]),e._preloadHash[h.src].push({src:a,id:c,data:d}),1==e._preloadHash[h.src].length)e.activePlugin.preload(h.src,j);else if(1==e._preloadHash[h.src][0])return!0;return h},e.registerManifest=function(a,b){for(var c=[],d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.registerSound(a[d].src,a[d].id,a[d].data,a[d].preload,b);return c},e.removeSound=function(a,c){if(null==e.activePlugin)return!1;if(a instanceof Object&&(a=a.src),a=e._getSrcById(a),e.alternateExtensions.length)var d=e._parsePath2(a);else var d=e._parsePath(a);if(null==d)return!1;null!=c&&(d.src=c+d.src),a=d.src;for(var f in e._idHash)e._idHash[f]==a&&delete e._idHash[f];return b.removeSrc(a),delete e._preloadHash[a],e.activePlugin.removeSound(a),!0},e.removeManifest=function(a,b){for(var c=[],d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.removeSound(a[d].src,b);return c},e.removeAllSounds=function(){e._idHash={},e._preloadHash={},b.removeAll(),e.activePlugin.removeAllSounds()},e.loadComplete=function(a){if(e.alternateExtensions.length)var b=e._parsePath2(a,"sound");else var b=e._parsePath(a,"sound");return a=b?e._getSrcById(b.src):e._getSrcById(a),1==e._preloadHash[a][0]},e._parsePath=function(a,b,c,d){"string"!=typeof a&&(a=a.toString());var f=a.split(e.DELIMITER);if(f.length>1)try{console.log('createjs.Sound.DELIMITER "|" loading approach has been deprecated. Please use the new alternateExtensions property.')}catch(g){}for(var h={type:b||"sound",id:c,data:d},i=e.getCapabilities(),j=0,k=f.length;k>j;j++){var l=f[j],m=l.match(e.FILE_PATTERN);if(null==m)return!1;var n=m[4],o=m[5];if(i[o]&&createjs.indexOf(e.SUPPORTED_EXTENSIONS,o)>-1)return h.name=n,h.src=l,h.extension=o,h}return null},e._parsePath2=function(a,b,c,d){"string"!=typeof a&&(a=a.toString());var f=a.match(e.FILE_PATTERN);if(null==f)return!1;for(var g=f[4],h=f[5],i=e.getCapabilities(),j=0;!i[h];)if(h=e.alternateExtensions[j++],j>e.alternateExtensions.length)return null;a=a.replace("."+f[5],"."+h);var k={type:b||"sound",id:c,data:d};return k.name=g,k.src=a,k.extension=h,k},e.play=function(a,b,c,d,f,g,h){var i=e.createInstance(a),j=e._playInstance(i,b,c,d,f,g,h);return j||i.playFailed(),i},e.createInstance=function(c){if(!e.initializeDefaultPlugins())return e._defaultSoundInstance;if(c=e._getSrcById(c),e.alternateExtensions.length)var d=e._parsePath2(c,"sound");else var d=e._parsePath(c,"sound");var f=null;return null!=d&&null!=d.src?(b.create(d.src),f=e.activePlugin.create(d.src)):f=a._defaultSoundInstance,f.uniqueId=e._lastID++,f},e.setVolume=function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),e._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterVolume(a)},e.getVolume=function(){return e._masterVolume},e.setMute=function(a){if(null==a||void 0==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0},e.getMute=function(){return this._masterMute},e.stop=function(){for(var a=this._instances,b=a.length;b--;)a[b].stop()},e._playInstance=function(a,b,c,d,f,g,h){if(b instanceof Object&&(c=b.delay,d=b.offset,f=b.loop,g=b.volume,h=b.pan,b=b.interrupt),b=b||e.defaultInterruptBehavior,null==c&&(c=0),null==d&&(d=a.getPosition()),null==f&&(f=0),null==g&&(g=a.volume),null==h&&(h=a.pan),0==c){var i=e._beginPlaying(a,b,d,f,g,h);if(!i)return!1}else{var j=setTimeout(function(){e._beginPlaying(a,b,d,f,g,h)},c);a._delayTimeoutId=j}return this._instances.push(a),!0},e._beginPlaying=function(a,c,d,e,f,g){if(!b.add(a,c))return!1;var h=a._beginPlaying(d,e,f,g);if(!h){var i=createjs.indexOf(this._instances,a);return i>-1&&this._instances.splice(i,1),!1}return!0},e._getSrcById=function(a){return null==e._idHash||null==e._idHash[a]?a:e._idHash[a]},e._playFinished=function(a){b.remove(a);var c=createjs.indexOf(this._instances,a);c>-1&&this._instances.splice(c,1)},createjs.Sound=a,b.channels={},b.create=function(a,c){var d=b.get(a);return null==d?(b.channels[a]=new b(a,c),!0):!1},b.removeSrc=function(a){var c=b.get(a);return null==c?!1:(c.removeAll(),delete b.channels[a],!0)},b.removeAll=function(){for(var a in b.channels)b.channels[a].removeAll();b.channels={}},b.add=function(a,c){var d=b.get(a.src);return null==d?!1:d.add(a,c)},b.remove=function(a){var c=b.get(a.src);return null==c?!1:(c.remove(a),!0)},b.maxPerChannel=function(){return f.maxDefault},b.get=function(a){return b.channels[a]};var f=b.prototype;f.src=null,f.max=null,f.maxDefault=100,f.length=0,f.init=function(a,b){this.src=a,this.max=b||this.maxDefault,-1==this.max&&(this.max=this.maxDefault),this._instances=[]},f.get=function(a){return this._instances[a]},f.add=function(a,b){return this.getSlot(b,a)?(this._instances.push(a),this.length++,!0):!1},f.remove=function(a){var b=createjs.indexOf(this._instances,a);return-1==b?!1:(this._instances.splice(b,1),this.length--,!0)},f.removeAll=function(){for(var a=this.length-1;a>=0;a--)this._instances[a].stop()},f.getSlot=function(b){for(var c,d,e=0,f=this.max;f>e;e++){if(c=this.get(e),null==c)return!0;(b!=a.INTERRUPT_NONE||c.playState==a.PLAY_FINISHED)&&(0!=e?c.playState==a.PLAY_FINISHED||c.playState==a.PLAY_INTERRUPTED||c.playState==a.PLAY_FAILED?d=c:(b==a.INTERRUPT_EARLY&&c.getPosition()<d.getPosition()||b==a.INTERRUPT_LATE&&c.getPosition()>d.getPosition())&&(d=c):d=c)}return null!=d?(d._interrupt(),this.remove(d),!0):!1},f.toString=function(){return"[Sound SoundChannel]"},a._defaultSoundInstance=new c,d.init=function(){var a=window.navigator.userAgent;d.isFirefox=a.indexOf("Firefox")>-1,d.isOpera=null!=window.opera,d.isChrome=a.indexOf("Chrome")>-1,d.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1,d.isAndroid=a.indexOf("Android")>-1,d.isBlackberry=a.indexOf("Blackberry")>-1},d.init(),createjs.Sound.BrowserDetect=d}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._init()}var b=a;b._capabilities=null,b.isSupported=function(){var a=createjs.Sound.BrowserDetect.isIOS||createjs.Sound.BrowserDetect.isAndroid||createjs.Sound.BrowserDetect.isBlackberry;return"file:"!=location.protocol||a||this._isFileXHRSupported()?(b._generateCapabilities(),null==b.context?!1:!0):!1},b._isFileXHRSupported=function(){var a=!0,b=new XMLHttpRequest;try{b.open("GET","fail.fail",!1)}catch(c){return a=!1}b.onerror=function(){a=!1},b.onload=function(){a=404==this.status||200==this.status||0==this.status&&""!=this.response};try{b.send()}catch(c){a=!1}return a},b._generateCapabilities=function(){if(null==b._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(window.webkitAudioContext)b.context=new webkitAudioContext;else{if(!window.AudioContext)return null;b.context=new AudioContext}b._compatibilitySetUp(),b.playEmptySound(),b._capabilities={panning:!0,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}b.context.destination.numberOfChannels<2&&(b._capabilities.panning=!1),b.dynamicsCompressorNode=b.context.createDynamicsCompressor(),b.dynamicsCompressorNode.connect(b.context.destination),b.gainNode=b.context.createGain(),b.gainNode.connect(b.dynamicsCompressorNode)}},b._compatibilitySetUp=function(){if(!b.context.createGain){b.context.createGain=b.context.createGainNode;var a=b.context.createBufferSource();a.__proto__.start=a.__proto__.noteGrainOn,a.__proto__.stop=a.__proto__.noteOff,this._panningModel=0}},b.playEmptySound=function(){var a=this.context.createBuffer(1,1,22050),b=this.context.createBufferSource();b.buffer=a,b.connect(this.context.destination),b.start(0,0,0)};var c=a.prototype;c._capabilities=null,c._volume=1,c.context=null,c._panningModel="equalpower",c.dynamicsCompressorNode=null,c.gainNode=null,c._arrayBuffers=null,c._init=function(){this._capabilities=b._capabilities,this._arrayBuffers={},this.context=b.context,this.gainNode=b.gainNode,this.dynamicsCompressorNode=b.dynamicsCompressorNode},c.register=function(a){this._arrayBuffers[a]=!0;var b=new createjs.WebAudioPlugin.Loader(a,this);return{tag:b}},c.isPreloadStarted=function(a){return null!=this._arrayBuffers[a]},c.isPreloadComplete=function(a){return!(null==this._arrayBuffers[a]||1==this._arrayBuffers[a])},c.removeSound=function(a){delete this._arrayBuffers[a]},c.removeAllSounds=function(){this._arrayBuffers={}},c.addPreloadResults=function(a,b){this._arrayBuffers[a]=b},c._handlePreloadComplete=function(){createjs.Sound._sendFileLoadEvent(this.src)},c.preload=function(a){this._arrayBuffers[a]=!0;var b=new createjs.WebAudioPlugin.Loader(a,this);b.onload=this._handlePreloadComplete,b.load()},c.create=function(a){return this.isPreloadStarted(a)||this.preload(a),new createjs.WebAudioPlugin.SoundInstance(a,this)},c.setVolume=function(a){return this._volume=a,this._updateVolume(),!0},c._updateVolume=function(){var a=createjs.Sound._masterMute?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},c.getVolume=function(){return this._volume},c.setMute=function(){return this._updateVolume(),!0},c.toString=function(){return"[WebAudioPlugin]"},createjs.WebAudioPlugin=a}(),function(){"use strict";function a(a,b){this._init(a,b)}var b=a.prototype=new createjs.EventDispatcher;b.src=null,b.uniqueId=-1,b.playState=null,b._owner=null,b._offset=0,b._delay=0,b._volume=1;try{Object.defineProperty(b,"volume",{get:function(){return this._volume},set:function(a){return null==Number(a)?!1:(a=Math.max(0,Math.min(1,a)),this._volume=a,this._updateVolume(),void 0)}})}catch(c){}b._pan=0;try{Object.defineProperty(b,"pan",{get:function(){return this._pan},set:function(a){return this._owner._capabilities.panning&&null!=Number(a)?(a=Math.max(-1,Math.min(1,a)),this._pan=a,this.panNode.setPosition(a,0,-.5),void 0):!1}})}catch(c){}b._duration=0,b._remainingLoops=0,b._delayTimeoutId=null,b._soundCompleteTimeout=null,b.gainNode=null,b.panNode=null,b.sourceNode=null,b._sourceNodeNext=null,b._muted=!1,b._paused=!1,b._startTime=0,b._endedHandler=null,b._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},b._init=function(a,b){this._owner=b,this.src=a,this.gainNode=this._owner.context.createGain(),this.panNode=this._owner.context.createPanner(),this.panNode.panningModel=this._owner._panningModel,this.panNode.connect(this.gainNode),this._owner.isPreloadComplete(this.src)&&(this._duration=1e3*this._owner._arrayBuffers[this.src].duration),this._endedHandler=createjs.proxy(this._handleSoundComplete,this)},b._cleanUp=function(){this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._delayTimeoutId),clearTimeout(this._soundCompleteTimeout),this._startTime=0,null!=window.createjs&&createjs.Sound._playFinished(this)},b._cleanUpAudioNode=function(a){return a&&(a.stop(0),a.disconnect(this.panNode),a=null),a},b._interrupt=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_INTERRUPTED,this._paused=!1,this._sendEvent("interrupted")},b._handleSoundReady=function(){if(null!=window.createjs){if(1e3*this._offset>this.getDuration())return this.playFailed(),void 0;this._offset<0&&(this._offset=0),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._paused=!1,this.gainNode.connect(this._owner.gainNode);var a=this._owner._arrayBuffers[this.src].duration;this.sourceNode=this._createAndPlayAudioNode(this._owner.context.currentTime-a,this._offset),this._duration=1e3*a,this._startTime=this.sourceNode.startTime-this._offset,this._soundCompleteTimeout=setTimeout(this._endedHandler,1e3*(a-this._offset)),0!=this._remainingLoops&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._startTime,0))}},b._createAndPlayAudioNode=function(a,b){var c=this._owner.context.createBufferSource();return c.buffer=this._owner._arrayBuffers[this.src],c.connect(this.panNode),this._owner.context.currentTime,c.startTime=a+c.buffer.duration,c.start(c.startTime,b,c.buffer.duration-b),c},b.play=function(a,b,c,d,e,f){this._cleanUp(),createjs.Sound._playInstance(this,a,b,c,d,e,f)},b._beginPlaying=function(a,b,c,d){return null!=window.createjs&&this.src?(this._offset=a/1e3,this._remainingLoops=b,this.volume=c,this.pan=d,this._owner.isPreloadComplete(this.src)?(this._handleSoundReady(null),this._sendEvent("succeeded"),1):(this.playFailed(),void 0)):void 0},b.pause=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED?!1:(this._paused=!0,this._offset=this._owner.context.currentTime-this._startTime,this._cleanUpAudioNode(this.sourceNode),this._cleanUpAudioNode(this._sourceNodeNext),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(),clearTimeout(this._delayTimeoutId),clearTimeout(this._soundCompleteTimeout),!0)},b.resume=function(){return this._paused?(this._handleSoundReady(null),!0):!1},b.stop=function(){return this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this._offset=0,!0},b.setVolume=function(a){return this.volume=a,!0},b._updateVolume=function(){var a=this._muted?0:this._volume;return a!=this.gainNode.gain.value?(this.gainNode.gain.value=a,!0):!1},b.getVolume=function(){return this.volume},b.setMute=function(a){return null==a||void 0==a?!1:(this._muted=a,this._updateVolume(),!0)},b.getMute=function(){return this._muted},b.setPan=function(a){return this.pan=a,this.pan!=a?!1:void 0},b.getPan=function(){return this.pan},b.getPosition=function(){if(this._paused||null==this.sourceNode)var a=this._offset;else var a=this._owner.context.currentTime-this._startTime;return 1e3*a},b.setPosition=function(a){return this._offset=a/1e3,this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._cleanUpAudioNode(this.sourceNode),this._cleanUpAudioNode(this._sourceNodeNext),clearTimeout(this._soundCompleteTimeout)),this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||this._handleSoundReady(null),!0},b.getDuration=function(){return this._duration},b._handleSoundComplete=function(){return this._offset=0,0!=this._remainingLoops?(this._remainingLoops--,this._sourceNodeNext?(this._cleanUpAudioNode(this.sourceNode),this.sourceNode=this._sourceNodeNext,this._startTime=this.sourceNode.startTime,this._sourceNodeNext=this._createAndPlayAudioNode(this._startTime,0),this._soundCompleteTimeout=setTimeout(this._endedHandler,this._duration)):this._handleSoundReady(null),this._sendEvent("loop"),void 0):(null!=window.createjs&&(this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this._sendEvent("complete")),void 0)},b.playFailed=function(){null!=window.createjs&&(this._cleanUp(),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed"))},b.toString=function(){return"[WebAudioPlugin SoundInstance]"},createjs.WebAudioPlugin.SoundInstance=a}(),function(){"use strict";function a(a,b){this._init(a,b)}var b=a.prototype;b.request=null,b.owner=null,b.progress=-1,b.src=null,b.originalSrc=null,b.result=null,b.onload=null,b.onprogress=null,b.onError=null,b._init=function(a,b){this.src=a,this.originalSrc=a,this.owner=b},b.load=function(a){null!=a&&(this.src=a),this.request=new XMLHttpRequest,this.request.open("GET",this.src,!0),this.request.responseType="arraybuffer",this.request.onload=createjs.proxy(this.handleLoad,this),this.request.onError=createjs.proxy(this.handleError,this),this.request.onprogress=createjs.proxy(this.handleProgress,this),this.request.send()},b.handleProgress=function(a,b){this.progress=a/b,null!=this.onprogress&&this.onprogress({loaded:a,total:b,progress:this.progress})},b.handleLoad=function(){this.owner.context.decodeAudioData(this.request.response,createjs.proxy(this.handleAudioDecoded,this),createjs.proxy(this.handleError,this))},b.handleAudioDecoded=function(a){this.progress=1,this.result=a,this.src=this.originalSrc,this.owner.addPreloadResults(this.src,this.result),this.onload&&this.onload()},b.handleError=function(a){this.owner.removeSound(this.src),this.onerror&&this.onerror(a)},b.toString=function(){return"[WebAudioPlugin Loader]"},createjs.WebAudioPlugin.Loader=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._init()}var b=a;b.MAX_INSTANCES=30,b._AUDIO_READY="canplaythrough",b._AUDIO_ENDED="ended",b._AUDIO_SEEKED="seeked",b._AUDIO_STALLED="stalled",b._capabilities=null,b.enableIOS=!1,b.isSupported=function(){if(createjs.Sound.BrowserDetect.isIOS&&!b.enableIOS)return!1;b._generateCapabilities();var a=b.tag;return null==a||null==b._capabilities?!1:!0
},b._generateCapabilities=function(){if(null==b._capabilities){var a=b.tag=document.createElement("audio");if(null==a.canPlayType)return null;b._capabilities={panning:!0,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}}};var c=a.prototype;c._capabilities=null,c._audioSources=null,c.defaultNumChannels=2,c.loadedHandler=null,c._init=function(){this._capabilities=b._capabilities,this._audioSources={}},c.register=function(a,b){this._audioSources[a]=!0;for(var c=createjs.HTMLAudioPlugin.TagPool.get(a),d=null,e=b||this.defaultNumChannels,f=0;e>f;f++)d=this._createTag(a),c.add(d);if(d.id=a,this.loadedHandler=createjs.proxy(this._handleTagLoad,this),d.addEventListener&&d.addEventListener("canplaythrough",this.loadedHandler),null==d.onreadystatechange)d.onreadystatechange=this.loadedHandler;else{var g=d.onreadystatechange;d.onreadystatechange=function(){g(),this.loadedHandler()}}return{tag:d,numChannels:e}},c._handleTagLoad=function(a){a.target.removeEventListener&&a.target.removeEventListener("canplaythrough",this.loadedHandler),a.target.onreadystatechange=null,a.target.src!=a.target.id&&createjs.HTMLAudioPlugin.TagPool.checkSrc(a.target.id)},c._createTag=function(a){var b=document.createElement("audio");return b.autoplay=!1,b.preload="none",b.src=a,b},c.removeSound=function(a){delete this._audioSources[a],createjs.HTMLAudioPlugin.TagPool.remove(a)},c.removeAllSounds=function(){this._audioSources={},createjs.HTMLAudioPlugin.TagPool.removeAll()},c.create=function(a){if(!this.isPreloadStarted(a)){var b=createjs.HTMLAudioPlugin.TagPool.get(a),c=this._createTag(a);c.id=a,b.add(c),this.preload(a,{tag:c})}return new createjs.HTMLAudioPlugin.SoundInstance(a,this)},c.isPreloadStarted=function(a){return null!=this._audioSources[a]},c.preload=function(a,b){this._audioSources[a]=!0,new createjs.HTMLAudioPlugin.Loader(a,b.tag)},c.toString=function(){return"[HTMLAudioPlugin]"},createjs.HTMLAudioPlugin=a}(),function(){"use strict";function a(a,b){this._init(a,b)}var b=a.prototype=new createjs.EventDispatcher;b.src=null,b.uniqueId=-1,b.playState=null,b._owner=null,b.loaded=!1,b._offset=0,b._delay=0,b._volume=1;try{Object.defineProperty(b,"volume",{get:function(){return this._volume},set:function(a){null!=Number(a)&&(a=Math.max(0,Math.min(1,a)),this._volume=a,this._updateVolume())}})}catch(c){}b.pan=0,b._duration=0,b._remainingLoops=0,b._delayTimeoutId=null,b.tag=null,b._muted=!1,b._paused=!1,b._endedHandler=null,b._readyHandler=null,b._stalledHandler=null,b.loopHandler=null,b._init=function(a,b){this.src=a,this._owner=b,this._endedHandler=createjs.proxy(this._handleSoundComplete,this),this._readyHandler=createjs.proxy(this._handleSoundReady,this),this._stalledHandler=createjs.proxy(this._handleSoundStalled,this),this.loopHandler=createjs.proxy(this.handleSoundLoop,this)},b._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},b._cleanUp=function(){var a=this.tag;if(null!=a){a.pause(),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this.loopHandler,!1);try{a.currentTime=0}catch(b){}createjs.HTMLAudioPlugin.TagPool.setInstance(this.src,a),this.tag=null}clearTimeout(this._delayTimeoutId),null!=window.createjs&&createjs.Sound._playFinished(this)},b._interrupt=function(){null!=this.tag&&(this.playState=createjs.Sound.PLAY_INTERRUPTED,this._cleanUp(),this._paused=!1,this._sendEvent("interrupted"))},b.play=function(a,b,c,d,e,f){this._cleanUp(),createjs.Sound._playInstance(this,a,b,c,d,e,f)},b._beginPlaying=function(a,b,c,d){if(null==window.createjs)return-1;var e=this.tag=createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);return null==e?(this.playFailed(),-1):(e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._offset=a,this.volume=c,this.pan=d,this._updateVolume(),this._remainingLoops=b,4!==e.readyState?(e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),e.preload="auto",e.load()):this._handleSoundReady(null),this._sendEvent("succeeded"),1)},b._handleSoundStalled=function(){this._cleanUp(),this._sendEvent("failed")},b._handleSoundReady=function(){if(null!=window.createjs){if(this._duration=1e3*this.tag.duration,this.playState=createjs.Sound.PLAY_SUCCEEDED,this._paused=!1,this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),this._offset>=this.getDuration())return this.playFailed(),void 0;this._offset>0&&(this.tag.currentTime=.001*this._offset),-1==this._remainingLoops&&(this.tag.loop=!0),0!=this._remainingLoops&&(this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this.loopHandler,!1),this.tag.loop=!0),this.tag.play()}},b.pause=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||null==this.tag?!1:(this._paused=!0,this.tag.pause(),clearTimeout(this._delayTimeoutId),!0)},b.resume=function(){return this._paused&&null!=this.tag?(this._paused=!1,this.tag.play(),!0):!1},b.stop=function(){return this._offset=0,this.pause(),this.playState=createjs.Sound.PLAY_FINISHED,this._cleanUp(),!0},b.setMasterVolume=function(){return this._updateVolume(),!0},b.setVolume=function(a){return this.volume=a,!0},b._updateVolume=function(){if(null!=this.tag){var a=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;return a!=this.tag.volume&&(this.tag.volume=a),!0}return!1},b.getVolume=function(){return this.volume},b.setMasterMute=function(){return this._updateVolume(),!0},b.setMute=function(a){return null==a||void 0==a?!1:(this._muted=a,this._updateVolume(),!0)},b.getMute=function(){return this._muted},b.setPan=function(){return!1},b.getPan=function(){return 0},b.getPosition=function(){return null==this.tag?this._offset:1e3*this.tag.currentTime},b.setPosition=function(a){if(null==this.tag)this._offset=a;else{this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this.loopHandler,!1);try{this.tag.currentTime=.001*a}catch(b){return!1}this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this.loopHandler,!1)}return!0},b.getDuration=function(){return this._duration},b._handleSoundComplete=function(){this._offset=0,null!=window.createjs&&(this.playState=createjs.Sound.PLAY_FINISHED,this._cleanUp(),this._sendEvent("complete"))},b.handleSoundLoop=function(){this._offset=0,this._remainingLoops--,0==this._remainingLoops&&(this.tag.loop=!1,this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this.loopHandler,!1)),this._sendEvent("loop")},b.playFailed=function(){null!=window.createjs&&(this.playState=createjs.Sound.PLAY_FAILED,this._cleanUp(),this._sendEvent("failed"))},b.toString=function(){return"[HTMLAudioPlugin SoundInstance]"},createjs.HTMLAudioPlugin.SoundInstance=a}(),function(){"use strict";function a(a,b){this._init(a,b)}var b=a.prototype;b.src=null,b.tag=null,b.preloadTimer=null,b.loadedHandler=null,b._init=function(a,b){if(this.src=a,this.tag=b,this.preloadTimer=setInterval(createjs.proxy(this.preloadTick,this),200),this.loadedHandler=createjs.proxy(this.sendLoadedEvent,this),this.tag.addEventListener&&this.tag.addEventListener("canplaythrough",this.loadedHandler),null==this.tag.onreadystatechange)this.tag.onreadystatechange=createjs.proxy(this.sendLoadedEvent,this);else{var c=this.tag.onreadystatechange;this.tag.onreadystatechange=function(){c(),this.tag.onreadystatechange=createjs.proxy(this.sendLoadedEvent,this)}}this.tag.preload="auto",this.tag.load()},b.preloadTick=function(){var a=this.tag.buffered,b=this.tag.duration;a.length>0&&a.end(0)>=b-1&&this.handleTagLoaded()},b.handleTagLoaded=function(){clearInterval(this.preloadTimer)},b.sendLoadedEvent=function(){this.tag.removeEventListener&&this.tag.removeEventListener("canplaythrough",this.loadedHandler),this.tag.onreadystatechange=null,createjs.Sound._sendFileLoadEvent(this.src)},b.toString=function(){return"[HTMLAudioPlugin Loader]"},createjs.HTMLAudioPlugin.Loader=a}(),function(){"use strict";function a(a){this._init(a)}var b=a;b.tags={},b.get=function(c){var d=b.tags[c];return null==d&&(d=b.tags[c]=new a(c)),d},b.remove=function(a){var c=b.tags[a];return null==c?!1:(c.removeAll(),delete b.tags[a],!0)},b.removeAll=function(){for(var a in b.tags)b.tags[a].removeAll();b.tags={}},b.getInstance=function(a){var c=b.tags[a];return null==c?null:c.get()},b.setInstance=function(a,c){var d=b.tags[a];return null==d?null:d.set(c)},b.checkSrc=function(a){var c=b.tags[a];return null==c?null:(c.checkSrcChange(),void 0)};var c=a.prototype;c.src=null,c.length=0,c.available=0,c.tags=null,c._init=function(a){this.src=a,this.tags=[]},c.add=function(a){this.tags.push(a),this.length++,this.available++},c.removeAll=function(){for(;this.length--;)delete this.tags[this.length];this.src=null,this.tags.length=0},c.get=function(){if(0==this.tags.length)return null;this.available=this.tags.length;var a=this.tags.pop();return null==a.parentNode&&document.body.appendChild(a),a},c.set=function(a){var b=createjs.indexOf(this.tags,a);-1==b&&this.tags.push(a),this.available=this.tags.length},c.checkSrcChange=function(){for(var a=this.tags.length-1,b=this.tags[a].src;a--;)this.tags[a].src=b},c.toString=function(){return"[HTMLAudioPlugin TagPool]"},createjs.HTMLAudioPlugin.TagPool=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.EventDispatcher;a.NONE=0,a.LOOP=1,a.REVERSE=2,a.IGNORE={},a._tweens=[],a._plugins={},a.get=function(b,c,d,e){return e&&a.removeTweens(b),new a(b,c,d)},a.tick=function(b,c){for(var d=a._tweens.slice(),e=d.length-1;e>=0;e--){var f=d[e];c&&!f.ignoreGlobalPause||f._paused||f.tick(f._useTicks?1:b)}},a.handleEvent=function(a){"tick"==a.type&&this.tick(a.delta,a.paused)},a.removeTweens=function(b){if(b.tweenjs_count){for(var c=a._tweens,d=c.length-1;d>=0;d--)c[d]._target==b&&(c[d]._paused=!0,c.splice(d,1));b.tweenjs_count=0}},a.removeAllTweens=function(){for(var b=a._tweens,c=0,d=b.length;d>c;c++){var e=b[c];e.paused=!0,e.target.tweenjs_count=0}b.length=0},a.hasActiveTweens=function(b){return b?b.tweenjs_count:a._tweens&&!!a._tweens.length},a.installPlugin=function(b,c){var d=b.priority;null==d&&(b.priority=d=0);for(var e=0,f=c.length,g=a._plugins;f>e;e++){var h=c[e];if(g[h]){for(var i=g[h],j=0,k=i.length;k>j&&!(d<i[j].priority);j++);g[h].splice(j,0,b)}else g[h]=[b]}},a._register=function(b,c){var d=b._target,e=a._tweens;if(c)d&&(d.tweenjs_count=d.tweenjs_count?d.tweenjs_count+1:1),e.push(b),!a._inited&&createjs.Ticker&&(createjs.Ticker.addEventListener("tick",a),a._inited=!0);else{d&&d.tweenjs_count--;for(var f=e.length;f--;)if(e[f]==b)return e.splice(f,1),void 0}},b.ignoreGlobalPause=!1,b.loop=!1,b.duration=0,b.pluginData=null,b.target=null,b.position=null,b.passive=!1,b._paused=!1,b._curQueueProps=null,b._initQueueProps=null,b._steps=null,b._actions=null,b._prevPosition=0,b._stepPosition=0,b._prevPos=-1,b._target=null,b._useTicks=!1,b._inited=!1,b.initialize=function(b,c,d){this.target=this._target=b,c&&(this._useTicks=c.useTicks,this.ignoreGlobalPause=c.ignoreGlobalPause,this.loop=c.loop,c.onChange&&this.addEventListener("change",c.onChange),c.override&&a.removeTweens(b)),this.pluginData=d||{},this._curQueueProps={},this._initQueueProps={},this._steps=[],this._actions=[],c&&c.paused?this._paused=!0:a._register(this,!0),c&&null!=c.position&&this.setPosition(c.position,a.NONE)},b.wait=function(a,b){if(null==a||0>=a)return this;var c=this._cloneProps(this._curQueueProps);return this._addStep({d:a,p0:c,e:this._linearEase,p1:c,v:b})},b.to=function(a,b,c){return(isNaN(b)||0>b)&&(b=0),this._addStep({d:b||0,p0:this._cloneProps(this._curQueueProps),e:c,p1:this._cloneProps(this._appendQueueProps(a))})},b.call=function(a,b,c){return this._addAction({f:a,p:b?b:[this],o:c?c:this._target})},b.set=function(a,b){return this._addAction({f:this._set,o:this,p:[a,b?b:this._target]})},b.play=function(a){return a||(a=this),this.call(a.setPaused,[!1],a)},b.pause=function(a){return a||(a=this),this.call(a.setPaused,[!0],a)},b.setPosition=function(a,b){0>a&&(a=0),null==b&&(b=1);var c=a,d=!1;if(c>=this.duration&&(this.loop?c%=this.duration:(c=this.duration,d=!0)),c==this._prevPos)return d;var e=this._prevPos;if(this.position=this._prevPos=c,this._prevPosition=a,this._target)if(d)this._updateTargetProps(null,1);else if(this._steps.length>0){for(var f=0,g=this._steps.length;g>f&&!(this._steps[f].t>c);f++);var h=this._steps[f-1];this._updateTargetProps(h,(this._stepPosition=c-h.t)/h.d)}return 0!=b&&this._actions.length>0&&(this._useTicks?this._runActions(c,c):1==b&&e>c?(e!=this.duration&&this._runActions(e,this.duration),this._runActions(0,c,!0)):this._runActions(e,c)),d&&this.setPaused(!0),this.dispatchEvent("change"),d},b.tick=function(a){this._paused||this.setPosition(this._prevPosition+a)},b.setPaused=function(b){return this._paused=!!b,a._register(this,!b),this},b.w=b.wait,b.t=b.to,b.c=b.call,b.s=b.set,b.toString=function(){return"[Tween]"},b.clone=function(){throw"Tween can not be cloned."},b._updateTargetProps=function(b,c){var d,e,f,g,h,i;if(b||1!=c){if(this.passive=!!b.v,this.passive)return;b.e&&(c=b.e(c,0,1,1)),d=b.p0,e=b.p1}else this.passive=!1,d=e=this._curQueueProps;for(var j in this._initQueueProps){null==(g=d[j])&&(d[j]=g=this._initQueueProps[j]),null==(h=e[j])&&(e[j]=h=g),f=g==h||0==c||1==c||"number"!=typeof g?1==c?h:g:g+(h-g)*c;var k=!1;if(i=a._plugins[j])for(var l=0,m=i.length;m>l;l++){var n=i[l].tween(this,j,f,d,e,c,!!b&&d==e,!b);n==a.IGNORE?k=!0:f=n}k||(this._target[j]=f)}},b._runActions=function(a,b,c){var d=a,e=b,f=-1,g=this._actions.length,h=1;for(a>b&&(d=b,e=a,f=g,g=h=-1);(f+=h)!=g;){var i=this._actions[f],j=i.t;(j==e||j>d&&e>j||c&&j==a)&&i.f.apply(i.o,i.p)}},b._appendQueueProps=function(b){var c,d,e,f,g;for(var h in b)if(void 0===this._initQueueProps[h]){if(d=this._target[h],c=a._plugins[h])for(e=0,f=c.length;f>e;e++)d=c[e].init(this,h,d);this._initQueueProps[h]=this._curQueueProps[h]=void 0===d?null:d}else d=this._curQueueProps[h];for(var h in b){if(d=this._curQueueProps[h],c=a._plugins[h])for(g=g||{},e=0,f=c.length;f>e;e++)c[e].step&&c[e].step(this,h,d,b[h],g);this._curQueueProps[h]=b[h]}return g&&this._appendQueueProps(g),this._curQueueProps},b._cloneProps=function(a){var b={};for(var c in a)b[c]=a[c];return b},b._addStep=function(a){return a.d>0&&(this._steps.push(a),a.t=this.duration,this.duration+=a.d),this},b._addAction=function(a){return a.t=this.duration,this._actions.push(a),this},b._set=function(a,b){for(var c in a)b[c]=a[c]},createjs.Tween=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.EventDispatcher;b.ignoreGlobalPause=!1,b.duration=0,b.loop=!1,b.position=null,b._paused=!1,b._tweens=null,b._labels=null,b._labelList=null,b._prevPosition=0,b._prevPos=-1,b._useTicks=!1,b.initialize=function(a,b,c){this._tweens=[],c&&(this._useTicks=c.useTicks,this.loop=c.loop,this.ignoreGlobalPause=c.ignoreGlobalPause,c.onChange&&this.addEventListener("change",c.onChange)),a&&this.addTween.apply(this,a),this.setLabels(b),c&&c.paused?this._paused=!0:createjs.Tween._register(this,!0),c&&null!=c.position&&this.setPosition(c.position,createjs.Tween.NONE)},b.addTween=function(a){var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addTween(arguments[c]);return arguments[0]}return 0==b?null:(this.removeTween(a),this._tweens.push(a),a.setPaused(!0),a._paused=!1,a._useTicks=this._useTicks,a.duration>this.duration&&(this.duration=a.duration),this._prevPos>=0&&a.setPosition(this._prevPos,createjs.Tween.NONE),a)},b.removeTween=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeTween(arguments[d]);return c}if(0==b)return!1;for(var e=this._tweens,d=e.length;d--;)if(e[d]==a)return e.splice(d,1),a.duration>=this.duration&&this.updateDuration(),!0;return!1},b.addLabel=function(a,b){this._labels[a]=b;var c=this._labelList;if(c){for(var d=0,e=c.length;e>d&&!(b<c[d].position);d++);c.splice(d,0,{label:a,position:b})}},b.setLabels=function(a){this._labels=a?a:{}},b.getLabels=function(){var a=this._labelList;if(!a){a=this._labelList=[];var b=this._labels;for(var c in b)a.push({label:c,position:b[c]});a.sort(function(a,b){return a.position-b.position})}return a},b.getCurrentLabel=function(){var a=this.getLabels(),b=this.position,c=a.length;if(c){for(var d=0;c>d&&!(b<a[d].position);d++);return 0==d?null:a[d-1].label}return null},b.gotoAndPlay=function(a){this.setPaused(!1),this._goto(a)},b.gotoAndStop=function(a){this.setPaused(!0),this._goto(a)},b.setPosition=function(a,b){0>a&&(a=0);var c=this.loop?a%this.duration:a,d=!this.loop&&a>=this.duration;if(c==this._prevPos)return d;this._prevPosition=a,this.position=this._prevPos=c;for(var e=0,f=this._tweens.length;f>e;e++)if(this._tweens[e].setPosition(c,b),c!=this._prevPos)return!1;return d&&this.setPaused(!0),this.dispatchEvent("change"),d},b.setPaused=function(a){this._paused=!!a,createjs.Tween._register(this,!a)},b.updateDuration=function(){this.duration=0;for(var a=0,b=this._tweens.length;b>a;a++){var c=this._tweens[a];c.duration>this.duration&&(this.duration=c.duration)}},b.tick=function(a){this.setPosition(this._prevPosition+a)},b.resolve=function(a){var b=parseFloat(a);return isNaN(b)&&(b=this._labels[a]),b},b.toString=function(){return"[Timeline]"},b.clone=function(){throw"Timeline can not be cloned."},b._goto=function(a){var b=this.resolve(a);null!=b&&this.setPosition(b)},createjs.Timeline=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"Ease cannot be instantiated."};a.linear=function(a){return a},a.none=a.linear,a.get=function(a){return-1>a&&(a=-1),a>1&&(a=1),function(b){return 0==a?b:0>a?b*(b*-a+1+a):b*((2-b)*a+(1-a))}},a.getPowIn=function(a){return function(b){return Math.pow(b,a)}},a.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}},a.getPowInOut=function(a){return function(b){return(b*=2)<1?.5*Math.pow(b,a):1-.5*Math.abs(Math.pow(2-b,a))}},a.quadIn=a.getPowIn(2),a.quadOut=a.getPowOut(2),a.quadInOut=a.getPowInOut(2),a.cubicIn=a.getPowIn(3),a.cubicOut=a.getPowOut(3),a.cubicInOut=a.getPowInOut(3),a.quartIn=a.getPowIn(4),a.quartOut=a.getPowOut(4),a.quartInOut=a.getPowInOut(4),a.quintIn=a.getPowIn(5),a.quintOut=a.getPowOut(5),a.quintInOut=a.getPowInOut(5),a.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)},a.sineOut=function(a){return Math.sin(a*Math.PI/2)},a.sineInOut=function(a){return-.5*(Math.cos(Math.PI*a)-1)},a.getBackIn=function(a){return function(b){return b*b*((a+1)*b-a)}},a.backIn=a.getBackIn(1.7),a.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}},a.backOut=a.getBackOut(1.7),a.getBackInOut=function(a){return a*=1.525,function(b){return(b*=2)<1?.5*b*b*((a+1)*b-a):.5*((b-=2)*b*((a+1)*b+a)+2)}},a.backInOut=a.getBackInOut(1.7),a.circIn=function(a){return-(Math.sqrt(1-a*a)-1)},a.circOut=function(a){return Math.sqrt(1- --a*a)},a.circInOut=function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},a.bounceIn=function(b){return 1-a.bounceOut(1-b)},a.bounceOut=function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},a.bounceInOut=function(b){return.5>b?.5*a.bounceIn(2*b):.5*a.bounceOut(2*b-1)+.5},a.getElasticIn=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return-(a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b))}},a.elasticIn=a.getElasticIn(1,.3),a.getElasticOut=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return a*Math.pow(2,-10*d)*Math.sin((d-e)*c/b)+1}},a.elasticOut=a.getElasticOut(1,.3),a.getElasticInOut=function(a,b){var c=2*Math.PI;return function(d){var e=b/c*Math.asin(1/a);return(d*=2)<1?-.5*a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b):.5*a*Math.pow(2,-10*(d-=1))*Math.sin((d-e)*c/b)+1}},a.elasticInOut=a.getElasticInOut(1,.3*1.5),createjs.Ease=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"MotionGuidePlugin cannot be instantiated."};a.priority=0,a._rotOffS,a._rotOffE,a._rotNormS,a._rotNormE,a.install=function(){return createjs.Tween.installPlugin(a,["guide","x","y","rotation"]),createjs.Tween.IGNORE},a.init=function(a,b,c){var d=a.target;return d.hasOwnProperty("x")||(d.x=0),d.hasOwnProperty("y")||(d.y=0),d.hasOwnProperty("rotation")||(d.rotation=0),"rotation"==b&&(a.__needsRot=!0),"guide"==b?null:c},a.step=function(b,c,d,e,f){if("rotation"==c&&(b.__rotGlobalS=d,b.__rotGlobalE=e,a.testRotData(b,f)),"guide"!=c)return e;var g,h=e;h.hasOwnProperty("path")||(h.path=[]);var i=h.path;if(h.hasOwnProperty("end")||(h.end=1),h.hasOwnProperty("start")||(h.start=d&&d.hasOwnProperty("end")&&d.path===i?d.end:0),h.hasOwnProperty("_segments")&&h._length)return e;var j=i.length,k=10;if(!(j>=6&&0==(j-2)%4))throw"invalid 'path' data, please see documentation for valid paths";h._segments=[],h._length=0;for(var l=2;j>l;l+=4){for(var m,n,o=i[l-2],p=i[l-1],q=i[l+0],r=i[l+1],s=i[l+2],t=i[l+3],u=o,v=p,w=0,x=[],y=1;k>=y;y++){var z=y/k,A=1-z;m=A*A*o+2*A*z*q+z*z*s,n=A*A*p+2*A*z*r+z*z*t,w+=x[x.push(Math.sqrt((g=m-u)*g+(g=n-v)*g))-1],u=m,v=n}h._segments.push(w),h._segments.push(x),h._length+=w}g=h.orient,h.orient=!0;var B={};return a.calc(h,h.start,B),b.__rotPathS=Number(B.rotation.toFixed(5)),a.calc(h,h.end,B),b.__rotPathE=Number(B.rotation.toFixed(5)),h.orient=!1,a.calc(h,h.end,f),h.orient=g,h.orient?(b.__guideData=h,a.testRotData(b,f),e):e},a.testRotData=function(a,b){if(void 0===a.__rotGlobalS||void 0===a.__rotGlobalE){if(a.__needsRot)return;a.__rotGlobalS=a.__rotGlobalE=void 0!==a._curQueueProps.rotation?a._curQueueProps.rotation:b.rotation=a.target.rotation||0}if(void 0!==a.__guideData){var c=a.__guideData,d=a.__rotGlobalE-a.__rotGlobalS,e=a.__rotPathE-a.__rotPathS,f=d-e;if("auto"==c.orient)f>180?f-=360:-180>f&&(f+=360);else if("cw"==c.orient){for(;0>f;)f+=360;0==f&&d>0&&180!=d&&(f+=360)}else if("ccw"==c.orient){for(f=d-(e>180?360-e:e);f>0;)f-=360;0==f&&0>d&&-180!=d&&(f-=360)}c.rotDelta=f,c.rotOffS=a.__rotGlobalS-a.__rotPathS,a.__rotGlobalS=a.__rotGlobalE=a.__guideData=a.__needsRot=void 0}},a.tween=function(b,c,d,e,f,g,h){var i=f.guide;if(void 0==i||i===e.guide)return d;if(i.lastRatio!=g){var j=(i.end-i.start)*(h?i.end:g)+i.start;switch(a.calc(i,j,b.target),i.orient){case"cw":case"ccw":case"auto":b.target.rotation+=i.rotOffS+i.rotDelta*g;break;case"fixed":default:b.target.rotation+=i.rotOffS}i.lastRatio=g}return"rotation"!=c||i.orient&&"false"!=i.orient?b.target[c]:d},a.calc=function(b,c,d){void 0==b._segments&&a.validate(b),void 0==d&&(d={x:0,y:0,rotation:0});for(var e=b._segments,f=b.path,g=b._length*c,h=e.length-2,i=0;g>e[i]&&h>i;)g-=e[i],i+=2;var j=e[i+1],k=0;for(h=j.length-1;g>j[k]&&h>k;)g-=j[k],k++;var l=k/++h+g/(h*j[k]);i=2*i+2;var m=1-l;return d.x=m*m*f[i-2]+2*m*l*f[i+0]+l*l*f[i+2],d.y=m*m*f[i-1]+2*m*l*f[i+1]+l*l*f[i+3],b.orient&&(d.rotation=57.2957795*Math.atan2((f[i+1]-f[i-1])*m+(f[i+3]-f[i+1])*l,(f[i+0]-f[i-2])*m+(f[i+2]-f[i+0])*l)),d},createjs.MotionGuidePlugin=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.TweenJS=createjs.TweenJS||{};a.version="NEXT",a.buildDate="Thu, 12 Dec 2013 23:37:07 GMT"}();
/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype=new createjs.Container;a.INDEPENDENT="independent",a.SINGLE_FRAME="single",a.SYNCHED="synched",b.mode,b.startPosition=0,b.loop=!0,b.currentFrame=0,b.timeline=null,b.paused=!1,b.actionsEnabled=!0,b.autoReset=!0,b.frameBounds=null,b._synchOffset=0,b._prevPos=-1,b._prevPosition=0,b._managed,b.Container_initialize=b.initialize,b.initialize=function(b,c,d,e){this.mode=b||a.INDEPENDENT,this.startPosition=c||0,this.loop=d;var f={paused:!0,position:c,useTicks:!0};this.Container_initialize(),this.timeline=new createjs.Timeline(null,e,f),this._managed={}},b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.Container_draw=b.draw,b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._updateTimeline(),this.Container_draw(a,b),!0)},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.getLabels=function(){return this.timeline.getLabels()},b.getCurrentLabel=function(){return this._updateTimeline(),this.timeline.getCurrentLabel()},b.clone=function(){throw"MovieClip cannot be cloned."},b.toString=function(){return"[MovieClip (name="+this.name+")]"},b.Container__tick=b._tick,b._tick=function(b){this.paused||this.mode!=a.INDEPENDENT||(this._prevPosition=this._prevPos<0?0:this._prevPosition+1,this._updateTimeline()),this.Container__tick(b)},b._goto=function(a){var b=this.timeline.resolve(a);null!=b&&(-1==this._prevPos&&(this._prevPos=0/0),this._prevPosition=b,this._updateTimeline())},b._reset=function(){this._prevPos=-1,this.currentFrame=0},b._updateTimeline=function(){var b=this.timeline,c=this.mode!=a.INDEPENDENT;if(b.loop=null==this.loop?!0:this.loop,c?b.setPosition(this.startPosition+(this.mode==a.SINGLE_FRAME?0:this._synchOffset),createjs.Tween.NONE):b.setPosition(this._prevPos<0?0:this._prevPosition,this.actionsEnabled?null:createjs.Tween.NONE),this._prevPosition=b._prevPosition,this._prevPos!=b._prevPos){this.currentFrame=this._prevPos=b._prevPos;for(var d in this._managed)this._managed[d]=1;for(var e=b._tweens,f=0,g=e.length;g>f;f++){var h=e[f],i=h._target;if(i!=this&&!h.passive){var j=h._stepPosition;i instanceof createjs.DisplayObject?this._addManagedChild(i,j):this._setState(i.state,j)}}var k=this.children;for(f=k.length-1;f>=0;f--){var l=k[f].id;1==this._managed[l]&&(this.removeChildAt(f),delete this._managed[l])}}},b._setState=function(a,b){if(a)for(var c=a.length-1;c>=0;c--){var d=a[c],e=d.t,f=d.p;for(var g in f)e[g]=f[g];this._addManagedChild(e,b)}},b._addManagedChild=function(b,c){b._off||(this.addChildAt(b,0),b instanceof a&&(b._synchOffset=c,b.mode==a.INDEPENDENT&&b.autoReset&&!this._managed[b.id]&&b._reset()),this._managed[b.id]=2)},b.Container__getBounds=b._getBounds,b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();return c||(this._updateTimeline(),this.frameBounds&&(c=this._rectangle.copy(this.frameBounds[this.currentFrame]))),c?this._transformBounds(c,a,b):this.Container__getBounds(a,b)},createjs.MovieClip=a;var c=function(){throw"MovieClipPlugin cannot be instantiated."};c.priority=100,c.install=function(){createjs.Tween.installPlugin(c,["startPosition"])},c.init=function(a,b,c){return c},c.step=function(){},c.tween=function(b,c,d,e,f,g){return b.target instanceof a?1==g?f[c]:e[c]:d},c.install()}();

/*
* Check if a particular value is undefined
* @return:[Boolean] - True if the value is undefined, false if it is defined
*/
function isUndefined ( value ) {
    "use strict";
    return ( typeof ( value ) === String ( undefined ) );
}

/*
* Check if a particular value is defined
* @return:[Boolean] - True if the value has been defined, false if it is undefined
*/
function isDefined ( value ) {
    "use strict";
    return ( typeof ( value ) !== String ( undefined ) );
}

function isEmpty ( value ) {
    "use strict"; 
    return ( typeof ( value ) === String ( undefined ) || value === null || value === false );
}

function setDefault ( value, defaultVal ) {
    "use strict";
    return ( isUndefined ( value ) ) ? defaultVal : value;
}

function isNumber ( value ) {
    "use strict";
    return !isNaN ( parseFloat ( value ) ) && isFinite ( value );
}
/**
* @param type:String - The type of the event
* @param data:Object - Any object containing extra information related to the event
* @param subclassReference:Object [optional] - Reference to a subclass object that is
*       invoking this as its base class constructor
*/
function BaseEvent ( type, data, subclassReference ) {
    "use strict";

    // private functions
    var _this = subclassReference || this;
    var _type;
    
    function _construct ( type, data ) {
        _type = type;
        
        _this.data = data;

        return _this;
    }

    /*
    * Get the type of this event
    * @return:String - String representing the type of this event
    */
    _this.getType = function(){
        return _type;
    }

    _this.toString = function () {
        return _type;
    }
    
    return _construct ( type, data, subclassReference);
} 
//require.include("weblib/event/BaseEvent");


/**
*   Provides a base for classes that can have listeners registered and can dispatch events
*/
function AbstractEventDispatcher ( reference ) {

    var _this = reference;
    var _listenerMap;

    function _construct () {
        _listenerMap = {};

        _this._listenerMap = _listenerMap;

        return _this;
    }

    _this.indexOfListener = function ( listener, context, listenerSet ) {
        
        for ( var i = 0; i < listenerSet.length; i++ ) 
            if ( listener === listenerSet [ i ].listener && context === listenerSet [ i ].context ) 
                return i;


        return -1;
    }

    _this.addEventListener = function ( event, listener, context ) {

        if ( !_this.hasEventListener ( event.toUpperCase (), listener, context ) ) {
            try {
                var listenerSet = _listenerMap [ event.toUpperCase () ];
                listenerSet.push ( { listener : listener, context : context } );
            } catch ( error ) {
                _listenerMap [ event.toUpperCase () ] = [ { listener : listener, context : context } ];
            }
        }
    }

    _this.removeEventListener = function ( event, listener, context ) {
        var listenerSet = _listenerMap [ event.toUpperCase () ];
        if ( listenerSet ) {
            var indexOf = _this.indexOfListener ( listener, context, listenerSet );
            if ( indexOf > -1 ) {
                listenerSet.splice ( indexOf, 1 );
            }
        }
    }

    _this.hasEventListener = function ( event, listener, context ) {

            // check if the
        var listenerSet = _listenerMap [ event.toUpperCase () ];
        if ( listenerSet ) {
            if ( _this.indexOfListener ( listener, context, listenerSet ) > -1 ) {
                return true;
            }
        }

        return false;
    }

    _this.dispatchEvent = function ( event, data ) {
        var listenerSet = _listenerMap [ String ( event ).toUpperCase () ];

        if ( listenerSet ) {

            //If this event already has at least one target set, append this object to the end of the target list
            if ( event.target instanceof Array ) {
                event.target.push ( _this );
            } else {
                event.target = [ _this ];
            } 

            for ( var i = 0; i < listenerSet.length; i++ ) {
            
                // maintains backwards compatibility
                if ( typeof ( event ) == "string" ) {
                    listenerSet [ i ].listener.apply ( listenerSet [ i ].context, [ _this, data ] );
                } else {

                    listenerSet [ i ].listener.apply ( listenerSet [ i ].context, [ event ] );
                }
                
            }
        }
    }
    
    _this.release = function () {

        for ( var property in _listenerMap ) {
            delete _listenerMap [ property ];
		}
    }

    return _construct ();
}
/* global //require, AbstractEventDispatcher */
//require.include("weblib/core/Util");
//require.include ("weblib/event/AbstractEventDispatcher");

/**
*	Class AbstractObject
*	Provides a base for all classes which includes:
*		Event Dispatching 
*		Child / Parent relationships
*		Component registration and removal
*/
function AbstractObject ( reference ) {
	"use strict";

	var _this = AbstractEventDispatcher ( reference );
	var _components;
	var _children;
	var _parent;
	var _id;

	function _construct  () {
		_children = [];
		_components = [];

		return _this;
	}

	_this.parent = function () {
		return _parent;
	};

	_this.id = function ( id ) {
		return ( isEmpty ( id ) ) ? id : _id = id;
	};

	_this.addChild = function ( gameObject ) {

			// first remove the child from the previous parent ( if one is available )
		var gameObjectParent = gameObject.parent ();
		if ( !empty ( gameObjectParent ) )
			gameObjectParent.removeChild ( gameObject );
		
			// just add the child to the 
		_children.push ( gameObject );

			// return "this" for daisy chaining
		return _this;
	};

	_this.removeChild = function ( gameObject ) {
			// if it's already a child take it out and push it to the end
		var indexOf = _children.indexOf ( gameObject );
		if ( indexOf > -1 )
			_children.splice ( indexOf, 1 );
		

			// return "this" for daisy chaining
		return _this;
	};

	_this.getChildById = function ( id ) {
		
			// loop through the children and see if any has 
		for ( var i = 0; i < _children; i++ ) {
			var child = _children [ i ];
			if ( child.id () == id )
				return child;

		}

		return undefined;
 	};

 	_this.addComponent = function ( component ) {

 			// some error handling. Can't add multiple component of the same instance. LOL! then just add it
 		_this.removeComponent ( component );
 		_components.push ( component );

 			// return "this" for daisy chaining
 		return _this;
 	};

 	_this.removeComponent = function ( component ) {
 		var indexOf = _components.indexOf ( component );
 		if ( indexOf > -1 )
			_children.splice ( indexOf, 1 );

 			// return "this" for daisy chaining
 		return _this;
 	};

 	_this.getComponentById = function ( id ) {
 		for ( var i = 0; i < _components.length; i++ ) {
 			var child = _components [ i ];
 			if ( child.id () == id )
 				return _components [ i ];

 		}

 		return undefined;
 	};

 	_this.edit = function ( $container ) {
 		for ( var i = 0; i < _components.length; i++ )
 			_components [ i ].edit ( $container );

 	};

 	_this.begin = function () {
 		for ( var i = 0; i < _components.length; i++ )
 			_components [ i ].begin ();
 	};

 	_this.update = function () {
 		for ( var i = 0; i < _components.length; i++ )
 			_components [ i ].update ( _children );

 	};

 	_this.end = function () {
 		for ( var i = 0; i < _components.length; i++ )
 			_components [ i ].end ();

 	};


	return _construct ();
}
/*
*	Uses //require to include all script files that are part of the core package.
*	This can be used as a convenient way to add dependencies on all files in this package.
*/
//require.include("weblib/core/AbstractObject");
//require.include("weblib/core/Util");


/* global console, //require, isEmpty, createjs, ss, BaseEvent, AbstractEventDispatcher */
//require.include ("weblib/core/CorePackage.js");

/*
* Audio Element Sound Manager.
* Provides limited audio support for devices which are not compatible with soundJS.
* Uses a single audio element to play sounds.
* There are two main restrictions when using this manager.
* 1) In order to work on iOS / older android phones, all audio must be triggered by user input,
*   so the manager must be instantiated within a user input event.
* 2) Only 1 channel will be available when playing audio using this manager.
*
* Dispatches the following events:
*	"loaded" -> when an audio sprite has finished loading and is ready to play.
*	"complete" (audioId) -> When an audio finishes playing, or when one cycle of a looping audio track finishes.
*/
var AudioElementSoundManager = AudioElementSoundManager || new function () {// jshint ignore:line
	"use strict";

	// create a locally scoped copy of this, extending AbstractEventDispatcher.
	var _this = AbstractEventDispatcher ( this ); // jshint ignore:line

	//How far from the correct time a sound must start in order to be considered an error
	var _TIME_TOLERANCE = 0.5;

	// sprite map definition within the audio sprite.
	var _spriteMap;

	// the audio element that will play the sounds.
	var _audioElement;

	//[Array<Object>] - List of audio queued to play while the sound is being loaded, along with additional properties
	//Object format: {"soundId", "priority", "loop"}
	var _queuedAudio;

	//[Boolean] - Whether or not the audio sprite has loaded.
	var _loaded;
	//[Boolean] - Whether the sound is completely ready to play
	var _ready;

	// the soundId of the currently playing sound.
	var _currentSound;

	//[Number] - The starting position of the current sound (in seconds)
	var _currentSoundStart;
	//[Number] - The ending position of the current sound (in seconds)
	var _currentSoundEnd;
	

	var _currentSoundLoop;

	// The priority of the currently playing sound.
	var _currentPriority;

	// the current volume.
	var _volume;

	/*
	* Constructor, builds the manager.
	*/
	function _construct () {
		_loaded = false;
		_ready = false;
		_volume = 1;
		_queuedAudio = new Array();		

		return _this;
	}

	/*
	* Listener for when loading is finished.
	* plays any queued audio, and dispatches the "loaded" event.
	*/
	_this.handleLoad = function() {
		_audioElement.removeEventListener("canplaythrough", _this.handleLoad);

		// flag loaded as true.
		_loaded = true;

		//Check if the sound is all ready to play now
		_checkSoundReady();

		//Inform others that the sound has been loaded
		_this.dispatchEvent(new BaseEvent("loaded"));
	};

	/*
	* Loads an audio sprite.
	* @param audioDefinitionJSON: an object containing an audio definition, as output by the audiosprite tool here: https://github.com/tonistiigi/audiosprite
	* See weblib/examples/sound/SoundTest.js for a sample output in the correct format.
	*/
	_this.loadSoundSprite = function(audioDefinitionJson) {

		// pull the data we need out of the JSON.
		_spriteMap = audioDefinitionJson.spritemap;
		var audioResources = audioDefinitionJson.resources;

		// determine the main file, and build a list of all available extensions.
		var i;
		var extensionList = [];

		// create the audio element to play this sound sprite.
		_audioElement = document.createElement("audio");
		_audioElement.volume = 1;

		_audioElement.id = "combined";
		_audioElement.controls = true;
		_audioElement.preload = "auto";

		//var mainFile = audioResources[0];
		//console.log("looping through resources.");
		for(i = 0; i < audioResources.length; i++) {

			var res = audioResources[i];

			// extract the file extension.
			var extension = res.substring(res.length - 3, res.length);
			
			extensionList.push(extension);

			// if we have an m4a, set that as the main file, since it's supported on all mobile platforms.
						// set the sources on the audio element.
			var type;
			if (extension ===  "mp3" || extension == "m4a") {
				type = "audio/mpeg";
			} else {
				type = "audio/" + extension;
			}

			//console.log("audio type: " + type);
			var source = document.createElement("source");
			source.type = type;

			source.src = res;
			_audioElement.appendChild(source);
		}

		_audioElement.load();
		_audioElement.addEventListener("canplaythrough", _this.handleLoad);
		_audioElement.addEventListener("timeupdate", _this.onTimeUpdate);

		// need to play this immediately so it's tied to the mouse event, then we can pause it immediately afterwards.
		_audioElement.play();
		_audioElement.pause();
	};

	/*
	* Check if the sound is completely ready to play
	*/
	function _checkSoundReady(){
		//If no duration is set, wait until it is before continuing
		if(isNaN(_audioElement.duration) || _audioElement.duration <= 0){
			createjs.Tween.get(_this).wait(100).call(_this.handleLoad);
		//If duration is set, set the sound as ready
		}else{
			_handleSoundReady();
		}
	}

	/*
	* Handle the sound being completely ready to play
	*/
	function _handleSoundReady(){
		_ready = true;
		_tryPlayNextQueuedSound();
	}

	/*
	* Helper function that handles completion of audio loading
	*/
	// function _completeLoad(){

	// 	_tryPlayNextQueuedSound();
	// }	

	/*
	* Play the next queued sound, if any
	* @return:[Boolean] - True if a queued sound started playing, false if there wasn't any
	*/
	function _tryPlayNextQueuedSound(){		
		var queuedObj;

		if(_queuedAudio.length > 0) {
			queuedObj = _queuedAudio.shift();
			_this.playSound(queuedObj.soundId, queuedObj.priority, queuedObj.loop);
			return true;
		}

		return false;
	}

	//TESTING
	// function _handleLoadProgress(e){
	// 	ss.DebugUtil.showMessage("Audio Load Progress: " + e, "AudioLoadProgress");
	// 	ss.DebugUtil.showMessage("Audio Load Duration: " + _audioElement.duration, "AudioLoadDuration");
	// }
	//END TESTING

	//TESTING
	// function _handleLoadStart(e){
	// 	//console.log("AESoundMan: Load Start");
	// }

	// function _handleCanPlay(e){
	// 	//console.log("AESoundMan: Can Play");
	// }


	/*
	* Return the audio text that came with the audio clip.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @return - the text specified in the json file for given audio, otherwise return undefined.
	*/
	_this.getText = function (soundId) {

		// get the text field of the audio sprite data
		if (_isValid(soundId)) {
			var audioText = _spriteMap[soundId].text;
			return audioText;
		}
		return undefined;
	};


	/*
	* Return the audio length of the audio clip.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @return - the length in second of the audio clip.
	*/
	_this.getDuration = function(soundId) {

		// extract the times for the audio file.
		if (_isValid(soundId)) {
			var start = _spriteMap[soundId].start;
			var end = _spriteMap[soundId].end;
			var length = end - start;
			return length;
		}
		return 0;
	};

	/*
	* Play a sound.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @param priority (optional): a SoundPriority specifying the priority of the sound we are starting.
	* @param loop: True to loop the sound, false otherwise.
	*/
	_this.playSound = function (soundId, priority, loop) {

		priority = !isEmpty(priority)? priority: ss.SoundPriority.LOW;
		loop = !isEmpty(loop)? loop: false;

		// this sound manager doesn't support multi channel sounds, so bail.
		if(priority == ss.SoundPriority.MULTI_CHANNEL_ONLY) {return;}

		// if we don't have any sounds loaded, bail.
		if(isEmpty(_spriteMap)) {
			console.warn ("AudioElementSoundManager: Trying to play a sound without setting an audiosprite.");
			return;
		}

		// if there's a high priority sound playing, and we aren't high priority, bail.
		if(_currentSound !== null && _currentPriority == ss.SoundPriority.HIGH && priority != ss.SoundPriority.HIGH) { return; }

		// if we're on iOS and our volume is less than 1/2, bail.
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
		if(iOS && _volume < 0.5) { return; }

		// if there's no sound by that name, bail.
		if(isEmpty(_spriteMap[soundId])) { return; }

		// pause the audio, just in case.
		_audioElement.pause();

		// set the currently playing sound, and the current priority.
		_currentSound = soundId;
		_currentPriority = priority;
		_currentSoundLoop = loop;

		// determine where in the sound sprite to play.
		var start = _spriteMap[soundId].start;
		var end = _spriteMap[soundId].end;
		//var length = end - start;

		_currentSoundStart = start;
		_currentSoundEnd = end;

		// play the sound, and setup the tween to stop the sound.
		_audioElement.currentTime = start;

		//TESTING
		//ss.DebugUtil.showMessage("Play Audio: ID = " + soundId + " Duration = " + _audioElement.duration + ", Start = " + start + ", End = " + end, "SoundPlay" + soundId);

		//Stop the sound immediately if the sound isn't ready yet
		if(!_ready){
			//If the sound is high priority, queue it for later
			if(priority == ss.SoundPriority.HIGH) {
				_queuedAudio.push({"soundId": soundId, "priority": priority, "loop":loop});
				return;
			}
			_currentSoundEnd = 0;
		}

		//_audioElement.pause();
		_audioElement.play();
	};

	_this.onTimeUpdate = function (e) {
		var finSound;

		//TESTING
		//ss.DebugUtil.showMessage("CurSound: " + _currentSound + ", Sound: CurTime: " + _audioElement.currentTime + ", EndTime: " + _currentSoundEnd, "SoundCheck");

		
		if (_currentSound !== null){
			//Check if the sound is erroniously playing from prior to its start time, and try to correct it
			if(_audioElement.currentTime < _currentSoundStart - _TIME_TOLERANCE){
				//TESTING
				//console.log("AudioElementSoundManager: Sound started from incorrect time! Start = " + _currentSoundStart + ", Actual = " + _audioElement.currentTime);
				//ss.DebugUtil.showMessage("AudioElementSoundManager: Sound started from incorrect time! Start = " + _currentSoundStart + ", Actual = " + _audioElement.currentTime, "SndStartError");

				_audioElement.currentTime = _currentSoundStart;
			}

			//Check if the sound has completed playing
			if(_audioElement.currentTime >= _currentSoundEnd) {
			_audioElement.pause();
			_audioElement.currentTime = 0;
				if (!_currentSoundLoop) {
					finSound = _currentSound;
					_currentSound = null;

					//Start any additional queued sounds
					_tryPlayNextQueuedSound();

					_this.dispatchEvent(new BaseEvent("complete", finSound));
				} else {
					_this.playSound(_currentSound, _currentPriority, _currentSoundLoop);
				}
			}
		}
	};

	/*
	* Stops all instances of sounds playing with the given soundId.
	* @param soundId: The identifier of the sound instance(s) to stop.
	*/
	_this.stopSound = function(soundId) {
		var finSound;

		if(_currentSound == soundId) {
			_audioElement.pause();
			finSound = _currentSound;
			_currentSound = null;
			_this.dispatchEvent(new BaseEvent("complete", finSound));
			
		}
	};

	/*
	* Stop all sounds that are currently playing.
	*/
	_this.stopAllSounds = function () {
		var finSound;
		finSound = _currentSound;

		if(!isEmpty(_audioElement)){
			_audioElement.pause();
		}
		
		_currentSound = null;

		_this.dispatchEvent(new BaseEvent("complete", finSound));
	};

	/*
	* Sets the global volume for the sound manager.
	* @param vol: the volume to use, ranging from (0-1) meaning (silence-full volume)
	* NOTE: iOS does not respect the volume property on _audioElements,
	*  -on iOS a volume less than 0.5 will play no sounds.
	*  -on iOS a volume greater than or equal to 0.5 will play soudns at full volme.
	*/
	_this.setVolume = function(vol) {
		if (isEmpty(_audioElement)) {
			return;
		}
		_audioElement.volume = vol;
		
		_volume = vol;

		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

		if(iOS && vol < 0.5)  {
			_this.stopAllSounds();
		}
	};

	/*
	* Gets the current volume.
	* @return - the current volume of the sound manager.
	*/
	_this.getVolume = function() {
		return _volume;
	};

	/*
	* Gets a list of currently playing sounds.
	* @return - a list of the soundIds that are currently playing.
	* NOTE: If a sound has multiple playing instances, it will be listed multiple times.
	*/
	_this.getPlayingSounds = function() {
		return [_currentSound];
	};

	/*
	* Returns whether there are any instances of a given SoundId playing.
	*/
	_this.isPlaying = function(soundId) {
		return (_currentSound == soundId);
	};

	/*
	 * Check if the audio id is valid
	 * @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	 * @return - true if the audio id is valid and exist such data, false otherwise
	 */
	function _isValid(soundId) {

		// if we haven't set a sprite map, bail.
		if(isEmpty(_spriteMap)) {
			return false;
		}

		// if there's no sound by that name, bail.
		if(isEmpty(_spriteMap[soundId])) {
			return false;
		}

		return true;
	}

	return _construct ();
};
/* global //require, AbstractEventDispatcher, isEmpty, createjs, SoundPriority, BaseEvent */
//require.include ("weblib/core/CorePackage.js");

/*
* CreateJS Sound Manager.
* Provides access to soundJS, and adds audio priority.
* Dispatches the following events:
*	"loaded" -> when an audio sprite has finished loading.
* 	"complete"  (audioId) -> When an audio file finishes playing, or when one cycle of a looping audio track finishes.
*/
var CreateJSSoundManager = CreateJSSoundManager || new function () {
	"use strict";

	// locally scoped copy of this, extend AbstractEventDispatcher.
	var _this = AbstractEventDispatcher ( this );

	// sprite map definition within the audio sprite.
	var _spriteMap;

	// Queued audio file (if play was called before audio was loaded.)
	var _queuedAudio;

	// Whether or not the audio sprite has been loaded.
	var _loaded;

	// List of currently playing sounds.
	var _currentSounds = [];

	// Current volume.
	var _volume;

	/*
	* Constructor. Volume defaults to 1.
	*/
	function _construct () {
		_volume = 1;
		_loaded = false;

		return _this;
	}

	/*
	 * Check if the audio id is valid
	 * @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	 * @return - true if the audio id is valid and exist such data, false otherwise
	 */
	function _isValid(soundId) {

		// if we haven't set a sprite map, bail.
		if(isEmpty(_spriteMap)) {
			return false;
		}

		// if we haven't loaded yet, queue the playback.
		if(!_loaded) {
			_queuedAudio = soundId;
			return false;
		}

		// if there's no sound by that name, bail.
		if(isEmpty(_spriteMap[soundId])) {
			return false;
		}

		return true;
	}

	/*
	* Loads an audio sprite.
	* @param audioDefinitionJSON: an object containing an audio definition, as output by the audiosprite tool here: https://github.com/tonistiigi/audiosprite
	* See weblib/examples/sound/SoundTest.js for a sample output in the correct format.
	*/
	_this.loadSoundSprite = function(audioDefinitionJson) {

		// pull the data we need out of the JSON.
		_spriteMap = audioDefinitionJson.spritemap;
		var audioResources = audioDefinitionJson.resources;

		// determine the main file, and build a list of all available extensions.
		var i;
		var extensionList = [];

		// use the 1st file as a default, unless we find one in our preferred format.
		var mainFile = audioResources[0];

		for(i = 0; i < audioResources.length; i++) {
			var res = audioResources[i];

			// extract the file extension.
			var extension = res.substring(res.length - 3, res.length);
			if(extension !== "ogg") {
				// if it's not an ogg, ad dit to the extension list.
				extensionList.push(extension);
			}

			// if we find an ogg version of the file, use that one, as it has the
			// best compatibility across desktop browsers. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats for details on browser support.
			if(extension === "ogg") {
				mainFile = res;
			}

		}

		// set the list of alternate extensions.
		createjs.Sound.alternateExtensions = extensionList;

		// wait for load.
		createjs.Sound.addEventListener("fileload", createjs.proxy(_this.handleLoad, _this));

		// register the audio sprite.
		createjs.Sound.registerSound(mainFile, "mainAudio");
	};

	/*
	* Listener for when load is complete.
	*/
	_this.handleLoad = function(event) {
		// set the loaded flag.
		_loaded = true;

		// If we have a queued piece of audio, play it.
		if(!isEmpty(_queuedAudio)) {
			_this.playSound(_queuedAudio);
		}

		//TESTING
		//createjs.Sound.play(event.src);
		//_this.playSound("play_button", ss.SoundPriority.HIGH);
		//END TESTING

		// dispatch the loaded event.
		_this.dispatchEvent(new BaseEvent("loaded"));


	};

	/*
	* Return the audio text that came with the audio clip.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @return - the text specified in the json file for given audio, otherwise return undefined.
	*/
	_this.getText = function (soundId) {

		// get the text field of the audio sprite data
		if (_isValid(soundId)) {
			var audioText = _spriteMap[soundId].text;
			return audioText;
		}
		return undefined;
	}


	/*
	* Return the audio length of the audio clip.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @return - the length in second of the audio clip.
	*/
	_this.getDuration = function(soundId) {

		// extract the times for the audio file.
		if (_isValid(soundId)) {
			var start = _spriteMap[soundId].start;
			var end = _spriteMap[soundId].end;
			var length = end - start;
			return length;
		}
		return 0;
	}


	/*
	* Play a sound.
	* @param soundId: The id of the sound from the sound sprite. NOTE: using a sound that isn't in the sprite will result in an error.
	* @param priority (optional): a SoundPriority specifying the priority of the sound we are starting.
	* @param loop: True to loop the sound, false otherwise.
	*/
	_this.playSound = function (soundId, priority, loop) {

		//console.log("PLAYING: " + soundId);
		// default priority to low.
		if(isEmpty(priority))
		{
			priority = ss.SoundPriority.LOW;
		}
		
		// default loop to false.
		if(isEmpty(loop)) {
			loop = false;
		}

		// if we haven't set a sprite map, bail.
		if(isEmpty(_spriteMap)) {
			return;
		}

		// if we haven't loaded yet, queue the playback.
		if(!_loaded) {
			_queuedAudio = soundId;
			return;
		}

		// if there's no sound by that name, bail.
		if(isEmpty(_spriteMap[soundId])) {
			console.warn("Good sir, your request to play sound '" + soundId + "' is completely unreasonable, for it does not exist!");
			return;
		}

		// extract the times for the audio file.
		var start = _spriteMap[soundId].start;
		var end = _spriteMap[soundId].end;
		var length = end - start;

		//TESTING
		//ss.DebugUtil.showMessage("Play Audio: ID = " + soundId + ", Start = " + start + ", End = " + end, "SoundPlay" + soundId);
		//END TESTING

		//console.log("START: " + start + " END: " + end + " LENGTH: " + length);
		// create a new instance for playback.
		var instance = createjs.Sound.createInstance("mainAudio");

		// set the interrupt on the audio playback based on the priority.
		var interrupt;
		if(priority == ss.SoundPriority.HIGH) {
			// set high priority stuff to interrupt, and anything else to not.
			interrupt = createjs.Sound.INTERRUPT_ANY;
			//console.log("PLAYING: " + soundId + " WITH INTERRUPT_ANY");
		} else {
			interrupt = createjs.Sound.INTERRUPT_NONE;
			//console.log("PLAYING: " + soundId + " WITH INTERRUPT_NONE");
		}

		// play the clip.
		instance.play({offset:start * 1000, interrupt:interrupt, volume:_volume});

		// create a holder for the instance and the sound ID (to be referenced if we need to stop a sound.)
		var soundObj = {soundId: soundId, instance: instance, priority: priority};
		_currentSounds.push (soundObj);

		if(!loop) {
			// if we aren't looping, stop the audio when the length is up.
			createjs.Tween.get(instance).wait(length * 1000).call(function(){
				var remIndex;

				instance.stop();
				_this.dispatchEvent(new BaseEvent("complete", soundObj.soundId));
				
				//Remove the sound from the current sounds list
				remIndex = _currentSounds.indexOf(soundObj);
				if(remIndex < 0){
					//console.log("!! WARNING !! Couldn't find sound " + soundObj.soundId + " in the current sounds list while attempting to stop it!");
				}else{
					_currentSounds.splice(remIndex, 1);
				}
			});
		} else {
			// if we are looping, restart the audio when the length is up.
			createjs.Tween.get(instance).wait(length * 1000).call(function(){
				var remIndex;

				instance.stop();
				_this.dispatchEvent(new BaseEvent("complete", soundObj.soundId));
				
				//Remove the sound from the current sounds list
				remIndex = _currentSounds.indexOf(soundObj);
				if(remIndex < 0){
					//console.log("!! WARNING !! Couldn't find sound " + soundObj.soundId + " in the current sounds list while attempting to stop it!");
				}else{
					_currentSounds.splice(remIndex, 1);
				}

				_this.playSound(soundObj.soundId, priority, loop);
			});
		}
	};

	/*
	* Stops all instances of sounds playing with the given soundId.
	* @param soundId: The identifier of the sound instance(s) to stop.
	*/
	_this.stopSound = function (soundId) {

		// keep a list of which sounds need to be removed from the currently playing list.
		var toRemove = [];
		//var removeIndices = [];
		var snd;
		var i;	
		var remIndex;	

		//Look through all sounds for any with a matching ID
		for (i = 0; i < _currentSounds.length; i++){		
			snd = _currentSounds[i];						

			if(snd.soundId == soundId) {

				// if the sound matches, stop it and flag it to be removed from the currently playing list.
				if(!isEmpty(snd.instance)) {
					snd.instance.stop();

					// stop any tweens waiting on the end of the sound.
					createjs.Tween.removeTweens(snd.instance);
				}
				_this.dispatchEvent(new BaseEvent("complete", snd.soundId));
				toRemove.push(snd);
			}
		}

		// remove the stopped instances from the currently playing list.
		for (i = 0; i < toRemove.length; i++){	

			remIndex = _currentSounds.indexOf(toRemove[i]);
			if(remIndex >= 0){
				_currentSounds.splice(remIndex, 1);	
			}
			//_currentSounds.pop(toRemove[i]);
			
		}
	};

	/*
	* Stop all sounds that are currently playing.
	* @param priority:SoundPriority (Optional) - If provided, only sounds with this priority will be stopped
	*/
	_this.stopAllSounds = function ( priority ) {

		var snd;
		// keep a list of which sounds need to be removed from the currently playing list.
		var toRemove = [];
		var remIndex;

		for (var i = 0; i < _currentSounds.length; i++) {
			snd = _currentSounds[i];

			if (isEmpty(priority) || snd.priority === priority)
 			{
				snd.instance.stop();
				toRemove.push(snd);

				// stop any tweens that are waiting on the end of the sound.
				createjs.Tween.removeTweens(snd.instance);
				_this.dispatchEvent(new BaseEvent("complete", snd.soundId));
			}
		}
		
		// remove the stopped instances from the currently playing list.
		for (i = 0; i < toRemove.length; i++){	
			remIndex = _currentSounds.indexOf(toRemove[i]);
			if(remIndex >= 0){
				_currentSounds.splice(remIndex, 1);	
			}
			//_currentSounds.pop(toRemove[i]);
			
		}
	};

	/*
	* Sets the global volume for the sound manager.
	* @param vol: the volume to use, ranging from (0-1) meaning (silence-full volume)
	*/
	_this.setVolume = function(vol) {
		var snd;

		_volume = vol;
		for (var i = 0; i < _currentSounds.length; i++){
			snd = _currentSounds[i];

			// set the volume on any currently playing instances.
			snd.instance.volume = _volume;
		}
	};

	/*
	* Gets the current volume.
	* @return - the current volume of the sound manager.
	*/
	_this.getVolume = function() {
		return _volume;
	};

	/*
	* Gets a list of currently playing sounds.
	* @return - a list of the soundIds that are currently playing.
	* NOTE: If a sound has multiple playing instances, it will be listed multiple times.
	*/
	_this.getPlayingSounds = function () {
		var soundList = [];
		var snd;

		for (var i = 0; i < _currentSounds.length; i++){
			snd = _currentSounds[i];
			soundList.push(snd.soundId);
		}
		return soundList;
	};

	/*
	* Returns whether there are any instances of a given SoundId playing.
	*/
	_this.isPlaying = function (soundId) {
		var snd;

		for (var i = 0; i < _currentSounds.length; i++){
			snd = _currentSounds[i];
			if (snd.soundId == soundId) {
				return true;
			}
		}
		return false;
	};

	return _construct ();
};
//Declare the main Sinking Ship namespace object if not already declared
if(ss === undefined){	
	var ss = new Object();
}
//require.include("weblib/external/createjs.min.js");
//require.include("weblib/ssnamespace");
//require.include("weblib/core/Util");

/*
* Class DebugUtil
* 	Singleton class that provides helpful debugging functionality
*/

/*
* Get the singleton instance of this class
*/
ss.DebugUtil = ss.DebugUtil || new function(){
	var _this = this;

	//[Boolean] - Whether this debug utilily is enabled
	var _enabled = false;

	//[String] - Tag to use if none is provided
	var _DEFAULT_TAG = "DEBUG_DEFAULT";

	//Positioning for debug text fields
	var _TEXT_START_X = 5;
	var _TEXT_START_Y = 5;
	var _TEXT_OFFSET_Y = 20;	

	//[Container] - Container to display debug content to
	var _display;
	var _maxWidth = 1000;
	var _fontSize = 12;

	//[Array<String>] - List of all tags currently in use
	var _tags;

	//Object - Dictionary mapping tags to text fields displaying text associated with them
	var _textFieldDict;

	/*
	* Initialize this debug util
	*/
	function _construct(){
		_display = null;

		_tags = new Array();
		_textFieldDict = new Object();

		return _this;
	}

	/*
	* Set the container to display debug info to
	*/
	_this.setDisplay = function(display, fontSize, maxWidth){
		_display = display;
		_fontSize = isDefined(fontSize) ? fontSize : _fontSize;
		_maxWidth = isDefined(maxWidth) ? maxWidth : _maxWidth;
	}

	/*
	* Set whether this debug utility should be enabled
	* @param enabled:[Boolean] - True to enable on-screen debugging, false to disable
	*/
	_this.setEnabled = function(enabled){
		_enabled = enabled;
	}

	/*
	* Show a debug message
	* @param message:[String] - Message to show
	*/
	_this.showMessage = function(message, tag){		
		var useTag;

		//Don't show messages if disabled
		if(!_enabled){
			return;
		}

		useTag = isDefined(tag) ? tag : _DEFAULT_TAG;

		//Remove any existing text field associated with this tag
		_removeTaggedTextField(useTag);

		//Add the new message with the new tag
		_addTaggedMessage(useTag, message);
	}

	/*
	* Add a message with a specific tag
	* @param tag:[String] - Tag to associate with this debug message
	* @param message:[String] - The message to be displayed
	*/
	function _addTaggedMessage(tag, message){
		var tagIndex = _tags.indexOf(tag);

		//If this tag doesn't exist yet, add it to the tag list
		if(tagIndex < 0){
			_tags.push(tag);
			tagIndex = _tags.length - 1;
		}
		
		//Display a warning if no display container was provided
		if(_display == null){
			console.warn("DebugUtil: Attempted to display debug message but no display container was set!");
			return;
		}

		//Create and position a text field for this message
		_textFieldDict[tag] = new createjs.Text(message, String(_fontSize) + "px Arial", "#FFFFFF");
		_textFieldDict[tag].lineWidth = _maxWidth;
		_display.addChild(_textFieldDict[tag]);
		_textFieldDict[tag].x = _TEXT_START_X;
		_textFieldDict[tag].y = _TEXT_START_Y + tagIndex * _TEXT_OFFSET_Y;
	}

	/*
	* Remove any message with the provided tag
	* @param tag:[String] - Tag associated with the text field to remove
	*/
	function _removeTaggedTextField(tag){

		//Remove the message from the list
		if(isDefined(_textFieldDict[tag])){
			_display.removeChild(_textFieldDict[tag]);
			delete _textFieldDict[tag];
		}
	}

	return _construct();
}

//require.include("weblib/ssnamespace");
//require.include("weblib/utils/DebugUtil");

/*
* Static Class SystemInfo
*/

ss.SystemInfo = new Object();

ss.SystemInfo.isIOS = undefined;
ss.SystemInfo.isIPhone = undefined;
ss.SystemInfo.isIPod = undefined;
ss.SystemInfo.isIPad = undefined;
ss.SystemInfo.isNexus = undefined;
ss.SystemInfo.isNabi = undefined;

ss.SystemInfo.isIE = undefined;
ss.SystemInfo.isSafari = undefined;
ss.SystemInfo.isChrome = undefined;
ss.SystemInfo.isMaxthon = undefined;
ss.SystemInfo.isFirefox = undefined;
ss.SystemInfo.isSilk = undefined;

/*
* Check if this program is being run on a mobile browser
* @return:[Boolean] - True if this program is being run on a mobile browser, false otherwise
*/
ss.SystemInfo.isMobile = function(){
	if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
	 		|| navigator.userAgent.match(/iPad/i)
	 		|| navigator.userAgent.match(/iPod/i)
		 	|| navigator.userAgent.match(/BlackBerry/i)
		 	|| navigator.userAgent.match(/Windows Phone/i)
		 	|| navigator.userAgent.match(/Mobile/i)
		 	|| navigator.userAgent.match(/Silk/i)
			|| navigator.userAgent.match(/NABI/i)){
		return true;
	}else{
	    return false;
	}
}

/*
* Check if this program is being run on a browser on iOS
* @return:[Boolean] - True if this program is being run on an iOS browser, false otherwise
*/
/*
ss.SystemInfo.isIOS = function(){
	return navigator.userAgent.match(/iPhone/i)
	 	|| navigator.userAgent.match(/iPad/i)
	 	|| navigator.userAgent.match(/iPod/i);
}*/

/*
* Get the version of iOS the game is running on
* @return:[Integer] - 
*/
ss.SystemInfo.getIOSVersion = function(){
	//Return -1 if not running on IOS
	if(!ss.SystemInfo.isIOS){
		return -1;
	}

	var ua = window.navigator.userAgent;
	var osIndex = ua.indexOf('OS ');

	if(osIndex >= 0){
		return parseInt(ua.substring(osIndex + 3, osIndex + 4));
	}

	console.warn("SystemInfo.getIOSVersion: Couldn't detect IOS version!");
	return 0;
}

/*
* Get the version of IE the game is running on
* @return:[Integer] - If on IE, the version of IE the game is running on.
*					- If not on IE, returns -1.
*/
ss.SystemInfo.getIEVersion = function(){
	//Return -1 if not running on IE
	if(!ss.SystemInfo.isIE){
		return -1;
	}

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');

	//Check for IE 10 or older and return version number
	if(msie >= 0){
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	//Check for IE 11 or newer and return version number
	if(trident >= 0){
		var rv = ua.indexOf('rv');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	console.warn("SystemInfo.getIEVersion: Couldn't detect IE version!");
	return 0;
}

/*
* Get the version of Safari the game is running on
* @return:[Integer] - If on Safari, the version of Safari the game is running on.
*					- If not on Safari, returns -1.
*/
ss.SystemInfo.getSafariVersion = function(){
	var versionIndex;
	var versionStart;
	

	//return -1 if not on Safari
	if(!ss.SystemInfo.isSafari){
		return -1;
	}

	//Look for the start of the version tag
	versionIndex = parseInt(window.navigator.userAgent.indexOf("Version/"));
	versionStart = versionIndex + 8;

	//ss.DebugUtil.showMessage("Version Start: " + versionStart, "VStart");

	//TESTING
	//ss.DebugUtil.showMessage("Version Index: " + window.navigator.userAgent.indexOf("Version/"), "VIndex");
	//ss.DebugUtil.showMessage("Version Index Add: " + Number(versionIndex + 8), "VIndex2");
	//ss.DebugUtil.showMessage("Version text: " + window.navigator.userAgent.substring(versionStart, versionStart + 1), "VText");

	if(versionIndex < 0){		
		console.warn("SystemInfo: Unable to detect Safari version!");
		return 0;
	}

	return parseInt(window.navigator.userAgent.substring(versionStart, versionStart + 1));
}

/*
* Check if this program is being run on any version of Internet Explorer
* @return:
*/
// ss.SystemInfo.isInternetExplorer = function(){
	


// 	// if(navigator.appName == 'Microsoft Internet Explorer'){
// 	// 	return true;
// 	// }else{
// 	// 	return false;
// 	// }
// }

/*
* Initialize the system info object
*/
ss.SystemInfo._init = function(){
	"use strict";

	var ua = window.navigator.userAgent;

	this.isIOS = false;
	this.isIPhone = false;
	this.isIPod = false;
	this.isIPad = false;
	this.isNexus = false;
	
	this.isIE = false;
	this.isSafari = false;
	this.isChrome = false;
	this.isFirefox = false;
	this.isMaxthon = false;	
	this.isSilk = false;

	//Check for (cr)Apple devices
	if(ua.match(/iPhone/i)){
		this.isIPhone = true;
	}else if (ua.match(/iPad/i)){
		this.isIPad = true;
	}else if(ua.match(/iPod/i)){
		this.isIPod = true;
	}

	//Check for any IOS device
	if(this.isIPhone || this.isIPad || this.isIPod){
		this.isIOS = true;
	}
	
	//Check for a Nexus device
	if(ua.match(/Nexus/i)){
		this.isNexus = true;
	}

	//Check for Internet Explorer
	if(ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident') >= 0){
		this.isIE = true;
	//Check for Silk
	}else if(ua.match(/Silk/i)){
		this.isSilk = true;
	//Check for Maxthon
	}else if(ua.match(/NABI/i)){
		this.isMaxthon = true;
		//Check for Chrome
	}else if(ua.match(/Chrome/i)){
		this.isChrome = true;
	//Check for Firefox
	}else if(ua.match(/Firefox/i)){
		this.isFirefox = true;
	//Check for Safari
	}else if(ua.match(/Safari/i)){
		this.isSafari = true;
	}else{
		console.warn("SystemInfo: Couldn't detect browser type!");		
	}
}

//Run the initialization code immediately
ss.SystemInfo._init();


/* global //require, isEmpty, createjs, CreateJSSoundManager, AudioElementSoundManager */

//require.include("weblib/ssnamespace");
//require.include ("weblib/core/CorePackage.js");
//require.include("weblib/utils/SystemInfo");
//require.include ("weblib/sound/CreateJSSoundManager");
//require.include ("weblib/sound/AudioElementSoundManager");

/*
* Sound Manager.
* Delegates it's work out to either a CreateJSSoundManager or an AudioElementSoundManager, depending on support.
*/
ss.SoundManager = ss.SoundManager || new function () {
	"use strict";

	// locally scoped copy of this. Will be set to the appropriate sound manager in the constructor.
	var _this;

	function _construct () {

		if(isEmpty(_this)) {
			//Always use AudioElementSoundManager on Silk
			if (ss.SystemInfo.isSilk) {				
				_this = AudioElementSoundManager;
			//Always use AudioElementSoundManager on IE
			}else if(ss.SystemInfo.isIE){
				_this = AudioElementSoundManager;
			// If soundJS is supported, use the createjs sound manager.
			} else if(createjs.Sound.initializeDefaultPlugins() && !(navigator.userAgent.indexOf("SAMSUNG SM-T330NU") > 0)) {
				//TESTING
				console.log("ss.SoundManager - using CreateJSSoundManager.");
				
				_this = CreateJSSoundManager;
			// if soundJS is not supported, use the audio element sound manager.
			} else {
				//TESTING
				console.log("ss.SoundManager - using AudioElementSoundManager.");
				
				_this = AudioElementSoundManager;
			}
		}

		return _this;
	};

	return _construct();
};

//Event dispatched when all sounds are loaded for a sound manager
ss.SoundManager.LOADED = "loaded";
//Event dispatched when a sound has completed playing
ss.SoundManager.SOUND_COMPLETE = "complete";


/*
* Sound Priority,
* specifies when sounds should interrupt other sounds, and when they should play.
*/
ss.SoundPriority = {
	HIGH: 0, // Will play a sound no matter what is currently playing.
	LOW: 1,	// Plays a sound if there are channels available. If there aren't channels available, play if the current sound isn't high priority, otherwise don't.
	MULTI_CHANNEL_ONLY:2 // Only plays sounds on devices with support for multiple audio channels.
};
/*
*	Uses //require to include all script files that are part of the sound package.
*	This can be used as a convenient way to add dependencies on all files in this package.
*/
//require.include("weblib/sound/AudioElementSoundManager");
//require.include("weblib/sound/CreateJSSoundManager");
//require.include("weblib/sound/SoundManager");

var audioSprite = {
  "resources": [
    "audio/obfuscoAudio.m4a",
    "audio/obfuscoAudio.mp3",
    "audio/obfuscoAudio.ogg"
  ],
  "spritemap": {
    "Obfusco10_OscarKite": {
      "start": 0,
      "end": 4.46281179138322,
      "loop": false
    },
    "Obfusco11_HamSandwiches": {
      "start": 6,
      "end": 9.670340136054422,
      "loop": false
    },
    "Obfusco12_ObfuscoSombrero": {
      "start": 11,
      "end": 15.713061224489795,
      "loop": false
    },
    "Obfusco13_RhinocerousPiano": {
      "start": 17,
      "end": 19.62764172335601,
      "loop": false
    },
    "Obfusco1_TwoButterfleis": {
      "start": 21,
      "end": 27.8818820861678,
      "loop": false
    },
    "Obfusco2_SmoothKetchup": {
      "start": 29,
      "end": 33.963310657596374,
      "loop": false
    },
    "Obfusco3_TruerWords": {
      "start": 35,
      "end": 40.75573696145125,
      "loop": false
    },
    "Obfusco4_BeautifulToothbrushes": {
      "start": 42,
      "end": 47.58893424036281,
      "loop": false
    },
    "Obfusco5_FrecklesPillow": {
      "start": 49,
      "end": 56.75775510204082,
      "loop": false
    },
    "Obfusco6_CandleMoon": {
      "start": 58,
      "end": 61.79546485260771,
      "loop": false
    },
    "Obfusco7_FlamingoFriends": {
      "start": 63,
      "end": 68.46380952380953,
      "loop": false
    },
    "Obfusco8_ApplePicking": {
      "start": 70,
      "end": 72.58591836734693,
      "loop": false
    },
    "Obfusco9_BeautifulBanana": {
      "start": 74,
      "end": 78.17083900226757,
      "loop": false
    }
  }
}
var p; // shortcut to reference prototypes
var lib = {};
var cjs = createjs;

// library properties:
lib.properties = {
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/armstraight.png", id:"armstraight"},
		{src:"images/BG.jpg", id:"BG"},
		{src:"images/face_02.png", id:"face_02"},
		{src:"images/face_03.png", id:"face_03"},
		{src:"images/face_04.png", id:"face_04"},
		{src:"images/face_05.png", id:"face_05"},
		{src:"images/face_06.png", id:"face_06"},
		{src:"images/face_07.png", id:"face_07"},
		{src:"images/face_10.png", id:"face_10"},
		{src:"images/face_11.png", id:"face_11"},
		{src:"images/face_13.png", id:"face_13"},
		{src:"images/face_14.png", id:"face_14"},
		{src:"images/face_15.png", id:"face_15"},
		{src:"images/face_16.png", id:"face_16"},
		{src:"images/face_19.png", id:"face_19"},
		{src:"images/face_20.png", id:"face_20"},
		{src:"images/hand_01.png", id:"hand_01"},
		{src:"images/hand_02.png", id:"hand_02"},
		{src:"images/hand_03.png", id:"hand_03"},
		{src:"images/hand_04.png", id:"hand_04"},
		{src:"images/hand_05.png", id:"hand_05"},
		{src:"images/hand_06.png", id:"hand_06"},
		{src:"images/hand_07.png", id:"hand_07"},
		{src:"images/hand_08.png", id:"hand_08"},
		{src:"images/hand_09.png", id:"hand_09"},
		{src:"images/hand_10.png", id:"hand_10"},
		{src:"images/hand_11.png", id:"hand_11"},
		{src:"images/obfuscobody02.png", id:"obfuscobody02"},
		{src:"images/overlay.png", id:"overlay"},
		{src:"images/Button_Down.png", id:"buttonDown"},
		{src:"images/Button_Up.png", id:"buttonUp"}
	]
};

// stage content:
(lib.office = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{"Obfusco's mysterious arrival Sting.mp3":0,"Obfusco1_TwoButterfleis.wav":102,"Obfusco2_SmoothKetchup.wav":282,"Obfusco3_TruerWords.wav":420,"Obfusco4_BeautifulToothbrushes.wav":570,"Obfusco5_FrecklesPillow.wav":720,"Obfusco6_CandleMoon.wav":800,"Obfusco7_FlamingoFriends.wav":901,"Obfusco8_ApplePicking.wav":1041,"Obfusco9_BeautifulBanana.wav":1111,"Obfusco10_OscarKite.wav":1221,"Obfusco11_HamSandwiches.wav":1341,"Obfusco12_ObfuscoSombrero.wav":1441,"Obfusco13_RhinocerousPiano.wav":1561});

	// timeline functions:
	this.frame_101 = function() {
		this.stop();
	}
	this.frame_281 = function() {
		this.stop();
	}
	this.frame_419 = function() {
		this.stop();
	}
	this.frame_569 = function() {
		this.stop();
	}
	this.frame_719 = function() {
		this.stop();
	}
	this.frame_799 = function() {
		this.stop();
	}
	this.frame_900 = function() {
		this.stop();
	}
	this.frame_1040 = function() {
		this.stop();
	}
	this.frame_1110 = function() {
		this.stop();
	}
	this.frame_1220 = function() {
		this.stop();
	}
	this.frame_1340 = function() {
		this.stop();
	}
	this.frame_1440 = function() {
		this.stop();
	}
	this.frame_1560 = function() {
		this.stop();
	}
	this.frame_1631 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(101).call(this.frame_101).wait(180).call(this.frame_281).wait(138).call(this.frame_419).wait(150).call(this.frame_569).wait(150).call(this.frame_719).wait(80).call(this.frame_799).wait(101).call(this.frame_900).wait(140).call(this.frame_1040).wait(70).call(this.frame_1110).wait(110).call(this.frame_1220).wait(120).call(this.frame_1340).wait(100).call(this.frame_1440).wait(120).call(this.frame_1560).wait(71).call(this.frame_1631).wait(2));

	// desk
	this.instance = new lib.Tween6("synched",0);
	this.instance.setTransform(960.2,785.4);

	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(960.2,785.4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},759).to({_off:true},840).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(759).to({_off:false},840).to({startPosition:0},5).to({startPosition:0},4).to({startPosition:0},4).to({startPosition:0},4).wait(6).to({startPosition:0},0).to({_off:true},10).wait(1));

	// forarm right
	this.instance_2 = new lib.forarm();
	this.instance_2.setTransform(1153.2,1213.8,0.888,0.888,45,0,0,89.9,202.8);

	this.instance_3 = new lib.hand("single",2);
	this.instance_3.setTransform(1334.1,679.8,0.581,0.581,0,0.8,-179.2,39.6,288.2);
	this.instance_3._off = true;

	this.instance_4 = new lib.fix("synched",0);
	this.instance_4.setTransform(932.3,432.1,1,1,0,0,0,-26.6,-106.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_2}]},102).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},69).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},14).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},27).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},29).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},28).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},12).to({state:[{t:this.instance_3}]},11).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_3}]},9).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},26).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_2}]},16).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},21).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},25).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},50).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},35).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},22).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},25).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},27).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},26).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},31).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_4}]},16).to({state:[]},47).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:546.8},102).to({rotation:79.5,x:1202,y:492.1},12).to({scaleX:0.89,scaleY:0.89,rotation:140.3,x:1196,y:503.7},5).to({scaleX:0.89,scaleY:0.89,rotation:223.5,x:1193.7,y:514.5},7).wait(1).to({rotation:223.7,x:1195.5,y:514.6},0).to({rotation:296.9,x:1197.3,y:507.2},4).to({rotation:340.9,x:1226.2,y:482.6},4).to({rotation:292.4,x:1263.5,y:374.9},5).to({x:1249.5,y:490.9},4).to({regX:89.8,rotation:346.2,x:1275.1,y:414.2},4).to({regX:89.9,rotation:292.4,x:1263.5,y:374.9},5).to({x:1249.5,y:490.9},4).to({regX:89.8,rotation:346.2,x:1275.1,y:414.2},4).wait(1).to({regX:89.9,rotation:485.4,x:1188.6,y:498.7},3).to({regY:202.7,rotation:603.6,x:1157.3,y:520.2},6).to({rotation:644.9,x:1171,y:548.1},11,cjs.Ease.get(1)).to({rotation:616.7,x:1222.8,y:445.4},6).wait(7).to({rotation:627.1,x:1220.8,y:386.7},9).to({regY:202.8,rotation:765,x:1153.2,y:546.8},9).wait(69).to({regY:202.7,rotation:603.6,x:1157.3,y:520.2},6).to({x:1212.1,y:455.7},14).to({regX:90,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:720,skewX:4.8,skewY:1.7,x:1266.1,y:448.5},3).to({regY:202.7,scaleX:0.89,scaleY:0.89,skewX:46.6,skewY:41.8,x:1186.9,y:455.3},22).to({regY:202.8,scaleX:0.9,scaleY:0.88,skewX:88.6,skewY:81.8,x:1089.9,y:485.4},27).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:816.6,skewX:0,skewY:0,x:1200.8,y:422.6},1).to({rotation:872.8,x:1147.9,y:549.6},10).wait(29).to({rotation:818.8,x:1150.5,y:548.2},2).to({regY:202.8,rotation:765,x:1153.2,y:546.8},2).wait(22).to({rotation:717.2,x:1153.4,y:524.7},2).to({regY:202.9,rotation:621.2,x:1153.9,y:480.7},4).to({regY:202.8,scaleX:0.89,scaleY:0.89,rotation:595.4,x:1178.3,y:379.2},28).to({regY:202.9,scaleX:0.89,scaleY:0.89,rotation:621.2,x:1153.9,y:480.7},20).to({regY:202.8,rotation:750.3,x:1258.9,y:447.6},5).to({_off:true},1).wait(62).to({_off:false,regX:90,scaleX:0.91,scaleY:0.91,x:1226.9,y:510.6},1).wait(13).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:765,x:1153.2,y:546.8},1).wait(13).to({scaleX:0.89,scaleY:0.89,rotation:720,skewX:49,skewY:41,x:1160,y:584.5},4).to({regX:89.8,scaleX:0.91,scaleY:0.91,skewX:41.8,skewY:48.2,x:1275.7,y:388.1},3).to({regX:89.9,regY:202.7,skewX:98,skewY:104.4,x:1227,y:528.8},3).to({scaleX:0.91,scaleY:0.91,skewX:69.9,skewY:76.2,x:1241.3,y:450.8},3).to({scaleX:0.91,scaleY:0.91,skewX:32.3,skewY:38.6,x:1260.3,y:346.8},4).to({scaleX:0.91,scaleY:0.91,skewX:58.7,skewY:65,x:1256.8,y:419.6},2).to({scaleX:0.91,scaleY:0.91,skewX:98,skewY:104.4,x:1227,y:528.8},3).to({regY:202.8,scaleX:0.91,scaleY:0.91,skewX:71.7,skewY:78.2,x:1240.3,y:456},2).to({regY:202.7,scaleX:0.91,scaleY:0.91,skewX:32.3,skewY:38.6,x:1260.3,y:346.8},3).to({skewX:98,skewY:104.4,x:1227,y:528.8},5).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:825.2,skewX:0,skewY:0,x:1248.9,y:462.8},4).wait(1).to({regX:89.9,rotation:765,x:1153.2,y:546.8},0).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:827,x:1210.1,y:513.3},3).to({scaleX:0.89,scaleY:0.89,rotation:868.3,x:1248.1,y:490.9},2).to({scaleX:0.89,scaleY:0.89,rotation:918.6,x:1247,y:453.9},3).to({scaleX:0.89,scaleY:0.89,rotation:952.2,x:1246.2,y:429.3},2).to({scaleX:0.89,scaleY:0.89,rotation:969.1,x:1245.9,y:416.9},1).to({regX:89.9,rotation:999.2,x:1252.9,y:440.9},5).wait(26).to({regX:89.8,rotation:900.5,x:1260.4,y:366},5).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:866.1,x:1252,y:393.8},3).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:843.1,x:1246.5,y:412.1},2).to({scaleX:0.89,scaleY:0.89,rotation:820,x:1240.8,y:430.6},2).to({regX:89.9,rotation:827.2,x:1249.4,y:496.7},10).wait(23).to({rotation:765,x:1153.2,y:546.8},7).wait(35).to({regY:202.9,rotation:883.3,x:1235.2,y:515.6},5).to({regX:89.8,regY:202.8,rotation:937,y:515.7},5).to({x:1147.2,y:599.8},5).to({regY:202.9,rotation:948.7,x:1147.1,y:652.5},8).wait(21).to({scaleX:0.89,scaleY:0.89,rotation:1024.3,x:1130.2,y:607.1},3).to({regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1049.4,x:1135.9,y:592},1).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:1125,x:1153.2,y:546.8},3).wait(22).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:1127.6,x:1158.8,y:550.9},5).to({scaleX:0.89,scaleY:0.89,rotation:1130.7,x:1165.7,y:555.9},6).wait(24).to({scaleX:0.89,scaleY:0.89,rotation:1142.7,x:1185.6,y:511.5},3).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:1158.4,x:1212.2,y:452.3},4).wait(25).to({rotation:1125,x:1153.2,y:546.8},6).wait(19).to({regX:89.8,rotation:1131,x:1164.6,y:558.3},7).wait(50).to({regX:89.9,rotation:1145.2,x:1233.9,y:424.4},11).wait(2).to({rotation:1120.3,x:1230,y:428.3},5).to({rotation:1145.2,x:1233.9,y:424.4},6).wait(3).to({rotation:1120.3,x:1230,y:428.3},7).to({rotation:1145.2,x:1233.9,y:424.4},6).wait(3).to({rotation:1125,x:1153.2,y:546.8},5).wait(35).to({regX:89.8,rotation:982.2,x:1181.3,y:470},4).to({x:1201.3,y:346},5).to({regX:89.7,rotation:973.8,x:1233.4,y:358.1},7).wait(1).to({x:1181.4,y:546.1},6,cjs.Ease.get(1)).wait(30).to({regX:89.9,rotation:1125,x:1153.2,y:546.8},4).wait(13).to({regX:90,regY:202.9,scaleY:0.8,rotation:1080,skewX:91.2,skewY:80,x:1153.1,y:546.9},3).to({regX:89.9,regY:202.8,scaleY:0.86,skewX:104.7,skewY:89.7,x:1183.2,y:525.8},7).to({regX:89.8,scaleY:0.89,rotation:1185.5,skewX:0,skewY:0,x:1233.2,y:490.7},9).to({x:1267.2,y:440.7},10).to({regX:89.9,rotation:1230.9,x:1277.1,y:458.7},8).wait(11).to({regX:89.8,rotation:1339.2,x:1217.1,y:472.7},5).wait(1).to({rotation:1367},4).wait(31).to({regX:89.9,rotation:1485,x:1153.2,y:546.8},6).wait(15).to({regY:202.9,rotation:1471.8,x:1151.1,y:503.9},5).wait(52).to({x:1207.1,y:533.9},5).wait(16).to({regY:202.8,scaleX:0.89,scaleY:0.88,rotation:1440,skewX:29.4,skewY:29.8,x:1205.3,y:525.4},3).to({regY:202.9,scaleX:0.86,scaleY:0.91,skewX:28.3,skewY:26.2,x:1205.2,y:509.1},4).to({regY:202.8,scaleX:0.83,scaleY:0.95,skewX:30.7,skewY:25.3,x:1222,y:500.7},3).to({scaleX:0.84,scaleY:0.94,skewX:28.2,skewY:23.9,x:1220.3,y:495.9},3).to({scaleX:0.89,scaleY:0.89,rotation:1485,skewX:0,skewY:0,x:1153.2,y:546.8},9).wait(20).to({regX:89.8,scaleX:0.89,scaleY:0.89,rotation:1547,x:1210.1,y:513.3},3).to({scaleX:0.89,scaleY:0.89,rotation:1588.3,x:1248.1,y:490.9},2).to({scaleX:0.89,scaleY:0.89,rotation:1638.6,x:1247,y:453.9},3).to({scaleX:0.89,scaleY:0.89,rotation:1672.2,x:1246.2,y:429.3},2).to({scaleX:0.89,scaleY:0.89,rotation:1689.1,x:1245.9,y:416.9},1).to({regX:89.9,rotation:1719.2,x:1252.9,y:440.9},5).wait(5).to({regX:89.8,rotation:1620.5,x:1260.4,y:366},5).to({regX:89.9,regY:202.7,scaleX:0.89,scaleY:0.89,rotation:1586.1,x:1252,y:393.8},3).to({regX:89.8,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1563.1,x:1246.5,y:412.1},2).to({scaleX:0.89,scaleY:0.89,rotation:1540,x:1240.8,y:430.6},2).to({regX:89.9,rotation:1547.2,x:1249.4,y:496.7},10).wait(23).to({rotation:1485,x:1153.2,y:546.8},7).wait(27).to({rotation:1489.3,x:1163.1,y:549.4},6).wait(23).to({regX:89.8,rotation:1476.1,x:1136.6,y:503.9},4).wait(10).to({regX:89.9,regY:202.9,rotation:1310.1,x:1214.6,y:529.9},5).wait(31).to({scaleX:0.88,scaleY:0.89,rotation:1440,skewX:-128.2,skewY:-131.7,x:1220.6,y:545.5},0).wait(1).to({scaleX:0.89,scaleY:0.89,rotation:1310.1,skewX:0,skewY:0,x:1214.6,y:529.9},0).to({regX:90,rotation:1339.1,x:1186,y:352.5},12).wait(10).to({regY:203,scaleX:0.89,scaleY:0.89,rotation:1350.2,x:1192.9,y:466.2},2).to({scaleX:0.89,scaleY:0.89,rotation:1395.1,x:1179.7,y:493},1).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:1485,x:1153.2,y:546.8},2).wait(13).to({rotation:1312,x:1174.4,y:427.2},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(480).to({_off:false},0).to({x:1343.9,y:603.6},10).to({x:1326.3,y:687.6},10).to({scaleX:0.64,scaleY:0.64,x:1280.7,y:754.6},12).to({regY:288.1,scaleX:0.48,scaleY:0.48,skewX:21.7,skewY:-158.3,x:1209.3,y:656.7},11).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:0.8,skewY:-179.2,x:1343.9,y:603.6},10).to({regY:288.1,scaleX:0.6,scaleY:0.6,skewX:0.8,x:1292.1,y:747.2},9).to({_off:true,regX:90,regY:202.8,scaleX:0.91,scaleY:0.91,rotation:30.3,skewX:0,skewY:0,x:1226.9,y:510.6,mode:"independent"},1).wait(1090));

	// hand right
	this.instance_5 = new lib.hand("single",0);
	this.instance_5.setTransform(1123.6,1350.1,0.581,0.581,0,-172.3,7.7,39.6,288.1);

	this.instance_6 = new lib.forarm();
	this.instance_6.setTransform(1270.6,449.5,0.888,0.888,30.3,0,0,89.9,202.8);
	this.instance_6._off = true;

	this.instance_7 = new lib.handcopy("single",2);
	this.instance_7.setTransform(1007.7,693,0.581,0.581,0,140.2,-39.8,39.6,288.2);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:683.1},102).to({regY:288.2,skewX:-109.1,skewY:70.9,x:1082.6,y:644.3,startPosition:3},12).to({regY:288.1,skewX:-92.7,skewY:87.3,x:1013.4,y:462.6},5).to({regY:288.2,skewX:-26.6,skewY:153.4,x:1211.6,y:302.2},7).wait(1).to({skewX:-26.6,startPosition:4},0).to({regY:288.1,skewX:59.3,skewY:239.3,x:1401.7,y:454.6},4).to({regY:288,skewX:121.8,skewY:301.8,x:1394,y:582.1},4).to({regX:39.7,skewX:105.6,skewY:285.6,x:1441,y:302.5},5).to({regX:39.8,regY:287.9,skewX:37.9,skewY:217.9,y:438.5},4).to({regY:287.8,skewX:106.9,skewY:286.9,x:1422.8,y:533.9},4).to({regX:39.7,regY:288,skewX:105.6,skewY:285.6,x:1441,y:302.5},5).to({regX:39.8,regY:287.9,skewX:37.9,skewY:217.9,y:438.5},4).to({regY:287.8,skewX:106.9,skewY:286.9,x:1422.8,y:533.9},4).wait(1).to({startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:163.1,skewY:343.1,x:1269.4,y:650.2,startPosition:9},1).to({scaleX:0.58,scaleY:0.58,skewX:228.9,skewY:408.9,x:1104.4,y:625.2},1).to({regX:39.8,regY:287.7,scaleX:0.58,scaleY:0.58,skewX:294.4,skewY:474.4,x:983.2,y:512.2},1).to({regX:39.7,regY:287.8,skewX:311.5,skewY:491.5,x:1048.9,y:339.4},3).to({regY:287.7,skewX:393.2,skewY:573.2,x:1231.6,y:322.5,startPosition:10},3).to({regX:39.8,skewX:398.7,skewY:578.7,x:1357.4,y:446},11,cjs.Ease.get(1)).to({skewX:370.5,skewY:550.5,x:1338.7,y:267.3},6).to({skewX:377.7,skewY:557.7,x:1354.3,y:269.2,startPosition:1},1).to({startPosition:1},6).to({regX:39.9,skewX:407.2,skewY:587.2,x:1373.9,y:241.8},9).to({scaleX:0.58,scaleY:0.58,skewX:422.9,skewY:602.9,y:313.4,startPosition:6},1).to({regX:39.8,regY:287.9,scaleX:0.58,scaleY:0.58,skewX:423.1,skewY:603.1,x:1374.1,y:528},3).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:547.7,skewY:727.7,x:1123.6,y:683.1,startPosition:0},5).wait(69).to({startPosition:0},0).to({scaleX:0.58,scaleY:0.58,skewX:496.1,skewY:676.1,x:1293.8,y:671.6},2).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:470.3,skewY:650.3,x:1349.7,y:586.9,startPosition:1},1).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:450.9,skewY:630.9,x:1308,y:394.9},2).to({regX:39.7,regY:287.7,scaleX:0.58,scaleY:0.58,skewX:393.2,skewY:573.2,x:1231.6,y:322.5,startPosition:10},1).to({regX:39.6,skewX:422.7,skewY:602.7,x:1286.3,y:260.1},14).to({scaleX:0.57,scaleY:0.57,skewX:387.6,skewY:567.6,x:1403.1,y:362.1,startPosition:4},1).to({regX:39.8,regY:287.8,skewX:415.1,skewY:595.1,x:1424.6,y:489.2},1).to({regX:39.6,regY:287.7,scaleX:0.56,scaleY:0.53,skewX:319.7,skewY:499.3,x:1406.9,y:580,startPosition:7},1).to({regX:39.8,regY:287.6,scaleX:0.56,scaleY:0.53,skewX:349.4,skewY:530.4,x:1326.2,y:636.5},10).to({regX:39.6,regY:287.7,scaleY:0.53,skewX:357,skewY:539.7,x:1203.7,y:644.3},12).to({scaleY:0.53,skewX:361.5,skewY:545.8,x:1083.7,y:655.9},13).to({regY:287.6,scaleY:0.54,skewX:366.6,skewY:552.8,x:954.3,y:627.9},14).to({regY:287.8,scaleX:0.55,scaleY:0.55,skewX:254.6,skewY:434.6,x:1049.6,y:523.5,startPosition:3},1).to({regX:39.5,regY:287.7,scaleX:0.55,scaleY:0.55,skewX:308.9,skewY:488.9,x:963.2,y:471.8},10).wait(29).to({startPosition:3},0).to({scaleX:0.56,scaleY:0.56,skewX:271.9,skewY:451.9,x:1043.4,y:635.9},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},2).wait(22).to({startPosition:0},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:153.4,skewY:333.4,x:1268.2,y:645.7},2).to({regX:39.5,regY:288.1,skewX:136,skewY:316,x:1340.4,y:594.8},1).to({regX:39.4,regY:287.9,skewX:69.7,skewY:249.7,x:1336.4,y:408.3},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:36.5,skewY:216.5,x:1275.8,y:315},1).to({regY:287.9,skewX:0.3,skewY:180.5,x:1245.7,y:185.2},28).to({regY:288.1,skewX:36.5,skewY:216.5,x:1275.8,y:315},20).wait(1).to({x:1359.9,y:399.1,startPosition:5},0).to({scaleX:0.58,scaleY:0.58,skewX:63.9,skewY:243.9,x:1364.7,y:472.3},1).to({skewX:91.3,skewY:271.3,x:1353.3,y:539.1},1).to({skewX:118.6,skewY:298.6,x:1341.9,y:605.9},1).to({scaleX:0.58,scaleY:0.58,skewX:146,skewY:326,x:1279.8,y:620},1).to({_off:true},1).wait(62).to({_off:false,scaleX:0.6,scaleY:0.6,skewX:0.8,skewY:180.8,x:1292.1,y:747.2,startPosition:2},1).to({skewX:0.8},13).to({scaleX:0.58,scaleY:0.58,skewX:-172.3,skewY:7.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({skewY:7.7},0).to({scaleX:0.62,scaleY:0.54,skewX:-171.1,skewY:6.7,x:1128.3,y:711.5},4).to({regY:288.2,scaleX:0.61,scaleY:0.58,skewX:-111.1,skewY:72.4,x:1288.2,y:591.7,startPosition:3},3).to({regY:288.1,skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},3).to({scaleY:0.58,skewX:-83.2,skewY:100.3,x:1162.4,y:626.3},3).to({scaleY:0.58,skewX:-120.7,skewY:62.8,x:1306.4,y:545.6},4).to({skewX:-94.3,skewY:89.2,x:1219.6,y:606},2).to({skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},3).to({regY:288,scaleY:0.58,skewX:-81.2,skewY:102.3,x:1161.4,y:609.8},2).to({regY:288.1,scaleY:0.58,skewX:-120.7,skewY:62.8,x:1306.4,y:545.6},3).to({skewX:-54.9,skewY:128.6,x:1064.7,y:652.5},5).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:-68.7,skewY:111.3,x:1096.2,y:554.1},4).wait(1).to({regY:288.1,skewX:-172.3,skewY:7.7,x:1123.6,y:683.1},0).to({scaleX:0.58,scaleY:0.58,skewX:-133.6,skewY:46.4,x:1023,y:590.2},3).to({regX:39.5,scaleX:0.58,scaleY:0.58,skewX:-107.8,skewY:72.2,x:1052.6,y:418.2},2).to({regY:288,scaleX:0.58,scaleY:0.58,skewX:-55.4,skewY:124.6,x:1179.1,y:260.1},3).to({skewX:-20.5,skewY:159.5,x:1297.8,y:230.1},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-3.1,skewY:176.9,x:1337.5,y:254.1,startPosition:6},1).to({regX:39.5,skewX:63.4,skewY:243.4,x:1418.6,y:344.1},5).wait(26).to({startPosition:6},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:35.6,skewY:215.6,x:1300.1,y:234.8},2).to({regX:39.5,regY:288,scaleX:0.58,scaleY:0.58,skewX:7.7,skewY:187.7,x:1181.8,y:203.4},2).to({regY:288.2,skewX:-35.3,skewY:144.7,x:1131.8,y:217,startPosition:9},1).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:-39.3,skewY:140.7,x:1063.2,y:368.8},3).to({skewX:-42.1,skewY:137.9,x:1063.1,y:460.8},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-44.7,skewY:135.3,x:1062.9,y:552.8},2).to({regY:288,skewX:-37.5,skewY:142.5,x:1057.6,y:595.6},10).wait(23).to({startPosition:9},0).to({regX:39.6,regY:288.1,skewX:-172.3,skewY:7.7,x:1123.6,y:702.6,startPosition:0},7).wait(19).to({skewY:7.7,y:683.1},0).wait(16).to({regX:39.5,regY:288.2,skewX:-156.7,skewY:23.3,x:1149.1,y:743.7,startPosition:5},0).to({regY:288.1,skewX:-47.7,skewY:132.3,x:1066.9,y:415.3},5).wait(1).to({skewX:-62.4,skewY:117.6,x:1096.1,y:372.4,startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:-26.6,skewY:153.4,x:1162.7,y:336.1},2).to({scaleX:0.58,scaleY:0.58,skewX:-13.7,skewY:166.3,x:1221.3,y:313.7},2).to({skewX:4.7,skewY:184.7,x:1123.4,y:427.1},5).to({regX:39.5,skewX:16.4,skewY:196.4,x:1159,y:478.6},8).wait(21).to({startPosition:4},0).to({regY:288.2,skewX:90,skewY:270,x:1304.2,y:581.9},3).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:114.3,skewY:294.3,x:1296.2,y:640.4},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(13).to({startPosition:0},0).wait(9).to({startPosition:0},0).to({skewX:190.3,skewY:370.3,x:1123.3,y:685.7},5).to({skewX:193.5,skewY:373.5,x:1122.8,y:688.6},6).wait(1).to({startPosition:0},0).wait(23).to({startPosition:0},0).to({regY:288.2,scaleY:0.54,skewX:180.3,skewY:360.3,x:1102.4,y:658.6},3).to({scaleY:0.48,skewX:162.8,skewY:342.8,x:1075.1,y:618.7,startPosition:3},4).wait(25).to({startPosition:3},0).to({regY:288.1,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},6).wait(19).to({startPosition:0},0).to({startPosition:0},7).wait(50).to({startPosition:11},0).to({regY:288.3,skewX:128.3,skewY:308.3,x:1151.9,y:601,startPosition:10},11).wait(2).to({startPosition:10},0).to({x:1234,y:624.5},5).to({x:1151.9,y:601},6).wait(3).to({startPosition:10},0).to({x:1234,y:624.5},7).to({x:1151.9,y:601},6).wait(3).to({startPosition:10},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:202.6,skewY:382.6,x:1160.1,y:651.5},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(35).to({startPosition:0},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:124.4,skewY:304.4,x:1333,y:589.2},2).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:61.2,skewY:241.2,x:1318.5,y:323.3,startPosition:10},2).to({regY:288.2,skewX:21.2,skewY:201.2,x:1338.5,y:199.3},5).to({skewX:17,skewY:197,x:1344.6,y:179.3},7).wait(1).to({startPosition:3},0).to({regX:39.6,regY:288.1,skewX:6.3,skewY:186.3,x:1302.6,y:375.3},6,cjs.Ease.get(1)).wait(8).to({skewX:6.3},0).wait(22).to({startPosition:3},0).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:40.6,skewY:220.6,x:1370.8,y:497.3},1).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:75.1,skewY:255.1,x:1351,y:619.2},1).to({regX:39.3,scaleX:0.58,scaleY:0.58,skewX:131.4,skewY:311.4,x:1259.3,y:707.2},1).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({startPosition:0},0).to({_off:true,regY:288.2,skewX:140.2,skewY:320.2,x:1007.7,y:693,startPosition:2},2).wait(52).to({_off:false,regX:39.5,skewX:31.4,skewY:211.4,x:1347.7,y:301,startPosition:10},0).to({regX:39.4,skewX:13.5,skewY:193.5,x:1411.8,y:399},4).to({regX:39.5,regY:288.3,skewX:69.7,skewY:249.7,x:1411.7},6).wait(25).to({startPosition:10},0).to({scaleX:0.58,scaleY:0.58,skewX:128.6,skewY:308.6,x:1327.7,y:601.1},3).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},3).wait(15).to({startPosition:0},0).to({x:1181.6,y:703.1},5).wait(27).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(20).to({startPosition:0},0).to({startPosition:0},5).wait(11).to({startPosition:0},0).wait(5).to({startPosition:0},0).to({skewX:185.2,skewY:365.8,x:1187.4,y:695.5},3).to({regY:288.2,scaleX:0.58,scaleY:0.59,skewX:185.1,skewY:361.3,y:680.6},4).to({scaleY:0.59,skewX:188.8,skewY:359.4,x:1192.8,y:672.9},3).to({scaleY:0.59,skewX:185.8,skewY:358.3,x:1200.1,y:668.4},3).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1},9).wait(20).to({startPosition:3},0).to({scaleX:0.58,scaleY:0.58,skewX:226.4,skewY:406.4,x:1023,y:590.2},3).to({regX:39.5,scaleX:0.58,scaleY:0.58,skewX:252.2,skewY:432.2,x:1052.6,y:418.2},2).to({regY:288,scaleX:0.58,scaleY:0.58,skewX:304.6,skewY:484.6,x:1179.1,y:260.1},3).to({skewX:339.5,skewY:519.5,x:1297.8,y:230.1},2).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,skewX:356.9,skewY:536.9,x:1337.5,y:254.1,startPosition:6},1).to({regX:39.5,skewX:423.4,skewY:603.4,x:1418.6,y:344.1},5).wait(5).to({startPosition:6},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,skewX:395.6,skewY:575.6,x:1300.1,y:234.8},2).to({regX:39.5,regY:288,scaleX:0.58,scaleY:0.58,skewX:367.7,skewY:547.7,x:1181.8,y:203.4},2).to({regY:288.2,skewX:324.7,skewY:504.7,x:1131.8,y:217,startPosition:9},1).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:320.7,skewY:500.7,x:1063.2,y:368.8},3).to({skewX:317.9,skewY:497.9,x:1063.1,y:460.8},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:315.3,skewY:495.3,x:1062.9,y:552.8},2).to({regY:288,skewX:322.5,skewY:502.5,x:1057.6,y:595.6},10).wait(23).to({startPosition:9},0).to({regX:39.6,regY:288.1,skewX:187.7,skewY:367.7,x:1123.6,y:702.6,startPosition:0},7).wait(1).to({y:683.1},0).wait(26).to({startPosition:0},0).to({startPosition:0},6).to({startPosition:0},23).to({regY:288.2,skewX:174.5,skewY:354.5,x:1128.7,y:643.2},4).wait(10).to({x:1136.7,y:697.2},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:146.2,skewY:326.2,x:1275.2,y:668.8},1).to({skewX:117.8,skewY:297.8,x:1353.9,y:582.5},1).to({regX:39.8,scaleX:0.58,scaleY:0.58,skewX:89.7,skewY:269.7,x:1377.5,y:478.6},1).to({scaleX:0.58,scaleY:0.58,skewX:91.9,skewY:271.9,x:1329.1,y:364.9},1).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,skewX:33,skewY:213,x:1244.7,y:331.2},1).wait(31).to({scaleX:0.59,scaleY:0.57,skewX:34.7,skewY:211.4,x:1251.5,y:353.6},0).wait(1).to({scaleX:0.58,scaleY:0.58,skewX:33,skewY:213,x:1244.7,y:331.2,startPosition:6},0).to({regX:39.5,regY:288.1,skewX:10.8,skewY:190.8,x:1309.1,y:193.4},12).wait(10).to({startPosition:6},0).to({regX:39.6,regY:288.3,skewX:14.5,skewY:194.5,x:1340.9,y:347.2},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:45,skewY:225,x:1404.5,y:523.2},1).to({skewX:116.3,skewY:296.3,x:1284.1,y:663.1},1).to({scaleX:0.58,scaleY:0.58,skewX:187.7,skewY:367.7,x:1123.6,y:683.1,startPosition:0},1).wait(13).to({startPosition:0},0).to({scaleX:0.58,scaleY:0.58,skewX:140.2,skewY:320.2,x:1257.8,y:671},2).to({regY:288.3,scaleX:0.58,scaleY:0.58,skewX:92.6,skewY:272.6,x:1379.8,y:522.7},2).to({regY:288.2,scaleX:0.58,scaleY:0.58,skewX:40.4,skewY:220.4,x:1345.9,y:348.6},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,skewX:-11.7,skewY:168.3,x:1227.9,y:226.5},2).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(480).to({_off:false},0).to({x:1280.4,y:373.2},10).to({x:1262.8,y:457.3},10).to({regX:90,scaleX:0.98,scaleY:0.98,x:1211.1,y:501.8},12).to({regY:202.9,scaleX:0.73,scaleY:0.73,rotation:51.2,x:1228.1,y:462.3},11).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:30.3,x:1280.4,y:373.2},10).to({regX:90,scaleX:0.91,scaleY:0.91,x:1226.9,y:510.6},9).to({_off:true,regX:39.6,regY:288.1,scaleX:0.6,scaleY:0.6,rotation:0,skewX:0.8,skewY:-179.2,x:1292.1,y:747.2,mode:"single",startPosition:2},1).wait(1090));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1111).to({_off:false},2).wait(1).to({x:1000.7,y:665},0).to({x:1005.7,y:573},16).to({x:1047.7,y:525},10).to({skewX:100.5,skewY:280.5,x:1060.7,y:542,startPosition:7},1).to({regX:39.5,skewX:137.7,skewY:317.7,x:1060.6,y:404.9},7).wait(11).to({x:1071.6,y:414.9},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,x:1148,y:293.4},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,x:1347.6,y:301.9},3).to({_off:true},1).wait(468));

	// forearm left
	this.instance_8 = new lib.forarm();
	this.instance_8.setTransform(807.4,1178.9,0.888,0.888,0,-44,136,89.9,202.9);

	this.instance_9 = new lib.hand("single",2);
	this.instance_9.setTransform(690.5,657.3,0.581,0.581,-21,0,0,39.6,288.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:512},102).to({skewX:-80.5,skewY:99.5,x:715.5,y:506.1},12).to({regY:203,skewX:-214.5,skewY:-34.5,y:529.5},12).wait(1).to({regY:203.1,skewX:-282.2,skewY:-102.2,x:734.8,y:463.6},4).to({regX:89.8,skewX:-334.1,skewY:-154.1,x:738.4,y:430.5},4).to({skewX:-276.2,skewY:-96.2,x:724.8,y:344.4},5).to({x:726.8,y:472.4},4).to({skewX:-347.9,skewY:-167.9,x:710.8,y:402.5},4).to({skewX:-276.2,skewY:-96.2,x:724.8,y:344.4},5).to({x:726.8,y:472.4},4).to({skewX:-347.9,skewY:-167.9,x:710.8,y:402.5},4).wait(1).to({skewX:-322.4,skewY:-142.4,x:740.8,y:482.4},0).to({regY:203.2,skewX:-256.9,skewY:-76.9,x:707.5,y:380.5},3).to({x:740.7,y:495.8},6).to({regY:203.3,skewX:-303.6,skewY:-123.6,x:758.5,y:484.1},11,cjs.Ease.get(1)).to({scaleX:0.96,scaleY:0.89,skewX:-378,skewY:-176.2,x:749.7,y:486.1},3).to({regY:203.2,scaleX:0.89,scaleY:0.89,skewX:-454.7,skewY:-274.7,x:724.8,y:485.5},3).to({regY:203.3,skewX:-478.7,skewY:-298.7,x:728.8,y:495.2},7).wait(9).to({regX:89.9,regY:202.9,skewX:-404,skewY:-224,x:807.4,y:512},9).wait(69).to({regX:89.8,regY:203.2,skewX:-256.9,skewY:-76.9,x:740.7,y:495.8},6).to({x:715.3,y:431.3},14).to({regX:89.7,regY:203.3,scaleX:0.89,scaleY:0.89,skewX:-152.9,skewY:27.1,x:741.5,y:517.9},2).to({regX:89.8,scaleX:0.88,scaleY:0.9,skewX:-100.6,skewY:82.3,x:818.3,y:502.7},1).to({regX:89.9,scaleX:0.9,scaleY:0.88,skewX:-61.1,skewY:122.9,x:741.5,y:456.7},22).to({regX:89.7,scaleX:0.92,scaleY:0.86,skewX:11,skewY:196.8,x:708.1,y:473.9},27).to({regX:89.6,scaleX:0.89,scaleY:0.89,skewX:-99.5,skewY:80.5,x:610.3,y:419.5},1).to({regX:89.7,skewX:-146.7,skewY:33.3,x:783.5,y:534},10).wait(29).to({skewX:-95.3,skewY:84.7,x:795.6,y:523},2).to({regX:89.9,regY:202.9,skewX:-44,skewY:136,x:807.4,y:512},2).wait(22).to({skewX:-53.2,skewY:126.8,x:736.8,y:505.7},6).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-55.3,skewY:124.6,x:719.7,y:512.7},28).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-53.2,skewY:126.8,x:736.8,y:505.7},20).to({skewX:-45.2,skewY:134.8,x:687.8,y:445.7},5).to({_off:true},1).wait(62).to({_off:false,regX:89.8,scaleX:0.97,scaleY:0.97,x:752.6,y:482},1).wait(13).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:807.4,y:512},1).wait(13).to({scaleX:0.9,scaleY:0.89,skewX:-48,skewY:140,x:788.9,y:551.9},4).to({scaleX:0.91,scaleY:0.91,skewX:-40.8,skewY:132.8,x:715.9,y:332.3},3).to({skewX:-24.3,skewY:149.3,x:748.5,y:280.5},3).to({scaleX:0.9,scaleY:0.91,skewX:-55.7,skewY:117.8,x:727.8,y:392.4},3).to({regY:203,scaleX:0.91,scaleY:0.91,skewX:-97.5,skewY:76.1,x:755.1,y:523.5},4).to({scaleX:0.9,scaleY:0.91,skewX:-68.2,skewY:105.3,x:729,y:422.5},2).to({regY:202.9,scaleX:0.91,scaleY:0.91,skewX:-24.3,skewY:149.3,x:746.6,y:292.2},3).to({scaleX:0.9,scaleY:0.91,skewX:-53.6,skewY:120.1,x:730.5,y:382.7},2).to({regY:203,scaleX:0.91,scaleY:0.91,skewX:-97.5,skewY:76.1,x:755.1,y:523.5},3).to({regY:202.9,skewX:-24.3,skewY:149.3,x:748.5,y:280.5},5).to({scaleX:0.89,scaleY:0.89,skewX:-37.5,skewY:142.5,x:717.5,y:408.3},4).wait(1).to({skewX:-44,skewY:136,x:807.4,y:512},0).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-109.3,skewY:70.7,x:755.8,y:492.2},3).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,skewX:-153,skewY:27,x:721.5,y:479.1},2).to({scaleX:0.89,scaleY:0.89,skewX:-202.6,skewY:-22.6,x:724.5,y:457.5},3).to({scaleX:0.89,scaleY:0.89,skewX:-235.9,skewY:-55.9,x:726.5,y:443.1},2).to({regX:89.8,regY:203,scaleX:0.89,scaleY:0.89,skewX:-252.4,skewY:-72.4,x:727.5,y:435.9},1).to({regX:89.9,skewX:-291.9,skewY:-111.9,x:742.3,y:455.9},5).wait(26).to({skewX:-200.7,skewY:-20.7,x:693.3,y:401.6},5).to({regX:90,scaleX:0.89,scaleY:0.89,skewX:-163.2,skewY:16.8,x:699.3,y:426.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-137.9,skewY:42.1,x:703.3,y:443.5},2).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-112.8,skewY:67.2,x:707.1,y:460.3},2).to({skewX:-105.5,skewY:74.5,x:716.2,y:459},10).wait(23).to({regY:202.9,skewX:-44,skewY:136,x:807.4,y:512},7).wait(35).to({regX:89.8,regY:202.8,skewX:-79.9,skewY:100.1,x:768.3,y:488.3},5).to({regX:89.9,skewX:-150.7,skewY:29.3,x:772.3,y:508},5).to({regX:89.8,skewX:-169.6,skewY:10.4,x:856.4,y:517.7},5).to({skewX:-157.9,skewY:22.1,x:879,y:513.1},8).wait(21).to({regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-109,skewY:71,x:821,y:518.4},3).to({skewX:-92.8,skewY:87.2,x:817.7,y:516.8},1).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:807.4,y:512},3).wait(22).to({scaleX:0.89,scaleY:0.89,skewX:-61.1,skewY:118.9,x:749.2,y:460.1},5).to({regX:90,scaleX:0.86,scaleY:0.78,skewX:-49.9,skewY:167.3,x:752.8,y:367.4},6).wait(1).to({regY:203,skewX:-122.9,skewY:199.9,x:765.4,y:407.3},0).to({scaleX:0.98,scaleY:0.89,skewX:-160.2,skewY:197,x:802.2,y:343.7},5).wait(18).to({regY:203.1,scaleX:0.94,scaleY:0.85,skewX:-91.3,skewY:266,x:716.3,y:417.5},3).to({scaleX:0.88,scaleY:0.79,skewX:0.6,skewY:357.8,x:697.5,y:484.1},4).wait(25).to({skewX:0.6},0).to({skewX:29.8,skewY:387,x:783.5,y:521.2},5).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:496,x:807.4,y:512},1).wait(19).to({regX:89.8,regY:202.8,skewX:0,skewY:540,x:795,y:482},2).to({regX:89.9,skewX:109.2,skewY:649.2,x:763.8,y:407.6},5).wait(50).to({skewX:100.3,skewY:640.3,x:732,y:428.7},11).wait(2).to({regX:89.8,regY:202.7,skewX:111.2,skewY:651.2,x:716.4,y:387.7},5).to({regX:89.9,regY:202.8,skewX:100.3,skewY:640.3,x:732,y:428.7},6).wait(3).to({regX:89.8,regY:202.7,skewX:111.2,skewY:651.2,x:716.4,y:387.7},7).to({regX:89.9,regY:202.8,skewX:100.3,skewY:640.3,x:732,y:428.7},6).wait(3).to({regY:202.9,skewX:-44,skewY:496,x:807.4,y:512},5).wait(35).to({skewX:-44},0).to({regX:89.8,regY:203,skewX:-55,skewY:485,x:795.5,y:533.8},4).wait(5).to({regX:89.9,skewX:-50.2,skewY:489.8,x:823.5,y:518},7).wait(37).to({regY:202.9,skewX:-44,skewY:496,x:807.4,y:512},4).wait(13).to({regX:89.8,regY:202.8,scaleY:0.77,skewX:-72.5,skewY:476.8,y:511.8},3).to({regX:89.9,regY:202.9,scaleY:0.85,skewX:-97.3,skewY:456,x:775,y:495.4},7).to({regY:202.8,scaleY:0.89,skewX:-110.4,skewY:429.6,x:733.3,y:473.9},9).to({skewX:-121.7,skewY:418.3,x:699.3,y:478},10).to({regX:89.8,skewX:-152.1,skewY:387.9,x:699.2,y:477.9},8).wait(11).to({skewX:-254.6,skewY:285.4,x:755.3,y:507.8},5).wait(1).to({skewX:-286.3,skewY:253.7,y:507.9},4).to({skewX:-286.3},6).wait(25).to({regX:89.9,regY:202.9,skewX:-404,skewY:136,x:807.4,y:512},6).wait(15).to({regX:89.8,regY:203,skewX:-534.7,skewY:5.3,x:738.5,y:562.7},5).wait(27).to({skewY:5.3},0).to({skewX:-590.9,skewY:-50.9},5).wait(20).to({regX:89.7,skewX:-630.6,skewY:-90.6,x:744.5,y:380.7},5).wait(11).to({regY:203.1,skewX:-723.8,skewY:-183.8,x:817.2,y:486.4},5).to({regX:89.6,scaleX:0.89,scaleY:0.89,skewX:-726.3,skewY:-185.7,x:813.8,y:490.7},3).to({scaleX:0.9,scaleY:0.88,skewX:-726.4,skewY:-190.2,y:505.9},4).to({regY:203,scaleX:0.91,scaleY:0.87,skewX:-722.7,skewY:-191.9,x:829.8,y:510.4},3).to({regX:89.7,scaleX:0.91,scaleY:0.88,skewX:-725.7,skewY:-193,x:828.6,y:512.9},3).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-764,skewY:-224,x:807.4,y:512},9).wait(20).to({regX:89.8,scaleX:0.89,scaleY:0.89,skewX:-829.3,skewY:-289.3,x:755.8,y:492.2},3).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,skewX:-873,skewY:-333,x:721.5,y:479.1},2).to({scaleX:0.89,scaleY:0.89,skewX:-922.6,skewY:-382.6,x:724.5,y:457.5},3).to({scaleX:0.89,scaleY:0.89,skewX:-955.9,skewY:-415.9,x:726.5,y:443.1},2).to({regX:89.8,regY:203,scaleX:0.89,scaleY:0.89,skewX:-972.4,skewY:-432.4,x:727.5,y:435.9},1).to({regX:89.9,skewX:-1011.9,skewY:-471.9,x:742.3,y:455.9},5).wait(5).to({skewX:-920.7,skewY:-380.7,x:693.3,y:401.6},5).to({regX:90,scaleX:0.89,scaleY:0.89,skewX:-883.2,skewY:-343.2,x:699.3,y:426.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-857.9,skewY:-317.9,x:703.3,y:443.5},2).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-832.8,skewY:-292.8,x:707.1,y:460.3},2).to({skewX:-825.5,skewY:-285.5,x:716.2,y:459},10).wait(23).to({regY:202.9,skewX:-764,skewY:-224,x:807.4,y:512},7).wait(27).to({scaleX:0.92,scaleY:0.82,skewX:-798.2,skewY:-215.6,x:819.8,y:525.7},2).to({regY:203.2,scaleX:0.94,scaleY:0.78,skewX:-815.1,skewY:-211.6,x:826,y:532.6},1).to({regX:89.7,regY:203.1,skewX:-836.4,skewY:-179.8,x:844.1,y:540.7},1).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:-160,skewX:-720,skewY:0,x:844.9,y:565},2).to({regX:90,regY:202.9,rotation:-179.3},23).to({regX:89.9,regY:202.8,rotation:-305,x:784.4,y:527.8},4).wait(46).to({regX:90,scaleX:0.88,scaleY:0.89,rotation:-360,skewX:-663.4,skewY:53.3,x:778.7,y:543.6},0).wait(1).to({regX:89.9,scaleX:0.89,scaleY:0.89,rotation:-305,skewX:-720,skewY:0,x:784.4,y:527.8},0).to({rotation:-168,x:676.5,y:404.8},12).wait(10).to({regY:202.5,scaleX:0.89,scaleY:0.84,rotation:0,skewX:-543.2,skewY:169.7,x:738.9,y:487.7},2).to({regX:89.8,regY:202.8,scaleX:0.88,scaleY:0.9,skewX:-688.7,skewY:207.1,x:767.9,y:485.6},1).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-764,skewY:136,x:807.4,y:512},2).wait(13).to({regX:89.8,skewX:-759.2,skewY:140.8,x:759.2,y:497.5},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(480).to({_off:false},0).to({x:678.8,y:563.5},10).to({scaleX:0.68,scaleY:0.68,x:748,y:728.3},10).to({regX:39.5,regY:288.1,scaleX:0.49,scaleY:0.56,rotation:0,skewX:-37.8,skewY:-34.7,x:735.6,y:661.2},12).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:-21,skewX:0,skewY:0,x:678.8,y:563.5},11).to({scaleX:0.68,scaleY:0.68,x:748,y:728.3},10).to({regY:288.3,scaleX:0.64,scaleY:0.64,x:755.5,y:735.2},9).to({_off:true,regX:89.8,regY:202.9,scaleX:0.97,scaleY:0.97,rotation:0,skewX:-45.2,skewY:134.8,x:752.6,y:482,mode:"independent"},1).wait(1090));

	// hand left
	this.instance_10 = new lib.hand("single",0);
	this.instance_10.setTransform(811.9,1379.9,0.581,0.581,149,0,0,39.6,288.2);

	this.instance_11 = new lib.forarm();
	this.instance_11.setTransform(687.8,426.2,0.888,0.888,0,-45.2,134.8,89.9,202.9);
	this.instance_11._off = true;

	this.instance_12 = new lib.handcopy("single",2);
	this.instance_12.setTransform(915.1,702.9,0.581,0.581,-96.5,0,0,39.6,288.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({y:712.9},102).to({x:851,y:654.3,startPosition:3},12).to({regX:39.4,rotation:120.2,x:908.8,y:479},5).to({regX:39.6,rotation:30.8,x:731.8,y:318},7).wait(1).to({rotation:30.8,startPosition:4},0).to({regY:288.3,rotation:-40.7,x:553.9,y:370.9},4).to({rotation:-120.1,x:539.2,y:506.5},4).to({regY:288.2,rotation:-78.6,x:566.6,y:218.9},5).to({regX:39.5,rotation:-21.8,x:554.6,y:364.9},4).to({rotation:-120.1,x:564.6,y:514.9},4).to({regX:39.6,rotation:-78.6,x:566.6,y:218.9},5).to({regX:39.5,rotation:-21.8,x:554.6,y:364.9},4).to({rotation:-120.1,x:564.6,y:514.9},4).wait(1).to({x:566.6,y:500.9,startPosition:6},0).to({regX:39.4,rotation:-7.5,x:587.8,y:220.4},3).to({x:621,y:318.2,startPosition:10},6).to({regX:39.3,rotation:-45.9,x:552.1,y:460.6},11,cjs.Ease.get(1)).wait(1).to({startPosition:8},0).to({regX:39.2,rotation:-124.4,x:662.4,y:604.2,startPosition:5},2).to({regX:39.3,scaleX:0.58,scaleY:0.58,rotation:-226.6,x:785.8,y:633.5,startPosition:8},2).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:-287.9,x:865.4,y:601.4,startPosition:3},1).to({regY:288.1,rotation:-307.4,x:900.5,y:548.7},7).to({startPosition:3},9).to({regX:39.2,regY:287.9,rotation:-264.7,x:861.2,y:621.6},4).to({regX:39.6,regY:288.2,rotation:-211,x:811.9,y:712.9,startPosition:0},5).wait(69).to({startPosition:0},0).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:-138.4,x:641.5,y:662.7},2).to({regY:288,rotation:-102.1,x:585.5,y:587.9},1).to({regX:39.6,rotation:-102.9,x:595.5,y:390.6},2).to({regX:39.4,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:-7.5,x:621,y:318.2,startPosition:10},1).to({rotation:-52.9,x:591.7,y:257.6},14).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:42.9,x:784.9,y:276.9,startPosition:4},1).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:90.5,x:929,y:436.9,startPosition:6},1).to({regX:39.5,regY:288.1,scaleX:0.59,scaleY:0.57,rotation:0,skewX:-75.9,skewY:-73.2,x:994.5,y:634,startPosition:7},1).to({scaleX:0.59,scaleY:0.57,skewX:-7.6,skewY:-5.1,x:900.8,y:645.3},10).to({regX:39.4,scaleX:0.6,scaleY:0.56,skewX:-0.1,skewY:2.2,x:788.2,y:645.9},12).to({regY:288.2,scaleX:0.61,scaleY:0.55,skewX:16.5,skewY:18.6,x:638.6,y:630.2},13).to({regX:39.5,regY:288.1,scaleX:0.61,scaleY:0.55,skewX:34.5,skewY:36.4,x:517.9,y:564.5},14).to({regX:39.4,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:102.2,skewX:0,skewY:0,x:766.1,y:516.2,startPosition:3},1).to({regX:39.3,rotation:55,x:960.2,y:485.3},10).wait(29).to({startPosition:3},0).to({rotation:84.8,x:925.1,y:620.5},2).to({regX:39.6,rotation:149,x:811.9,y:712.9,startPosition:0},2).wait(22).to({startPosition:0},0).to({rotation:139.8,x:824.3,y:717},6).to({scaleX:0.58,scaleY:0.58,rotation:0,skewX:137.7,skewY:137.6,x:815.5,y:720.9},28).to({scaleX:0.58,scaleY:0.58,rotation:139.8,skewX:0,skewY:0,x:824.3,y:717},20).to({scaleX:0.58,scaleY:0.58,rotation:139.9,x:749.7,y:658.7,startPosition:3},1).to({scaleX:0.58,scaleY:0.58,rotation:139.8,x:695.3,y:619.3},4).to({_off:true},1).wait(62).to({_off:false,regY:288.3,scaleX:0.64,scaleY:0.64,rotation:-21,x:755.5,y:735.2,startPosition:2},1).to({startPosition:2},13).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},1).wait(13).to({startPosition:0},0).to({scaleX:0.6,scaleY:0.56,rotation:0,skewX:145.4,skewY:152.5,x:793.8,y:739.3},4).to({regY:288.1,scaleX:0.6,scaleY:0.59,skewX:129.4,skewY:123.4,x:715,y:528.9,startPosition:3},3).to({skewX:145.9,skewY:139.9,x:691.9,y:468.7},3).to({regX:39.7,regY:288,scaleX:0.6,scaleY:0.59,skewX:114.5,skewY:108.5,x:759.8,y:570.1},3).to({regX:39.6,regY:288.1,scaleX:0.6,scaleY:0.59,skewX:72.7,skewY:66.7,x:918.8,y:632.3},4).to({regY:287.9,scaleY:0.59,skewX:101.8,skewY:95.8,x:794.9,y:588.4},2).to({regY:288.1,scaleY:0.59,skewX:145.9,skewY:139.9,x:689.9,y:480.4},3).to({scaleX:0.6,scaleY:0.59,skewX:116.6,skewY:110.6,x:752.2,y:558.7},2).to({scaleX:0.6,scaleY:0.59,skewX:72.7,skewY:66.7,x:918.8,y:632.3},3).to({skewX:145.9,skewY:139.9,x:691.9,y:468.7},5).to({scaleX:0.58,scaleY:0.58,rotation:129.8,skewX:0,skewY:0,x:686.8,y:587.8},4).wait(1).to({regY:288.2,rotation:149,x:811.9,y:712.9},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:143.8,x:938.7,y:550.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:91.8,x:909.9,y:390},2).to({scaleX:0.58,scaleY:0.58,rotation:49.4,x:778.4,y:263.2},3).to({rotation:20.8,x:665.8,y:246.1},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:6.8,x:622.9,y:260.3,startPosition:6},1).to({regX:39.6,rotation:-57.9,x:550,y:386.9},5).wait(26).to({rotation:-57.9},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:-38.4,x:636.6,y:285.2},2).to({scaleX:0.58,scaleY:0.58,rotation:-19,x:723.1,y:226.4},2).to({regX:39.5,regY:288.2,rotation:33.3,x:766.3,y:210.6},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:27.7,x:860.4,y:341.4},3).to({regY:288.2,rotation:42.6,x:892.4,y:442.3},2).to({scaleX:0.58,scaleY:0.58,rotation:57.5,x:885.3,y:543.1},2).to({rotation:64.7,x:882.7,y:563.6},10).wait(23).to({startPosition:6},0).to({rotation:149,x:831.4,y:732.4,startPosition:0},7).wait(19).to({x:811.9,y:712.9},0).wait(16).to({startPosition:0},0).to({rotation:103,x:888.2,y:646.5,startPosition:8},5).to({x:970.3,y:433.4},5).wait(1).to({regY:288.1,rotation:33.6,x:960.6,y:458.7,startPosition:6},0).to({rotation:33.6,x:1021.2,y:403.9},4).to({regX:39.5,rotation:45.3,x:1063.5,y:435.2},8).wait(21).to({startPosition:6},0).to({regX:39.6,rotation:115.4,x:981,y:599.3},3).to({scaleX:0.58,scaleY:0.58,rotation:123.8,x:938.8,y:627.8},1).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(13).to({startPosition:0},0).wait(9).to({startPosition:9},0).to({scaleX:0.58,scaleY:0.58,rotation:131.9,x:807.2,y:645.9},5).to({regY:288,scaleX:0.58,scaleY:0.58,rotation:174.2,x:723.7,y:464.3},6).wait(1).to({regY:287.9,rotation:26.2,x:732.9,y:293.9,startPosition:11},0).to({regX:39.8,regY:288.2,rotation:-47.4,x:704.4,y:164.4},5).wait(18).to({rotation:-47.4},0).to({scaleX:0.56,scaleY:0.53,rotation:22.6,x:789.7,y:208.9},2).to({scaleX:0.55,scaleY:0.51,rotation:57.7,x:832.4,y:260.3},1).to({regY:288.1,scaleX:0.54,scaleY:0.46,rotation:56.4,x:890,y:439.1},2).to({regX:39.7,scaleX:0.52,scaleY:0.41,rotation:196.1,x:861.8,y:602.3,startPosition:3},2).wait(25).to({startPosition:3},0).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},6).wait(19).to({startPosition:0},0).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:190.5,x:665.8,y:644.9},2).to({regX:39.6,regY:288,rotation:232.1,x:597.6,y:459.8},2).to({regX:39.7,regY:287.9,rotation:297.6,x:622,y:301.4},2).to({regX:39.8,regY:288.3,scaleX:0.61,scaleY:0.58,rotation:360,skewX:9.2,skewY:-7,x:659.6,y:212.4},1).to({regX:39.6,regY:288.2,scaleX:0.58,rotation:330.3,skewX:0,skewY:0,x:669.4,y:222.2},2).wait(48).to({regY:288.3,rotation:327.5,x:669.3,startPosition:4},0).to({rotation:318.5,x:609.7,y:260.2},11).wait(2).to({startPosition:4},0).to({regY:288.4,rotation:350.3,x:613.7,y:209.5},5).to({regY:288.3,rotation:318.5,x:609.7,y:260.2},6).wait(3).to({startPosition:4},0).to({regY:288.4,rotation:350.3,x:613.7,y:209.5},7).to({regY:288.3,rotation:318.5,x:609.7,y:260.2},6).wait(3).to({startPosition:4},0).to({rotation:250.7,x:593.2,y:476.4},2).to({regY:288.2,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(35).to({startPosition:0},0).to({regX:39.5,regY:288.1,rotation:138,x:838.3,y:730.2},4).to({startPosition:0},5).to({regY:288.2,rotation:142.8,x:850,y:717.2},7).wait(1).to({startPosition:0},0).to({startPosition:0},6,cjs.Ease.get(1)).wait(8).to({startPosition:0},0).wait(22).to({startPosition:0},0).to({regX:39.6,rotation:149,x:811.9,y:712.9},4).wait(13).to({startPosition:0},0).to({x:859.9,y:674},2).to({_off:true},1).wait(51).to({_off:false,rotation:328.6,x:642,y:326.9,startPosition:10},0).to({regY:288.3,rotation:345.1,x:564,y:416.9},4).to({regY:288.2,rotation:284.6},6).wait(25).to({startPosition:10},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:216.8,x:628,y:604.9},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},3).wait(15).to({startPosition:9},0).to({regX:39.7,rotation:122,x:944.6,y:661.7},2).to({regX:39.6,rotation:15.5,x:893.9,y:434.9},3).wait(25).to({rotation:36.5,x:893.8},0).wait(2).to({rotation:15.5,x:893.9},0).to({regY:288.3,rotation:2.8,x:707.8,y:354.9},5).wait(1).to({rotation:2.8,startPosition:10},0).wait(19).to({regX:39.5,regY:288.2,rotation:-21.5},0).to({x:587.8,y:248.9,startPosition:4},5).wait(11).to({startPosition:4},0).to({regX:39.6,scaleX:0.58,scaleY:0.58,rotation:-29.8,x:554.4,y:427.3},2).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:-114.7,x:694.3,y:650.2},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:0,skewX:-116.7,skewY:-117.1,x:698.5,y:658.5},3).to({regX:39.5,scaleX:0.56,scaleY:0.6,skewX:-120.3,skewY:-118,y:683},4).to({regY:288.1,scaleX:0.54,scaleY:0.62,skewX:-120.7,skewY:-115.5,x:702.7,y:691.5},3).to({regX:39.6,scaleX:0.55,scaleY:0.62,skewX:-122.2,skewY:-118.1,x:710.9,y:696.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,skewX:0,skewY:0,x:811.9,y:712.9,startPosition:0},9).wait(20).to({startPosition:3},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:143.8,x:938.7,y:550.1},3).to({regY:288.2,scaleX:0.58,scaleY:0.58,rotation:91.8,x:909.9,y:390},2).to({scaleX:0.58,scaleY:0.58,rotation:49.4,x:778.4,y:263.2},3).to({rotation:20.8,x:665.8,y:246.1},2).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:6.8,x:622.9,y:260.3,startPosition:6},1).to({regX:39.6,rotation:-57.9,x:550,y:386.9},5).wait(5).to({rotation:-57.9},0).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:-38.4,x:636.6,y:285.2},2).to({scaleX:0.58,scaleY:0.58,rotation:-19,x:723.1,y:226.4},2).to({regX:39.5,regY:288.2,rotation:33.3,x:766.3,y:210.6},1).to({regX:39.6,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:27.7,x:860.4,y:341.4},3).to({regY:288.2,rotation:42.6,x:892.4,y:442.3},2).to({scaleX:0.58,scaleY:0.58,rotation:57.5,x:885.3,y:543.1},2).to({rotation:64.7,x:882.7,y:563.6},10).wait(23).to({startPosition:6},0).to({rotation:149,x:831.4,y:732.4,startPosition:0},7).to({_off:true},1).wait(26).to({_off:false,regX:39.5,rotation:260.2,x:858,y:750.9,startPosition:2},0).to({regY:288.1,scaleX:0.58,scaleY:0.58,rotation:323.7,x:852.7,y:688.3},2).to({regX:39.6,regY:288.2,rotation:333.1,x:836.1,y:647.4},1).to({regX:39.5,rotation:191.5,x:816.6,y:436.6},1).to({scaleX:0.58,scaleY:0.58,rotation:184.5,x:770.9,y:329.8},2).to({x:704.9,y:371.8},22).to({regY:288.3,scaleX:0.58,scaleY:0.58,rotation:187.9,x:699.6,y:373.2},1).to({regX:39.4,regY:288.2,rotation:269.1,x:644.4,y:512.6,startPosition:4},1).wait(1).to({rotation:220.1,x:651.1,y:590.9},0).wait(1).to({regX:39.5,scaleX:0.58,scaleY:0.58,rotation:171.3,x:657.6,y:669.1},0).wait(11).to({x:748.6,y:703},0).to({_off:true},5).wait(33).to({_off:false,regX:39.4,regY:288.3,rotation:205.6,x:722.8,y:802.9,startPosition:6},0).to({regY:288.4,rotation:258.8,x:529.6,y:505.8},6).to({regX:39.3,scaleX:0.58,scaleY:0.58,rotation:283.1,x:517.1,y:355.4},3).to({regX:39.5,regY:288.3,scaleX:0.58,scaleY:0.58,rotation:330.4,x:554.7,y:226.9},3).wait(10).to({y:227.9},0).to({regX:39.4,regY:288.4,scaleX:0.58,scaleY:0.58,rotation:339,x:593.6,y:376.5},2).to({regY:288.3,rotation:284.5,x:570.3,y:562.3},1).to({regX:39.6,regY:288.2,scaleX:0.58,scaleY:0.58,rotation:149,x:811.9,y:712.9,startPosition:0},2).wait(13).to({startPosition:0},0).to({rotation:153.8,x:747.1,y:698.1},8).to({_off:true},16).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(480).to({_off:false},0).to({x:676.1,y:332.4},10).to({scaleX:1.03,scaleY:1.03,x:744.9,y:459.5},10).to({regX:89.8,scaleX:0.73,scaleY:0.73,skewX:-43.8,skewY:140.8,x:732.9,y:459.6},12).to({regX:89.9,scaleX:0.89,scaleY:0.89,skewX:-45.2,skewY:134.8,x:676.1,y:332.4},11).to({scaleX:1.03,scaleY:1.03,x:744.9,y:459.5},10).to({regX:89.8,scaleX:0.97,scaleY:0.97,x:752.6,y:482},9).to({_off:true,regX:39.6,regY:288.3,scaleX:0.64,scaleY:0.64,rotation:-21,skewX:0,skewY:0,x:755.5,y:735.2,mode:"single",startPosition:2},1).wait(1091));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1114).to({_off:false},0).to({regY:288.1,rotation:-131,x:958,y:555.9},16).to({regY:288.2,rotation:-112.3,x:946.1,y:532.9},10).wait(1).to({regX:39.7,rotation:-123.5,x:921.1,y:527.9,startPosition:7},0).to({x:918.1,y:425.9},7).wait(11).to({x:888.1,y:424.9},0).to({regX:39.8,scaleX:0.58,scaleY:0.58,rotation:-123.4,x:827.6,y:317.7},2).to({regX:39.7,scaleX:0.58,scaleY:0.58,rotation:-123.5,x:642,y:326.9},3).to({_off:true},1).wait(469));

	// head
	this.instance_13 = new lib.headdown("single",0);
	this.instance_13.setTransform(994.7,995.6,1.057,1.057,0,0,0,112.4,278.6);

	this.instance_14 = new lib.head("single",0);
	this.instance_14.setTransform(994.7,328.7,1.057,1.057,0,0,0,112.4,278.6);
	this.instance_14._off = true;

	this.instance_15 = new lib.head34("synched",1);
	this.instance_15.setTransform(945,294.6,1.081,1.081,0,0,0,112.4,278.6);
	this.instance_15._off = true;

	this.instance_16 = new lib.headup("synched",3);
	this.instance_16.setTransform(945,242.5,1.057,1.105,0,3,-177,112.3,278.7);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({scaleX:0.95,scaleY:0.95,x:972.9,y:322},101).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},1).wait(121).to({_off:false,regX:136.6,regY:167.5,scaleX:1,scaleY:1,x:993.6,y:201.2,mode:"independent"},0).to({x:1001.4,mode:"synched",startPosition:0},2).to({x:1013.1,startPosition:3},3).to({x:993.6,startPosition:0},5).to({x:1013.1,mode:"single"},5).to({x:993.6,mode:"independent"},5).to({x:1013.1,mode:"single",startPosition:0},5).to({x:993.6},5).to({_off:true},29).wait(193).to({_off:false,regX:112.4,regY:278.6,scaleX:1,scaleY:1,rotation:-1.3,x:937.3,y:305.6,mode:"synched",startPosition:9},0).to({x:1001.8,y:348.7,startPosition:2},5).to({x:996,y:372.2,startPosition:0},10).to({startPosition:10},10).to({startPosition:10},12).to({startPosition:9},11).to({startPosition:0},10).to({scaleX:1,scaleY:1,rotation:-1,x:995.8,y:367.5,mode:"single",startPosition:1},4).to({scaleX:1.01,scaleY:1.01,rotation:-0.8,x:995.6,y:360.4,startPosition:0},6).to({scaleX:0.98,scaleY:0.98,rotation:0,x:994.8,y:329.9},13).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},1).wait(201).to({_off:false,scaleX:0.96,scaleY:0.96,rotation:54,x:1051.9,y:322.1,mode:"synched",startPosition:11},1).wait(16).to({mode:"single",startPosition:0},0).wait(5).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:30.8,x:1027.4,y:325},3).to({regX:112.3,scaleX:1.01,scaleY:1.01,rotation:23.1,x:1019.2,y:326},1).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,rotation:0,x:994.7,y:328.7},3).wait(63).to({_off:false,regX:112.3,scaleX:0.91,scaleY:0.91,skewX:-1.3,skewY:178.7,x:981.2,y:299.4,mode:"synched",startPosition:4},1).wait(5).to({startPosition:1},0).to({x:965.5,startPosition:5},8).to({x:981.2,mode:"single",startPosition:0},12).to({x:1004.6},5).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,skewX:0,skewY:0,x:994.7,y:328.7},1).wait(282).to({_off:false,scaleX:0.95,scaleY:0.95,x:978.7,y:322.7,mode:"synched"},0).wait(1).to({startPosition:1},0).to({startPosition:5},4).to({regX:112.3,scaleX:1.01,scaleY:1.01,x:978.6,y:346.7,startPosition:11},6).wait(25).to({startPosition:0},0).to({scaleX:0.98,scaleY:0.98,x:980,y:327.7,startPosition:5},5).to({_off:true,regX:112.4,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},1).wait(93).to({_off:false,scaleX:0.99,scaleY:0.99,skewX:-7.3,skewY:172.7,x:1035.6,y:293.7,mode:"synched"},0).to({x:1019.6,y:323.7},3).to({x:1029.6,y:357.7},4).to({x:1075.6,y:349.7},3).to({x:1069.6,y:301.7},3).to({x:1049.6,mode:"single",startPosition:4},4).to({x:1019.6,y:295.7,startPosition:0},5).to({_off:true},20).wait(292));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(101).to({_off:false},1).to({x:976.1,y:326.2,mode:"synched"},7).to({x:965.4,y:324.8,mode:"single"},4).to({_off:true,scaleX:1.08,scaleY:1.08,x:945,y:294.6,mode:"synched",startPosition:1},1).wait(99).to({_off:false,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},0).to({_off:true},10).wait(59).to({_off:false},0).to({x:961.5,y:311.1},3).to({_off:true},1).wait(86).to({_off:false,scaleX:1.08,scaleY:1.08,rotation:-5.3,x:997.7,y:321.9,startPosition:4},0).to({rotation:-6.8,x:996.3,y:322.2,startPosition:3},2).to({regX:112.5,regY:278.7,scaleX:1.08,scaleY:1.08,rotation:-12.3,x:995.4,y:323.2,startPosition:4},7).to({regX:112.4,regY:278.6,scaleX:1.08,scaleY:1.08,rotation:-16.2,x:995.7,y:323.9},5).wait(8).to({startPosition:4},0).to({scaleX:1.06,scaleY:1.06,rotation:0,x:994.7,y:328.7,startPosition:0},4).wait(22).to({startPosition:0},0).to({regX:112.5,rotation:-7.6,x:954.3,y:314.9},5).to({_off:true,regX:112.4,regY:278.7,rotation:-9.2,x:954.8,y:245.9,mode:"synched"},1).wait(130).to({_off:false,regY:278.6,rotation:0,x:994.7,y:328.7,mode:"single"},1).wait(13).to({startPosition:0},0).to({scaleX:1.14,scaleY:0.99,x:990,y:381.1},4).to({scaleX:1.02,scaleY:1.14,x:1000.5,y:321.9},3).to({_off:true},1).wait(24).to({_off:false,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7},4).wait(1).to({startPosition:0},0).to({x:994.8},3).to({x:994.7},2).to({x:994.8},3).to({x:994.7},2).to({startPosition:0},1).to({mode:"synched"},5).to({_off:true},26).wait(21).to({_off:false,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).to({regY:278.7,rotation:26.2,x:970.1,y:343.1,mode:"single",startPosition:4},22).wait(1).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},7).wait(19).to({startPosition:0},0).wait(16).to({startPosition:0},0).to({_off:true},5).wait(43).to({_off:false},3).wait(13).to({startPosition:0},0).wait(9).to({mode:"synched"},0).to({rotation:6.6,x:1005.5,y:325.7,startPosition:5},5).to({regX:112.3,rotation:13.5,x:1016.1,y:322.8,mode:"single",startPosition:0},5).to({_off:true,rotation:0,skewX:11.7,skewY:-168.3,x:1024,y:260.5,mode:"synched"},1).wait(61).to({_off:false,regX:112.4,skewX:0,skewY:0,x:994.7,y:328.7,mode:"single"},1).wait(19).to({startPosition:0},0).to({_off:true},1).wait(97).to({_off:false,regY:278.4,rotation:-17.8,x:978.3,y:302.4,startPosition:4},0).wait(2).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},5).to({_off:true},35).wait(53).to({_off:false,regY:278.7,rotation:-4.2,x:998.1,y:322.9},0).to({regY:278.6,rotation:0,x:994.7,y:328.7},4).wait(13).to({startPosition:0},0).to({_off:true},3).wait(91).to({_off:false},1).to({_off:true},15).wait(120).to({_off:false},0).to({x:994.8},3).to({x:994.7},2).to({x:994.8,mode:"synched"},3).to({x:994.7},2).to({startPosition:0},1).to({startPosition:0},5).to({_off:true},5).wait(21).to({_off:false,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).to({regY:278.7,rotation:26.2,x:970.1,y:343.1,mode:"single",startPosition:4},22).wait(1).to({startPosition:4},0).to({regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},7).wait(1).to({startPosition:0},0).wait(26).to({startPosition:0},0).to({rotation:-2.2,x:1031.3,y:322.1,mode:"synched"},6).to({startPosition:0},23).to({rotation:2.8,x:942.4,y:318.8,mode:"single",startPosition:4},4).wait(10).to({startPosition:4},0).to({rotation:-17.4,x:958.4,y:314.8,mode:"synched"},5).wait(13).to({mode:"single",startPosition:0},0).wait(18).to({scaleX:1.08,scaleY:1.03,rotation:0,skewX:-18.5,skewY:-16.4,x:957.4,y:337.9,mode:"synched",startPosition:7},0).to({_off:true},1).wait(25).to({_off:false,scaleX:1.06,scaleY:1.06,skewX:0,skewY:0,x:994.7,y:328.7,mode:"single",startPosition:0},2).wait(13).to({mode:"synched"},0).to({rotation:3.8,x:932.6,y:299.4,startPosition:7},7).to({_off:true,rotation:4.5,x:951.5,y:238.2,startPosition:8},1).wait(64));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(113).to({_off:false},1).to({startPosition:2},12).wait(1).to({startPosition:3},0).to({rotation:6,x:980.7,y:281,startPosition:7},4).to({rotation:0,x:983,y:298.6,startPosition:6},4).to({x:978.2,y:298.5,startPosition:1},5).to({startPosition:5},4).to({startPosition:9},4).to({startPosition:1},3).to({startPosition:1},2).to({startPosition:5},4).to({startPosition:9},4).to({x:946.2,y:278.5,startPosition:1},3).to({_off:true},1).wait(138).to({_off:false,x:945,y:294.6,mode:"single",startPosition:15},0).to({scaleY:1.08,skewX:3.1,x:990.8},2).to({skewX:2.8,x:982.8,y:294.3,startPosition:0},3).to({scaleY:1.08,skewX:2.5,x:977.5,y:294.2,startPosition:4},2).to({regX:112.5,skewX:2.3,skewY:-0.3,x:969.8,y:293.9,startPosition:21},3).to({skewX:2,x:964.4,y:293.7,startPosition:16},2).to({regY:278.5,scaleX:1.08,skewX:1.5,skewY:-0.8,x:943.4,y:292.9,startPosition:11},8).to({skewX:1.3,x:938.1,y:292.7,startPosition:6},2).to({regX:112.6,regY:278.6,skewX:1,x:930.2,y:292.5,startPosition:5},3).to({scaleX:1.08,skewX:0.6,skewY:-1,x:916.9,y:292.1,startPosition:11},5).to({regY:278.5,scaleY:1.08,skewX:0.3,skewY:-1.1,x:911.6,y:291.8,startPosition:5},2).to({skewX:0.1,skewY:-1.3,x:906.3,y:291.6,startPosition:12},2).to({skewX:0,skewY:-1.5,x:898.4,y:291.3,startPosition:2},3).to({skewY:-1.6,x:893.1,y:291.1,startPosition:18},2).to({skewY:-1.8,x:887.8,y:291,startPosition:6},2).to({regX:112.4,regY:278.6,skewY:-2.1,x:882.5,y:290.8,startPosition:15},2).to({scaleX:1.08,skewY:-180,x:905.9,y:288.7,startPosition:5},1).to({scaleY:1.08,skewX:-3,x:892.7},7).wait(1).to({scaleY:1.08,skewX:0,x:931.3,y:292.6,startPosition:0},0).to({x:941.1,startPosition:10},2).to({x:987.9,y:304.3,startPosition:15},4).to({x:1009.3,y:302.3,startPosition:3},2).to({y:304.3,startPosition:7},2).to({startPosition:4},2).to({_off:true},5).wait(206).to({_off:false,scaleX:1.07,scaleY:1.1,skewY:0,x:977.2,y:292.4,mode:"synched",startPosition:0},0).to({startPosition:2},2).to({startPosition:5},3).to({startPosition:9},4).to({startPosition:11},2).to({startPosition:2},3).to({startPosition:4},2).to({startPosition:9},3).to({startPosition:2},5).to({_off:true,scaleX:1.06,scaleY:1.06,x:994.7,y:328.7,mode:"single",startPosition:0},4).wait(296).to({_off:false,regX:112.3,rotation:5.9,x:977.6,y:297.6,mode:"synched"},0).to({x:1012.7},6).wait(40).to({mode:"single"},0).wait(10).to({startPosition:0},0).to({regY:278.5,rotation:-2.1,x:965.4,y:282.5},10).to({_off:true,rotation:0,skewX:3,skewY:-177,x:962.5,y:240,startPosition:8},1).wait(72).to({_off:false,regX:112.4,regY:278.6,skewX:0,skewY:-180,x:1014.6,y:300.7,startPosition:0},0).to({regY:278.7,skewX:-11,skewY:-191,x:948,y:285,mode:"synched"},4).to({x:940,y:289,startPosition:6},5).to({skewX:13.4,skewY:-166.6,x:1004.1,y:299.6,startPosition:0},7).wait(7).to({skewX:13.4,x:1006.1,y:303.6,startPosition:1},0).to({_off:true},1).wait(49).to({_off:false,regY:278.6,skewX:0,skewY:0,x:980.7,y:320.7,startPosition:0},0).to({_off:true},16).wait(391).to({_off:false,rotation:2.8,x:930.4,y:296.8,startPosition:4},0).to({regY:278.7,rotation:-1.9,x:913,y:292.6,mode:"single"},12).wait(10).to({rotation:-1.9},0).to({rotation:-1,x:945.6,y:307},2).to({rotation:-0.5,x:962,y:314.2},1).to({_off:true,regY:278.6,rotation:0,x:994.7,y:328.7,startPosition:0},2).wait(85));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(165).to({_off:false},0).to({regX:112.4,skewX:11.2,skewY:-168.8,x:944.9,startPosition:9},6).to({skewX:16.7,skewY:-163.3,x:986,y:251.4,startPosition:14},11,cjs.Ease.get(1)).to({skewX:14.5,skewY:-165.5,x:960.5,y:239.7,startPosition:0},6).to({startPosition:7},7).to({startPosition:16},9).to({x:985.9,y:261.1,startPosition:4},8).to({_off:true},1).wait(73).to({_off:false,skewX:11.2,skewY:-168.8,x:944.9,y:242.5,mode:"single",startPosition:5},0).to({startPosition:5},16).to({_off:true},1).wait(122).to({_off:false,scaleY:1.06,rotation:-9.2,skewX:0,skewY:0,x:954.8,y:245.9,mode:"synched",startPosition:0},1).to({scaleX:1.06,scaleY:1.06,rotation:0,skewX:-11.5,skewY:-11.3,x:927.1,y:245.1,startPosition:8},28).to({scaleX:1.06,scaleY:1.06,rotation:-9.2,skewX:0,skewY:0,x:954.8,y:245.9},20).to({_off:true},1).wait(174).to({_off:false,regY:278.6,rotation:0,x:1012.3,y:260.2,startPosition:4},0).to({rotation:-9,x:967.1,y:218.5,startPosition:9},5).to({regX:112.3,rotation:-8.8,startPosition:12},3).to({startPosition:14},2).to({regX:112.4,rotation:-9,startPosition:16},2).to({rotation:-2.3,x:1003.6,y:248.5,startPosition:5},9).to({_off:true,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).wait(70).to({_off:false,rotation:0,x:1010.3,y:262.2,startPosition:0},0).to({startPosition:5},5).to({startPosition:10},5).to({regX:112.3,scaleX:0.97,scaleY:0.97,rotation:47.2,x:1083.9,y:320.4,startPosition:17},7).to({_off:true,regX:112.4,scaleX:0.96,scaleY:0.96,rotation:54,x:1051.9,y:322.1,startPosition:11},1).wait(60).to({_off:false,regX:112.3,scaleX:1.06,scaleY:1.06,rotation:0,skewX:11.7,skewY:-168.3,x:1024,y:260.5,startPosition:0},1).wait(1).to({startPosition:1},0).wait(23).to({mode:"single",startPosition:4},0).to({x:992.8,y:246.8},3).to({x:957.6,y:239},3).to({_off:true,scaleX:0.91,scaleY:0.91,skewX:-1.3,skewY:-181.3,x:981.2,y:299.4,mode:"synched"},1).wait(117).to({_off:false,regY:278.5,scaleX:1.06,scaleY:1.06,skewX:3,skewY:-177,x:962.5,y:240,mode:"single",startPosition:8},1).wait(2).to({startPosition:4},0).to({x:950.8,y:224.3},5).to({x:962.5,y:240},6).wait(1).to({startPosition:8},0).wait(2).to({startPosition:4},0).to({x:950.8,y:224.3},7).to({x:962.5,y:240},6).to({_off:true},1).wait(66).to({_off:false,regX:112.4,regY:278.7,skewX:4.2,skewY:-175.8,x:972,y:254.9,mode:"synched",startPosition:0},0).wait(7).to({startPosition:0},0).to({_off:true},22).wait(36).to({_off:false,regY:278.6,skewX:0,skewY:0,x:1010.8,y:266.7},0).to({mode:"single",startPosition:7},18).to({_off:true},16).wait(57).to({_off:false,x:1016.7,y:264.6,startPosition:0},0).to({rotation:-13.2,x:947.6,y:259.7,mode:"synched"},5).wait(27).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(20).to({rotation:0,skewX:13.2,skewY:-166.8,x:935.5,y:267.7},0).to({x:1009.5,y:257.7},5).wait(11).to({startPosition:0},0).to({_off:true},5).wait(63).to({_off:false,skewX:0,skewY:0,x:1012.3,y:260.2,startPosition:4},0).to({rotation:-9,x:967.1,y:218.5,startPosition:9},5).to({regX:112.3,rotation:-8.8,startPosition:12},3).to({startPosition:14},2).to({regX:112.4,rotation:-9,startPosition:16},2).to({rotation:-2.3,x:1003.6,y:248.5,startPosition:5},9).to({_off:true,rotation:-1.8,x:1003.4,y:342.9,startPosition:6},1).wait(184).to({_off:false,rotation:4.5,x:951.5,y:238.2,startPosition:8},1).to({_off:true},16).wait(48));

	// torso
	this.instance_17 = new lib.torso();
	this.instance_17.setTransform(974.1,1310.4,1,1,-7.6,0,0,144.5,370.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({y:643.4},102).to({rotation:-14.5,x:987.7,y:639.6},12).to({regY:370.8,scaleX:1,scaleY:1,y:639.5},12).wait(1).to({regY:370.9,scaleX:1,scaleY:1,rotation:-7.8,x:984.7,y:617.8},4).wait(31).to({rotation:-16.2,x:984.8,y:617.9},3).wait(6).to({regY:370.8,rotation:-10.8,x:989.8,y:628.7},11,cjs.Ease.get(1)).to({rotation:-13,x:979,y:616.6},6).wait(16).to({regY:370.9,rotation:-7.6,x:974.1,y:643.4},9).wait(69).to({rotation:-16.2,x:984.8,y:617.9},6).wait(14).to({scaleX:1.01,scaleY:0.99,rotation:0,skewX:-13.3,skewY:-16,x:1012.9},3).to({regY:370.8,scaleX:0.99,scaleY:1.01,skewX:-17.3,skewY:-16.3,x:984.6,y:617.8},22).to({regY:370.9,scaleX:0.97,scaleY:1.04,skewX:-22.3,skewY:-16.8,x:950.2,y:617.9},27).to({scaleX:0.97,scaleY:1.03,skewX:-19.8,skewY:-15.3,x:954.2,y:622.1},1).to({scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},10).wait(55).to({rotation:-16.8,x:973.2,y:622.5},6).to({regX:144.6,scaleX:1,scaleY:1,rotation:0,skewX:-19,skewY:-18.9,x:960.4,y:620.9},28).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.8,skewX:0,skewY:0,x:973.2,y:622.5},20).to({rotation:-8.8,x:980.1,y:619.7},6).wait(20).to({scaleX:1,rotation:0,skewX:-8.8,skewY:-5.7},12).to({scaleX:1,skewY:-13.8},11).to({scaleX:1,rotation:-8.8,skewX:0,skewY:0},10).to({rotation:-8.3,x:978.4,y:626.1},10).wait(13).to({rotation:-7.6,x:974.1,y:643.4},1).wait(13).to({regX:144.4,scaleX:1.07,scaleY:0.94,rotation:0,skewX:-8.7,skewY:-6.6,x:967.7,y:674.5},4).to({scaleX:0.97,scaleY:1.08,skewX:-6.8,skewY:-8.5,x:980.5,y:660.7},3).to({scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},3).to({regX:144.3,scaleX:0.97,scaleY:1.06,skewY:-8,x:979.1,y:657.2},3).to({scaleX:0.98,scaleY:1.05,x:978.2,y:654.8},4).to({regX:144.4,scaleX:0.97,scaleY:1.06,x:978.9,y:656.4},2).to({scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},3).to({scaleX:0.97,scaleY:1.06,skewY:-8,x:979.2,y:657.3},2).to({regX:144.3,scaleX:0.98,scaleY:1.05,x:978.2,y:654.8},3).to({regX:144.4,scaleX:0.97,scaleY:1.07,skewY:-8.3,x:979.8,y:658.9},5).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},4).wait(1).to({regX:144.4,rotation:-7.5,x:974},3).to({regX:144.5,rotation:-7.6,x:974.1},2).to({regX:144.4,rotation:-7.5,x:974},3).to({scaleX:1,scaleY:1,y:643.3},2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},1).wait(31).to({regY:370.8,rotation:-16.6,x:989.1,y:601},5).to({regX:144.4,scaleX:1,scaleY:1,rotation:-16.5,x:989,y:601.1},3).wait(2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.6,x:989.1,y:601},2).to({regY:370.9,rotation:-9.3,x:978.4,y:634.2},10).wait(23).to({rotation:-7.6,x:974.1,y:643.4},7).wait(50).to({rotation:4.2,x:968.7,y:660.1},8).wait(21).to({rotation:4.2},0).to({rotation:-0.8,x:971,y:653},3).to({regX:144.6,rotation:-2.3,x:971.9,y:650.6},1).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},3).wait(22).to({rotation:-4.8,x:975.8,y:639.2},5).to({regX:144.4,rotation:-1.8,x:977.9,y:634.2},6).wait(1).to({rotation:-1.8},0).wait(23).to({rotation:-7.3,x:977.3,y:625.5},3).to({rotation:-14.8,x:976.5,y:613.9},4).wait(25).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},6).wait(19).to({regX:144.4,rotation:-1.6,x:976.4,y:635.9},7).wait(50).to({rotation:-1.6},0).to({rotation:-10.6,x:977.6,y:620.9},11).wait(32).to({regX:144.5,rotation:-7.6,x:974.1,y:643.4},5).wait(35).to({regY:370.8,rotation:-18.6,x:984.1,y:631},4).wait(5).to({rotation:-13.8,x:1003.5,y:630.5},7).wait(37).to({regY:370.9,rotation:-7.6,x:974.1,y:643.4},4).wait(123).to({rotation:-20.8,x:998.8,y:638.8},5).wait(52).to({regY:370.8,rotation:-4.3,x:976.8,y:630.8},5).wait(11).to({rotation:-4.3},0).wait(5).to({scaleX:1,scaleY:1,rotation:0,skewX:-6.8,skewY:-6.2,x:979.6,y:629.9},3).to({scaleX:1.01,scaleY:0.99,skewX:-6.9,skewY:-10.7,y:631.7},4).to({regX:144.6,regY:370.9,scaleX:1.03,scaleY:0.98,skewX:-3.2,skewY:-12.3,x:987.9,y:630.9},3).to({regX:144.5,scaleX:1.02,scaleY:0.99,skewX:-6.2,skewY:-13.5,x:992.9,y:630.3},3).to({scaleX:1,scaleY:1,rotation:-7.6,skewX:0,skewY:0,x:974.1,y:643.4},9).wait(20).to({regX:144.4,rotation:-7.5,x:974},3).to({regX:144.5,rotation:-7.6,x:974.1},2).to({regX:144.4,rotation:-7.5,x:974},3).to({scaleX:1,scaleY:1,y:643.3},2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},1).wait(10).to({regY:370.8,rotation:-16.6,x:989.1,y:601},5).to({regX:144.4,scaleX:1,scaleY:1,rotation:-16.5,x:989,y:601.1},3).wait(2).to({regX:144.5,scaleX:1,scaleY:1,rotation:-16.6,x:989.1,y:601},2).to({regY:370.9,rotation:-9.3,x:978.4,y:634.2},10).wait(23).to({rotation:-7.6,x:974.1,y:643.4},7).wait(27).to({regX:144.4,rotation:-3.3,x:977.3,y:632.4},6).wait(23).to({regX:144.3,rotation:-16.5,x:974.6,y:627.3},4).wait(46).to({scaleX:1.02,scaleY:0.97,rotation:0,skewX:-17.5,skewY:-15.6,x:974.1,y:639.6},0).wait(1).to({scaleX:1,scaleY:1,rotation:-16.5,skewX:0,skewY:0,x:974.6,y:627.3},0).to({regX:144.4,rotation:-21.2,x:984.4,y:618.2},12).wait(10).to({regX:144.5,scaleX:1,scaleY:1,rotation:-15.8,x:980.3,y:628.2},2).to({rotation:-13,x:978.2,y:633.2},1).to({scaleX:1,scaleY:1,rotation:-7.6,x:974.1,y:643.4},2).wait(13).to({rotation:-19.5,x:977.3,y:612.8},8).to({_off:true},16).wait(48));

	// waist
	this.instance_18 = new lib.waist();
	this.instance_18.setTransform(1007,1379.6,1,1,0,0,0,177.2,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).to({y:712.6},102).wait(80).to({regX:177.3,rotation:-2.2,x:999.5,y:699.7},6).wait(16).to({regX:177.2,rotation:0,x:1007,y:712.6},9).wait(89).to({scaleY:1,skewX:3.1,x:1029.9},3).to({regY:98.9,scaleY:1,skewX:-1.3,x:1009.2,y:712.7},22).to({regY:98.8,scaleY:1.01,skewX:-6.8,x:983.7,y:712.6},27).to({scaleY:1.01,skewX:-5.5,x:987.6},1).to({scaleY:1,skewX:0,x:1007},10).wait(61).to({scaleX:1,scaleY:1,skewX:-2.3,skewY:-2.1,x:997.7,y:709.9},28).to({scaleX:1,scaleY:1,skewX:0,skewY:0,x:1007,y:712.6},20).to({regX:177.3,rotation:8,x:1001.1,y:713.6},6).wait(53).to({rotation:5.8,x:1002.7,y:713.3},10).wait(13).to({regX:177.2,rotation:0,x:1007,y:712.6},1).wait(13).to({scaleX:1.07,scaleY:0.93,x:1003.1,y:739},4).to({scaleX:0.96,scaleY:1.08,x:1012.3,y:735.2},3).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},3).to({scaleX:0.97,scaleY:1.06,x:1011.2,y:730.5},3).to({scaleX:0.98,scaleY:1.05,x:1010.4,y:727.4},4).to({scaleX:0.97,scaleY:1.06,x:1010.9,y:729.7},2).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},3).to({scaleX:0.97,scaleY:1.06,x:1011.2,y:730.7},2).to({scaleX:0.98,scaleY:1.05,x:1010.4,y:727.4},3).to({scaleX:0.97,scaleY:1.07,x:1011.7,y:732.9},5).to({scaleX:1,scaleY:1,x:1007,y:712.6},4).wait(693).to({scaleX:1,scaleY:1,skewX:-2.6,skewY:-1.9,x:1013.4,y:710.7},3).to({scaleX:1,scaleY:1,skewY:-6.5,y:709.9},4).to({scaleX:1.02,scaleY:1,skewX:1.1,skewY:-8.3,x:1016.7,y:707.9},3).to({scaleX:1.01,skewX:-1.8,skewY:-9.4,x:1025.7,y:706.7},3).to({scaleX:1,scaleY:1,skewX:0,skewY:0,x:1007,y:712.6},9).wait(199).to({scaleX:1.03,scaleY:0.97,x:1007.3,y:722},0).wait(1).to({scaleX:1,scaleY:1,x:1007,y:712.6},0).wait(48).to({_off:true},16).wait(48));

	// shoulder left
	this.instance_19 = new lib.shoulder();
	this.instance_19.setTransform(853.2,1066.3,0.888,0.888,0,-22.2,157.8,73.8,95.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({y:399.4},102).to({regX:73.7,regY:95.4,skewX:8.5,skewY:188.5,x:823.9,y:430.8},12).wait(12).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,x:825,y:430.4},1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:34,skewY:214,x:851.6,y:402.5},4).to({skewX:28,skewY:208,x:837.1,y:389.9},4).to({regY:95.4,skewX:65.9,skewY:245.9,x:863.2,y:377},5).to({regX:73.7,skewX:26.2,skewY:206.2,x:839.3,y:405.1},4).to({skewX:43.1,skewY:223.1,y:389.1},4).to({regX:73.8,skewX:65.9,skewY:245.9,x:863.2,y:377},5).to({regX:73.7,skewX:26.2,skewY:206.2,x:839.3,y:405.1},4).to({skewX:43.1,skewY:223.1,y:389.1},4).wait(1).to({skewX:13.2,skewY:193.2,x:849.4},0).to({regX:73.6,skewX:56.1,skewY:236.1,x:835.8,y:396.5},3).to({regX:73.7,skewX:14.5,skewY:194.5,x:835.7,y:396.4},6).to({regX:73.8,skewX:19.9,skewY:199.9,x:862.5,y:394.2},11,cjs.Ease.get(1)).to({regX:73.6,regY:95.5,skewX:-6,skewY:174,x:825.2,y:387.9},6).wait(16).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},9).wait(69).to({regX:73.7,regY:95.4,skewX:14.5,skewY:194.5,x:835.7,y:396.4},6).to({skewX:38.4,skewY:218.4},14).to({scaleX:0.91,scaleY:0.87,skewX:-24.7,skewY:153.4,x:876,y:396.5},3).to({scaleX:0.9,scaleY:0.88,skewX:-0.6,skewY:181.5,x:830.6,y:396.4},22).to({regX:73.8,scaleX:0.9,scaleY:0.89,skewX:-3.1,skewY:183.7,x:774.8,y:396.5},27).to({regX:73.7,scaleX:0.89,skewX:33.5,skewY:219.2,x:766.4,y:402.9},1).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},10).wait(29).to({skewX:-22.2},0).wait(26).to({regX:73.7,regY:95.4,skewX:-8.9,skewY:171.1,x:814.8,y:401},6).to({scaleX:0.89,scaleY:0.89,skewX:-11.2,skewY:169,x:793.4,y:405.2},28).to({scaleX:0.89,scaleY:0.89,skewX:-8.9,skewY:171.1,x:814.8,y:401},20).to({skewX:23.4,skewY:203.4,x:828.5,y:390.1},6).to({regX:73.8,scaleX:0.91,scaleY:0.87,skewX:59,skewY:235.5,x:853.8,y:386.1},10).to({skewX:10.3,skewY:186.8},10).to({scaleX:0.79,scaleY:0.84,skewX:10.3,x:840.1,y:382.3},12).to({scaleX:0.91,scaleY:0.87,skewX:59,skewY:235.5,x:853.8,y:386.1},11).to({skewX:10.3,skewY:186.8},10).to({scaleX:0.9,scaleY:0.88,skewX:1.3,skewY:179,x:853.7,y:389.8},10).to({skewX:1.3},13).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},1).wait(13).to({scaleX:0.94,scaleY:0.85,skewX:-25.2,skewY:160.5,x:838.1,y:447},4).to({regY:95.2,scaleX:0.92,scaleY:0.89,skewX:58.8,skewY:242.1,x:864.2,y:397.9},3).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},3).to({regX:73.7,regY:95,scaleX:0.91,scaleY:0.89,skewX:37.3,skewY:219.9,x:868,y:390.3},3).to({regX:73.8,regY:95.2,scaleX:0.91,skewX:-10.2,skewY:172,x:863.8,y:397.4},4).to({scaleX:0.91,skewX:23,skewY:205.6,x:866.7,y:392.4},2).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},3).to({regY:95.1,scaleX:0.91,scaleY:0.89,skewX:39.6,skewY:222.4,x:868.1,y:390},2).to({regY:95.2,scaleX:0.91,skewX:-10.2,skewY:172,x:863.8,y:397.4},3).to({scaleX:0.91,scaleY:0.89,skewX:72.9,skewY:255.9,x:871,y:385.2},5).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:35.8,skewY:215.8,x:853.2,y:399.5},4).wait(1).to({skewX:-22.2,skewY:157.8,y:399.4},0).to({skewX:0,skewY:180},3).to({skewX:15,skewY:195,y:399.5},2).to({regX:73.7,regY:95.2,scaleX:0.89,scaleY:0.89,skewX:28.8,skewY:208.8,x:852.2,y:399.7},3).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:37.9,skewY:217.9,x:851.3,y:400},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:42.5,skewY:222.5,x:850.9},1).to({regX:73.9,skewX:30.3,skewY:210.3,x:853.1,y:399.4},5).wait(26).to({skewX:48,skewY:228,x:829.5,y:373.3},5).to({scaleX:0.89,scaleY:0.89,skewX:32.6,skewY:212.6,y:379.2},3).to({scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,y:383.2},2).to({scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,y:387},2).to({regX:73.8,regY:95.4,skewX:19.5,skewY:199.5,x:846.9,y:401.8},10).wait(23).to({regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},7).wait(19).to({skewX:-22.2},0).wait(16).to({skewX:-2.7,skewY:177.3,x:853.3},5).to({skewX:-2.7},5).to({skewX:-33.5,skewY:146.5},5).to({skewX:-21.7,skewY:158.3,x:900.1,y:396.6},8).wait(21).to({scaleX:0.89,scaleY:0.89,skewX:-21.8,skewY:158.2,x:880,y:397.8},3).to({scaleX:0.89,scaleY:0.89,x:873.3,y:398.1},1).to({scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},3).wait(22).to({skewX:7.5,skewY:187.5,x:866.4,y:390.2},5).to({regX:73.7,regY:95.4,skewX:43.3,skewY:223.3,x:882.1,y:379.3},6).to({skewX:76.7,skewY:256.7,x:901.6},6).wait(18).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:45.1,skewY:225.1,x:868,y:383.2},3).to({regX:73.7,scaleX:0.89,scaleY:0.89,skewX:3,skewY:183,x:823.3,y:388.5},4).wait(25).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},6).wait(19).to({regY:95.2,skewX:46,skewY:226,x:881.6,y:380.5},7).wait(50).to({regX:73.7,regY:95.3,skewX:37,skewY:217,x:844.1,y:383.6},11).wait(2).to({regX:73.8,skewX:51.4,skewY:231.4},5).to({regX:73.7,skewX:37,skewY:217},6).wait(3).to({regX:73.8,skewX:51.4,skewY:231.4},7).to({regX:73.7,skewX:37,skewY:217},6).wait(3).to({regX:73.8,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},5).wait(35).to({skewX:-22.2},0).to({skewX:-33.2,skewY:146.8,x:818.9,y:414.6},4).wait(5).to({regX:73.7,skewX:-28.5,skewY:151.5,x:856.8,y:401.1},7).wait(37).to({regX:73.8,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},4).wait(16).to({regY:95.4,skewX:6.5,skewY:186.5,y:399.5},16).to({regX:73.7,skewX:14.8,skewY:194.8},10).wait(60).to({regX:73.8,regY:95.3,skewX:-22.2,skewY:157.8,y:399.4},6).wait(15).to({regX:73.7,regY:95.4,skewX:-5.4,skewY:174.6,x:825.5,y:428.8},5).wait(27).to({skewX:-5.4},0).wait(25).to({regY:95.3,skewX:56.8,skewY:236.8,x:873.5,y:384.7},5).wait(11).to({skewX:-1,skewY:179,x:889.9,y:392.7},5).to({regY:95.4,scaleX:0.89,scaleY:0.89,skewX:-3.5,skewY:177.1,x:882.2,y:394.7},3).to({scaleX:0.89,scaleY:0.89,skewX:-3.6,skewY:172.6,y:404.4},4).to({regY:95.3,scaleX:0.91,scaleY:0.88,skewX:0.2,skewY:170.8,x:905,y:406.7},3).to({scaleX:0.9,skewX:-2.8,skewY:169.7,x:898.4,y:407.9},3).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},9).wait(20).to({skewX:0,skewY:180},3).to({skewX:15,skewY:195,y:399.5},2).to({regX:73.7,regY:95.2,scaleX:0.89,scaleY:0.89,skewX:28.8,skewY:208.8,x:852.2,y:399.7},3).to({regY:95.3,scaleX:0.89,scaleY:0.89,skewX:37.9,skewY:217.9,x:851.3,y:400},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:42.5,skewY:222.5,x:850.9},1).to({regX:73.9,skewX:30.3,skewY:210.3,x:853.1,y:399.4},5).wait(5).to({skewX:48,skewY:228,x:829.5,y:373.3},5).to({scaleX:0.89,scaleY:0.89,skewX:32.6,skewY:212.6,y:379.2},3).to({scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,y:383.2},2).to({scaleX:0.89,scaleY:0.89,skewX:12.3,skewY:192.3,y:387},2).to({regX:73.8,regY:95.4,skewX:19.5,skewY:199.5,x:846.9,y:401.8},10).wait(23).to({regY:95.3,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},7).wait(1).to({skewX:-22.2},0).wait(26).to({regX:73.7,regY:95.4,skewX:-28.2,skewY:151.8,x:875.1,y:380.2},6).wait(23).to({scaleX:0.89,scaleY:0.89,skewX:-17.1,skewY:162.9,x:846.3,y:392.6},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-25.7,skewY:154.3,x:817.4,y:405},2).wait(46).to({regX:73.7,scaleX:0.9,scaleY:0.87,skewX:-27.1,skewY:155.6,x:812.7,y:424.8},0).wait(1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-25.7,skewY:154.3,x:817.4,y:405},0).to({regY:95.3,skewX:52.3,skewY:232.3,x:809.2,y:409.5},12).wait(10).to({regY:95.2,scaleX:0.89,scaleY:0.89,skewX:22.3,skewY:202.3,x:826.8,y:405.4},2).to({regX:73.7,regY:95.3,skewX:7.3,skewY:187.3,x:835.7,y:403.5},1).to({regX:73.8,scaleX:0.89,scaleY:0.89,skewX:-22.2,skewY:157.8,x:853.2,y:399.4},2).wait(13).to({regY:95.4,skewX:-17.5,skewY:162.5,x:814.1,y:389.2},8).to({_off:true},16).wait(48));

	// shoulder right
	this.instance_20 = new lib.shoulder();
	this.instance_20.setTransform(1105.4,1091.4,0.888,0.888,21.5,0,0,73.8,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).to({y:424.4},102).to({regX:73.9,rotation:-4.7,x:1101.6,y:408.9},12).to({rotation:-4.7},12).wait(1).to({regY:95.3,rotation:-8,x:1121.6,y:409.2},4).to({rotation:-14,x:1137.4,y:411.2},4).to({regY:95.4,rotation:-61.5,x:1129.4,y:403.3},5).to({regY:95.3,rotation:-23.2,x:1145.3,y:423.3},4).to({rotation:-45.4,x:1143.3,y:403.3},4).to({regY:95.4,rotation:-61.5,x:1129.4},5).to({regY:95.3,rotation:-23.2,x:1145.3,y:423.3},4).to({rotation:-45.4,x:1143.3,y:403.3},4).wait(1).to({regX:73.8,rotation:8.6,x:1096.4,y:384.3},3).to({rotation:8.6},6).to({rotation:14.1,x:1123.2,y:407.1},11,cjs.Ease.get(1)).to({regY:95.4,rotation:-36.1,x:1103.7,y:389.9},6).wait(7).to({rotation:-62.8},9).to({rotation:21.5,x:1105.4,y:424.4},9).wait(69).to({regY:95.3,rotation:8.6,x:1096.4,y:384.3},6).to({regX:73.7,regY:95.4,rotation:-30.1,y:384.4},14).to({scaleX:0.9,scaleY:0.88,rotation:0,skewX:-13.4,skewY:-16.1,x:1137.2},3).to({regX:73.8,regY:95.5,scaleX:0.92,scaleY:0.86,skewX:2.3,skewY:2.8,x:1091,y:384.5},22).to({regY:95.4,scaleX:0.93,scaleY:0.85,skewX:22,skewY:26.2,x:1034.1,y:384.4},27).to({regX:73.9,regY:95.5,scaleX:0.92,scaleY:0.85,skewX:-28.1,skewY:-24.6,x:1046.1,y:391.2},1).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},10).wait(55).to({regX:73.9,regY:95.3,rotation:-3.4,x:1067.7,y:385.2},6).to({scaleX:0.89,scaleY:0.89,rotation:0,skewX:-54.8,skewY:-54.9,x:1045.2,y:380.2},28).to({scaleX:0.89,scaleY:0.89,rotation:-3.4,skewX:0,skewY:0,x:1067.7,y:385.2},20).to({regX:73.8,rotation:-26.2,x:1135.9,y:407.6},6).to({scaleX:0.9,scaleY:0.89,rotation:0,skewX:-55.9,skewY:-45,x:1133.9,y:405.6},10).to({skewX:-27.4,skewY:-16.5},10).to({regX:73.7,regY:95.4,skewX:0.3,skewY:11.2,x:1133.8},12).to({regX:73.8,scaleX:0.89,skewX:-6.1,skewY:-6.1,x:1124.1,y:393.9},11).to({regY:95.3,scaleX:0.9,skewX:-55.9,skewY:-45,x:1133.9,y:405.6},10).to({regX:73.7,regY:95.4,skewX:0.3,skewY:11.2,x:1133.8},10).to({skewX:0.3,skewY:11.2},13).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},1).wait(13).to({scaleX:0.94,scaleY:0.85,rotation:0,skewX:24.4,skewY:18.9,x:1108.7,y:470.4},4).to({regY:95.3,scaleX:0.91,scaleY:0.9,skewX:-51.2,skewY:-55.2,x:1133,y:435},3).to({regX:73.7,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},3).to({regX:73.8,scaleX:0.9,scaleY:0.9,skewX:-25.3,skewY:-28.5,x:1113.9,y:425.8},3).to({scaleX:0.9,skewX:-68.6,skewY:-71.3,x:1122,y:415.8},4).to({regY:95.4,scaleX:0.9,scaleY:0.9,skewX:-38.3,skewY:-41.4,x:1116.4,y:422.9},2).to({regX:73.7,regY:95.3,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},3).to({scaleX:0.9,scaleY:0.9,skewX:-23.1,skewY:-26.3,x:1113.5,y:426.4},2).to({regX:73.8,scaleX:0.9,skewX:-68.6,skewY:-71.3,x:1122,y:415.8},3).to({regX:73.7,scaleX:0.91,scaleY:0.9,skewX:7.1,skewY:3.6,x:1107.8,y:433.4},5).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:-30.3,skewX:0,skewY:0,x:1105.4,y:424.4},4).wait(1).to({rotation:21.5},0).to({rotation:-5.3},3).to({regX:73.7,rotation:-23.5,x:1105.3},2).to({scaleX:0.89,scaleY:0.89,rotation:-45.4,x:1114.9,y:430.9},3).to({scaleX:0.89,scaleY:0.89,rotation:-59.9,x:1121.2,y:435.3},2).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-67.2,x:1124.3,y:437.4},1).to({regY:95.4,rotation:-50.7,x:1124.4},5).wait(26).to({regY:95.3,rotation:-59.7,x:1105.4,y:374},5).to({scaleX:0.89,scaleY:0.89,rotation:-42.1,y:374.1},3).to({scaleX:0.89,scaleY:0.89,rotation:-30.6},2).to({scaleX:0.89,scaleY:0.89,rotation:-19,y:374},2).to({regY:95.4,rotation:-11.7,x:1122.2,y:423.6},10).wait(23).to({rotation:21.5,x:1105.4,y:424.4},7).wait(19).to({rotation:21.5},0).wait(16).to({rotation:-13.5},5).wait(5).to({rotation:26.2,x:1105.3},5).to({rotation:38,x:1141.7,y:472.4},8).wait(21).to({regX:73.9,scaleX:0.89,scaleY:0.89,rotation:30.8,x:1126.2,y:451.9},3).to({regY:95.5,scaleX:0.89,scaleY:0.89,rotation:28.5,x:1120.9,y:445.1},1).to({regX:73.8,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,x:1105.4,y:424.4},3).wait(22).to({regY:95.3,scaleX:0.89,scaleY:0.89,rotation:24.1,x:1116.8,y:426.6},5).to({regX:73.9,regY:95.4,scaleX:0.89,scaleY:0.89,rotation:27.2,x:1130.5,y:429.5},6).wait(24).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:10.5,x:1108.4,y:408.3},3).to({regX:73.9,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-11.8,x:1079.1,y:380},4).wait(25).to({regX:73.8,regY:95.4,rotation:21.5,x:1105.4,y:424.4},6).wait(19).to({rotation:21.5},0).to({rotation:27.4,x:1129.7,y:431.6},7).wait(50).to({regX:73.9,rotation:-35,x:1097.3,y:395.1},11).wait(2).to({regY:95.3,rotation:-26.8,x:1097.2},5).to({regY:95.4,rotation:-35,x:1097.3},6).wait(3).to({regY:95.3,rotation:-26.8,x:1097.2},7).to({regY:95.4,rotation:-35,x:1097.3},6).wait(3).to({regX:73.8,rotation:21.5,x:1105.4,y:424.4},5).wait(35).to({regY:95.3,rotation:-19.3,x:1071.2,y:391},4).to({rotation:-70.2},5).to({x:1117.2,y:389},7).wait(1).to({regX:73.7,rotation:5.2,x:1111.2,y:395},6,cjs.Ease.get(1)).wait(8).to({rotation:5.2},0).wait(22).to({regX:73.8,regY:95.4,rotation:21.5,x:1105.4,y:424.4},4).wait(16).to({regY:95.3,rotation:-11.2},16).to({regY:95.4,rotation:-39.6},10).wait(60).to({rotation:21.5},6).wait(15).to({rotation:8.3,x:1076.6,y:395.6},5).wait(52).to({x:1132.7,y:425.6},5).wait(16).to({scaleX:0.89,scaleY:0.89,rotation:0,skewX:5.7,skewY:6.4,x:1126.1,y:419.6},3).to({scaleX:0.88,scaleY:0.9,skewY:1.8,y:409.6},4).to({regY:95.3,scaleX:0.88,scaleY:0.91,skewX:9.3,skewY:-0.1,x:1149.1,y:403.8},3).to({scaleY:0.9,skewX:6.4,skewY:-1.1,x:1142.3,y:400.4},3).to({regY:95.4,scaleX:0.89,scaleY:0.89,rotation:21.5,skewX:0,skewY:0,x:1105.4,y:424.4},9).wait(20).to({rotation:-5.3},3).to({regX:73.7,rotation:-23.5,x:1105.3},2).to({scaleX:0.89,scaleY:0.89,rotation:-45.4,x:1114.9,y:430.9},3).to({scaleX:0.89,scaleY:0.89,rotation:-59.9,x:1121.2,y:435.3},2).to({regX:73.8,regY:95.3,scaleX:0.89,scaleY:0.89,rotation:-67.2,x:1124.3,y:437.4},1).to({regY:95.4,rotation:-50.7,x:1124.4},5).wait(5).to({regY:95.3,rotation:-59.7,x:1105.4,y:374},5).to({scaleX:0.89,scaleY:0.89,rotation:-42.1,y:374.1},3).to({scaleX:0.89,scaleY:0.89,rotation:-30.6},2).to({scaleX:0.89,scaleY:0.89,rotation:-19,y:374},2).to({regY:95.4,rotation:-11.7,x:1122.2,y:423.6},10).wait(23).to({rotation:21.5,x:1105.4,y:424.4},7).wait(1).to({rotation:21.5},0).wait(26).to({rotation:25.7,x:1124.6,y:423.8},6).wait(23).to({scaleX:0.89,scaleY:0.89,rotation:19.1,x:1097.5,y:407.1},2).to({regY:95.3,scaleX:0.89,scaleY:0.89,rotation:12.6,x:1070.4,y:390.5},2).wait(10).to({regY:95.4,rotation:-13.7},5).wait(31).to({regX:73.9,scaleX:0.91,scaleY:0.86,rotation:0,skewX:-14.5,skewY:-12.9,x:1072.5,y:410.9},0).wait(1).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:-13.7,skewX:0,skewY:0,x:1070.4,y:390.5},0).to({regX:73.9,rotation:-66.6,x:1060.3,y:374.2},12).wait(10).to({scaleX:0.89,scaleY:0.89,rotation:-31.3,x:1078.4,y:394.3},2).to({regX:73.8,scaleX:0.89,scaleY:0.89,rotation:-13.6,x:1087.3,y:404.4},1).to({scaleX:0.89,scaleY:0.89,rotation:21.5,x:1105.4,y:424.4},2).wait(13).to({regX:73.9,rotation:-32.5,x:1060.4,y:371.3},8).to({_off:true},16).wait(48));

	// bg
	this.shape = new cjs.Shape();
	//this.shape.graphics.bf(img.BG, null, new cjs.Matrix2D(1,0,0,1,-1731.8,-1575.6)).s().p("EiW5BVPMAAAiqeMEtzAAAMgAZCqfg");
	this.shape.graphics.bf(img.BG, null, new cjs.Matrix2D(2,0,0,2,-1731.8,-1575.6)).s().p("EiW5BVPMAAAiqeMEtzAAAMgAZCqfg");
	this.shape.setTransform(959.5,539.2);
	/*this.shape.scaleX = 0.5;
	this.shape.scaleY = 1.5;*/

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(814).to({_off:true},818).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(953.6,533.6,1931.8,1572.7);


// symbols:
(lib.armstraight = function() {
	this.initialize(img.armstraight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,624,344);


(lib.BG = function() {
	this.initialize(img.BG);

}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3468,2564);


(lib.face_02 = function() {
	this.initialize(img.face_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,466);


(lib.face_03 = function() {
	this.initialize(img.face_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,466);


(lib.face_04 = function() {
	this.initialize(img.face_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,410);


(lib.face_05 = function() {
	this.initialize(img.face_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,494);


(lib.face_06 = function() {
	this.initialize(img.face_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,419,550);


(lib.face_07 = function() {
	this.initialize(img.face_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,372,481);


(lib.face_10 = function() {
	this.initialize(img.face_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,371,469);


(lib.face_11 = function() {
	this.initialize(img.face_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,384,471);


(lib.face_13 = function() {
	this.initialize(img.face_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,424,461);


(lib.face_14 = function() {
	this.initialize(img.face_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,373,464);


(lib.face_15 = function() {
	this.initialize(img.face_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,373,464);


(lib.face_16 = function() {
	this.initialize(img.face_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.face_19 = function() {
	this.initialize(img.face_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.face_20 = function() {
	this.initialize(img.face_20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,465);


(lib.hand_01 = function() {
	this.initialize(img.hand_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,172,348);


(lib.hand_02 = function() {
	this.initialize(img.hand_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,183,328);


(lib.hand_03 = function() {
	this.initialize(img.hand_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,169,167);


(lib.hand_04 = function() {
	this.initialize(img.hand_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,145,289);


(lib.hand_05 = function() {
	this.initialize(img.hand_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,156,339);


(lib.hand_06 = function() {
	this.initialize(img.hand_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,193,242);


(lib.hand_07 = function() {
	this.initialize(img.hand_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,280,260);


(lib.hand_08 = function() {
	this.initialize(img.hand_08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,292,148);


(lib.hand_09 = function() {
	this.initialize(img.hand_09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,219,196);


(lib.hand_10 = function() {
	this.initialize(img.hand_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,270,255);


(lib.hand_11 = function() {
	this.initialize(img.hand_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,193,326);


(lib.obfuscobody02 = function() {
	this.initialize(img.obfuscobody02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,549,835);


(lib.overlay = function() {
	this.initialize(img.overlay);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2858,909);


(lib.Tween7 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.overlay, null, new cjs.Matrix2D(2,0,0,2,-1578.2,-401.4)).s().p("EiNWA+tMAAAh9aMEatAAAMAAAB9ag");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-904.7,-401.4,1809.5,802.8);


(lib.Tween6 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.overlay, null, new cjs.Matrix2D(2,0,0,2,-1578.2,-401.4)).s().p("EiNWA+tMAAAh9aMEatAAAMAAAB9ag");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-904.7,-401.4,1809.5,802.8);


(lib.waist = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.obfuscobody02, null, new cjs.Matrix2D(0.646,0,0,0.646,-177.2,-408.7)).s().p("A7rUXIAA+3IAOgHIBygUQEFn4CLhPQbHiKFvNNIORdWg");
	this.shape.setTransform(177.2,67.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-63,354.4,260.7);


(lib.torso = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.obfuscobody02, null, new cjs.Matrix2D(0.646,0,0,0.646,-185.3,-210.9)).s().p("A2gWSQk5k7FPpoIkx+nMAgGgI8IVxUdIh1InIvYZsQm5I5n3AAQoNAApSpjg");
	this.shape.setTransform(185.3,210.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(12.9,7.1,344.8,407.5);


(lib.shoulder = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.armstraight, null, new cjs.Matrix2D(0.255,0.593,-0.593,0.255,93.2,-148.9)).s().p("ADtRHIvbtuIlls7IQYnxISPW4IAACAQg3FAilCYQhoCXlLAAQhiAAh2gNg");
	this.shape.setTransform(110.8,147);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,36.2,221.7,221.7);


(lib.headup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_04, null, new cjs.Matrix2D(0.648,0,0,0.648,-113.4,-121)).s().p("Axsy4MAjZAAAMAAAAkrIvIpmQowEfjcD5QiEB1kNAZQg3AFg9ABg");
	this.shape.setTransform(100.8,191.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(20));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.842,-0.152,0.047,0.807,-181.8,-293.3)).s().p("ArdhIIBYg9QBehCBggoQAggNAsgPQILpEChGuQBYACB1ABQAXAbBLAnIBpA1QhMD2CDE8I33FOQCFrKhrApgAr5g1IACgBIgJAIIAHgHg");
	this.shape_1.setTransform(119.9,282.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.837,-0.14,0.06,0.798,-176.5,-297.1)).s().p("AlzE4QiWhGgYgOQhAglABgsQABgriPj9QBCBUABgWQABgmAfggQBGhIFXiHIFuhJQCVhBDhBxQBXAsBKAJQBLAKAMAUQALATjqG2QhdB4iPA9Qg3AYhrAiQimA3gxARQiIhOiVhIg");
	this.shape_2.setTransform(107.8,284.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.766,-0.122,0.048,0.735,-183.7,-321.1)).s().p("AlNGIQg8gxgyhGQgog/gHgIQgeglglg+Ig4hjQgFgHhFheQg+hUgBgMQgDgYD1hVQAwgRERhZIEXg2QDig8DeAaQBcALA6AYQA6AXADAcQAEAohKDKQgkBlgnBeIgUBEQgbBMgqBCQiHDOj4AwQhIAOhBAAQi9AAiNhxg");
	this.shape_3.setTransform(110.7,288.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.759,-0.151,0.039,0.82,-154.4,-307)).s().p("AiOHPQh8g4hohKQkdjMgUkCQAZgMD/iOQChhYCvg9IEshKQBlgIDNAWQBMAIA1ALIAAJZQhyDdi0BTImNBOQg4gQhHgfg");
	this.shape_4.setTransform(105.4,281.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.767,-0.172,0.072,0.743,-199.6,-252.9)).s().p("AlhFzQiiiEgPgSQgmgxgbglQgrhGhThRQhThUBGArQBFAogshEQgihfAng8IV1k7IAaEJQBRglg4B3IhUC5QgdA/ABABIgDAGQgdBOgGAkIgoDOIgGAaIrlCjQgSg9iOh8g");
	this.shape_5.setTransform(107.7,280.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.767,-0.121,0.072,0.521,-273.4,-195.7)).s().p("AgaAJIAXgzQAOgKANgSIASCAIhTANQADgkAMgag");
	this.shape_6.setTransform(181.6,299);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.898,-0.138,0.042,0.771,-175.3,-287.1)).s().p("ArzADQhqoBB6FEIXwkqIAYDWQg4AbkFJ5IpjBfg");
	this.shape_7.setTransform(110.6,278.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.807,-0.159,-0.068,0.778,-119.1,-288.1)).s().p("ArjgXQAHn/BhFTIVXkNQAhDdhjITIuACxg");
	this.shape_8.setTransform(111.3,278.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.863,-0.148,0.085,0.757,-167.1,-281.5)).s().p("AsGjaIYMkpIAAF3IlvIsIpBBkg");
	this.shape_9.setTransform(102.7,276.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.952,-0.171,0.101,0.836,-192.3,-288.6)).s().p("AtflEQLfi1PgA0InNMyIo+Blg");
	this.shape_10.setTransform(106.7,286.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.9,-0.147,0.112,0.899,-199,-295)).s().p("AsHA5IgBmkIXTkCIA+H0ImxKOIn+BZg");
	this.shape_11.setTransform(113.3,264.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_6},{t:this.shape_5}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},2).to({state:[{t:this.shape_11}]},2).wait(2));

	// Layer 4
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#704B3E","#381E19"],[0,1],-2.6,36.5,-0.5,-0.6).s().p("AmWDbQAIkXgEieIJOisIDbFvIjbE5QiWBliCAAQisAAiOisg");
	this.shape_12.setTransform(91.2,313.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(20));

	// Layer 3
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.bf(img.face_04, null, new cjs.Matrix2D(-0.616,0,0,-0.648,107.8,141.6)).s().p("Aw1PRIAA91IOZJmQIVkfDRj5QB+h1D/gZQA1gFA6gBIAAeeQq5A3pwAAQmyAAmQgag");
	this.shape_13.setTransform(90.8,216);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,70.7,231.3,281.7);


(lib.headdown = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.face_11();
	this.instance.setTransform(0,0,0.711,0.711);

	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_11, null, new cjs.Matrix2D(0.711,0,0,0.711,-136.5,-148.1)).s().p("AIpXJIgQgSQhHhMidgGQAogNglAJQgiAMhaAYQhZAXgigNQgigMgMABQiUgBhaAMQjqhMh3A+Qh3A+ADADQAEAEAAADIlyAAIAA0yIk2AAIAA5fMAqpAAAIAAZfIkFAAImGUiIAAgYIgfAAIAAAog");
	this.shape.setTransform(136.6,148.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},2).wait(10));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.657,-0.03,-0.025,0.61,-114.1,-242.7)).s().p("AoziWIAOgLQArgVAzgdQBOgmBNgVIA8gOIIXgsQBDALBaAMQAPAXA3AlIBMAxQhNCyBND6IyrBhQBPkogti3g");
	this.shape_1.setTransform(131.1,303.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.667,-0.03,-0.022,0.627,-104,-247.5)).s().p("AjnDTQhvhFgSgNQgvgkAFghQAEgiksl7QCqCoAHgUQAHgUBTgDQBSgCEYhIIEkgWQB7glCmBtQBAAqA6APQA6AOAHARQAIAQjeE+QhTBUh1AiQgtANhXARQiIAbgmAJQhjhKhvhFg");
	this.shape_2.setTransform(120.7,305.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.639,-0.021,-0.028,0.497,-124,-231.6)).s().p("AlQDdQguglgigzQgbgtgFgGQgWgbgYgtIglhFQgDgGgxhFQgqg+AAgIQAAgQDRgmIERgtIDpgPQDAgVCzAjQBLAPAtAUQAtAUAAATQAAAchQCBQgnBBgoA7IgXAtQgdAwgpApQiBCAjQANIguABQjJAAh+hqg");
	this.shape_3.setTransform(133.5,307.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.628,-0.019,-0.027,0.432,-106.6,-173.7)).s().p("AD5D1IlIAKQgsgNhig1QhKgololIIAAgdIBWBOIDvg7QCIghCTgSID6gPQBSAEClAbQDOAjABAdQgBAkk8EpIhYBTIgDgLg");
	this.shape_4.setTransform(129.7,299.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.591,-0.039,0,0.441,-135.2,-166.3)).s().p("AktC9QkokzAihDQAFgSAOgOIQ0hIIAACeQA/gPgyBBIhNBkIgaAlIgCACQgcAsgHAUIguB1IgFAQIo7AjQgHgghNhFgAovh/IgFgSQALAYgBAAIgFgGg");
	this.shape_5.setTransform(129.9,303.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.54,-0.032,0,0.365,-169.3,-153.4)).s().p("AgMAFIATghQAMgGAKgLIAABYIg5ADQAFgYALgRg");
	this.shape_6.setTransform(175.4,319.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.63,-0.017,-0.03,0.433,-99.1,-172.8)).s().p("Ao9iSQAQjNA8C9IQvhAIAAB6QgpAKjkFQImsALg");
	this.shape_7.setTransform(130.8,301.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.65,-0.039,-0.121,0.488,-67.6,-190.9)).s().p("Ap8i9QB3jGAvDeIRNhCQAzBolzF8IoHAeg");
	this.shape_8.setTransform(128.4,299.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.607,-0.026,0,0.435,-106.2,-172.3)).s().p("AqEi9IUJhNIoNIDImVASg");
	this.shape_9.setTransform(136.1,303.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.671,-0.04,0,0.515,-111.7,-188.1)).s().p("ApYj6QIKg+KnBjImCHRImUAXg");
	this.shape_10.setTransform(128.7,306.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.699,-0.039,0,0.702,-119.9,-245.9)).s().p("Ap9hyIB1j7ISGhNIAAGGImIHVImMAag");
	this.shape_11.setTransform(129.7,296.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,273.1,335);


(lib.head34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_07, null, new cjs.Matrix2D(0.607,0,0,0.607,-112.8,-147.4)).s().p("AxHXCIAAg3QABpzghgsMAAAgitMAjPAAAMAAAAtkIhlgCIAAgWIvIACIoLgGIggA7g");
	this.shape.setTransform(144,178.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_07, null, new cjs.Matrix2D(0.607,0,0,0.607,-112.8,-122.5)).s().p("ADyTIQjxiLlCivIseBvQgDgRgFgGMAAAgitMAjPAAAMAAAAmPg");
	this.shape_1.setTransform(144,153.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).wait(20));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.676,0.165,-0.171,0.555,-56.9,-259.8)).s().p("AqfBnQCXj4gCi3IARgGIBsgRQBZgPBTAEIBAAFIIsB1QBCAdBZAlQAJAaAwAyIBBBEQh4CMASD+g");
	this.shape_2.setTransform(108,276.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.673,0.161,-0.181,0.61,-56,-275.3)).s().p("AhMFPQiOgMgqgDQhRhmhdhjQhdhjgOgTQgmguANgfQANghgkjpQAaBTAHgRQAMgbAggOQBJgfEqAIIEpA/QCDgBCKCbQA1A7A3AfQA2AgADAQQADARkuD9QhoA6h9AAQgxAAhZgIg");
	this.shape_3.setTransform(112.3,270.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.615,0.15,-0.176,0.571,-55.1,-302.5)).s().p("Ah/GPQjigvhkixQgfg4gShEIgOhDQgNglgJg7IgOhcIgbhmQgWhTACgKQAFgSDSANQApACDoATIDjAwQC9AbCgBaQBCAlAlAkQAlAkgFAWQgJAghyB/Qg5BBg5A8IgjAuQgqAxgzAkQh2BTiKAAQgzAAg3gMg");
	this.shape_4.setTransform(115.4,277.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.674,0.167,-0.174,0.554,-64.2,-260.9)).s().p("ABcFzIlghXQgrgfgzgtQhahQhFhVQi8jpAxiyQAZABD4gEQCegCCiAWIEPA5QBWAeCmBWQDQBsgKAmQgMAtgxBJQg+BbhTBEQidB/i0AAIgbgBg");
	this.shape_5.setTransform(120.1,268);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.623,0.131,-0.13,0.505,-93.3,-232)).s().p("AGCGaQAQggASgVIAkgpQAQgEAQgNIghB+gAlOD/QACgthNh+QhaiHgHgQIgchOQgOg6grhQQgqhRAqAxQArAygQg7QgDhJAtgbIRvDvIguC0QBGABhIA6IhuBeIglAiIgEADQgpApgOAWIhSB4IgJAQg");
	this.shape_6.setTransform(112.1,272.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.719,0.181,-0.188,0.59,-58.5,-268.4)).s().p("Ak2FYIlVowQAOhYAMg6QAojRABDRIAAAJITTEDIgrCmQgzACl6GJg");
	this.shape_7.setTransform(118.2,265.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.655,0.137,-0.272,0.556,-15,-249.6)).s().p("Al0ElIj3oLQAihWAag0QBMibgFCbIgDArIRXDqQgmCtjiFsg");
	this.shape_8.setTransform(113.8,268);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.696,0.16,-0.155,0.603,-66.9,-268.8)).s().p("An0FBIjzrsIXPE4IsJIfg");
	this.shape_9.setTransform(125,269);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.774,0.162,-0.184,0.714,-67.7,-290.7)).s().p("AmLF9IkWteQC3AaDDAxQHFB1IED6IpcIJg");
	this.shape_10.setTransform(114.2,268.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.728,0.161,-0.205,0.794,-62.4,-312.1)).s().p("AmJHUIkYqbICIlkIS7D+IhyG4IobGhg");
	this.shape_11.setTransform(118,260.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},2).to({state:[{t:this.shape_11}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.2,30.7,225.7,294.9);


(lib.head = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.face_05, null, new cjs.Matrix2D(0.613,0,0,0.613,-123.8,-132.2)).s().p("AGJUFQj2iVjngaQjpgblRCMIAfANIiWAAIi3oNIAFAAIAAiXIjdpTIAprpILkocIBFAAIN+CfIJZM3IpWZ7g");
	this.shape.setTransform(123.8,132.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(11));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.face_05, null, new cjs.Matrix2D(0.613,0,0,0.613,-123.8,-153.3)).s().p("AqGQAIh/AAIi3oMIAFAAIAAiXIjdpTIAprqILkocIBFAAIN+CgIJZM2IpWZ8IidAAQgRhskBGMQhXCHh1AAQjoAAlin9g");
	this.shape_1.setTransform(123.8,153.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.face_02, null, new cjs.Matrix2D(0.591,0.023,-0.023,0.591,-102.6,-243.9)).s().p("AoZEcQBHkagoi0IAMgKIBVgoQBGghBFgOQAXgEAfgEIHiAAQA8APBRATQANAXAyAoIBEA3QhFClBFD6g");
	this.shape_2.setTransform(112.1,271.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.face_03, null, new cjs.Matrix2D(0.588,0.02,-0.019,0.648,-100.9,-266.6)).s().p("AkoC1QhihQgPgPQgqgpAEgiQAEghhPjiQAnBOACgSQAEgeAYgVQA1guD3g2IEBAAQBsgdCSB+QA5AxAzATQAzAUAGARQAHARjDE6QhKBQhnAbQgnAKhNALIiZAXQhXhUhihQg");
	this.shape_3.setTransform(110.2,271.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.face_06, null, new cjs.Matrix2D(0.537,0.021,-0.024,0.608,-104.2,-294.2)).s().p("AkbDvQglgygdhAIgbhCQgSgjgUg2IgghaQgCgIgphYQgkhPAAgKQAAgTCwgfQAigHDDgdIDEAAQChgNCWA4QA/AYAmAcQAmAcAAAXQAAAihDCZQggBLgiBIIgUA1QgYA6giAvQhtCTivAAQjDAAh3ibg");
	this.shape_4.setTransform(112.5,278);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.face_10, null, new cjs.Matrix2D(0.59,0.026,-0.026,0.59,-104.2,-248.1)).s().p("AhyFMQgqgVg0gjQhbg9hKhHQjNjBADi8QAUgEDMg4QCBgjCKgNIDqAAQBNAMCbA0QDCBAAAAoQAAAygZBTQgfBmg2BVQhuCsijAfg");
	this.shape_5.setTransform(115.7,265.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.face_13, null, new cjs.Matrix2D(0.54,0,0,0.533,-122,-213.2)).s().p("AG7FCQAGgkALgYIAVgxQAMgIAKgQIAACFgAi1E+QgIgthahuQhnh2gJgPQgXgmgRgfQgYg4g0hHQg0hIAtAoQAuAogag3QgShIAggkIPXAAIAAC+QA7gNgvBKQguBJgYAqIgYAqIgCAEQgZAygHAYIgqCKIgFASg");
	this.shape_6.setTransform(110,271);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.face_15, null, new cjs.Matrix2D(0.63,0.03,-0.03,0.63,-101,-260.5)).s().p("AiPFtImOnoQgimwA7EZIQvAAIAACxQgqANjjHWg");
	this.shape_7.setTransform(114.6,264.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.face_14, null, new cjs.Matrix2D(0.568,0,-0.106,0.613,-61.8,-248)).s().p("AjRFkIk6nXQAsmZApEfIPCAAQAGC4hsGZg");
	this.shape_8.setTransform(113.1,263.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.face_16, null, new cjs.Matrix2D(0.607,0.014,0,0.636,-106.2,-263)).s().p("AkdFYIlnq5IUJAAIoNLDg");
	this.shape_9.setTransform(118.1,272.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.face_19, null, new cjs.Matrix2D(0.671,0,0,0.753,-111.7,-282.4)).s().p("Ai9GWImbskQIKgsKnDLImCKGg");
	this.shape_10.setTransform(110.7,271.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.face_20, null, new cjs.Matrix2D(0.633,0.008,0,0.837,-112.1,-304.4)).s().p("AirHxIlzpgIAkmBIQZAAIAAHRIljIQg");
	this.shape_11.setTransform(115.2,261.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.5,0,234.7,306.7);


(lib.handcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.hand_02, null, new cjs.Matrix2D(1,0,0,1,-99.3,-165.4)).s().p("AtDAbIObtCIDCtOIIqAAMAAAAzOI3wAdg");
	this.shape.setTransform(99.3,165.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.hand_01, null, new cjs.Matrix2D(0.931,0,0,0.931,-80,-161.9)).s().p("AsOYWUADqgOIgD7gjgIY/AAMAAAAylQ1xhZi9Acg");
	this.shape_1.setTransform(94.2,187.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.hand_03, null, new cjs.Matrix2D(-0.91,0.414,-0.414,-0.91,111.5,41)).s().p("AxZmZIYAq8IKzXuI4AK8g");
	this.shape_2.setTransform(63.7,264.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.hand_04, null, new cjs.Matrix2D(0.977,0,0,0.977,-66.9,-147.6)).s().p("AqcVDMgAfgpSINagzIFhBxIhWEOID7BQIAXLlIj6BcIgEFdIkzQYg");
	this.shape_3.setTransform(85.9,183.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.hand_05, null, new cjs.Matrix2D(0.96,-0.279,0.279,0.96,-114.5,-161.8)).s().p("AuQsxIEGsyILvDxIGPJMIAyAQIDNHqICeHQQhMDziMPJIt+EFg");
	this.shape_4.setTransform(29.9,166.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-119.7,-89.4)).s().p("AokTrImBz+IFRwdIOakWIGIB9IDYLRIgNgFIoVaBIqIDDg");
	this.shape_5.setTransform(60.1,185.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.hand_07, null, new cjs.Matrix2D(-0.832,0.555,0.555,0.832,52.7,-202.1)).s().p("ADNUmIozF5Ik2nRIgdgrIgIgMIAqiFIia8LIAYhJIGFlYIBakYIP1kEIA0AiIBDBlIibHlQjWA7j+BJIgiBqIDFLMIkgOBID7PGg");
	this.shape_6.setTransform(73.8,188.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-65,-213.7)).s().p("AgBAPIgMgjIAbApg");
	this.shape_7.setTransform(5.4,309.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.hand_08, null, new cjs.Matrix2D(-1,0,0,1,151,-74)).s().p("ArFLkIqyjdIGTzpIJ3AAIIFCmIHxG/ILvGsIjYGIIyWl4IiFGlg");
	this.shape_8.setTransform(90.7,319.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.hand_09, null, new cjs.Matrix2D(-0.705,0.709,0.709,0.705,7.8,-146.7)).s().p("A25BUIYG4OIVuVnI4HYOg");
	this.shape_9.setTransform(49.3,215.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.hand_10, null, new cjs.Matrix2D(0.731,-0.682,0.682,0.731,-177.4,-31.6)).s().p("AjLVWIlPnOIj7zfIAKmvIixjdIG+ikIKbJ0IIXtpIEJA9IjQXBIk/LAIgiE5IhzBrInACXg");
	this.shape_10.setTransform(54.8,195.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.hand_11, null, new cjs.Matrix2D(0.986,-0.169,0.169,0.986,-122.6,-144.3)).s().p("AzJ2iIdtlGMAImAyLI9sFGg");
	this.shape_11.setTransform(71.4,164.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.7,0,167.4,330.9);


(lib.hand = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.hand_02, null, new cjs.Matrix2D(1,0,0,1,-99.3,-165.4)).s().p("AtDAbIObtCIDCtOIIqAAMAAAAzOI3wAdg");
	this.shape.setTransform(99.3,165.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.hand_01, null, new cjs.Matrix2D(0.931,0,0,0.931,-80,-161.9)).s().p("AsOYWUADqgOIgD7gjgIY/AAMAAAAylQ1xhZi9Acg");
	this.shape_1.setTransform(94.2,187.7);

	this.instance = new lib.hand_03();
	this.instance.setTransform(175.2,305.4,1,1,155.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(img.hand_04, null, new cjs.Matrix2D(0.977,0,0,0.977,-66.9,-147.6)).s().p("AqcVDMgAfgpSINagzIFhBxIhWEOID7BQIAXLlIj6BcIgEFdIkzQYg");
	this.shape_2.setTransform(85.9,183.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(img.hand_05, null, new cjs.Matrix2D(0.96,-0.279,0.279,0.96,-114.5,-161.8)).s().p("AuQsxIEGsyILvDxIGPJMIAyAQIDNHqICeHQQhMDziMPJIt+EFg");
	this.shape_3.setTransform(29.9,166.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-119.7,-89.4)).s().p("AokTrImBz+IFRwdIOakWIGIB9IDYLRIgNgFIoVaBIqIDDg");
	this.shape_4.setTransform(60.1,185.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(img.hand_07, null, new cjs.Matrix2D(-0.832,0.555,0.555,0.832,52.7,-202.1)).s().p("ADNUmIozF5Ik2nRIgdgrIgIgMIAqiFIia8LIAYhJIGFlYIBakYIP1kEIA0AiIBDBlIibHlQjWA7j+BJIgiBqIDFLMIkgOBID7PGg");
	this.shape_5.setTransform(73.8,188.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(img.hand_06, null, new cjs.Matrix2D(0.958,-0.288,0.288,0.958,-65,-213.7)).s().p("AgBAPIgMgjIAbApg");
	this.shape_6.setTransform(5.4,309.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(img.hand_08, null, new cjs.Matrix2D(-1,0,0,1,151,-74)).s().p("ArFLkIqyjdIGTzpIJ3AAIIFCmIHxG/ILvGsIjYGIIyWl4IiFGlg");
	this.shape_7.setTransform(90.7,319.8);

	this.instance_1 = new lib.hand_09();
	this.instance_1.setTransform(57.1,68.8,1,1,0,-45.1,134.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.hand_10, null, new cjs.Matrix2D(0.731,-0.682,0.682,0.731,-177.4,-31.6)).s().p("AjLVWIlPnOIj7zfIAKmvIixjdIG+ikIKbJ0IIXtpIEJA9IjQXBIk/LAIgiE5IhzBrInACXg");
	this.shape_8.setTransform(54.8,195.3);

	this.instance_2 = new lib.hand_11();
	this.instance_2.setTransform(-51.3,19.7,1,1,-9.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.7,0,167.4,330.9);


(lib.forarm = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.armstraight, null, new cjs.Matrix2D(0.255,0.593,-0.593,0.255,-42.9,-288.5)).s().p("AyImuQgGrWK3AnIAAgKIXBYkICfFyIrYE5g");
	this.shape.setTransform(179.4,288.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(63.3,175.7,232.3,225.7);


(lib.fix = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// forarm right
	this.instance = new lib.forarm();
	this.instance.setTransform(214.4,-112.8,0.888,0.888,-128,0,0,89.9,202.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:89.8,rotation:-111.8,x:236.5,y:-198.8},3).to({x:231.5,y:-189.8},6).to({regX:89.7,regY:202.6,scaleX:0.91,scaleY:0.71,rotation:0,skewX:35.4,skewY:-12.3,x:226.2,y:-95.4},3).to({regX:89.8,regY:202.8,scaleX:0.77,scaleY:0.74,skewX:43,skewY:26.9,x:217.6,y:-37.3},2).to({regX:90.1,regY:202.5,scaleX:0.76,scaleY:0.84,skewX:49,skewY:21.8,x:239.9,y:-160.4},5).to({regY:202.6,x:219.8,y:-1.7},4).to({regY:202.5,x:239.9,y:-160.4},4).to({regY:202.6,x:219.8,y:-1.7},4).to({regX:89.9,regY:202.8,scaleX:0.89,scaleY:0.89,rotation:45,skewX:0,skewY:0,x:193.2,y:6.8},6).wait(1));

	// hand right
	this.instance_1 = new lib.hand("single",0);
	this.instance_1.setTransform(267.9,-313.5,0.581,0.581,0,-11.7,168.3,39.6,288.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:288.2,skewX:62.8,skewY:242.8,x:314,y:-371.5},3).to({regY:288.1,skewX:-3.2,skewY:176.8,x:330,y:-349.6,startPosition:4},6).to({skewX:48.7,skewY:228.7,x:351.9,y:-195.7},1).to({skewX:85.4,skewY:265.4,x:292,y:-93.9},1).to({regX:39.5,skewX:107.1,skewY:287.1,x:270.1,y:-24.9},1).to({regX:39.6,regY:287.9,skewX:-3,skewY:177,x:296,y:49.4,startPosition:7},1).to({regY:288.1,skewX:-3.2,skewY:176.8,x:254.9,y:112.6},1).to({skewX:-13.7,skewY:166.3,x:266.4,y:-35.9},5).to({skewX:-3.7,skewY:176.3,x:240.3,y:115.6},4).to({skewX:-13.7,skewY:166.3,x:266.4,y:-35.9},4).to({skewX:-3.7,skewY:176.3,x:240.3,y:115.6},4).to({_off:true},1).wait(5).to({_off:false,skewX:-172.3,skewY:7.7,x:163.6,y:143.1,startPosition:0},0).wait(1));

	// forearm left
	this.instance_2 = new lib.forarm();
	this.instance_2.setTransform(-200.8,-42.5,0.888,0.888,0,-39.2,140.8,89.8,202.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({scaleX:0.89,scaleY:0.89,skewX:45.3,skewY:225.3,y:-30.6},3).to({scaleX:0.89,scaleY:0.89,skewX:103.2,skewY:283.2,x:-268.4,y:-77.1},3).to({regY:202.8,skewX:114.9,skewY:294.9,x:-220.8,y:-166.9},5).to({regX:90,regY:203,scaleX:0.81,scaleY:0.8,skewX:107.2,skewY:328.8,x:-216,y:-68.9},2).to({scaleX:0.84,scaleY:0.83,skewX:-63.6,skewY:148.8,x:-207,y:-79.4},1).to({regX:89.8,regY:202.7,scaleX:0.77,scaleY:0.8,skewX:-53.9,skewY:135.9,x:-189.1,y:-46.6},2).to({regX:89.6,regY:202.8,scaleX:0.73,scaleY:0.76,skewX:-60.3,skewY:144.6,x:-230.4,y:-195.8},4).to({regX:90,regY:203,scaleX:0.77,scaleY:0.78,skewX:-57.9,skewY:133,x:-189.1,y:-46.4},4).to({regX:89.6,regY:202.8,scaleX:0.73,scaleY:0.76,skewX:-60.3,skewY:144.6,x:-230.4,y:-195.8},4).to({regX:89.9,regY:202.9,scaleX:0.89,scaleY:0.89,skewX:-44,skewY:136,x:-152.6,y:-28},6).wait(1));

	// hand left
	this.instance_3 = new lib.hand("single",4);
	this.instance_3.setTransform(-222.9,140.2,0.581,0.581,153.8,0,0,39.6,288.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({regX:39.4,regY:288,rotation:186.2,x:-209.8,y:137.1},0).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:267.1,x:-351.5,y:79.5},2).to({regY:288.2,rotation:288,x:-374.8,y:-4.8},1).to({regX:39.4,rotation:323.4,x:-389.2,y:-141.8},2).to({regX:39.5,regY:288.1,scaleX:0.58,scaleY:0.58,rotation:341.2,x:-383,y:-237.5},1).to({regY:288.2,rotation:352.9,x:-305.2,y:-333.9},5).to({regX:39.4,rotation:355,x:-245.1,y:-132.1},2).to({rotation:356,x:-212,y:57.3,startPosition:7},1).to({regX:39.5,regY:288,rotation:357.7,x:-187.9,y:116.4},2).to({regX:39.6,regY:287.9,rotation:367.7,x:-232.4,y:-75.8},4).to({regX:39.5,regY:288,rotation:357.7,x:-167.9,y:120.4},4).to({regX:39.6,regY:287.9,rotation:367.7,x:-232.4,y:-75.8},4).to({x:-180.4,y:108.3},5).wait(1).to({regY:288.2,rotation:509,x:-148.1,y:172.9,startPosition:0},0).wait(1));

	// head
	this.instance_4 = new lib.headup("synched",4);
	this.instance_4.setTransform(-10.5,-305.8,1.057,1.057,4.5,0,0,112.4,278.6);

	this.instance_5 = new lib.head34("synched",14);
	this.instance_5.setTransform(-16.6,-245.9,1.057,1.057,0,14.7,-165.3,112.4,278.6);
	this.instance_5._off = true;

	this.instance_6 = new lib.head("single",0);
	this.instance_6.setTransform(34.7,-211.3,1.057,1.057,0,0,0,112.4,278.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_4}]},6).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_6}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-14.7,x:-28.5,y:-311.9,startPosition:7},3).to({startPosition:13},6).to({_off:true},1).wait(28));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(10).to({_off:false},0).to({skewX:3,skewY:-177,x:91.8,y:-231.4,startPosition:18},4).to({skewX:14,skewY:-166,x:16.6,y:-220.9,startPosition:1},5).to({skewX:4,skewY:-176,x:64.4,y:-209.9,startPosition:5},4).to({skewX:14,skewY:-166,x:16.6,y:-220.9,startPosition:1},4).to({skewX:4,skewY:-176,x:64.4,y:-209.9,startPosition:5},4).to({x:48.4,y:-211.9},5).to({_off:true,skewX:0,skewY:0,x:34.7,y:-211.3,mode:"single",startPosition:0},1).wait(1));

	// torso
	this.instance_7 = new lib.torso();
	this.instance_7.setTransform(17.3,72.8,1,1,-19.5,0,0,144.5,370.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(9).to({regX:144.6,rotation:-7.8,x:38.9,y:72.6},5).to({rotation:-18.3,x:33.8,y:71.7},5).to({regX:144.5,rotation:-8.3,x:30.5,y:81.2},4).to({regX:144.6,rotation:-18.3,x:33.8,y:71.7},4).to({regX:144.5,rotation:-8.3,x:30.5,y:81.2},4).to({rotation:-7.6,x:14.1,y:103.4},6).wait(1));

	// waist
	this.instance_8 = new lib.waist();
	this.instance_8.setTransform(47,172.6,1,1,0,0,0,177.2,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(38));

	// shoulder left
	this.instance_9 = new lib.shoulder();
	this.instance_9.setTransform(-145.9,-150.8,0.888,0.888,0,-17.5,162.5,73.8,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3).to({regY:95.3,skewX:32,skewY:212,y:-150.9},6).to({regY:95.2,skewX:43.7,skewY:223.7,x:-75.6,y:-179.6},5).to({regX:73.7,skewX:-18.2,skewY:161.8,x:-124.7,y:-155.5},5).to({regY:95.3,skewX:49.5,skewY:229.5,x:-86.2,y:-169.9},4).to({regY:95.2,skewX:-18.2,skewY:161.8,x:-124.7,y:-155.5},4).to({regY:95.3,skewX:49.5,skewY:229.5,x:-86.2,y:-169.9},4).to({regX:73.8,skewX:-22.2,skewY:157.8,x:-106.8,y:-140.6},6).wait(1));

	// shoulder right
	this.instance_10 = new lib.shoulder();
	this.instance_10.setTransform(100.4,-168.7,0.888,0.888,-32.5,0,0,73.9,95.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({regY:95.5,rotation:-66.7,x:100.5,y:-168.6},3).wait(6).to({rotation:20,x:169.1,y:-147},5).to({rotation:-35.2,x:122,y:-168},5).to({rotation:18.8,x:159,y:-139.6},4).to({rotation:-35.2,x:122,y:-168},4).to({rotation:18.8,x:159,y:-139.6},4).to({regX:73.8,regY:95.4,rotation:21.5,x:145.4,y:-115.6},6).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-357.7,-542.9,725.6,819.3);


//require.include("weblib/external/createjs.min.js");
//require.include("weblib/external/movieclip.min.js");
//require.include("weblib/sound/SoundPackage.js");
//require.include("../audio/obfuscoAudio.js");
//require.include("office.js");
var canvas, stage, exportRoot;
var soundManager;
var buttonDown, buttonUp;

var audioChoices = [
	{
		"frame": "Obfusco10_OscarKite.wav",
		"audioClip": "Obfusco10_OscarKite"
	},
	{
		"frame": "Obfusco11_HamSandwiches.wav",
		"audioClip": "Obfusco11_HamSandwiches"
	},
	{
		"frame": "Obfusco12_ObfuscoSombrero.wav",
		"audioClip": "Obfusco12_ObfuscoSombrero"
	},
	{
		"frame": "Obfusco1_TwoButterfleis.wav",
		"audioClip": "Obfusco1_TwoButterfleis"
	},
	{
		"frame": "Obfusco2_SmoothKetchup.wav",
		"audioClip": "Obfusco2_SmoothKetchup"
	},
	{
		"frame": "Obfusco3_TruerWords.wav",
		"audioClip": "Obfusco3_TruerWords"
	},
	{
		"frame": "Obfusco4_BeautifulToothbrushes.wav",
		"audioClip": "Obfusco4_BeautifulToothbrushes"
	},
	{
		"frame": "Obfusco5_FrecklesPillow.wav",
		"audioClip": "Obfusco5_FrecklesPillow"
	},
	{
		"frame": "Obfusco6_CandleMoon.wav",
		"audioClip": "Obfusco6_CandleMoon"
	},
	{
		"frame": "Obfusco7_FlamingoFriends.wav",
		"audioClip": "Obfusco7_FlamingoFriends"
	},
	{
		"frame": "Obfusco8_ApplePicking.wav",
		"audioClip": "Obfusco8_ApplePicking"
	},
	{
		"frame": "Obfusco9_BeautifulBanana.wav",
		"audioClip": "Obfusco9_BeautifulBanana"
	}
]
var images = images||{};
var img = images;
var pulseSin;
function init() {
	canvas = document.getElementById("canvas");
	
	pulseSin = 0;

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("progress", progress);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(lib.properties.manifest);
}

function progress(evt) {
	$("#loadingPercent").text(Math.round(evt.progress * 100) + "%");
}

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
	$("#loadingPercent").hide();
	exportRoot = new lib.office();

	stage = new createjs.Stage(canvas);
	var ctx =stage.canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	stage.enableMouseOver( 10 );
	stage.update();
	createjs.Touch.enable(stage);

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", pulseAlpha);

 	soundManager = ss.SoundManager;
 	soundManager.addEventListener(ss.SoundManager.LOADED, startUp);

	soundManager.loadSoundSprite(audioSprite);
}


function pulseAlpha(evt) {
	if(typeof(buttonContainer) === 'undefined') {
		return;
	}

	pulseSin += (evt.delta* 0.0075) % (Math.PI * 2);

	if(!exportRoot.paused){
		buttonContainer.alpha = 1;
		buttonContainer.scaleX = 1;
		buttonContainer.scaleY = 1;
	} else {
		buttonContainer.alpha = ((Math.sin(pulseSin) + 1) / 16) + 0.875;
		buttonContainer.scaleX = 1 - ((Math.sin(pulseSin) + 1) / 32);
		buttonContainer.scaleY = 1 - ((Math.sin(pulseSin) + 1) / 32);
	}

}


function buttonUp(evt) {
	buttonUp.visible = true;
	buttonDown.visible = false;
}

function startUp() {

	$('#loading').hide();
	$("#canvas").css("visibility", "visible");
	stage.addChild(exportRoot);
	exportRoot.gotoAndStop(audioChoices[1].frame);
	//ss.SoundManager.playSound("Obfusco1_TwoButterfleis");

	buttonDown = new createjs.Bitmap("images/Button_Down.png");
	buttonUp = new createjs.Bitmap("images/Button_Up.png");

	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 128, 93);
	buttonUp.hitArea = hit;

	var hit2 = new createjs.Shape();
	hit2.graphics.beginFill("#000").drawRect(0, 0, 128, 83);
	buttonDown.hitArea = hit2;

	buttonContainer = new createjs.Container();

	buttonDown.x = 890;
	buttonDown.y = 733;
	buttonDown.scaleX = 1.5;
	buttonDown.scaleY = 1.5;
	buttonDown.addEventListener("mouseover", function(evt) {
		evt.target.cursor = 'pointer';
	});

	buttonUp.x = 890;
	buttonUp.y = 717;
	buttonUp.scaleX = 1.5;
	buttonUp.scaleY = 1.5;
	buttonUp.addEventListener("mouseover", function(evt) {
		evt.target.cursor = 'pointer';
	});
	buttonDown.visible = false;

	buttonContainer.regX = 990;
	buttonContainer.regY = 760;
	buttonContainer.x = 990;
	buttonContainer.y = 750;


	buttonContainer.addChild(buttonUp);
	buttonContainer.addChild(buttonDown);

	stage.addChild(buttonContainer);

	buttonUp.addEventListener("click", playRandom);
	buttonDown.addEventListener("click", playRandom);

	buttonUp.addEventListener("mousedown", function() {	buttonUp.visible = false;
	buttonDown.visible = true;});

	buttonUp.addEventListener("pressup", function() {	buttonUp.visible = true;
	buttonDown.visible = false;
	playRandom();
	
	
	});
}




function playRandom() {

	if(exportRoot.paused){

		var choice = Math.floor(Math.random() * audioChoices.length);

		setTimeout(function() {exportRoot.gotoAndPlay(audioChoices[choice].frame);}, 0);
		soundManager.stopAllSounds();
		soundManager.playSound(audioChoices[choice].audioClip);
	}

}

$('document').ready(function() {init();});

