
let jobsInput = document.getElementById("jobs");
let machinesInput = document.getElementById("machines");
let dueDateInput = document.getElementById("dueDate");
let solveBtn = document.getElementById("solve");
let stopBtn = document.getElementById("stop");
let temperature = 10000; //0.1;
const ABSOLUTE_ZERO = 0; //0.0001;
const COOLING_RATE = 1; //0.999999;
let JOBS = [[0, 0, 0]];
let n;
let m;
let schedule = [];
let best = [];
let bestСost = 0;
let startInterval;

solveBtn.addEventListener("click", init);
stopBtn.addEventListener("click", function() { clearInterval(startInterval) });

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndInt(n) {
    return Math.floor(Math.random()*(n));
}

function deep_copy(array, to) {
    let i = array.length;
    while (i--) {
        to[i] = [array[i][0],array[i][1]];
    }
}

function acceptanceProbability(currentСost, neighborСost) {
    if (neighborСost < currentСost){
        return 1;
    }
    return Math.exp((currentСost - neighborСost) / (temperature * 0.00001));
}

function init() {
    getInputValues();

    createJobs(n,JOBS);
    createtSchedule(m);
    best = [...schedule];
    bestСost = getCost(addSetups(best));
    drawSchedule(best);
    startInterval = setInterval(solve, 10);
}

function getCost(array){
    let criterion = 0;
    let line = 0;

    for(let i = 0; i < array.length; i++){
        if(array[i] < 0){
            line = 0;
            continue;
        }
        if(array[i] == 0){
            line += 3;
            continue;    
        }
        let element = JOBS.find(element => element[0] === array[i]);
        criterion += Math.max(element[1] + line - d, 0);
        line += element[1];
    }
    return criterion;
}

function solve() {
    if (temperature > ABSOLUTE_ZERO) {
        let currentСost = getCost(addSetups(schedule));

        let neighbor = mutate(schedule);
        let neighborCost = getCost(addSetups(neighbor));
        if (Math.random() < acceptanceProbability(currentСost, neighborCost)) {
            schedule = [...neighbor];
            currentСost = getCost(addSetups(schedule));
        }

        if (currentСost < bestСost) {
            best = [...schedule];
            bestСost = currentСost;
            console.log(bestСost);
            drawSchedule(best);
        }

        drawTemperature(temperature, 0, canvas.height - 20, canvas.width, canvas.height);
        temperature -= COOLING_RATE;
        
    } else {
        clearInterval(startInterval);
        console.log("Solved")   
    }
}

function mutate(array) {
    let neighbor = [];
    neighbor = [...array];

    let k = getRndInt(n+m-1);
    let l = getRndInt(n+m-1);

    while(k == l){
        l = getRndInt(n+m-1);
    }
    let t = neighbor[k];
    neighbor[k] = neighbor[l];
    neighbor[l] = t;
    return neighbor;
}

function getInputValues(){
    n = parseInt(jobsInput.value); 
    m = parseInt(machinesInput.value);
    d = parseInt(dueDateInput.value);
}

function createJobs(n, array){
    for (let i = 0; i < n; i++) {
        array[i] = [i + 1, getRndInteger(3, 10), getRndInteger(1, 3)];
    }
}

function createtSchedule(machines) {
    for (let i = 0; i < JOBS.length; i++) {
            schedule.push(JOBS[i][0]);
        }
    for (let i = 0; i < machines - 1; i++){
        schedule.push(-1);
    }
}

function addSetups(array) {
    let scheduleSetups = [];
    let setups = 0;
    for (let i = 0; i < array.length; i++) {
        scheduleSetups.push(array[i]);

        if (array[i] > 0 && array[i + 1] > 0) {
            let element = JOBS.find(element => element[0] === array[i]);
            let nextElement = JOBS.find(nextElement => nextElement[0] === array[i + 1]);
            if (element[2] != nextElement[2]) {
                scheduleSetups.push(0);
                setups += 1;
            }
        }
    }
    return scheduleSetups;
}