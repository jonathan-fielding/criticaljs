'use strict';

(function () {
  'use strict';

  var imgs = document.querySelectorAll('.gallery img');

  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    var result = deferLib.deferred(img, 'click');

    if (result) {
      clickImg.bind(img);
    }

    img.addEventListener('click', clickImg, false);
  }

  function clickImg(event) {
    this.className = 'active';
  }
})();