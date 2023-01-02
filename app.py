from flask import Flask, render_template, request, session, redirect, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pMlFLLDS8KW9fu5JVnNJbMmbw1wgs3L5'

boggle_game = Boggle()


@app.route('/')
def display_board():
    board = boggle_game.make_board()
    session['board'] = board
    high_score = session.get('high_score', 0)
    num_games = session.get('num_games', 0)
    return render_template('home.html', board=board, 
                           high_score=high_score, num_games=num_games)

@app.route('/guess')
def guess_word():
    word = request.args['word']
    board = session['board']
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result': response})

@app.route('/update-statistics', methods=['POST'])
def update_statistics():
    score = request.json['score']
    high_score = session.get('high_score', 0)
    num_games = session.get('num_games', 0)
    session['num_games'] = num_games + 1
    if score > high_score:
        session['high_score'] = score
    return jsonify(brokeRecord=score > high_score)

