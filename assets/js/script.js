class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // sqrt
        if (operation === '√') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
            this.operation = undefined;
            this.previousOperand = '';
            // pow 2
        }
        else if (operation === 'x²') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.pow(parseFloat(this.currentOperand), 2);
            this.operation = undefined;
            this.previousOperand = '';
        }
        else if (operation === 'x³') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.pow(parseFloat(this.currentOperand), 3);
            this.operation = undefined;
            this.previousOperand = '';
        }
        else if (operation === 'sin') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.sin(parseFloat(this.currentOperand));
            this.operation = undefined;
            this.previousOperand = '';
        }
        else if (operation === 'tan') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.tan(parseFloat(this.currentOperand));
            this.operation = undefined;
            this.previousOperand = '';
        }
        else if (operation === 'cos') {
            if (this.currentOperand === '') return;
            this.currentOperand = Math.cos(parseFloat(this.currentOperand));
            this.operation = undefined;
            this.previousOperand = '';
        }
        else if (operation === '%') {
            if (this.currentOperand === '') return;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            this.operation = '%';
        }
        else {
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.compute();
            }

            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'x':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            case '%':
                computation = (prev / 100) * current;
                break
            // sqrt
            case '√':
                break
            case 'x²':
                break
            case 'x³':
                break
            case 'sin':
                break
            case 'cos':
                break
            case 'tan':
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    /**
     * Adds commas to long numbers to tidy up the display.
     * Splits at decimal to ensure correct placement of commas
     */
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
// PASTED OLD VERSION UNDERNEATH
    // updateDisplay() {
    //     this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

    //     if (this.operation != null) {
    //         if (this.operation === '%') {
    //             this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    //         }
    //         else if (this.operation === '√') {
    //             // don't think this is working
    //             this.previousOperandTextElement.innerText = `${this.operation} ${this.getDisplayNumber(this.previousOperand)}`;
    //         }
    //         else if (this.operation === 'sin') {
    //             this.currentOperandTextElement.innerText = `${this.operation}(${this.getDisplayNumber(this.currentOperand)})`;
    //         }
    //         else if (this.operation === 'tan') {
    //             this.currentOperandTextElement.innerText = `${this.operation}(${this.getDisplayNumber(this.currentOperand)})`;
    //         }
    //         else if (this.operation === 'cos') {
    //             this.currentOperandTextElement.innerText = `${this.operation}(${this.getDisplayNumber(this.currentOperand)})`;
    //         }
    //     }
    //         else {
    //         this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand);
    //         }
    // }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            if (this.operation === '√') {
                this.previousOperandTextElement.innerText = `√(${this.getDisplayNumber(this.previousOperand)})`;
            } else {
                this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
            }
        } else {
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand);
        }
    }
}



const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Operator buttons
// const multiplyButton = document.querySelector('[data-multiply]');
// const additionButton = document.querySelector('[data-add]');
// const subtractButton = document.querySelector('[data-subtract]');
// const divideButton = document.querySelector('[data-divide]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

// Advanced operator buttons
const percentageButton = document.querySelector('[data-percentage]');
const piButton = document.querySelector('[data-pi]');
const sqrtButton = document.querySelector('[data-sqrt]');
const pow2Button = document.querySelector('[data-pow-two]');
const pow3Button = document.querySelector('[data-pow-three]');
const toggleButton = document.querySelector('[data-toggle-sign]');
const sinButton = document.querySelector('[data-sin]');
const cosButton = document.querySelector('[data-cos]');
const tanButton = document.querySelector('[data-tan]');


// Number buttons
// const num1 = document.querySelector('[data-1]');
// const num2 = document.querySelector('[data-2]');
// const num3 = document.querySelector('[data-3]');
// const num4 = document.querySelector('[data-4]');
// const num5 = document.querySelector('[data-5]');
// const num6 = document.querySelector('[data-6]');
// const num7 = document.querySelector('[data-7]');
// const num8 = document.querySelector('[data-8]');
// const num9 = document.querySelector('[data-9]');
// const num0 = document.querySelector('[data-0]');

