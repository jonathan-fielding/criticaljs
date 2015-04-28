(function(){
	'use strict';

    var anchors = document.querySelectorAll('.gallery a');

    for (var i = anchors.length - 1; i >= 0; i--) {
    	let anchor = anchors[i];
    	let result = deferLib.deferred(anchor, 'click');

		console.log(result);

    	anchor.addEventListener('click', clickAnchor, false);
    }

    function clickAnchor(event){
		
	}
}());