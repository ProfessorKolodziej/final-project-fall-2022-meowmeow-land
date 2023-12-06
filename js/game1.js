// 初始化玩家和电脑的选择和结果
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
const clickSound = new Audio('sounds/clicksound.m4a');
let userChoice;
let computerChoice;
let result;

// 初始化血量变量
const maxHealth = 5;
let userHealth = maxHealth;
let computerHealth = maxHealth;

// 动画重置函数
function resetAnimation(element) {
	element.style.animation = 'none';
	setTimeout(() => {
		element.style.animation = '';
	}, 10); // 短暂延迟以重置动画
}

// 设置选择图片并重置动画
function setChoiceImage(choiceElement, imagePath) {
	choiceElement.src = imagePath;
	resetAnimation(choiceElement);
}

// 禁用和启用选择按钮
function disableChoices() {
	possibleChoices.forEach(choice => choice.disabled = true);
}

function enableChoices() {
	possibleChoices.forEach(choice => choice.disabled = false);
}

// 为每个选择按钮添加事件监听器
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
	disableChoices();
	clickSound.play();
	userChoice = e.currentTarget.id;
	setChoiceImage(userChoiceDisplay, 'images/' + userChoice + '_user.png');
	generateComputerChoice();
}));

// 生成电脑的随机选择，并在1秒后显示结果
function generateComputerChoice() {
	const randomNumber = Math.floor(Math.random() * 3) + 1;
	if (randomNumber === 1) {
		computerChoice = 'rock';
	} else if (randomNumber === 2) {
		computerChoice = 'paper';
	} else {
		computerChoice = 'scissors';
	}

	setTimeout(function () {
		setChoiceImage(computerChoiceDisplay, 'images/' + computerChoice + '_computer.png');

		// 接着延迟0.5秒显示结果
		setTimeout(function () {
			getResult();
		}, 500); // 延迟0.5秒显示结果
	}, 1000); // 延迟1秒显示电脑选择
}

// 判断并展示结果
function getResult() {
	if (computerChoice === userChoice) {
		result = 'draw';
	} else if (computerChoice === 'rock' && userChoice === "paper" ||
		computerChoice === 'paper' && userChoice === "scissors" ||
		computerChoice === 'scissors' && userChoice === "rock") {
		result = 'win';
		computerHealth -= 1; // 更新血量
	} else {
		result = 'lose';
		userHealth -= 1; // 更新血量
	}

	setChoiceImage(resultDisplay, `images/${result}.png`);
	updateHealthDisplay(); // 立即更新血量显示
	checkGameOver();
}

// 更新血量显示
function updateHealthDisplay() {
	const userHealthImg = document.getElementById('user-health-img');
	const computerHealthImg = document.getElementById('computer-health-img');

	userHealthImg.src = `images/user_heart${userHealth}.png`;
	computerHealthImg.src = `images/computer_heart${computerHealth}.png`;

	resetAnimation(userHealthImg);
	resetAnimation(computerHealthImg);
}

// 显示游戏结束界面并隐藏游戏元素
function showGameOverScreen(winner) {
	hideGameElements();
	if (winner === "User") {
		document.getElementById('game-win-screen').style.display = 'flex';
	} else {
		document.getElementById('game-lose-screen').style.display = 'flex';
	}
}

// 隐藏游戏元素
function hideGameElements() {
	document.querySelector('.buttons').style.display = 'none';
	document.querySelector('.cat-c').style.display = 'none';
	document.querySelector('.user-c').style.display = 'none';
	document.querySelector('.vs').style.display = 'none';
	document.querySelector('.result-img').style.display = 'none';
	document.querySelector('.backsquarebutton').style.display = 'none';
	document.querySelector('.music-button').style.display = 'none';
}

// 检查游戏是否结束
function checkGameOver() {
	if (userHealth === 0 || computerHealth === 0) {
		const winner = userHealth > computerHealth ? "User" : "Computer";
		showGameOverScreen(winner);
		return; // 防止在游戏结束后重新启用按钮
	}
	enableChoices();
}

// 重启游戏
function restartGame() {
	userHealth = maxHealth;
	computerHealth = maxHealth;
	updateHealthDisplay();
	showGameElements();
	document.getElementById('game-win-screen').style.display = 'none';
	document.getElementById('game-lose-screen').style.display = 'none';
}

// 显示游戏元素
function showGameElements() {
	document.querySelector('.buttons').style.display = 'block';
	document.querySelector('.cat-c').style.display = 'block';
	document.querySelector('.user-c').style.display = 'block';
	document.querySelector('.vs').style.display = 'block';
	document.querySelector('.result-img').style.display = 'block';
	document.querySelector('.backsquarebutton').style.display = 'block';
}

// 为结束游戏界面的按钮绑定事件
document.querySelectorAll('.restart-button').forEach(button => {
	button.addEventListener('click', function () {
		// 跳转到游戏列表页面
		window.location.href = 'gamepage.html';
	});
});

document.querySelectorAll('.finish-button').forEach(button => {
	button.addEventListener('click', function () {
		// 跳转到游戏列表页面
		window.location.href = 'gamelistpage.html';
	});
});

// 音乐控制
document.addEventListener('DOMContentLoaded', function () {
	var music = document.getElementById('gameAbgSound');
	var toggleButton = document.getElementById('music-toggle');

	toggleButton.addEventListener('click', function () {
		if (music.paused) {
			music.play();
			toggleButton.src = 'images/pause_button.png';
		} else {
			music.pause();
			toggleButton.src = 'images/play_button.png';
		}
	});
});
