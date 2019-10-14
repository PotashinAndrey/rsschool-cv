function Sim(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.sim-slider')
	};

	this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
	this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');

	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {
	loop: true,
	arrows: true,
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[this.currentElement].style.zIndex = 100;
	this.sldrElements[prevElement].style.opacity = '0';
	this.sldrElements[prevElement].style.zIndex = 0;
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[this.currentElement].style.zIndex = 100;
	this.sldrElements[prevElement].style.opacity = '0';
	this.sldrElements[prevElement].style.zIndex = 0;
};

Sim.initialize = function(that) {

	that.elemCount = that.sldrElements.length;

	that.currentElement = 0;
	let bgTime = getTime();

	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	if(that.elemCount <= 1) {
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {
		that.sldrElemFirst.style.opacity = '1';
		that.sldrElemFirst.style.zIndex = 100;
	};

	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';
		that.options.auto = true;
	}
	else if(that.options.auto) {
		setAutoScroll();

		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.arrows) {
		that.leftArrow.addEventListener('click', function() {


			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {


			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
};

new Sim();