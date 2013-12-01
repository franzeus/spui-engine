/*
    ------------------------------------------------------
    HELPER FUNCTIONS
*/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

// -----------------------------------------
getRandomColor = function() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomArrayItem = function(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

isWithinArea = function(x, y, obj) {

    if( x >= obj.x &&
        x <= obj.x + obj.width &&
        y >= obj.y &&
        y < obj.y + obj.height)
    {
        return true;
    }

    return false;
}

distanceBetweenSelfAndObject = function(self, obj) {

    objCenterX  = obj.x + (obj.width / 2);
    objCenterY  = obj.y + (obj.height / 2);
    selfCenterX = self.x + (self.width / 2);
    selfCenterY = self.y + (self.height / 2);

    var dX = Math.pow((objCenterX - selfCenterX), 2),
        dY = Math.pow((objCenterY - selfCenterY), 2),
        distance = Math.sqrt(dX + dY);

    return distance;
}

getAngleBetweenTwoVectors = function(v1, v2) {

    var angle = 0;

    if(v2) {

        var dot1 = v1.x * v2.x,
            dot2 = v1.y * v2.y,

            norm1 = Math.sqrt( (v1.x * v1.x) + (v1.y * v1.y) ),
            norm2 = Math.sqrt( (v2.x * v2.x) + (v2.y * v2.y) ),

            dots = dot1 + dot2,
            norm = norm1 * norm2;

        angle = Math.acos(dots / norm);

    } else {
        angle = Math.atan2(v1.y, v1.x);
    }

    return angle; // in radian
}

getAngleBetweenTwoVectorsInDegree = function(v1, v2) {

    var angle = radionToDegree(getAngleBetweenTwoVectors(v1, v2));
    return angle;
}

getDistanceToEdge = function(width) {
    var edgeLength = width / 2,
        c = Math.sqrt( Math.pow(edgeLength, 2) + Math.pow(edgeLength, 2));
    return c;
}

degreeToRadian = function(angle) {
    return angle * (Math.PI / 180);
}

radionToDegree = function(angle) {
    return angle * (180 / Math.PI);
}

// --------------------------------------------------
sinMove = function(x, y, radius) {
    return y + Math.sin(0.02 * x) * radius;
}

// Map of keys and char code
KEY = {
    ARROW_UP : 38,
    ARROW_DOWN : 40,
    ARROW_RIGHT : 39,
    ARROW_LEFT : 37,
    SPACEBAR : 32,
    S : 83
};
