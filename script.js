let currentNumber = "";
let previousNumber = "";
let operator = "";

const display = document.querySelector('.display');
const previousOperationDisplay = document.querySelector('.previous-operation');
const currentOperationDisplay = document.querySelector('.current-operation');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const dotButton = document.querySelector('.button-dot');
dotButton.addEventListener('click', () => {
  decimalAction();
});

const backspaceButton = document.querySelector('.button-backspace');
backspaceButton.addEventListener('click', () => {
  backspaceAction();
})

const clearButton = document.querySelector('.button-clear');
clearButton.addEventListener('click', clearCalculator);

const equalButton = document.querySelector('.button-equal');
equalButton.addEventListener('click', () => {
  if(currentNumber !== "" && previousNumber !== ""){
    calculate();
  }
});

currentOperationDisplay.textContent = "0";

numberButtons.forEach((number) => {
  number.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  })
});

function handleNumber(number){
  if(previousNumber !== "" && currentNumber !== "" && operator === ""){
    previousNumber = "";
currentOperationDisplay.textContent = currentNumber;
  }
  if(currentNumber.length <= 12){
    currentNumber += number;
    currentOperationDisplay.textContent = currentNumber;
  }
}

operatorButtons.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  })
});

function handleOperator(op){
if(previousNumber === ""){
  previousNumber = currentNumber;
  operatorCheck(op);
}else if(currentNumber === ""){
  operatorCheck(op);
}else{
  calculate();
  operator = op;
  currentOperationDisplay.textContent = "0";
  previousOperationDisplay.textContent = previousNumber + " " + operator;
}
}

function operatorCheck(text){
  operator = text;
  previousOperationDisplay.textContent = previousNumber + " " + operator;
  currentOperationDisplay.textContent = "0";
currentNumber = "";
}

function calculate(){
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  if(operator === "+"){
    previousNumber += currentNumber;
  }else if(operator === "-"){
    previousNumber -= currentNumber;
  }else if(operator === "x"){
    previousNumber *= currentNumber;
  }else if(operator === "/"){
    if(currentNumber <= 0){
      previousNumber = 'Error';
 displayResults();
      return;
    }
    previousNumber /= currentNumber;
  }
  previousNumber = roundNumber(previousNumber);
  previousNumber = previousNumber.toString();
displayResults();
}

function roundNumber(num){
  return Math.round(num * 100000) / 100000;
}

function displayResults(){
  if(previousNumber.length <= 14){
    currentOperationDisplay.textContent = previousNumber;
  }else{
    currentOperationDisplay.textContent = previousNumber.slice(0,14);
  }
  previousOperationDisplay.textContent = "";
  operator = "";
  currentNumber = "";
}

function clearCalculator(){
  currentNumber = "";
  previousNumber = "";
  operator = "";
  currentOperationDisplay.textContent = "0";
  previousOperationDisplay.textContent = "";
}

function backspaceAction(){
  currentNumber = currentNumber.slice(0, -1);
  currentOperationDisplay.textContent = currentOperationDisplay.textContent.slice(0, -1);
}

function decimalAction(){
  if(currentNumber.includes(".")){
    currentNumber += ".";
    currentOperationDisplay.textContent = currentNumber;
  }
}