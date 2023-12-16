import { questions } from './modules/questions.js';
import { startTimer, minusTime } from './modules/timer.js';

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

const endGame = () => {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('end.html');
}

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    startTimer(timerText, endGame);
};

const getNewQuestions = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
       endGame(); 
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        const correctAnswer = selectedAnswer == currentQuestion.answer;
        let classToApply = correctAnswer ? 'correct' : 'incorrect'

        if(correctAnswer) {
            incrementScore(SCORE_POINTS)
        } else {
            minusTime(timerText);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)

    })
})

const incrementScore = num => {
    score += num
    scoreText.innerText = score
    console.log(score)
}

startGame()