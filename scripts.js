window.onload = init();

function init() {
    const soundAlert = new Audio();

    const alertCheckbox = document.querySelector('#alert-input');

    let timerStart = 0;
    let timerDiff = 0;
    let timerMax = 0;


    function startTimer() {
        // timer not running, start a new interval
        if (!intervalHandle) {
            // if timerStart already has a value, we are resuming a paused timer
            // and need to account for the time that has already elapsed
            timerStart = timerStart ? Date.now() - timerDiff : Date.now();

            intervalHandle = setInterval(function() {
                timerDiff = Date.now() - timerStart;

                // if max is not set, run indefinitely
                // or keep updating if current timer is less than max
                if (!timerMax || (timerMax && timerDiff < timerMax)) {
                    timerDisplay.textContent = getTimerString(timerDiff);
                }
                else {
                    timerDisplay.textContent = 'Time\'s up!';
                    pauseTimer();
                    if (alertCheckbox.checked) {
                        soundAlert.play();
                    }
                }
            }, 10);
        }
    }
    
    function pauseTimer() {
        if (intervalHandle) {
            clearInterval(intervalHandle);
            intervalHandle = null;
        }
    }
    
    function resetTimer() {
        pauseTimer(intervalHandle);
        timerStart = 0;
        timerDisplay.textContent = '00:00.00';
    }

    function getTimerString(mili) {
        let minutes = Math.floor(mili / 60000);
        let seconds = Math.floor(mili / 1000) % 60;
        let miliseconds = Math.floor((mili % 1000) / 10);

        minutes = (minutes < 10) ? '0' + String(minutes) : String(minutes);
        seconds = (seconds < 10) ? '0' + String(seconds) : String(seconds);
        miliseconds = (miliseconds < 10) ? '0' + String(miliseconds) : String(miliseconds);

        return minutes + ':' + seconds + '.' + miliseconds;
    }
    
    let intervalHandle;
    const timerDisplay = document.querySelector('#timer-display');
    const startButton = document.querySelector('#start-button');
    const pauseButton = document.querySelector('#pause-button');
    const resetButton = document.querySelector('#reset-button');
    const timerMaxInput = document.querySelector('#timer-max');
    const addPlayerButton = document.querySelector('#add-player');
    const colorMenu = document.querySelector('#select-color');
    const playersMenu = document.querySelector('#players');
    let colorOptions;

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    timerMaxInput.addEventListener('input', function() {
        timerMax = isNaN(timerMaxInput.valueAsNumber) ? 0 : timerMaxInput.valueAsNumber * 1000;
    });

    let colors = ['#ff0000','#ff4000','#ff8000','#ffbf00','#ffff00','#bfff00','#80ff00','#40ff00','#00ff00','#00ff40','#00ff80','#00ffbf','#00ffff','#00bfff','#0080ff','#0040ff','#0000ff','#4000ff','#8000ff','#bf00ff','#ff00ff','#ff00bf','#ff0080','#ff0040','#ff0000'];
    let players = [];

    function selectColor() {
        colorMenu.style.display = 'none';
        while (colorMenu.firstChild) {
            colorMenu.firstChild.remove();
        }
    }

    addPlayerButton.addEventListener('click', function() {
        for (let i = 0; i < colors.length; ++i) {
            let node = document.createElement('div');
            let textnode = document.createTextNode(colors[i]);
            node.appendChild(textnode);
            node.classList.add('color-option');
            node.style.backgroundColor = colors[i];
            colorMenu.appendChild(node);
        }

        colorMenu.style.display = 'flex';

        colorOptions = document.querySelectorAll('.color-option');
        for (let i = 0; i < colorOptions.length; ++i) {
            colorOptions[i].addEventListener('click', function(event) {
                colorMenu.style.display = 'none';
                while (colorMenu.firstChild) {
                    colorMenu.firstChild.remove();
                }

                // remove selection from available colors
                let selection = event.target.style.backgroundColor;
                let pos = colors.indexOf(selection);
                colors.splice(pos, 1);

                // add selection to players array and display
                players.push(selection);

                let node = document.createElement('div');
                node.classList.add('player');
                node.style.backgroundColor = selection;
                playersMenu.appendChild(node);
                playersMenu.style.display = 'flex';

                document.querySelector('#players').lastChild.addEventListener('click', function(e) {
                    selection = e.target.style.backgroundColor;
                    pos = players.indexOf(selection);
                    players.splice(pos, 1);
                    colors.push(selection);
                    e.target.remove();

                    if (!players.length) {
                        playersMenu.style.display = 'none';
                    }
                })
            });
        }
    });

    let currentPlayer = -1;

    document.querySelector('#main').addEventListener('click', function(e) {
        if (players.length) {
            currentPlayer = (currentPlayer + 1) % players.length;
            e.target.style.backgroundColor = players[currentPlayer];
        }
        resetTimer();
        startTimer();
    });

    const alertOption = document.querySelector('#alert');
    alertOption.addEventListener('click', function() {
        if (!soundAlert.src) {
            soundAlert.play();
            soundAlert.src = 'sounds/ding.mp3';
        }
    })
}