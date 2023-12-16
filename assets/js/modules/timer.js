export const GAME_TIME = 60;
export const PENALTY = 10;

let timeRemaining = GAME_TIME;

export const renderTime = (timerText) => {
    timerText.innerText = timeRemaining;
}

export const startTimer = (timerText, endGame) => {
    timeRemaining = GAME_TIME;
    renderTime(timerText);
    setInterval(() => {
        timeRemaining--;
        renderTime(timerText);
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

export const minusTime = (timerText) => {
    timeRemaining -= PENALTY;
    renderTime(timerText);
}