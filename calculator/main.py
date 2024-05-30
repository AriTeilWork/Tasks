import tkinter as tk
import math
import re

def button_click(char):
    current = input_field.get()
    input_field.delete(0, tk.END)
    input_field.insert(0, current + str(char))

def calculate():
    current = input_field.get()
    try:
        current = re.sub(r'sin', 'math.sin', current)
        current = re.sub(r'cos', 'math.cos', current)
        current = re.sub(r'tan', 'math.tan', current)
        current = re.sub(r'sqrt', 'math.sqrt', current)
        current = re.sub(r'ln', 'math.log', current)  # Use math.log for natural logarithm
        current = re.sub(r'cbrt\((\d+)\)', r'math.pow(\1, 1/3)', current)

        result = custom_eval(current)
        input_field.delete(0, tk.END)
        if result == "inf" or result == "-inf":
            input_field.insert(0, "Division by zero")
        else:
            input_field.insert(0, result)
    except Exception as e:
        input_field.delete(0, tk.END)
        input_field.insert(0, "Error: " + str(e))

def custom_eval(expr):
    try:
        safe_dict = {'__builtins__': None, 'math': math}
        return eval(expr, safe_dict)
    except Exception as e:
        input_field.delete(0, tk.END)
        input_field.insert(0, "Error: " + str(e))

def clear():
    input_field.delete(0, tk.END)

app = tk.Tk()
app.title("Calculator")

input_field = tk.Entry(app, width=20, font=('Arial', 20))
input_field.grid(row=0, column=0, columnspan=4)

buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+',
    '(', ')', 'sin', 'cos', 'tan', 'sqrt',
    '^', 'cbrt'
]

row_val = 1
col_val = 0

for button in buttons:
    tk.Button(app, text=button, width=5, height=2, font=('Arial', 20),
              command=lambda b=button: button_click(b) if b != 'C' and b != '=' else calculate() if b == '=' else clear()).grid(row=row_val, column=col_val)
    col_val += 1
    if col_val > 3:
        col_val = 0
        row_val += 1

app.mainloop()
