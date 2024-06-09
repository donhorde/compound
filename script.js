const createBtn = document.getElementById('create-graph');

const balanceField = document.getElementById('initial-balance');
const durationField = document.getElementById('duration');
const contributionField = document.getElementById('monthly-contribution');
const interestField = document.getElementById('interest');
const intervalField = document.getElementById('interest-interval');

const resultText = document.getElementById('result-value');
const graphContainer = document.querySelector('.graph-container');
const controls = document.querySelector('.controls');

const inputValues = {
    balance: 0,
    duration: 0,
    contribution: 0,
    interest: 0,
    interval: "yearly",

    result: 0,

    refresh: function() {
        this.balance = Number(balanceField.value);
        this.duration = Number(durationField.value);
        this.contribution = Number(contributionField.value);
        this.interest = Number(interestField.value)/100;
        this.interval = intervalField.value;
    },

    getResult: function(year) {
        this.refresh();

        //formula ver 2 - with yearly contributions:
            /*
            P = Initial Amount (this.balance)
            i = yearly interest rate (this.interest)
            A = yearly contribution or deposit added. (this.contribution)
            n = the deposits will be made for X consecutive years. (this.duration)
            F = final amount obtained. (this.result)
                (P+A/i)(1+i)^n − A/i
            */

            // reworked to return the result for individual years; year 0 = no interest added, initial balance only
            if(year===0) {
                this.result = this.balance;
            } else {
                this.result = (this.balance+(this.contribution/this.interest)) * Math.pow((1 + this.interest), year) - this.contribution/this.interest;
            };
            // this.result = this.balance * Math.pow((1 + this.interest), this.duration) + (this.contribution * (Math.pow((1 + this.interest), this.duration) - 1)/this.interest)*(1 + this.interest);
        
        return this.result;
    },

    getValues: function() {
        this.refresh();
        return [this.balance, this.duration, this.contribution, this.interest, this.interval];
    },
};

window.onload = () => {
    inputValues.getResult();
    createGraph();
}
// controls.addEventListener('change', () => inputValues.refresh());

createBtn.addEventListener('click', () => createGraph());

function resetGraph() {
    while (graphContainer.firstChild) {
      graphContainer.removeChild(graphContainer.firstChild);
    };
};

function createGraph() {
    resetGraph();
    inputValues.refresh();
    let bars = inputValues.duration;
    
    for (let i = 0; i <= bars; i++) {
        createBar();
        console.log(`year ${i}: ${inputValues.getResult(i)}`);
    };
    showResult();
}

function createBar() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('bar');
    graphContainer.appendChild(newDiv);
}

function showResult() {
    let roundedResult = (Number.parseInt(inputValues.result * 100))/100; //round to 2 decimals
    resultText.textContent = `\$${roundedResult}`;
};



/* function calculateFinal(balance, duration, contribution, interest, interval) {
    let result = 0;
    if (interval === "monthly") {
        for (let i = 0; i<duration; i++) {
            balance = balance + contribution;
            result = balance + (balance * (interest / 100));
            balance = result;
        };
        return result;
    };
};
console.log(calculateFinal(inputValues.getValues())); */