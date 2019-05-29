let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let jobsInput = document.getElementById("jobs");
let machinesInput = document.getElementById("machines");
let dueDateInput = document.getElementById("dueDate");
let solveBtn = document.getElementById("solve");
let stopBtn = document.getElementById("stop");
let TEMPERATURE = 10000; //0.1;
let ABSOLUTE_ZERO = 0; //0.0001;
let COOLING_RATE = 1; //0.999999;
let JOBS = [[0, 0, 0]];
let n;
let m;
//let MACHINES = [];
let schedule = [];
let best = [];
let best_cost = 0;
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

function acceptanceProbability(current_cost, neighbor_cost) {
    if (neighbor_cost < current_cost){
        return 1;
    }
    return Math.exp((current_cost - neighbor_cost) / (TEMPERATURE * 0.00001));
}

function init() {
    getInputValues();

    createJobs(n);
    firstSchedule(m);
    best = [...schedule];
    best_cost = getCost(createScheduleSetups(best));
    drawSchedule(best);
    startInterval = setInterval(solve, 10);
}

function getCost(array){
    let criterion = 0;
    let line = 0;

    // for(let i = 0; i < array.length; i++){
    //     if(array[i] < 0){
    //         continue;
    //     }
    //     if(array[i] == 0){
    //         criterion += 3;
    //         continue;    
    //     }
    //     let element = JOBS.find(element => element[0] === array[i]);
    //     criterion += element[1]*element[2];
    //     //cost[machine] += element[1];
    // }
    // return criterion;

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
    if (TEMPERATURE > ABSOLUTE_ZERO) {
        let current_cost = getCost(createScheduleSetups(schedule));

        let neighbor = mutate(schedule);
        let neighbor_cost = getCost(createScheduleSetups(neighbor));
        if (Math.random() < acceptanceProbability(current_cost, neighbor_cost)) {
            schedule = [...neighbor];
            //deep_copy(neighbor, schedule);
            current_cost = getCost(createScheduleSetups(schedule));
        }

        if (current_cost < best_cost) {
            best = [...schedule];
            //deep_copy(schedule, best);
            best_cost = current_cost;
            console.log(best_cost);
            drawSchedule(best);
        }

        drawTemperature();
        TEMPERATURE -= COOLING_RATE;
        
    } else {
        clearInterval(startInterval);
        console.log("Solved")   
    }
}

function mutate(array) {
    let neighbor = [];
    neighbor = [...array];
    //deep_copy(array, neighbor);

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

function createJobs(n){
    for (let i = 0; i < n; i++) {
        JOBS[i] = [i + 1, getRndInteger(3, 10), getRndInteger(1, 3)];
    }
}

function firstSchedule(machines) {
    for (let i = 0; i < JOBS.length; i++) {
            schedule.push(JOBS[i][0]);
        }
    for (let i = 0; i < machines - 1; i++){
        schedule.push(-1);
    }
}

function createScheduleSetups(array) {
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
    //console.log(setups);
    return scheduleSetups;
}