const targets = ["BUL", "BUR", "LUF", "RUF", "BDL", "BDR", "DFL", "DFR"];

const indices = {
    "BUL": [47, 0, 36], 
    "BUR": [45, 2, 11], 
    "LUF": [38, 6, 18], 
    "RUF": [9, 8, 20], 
    "BDL": [53, 33, 42], 
    "BDR": [51, 35, 17], 
    "DFL": [27, 24, 44], 
    "DFR": [29, 26, 15]
}

const angles = {
    "BUL": [-0.5235987755982988, 0.2094395102393195, 0], 
    "BUR": [-0.5235987755982988, -0.20943951023931956, 0], 
    "LUF": [-0.5235987755982988, -0.20943951023931956, 0], 
    "RUF": [-0.5235987755982988, 0.2094395102393195, 0], 
    "BDL": [0.20943951023931953, 0.20943951023931956, 0], 
    "BDR": [0.20943951023931953, -0.2094395102393195, 0], 
    "DFL": [-0.5235987755982988, 0.2094395102393195, 0], 
    "DFR": [-0.5235987755982988, -0.20943951023931956, 0]
};

const colors = {
    "U": "yellow",
    "D": "white",
    "R": "lime",
    "L": "blue",
    "F": "red",
    "B": "orange",
}

const cube = new Cube();
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let answerColor = "#555555";

let vc = new VisualCube(1200, 1200, 400, -0.523598, -0.209439, 0, 3, 0.08);
// vc.drawInside = true;

function genCase() {
    const selected = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selected.push(checkbox.value);
        }
    });
    // console.log(selected);

    let target = selected.length ? selected[Math.floor(Math.random() * selected.length)]: "DFR";

    cube.randomize();
    let cubeString = cube.asString();

    for (let i = 0; i < 54; ++i) {
        if (!indices[target].includes(i)) {
            cubeString = setCharAt(cubeString, i, "x");
        }
    }

    answerColor = colors[cubeString[indices[target][0]]]

    vc.thetaX = angles[target][0];
    vc.thetaY = angles[target][1];
    vc.thetaZ = angles[target][2];
    // vc.cubeString = cubeString;
    vc.drawCube(ctx);

    const answerContainer = document.getElementById("answerContainer");
    answerContainer.style.display = "none";
}

function showAnswer() {
    const answerContainer = document.getElementById("answerContainer");
    const square = document.getElementById("answer-rect");

    answerContainer.style.display = "flex"; // Display the answer container

    square.style.backgroundColor = answerColor;
}

document.addEventListener("DOMContentLoaded", function() {
    const resultDiv = document.getElementById('result');

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const answerContainer = document.getElementById("answerContainer");
    answerContainer.style.display = "none";

    vc.drawCube(ctx);

    
});

/*
"UUUUUUUUUR...F...D...L...B..."

U 0-8
R 9-17
F 18-26
D 27-35
L 36-44
B 45-53

             +------------+
             | U1  U2  U3 |
             |            |
             | U4  U5  U6 |
             |            |
             | U7  U8  U9 |
+------------+------------+------------+------------+
| L1  L2  L3 | F1  F2  F3 | R1  R2  R3 | B1  B2  B3 |
|            |            |            |            |
| L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |
|            |            |            |            |
| L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |
+------------+------------+------------+------------+
             | D1  D2  D3 |
             |            |
             | D4  D5  D6 |
             |            |
             | D7  D8  D9 |
             +------------+
*/