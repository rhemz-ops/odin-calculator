const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");

equalBtn.addEventListener("click", () => {
    console.log(display.textContent);
})

clearBtn.addEventListener('click', () => {
    display.textContent = '';
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.textContent;
        display.textContent += number;
    })
})

let firstNum = '';
let operator = '';
let secondNum = '';

const add = (numOne, numTwo) => {
    return numOne + numTwo;
}

const minus = (numOne, numTwo) => {
    return numOne - numTwo;
}

const times = (numOne, numTwo) => {
    return numOne - numTwo;
}

const divide = (numOne, numTwo) => {
    return numOne - numTwo;
}

const operate = (numOne, operator, numTwo) => {
    if (operator === "+") {
        add(numOne, numTwo);
    } else if (operator === "-") {
        minus(numOne, numTwo);
    } else if (operator === "÷") {
        divide(numOne, numTwo);
    } else if (operator === "x") {
        times(numOne, numTwo);
    }
}
