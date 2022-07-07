const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

/* Disabling the saveScoreBtn until the user types something in the username input. */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

/* Preventing the default action of the event. */
saveHighScore = e => {
    e.preventDefault()

/* Creating an object with the score and name. */
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

/* Sorting the high scores in descending order. */
    highScores.sort((a,b) => {
        return b.score - a.score
    })

/* Removing the last element of the array. */
    highScores.splice(5)

    localStorage.setItem('highScores',  JSON.stringify(highScores))
    window.location.assign('index.html')
}