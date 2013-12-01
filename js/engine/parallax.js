ParallaxPlain = function(options) {
	
	Graphic.apply(this, arguments);

	this.type = 'parallax';

	this.speed = 6;

	// Can not collide with objects
	this.isCollidable = false;

	this.src = options.src;
    this.img = new Image();
    this.img.src = this.src;

	this.parallaxCanvas = document.getElementById("parallaxCanvas");
	this.ctx = this.parallaxCanvas.getContext("2d");
	this.backgroundPattern = this.ctx.createPattern(this.img,"repeat-x");

    this.entryX = World.width + (this.width - World.width);

    this.sx = 0;
	this.sy = 0;
	this.swidth = this.width;
	this.sheight = this.height;
	console.log(this.width);

	this.drawFunction = this.drawImage;
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
	this.ctx.drawImage(this.img, Math.round(this.sx), this.sy, this.swidth, this.sheight, this.x, this.y, Math.round(this.width), this.height);
};

//
ParallaxPlain.prototype.update = function(i) {

	if (this.drawFunction === this.drawAsClippedImage) {

		if (this.width <= 0) {
			//this.x = this.entryX;
		}

		// The x coordinate where to start clipping
		this.sx += 1; //this.vx * (GameEngine.ENV.speed * this.speed);; 
		this.sy = 0;		

		// The x coordinate where to place the image on the canvas
		this.x = 0;
		this.y = 0;

		// The width of the clipped image		
		this.swidth = this.width; 
		this.sheight = this.height;

		// The width of the image to use (stretch or reduce the image)
		if (this.sx >= 640) {
			this.width -= this.sx;
		} else {
			this.width = 940;
		}
		this.height = this.height;

	} else if (this.drawFunction === this.drawImage) {

		if (this.leftWorldOnLeft()) {
			this.x = this.entryX;
		}

		this.x -= this.vx * (GameEngine.ENV.speed * this.speed);

	} else {
		this.x -= this.vx * (GameEngine.ENV.speed * this.speed);
	}
};