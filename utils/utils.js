let puzzle;
let solution;
let agent;
let board;
let puzzleCanvas = document.createElement("canvas");    
let puzzleCtx = puzzleCanvas.getContext("2d");
let rowCanvas = document.createElement("canvas");   
let rowCtx = rowCanvas.getContext("2d");
let columnCanvas = document.createElement("canvas");
let columnCtx = columnCanvas.getContext("2d");
document.getElementById("puzzle").append(puzzleCanvas, rowCanvas, columnCanvas);
//Determine the size of the cells used for the puzzle
const cellSize = 50;
let cellHashmap = {};
function updateHTMLBoard(){
    //Board is basic 2D array
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            let hash = i+" "+j;
            let cell = cellHashmap[hash];
            if (board[i][j] == 0 || board[i][j] == -1){
                puzzleCtx.fillStyle = "white";
            }
            else if (board[i][j] == 1){
                puzzleCtx.fillStyle = "black";
            }
            puzzleCtx.fillRect(cell.x, cell.y, cellSize, cellSize);
            puzzleCtx.beginPath();
            puzzleCtx.lineWidth = "1";
            puzzleCtx.strokeStyle = "black";
            puzzleCtx.rect(cell.x, cell.y, cellSize, cellSize);
            puzzleCtx.stroke();
            // TODO: Change value to -1, 0 for now for debugging
            if (board[i][j] == -1){
                //30x30px for the X
                puzzleCtx.font = 44+"px Arial";
                puzzleCtx.fillStyle = "black";
                puzzleCtx.fillText("X", cell.x+10, cell.y+cellSize-10);
            }

        }
    }
}

function puzzleInitialize(){
    //Canavs element of the puzzle
    puzzleCanvas.height = puzzle.row.length * cellSize;
    puzzleCanvas.width = puzzle.column.length * cellSize;
    rowCanvas.height = puzzleCanvas.height;
    columnCanvas.width = puzzleCanvas.width;

    let constraintMaxLen = 0;
    columnCtx.font = "20px Arial";
    let charLen = columnCtx.measureText("1").width;
    puzzle.column.forEach(x => constraintMaxLen = Math.max(constraintMaxLen, charLen*((2*x.column.length)-1)));
    columnCanvas.height = constraintMaxLen + 20;
    columnCtx.lineWidth = "1";
    columnCtx.strokeStyle = "black";
    columnCtx.fillStyle = "black";
    for (let i = 0; i < puzzle.column.length; i++){
        columnCtx.beginPath();
        columnCtx.rect(i*cellSize, 0, cellSize, columnCanvas.height);
        columnCtx.stroke();
        columnCtx.font = "20px Arial";
        let currCol = puzzle.column[i].column
        for (let j = 0; j < currCol.length; j++){
            let value = currCol[j];
            columnCtx.fillText(""+value, 
                value>9? ((2*i+1)*cellSize-charLen)/2.0: ((2*i+1)*cellSize-(2*charLen))/2.0, 
                (j+1)*2*charLen + (constraintMaxLen-charLen*(2*currCol.length-1)));
        }
    }
    constraintMaxLen = 0;
    //Create boxes to display nonogram constraints for the rows
    rowCtx.font = "20px Arial";
    //Get longest txt length of the constraints
    for (let i = 0; i < puzzle.row.length; i++){
        let rowStr = "";
        puzzle.row[i].row.forEach(x => rowStr += x+" ");
        constraintMaxLen = Math.max(constraintMaxLen, rowCtx.measureText(rowStr).width);
    }
    rowCanvas.width = constraintMaxLen + 20;
    rowCtx.lineWidth = "1";
    rowCtx.strokeStyle = "black";
    rowCtx.fillStyle = "black";
    for (let i = 0; i < puzzle.row.length; i++){
        rowCtx.beginPath();
        rowCtx.rect(0, i*cellSize, rowCanvas.width, cellSize);
        rowCtx.stroke();
        rowCtx.font = "20px Arial";
        let rowStr = "";
        puzzle.row[i].row.forEach(x => rowStr += x+" ");
        let rowStrLen = rowCtx.measureText(rowStr).width;
        rowCtx.fillText(rowStr, 14 + (constraintMaxLen - rowStrLen), (i+1)*cellSize - 15);
    }

    puzzleCanvas.style.position = "absolute";
    puzzleCanvas.style.left = rowCanvas.width;
    puzzleCanvas.style.top = columnCanvas.height;
    rowCanvas.style.position = "absolute";
    rowCanvas.style.top = columnCanvas.height;
    columnCanvas.style.position = "absolute";
    columnCanvas.style.left = rowCanvas.width;

    //Initialize each puzzle cell to key of "x y", has x and y attribute of the canvas
    for (let i = 0; i < puzzle.row.length; i++){
        for (let j = 0; j < puzzle.column.length; j++){
            let hash = i+" "+j;
            let cell = {x: j*cellSize, y: i*cellSize};
            cellHashmap[hash] = cell;
            puzzleCtx.fillStyle="white";
            puzzleCtx.fillRect(cell.x, cell.y, cellSize, cellSize);
        }
    }
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms){
        end = new Date().getTime();
    }
}