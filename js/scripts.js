// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)



document.querySelectorAll('.sound-button').forEach(function (button) {
	button.addEventListener('click', function (event) {
		event.preventDefault();
		var sound = document.getElementById('buttonSound');
		sound.play();
		sound.onended = function () {
			var target = button.getAttribute('data-target');
			window.location.href = target;
		};
	});
});


document.addEventListener('DOMContentLoaded', function () {
	var music = document.getElementById('menubgSound');
	var toggleButton = document.getElementById('music-toggle');

	menubgSound.volume = 0.4;


	toggleButton.addEventListener('click', function () {
		if (music.paused) {
			music.play();
			toggleButton.src = 'images/pause_button.png'; // 暂停音乐时的图片
		} else {
			music.pause();
			toggleButton.src = 'images/play_button.png'; // 播放音乐时的图片
		}
	});
});
