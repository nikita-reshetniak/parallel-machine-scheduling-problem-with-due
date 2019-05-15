
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
    let machine = 1;

    for (let i = 0; i < array.length; i++) {
        if(array[i][0] < 0) {
            jobX = startX;
            jobY -= 45;
            machine++;
            continue;
        }
        drawMachines(startX - 40, jobY + height / 2, machine);
        drawJob(jobX, jobY, unit * array[i][0], height, radius, array[i][1]);
        jobX += unit * array[i][0] + 5;
    }
}

function drawJob(x, y, width, height, radius, number) {
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
    ctx.fillStyle = "#0074D9";
    ctx.fill();
    ctx.font = "16px 'Karla'";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white" //"#B3DBFF";
    ctx.fillText(number, x + width/2 - 6, y + height/2);
}

function drawAxes(){
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(75, canvas.height - 30);
    ctx.lineTo(600, canvas.height - 30);
    ctx.stroke();
}

function drawMachines(x, y, n) {
    ctx.font = "16px 'Karla'";
    ctx.fillStyle = "black";
    ctx.fillText("M" + n, x, y);
}