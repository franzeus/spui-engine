var ParallaxPlain = function(options) {
	
	Graphic.apply(this, arguments);

	this.type = 'parallax';

	this.speed = 6;

	// Can not collide with objects
	this.isCollidable = false;

	this.src = options.src;
    this.img = new Image();
    this.img.src = this.src;

    this.entryX = World.width + (this.width - World.width);

	this.drawFunction = this.drawImage;
};

ParallaxPlain.prototype = new Graphic();

// Overwrite Graphic.draw
ParallaxPlain.prototype.draw = function(debug) {

	if (!this.leftWorldOnLeft()) {
		this.drawFunction();
	}

};

//
ParallaxPlain.prototype.update = function(i) {

	// Out of left side of the world
	if (this.x + this.width < 0) {
		this.x = this.entryX;
	}

	this.x -= this.vx * (GameEngine.ENV.speed * this.speed);
};