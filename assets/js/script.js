class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        // Create an array to store the computations for the history table
        this.history = [];
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

        this.history.push({
            calculation: `${this.getDisplayNumber(prev)} ${this.operation} ${this.getDisplayNumber(current)}`,
        });

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

    updateHistory() {
        const historyTable = document.getElementById('history-table');

        let row = historyTable.insertRow();
        let historyDelete = row.insertCell(0);
        let historyCalc = row.insertCell(1);
        let historyResult = row.insertCell(2);


        // calls the most recent entry in the history array
        const latestEntryHistory = this.history[this.history.length - 1];

        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.onclick = "remove(this)";
        deleteButton.innerHTML = 'X';

        // DELETES THE ROW IN THE HISTORY TABLE //
        deleteButton.addEventListener('click', function () {
            const row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
        })

        historyCalc.innerText = latestEntryHistory.calculation;
        historyResult.innerText = this.getDisplayNumber(this.currentOperand);
        historyDelete.appendChild(deleteButton);

        row.appendChild(historyDelete);
        row.appendChild(historyCalc);
        row.appendChild(historyResult);


        historyTable.appendChild(row);
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



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


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
        // STORE CALCULATIONS//
        calculator.updateHistory();
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

//Tips Events//

percentageButton.addEventListener('click', () => {

    let heading = document.getElementById('tipsTitle');
    let text = document.getElementById('tipsText');
    let link = `<a href="https://byjus.com/maths/percentage/"
    aria-label="link to a web page with more info on percentages" target="_blank">Learn more</a>`;

    heading.innerText = "Percentage";
    text.innerHTML = `In mathematics, a percentage is a number or ratio that can be expressed as a fraction of 100. If we have to calculate percent of a number, divide the number by the whole and multiply by 100. Hence, the percentage means, a part per hundred. The word per cent means per 100. It is represented by the symbol “%”`;
    text.innerHTML += `<br>${link}`;

})

sqrtButton.addEventListener('click', () => {

    let heading = document.getElementById('tipsTitle');
    let text = document.getElementById('tipsText');
    let link = `<a href="https://byjus.com/maths/square-root/"
    aria-label="link to a web page with more info on square root" target="_blank">Learn more</a>`;

    heading.innerText = "Square Root";
    text.innerHTML = `Square root of a number is a value, which on multiplication by itself, gives the original number. The square root is an inverse method of squaring a number. Hence, squares and square roots are related concepts.`;
    text.innerHTML += `<br>${link}`;

})

piButton.addEventListener('click', () => {

    let heading = document.getElementById('tipsTitle');
    let text = document.getElementById('tipsText');
    let link = `<a href="https://byjus.com/maths/value-of-pi/"
    aria-label="link to a web page with more info on Pi" target="_blank">Learn more</a>`;

    heading.innerText = "Pi";
    text.innerHTML = `The value of Pi (π) is the ratio of the circumference of a circle to its diameter and is approximately equal to 3.14159. In a circle, if you divide the circumference (is the total distance around the circle) by the diameter, you will get exactly the same number. Whether the circle is big or small, the value of pi remains the same.`;
    text.innerHTML += `<br>${link}`;

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

// function to mute all sounds on the page - 'if (!isSoundMute)' only allows sound to be played if isSoundMute is false
let isSoundMute = false;

function toggleSoundMute() {
    isSoundMute = !isSoundMute;
}

// functions to call sound effects

//generic skin sound effects
function sound1() {
    if (!isSoundMute) {
    var snd = new Audio('/assets/audio/1.mp3')
    snd.play()//plays the sound
}}

function sound2(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/2.mp3')
    snd.play()//plays the sound
}}

function sound3(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/3.mp3')
    snd.play()//plays the sound
}}

function sound4(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/4.mp3')
    snd.play()//plays the sound
}}

function sound5(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/5.mp3')
    snd.play()//plays the sound
}}

function sound6(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/6.mp3')
    snd.play()//plays the sound
}}

function sound7(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/7.mp3')
    snd.play()//plays the sound
}}

function sound8(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/8.mp3')
    snd.play()//plays the sound
}}

function sound9(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/9.mp3')
    snd.play()//plays the sound
}}

function sound0(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/0.mp3')
    snd.play()//plays the sound
}}

function soundEquals(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/equals.mp3')
    snd.play()//plays the sound
}}

function soundOperator(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/operators.mp3')
    snd.play()//plays the sound
}}

function soundDot(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/dot.mp3')
    snd.play()//plays the sound
}}

// halloween skin sound effects
function horrorNumberSound(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/horror-numbers.mp3')
    snd.play()//plays the sound for all numbers
}}

function horrorNumberOperator(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/horror-operators.mp3')
    snd.play()//plays the sound for all numbers
}}

function horrorNumberEquals(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/horror-equals.mp3')
    snd.play()//plays the sound for all numbers
}}

// mlp skin sound effects
function mlpNumbers(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/lok.mp3')
    snd.play()//plays the sound for all numbers
}}

function mlpDel(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/oh-no.mp3')
    snd.play()//plays the sound for all numbers
}}

function mlpEquals(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/here-we-go.mp3')
    snd.play()//plays the sound for all numbers
}}

function mlpOperators(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/i-did.mp3')
    snd.play()//plays the sound for all numbers
}}

function mlpAc(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/go-away.mp3')
    snd.play()//plays the sound for all numbers
}}

// grunge skin sound effects
function grungeNumber(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/grunge-numbers.wav')
    snd.play()//plays the sound for all numbers
}}

function grungeOperator(){
    if (!isSoundMute){
    var snd = new Audio('/assets/audio/grunge-operator.wav')
    snd.play()//plays the sound for all numbers
}}

function grungeEquals() {
    if (!isSoundMute) {
        var snd = new Audio('assets/audio/grunge-equals.mp3')
        snd.play()//plays the sound for all numbers
    }
}

// premium skin sound effects
function premiumClick() {
    if (!isSoundMute) {
        var snd = new Audio('assets/audio/button-press.mp3')
        snd.play()//plays the sound for all numbers
    }
}