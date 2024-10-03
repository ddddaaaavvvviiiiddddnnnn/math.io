from flask import Flask, jsonify, render_template, request
import random
import time

app = Flask(__name__)

OPERATORS = ["+", "-", "*"]
MIN_OPERAND = 3
MAX_OPERAND = 12
TOTAL_PROBLEMS = 10

# Route to serve the main page
@app.route('/')
def index():
    return render_template('index.html')

# API to generate a new problem
@app.route('/generate_problem', methods=['GET'])
def generate_problem():
    left = random.randint(MIN_OPERAND, MAX_OPERAND)
    right = random.randint(MIN_OPERAND, MAX_OPERAND)
    operator = random.choice(OPERATORS)
    
    expr = f"{left} {operator} {right}"
    answer = eval(expr)
    
    return jsonify({'expression': expr, 'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
