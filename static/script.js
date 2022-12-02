console.log('starting new game')

/* Get user-submitted word and make a request to server with AJAX  */

async function getWord(evt) {
    evt.preventDefault();
    let word = $('#guess').val();
    $('#guess').val('');

    const response = await axios.get('/guess', {params: {word: word}})
    console.log(response);
}

$('#submit-word').on('submit', getWord);

console.log($('#submit-word'))