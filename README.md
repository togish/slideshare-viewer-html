slideshare-viewer-html
======================

Viewer for presentations at SlideShare.net build with pure html and javascript.

## Simple example
In this example a new viewer is build and next i called afterwards.
```js
var slideshow = new SlideShareViewer(
	"http://www.slideshare.net/tor2608/presentation-for-syncronization-test", 	// Url for the slideshow
	document.getElementById("slideshow"), 										
	{
		readyCallback: function(){
			console.log("We got callback!")
		}
	}
);

// Example call to switch to the next slide
// Call next or any of the 
slideshow.next();
```

Example of how to handle style and resize. Feel free to do what ever you like.
```html
<style>
	#slideshow{
		width:200px;
		height:200px;
	}
	#slideshow img{
		max-height: 100%;
		max-width: 100%;
	}
</style>
<div id="slideshow"></div>
```

## Api
```js
// Creating new instance
new SlideShareViewer(slideShareUrl, domElement, options):hash

// Returns the title of the slide show
// getTitle:void

// Returns the number of the current slide
// currentSlide:int

// Goes to the specified slide number, starting from 0.
// jump(slideNumber):void

// Goes to the next slide
// next:void

// Goes to the previous slide
// prev:void

// Goes to the first slide
// first:void

// Goes to the last slide
// last:void
```

## Upcomming features

Optional UI feature, deactivated by default.
- Build-in controls for navigation.
- Loading placeholder

- Research about support embeded YouTube movies
