// Đồng hồ
const deadline = new Date("2024-04-20T11:00:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance <= 0) {
    clearInterval(interval);
    document.getElementById("demNguoc").innerHTML = "Đã đến ngày";
    document.getElementById("days").innerHTML = 0;
    document.getElementById("hours").innerHTML = 0;
    document.getElementById("minutes").innerHTML = 0;
    document.getElementById("seconds").innerHTML = 0;
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
};

const interval = setInterval(updateCountdown, 1000);


/* Hiệu ứng hoa anh đào */

(function ($) {
  "use strict";
  $('.sakura-falling').sakura();
})(jQuery);

"use strict";

var Sakura = function Sakura(selector, options) {
  var _this = this;

  if (typeof selector === 'undefined') {
    throw new Error('No selector present. Define an element.');
  }

  this.el = document.querySelector(selector);

  var defaults = {
    className: 'sakura',
    fallSpeed: 1,
    maxSize: 24,
    minSize: 20,
    delay: 300,
    colors: [{
      gradientColorStart: 'rgba(255, 183, 197, 0.9)',
      gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
      gradientColorDegree: 120

    }]
  };

  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        var origin = originalObj;
        origin[key] = newObj[key];
      }
    });
    return originalObj;
  };

  this.settings = extend(defaults, options);

  this.el.style.overflowX = 'clip';

  function randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  var prefixes = ['webkit', 'moz', 'MS', 'o', ''];

  function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < prefixes.length; p += 1) {
      var animType = type;

      if (!prefixes[p]) {
        animType = type.toLowerCase();
      }

      element.addEventListener(prefixes[p] + animType, callback, false);
    }
  }


  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  this.createPetal = function () {
    if (_this.el.dataset.sakuraAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createPetal);
      }, _this.settings.delay);
    }


    var animationNames = {
      blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
      swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
    };

    var blowAnimation = randomArrayElem(animationNames.blowAnimations);
    var swayAnimation = randomArrayElem(animationNames.swayAnimations);

    var fallTime = (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed;


    var animationsArr = ["fall ".concat(fallTime, "s linear 0s 1"), "".concat(blowAnimation, " ").concat((fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20), "s linear 0s infinite"), "".concat(swayAnimation, " ").concat(randomInt(2, 4), "s linear 0s infinite")];
    var animations = animationsArr.join(', ');

    var petal = document.createElement('div');
    petal.classList.add(_this.settings.className);
    var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
    var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3);

    var color = randomArrayElem(_this.settings.colors);
    petal.style.background = "linear-gradient(".concat(color.gradientColorDegree, "deg, ").concat(color.gradientColorStart, ", ").concat(color.gradientColorEnd, ")");
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = "".concat(randomInt(_this.settings.maxSize, _this.settings.maxSize + Math.floor(Math.random() * 10)), "px ").concat(randomInt(1, Math.floor(width / 4)), "px");
    petal.style.height = "".concat(height, "px");
    petal.style.left = "".concat(Math.random() * document.documentElement.clientWidth - 100, "px");
    petal.style.marginTop = "".concat(-(Math.floor(Math.random() * 20) + 15), "px");
    petal.style.width = "".concat(width, "px");

    PrefixedEvent(petal, 'AnimationEnd', function () {
      if (!elementInViewport(petal)) {
        petal.remove();
      }
    });

    PrefixedEvent(petal, 'AnimationIteration', function () {
      if (!elementInViewport(petal)) {
        petal.remove();
      }
    });

    _this.el.appendChild(petal);
  };

  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

Sakura.prototype.start = function () {
  var animId = this.el.dataset.sakuraAnimId;

  if (!animId) {
    this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
  } else {
    throw new Error('Sakura is already running.');
  }
};

Sakura.prototype.stop = function () {
  var _this2 = this;

  var graceful = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var animId = this.el.dataset.sakuraAnimId;

  if (animId) {
    window.cancelAnimationFrame(animId);
    this.el.setAttribute('data-sakura-anim-id', '');
  }


  if (!graceful) {
    setTimeout(function () {
      var petals = document.getElementsByClassName(_this2.settings.className);

      while (petals.length > 0) {
        petals[0].parentNode.removeChild(petals[0]);
      }
    }, this.settings.delay + 50);
  }
};

