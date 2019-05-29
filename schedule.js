
let unit = 10;
let height = 35;
let startX = 85;
let startY = canvas.height - 75;
let radius = 5;

function drawSchedule(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    
    let jobX = startX;
    let jobY = startY;
    drawMachines(m);

    for (let i = 0; i < array.length; i++) {
        if(array[i] < 0) {
            jobX = startX;
            jobY -= 45;
            continue;
        }
        let element = JOBS.find(element => element[0] === array[i]);
        let nextElement = JOBS.find(nextElement => nextElement[0] === array[i+1]);
        drawJob(jobX, jobY, unit * element[1] /* * element[2]*/, height, radius, element[0], element[2]);
        jobX += unit * element[1]; //* element[2];
        if(nextElement) {
            if(element[2] != nextElement[2] && array[i+1] > 0) {
                drawSetup(jobX, jobY, 30, height, radius);
                jobX += 30;
            }
        }
    }
    drawD(d, unit);
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

function drawAxes(){
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(75, canvas.height - 30);
    ctx.lineTo(600, canvas.height - 30);
    ctx.stroke();
}

function drawMachines(n) {
    let mY = startY;
    for(let i = 0; i < n; i++) {
        drawMachine(startX - 40, mY + height / 2, i + 1);
        mY -= 45;
    }
}

function drawMachine(x, y, n) {
    ctx.font = "16px 'Karla'";
    ctx.fillStyle = "black";
    ctx.fillText("M" + n, x, y);
}

function drawTemperature(){
    ctx.clearRect(0, canvas.height - 20, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillText("Temperature: " + TEMPERATURE, 0, canvas.height - 10);
}

function drawD(x, unit) {
    ctx.beginPath();
    ctx.moveTo(x * unit + startX, 10);
    ctx.lineTo(x * unit + startX, canvas.height - 10);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}