var Preloader = {

    currentLoad : 0,
    totalObjects : 0,

    load : function(objects, callback) {

        var self = this;
        this.totalObjects = 0;

        var loadedImages = [];

        for (var i = 0; i < objects.length; i++) {

            var currentObject = objects[i];

            if (currentObject.img && loadedImages.indexOf(currentObject.img.src) < 0) {

                this.totalObjects++;

                var src = currentObject.img.src;
                var img = new Image();
                img.src = src;

                loadedImages.push(src);
                //console.log(src);

                (function(img) {

                    img.onload = function() {

                        self.imageLoaded(function() {

                                callback();

                        });

                    }

                })(img);

            }
        };

    },

    imageLoaded : function(callback) {

        this.currentLoad++;

        this.updateLoader();

        if (this.currentLoad === this.totalObjects) {
            this.hideLoader();
            callback();
        }

    },

    hideLoader : function() {
        jQuery('.loadingBarWrapper').hide();        
    },

    updateLoader : function() {

        var loader = jQuery('.loadingBar');
        var currentWidth = Math.round(this.currentLoad / this.totalObjects * 100);

        loader.css({ width : currentWidth + '%' });
    }

}