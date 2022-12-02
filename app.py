from flask import Flask, render_template, request, session, redirect, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pMlFLLDS8KW9fu5JVnNJbMmbw1wgs3L5'

boggle_game = Boggle()


@app.route('/')
def display_board():
    board = boggle_game.make_board()
    session['board'] = board
    print(board)
    return render_template('home.html', board=board)

@app.route('/guess')
def guess_word():
    print('hit /guess route')
    word = request.args['word']
    print(word)
    board = session['board']
    response = boggle_game.check_valid_word(board, word)
    print(response)
    return jsonify({'result': response})
