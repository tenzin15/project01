/**
 *
 * @project        Motion Detection in JS
 * @file           ImageCompare.js
 * @description    Core functionality.
 * @author         Benjamin Horn
 * @package        MotionDetector
 * @version        -
 *
 */

;(function(App) {

	"use strict";

	/*
	 * The core motion detector. Does all the work.
	 *
	 * @return <Object> The initalized object.
	 *
	 */
	App.Core = function() {

		var rendering = false;

		var width = 64;
		var height = 48;

		var webCam = null;
		var imageCompare = null;

		var currentImage = null;
		var oldImage = null;

		var topLeft = [Infinity,Infinity];
		var bottomRight = [0,0];

		var raf = (function(){
			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000/60);
			};
		})();

		/*
		 * Initializes the object.
		 *
		 * @return void.
		 *
		 */
		function initialize() {
			imageCompare = new App.ImageCompare();
			webCam = new App.WebCamCapture(document.getElementById('webCamWindow'));

			rendering = true;

			main();
		}

		/*
		 * Compares to images and updates the position
		 * of the motion div.
		 *
		 * @return void.
		 *
		 */
		function render() {
			oldImage = currentImage;
			currentImage = webCam.captureImage(false);

			if(!oldImage || !currentImage) {
				return;
			}

			var vals = imageCompare.compare(currentImage, oldImage, width, height);

			topLeft[0] = vals.topLeft[0] * 10;
			topLeft[1] = vals.topLeft[1] * 10;

			bottomRight[0] = vals.bottomRight[0] * 10;
			bottomRight[1] = vals.bottomRight[1] * 10;

			document.getElementById('movement').style.top = topLeft[1] + 'px';
			document.getElementById('movement').style.left = topLeft[0] + 'px';

			document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
			document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';

      if (document.getElementById('movement').style.width.length > 0 || document.getElementById('movement').style.height.length > 0)
            document.getElementById('bottom').innerHTML = `<h1>Motion Detected</h1>`;
      else
          document.getElementById('bottom').innerHTML = `<h1>No Motion Detected</h1>`;


			topLeft = [Infinity,Infinity];
			bottomRight = [0,0]

		}

		/*
		 * The main rendering loop.
		 *
		 * @return void.
		 *
		 */
		function main() {
			try{
				render();if (document.getElementById('movement').style.width.length > 0 || document.getElementById('movement').style.height.length > 0)
          {
            document.getElementById('bottom').innerHTML = `<h1>Motion Detected</h1>`;
            document.getElementById('bottom').innerHTML += '<h1>X:'+ document.getElementById('movement').getBoundingClientRect().top+'</h1>';
            document.getElementById('bottom').innerHTML += '<h1>Y:'+ document.getElementById('movement').getBoundingClientRect().bottom+'</h1>';
            document.getElementById('bottom').innerHTML += '<h1>Width:'+ document.getElementById('movement').clientWidth+'</h1>';
            document.getElementById('bottom').innerHTML += '<h1>Height:'+ document.getElementById('movement').clientHeight+'</h1>';
          }
        else
          document.getElementById('bottom').innerHTML = `<h1>No Motion Detected</h1>`;
      } catch(e) {
				console.log(e);
				return;
			}

			if(rendering == true) {
				raf(main.bind(this));
			}
		}

		initialize();
	};
})(MotionDetector);
