/* jshint strict: false */
/* exported SlideShareViewer */
/* jshint camelcase: false */
var SlideShareViewer = function (url, element, options) {
	// Sets the initial position and state variables
	var _this = this;
	var current = 0;
	var presentation;
	var callbackName = 'callback_' + Math.random().toString(36).substring(7);

	// Defines a defauld transition
	// var transition = options.transition;
	this.transition = function (a, b) {
		a.style.display = 'none';
		b.style.display = 'block';
	};

	// Jumps to a specific slide.
	this.jumpTo = function (slideNumber) {
		if (presentation === undefined || slideNumber >= presentation.total_slides || slideNumber < 0) return;
		this.transition(element.children[current], element.children[slideNumber]);
		current = slideNumber;
	};

	// Defined the callback function for the json response
	window[callbackName] = function(obj){
		if (obj.error === true) {
			element.innerHTML = '<p>Error loading from SlideShare.net</p>';
			return;
		}
		presentation = obj;
		
		// Build the html for the presentation
		for(var i = 1; i <= presentation.total_slides; i++){
			element.innerHTML = element.innerHTML + '<img style="display:none;" src="' + presentation.slide_image_baseurl + i + presentation.slide_image_baseurl_suffix + '" />';
		}

		_this.jumpTo(current);

		// Triggers ready callback
		if (options.readyCallback !== undefined) {
			options.readyCallback();
		}
	};

	// Starts loading data from SlideShare.net
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.src= 'http://www.slideshare.net/api/oembed/2?url=' + url + '&format=json&callback=window.' + callbackName;
	document.getElementsByTagName('head')[0].appendChild(script);

	// Returns the title of the slide show
	this.getTitle = function(){
		return presentation.title;
	};
	
	// Returns the number of the current slide
	this.currentSlide = function(){
		return current;
	};

	// Goes to the next slide
	this.next = function(){
		this.jumpTo(current+1);
	};
	
	// Goes to the previous slide
	this.prev = function(){
		this.jumpTo(current-1);
	};
	
	// Goes to the first slide
	this.first = function(){
		this.jumpTo(0);
	};

	// Goes to the last slide
	this.last = function(){
		this.jumpTo(presentation.total_slides-1);
	};
};
