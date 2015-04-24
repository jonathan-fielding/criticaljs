(function(){
	var deferLib = {};

	deferLib.init = function() {
		preregisterBehaviours();
		deferLoadingMainJS();
	};

	deferLib.registerBehaviour = function (behaviourName, registerMethod) {
		var behaviourElements = document.querySelectorAll('[data-behaviour="' + behaviourName + '"]');

		for (var i = 0; i < behaviourElements.length; i++) {
			registerMethod.bind(behaviourElements[i])();
		}
	};

	deferLib.registerClick = function(el, callback) {
		var triggeredEvents = el.getAttribute('data-triggered-events');
		var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(" ") : [];

		if (triggeredEventsArray.indexOf('click') !== -1) {
			triggeredEventsArray.splice(triggeredEventsArray.indexOf('click'), 1);
			el.setAttribute('data-triggered-events', triggeredEventsArray.join(" "));
			callback();
		}

		//We remove the event listener as we are about to attach the real one
		el.removeEventListener('click', handleDeferredClick);

		el.addEventListener('click', callback);
	};

	function appendMainJS() {
		//For example we simulate the loading of site before we get our deferred JS
		setTimeout(function(){
			var element = document.createElement('script');
			element.src = 'javascript/main.js';
			document.body.appendChild(element);
		}, 5000);
	}

	function deferLoadingMainJS() {
		window.addEventListener('load', appendMainJS, false);
	}

	function preregisterBehaviours() {
		var behaviourElements = document.querySelectorAll('[data-behaviour]'),
			el = null,
			eventsToDefer = null;

		for (var i = 0; i < behaviourElements.length; i++) {
			el = behaviourElements[i];

			eventsToDefer = el.getAttribute('data-deferred-events');

			if (eventsToDefer.length) {
				eventsToDefer = eventsToDefer.split(' ');

				for (var j = 0; j < eventsToDefer.length; j++) {
					deferEvent(el, eventsToDefer[i]);
				}
			}
		}
	}

	function deferEvent(el, event) {
		switch (event) {
			case 'click':
				el.addEventListener('click', handleDeferredClick);
				break;
			default:
				console.log('unsupported event added');
		}
	}

	function handleDeferredClick() {
		var triggeredEvents = this.getAttribute('data-triggered-events');
		var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(" ") : [];

		if (triggeredEventsArray.indexOf('click') === -1	) {
			triggeredEventsArray.push('click');
		}

		this.setAttribute('data-triggered-events', triggeredEventsArray.join(" "));

		if(this.getAttribute('data-prevent-default') === "true") {
			event.preventDefault();
		}
	}

	window.deferLib = deferLib;
}());