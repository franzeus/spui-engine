drawRectangle = function(ctx, x, y, width, height, color, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeRect(x, y, width, height);
}

drawFilledRectangle = function(ctx, x, y, width, height, color) {
	ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

drawFilledCircle = function(ctx, x, y, radius, color) {
	ctx.lineWidth = 0;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	ctx.closePath();
}

drawArc = function(ctx, x, y, radius, startAngle, endAngle, lineWidth, color) {
	
    var counterClockwise = false;

	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	ctx.lineWidth = 15;

	// line color
	ctx.strokeStyle = color;
	ctx.stroke();
}

drawLine = function(ctx, fromX, fromY, toX, toY, color, lineWidth) {
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.stroke();
	ctx.closePath();
}