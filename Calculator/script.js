/* Variables */
/* -- numbers and actions buttons */
const numberBtns = document.querySelectorAll('.btn-number');
const actionBtns = document.querySelectorAll('.btn-action');
/* -- other buttons */
const allClearBtn = document.querySelector('#btn-all-clear');
const deleteBtn = document.querySelector('#btn-delete');
const equalsBtn = document.querySelector('#btn-equals');
/* -- output */
const previousNumberTextElement = document.querySelector('#previous-number');
const currentNumberTextElement = document.querySelector('#current-number');

/* Calculator class */
class Calculator {
  constructor(previousNumberTextElement, currentNumberTextElement) {
    this.previousNumberTextElement = previousNumberTextElement;
    this.currentNumberTextElement = currentNumberTextElement;
    this.clear();
  }

  clear() {
    this.previousNumber = '';
    this.currentNumber = '';
  }

  delete() {
    this.currentNumber = this.currentNumber.substring(
      0,
      this.currentNumber.length - 1
    );
  }

  appendNumber(number) {
    if (number === '.' && this.currentNumber.includes('.')) return;
    this.currentNumber = this.currentNumber + number;
  }

  chooseAction(action) {
    if (this.previousNumber !== '') {
      this.calculations();
    }

    if (this.currentNumber === '') return;

    this.action = action;
    this.previousNumber = this.currentNumber;
    this.currentNumber = '';
  }

  calculations() {
    let result;
    let prev = parseFloat(this.previousNumber);
    let current = parseFloat(this.currentNumber);

    if (
      isNaN(prev) ||
      isNaN(current) ||
      typeof prev !== 'number' ||
      typeof current !== 'number'
    )
      return;

    switch (this.action) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentNumber = result;
    this.previousNumber = '';
    this.action = undefined;
  }

  updateDisplay() {
    this.currentNumberTextElement.innerText = this.currentNumber;
    this.previousNumberTextElement.innerText = this.previousNumber;
  }
}

/* Creating calculator based on Calculator class */
const calculator = new Calculator(
  previousNumberTextElement,
  currentNumberTextElement
);

/* Events */
/* -- for numbers */
numberBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  })
);

/* -- for actions */
actionBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    calculator.chooseAction(btn.innerText);
    calculator.updateDisplay();
  })
);

/* -- for getting results on calculator display */
equalsBtn.addEventListener('click', () => {
  calculator.calculations();
  calculator.updateDisplay();
});

/* -- clearing calculator */
allClearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
