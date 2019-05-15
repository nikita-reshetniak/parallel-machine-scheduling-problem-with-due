let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let jobsInput = document.getElementById("jobs");
let machinesInput = document.getElementById("machines");
let solveBtn = document.getElementById("solve");
let stopBtn = document.getElementById("stop");
let TEMPERATURE = 0.1;
let ABSOLUTE_ZERO = 0.0001;
let COOLING_RATE = 0.999999;
let JOBS = [[0, 0]];
let n;
let m;
let MACHINES = [];
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
    var i = array.length;
    while (i--) {
        to[i] = [array[i][0],array[i][1]];
    }
}

function acceptanceProbability(current_cost, neighbor_cost) {
    if (neighbor_cost < current_cost){
        return 1;
    }
    return Math.exp((current_cost - neighbor_cost) / TEMPERATURE);
}

function init() {
    n = parseInt(jobsInput.value); 
    m = parseInt(machinesInput.value);
    let equallySplit = Math.floor(n / m);
    let k = 0;

    for (let i = 0; i < n; i++) {
        JOBS[i] = [getRndInteger(1, 10), i + 1];
    }

    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < equallySplit; j++) {
            schedule.push(JOBS[k]);
            k++;
        }
        schedule.push([-1, -1]);
    }

    for (k; k < n; k++) {
        schedule.push(JOBS[k]);
    }

    deep_copy(schedule, best);
    best_cost = getCost(best);
    drawSchedule(best);
    startInterval = setInterval(solve, 10);
}

function getCost(array){
    let cost = [];
    let machine = 0;

    for (let i = 0; i < m; i++) {
        cost[i] = 0;
    }

    for(let i = 0; i < array.length; i++){
        if(array[i][0] < 0){
            machine++;
            continue;
        }

        cost[machine] += array[i][0];
    }
    return Math.max(...cost);
}

function solve() {
    if (TEMPERATURE > ABSOLUTE_ZERO) {
        let current_cost = getCost(schedule);
        // let k = getRndInt(n+m-1);
        // let l = (k+1 + getRndInt(n-1+m)) % n+m-1;
        // if (k > l) {
        //     let tmp = k;
        //     k = l;
        //     l = tmp;
        // }
        // let neighbor = mutate2Opt(schedule, k, l);

        let neighbor = mutate(schedule);
        let neighbor_cost = getCost(neighbor);
        if (Math.random() < acceptanceProbability(current_cost, neighbor_cost)) {
            deep_copy(neighbor, schedule);
            current_cost = getCost(schedule);
        }
        // drawSchedule(schedule);
        if (current_cost < best_cost) {
            deep_copy(schedule, best);
            best_cost = current_cost;
            drawSchedule(best);
        }
        TEMPERATURE *= COOLING_RATE;
        // console.log(best_cost);
        // console.log(current_cost);
    } else {
        clearInterval(startInterval);
        console.log("Solved")   
    }
}

function mutate(array) {
    let neighbor = [];
    deep_copy(array, neighbor);

    let k = getRndInt(n);
    let l = getRndInt(n);

    while(k == l){
        l = getRndInt(n);
    }
    let t = neighbor[k];
    neighbor[k] = neighbor[l];
    neighbor[l] = t;
    return neighbor;
}

// function mutate2Opt(route, i, j) {
//     var neighbor = [];
//     deep_copy(route, neighbor);
//     while (i != j) {
//         var t = neighbor[j];
//         neighbor[j] = neighbor[i];
//         neighbor[i] = t;

//         i = (i + 1) % n+m-1;
//         if (i == j)
//             break;
//         j = (j - 1 + n+m-1) % n+m-1;
//     }
//     return neighbor;
// }