
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let unit = 10;
let jobHeight = 35;
let jobsStartX = 85;
let jobsStartY = canvas.height - 75;
let machinesX = 45;
let machinesY = canvas.height - 75;
let borderRadius = 5;

function drawSchedule(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(75, 50, 800, canvas.height - 30);
    
    let jobX = jobsStartX;
    let jobY = jobsStartY;
    drawMachines(m, machinesX, machinesY);

    for (let i = 0; i < array.length; i++) {
        if(array[i] < 0) {
            jobX = jobsStartX;
            jobY -= 45;
            continue;
        }
        let element = JOBS.find(element => element[0] === array[i]);
        let nextElement = JOBS.find(nextElement => nextElement[0] === array[i+1]);
        drawJob(jobX, jobY, unit * element[1], jobHeight, borderRadius, element[0], element[2]);
        jobX += unit * element[1];
        if(nextElement) {
            if(element[2] != nextElement[2] && array[i+1] > 0) {
                drawSetup(jobX, jobY, 30, jobHeight, borderRadius);
                jobX += 30;
            }
        }
    }
    drawDue(d, jobsStartX, unit);
}

function drawJob(x, y, width, height, radius, number, family) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    switch(family) {
        case 1:
            ctx.fillStyle = "#016FB9";
          break;
        case 2:
            ctx.fillStyle = "#E9724C";
          break;
        case 3:
            ctx.fillStyle = "#F7B538";
          break;
        default:
            ctx.fillStyle = "#2A2B2A";
      }
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(number, x + width/2 - 6, y + height/2);
}

function drawSetup(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fillStyle = "#A20021";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText("S", x + width/2 - 6, y + height/2);
}

function drawAxes(xStart, yStart, xEnd, yEnd){
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xStart, yEnd);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
}

function drawMachines(n, x, yStart) {
    let machineY = yStart;
    for(let i = 0; i < n; i++) {
        drawMachine(x, machineY + jobHeight / 2, i + 1);
        machineY -= 45;
    }
}

function drawMachine(x, y, n) {
    ctx.font = "16px 'Karla'";
    ctx.fillStyle = "black";
    ctx.fillText("M" + n, x, y);
}

function drawTemperature(t, x, y){
    ctx.fillStyle = "black";
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillText("Temperature: " + t, x, y);
}

function drawIteration(i, x, y){
    ctx.fillStyle = "black";
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillText("Iteration: " + i, x, y);
}

function drawBestCost(cost, x, y){
    ctx.fillStyle = "black";
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillText("Best cost: " + cost, x, y);
}

function drawSolved(x, y){
    ctx.fillStyle = "limegreen";
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillText("SOLVED", x, y);
}

function drawStats(t, i, cost, x, y){
    ctx.clearRect(x, canvas.height - 25, canvas.width, canvas.height)
    drawTemperature(t, x, y);
    drawIteration(i, x + 350, y);
    drawBestCost(cost, x + 550, y);
}

function drawDue(x, jobsStartX, unit) {
    ctx.beginPath();
    ctx.moveTo(x * unit + jobsStartX, 10);
    ctx.lineTo(x * unit + jobsStartX, canvas.height - 10);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}