const createBtn = document.getElementById('create-graph');

const balanceField = document.getElementById('initial-balance');
const durationField = document.getElementById('duration');
const contributionField = document.getElementById('yearly-contribution');
const interestField = document.getElementById('interest');
const intervalField = document.getElementById('interest-interval');

const resultText = document.getElementById('result-value');
const graphContainer = document.querySelector('.graph-container');
const controls = document.querySelectorAll('input');

const inputValues = {
    balance: 0,
    duration: 0,
    contribution: 0,
    interest: 0,
    interval: 'yearly',

    result: 0,

    refresh: function() {
        this.balance = Number(balanceField.value);
        this.duration = Number(durationField.value);
        this.contribution = Number(contributionField.value);
        this.interest = Number(interestField.value)/100;
        this.interval = intervalField.value;
    },

    getResult: function(year) {
        //this.refresh();

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
        
        return this.result;
    },

    checkInputs: function() {

        if (![...controls].every((item) => (item.validity.valid && item.value !== ''))) {
            controls.forEach(function(item) {
                if(!item.validity.valid || item.value === '') {
                    item.focus({ focusVisible: true });
                    createBtn.setAttribute('disabled', '');    
                };
            })

        } else {
            if (createBtn.hasAttribute('disabled')) {
                createBtn.removeAttribute('disabled');
            };
        };

        //aim = to check if all inputs are valid; if an invalid input is encountered,
        //disable createButton & shift focus to invalid element;
        //if all inputs are valid, graph can be created
    },
};

window.onload = () => {
    inputValues.refresh();
    createGraph();
};

function checkField(target) {
    if (!target.validity.valid) {
        createBtn.toggleAttribute('disabled');
        createBtn.hasAttribute('disabled');
    };
};

controls.forEach(input => input.addEventListener('change', () => inputValues.checkInputs()));

createBtn.addEventListener('click', () => createGraph());

function resetGraph() {
    while (graphContainer.firstChild) {
      graphContainer.removeChild(graphContainer.firstChild);
    };
};

function createGraph() {
    resetGraph();
    inputValues.refresh();
    let bars = inputValues.duration; //as many bars as years + year 0
    let barValues = [];
    
    for (let i = 0; i <= bars; i++) {
        createBar(i);
        barValues.push(inputValues.getResult(i));
    };
    for (let i = 0; i <= bars; i++) {
        setBarParams(i, barValues);
    };

    showResult();
};

function createBar(index) {
    //create the bar
    const newDiv = document.createElement('div');
    newDiv.classList.add('bar');
    newDiv.setAttribute('id', `bar-${index}`);

    //add info tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltiptext');
    tooltip.setAttribute('id', `tooltip-${index}`);

    newDiv.appendChild(tooltip);

    graphContainer.appendChild(newDiv);
};

function setBarParams(index, values) {
    let bar = document.getElementById(`bar-${index}`);
    //height = percentage of last element, rounded to 2 decimals
    //set timeout to enable transition animation
    window.setTimeout(() => {
        bar.setAttribute('style', 
        `height: ${(Math.round((values[index]/values[values.length-1])*10000))/100}%`)
    }, 0); //perform with no delay

    let infobox = document.getElementById(`tooltip-${index}`); //named infobox here to prevent any possible collisions
    infobox.textContent = `Year ${index}, balance: \$${Math.round(values[index])}`;
};

function showResult() {
    let roundedResult = (Number.parseInt(inputValues.result * 100))/100; //round to 2 decimals
    resultText.textContent = `\$${roundedResult}`;
};