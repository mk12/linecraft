var stage;
var renderer;
var graphics;

var control = {left: false, right: false, down: false, up: false};

(function () {
	setupPixi();
	addRendererView();
	createSquare();
	registerEvents();
	requestAnimFrame(animate);
})();

// Initializes the stage, renderer, and the graphics objects.
function setupPixi() {
	stage = new PIXI.Stage(0xeeeeee);
	var options = {resolution: backingScale()};
	renderer = PIXI.autoDetectRecommendedRenderer(640, 480, options);
	graphics = new PIXI.Graphics();
}

// Adds the renderer view to the DOM.
function addRendererView() {
	document.getElementById('main').appendChild(renderer.view);
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

// Registers events for handling keyboard input.
function registerEvents() {
	var keymap = {};
	keymap[65] = 'left';
	keymap[68] = 'right';
	keymap[83] = 'down';
	keymap[87] = 'up';
	document.addEventListener('keydown', function(e) {
		if (e.keyCode in keymap) {
			control[keymap[e.keyCode]] = true;
		}
	});
	document.addEventListener('keyup', function(e) {
		if (e.keyCode in keymap) {
			control[keymap[e.keyCode]] = false;
		}
	});
}

// Updates the simulation and renders one frame.
function animate() {
	requestAnimFrame(animate);
	if (control.up) {
		console.log("up");
		graphics.rotation += 0.05;
	} else if (control.down) {
		graphics.rotation -= 0.05;
	}
	var s = 3;//3*Math.sin(graphics.rotation);
	graphics.scale = new PIXI.Point(s, s);
	renderer.render(stage);
}
