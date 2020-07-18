/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/script.js":
/*!********************************!*\
  !*** ./resources/js/script.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable require-jsdoc */
$(function () {
  // Peer object
  var peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3
  });
  var localStream;
  var room;
  peer.on('open', function () {
    $('#my-id').text(peer.id); // Get things started

    step1();
  });
  peer.on('error', function (err) {
    alert(err.message); // Return to step 2 if error occurs

    step2();
  });
  $('#make-call').on('submit', function (e) {
    e.preventDefault(); // Initiate a call!

    var roomName = $('#join-room').val();

    if (!roomName) {
      return;
    }

    room = peer.joinRoom('mesh_video_' + roomName, {
      stream: localStream
    });
    $('#room-id').text(roomName);
    step3(room);
  });
  $('#end-call').on('click', function () {
    room.close();
    step2();
  }); // Retry if getUserMedia fails

  $('#step1-retry').on('click', function () {
    $('#step1-error').hide();
    step1();
  }); // set up audio and video input selectors

  var audioSelect = $('#audioSource');
  var videoSelect = $('#videoSource');
  var selectors = [audioSelect, videoSelect];
  navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
    var values = selectors.map(function (select) {
      return select.val() || '';
    });
    selectors.forEach(function (select) {
      var children = select.children(':first');

      while (children.length) {
        select.remove(children);
      }
    });

    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = $('<option>').val(deviceInfo.deviceId);

      if (deviceInfo.kind === 'audioinput') {
        option.text(deviceInfo.label || 'Microphone ' + (audioSelect.children().length + 1));
        audioSelect.append(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text(deviceInfo.label || 'Camera ' + (videoSelect.children().length + 1));
        videoSelect.append(option);
      }
    }

    selectors.forEach(function (select, selectorIndex) {
      if (Array.prototype.slice.call(select.children()).some(function (n) {
        return n.value === values[selectorIndex];
      })) {
        select.val(values[selectorIndex]);
      }
    });
    videoSelect.on('change', step1);
    audioSelect.on('change', step1);
  });

  function step1() {
    // Get audio/video stream
    var audioSource = $('#audioSource').val();
    var videoSource = $('#videoSource').val();
    var constraints = {
      audio: {
        deviceId: audioSource ? {
          exact: audioSource
        } : undefined
      },
      video: {
        deviceId: videoSource ? {
          exact: videoSource
        } : undefined
      }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      $('#my-video').get(0).srcObject = stream;
      localStream = stream;

      if (room) {
        room.replaceStream(stream);
        return;
      }

      step2();
    })["catch"](function (err) {
      $('#step1-error').show();
      console.error(err);
    });
  }

  function step2() {
    $('#their-videos').empty();
    $('#step1, #step3').hide();
    $('#step2').show();
    $('#join-room').focus();
  }

  function step3(room) {
    // Wait for stream on the call, then set peer video display
    room.on('stream', function (stream) {
      var peerId = stream.peerId;
      var id = 'video_' + peerId + '_' + stream.id.replace('{', '').replace('}', '');
      $('#their-videos').append($('<div class="video_' + peerId + '" id="' + id + '">' + '<label>' + stream.peerId + ':' + stream.id + '</label>' + '<video class="remoteVideos" autoplay playsinline>' + '</div>'));
      var el = $('#' + id).find('video').get(0);
      el.srcObject = stream;
      el.play();
    });
    room.on('removeStream', function (stream) {
      var peerId = stream.peerId;
      $('#video_' + peerId + '_' + stream.id.replace('{', '').replace('}', '')).remove();
    }); // UI stuff

    room.on('close', step2);
    room.on('peerLeave', function (peerId) {
      $('.video_' + peerId).remove();
    });
    $('#step1, #step2').hide();
    $('#step3').show();
  }
});

/***/ }),

/***/ 1:
/*!**************************************!*\
  !*** multi ./resources/js/script.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yoshi/laravue/webSpeechAPI/resources/js/script.js */"./resources/js/script.js");


/***/ })

/******/ });