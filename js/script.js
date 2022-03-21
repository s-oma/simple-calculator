// Create the Variables
let currentOperand = '';
let previousOperand = '';
let operator = '';
// Create Screen Variables 
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');
// Create Buttons Variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const decimalButton = document.querySelector('[data-decimal]');

// Add Event Listener for Buttons of NUMBERS + Create handleNumber Function

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.innerText);
    });
});

function handleNumber(number) {
    if(currentOperand !== "" && previousOperand !== "" && operator === "") {
        previousOperand = "";
        currentOperandTextElement.innerText = currentOperand;
    }
    if(currentOperand.length <= 15){
        currentOperand += number;
        currentOperandTextElement.innerText = currentOperand;
    }
}

// Add Event Listener for Buttons of OPERATIONS + Create handleOperator Function

operationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.innerText);
    });
});

function handleOperator(op) {
    if(previousOperand === "") {
        previousOperand = currentOperand;
        operatorCheck(op);
    } else if(currentOperand === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentOperandTextElement.innerText = "0";
        previousOperandTextElement.innerText = previousOperand + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousOperandTextElement.innerText = previousOperand + " " + operator;
    currentOperandTextElement.innerText = "0";
    currentOperand = "";
}


// Create Add Event Listener for Equal Button + The Equal Button Function

equalsButton.addEventListener('click', () => {
    if(currentOperand != "" && previousOperand != "") {
        calculate();
    }
});

function calculate() {
    previousOperand = Number(previousOperand);
    currentOperand = Number(currentOperand);

    if(operator === "+") {
        previousOperand = previousOperand + currentOperand;
    } else if(operator === "-") {
        previousOperand = previousOperand - currentOperand;
    } else if(operator === "x") {
        previousOperand = previousOperand * currentOperand;
    } else if(operator === "÷") {
        if(currentOperand <= 0) {
            previousOperand = "error";
            displauResults();
            return
        }
        previousOperand = previousOperand / currentOperand;
    }
    previousOperand = roundNumber(previousOperand);
    previousOperand = previousOperand.toString();
    displauResults();

}

// Create the round Number Function

function roundNumber (num) {
    return Math.round(num *1000000) / 1000000;
}

// Creat displauResults Function
function displauResults () {
    if(previousOperand.length <= 15) {
        currentOperandTextElement.innerText = previousOperand;
    } else {
        currentOperandTextElement.innerText = previousOperand.slice(0, 15) + "...";
    }
    previousOperandTextElement.innerText = "";
    operator = "";
    currentOperand = "";
}

// Create Add Event Listener for ALL-CLEAR Button + ALL-CLEAR Button Function

allClearButton.addEventListener('click', clearCalculator);

function clearCalculator() {
    currentOperand = '';
    previousOperand = '';
    operator = '';
    currentOperandTextElement.innerText = '';
    previousOperandTextElement.innerText = '';
}

// Create Decimal Button Function

decimalButton.addEventListener('click', () => {
    addDecimal();
});

function addDecimal() {
    if(!currentOperand.includes(".")) {
        currentOperand = currentOperand + ".";
        currentOperandTextElement.innerText = currentOperand;
    }
}

// Create Delete button function

deleteButton.addEventListener('click', () => {
    handleDelete();
});

function handleDelete() {
    if(currentOperand !== "") {
        currentOperand = currentOperand.slice(0, -1);
        currentOperandTextElement.innerText = currentOperand;
        if(currentOperand === "") {
            currentOperand = "0";
        }
    }
    if(currentOperand === "" && previousOperand === "" && operator === "") {
        previousOperand = previousOperand.slice(0, -1);
        currentOperandTextElement.innerText = previousOperand;
    }
    
}

// Create KeyPress Function
window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    e.preventDefault();
    if(e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if(e.key === "Enter" || e.key === "=" && currentOperand !== "" && previousOperand !== "") {
        calculate();
    }
    if(e.key === "+" || e.key === "-") {
        handleOperator(e.key);
    }
    if(e.key === "*") {
        handleOperator(e.key);
    }
    if(e.key === "/") {
        handleOperator(e.key);
    }
    if(e.key === ".") {
        addDecimal();
    }
    if(e.key === "Backspace") {
        handleDelete();
    }
}

