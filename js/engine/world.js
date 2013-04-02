/*
    ------------------------------------------------------
    World Object
*/
var World = {

    canvas : null,
    ctx : null,

    width : 480,
    height : 320,
    RATIO : null,

    x : 0,
    y : 0,

    borderOffset : 0,

    centerX : 0,
    centerY : 0,

    init : function(canvasId, ctx) {

        this.canvas = document.getElementById(canvasId);
        this.$canvas = jQuery(this.canvas);
        this.ctx = ctx;

        this.width = this.$canvas.width();
        this.height = this.$canvas.height();

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.centerX = (this.width / 2) + this.borderOffset;
        this.centerY = (this.height / 2)  + this.borderOffset;

    },

    draw : function() {
      this.drawBorder();
      this.drawCenter();
    },

    drawBorder : function() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#222';
        this.ctx.stroke();
        this.ctx.strokeRect(this.x + this.borderOffset, this.y + this.borderOffset, this.width - (this.borderOffset * 2), this.height - (this.borderOffset * 2));
    },

    drawCenter : function() {
        var radius = 5,
            x = this.centerX - radius / 2,
            y = this.centerY - radius / 2;

        drawRectangle(this.ctx, x, y, radius, radius, '#FFF', 1);
        //drawFilledCircle(this.ctx, x, y, radius, '#FFF');
    },

    // Returns random point within the world
    getRandomBoardPosition : function() {

        var x = getRandomInt(this.borderOffset + 5, this.width - this.borderOffset - 5),
            y = getRandomInt(this.borderOffset + 5, this.height - this.borderOffset - 5);

        return { x: x , y: y};
    },

    // Returns true if obj is within the game world borders
    positionIsWithinWorld : function(obj) {
        var xPosition = (obj.x > this.borderOffset && obj.x + obj.width < this.width - this.borderOffset),
            yPosition = (obj.y > this.borderOffset && obj.y + obj.height < this.height - this.borderOffset);

        return (xPosition && yPosition);
    },

    resize: function() {

        this.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        this.currentWidth = this.currentHeight * this.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (this.android || this.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        this.canvas.style.width = this.currentWidth + 'px';
        this.canvas.style.height = this.currentHeight + 'px';

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }
};