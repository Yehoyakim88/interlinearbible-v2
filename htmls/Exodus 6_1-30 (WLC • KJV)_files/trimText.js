/**
	* @func TrimText
	* @desc Trims characters of node and adds view toggle link.
	*
	* @params settings {obj} Object of parameters
	* @params settings.baseElement {node} Element to perform script upon.
	* @params settings.showLines {int/str} Max number of lines to display.
	* 
	* @usage new TrimText({ baseElement: myEle, showLines: 10 });
*/
function TrimText( settings ) {
	_this = this;       // scoping reassignment
	
	_this.baseElement  = settings.baseElement;
	_this.toggleWrap   = _this.baseElement.getElementsByClassName('__tt-toggle-wrap')[0];
	_this.linesVisible = parseInt(settings.showLines) || 4;
	_this.toggleLink   = null;
	_this.buffer       = 0;
	_this.maxHeight    = getMaxHeight(_this.baseElement, _this.linesVisible, _this.buffer);
	_this.linkText     = ['+ Show full description', '- Hide description'];


	/**
		* @private
		* @func getMaxHeight
		* @desc gets max height of element using computed line height and desired
		*       number of lines to show
		* @return float - max height for wrapper
	*/
	function getMaxHeight(ele, numLines, buffer) {
		return ((parseFloat(window.getComputedStyle(ele).lineHeight)) * numLines) + buffer;
	}


	/**
		* @public
		* @func setMaxHeight
		* @desc sets max height on element
	*/
	_this.setMaxHeight = function(ele, amount, callback) {
		ele.style.maxHeight = (amount) ? amount + 'px' : '';

		if (callback && typeof callback === 'function') {
			callback();
		}
	};


	/**
		* @public
		* @func createToggleLink
		* @desc creates and appends action link to toggle view of all lines.
	*/
	_this.createToggleLink = function() {
		var toggleLink = document.createElement('a');
		
		toggleLink.classList.add('__tt-toggle-link');
		toggleLink.classList.add('hide-for-medium');
		toggleLink.innerHTML = _this.linkText[0];

		_this.baseElement.appendChild(toggleLink);
		_this.toggleLink = _this.baseElement.getElementsByClassName('__tt-toggle-link')[0];

		_this.toggleLink.addEventListener('click', _this.toggleLines, false);
	};


	/**
		* @public
		* @func toggleLines
		* @desc shows next number of allowed rows, based on _this.linesVisible
	*/
	_this.toggleLines = function() {
		_this.toggleWrap.classList.toggle('is-open');
		_this.toggleLink.innerHTML = (_this.toggleWrap.classList.contains('is-open')) ? _this.linkText[1] : _this.linkText[0];
	};


	/**
		* @public
		* @func isMobileWidth
		* @desc checks if the width of the viewport is smaller than 640 on resize
		* @return bool - true if smaller
	*/
	_this.isMobileWidth = function() {
		return (window.innerWidth <= 640);
	};


	/**
		* @public
		* @func run
		* @desc runs the code for trimming the text
	*/
	this.run = function(isFirstIteration) {
		if(Dom.hasClass('bodTag', 'viewport')) return _this.setMaxHeight(_this.toggleWrap, null);
		_this.setMaxHeight(_this.toggleWrap, _this.maxHeight, function() {
			if (isFirstIteration) {
				_this.createToggleLink();
			}
		});
	};


	// Init
	var isTrimmed   = false, // has script already run
			isFirstLoad = false; // check so button doesn't keep getting added

	window.addEventListener('resize', function() {
		if(Dom.hasClass('bodTag', 'viewport')) return _this.setMaxHeight(_this.toggleWrap, null);

		// If we're smaller than 640 AND
		// the content is not already trimmed
		if (_this.isMobileWidth() && !isTrimmed ) {

			// Pass in flag to run() to only load toggle button once
			if (!isFirstLoad) {
				_this.run(true);
				isFirstLoad = true;
			} else {
				// Otherwise, run() to only set maxHeight
				_this.run();
			}
			isTrimmed = true;
		} else {
			// If we're wider than mobile width, remove the
			// maxHeight inline style
			if (!_this.isMobileWidth()) {
				if (isTrimmed) {
					_this.setMaxHeight(_this.toggleWrap, null);
					isTrimmed = false;
				}
			}
		}
	}, false);

	// Initial call to run, if smaller than 640
	if (_this.isMobileWidth()) {
		_this.run(true);
		isFirstLoad = true;
		isTrimmed   = true;
	}
}