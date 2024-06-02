const createBtn = document.getElementById('create-graph');

const balanceField = document.getElementById('initial-balance');
const durationField = document.getElementById('duration');
const contributionField = document.getElementById('monthly-contribution');
const interestField = document.getElementById('interest');
const intervalField = document.getElementById('interest-interval');

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
        this.interest = Number(interestField.value);
        this.interval = intervalField.value;
        this.getResult();
    },

    getResult: function() {
        this.result = 0;
        if (this.interval === "monthly") {
        for (let i = 0; i<this.duration; i++) {
            this.balance = this.balance + this.contribution;
            this.result = this.balance + (this.balance * (this.interest / 100));
            this.balance = this.result;
          }
        }
    },

    getValues: function() {
        this.refresh();
        return [this.balance, this.duration, this.contribution, this.interest, this.interval];
    },
};

window.onload = () => inputValues.refresh();
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
    let bars = 0;
    let months = inputValues.duration;
    if (months % 12 === 0) {
        bars = months/12;
    } else {
        bars = months;
    };
    for (let i = 1; i <= bars; i++) {
        createDiv();
    };
    console.log(inputValues.result);
}

function createDiv() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('bar');
    graphContainer.appendChild(newDiv);
}

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