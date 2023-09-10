class Agent{
    constructor(puzzle){
        //Domain is -1 for can't be filled, 1 for fill, 0 for not filled at all/empty
        this.puzzle = puzzle;
        //Max size of between rows and columns
        this.maxRowLen = 0;
        this.maxColumnLen = 0;
        puzzle.row.forEach(x => this.maxRowLen = Math.max(this.maxRowLen, x.length));
        puzzle.column.forEach(x => this.maxColumnLen = Math.max(this.maxColumnLen, x.length));
        //Implement hashmap for variables for easier constraint checking
        //Order should be first row, first column => first row, last column => last row, first column => last row, last column
        this.variables = {};
        for (let i = 0; i < puzzle.row.length; i++){
            for (let j = 0; j < puzzle.column.length; j++){
                let hash = i+" "+j;
                this.variables[hash] = {value: 0, constraints: [], domain: {}};
                let variable = this.variables[hash];
                variable.domain[1] = this.getDomainNode();
                variable.domain[-1] = this.getDomainNode();
                variable.domain[0] = this.getDomainNode();
                variable.dependents = [];
                /* variable.constraints.push(() => this.checkConflict(puzzle.row[i].row, puzzle.row[i].get()));
                variable.constraints.push(() => this.checkConflict(puzzle.column[j].column, puzzle.column[j].get())); */
                variable.constraints.push(() => {
                    let convertBoard = getPuzzleFromSolution(puzzle.board);
                    /* console.log(convertBoard); */
                    for (let i = 0; i < puzzle.row.length; i++){
                        if (this.reduceMax(convertBoard.row[i]) > this.reduceMax(puzzle.row[i].row)){
                            return false;
                        }
                    }
                    for (let i = 0; i < puzzle.column.length; i++){
                        if (this.reduceMax(convertBoard.column[i]) > this.reduceMax(puzzle.column[i].column)){
                            return false;
                        }
                    }
                    return true;
                });
                variable.constraints.push(() => {
                    let convertBoard = getPuzzleFromSolution(puzzle.board);
                    if (convertBoard.row.some((x, i) => x.length > this.puzzle.row[i].row.length)){
                        return false;
                    }
                    if (convertBoard.column.some((x, i) => x.length > this.puzzle.column[i].column.length)){
                        return false;
                    }
                    return true;
                });
            }
        }
        this.setCount = 0;
    }
    //AI should fill values row by row, constraints make this assumption
    checkConflict(constraint, values){
        console.log("checking conflict");
        console.log(constraint);
        console.log(values);
        let mismatch = false;
        for (let i = 0; i < values.length; i++){
            if (values[i] == constraint){
                continue;
            }
            else{
                if (mismatch){
                    return false;
                }
            }
        }
        return true;
    }
    setVariable(hash, value){
        let x = this.getHashRow(hash);
        let y = this.getHashCol(hash);
        this.puzzle.board[x][y] = value;
        updateHTMLBoard();
    }
    getIndexHash(index){
        let row = Math.floor(index / this.puzzle.column.length);
        let column = index % this.puzzle.column.length;
        return row+" "+column;
    }
    getDomainNode(){
        let node = {restrict: []};
        node.valid = () => node.restrict.length == 0;
        return node;
    }
    checkConstraints(hash){
        return this.variables[hash].constraints.every(x => x());
    }
    reduceMax(arr){
        let lowMax = -1 * Math.max(this.puzzle.row.length, this.puzzle.column.length) - 1;
        return arr.reduce((acc, e) => Math.max(acc, e), lowMax);
    }
    //Returns current constraints for row and column
    //TODO: Redefine, flawed function
    getCurrConstraints(hash){
        let constraints = {row: 0, column: 0};
        let rowIndex = this.getHashRow(hash);
        let colIndex = this.getHashCol(hash);
        let currBoard = getPuzzleFromSolution(this.puzzle.board);
        let puzzleRow = this.puzzle.row[rowIndex].row;
        for (let i = 0; i < puzzleRow.length; i++){
            if (currBoard.row[rowIndex][i] == 1){
                constraints.row = puzzleRow[i];
                break;
            }
            //Mismatched values, row has yet to be set
            else {
                constraints.row = -1;
                break;
            }
        }
        let puzzleCol = this.puzzle.column[colIndex].column;
        for (let i = 0; i < puzzleCol.length; i++){
            if (currBoard.column[colIndex][i] == 1){
                constraints.column = puzzleCol[i];
                break;
            }
            else {
                constraints.column = -1;
                break;
            }
        }
        return constraints;
    }
    getHashRow(hash){
        let spaceIndex = 0;
        while (hash[spaceIndex] != " "){
            spaceIndex += 1;
        }
        let currRow = 0;
        for (let i = 0; i < spaceIndex; i++){
            currRow *= 10;
            currRow += parseInt(hash[i]);
        }
        return currRow;
    }
    getHashCol(hash){
        let spaceIndex = 0;
        while (hash[spaceIndex] != " "){
            spaceIndex += 1;
        }
        let currCol = 0;
        for (let i = spaceIndex+1; i < hash.length; i++){
            currCol *= 10;
            currCol += parseInt(hash[i]);
        }
        return currCol;
    }
}