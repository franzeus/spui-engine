/*
    ------------------------------------------------------
    GameEngine Object

    Todo:
        * StateManager for graphics
        * Strategy pattern also for graphic.update method
        * Collision detection
*/
var GameEngine = {

    canvas : null,
    ctx : null,

    transX : 0,
    transY : 0,
    scale : 1,

    ENV : {
        speed : 0.2,
        maxSpeed: 2,
        gravity : 0
    },

    objectToFollow : null,

    objectManager : null,
    debug : true,

    init : function(canvasId, isDebug) {

        this.debug = isDebug || false;

        this.canvas = document.getElementById(canvasId);
        this.ctx    = this.canvas.getContext('2d');

        World.init(canvasId, this.ctx);

        this.objectManager = ObjectManager;
        this.objectManager.init(this);
        this.objectManager.debug = this.debug;

        this.transX = (World.centerX - (World.centerX * this.scale));
        this.transY = (World.centerY - (World.centerY * this.scale));

        this.maxFollowY = 0;

        return this;
    },

    start : function() {
        this.draw();
    },

    stop : function() {  
        cancelAnimationFrame();
    },

    reset : function() {
        //
    },

    lose : function() {
        this.canvasToBW();
    },

    draw : function() {

        var ctx = GameEngine.ctx;

        ctx.clearRect(0, 0, World.width, World.height);

        ctx.save();
        
        ctx.translate(GameEngine.transX, GameEngine.transY);

        ctx.scale(GameEngine.scale, GameEngine.scale);

        GameEngine.objectManager.draw();

        if (GameEngine.debug) {
            World.draw();
        }

        if (GameEngine.objectToFollow) {
            GameEngine.translateToFollowObject.call(GameEngine);
        }

        ctx.restore();
        
        requestAnimationFrame(GameEngine.draw);
    },

    followObject : function(object) {

        this.objectToFollow = object;

        if (!object) {
            this.transX = (World.centerX - (World.centerX * this.scale));
            this.transY = (World.centerY - (World.centerY * this.scale));
        }
    },

    translateToFollowObject : function() {

        if (this.objectToFollow) {

            var object = this.objectToFollow;

            this.transX = (object.x + object.width / 2) * -this.scale + object.initX;
            this.transY = ((object.y + object.height / 2) * -this.scale) + World.centerY;

            if (this.transY <= this.maxFollowY * this.scale)
                this.transY = this.maxFollowY * this.scale;
            
        } else {
            console.warn('There is no object to follow!');
        }
    },

    canvasToBW : function() {

        try {
            var imgd = this.ctx.getImageData(0, 0, World.width, World.height);

            var pix = imgd.data;
            
            for (var i = 0, n = pix.length; i < n; i += 4) {
              var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
              pix[i  ] = grayscale;   // r
              pix[i+1] = grayscale;   // g
              pix[i+2] = grayscale;   // b
              // alpha
            }
            
            // Draw Background Rect
            this.ctx.fillStyle = 'rgb(0,0,0)';
            this.ctx.fillRect(0, 0, World.width, World.height);
        
        
            this.ctx.putImageData(imgd, 0, 0);
            this.ctx.drawImage(this.canvas, 0, 0);
        } catch(e) {
            console.warn(e.name + ': canvasToBW must be executed on a host (e.g. localhost) to work');
        }
    }

};