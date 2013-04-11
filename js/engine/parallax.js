var ParallaxPlain = function(options) {
	
	Graphic.apply(this, arguments);

	this.type = 'parallax';

	this.speed = 6;

	// Can not collide with objects
	this.isCollidable = false;

	this.src = options.src;
    this.img = new Image();
    this.img.src = this.src;

	this.parallaxCanvas = document.getElementById("parallaxCanvas");
	this.ctx = parallaxCanvas.getContext("2d");		
	this.backgroundPattern = this.ctx.createPattern(this.img,"repeat-x");

    this.entryX = World.width + (this.width - World.width);

    this.sx = 0;
	this.sy = 0;
	this.swidth = this.width;
	this.sheight = this.height;

	this.drawFunction = this.drawAsPattern;
};

ParallaxPlain.prototype = new Graphic();

// Overwrite Graphic.draw
ParallaxPlain.prototype.draw = function(debug) {
	this.drawFunction();
};

ParallaxPlain.prototype.drawAsPattern = function() {
	this.ctx.save();
	this.ctx.translate(this.x, 0);
	this.ctx.rect(0, 0, this.width, this.height);
	this.ctx.fillStyle = this.backgroundPattern;
	this.ctx.fill();
	this.ctx.restore();
};

ParallaxPlain.prototype.drawAsClippedImage = function() {
	this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
};

//
ParallaxPlain.prototype.update = function(i) {

	if (this.drawFunction === this.drawAsClippedImage) {

		this.sx -= 1; // The x coordinate where to start clipping
		this.sy = 0;
		this.swidth = this.width; // The width of the clipped image
		//console.log(this.swidth);
		this.sheight = this.height;

		this.x = 0; // The x coordinate where to place the image on the canvas
		this.y = 0;
		this.width = this.swidth; // The width of the image to use (stretch or reduce the image)
		this.height = this.height;
		
	} else {
		this.x -= this.vx * (GameEngine.ENV.speed * this.speed);
	}
};