// num1.value = "1";
// num2.value = "2";
// num3.value = "3";
// num4.value = "4";
// num5.value = "5";
// num6.value = "6";
// num7.value = "7";
// num8.value = "8";
// num9.value = "9";
// num0.value = "0";


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// -------number buttons event listeners---------------- //
// num1.addEventListener('click', () => {
//     calculator.appendNumber(num1.value);
//     calculator.updateDisplay();
// });
// num2.addEventListener('click', () => {
//     calculator.appendNumber(num2.value);
//     calculator.updateDisplay();
// });
// num3.addEventListener('click', () => {
//     calculator.appendNumber(num3.value);
//     calculator.updateDisplay();
// });
// num4.addEventListener('click', () => {
//     calculator.appendNumber(num4.value);
//     calculator.updateDisplay();
// });
// num5.addEventListener('click', () => {
//     calculator.appendNumber(num5.value);
//     calculator.updateDisplay();
// });
// num6.addEventListener('click', () => {
//     calculator.appendNumber(num6.value);
//     calculator.updateDisplay();
// });
// num7.addEventListener('click', () => {
//     calculator.appendNumber(num7.value);
//     calculator.updateDisplay();
// });
// num8.addEventListener('click', () => {
//     calculator.appendNumber(num8.value);
//     calculator.updateDisplay();
// });
// num9.addEventListener('click', () => {
//     calculator.appendNumber(num9.value);
//     calculator.updateDisplay();
// });
// num0.addEventListener('click', () => {
//     calculator.appendNumber(num0.value);
//     calculator.updateDisplay();
// });

const numberElements = document.querySelectorAll('[data-number]');

numberElements.forEach(element => {
    element.addEventListener('click', () => {
        calculator.appendNumber(element.getAttribute('data-number'));
        calculator.updateDisplay();
    })
})

const operationElements = document.querySelectorAll('[data-operation]');

operationElements.forEach(element => {
    element.addEventListener('click', () => {
        calculator.chooseOperation(element.getAttribute('data-operation'));
        calculator.updateDisplay();
    })
})


// operator buttons //


equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})



percentageButton.addEventListener('click', () => {
    calculator.chooseOperation('%');
    calculator.updateDisplay();
})

// You can only click pi if there is no value in currentOperand
piButton.addEventListener('click', () => {
    if (calculator.currentOperand === '') {
        calculator.appendNumber(Math.PI);
        calculator.updateDisplay();
    } else {
        return;
    }
})

sqrtButton.addEventListener('click', () => {
    calculator.chooseOperation('√');
    calculator.compute();
    calculator.updateDisplay();
})

pow2Button.addEventListener('click', () => {
    calculator.chooseOperation('x²');
    calculator.compute();
    calculator.updateDisplay();
})

pow3Button.addEventListener('click', () => {
    calculator.chooseOperation('x³');
    calculator.compute();
    calculator.updateDisplay();
})

toggleButton.addEventListener('click', () => {
    if (calculator.currentOperand !== "") {
        calculator.currentOperand = -calculator.currentOperand;
        calculator.updateDisplay();
    }
})

sinButton.addEventListener('click', () => {
    calculator.chooseOperation('sin');
    calculator.compute();
    calculator.updateDisplay();
})

tanButton.addEventListener('click', () => {
    calculator.chooseOperation('tan');
    calculator.compute();
    calculator.updateDisplay();
})

cosButton.addEventListener('click', () => {
    calculator.chooseOperation('cos');
    calculator.compute();
    calculator.updateDisplay();
})

// Memory buttons//
const memoryAddButton = document.querySelector('[data-m-plus]');
const memoryRecallButton = document.querySelector('[data-m-recall]');
let memory = '';


memoryAddButton.addEventListener('click', () => {
    if (calculator.currentOperand !== '') {
        memory = calculator.currentOperand;
        console.log(memory)
    }
});

// This works although you can enter a number after the number is recalled
memoryRecallButton.addEventListener('click', () => {
    if (memory) {
        calculator.currentOperand = memory;
        calculator.updateDisplay();
    }
});

