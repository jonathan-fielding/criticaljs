'use strict';

(function () {
	'use strict';

	var criticaljs = {};
	var thisScript = document.querySelector('script[data-deferredjs]');
	var mainScript = thisScript.getAttribute('data-deferredjs');

	criticaljs.deferred = function (el, event, removeTempEvent) {
		var removeDeferred = removeTempEvent || true;
		var triggeredEvents = el.getAttribute('data-triggered-events');
		var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(' ') : [];

		//Return all triggered events if no event is specified
		if (typeof event === 'undefined') {
			return triggeredEventsArray;
		}

		if (triggeredEventsArray.indexOf(event) !== -1) {

			if (removeDeferred) {
				triggeredEventsArray.splice(triggeredEventsArray.indexOf(event), 1);
				el.setAttribute('data-triggered-events', triggeredEventsArray.join(' '));
			}

			return true;
		}

		return false;
	};

	//When the dom has loaded it can start attaching event listeners
	function init() {
		preregisterBehaviours();
		deferLoadingMainJS();
	}

	//The critical JS will load the main JavaScript after the browsers onload event is run
	function appendMainJS() {
		var element = document.createElement('script');
		element.id = 'deferredjs';
		element.src = mainScript;
		document.body.appendChild(element);
	}

	function deferLoadingMainJS() {
		if (document.readyState !== 'complete') {
			window.addEventListener('load', appendMainJS, false);
		} else {
			appendMainJS();
		}
	}

	function preregisterBehaviours() {
		var behaviourElements = document.querySelectorAll('[data-deferred]');

		for (var i = 0; i < behaviourElements.length; i++) {
			var el = behaviourElements[i];
			var eventsToDefer = el.getAttribute('data-deferred');

			if (eventsToDefer.length) {
				eventsToDefer = eventsToDefer.split(' ');

				for (var j = 0; j < eventsToDefer.length; j++) {
					deferEvent(el, eventsToDefer[j]);
				}
			}
		}
	}

	function deferEvent(el, event) {
		el.addEventListener(event, partialRight(handleDeferred, [event]));
	}

	function partialRight(method, args) {
		return function () {
			method.apply(this, args);
		};
	}

	function handleDeferred(type) {
		var el = this;

		var triggeredEvents = el.getAttribute('data-triggered-events');
		var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(' ') : [];

		if (triggeredEventsArray.indexOf(type) === -1) {
			triggeredEventsArray.push(type);
		}

		el.setAttribute('data-triggered-events', triggeredEventsArray.join(' '));

		if (el.getAttribute('data-prevent-default') === 'true') {
			event.preventDefault();
		}
	}

	document.addEventListener('DOMContentLoaded', init);

	window.criticaljs = criticaljs;
})();