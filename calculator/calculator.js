// Buttons contain each number
const buttons = document.querySelectorAll('.button');
// Operands contain each operand (no C button)
const operands = document.querySelectorAll('.operand');
// Clear button
const clearButton = document.querySelector('.clear');
//Possible operands in this app
const possibleOperands = ['*','/','+','-'];



// --------------------------------------------------------------------------------------
// Calculator Class
// --------------------------------------------------------------------------------------

class Calculator {

    constructor() {
        this.currentScreen = document.querySelector('.currentoperation');
        this.previousScreen = document.querySelector('.previousoperation');
        this.currentOperand = '';
        this.previousOperand = '';
        this.lastChar = '';
    }


    handleButtonClick(number) {
        this.lastChar = number;
        this.currentScreen.textContent += number;

    }

    handleOperandClick(operand) {

        //If operand will be first char, return
        if(this.currentScreen.textContent == '') return;
        if(operand == '=') {
            this.executeOperation();
            return;
        }

        //Previous operand will get current, because now the operand is current operand (kind'a tricky explanation)
        this.previousOperand = this.currentOperand;
        this.currentOperand = operand;
        
        //This checks if in currentscreen is any dot
        const expression = Array.from(this.currentScreen.textContent);
        let containDot = false;

        expression.map(number => {
            if(number == '.') {
                containDot = true;
            }
        });

        const currentOperator = this.currentScreen.textContent.split(/[-+\\/\\*]/).pop();
        // if there is any dot, and user want to add another dot, then return
        if (currentOperator.includes(".") && operand === ".") return

        //Check if previous char in expression was a operand, if so, return
        if(this.isOperand(this.lastChar)) return;

        this.currentScreen.textContent += operand;
        this.lastChar = operand;

    }

    isOperand(x) {

        let operator = false;

        possibleOperands.forEach(operand => {
            if(operand==x) {
                operator = true;
            }
        });

        return operator;
    }

    clear() {
        this.currentScreen.textContent = '';
        this.previousScreen.textContent = '';
        this.currentOperand = '';
        this.previousOperand = '';
        this.lastChar = '';
    }

    executeOperation() {
        if(this.isOperand(this.lastChar)) return;

        const result = eval(this.currentScreen.textContent);
        this.clear();
        this.previousScreen.textContent = result;
    }
}


const calculator = new Calculator();

// --------------------------------------------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------------------------------------------


buttons.forEach(button => button.addEventListener('click', () => calculator.handleButtonClick(button.textContent)));
operands.forEach(operand => operand.addEventListener('click', () => calculator.handleOperandClick(operand.textContent)));
clearButton.addEventListener('click', () => calculator.clear());