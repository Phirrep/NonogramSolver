//Return new structure where each row points to respective board values and has rule set for that row
//puzzle: {row: {row: Int[], get: () => Int[]}, column: {column: Int[], get: () => Int[]}, board: Int[][]}
//Each puzzle has row attr, has the row's constraints and get function to retrieve board, same w column
function createPuzzle(puzzle){
    let newPuzzle = {row: [], column: [], board: []};
    let board = newPuzzle.board;
    for (let i = 0; i < puzzle.row.length; i++){
        let boardRow = [];
        for (let j = 0; j < puzzle.column.length; j++){
            boardRow.push(0);
        }
        board.push(boardRow);
        let getRow = function(){
            let row = [];
            for (let x = 0; x < puzzle.column.length; x++){
                row.push(board[i][x]);
            }
            return row;
        }
        let newRow = {row: puzzle.row[i], get: getRow};
        newPuzzle.row.push(newRow);
    }
    for (let i = 0; i < puzzle.column.length; i++){
        let getColumn = function(){
            let column = [];
            for (let x = 0; x < puzzle.row.length; x++){
                column.push(board[x][i]);
            }
            return column;
        }
        newPuzzle.column.push({column: puzzle.column[i], get: getColumn});
    }
    return newPuzzle;
}
//Reverts new puzzle structure back to old one
function revertPuzzle(puzzle){
    let oldPuzzle = {row: [], column: []};
    puzzle.row.forEach(x => oldPuzzle.row.push(x.row));
    puzzle.column.forEach(x => oldPuzzle.column.push(x.column));
    return oldPuzzle;
}


//Returns structure from array of solutions, can take current board structure (int[][])
function getPuzzleFromSolution(solution){
    //Create rows
    let newSolution = {row: [], column: []};
    //Iterate through solution rows and create structure
    for (let i = 0; i < solution.length; i++){
        let newRow = [];
        let currValue = 0;
        for (let j = 0; j < solution[i].length; j++){
            //Empty space
            if (solution[i][j] == -1){
                newRow.push(currValue);
                currValue = 0;
            }
            else if (solution[i][j] == 1){
                currValue += 1;
            }
            else if (solution[i][j] !== 0) {
                console.log("invalid value in solution");
            }
        }
        newRow.push(currValue);
        newRow = newRow.filter(x => x != 0);
        newSolution.row.push(newRow);
    }
    //Iterate through columns
    for (let i = 0; i < solution[0].length; i++){
        let newColumn = [];
        let currValue = 0;
        for (let j = 0; j < solution.length; j++){
            if (solution[j][i] == -1){
                newColumn.push(currValue);
                currValue = 0;
            }
            else if (solution[j][i] == 1){
                currValue += 1;
            }
            else if (solution[j][i] !== 0){
                console.log("invalid value in solution");
            }
        }
        newColumn.push(currValue);
        newColumn = newColumn.filter(x => x != 0);
        newSolution.column.push(newColumn);
    }
    return newSolution;
}

function verifyPuzzle(puzzle, solution){
    let rows = puzzle.row;
    let columns = puzzle.column;
    //Row cannot fail constraint where (total colored) + gaps cannot exceed number of columns and v. versa
    if (rows.some(x => x.reduce((acc, e) => acc+e, 0) + x.length - 1 > columns.length)){
        console.log("row constraint is invalid");
        return false;
    }
    if (columns.some(x => x.reduce((acc, e) => acc+e, 0) + x.length - 1> rows.length)){
        console.log("column constraint is invalid");
        return false;
    }
    //Compare solution to puzzle
    let newSolution = getPuzzleFromSolution(solution);
    if (newSolution.row.length != puzzle.row.length || newSolution.column.length != puzzle.column.length){
        console.log("rows and columns don't match for puzzle and solution");
        return false;
    }
    for (let i = 0; i < newSolution.row.length; i++){
        let solutionRow = newSolution.row[i];
        if (solutionRow.length != rows[i].length){
            /* console.log("length of solution row don't match puzzle row"); */
            return false;
        }
        for (let j = 0; j < solutionRow.length; j++){
            if (solutionRow[j] != rows[i][j]){
                /* console.log("solution value doesn't match constraint value"); */
                return false;
            }
        }
    }
    for (let i = 0; i < newSolution.column.length; i++){
        let solutionColumn = newSolution.column[i];
        if (solutionColumn.length != columns[i].length){
            /* console.log("length of solution column don't match puzzle column"); */
            return false;
        }
        for (let j = 0; j < solutionColumn.length; j++){
            if (solutionColumn[j] != columns[i][j]){
                /* console.log("solution value doesn't match cosntraint value"); */
                return false;
            }
        }
    }
    return true;
}

//Clones puzzle
function puzzleClone(puzzle){
    let newPuzzle = {row: [], column: []};
    let rows = puzzle.row;
    let columns = puzzle.column;
    for (let i = 0; i < rows.length; i++){
        newPuzzle.row.push([]);
        for (let j = 0; j < rows[i].length; j++){
            newPuzzle.row[i].push(rows[i][j]);
        }
    }
    for (let i = 0; i < columns.length; i++){
        newPuzzle.column.push([]);
        for (let j = 0; j < columns[i].length; j++){
            newPuzzle.column[i].push(columns[i][j]);
        }
    }
    return newPuzzle;
}
//Clones board
function boardClone(board){
    let newBoard = [];
    for (let i = 0; i < board.length; i++){
        newBoard.push([]);
        for (let j = 0; j < board[i].length; j++){
            newBoard[i].push(board[i][j]);
        }
    }
    return newBoard;
}