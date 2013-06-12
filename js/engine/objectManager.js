/*
    ------------------------------------------------------
    ObjectManager
    holds and manages all objects
*/
var ObjectManager = {

    objects : [],
    allObjectsLoaded : false,
    selectedObject : null,
    objectCounter : 0,
    observeInterval : null,
    gameEngine : null,
    debug : false,

    init : function(gameEngine) {
        this.gameEngine = gameEngine;

        this.canvasOffset = jQuery(this.gameEngine.canvas.id).offset();
        jQuery(this.gameEngine.canvas).on('click', jQuery.proxy(this.handleClickOnObject, this));
    },

    // After all init add objects occured
    preload : function(callback) {

        while (this.allObjectsLoaded) {

            if (object.isLoaded) {
                elementsloaded++;
            }

        }

        return true;

    },

    draw : function () {
        
        this.traverseObjects(function(object) {
        
            object.draw.call(object, this.debug);

            this.updateObject.call(this, object);
        
        });

    },

    updateObject : function (object) {
        
        object.update.call(object);

        // Dont check collision if it can not collide anyways
        if (!object.isCollidable) {
            return false;
        }

        this.traverseObjects(function(object2) {

            if (object === object2 || !object2.isCollidable ) {
                return;
            }

            if(this.collidedWithObject.call(this, object, object2)) {

                object.hasCollidedWith.call(object, object2);

                object2.hasCollidedWith.call(object2, object);

            }

        });
        
    },

    collidedWithObject : function(object1, object2) {
        // TODO: use objects boundingbox
        var collidedLeftTop     = false; //isWithinArea(object2.x, object2.y, object1),
            collidedLeftBottom  = isWithinArea(object2.x, object2.y + object2.height, object1),
            collidedRightTop    = false; //isWithinArea(object2.x + object2.width, object2.y, object1),
            collidedRightBottom = false; //isWithinArea(object2.x + object2.width, object2.y + object2.height, object1);

        return collidedLeftTop || collidedLeftBottom || collidedRightTop || collidedRightBottom;
    },

    handleClickOnObject : function(e) {

        this.mouseX = e.pageX - this.canvasOffset.left;
        this.mouseY = e.pageY - this.canvasOffset.top;

        // Deselect current selected object
        if (this.selectedObject) {
            this.selectedObject.deselect();
        }

        // Check if click was on an object
        this.traverseObjects(function (object) {

            if (isWithinArea(this.mouseX, this.mouseY, object)) {

                this.selected(object);
                
                return;
            }

        });

        // No object selectd
        //this.gameEngine.followObject(null);
        this.clearObserver();
    },

    selected : function(object) {
        
        this.selectedObject = object;
        this.selectedObject.selected();

        if (this.selectedObject.isObservable) {
            this.observeObject(this.selectedObject);
        }
    },

    printInfo : function(object) {
        var info = object.getInfoText();
    },

    traverseObjects : function(callback) {

        var objects = this.objects,
            len = objects.length,
            i = 0
            self = this;

        for (i = 0; i < len; i++) {
            callback.call(self, objects[i]);
        }
    },

    observeObject : function(object) {
        var self = this;

        this.clearObserver();

        this.observeInterval = setInterval(function() {
            self.printInfo(object);
        }, 100);
    },

    clearObserver : function() {
        if(this.observeInterval) {
            clearInterval(this.observeInterval);
            this.observeInterval = null;
        }
    },

    reset : function() {

        this.traverseObjects(function (object) {
            object.reset.apply(object);
        });

    },

    addObject : function(object) {
        this.objects.push(object);
    },

    removeObject : function() {
        return;
    },

    getObjectById : function(id) {
        return this.objects[id];
    }
};