var SlideShareViewer = function(url, element, options){
	// Jumps to a specific slide.
	var jumpTo = function(slideNumber){
		if (presentation == undefined || slideNumber >= presentation.total_slides || slideNumber < 0) return;
		element.children[current].style.display = "none";
		current = slideNumber;
		element.children[current].style.display = "block";
	}

	// Sets the initial position and state variables
	var current = 0;
	var presentation;

	// Defined the callback function for the json response
	var callbackName = "callback_" + Math.random().toString(36).substring(7);
	window[callbackName] = function(obj){
		if (obj.error === true) {
			element.innerHTML = "<p>Error loading from SlideShare.net</p>";
			return;
		}
		presentation = obj;
		
		// Build the html for the presentation
		for(var i = 1; i <= presentation.total_slides; i++){
			element.innerHTML = element.innerHTML + "<img style=\"display:none;\" src=\"" + presentation.slide_image_baseurl + i + presentation.slide_image_baseurl_suffix + "\" />";
		}
		jumpTo(current);

		// Triggers ready callback
		if (options.readyCallback != undefined){
			options.readyCallback();
		}
	}

	// Starts loading data from SlideShare.net
	var script = document.createElement('script');
	script.type= "text/javascript";
	script.src= "http://www.slideshare.net/api/oembed/2?url=" + url + "&format=json&callback=window." + callbackName;
	document.getElementsByTagName('head')[0].appendChild(script);

	// Defined the interface
	return {
		// Returns the title of the slide show
		getTitle: function(){
			return presentation.title;
		},
		// Returns the number of the current slide
		currentSlide: function(){
			return current;
		},

		// Goes to the specified slide number
		jump: jumpTo,
		// Goes to the next slide
		next: function(){
			jumpTo(current+1);
		},
		// Goes to the previous slide
		prev: function(){
			jumpTo(current-1);
		},
		// Goes to the first slide
		first: function(){
			jumpTo(0);
		},
		// Goes to the last slide
		last: function(){
			jumpTo(presentation.total_slides-1);
		}
	};
};
