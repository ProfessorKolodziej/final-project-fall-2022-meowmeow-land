let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");


scrollContainer.addEventListener("wheel", (evt) => {
	evt.preventDefault();
	scrollContainer.scrollLeft += evt.deltaY;
	scrollContainer.style.scrollBehavior = "auto";

});

nextBtn.addEventListener("click", () => {
	scrollContainer.style.scrollBehavior = "smooth";
	scrollContainer.scrollLeft += 900;
});

backBtn.addEventListener("click", () => {
	scrollContainer.style.scrollBehavior = "smooth";
	scrollContainer.scrollLeft -= 900;
});


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
