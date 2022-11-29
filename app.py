from flask import Flask, render_template
from boggle import Boggle

app = Flask(__name__)

boggle_game = Boggle()
board = boggle_game.make_board()

@app.route('/')
def display_board():
    return render_template('home.html', board=board)
