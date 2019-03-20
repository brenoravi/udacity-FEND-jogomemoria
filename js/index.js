// Inicia as variáveis utilizadas no processo
let
	opened = [],
	match = 0,
	Clicks = 0,
	$Playground = $('.Playground'),
	$scorePanel = $('#score-panel'),
	$moveNum = $('.Clicks'),
	$ratingStars = $('.fa-angellist'),
	$PlayAgain = $('.PlayAgain'),
	delay = 400,
	currentseconds,
	second = 0,
	$seconds = $('.seconds'),
	totalbox = symbols.length / 2,
	rank3stars = 10,
	rank2stars = 16,
	rank1stars = 20,
	symbols = ['code', 'code', 'bug', 'bug', 'user-secret', 'user-secret', 'terminal', 'terminal', 'globe', 'globe', 'laptop', 'laptop', 'server', 'server', 'power-off', 'power-off']

// Reinicia o jogo
	$PlayAgain.bind('click', function () {
		swal({
			allowEscapeKey: false,
			allowOutsideClick: false,
			title: 'Gostaria de reiniciar o jogo ?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#02ccba',
			cancelButtonColor: '#f95c3c',
			confirmButtonText: 'Reiniciar',
		}).then(function (isConfirm) {
			if (isConfirm) {
				initGame();
			}
		})
	});

	var addboxListener = function () {

		$Playground.find('.box').bind('click', function () {
			var $this = $(this)
			if ($this.hasClass('show') || $this.hasClass('match')) { return true; }
			var box = $this.context.innerHTML;
			$this.addClass('open show');
			opened.push(box);


			if (opened.length > 1) {
				if (box === opened[0]) {
					$Playground.find('.open').addClass('match animated infinite rubberBand');
					setTimeout(function () {
						$Playground.find('.match').removeClass('open show animated infinite rubberBand');
					}, delay);
					match++;
				} else {
					$Playground.find('.open').addClass('notmatch animated infinite wobble');
					setTimeout(function () {
						$Playground.find('.open').removeClass('animated infinite wobble');
					}, delay / 1.1);
					setTimeout(function () {
						$Playground.find('.open').removeClass('open show notmatch animated infinite wobble');
					}, delay);
				}
				opened = [];
				Clicks++;
				setRating(Clicks);
				$moveNum.html(Clicks);
			}

			if (totalbox === match) {
				setRating(Clicks);
				var score = setRating(Clicks).score;
				setTimeout(function () {
					endGame(Clicks, Segundos);
				}, 500);
			}
		});
	};


	function initTime() {
		currentseconds = setInterval(function () {
			$seconds.text(`${segundos}`)
			second = second + 1
		}, 1000);
	}

	function resetseconds(seconds) {
		if (seconds) {
			clearInterval(seconds);
		}
	}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function initGame() {
	var boxes = shuffle(symbols);
	$Playground.empty();
	match = 0;
	Clicks = 0;
	$moveNum.text('0');
	$ratingStars.removeClass('fa-thumbs-down').addClass('fa-star');
	for (var i = 0; i < boxes.length; i++) {
		$Playground.append($('<li class="box"><i class="fa fa-' + boxes[i] + '"></i></li>'))
	}
	addboxListener();

	resetseconds(currentseconds);
	second = 0;
	$seconds.text(`${second}`)
	initTime();
};

// Função que controla o número de estrelas do jogador
function setRating(moves) {
	var rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-angellist').addClass('fa-thumbs-down');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-angellist').addClass('fa-thumbs-down');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-angellist').addClass('fa-thumbs-down');
		rating = 0;
	}
	return { score: rating };
};


function endGame(Clicks, score) {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Parabéns! Você ganhou!',
		text: 'Com ' + Clicks + ' movimentos e ' + score + ' estrelas em ' + second + ' segundos.',
		type: 'Sucesso',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Jogue novamente!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			initGame();
		}
	})
}

initGame();
