console.log('starting new game')

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

    const response = await axios.get('/guess', {params: {word: word}})
    console.log(response);

    // Figure out which message to display depending on the response
    msg = returnMessage(response.data.result);

    // Display the message
    $('#message').text(msg);

}


$('#submit-word').on('submit', checkWord);

