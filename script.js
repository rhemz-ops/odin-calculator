const display = document.querySelector("#display");
const numBtn = document.querySelectorAll(".btn");
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");
const decimalBtn = document.querySelector("#decimal");

let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';
let newNumberFlag = false;

const maxDisplayLength = 15;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        display.textContent = "ERROR!";
        resetCalculator();
        return null;
    } else {
        return a / b;
    }
};

const operate = (first, oper, second) => {
    first = parseFloat(first);
    second = parseFloat(second);

    let result;
    switch (oper) {
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case 'x':
            result = multiply(first, second);
            break;
        case '÷':
            result = divide(first, second);
            if (result === null) return;
            break;
        default:
            return null;
    }

    return formatNumber(result !== null ? parseFloat(result.toFixed(2)) : result);
};

const formatNumber = (number) => {
    if (number === null) return null;

    const maxLength = 10;
    const strNumber = number.toString();

    if (strNumber.length > maxLength) {
        return number.toExponential(5);
    }

    return strNumber;
};

const handleNumberInput = (btn) => {
    const digit = btn.innerText;
    if (newNumberFlag || display.textContent === "ERROR!") {
        display.textContent = digit;
        newNumberFlag = false;
    } else if (display.textContent.length < maxDisplayLength){
        display.textContent += digit;
    }
};

const handleOperatorInput = (btn) => {
    if (firstNum && operator && display.textContent && !newNumberFlag) {
        secondNum = display.textContent;
        result = operate(firstNum, operator, secondNum);
        if (result !== undefined) {
            display.textContent = result;
            firstNum = result;
            secondNum = '';
        }
    } else {
        firstNum = display.textContent;
    }
    operator = btn.innerText;
    newNumberFlag = true;
    decimalBtn.disabled = false;
};

const calculateResult = () => {
    if (firstNum && operator && display.textContent) {
        if (newNumberFlag) {
            display.textContent = firstNum;
        } else {
            secondNum = display.textContent;
            result = operate(firstNum, operator, secondNum);
            if (result !== undefined) {
                display.textContent = result;
                firstNum = result;
                secondNum = '';
                operator = '';
                newNumberFlag = true;
                decimalBtn.disabled = false;
            }
        }
    }
};

const clearDisplay = () => {
    display.textContent = '';
    resetCalculator();
};

const deleteDigit = () => {
    const currentDisplay = display.textContent;
    if (currentDisplay.slice(-1) === '.') {
        decimalBtn.disabled = false;
    }
    display.textContent = currentDisplay.slice(0, -1);
};

const handleDecimalInput = () => {
    if (!decimalBtn.disabled && !display.textContent.includes('.')) {
        display.textContent += '.';
        decimalBtn.disabled = true;
    }
};

const resetCalculator = () => {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    newNumberFlag = false;
    decimalBtn.disabled = false;
};

// BUTTON EVENT LISTENERS
numBtn.forEach(btn => btn.addEventListener('click', () => handleNumberInput(btn)));
operatorBtn.forEach(btn => btn.addEventListener('click', () => handleOperatorInput(btn)));
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteDigit);
equalBtn.addEventListener('click', calculateResult);
decimalBtn.addEventListener('click', handleDecimalInput);
