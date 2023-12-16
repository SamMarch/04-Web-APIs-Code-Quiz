const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#timer');
const GAME_TIME = 60;
const PENALTY = 10;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeRemaining = 60;

let questions = [
    {
        question: 'What brackets are used for an array?',
        choice1: '[]',
        choice2: '()',
        choice3: '{}',
        choice4: '<>',
        answer: 1,
    },
    {
        question: 'What does "var" stand for?',
        choice1: 'various',
        choice2: 'variable',
        choice3: 'varied',
        choice4: 'varnish',
        answer: 2,
    },
    {
        question: 'What does "i" stand for in a loop?',
        choice1: 'information',
        choice2: 'index',
        choice3: 'initiative',
        choice4: 'initialise',
        answer: 2,
    },
    {
        question: 'What tag is used to define a standard cell inside a table?',
        choice1: '<button>',
        choice2: '<footer>',
        choice3: '<td>',
        choice4: '<h1> to <h6>',
        answer: 3,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    startTimer();
};

const endGame = () => {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('end.html');
}

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

const minusTime = () => {
    timeRemaining -= PENALTY;
    renderTime();
}

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
            minusTime();
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

const renderTime = () => {
    timerText.innerText = timeRemaining;
}

const startTimer = () => {
    timeRemaining = GAME_TIME;
    renderTime()
    setInterval(() => {
        console.log(timeRemaining)
        timeRemaining--
        renderTime()
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000)
}

startGame()