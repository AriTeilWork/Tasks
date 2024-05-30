import random
import tkinter as tk
from tkinter import messagebox
import time

# Global variables
root = tk.Tk()
root.title("Memory Game")
cards = []
current_selection = []
matched_pairs = 0
moves = 0
total_pairs = 6  # Adjust this for different difficulty levels
click_enabled = True

# Timer variables
start_time = None
time_label = tk.Label(root, text="Time: 0")
time_label.pack()

# Score variables
score = 0
score_label = tk.Label(root, text="Score: 0")
score_label.pack()

# Create symbols and shuffle them
symbols = ["A", "B", "C", "D", "E", "F"]
symbols *= total_pairs
random.shuffle(symbols)

# Sound effects (you need to have sound files)
# You can use a library like pygame for sound effects
# import pygame
# pygame.init()
# match_sound = pygame.mixer.Sound("match.wav")
# mismatch_sound = pygame.mixer.Sound("mismatch.wav")

# Functions
def update_time():
    global start_time
    if start_time is not None:
        elapsed_time = int(time.time() - start_time)
        time_label.config(text=f"Time: {elapsed_time}")
    root.after(1000, update_time)

def calculate_score():
    return total_pairs * 1000 - moves

def matched():
    global matched_pairs, click_enabled
    matched_pairs += 1
    # match_sound.play()  # Play a sound effect for matching cards
    if matched_pairs == total_pairs:
        end_game()
    click_enabled = True

def hide():
    global click_enabled
    i1, j1 = current_selection[0]
    i2, j2 = current_selection[1]
    cards[i1][j1]["button"].config(text=" ")
    cards[i2][j2]["button"].config(text=" ")
    cards[i1][j1]["revealed"] = False
    cards[i2][j2]["revealed"] = False
    click_enabled = True
    # mismatch_sound.play()  # Play a sound effect for mismatched cards

def end_game():
    time_label.config(text="Time: 0")
    click_enabled = False
    score = calculate_score()
    score_label.config(text=f"Score: {score}")
    messagebox.showinfo("Memory Game", f"Congratulations!\nYour score: {score}")
    reset_game()

def reset_game():
    global cards, current_selection, matched_pairs, moves, symbols, start_time, click_enabled, score, total_pairs
    cards = []
    current_selection = []
    matched_pairs = 0
    moves = 0
    total_pairs += 2  # Increase the difficulty by adding more pairs
    symbols = ["A", "B", "C", "D", "E", "F"] * total_pairs
    random.shuffle(symbols)
    click_enabled = True
    start_time = None
    score = 0
    score_label.config(text="Score: 0")
    update_time()
    for i in range(4):
        row = []
        for j in range(3):
            card = create_card(i, j)
            row.append(card)
        cards.append(row)

def create_card(i, j):
    symbol = symbols.pop()
    card = tk.Button(root, text=" ", width=5, height=2, command=lambda i=i, j=j: reveal_card(i, j, symbol))
    card.grid(row=i, column=j)
    return {"button": card, "symbol": symbol, "revealed": False}

def reveal_card(i, j, symbol):
    global click_enabled, moves
    if click_enabled:
        cards[i][j]["button"].config(text=symbol)
        cards[i][j]["revealed"] = True
        current_selection.append((i, j))
        if len(current_selection) == 2:
            moves += 1
            score_label.config(text=f"Score: {calculate_score()}")
            if cards[current_selection[0][0]][current_selection[0][1]]["symbol"] == cards[current_selection[1][0]][current_selection[1][1]]["symbol"]:
                matched()
            else:
                root.after(1000, hide)
            current_selection.clear()

reset_button = tk.Button(root, text="Restart Game", command=reset_game)
reset_button.pack()

update_time()

root.mainloop()