// Chuyển giữa thiệp và chữ
document.addEventListener("DOMContentLoaded", function () {
  var wrap = document.querySelector(".wrap");
  var layoutThiepMoi = document.querySelector('.layout-thiep-moi');

  var toggleDisplay = function () {
    if (wrap.style.display === "") {
      wrap.style.display = "none";
      layoutThiepMoi.style.display = "grid";
    }
  };

// Xoá webhost
  var disclaimer = document.querySelector("img[alt='www.000webhost.com']");
  if (disclaimer) {
    disclaimer.remove();
  }


    // Scroll up and down
    let lastScroll = 0;
    let scrollingDown = true;

    window.addEventListener('scroll', function () {
      const currentScroll = window.scrollY;
      scrollingDown = currentScroll > lastScroll;
      lastScroll = currentScroll;

      const windowHeight = window.innerHeight;
      const Video = document.getElementById('Video').offsetTop;
      const grapter = document.getElementById('grapter').offsetTop;
      const end = document.getElementById('end').offsetTop;
      const endVideo = document.getElementById('endVideo');
      const tikVideo = document.getElementById('tikVideo');
      const backgroundMusic = document.getElementById('backgroundMusic');

      if (scrollingDown) {
        if (window.scrollY < (Video + windowHeight / 4)) {
          window.location.hash = '#Video';
          tikVideo.autoplay = true;
          tikVideo.play();
          endVideo.pause();
          backgroundMusic.pause();
          tikVideo.addEventListener('ended', function() {
            window.location.hash = '#grapter';
          });
        } else if (window.scrollY < (grapter + windowHeight / 4)) {
          window.location.hash = '#grapter';

          tikVideo.pause();
          backgroundMusic.play();
          setTimeout(function() {
              document.querySelectorAll('.title img, .title h1, .title h2').forEach(function(el) {
                  el.style.animation = "vanish1 1s ease-in-out forwards";
              });
          }, 1500);
          setTimeout(function () {
            toggleDisplay();
            // Thêm hiệu ứng vào .layout-thiep-moi
            document.querySelectorAll('.layout-thiep-moi').forEach(function (el) {
              el.style.animation = "vanish 3s ease-in-out forwards";
            });
          }, 2500);
          document.getElementById('enableAutoplayButton').style.display = 'none';
          document.getElementById('tikVideo').style.display = 'block';
        } else {
          document.getElementById('tikVideo').style.display = 'block';
          endVideo.autoplay = true;
          endVideo.play();
        }
      } else {
        if (window.scrollY >= (end - windowHeight / 4)) {
          document.getElementById('tikVideo').style.display = 'block';
          endVideo.autoplay = true;
          endVideo.play();
        } else if (window.scrollY >= (grapter - windowHeight / 4)) {
          window.location.hash = '#grapter';
          backgroundMusic.play();
          tikVideo.pause();
          setTimeout(function() {
              document.querySelectorAll('.title img, .title h1, .title h2').forEach(function(el) {
                  el.style.animation = "vanish1 1s ease-in-out forwards";
              });
          }, 1500);
          setTimeout(function () {
            toggleDisplay();
            // Thêm hiệu ứng vào .layout-thiep-moi
            document.querySelectorAll('.layout-thiep-moi').forEach(function (el) {
              el.style.animation = "vanish 3s ease-in-out forwards";
            });
          }, 2500);
          document.getElementById('enableAutoplayButton').style.display = 'none';
          document.getElementById('tikVideo').style.display = 'block';
        } else {
          window.location.hash = '#Video';
          tikVideo.autoplay = true;
          tikVideo.play();
          backgroundMusic.pause();
          endVideo.pause();
          tikVideo.addEventListener('ended', function() {
              window.location.hash = '#grapter';
          });
        }
      }

    });

    tikVideo.addEventListener('ended', function() {
        window.location.hash = '#grapter';
    });
});


function enableAutoplayForSpecificVideo(videoId) {
    var video = document.getElementById(videoId);
    document.getElementById('enableAutoplayButton').style.display = 'none';
    document.getElementById('tikVideo').style.display = 'block';
    setTimeout(function() {
        video.play()
    }, 1500);
}




//document.addEventListener('DOMContentLoaded', () => {
//  // Function to initialize video
//  function initializeVideo(videoElementId, videoSource) {
//    const videoElement = document.getElementById(videoElementId);
//    const defaultOptions = {};
//
//    if (Hls.isSupported()) {
//      const hls = new Hls();
//      hls.loadSource(videoSource);
//      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
//        const availableQualities = hls.levels.map((level) => level.height);
//        defaultOptions.controls = [
//          // List desired controls here
//          'play',
//          'volume',
//          'fullscreen',
//        ];
//        defaultOptions.quality = {
//          default: availableQualities[0],
//          options: availableQualities,
//          forced: true,
//          onchange: (newQuality) => updateQuality(hls, newQuality),
//        }
//        new Plyr(videoElement, defaultOptions);
//      });
//      hls.attachMedia(videoElement);
//    }
//
//    function updateQuality(hlsInstance, newQuality) {
//      hlsInstance.levels.forEach((level, levelIndex) => {
//        if (level.height === newQuality) {
//          hlsInstance.currentLevel = levelIndex;
//        }
//      });
//    }
//  }
//
//  // Initialize both videos with their respective sources
//  initializeVideo('tikVideo', '/video/wedding.m3u8');
//  initializeVideo('endVideo', '/video/videone.m3u8');
//});