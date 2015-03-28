/*
* Clock class to show an analogue clock in JavaScript only using HTML5 canvas element.
*
* 						!!! WORK IN PROGRESS !!!
* version 1.0.2
* - improved colors, "look and feel" and smoothness seconde arrow
*/

var analogClock = function(canvasID, options)
{
	var DEFAULTWIDTH = 1;

	// check if the options has options
	var hasOption = function(option, name) {
		return option.hasOwnProperty(name) && option[name] !== "";
	};

	// color values (default)
	var backgroundColor = "#1C1C1C";
	var clockNeedleColor = "#298A08";
	var secondNeedleColor = "#DD0000";
	var layoutColor = "#21610B";

	// check if custom options got used
	if (options !== null && hasOption("background") && hasOption("clockNeedles") && hasOption("secondNeedle") && hasOption("clockLayout")) {
		backgroundColor = options.background;
		clockNeedleColor = options.clockNeedles;
		secondNeedleColor = options.secondNeedle;
		layoutColor = options.clockLayout;
	}

	// private vars
	var _canvas = null;
	var _ctx = null;
	var _clock = null;
	var _center = null;

	var ClockLayout = function(radius) {
		this.RADIUS = radius;
		this.HOUR = radius * 0.7;
		this.MINUTE = radius * 0.85;
		this.SECOND = radius * 0.95;
	};

	/*
	coordinate holder
	*/
	var Coordinate = function(x, y) {
		this.x = x;
		this.y = y;
	};

	var Time = function(hour, minute, second, millisecond) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
		this.ms = millisecond;
	};

	Time.prototype.getCoordinate = function(angleInDegree, typeClock) {
		var a = transformToRadian(angleInDegree);
		var x = _center.x + (Math.sin(a) * typeClock);
		var y = _center.y - (Math.cos(a) * typeClock);
		return new Coordinate(x, y);
	};

	Time.prototype.getHourEndPoint = function() {
		var angleInDegree = (1/2) * (60 * (this.hour % 12) + this.minute);
		return this.getCoordinate(angleInDegree, _clock.HOUR);
	};

	Time.prototype.getMinuteEndPoint = function() {
		var angleInDegree = this.minute * 6;
		return this.getCoordinate(angleInDegree, _clock.MINUTE);
	};

	Time.prototype.getSecondEndPoint = function() {
		var angleInDegree = (this.second * 1000 + this.ms) * (6 / 1000);
		return this.getCoordinate(angleInDegree, _clock.SECOND);
	};

	/*
	* === canvas core drawing functions
	*/
	var drawLine = function(xStart, yStart, xEnd, yEnd, lineWidth, color) {
		_ctx.lineWidth = (lineWidth || DEFAULTWIDTH);
		_ctx.strokeStyle = (color || "#000000");
		_ctx.beginPath();
		_ctx.moveTo(xStart, yStart)
		_ctx.lineTo(xEnd, yEnd);
		_ctx.stroke();
	};

	var getTime = function() {
		var d = new Date();
		return new Time(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
	};

	var clearCanvas = function() {
		_ctx.clearRect(0, 0, _canvas.width, _canvas.height);
	};
	/*
	functions to draw clock
	*/
	var drawClock = function() {
		window.requestAnimationFrame(drawClock);
		// clear clock
		clearCanvas();

		// do pre calculations
		var time = getTime();
		var coH = time.getHourEndPoint();
		var coM = time.getMinuteEndPoint();
		var coS = time.getSecondEndPoint();

		// draw layout
		drawLayout();
		// draw hour line
		drawLine(_center.x, _center.y, coH.x, coH.y, 8, clockNeedleColor);
		// draw minute
		drawLine(_center.x, _center.y, coM.x, coM.y, 4, clockNeedleColor);
		// draw seconde
		drawLine(_center.x, _center.y, coS.x, coS.y, 2, secondNeedleColor);
	};

	var drawLayout = function() {
		// draw center point
		_ctx.lineWidth = 1;
		_ctx.beginPath();
		_ctx.strokeStyle = clockNeedleColor;
		_ctx.fillStyle = clockNeedleColor;
		_ctx.arc(_center.x, _center.y, 7, 0, Math.PI * 2, true);
		_ctx.fill();
		
		// set font and add numbers
		var fs = _clock.RADIUS * 0.1;
		_ctx.font = fs + "px verdana";
		var dist = _clock.RADIUS * 0.8;
		for(var i = 1; i <= 12; ++i) {
			var x = _center.x + Math.sin(transformToRadian(i * 30)) * dist;
			var y = _center.y - Math.cos(transformToRadian(i * 30)) * dist + ((i > 3 && i < 9) ? fs : 0);
			writeText(i, x - fs / 2, y);
		}

		// draw outer circle
		for(var i = 0; i < 360; i += 6) {
			var lineWidth = ((i % 30 == 0) ? 3 : 1);
			var x1 = calcHeight(i, _clock.RADIUS);
			var x2 = calcHeight(i, _clock.RADIUS - 10);
			var y1 = calcWidth(i, _clock.RADIUS);
			var y2 = calcWidth(i, _clock.RADIUS - 10);
			drawLine(x1, y1, x2, y2, lineWidth, layoutColor);
		}

	};

	var writeText = function(message, x, y) {
		_ctx.fillText(message, x, y);
	};

	var transformToRadian = function(angleInDegree) {
		return (angleInDegree / 180) * Math.PI;
	};
	var calcHeight = function(angle, length) {
		var a = transformToRadian(angle);
		return _center.x + (Math.sin(a) * length);
	};
	var calcWidth = function(angle, length) {
		var a = transformToRadian(angle);
		return _center.y - (Math.cos(a) * length);
	}

	// initializing clock
	var initializeClock = function(canvas) {
		// set up private vars and background
		_canvas = canvas;
		var width = (canvas.width <= canvas.height) ? canvas.width : canvas.height;
		_clock = new ClockLayout((width * 0.9) / 2);
		_ctx = _canvas.getContext('2d');
		_center = new Coordinate(width / 2, width / 2);
		_canvas.style.backgroundColor = backgroundColor;

		// start clock
		drawClock();
	};

	// init
	var canvas = document.getElementById(canvasID);
	if (canvas != null)
		initializeClock(canvas);
};