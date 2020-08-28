const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

const calculate = {
    '/':(firsNumber, secondNumber) => firsNumber / secondNumber,
    '*':(firsNumber, secondNumber) => firsNumber * secondNumber,
    '+':(firsNumber, secondNumber) => firsNumber + secondNumber,
    '-':(firsNumber, secondNumber) => firsNumber - secondNumber,
    '=':(firsNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue (number) {

    if (awaitingNextValue) {
        
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;

    } else {

        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}

function addDecimal() {

    if (awaitingNextValue) {
        return;
    }
    if (!calculatorDisplay.textContent.includes('.')) {

        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}



function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;

}

function resetAll() {

    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

inputButtons.forEach(button => {

    if (button.classList.length === 0) {

        button.addEventListener('click', () => sendNumberValue(button.value));

    } else if (button.classList.contains('operator')) {

        button.addEventListener('click', () => useOperator(button.value));

    } else if (button.classList.contains('decimal')) {

        button.addEventListener('click', () => addDecimal());
    }
});

clearButton.addEventListener('click', resetAll);