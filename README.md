# CriticalJS 
[![Build Status](https://travis-ci.org/jonathan-fielding/criticaljs.svg)](https://travis-ci.org/jonathan-fielding/criticaljs)

CriticalJS is a JavaScript library which enables you to improve the perceived performance of your site. 
It does this by deferring the loading of your main JavaScript and catching any user interactions so that
they can be later handled by the main JavaScript once it loads.

## Getting setup

The simplest way to use CriticalJS is to include the critical.js file in your page and then specify a data 
attribute with the location of the main JavaScript that is to be defered.

```
<script src="criticaljs.min.js" data-deferredjs="main.js"></script>
```

## Browser Support

We are currently targetting supporting Firefox, Android Browser, Chrome, Safari, Opera and Internet Explorer 9+.

## Contributing

We have put together a useful guide on how you can contribute to CriticalJS in the CONTRIBUTE.md file 
in this repo.