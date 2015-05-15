# CriticalJS 0.0.3
[![Build Status](https://travis-ci.org/jonathan-fielding/criticaljs.svg)](https://travis-ci.org/jonathan-fielding/criticaljs)

CriticalJS is a JavaScript library which enables you to improve the perceived performance of your site. 
It does this by deferring the loading of your main JavaScript and catching any user interactions so that
they can be later handled by the main JavaScript once it loads.

## Usage

### Getting setup

The simplest way to use CriticalJS is to include the critical.min.js file in your page and then specify a data attribute with the location of the main JavaScript that is to be deferred.

```
<script src="criticaljs.min.js" data-deferredjs="main.js"></script>
```

Having included CriticalJS in the page and set the path to the main JavaScript that is being defered, we now need to setup elements which we intend to defer events for. In order to do this we need to set a data attribute ```data-deferred``` specifying the events to be deffered. This accepts any of the event types you would normally attach using ```addEventListener``` such as ```click``` and ```touchstart```.

```
<button data-deferred=“click touchstart”>
    Click Me
</button>
```

### Triggering deferred events

Once our main JavaScript has loaded, you will need to determine whether a user has interacted with an element so that you are able to handle it.

```
criticaljs.deferred(element, 'click')
```

## Browser Support

We are currently targetting supporting Firefox, Android Browser, Chrome, Safari, Opera and Internet Explorer 9+. Testing is in the early stages and any help would be welcomed.

## Contributing

We have put together a useful guide on how you can contribute to CriticalJS in the CONTRIBUTE.md file 
in this repo.