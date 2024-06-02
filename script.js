const createBtn = document.getElementById('create-chart');

const durationField = document.getElementById('duration');
const contributionField = document.getElementById('monthly-contribution');
const interestField = document.getElementById('interest');
const intervalField = document.getElementById('interest-interval');

const graphContainer = document.querySelector('.graph-container');

let inputValues = {
    duration: 0,
    contribution: 0,
    interest: 0,
    interval: "yearly",

    refresh: function() {
        this.duration = durationField.value;
        this.contribution = contributionField.value;
        this.interest = interestField.value;
        this.interval = intervalField.value;
    },
};

createBtn.addEventListener('click', () => createDiv());

function createDiv() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('bar');
    graphContainer.appendChild(newDiv);
}

function testFn() {
    inputValues.refresh();
    console.log(inputValues);
}