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


/* Creating an array of objects. Each object has a question, four choices, and an answer. */
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

/**
 * The startGame function resets the questionCounter, score, and availableQuestions variables to their
 * initial values, then calls the getNewQuestions and startTimer functions.
 */
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    startTimer();
};

/**
 * If the player's score is greater than the high score, the high score is updated to the player's
 * score and the player is redirected to the end game page.
 * @ returns The return value of the function is the return value of the function call to
 * window.location.assign.
 */
const endGame = () => {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('end.html');
}

/**
 * If there are no more questions available, or if the question counter is greater than the max
 * questions, then end the game. Otherwise, increment the question counter, update the progress text,
 * and update the progress bar. Then, get a random question from the available questions, and set the
 * current question to that question. Then, set the question text to the current question's question
 * text. Then, for each choice, set the choice text to the current question's choice text. Then, remove
 * the current question from the available questions. Finally, set accepting answers to true.
 */
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

/**
 * This function subtracts the penalty from the time remaining and then renders the time.
 */
const minusTime = () => {
    timeRemaining -= PENALTY;
    renderTime();
}

/* This is a forEach loop that is looping through the choices array. It is adding an event listener to
each choice. When the choice is clicked, it checks to see if the user is accepting answers. If the
user is not accepting answers, it returns. If the user is accepting answers, it sets accepting
answers to false. It then sets the selected choice to the event target, and the selected answer to
the selected choice's data number. It then sets the correct answer to the selected answer and the
current question's answer. It then sets the class to apply to the correct answer. If the correct
answer is true, it increments the score. If the correct answer is false, it subtracts time. It then
adds the class to apply to the selected choice's parent element. It then sets a timeout to remove
the class from the selected choice's parent element and get a new question. */
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

/**
 * IncrementScore is a function that takes a number as an argument and adds it to the score variable,
 * then updates the scoreText element with the new score.
 */
const incrementScore = num => {
    score += num
    scoreText.innerText = score
    console.log(score)
}

/**
 * The renderTime function is a constant that takes no parameters and returns the innerText of the
 * timerText variable, which is the timeRemaining variable.
 */
const renderTime = () => {
    timerText.innerText = timeRemaining;
}

/**
 * It starts a timer that counts down from GAME_TIME (which is set to 60) and when it reaches 0, it
 * calls the endGame() function.
 */
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