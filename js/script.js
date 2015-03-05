var stage;
var renderer;
var graphics;

(function () {
	setupPixi();
	createSquare();
	beginAnimation();
})();

// Initializes the stage, renderer, and the graphics objects.
function setupPixi() {
	stage = new PIXI.Stage(0xeeeeee);
	var options = {resolution: backingScale()};
	renderer = PIXI.autoDetectRecommendedRenderer(640, 480, options);
	graphics = new PIXI.Graphics();
}

// Adds the renderer view to the DOM and begins rendering.
function beginAnimation() {
	document.getElementById('main').appendChild(renderer.view);
	requestAnimFrame(animate);
}

// Returns the pixel ratio (for Retina devices, this is 2).
function backingScale() {
	if ('devicePixelRatio' in window && window.devicePixelRatio > 1) {
		return window.devicePixelRatio;
	}
	return 1;
}

// Initializes the graphics drawings.
function createSquare() {
	graphics.lineStyle(1, 0x000, 1);
	graphics.drawRect(-20, -20, 40, 40);
	graphics.scale = new PIXI.Point(0.5, 0.5);
	graphics.position = new PIXI.Point(320, 240);
	stage.addChild(graphics);
}

// Updates the simulation and renders one frame.
function animate() {
	requestAnimFrame(animate);
	graphics.rotation += 0.005;
	var s = 3*Math.sin(graphics.rotation);
	graphics.scale = new PIXI.Point(s, s);
	renderer.render(stage);
}
