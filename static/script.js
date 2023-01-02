let currentScore = 0;
const wordList = new Set();
let gameInProgress = false;

/* Return a message based on a specific result string*/

function returnMessage(result) {
    msg = ''

    if (result === 'ok') {
        msg = 'Great job - you found a word!';
    } else if (result === 'not-on-board') {
        msg = 'That word is not on the board. Try again.';
    } else if (result === 'not-word') {
        msg = 'Sorry, that is not a word.';
    } else {
        msg = 'Please try again';
    }

    return msg;
}


/* Get user-submitted word and make a request to server with AJAX to 
 * check if it is valid. Then display a message to the user based on 
 * the results. */

async function checkWord(evt) {
    evt.preventDefault();
    let word = $('#guess').val();
    $('#guess').val('');
    let msg = '';

    if (gameInProgress) {
        console.log('checking word');
        const response = await axios.get('/guess', {params: {word: word}})
        console.log(response);

        // Figure out which message to display depending on the response
        msg = returnMessage(response.data.result);

        // If word is valid, update current score and add word to list of
        // words found. If word has already been guessed, update the message 
        // to notify user.
        if (response.data.result === 'ok') {
            if (!wordList.has(word)) {
                currentScore += word.length;
                $('#curr_score').text(currentScore);
                wordList.add(word);
                $('#words').append(`<div>${word}</div>`)
                console.log(wordList);
            } else if (wordList.has(word)) {
                msg = "You've already found that word";
            }
        } 
    } else {
        msg = 'Game is not in progress - begin a game to start the timer'
    }

    // Display the message
    $('#message').text(msg);
}

async function updateStatistics() {
    if (!gameInProgress) {
        console.log('updating statistics');
        // const response = await axios.post()
    }


}

async function beginTimer(evt) {
    // evt.preventDefault();
    gameInProgress = true;
    console.log('beginning timer')
    $('#timer').text(60);
    $timerVal = $('#timer').text();
    console.log($timerVal);

    // Update the timer value every 1 second until it reaches 0
    timer = setInterval(function func() {
        if ($timerVal <= 0) {
            gameInProgress = false;
            
            // return;
        }
        if (gameInProgress) {
            $timerVal -= 1;
            $('#timer').text($timerVal);
        }
    }, 1000);

    if (!gameInProgress) {
        await clearInterval(timer);
        await updateStatistics();
    }
}


$('#submit-word').on('submit', checkWord);
$('#start-new-game').on('click', beginTimer);

        // $timerVal = $('#timer').text()
        // console.log($timerVal);
        // if ( $timerVal === 60) {
        //     console.log('begin timer');
        //     beginTimer();

