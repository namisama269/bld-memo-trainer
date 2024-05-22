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

const restrictedMemoStickerIndices = [
    38, // LUF
    40, // L center
    13, // R center
    47, // BUL
    45, // BUR
    53, // BDL
    51, // BDR
    49, // B center
    27, // DFL
    29, // DFR
    31, // D center
]


Cube.initSolver();
const cube = new Cube();
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let vc = new VisualCube(1200, 1200, 360, -0.523598, -0.209439, 0, 3, 0.08);
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
    // console.log(cubeString);

    let solveString = cube.solve();
    console.log(reverseRubiksMoves(solveString));

    vc.cubeString = cubeString;
    // vc.drawCube(ctx);

    handleCheckboxToggle() 
}

document.addEventListener("DOMContentLoaded", function() {
    const resultDiv = document.getElementById('result');

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    vc.drawCube(ctx);

    
});


function isRestrictedMemoChecked() {
    const restrictedMemoCheckbox = document.getElementById('restrictedMemo');
    return restrictedMemoCheckbox.checked;
}

function handleCheckboxToggle() {
    const useRestrictedMemo = isRestrictedMemoChecked();
    // console.log('Restricted Memo Toggled:', useRestrictedMemo);
    if (useRestrictedMemo) {
        restrictedMemoStickerIndices.forEach((index) => { 
            vc.cubeString = setCharAt(vc.cubeString, index, 'r');
        });
        // vc.cubeString = "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr";
    } else {
        vc.cubeString = cube.asString();
    }
    // console.log(vc.cubeString);
    vc.drawCube(ctx);
}

function doEdgeComm() {
    let inputText = document.getElementById('edgeMemo').value;
    let targets = inputText.split(" ");
    let buffer = targets[0];
    let target1 = targets[1];
    let target2 = targets[2];
    cube.move(generate3BLDEdge3CycleAlg(buffer, target1, target2));
    vc.cubeString = cube.asString();
    vc.drawCube(ctx);
}

function doCornerComm() {
    let inputText = document.getElementById('cornerMemo').value;
    let targets = inputText.split(" ");
    let buffer = targets[0];
    let target1 = targets[1];
    let target2 = targets[2];
    cube.move(generate3BLDCorner3CycleAlg(buffer, target1, target2));
    vc.cubeString = cube.asString();
    vc.drawCube(ctx);
}

function doEO() {
    let inputText = document.getElementById('EOMemo').value;
    let edges = inputText.split(" ");
    cube.move(generateEOAlg(edges));
    vc.cubeString = cube.asString();
    vc.drawCube(ctx);
}

function doCO() {
    let inputText = document.getElementById('COMemo').value;
    let corners = inputText.split(" ");
    cube.move(generateCOAlg(corners));
    vc.cubeString = cube.asString();
    vc.drawCube(ctx);
}

function doParity() {
    let inputText = document.getElementById('parityMemo').value;
    let targets = inputText.split(" ");
    let edge1 = targets[0];
    let edge2 = targets[1];
    let corner1 = targets[2];
    let corner2 = targets[3];
    cube.move(generateParityAlg(edge1, edge2, corner1, corner2));
    vc.cubeString = cube.asString();
    vc.drawCube(ctx);
}


const restrictedMemoCheckbox = document.getElementById('restrictedMemo');
restrictedMemoCheckbox.addEventListener('change', handleCheckboxToggle);


