function drawRectangle(ctx, x, y, width, height, color, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeRect(x, y, width, height);
}

function drawFilledRectangle(ctx, x, y, width, height, color) {
	ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawFilledCircle(ctx, x, y, radius, color) {
	ctx.lineWidth = 0;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	ctx.closePath();
}

function drawLine(ctx, fromX, fromY, toX, toY, color, lineWidth) {
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.stroke();
	ctx.closePath();
}