# analogClock
> a simple analog clock using HTML5 canvas element with JavaScript only

## Demo

on progress

## Features

A simple analog clock, customizable with four different colors if you want. (see "Styling the clock" section)

## Usage

Adding the js clock file is fairly easy. Download first the analogClock.js file, and save it in the same directory as your HTML file, where you want to display the clock.

Then add the next snippet in the `<head>` element:

```html
	<script src="analogClock.js"></script>
	<script>
		// load event
		window.addEventListener('load', function() {
			var ac = new analogClock("clock");
		});
	</script>
```

And somewhere in the body element

```html
<canvas id="clock" width=500 height=500></canvas>
```

That is it !
If you want to style the color of this clock, you can ! Just see the next section "Styling the clock".

#### Styling the clock

First you can define the clock size: its height and width.

```html
<canvas id="clock" width=500 height=500></canvas>
```

Just take an other value then the `500` if the clock is too large.


You can style the analog clock layout coloring, using different options.

```javascript
var ac = new analogClock("clock", {
	background: "#1C1C1C",
	clockNeedles: "#298A08",
	secondNeedle: "#DD0000",
	clockLayout: "#21610B"
});
```
The first parameter, `"clock"` is the name of your HTML5 canvas element. Look to the example above, with the name of clock in the `id` part of the canvas element.
Then you have an option list which you can define to define your own layout.
Please note that the script expects to have the following options, or default values will be used to design the clock.

- background: the background color for the canvas element
- clockNeedles: the color of the hour and minute needle
- secondNeedle: the color of the second needle. It may be same as the clockNeedles, but i recommend to have a different color.
- clockLayout: the color of the layout, the stripes and the text indicating the numbers on the clock.


#### Full example

```html
<!DOCTYPE HTML>
<HTML>
<head>
	<title>Title of current page</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="mystyle.css">
	<script src="analogClock.js"></script>
	<script>
		window.addEventListener('load', function() {
			var ac = new analogClock("clock");
		});
	</script>
</head>
<body>
	<div id="content">
		<canvas id="clock" width=500 height=500></canvas>
	</div>
</body>
</HTML>
```