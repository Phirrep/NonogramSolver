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
                variable.constraints.push(() => this.checkConflict(puzzle.row[i].row, puzzle.row[i].get()));
                variable.constraints.push(() => this.checkConflict(puzzle.column[j].column, puzzle.column[j].get()));
            }
        }
    }
    //AI should fill values row by row, constraints make this assumption
    checkConflict(constraint, values){
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
        let x = parseInt(hash[0]);
        let y = parseInt(hash[2]);
        this.puzzle.board[x][y] = value;
    }
    getIndexHash(index){
        let row = Math.floor(index / this.puzzle.column.length);
        let column = index % this.puzzle.column.length;
        return row+" "+column;
    }
    getDomainNode(){
        let restricted = [];
        return {restrict: restricted, valid: () => restricted.length == 0};
    }
    checkConstraints(hash){
        return this.variables[hash].constraints.every(x => x());
    }
}