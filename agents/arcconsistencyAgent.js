class ArcconsistencyAgent extends Agent{
    constructor(puzzle){
        super(puzzle);
        this.projectedBoard = {};
        for (let hash in this.variables){
            this.projectedBoard[hash] = 0;    
        }
    }
    findSolution(){
        let hashSignal = [{continue: () => 0}];
        let recursiveArcconsistency = (i) => {
            if (i >= this.puzzle.row.length * this.puzzle.column.length){
                if (verifyPuzzle(revertPuzzle(this.puzzle), this.puzzle.board)){
                    return true;
                }
                window.requestAnimationFrame(hashSignal[i].continue);
                return;
            }
            let hash = this.getIndexHash(i);
            let currValue = 1;
            let progress = () => {
                /* console.log(hash);
                console.log(this.variables[hash].domain); */
                this.variables[hash].dependents.forEach(x => {
                    let variable = this.variables[x];
                    variable.domain[1].restrict = variable.domain[1].restrict.filter(y => y !== hash);
                    variable.domain[-1].restrict = variable.domain[-1].restrict.filter(y => y !== hash);
                });
                this.variables[hash].dependents = [];
                if (!this.variables[hash].domain[currValue].valid()){
                    //console.log("skipping value: " + currValue + " for " + hash);
                    currValue = Math.min(currValue * -1, 0);
                    window.requestAnimationFrame(progress);
                    return;
                }
                this.setVariable(hash, currValue);
                this.setCount += 1;
                if (currValue == 0){
                    window.requestAnimationFrame(hashSignal[i].continue);
                    return;
                }
                currValue = Math.min(currValue * -1, 0);
                if (this.checkConstraints(hash)){
                    if (currValue * -1 == 1){
                        let rowIndex = this.getHashRow(hash);
                        let colIndex = this.getHashCol(hash);
                        let constraints = this.getCurrConstraints(hash);
                        //If row constraints are filled out, make sure remaining row is -1
                        if (this.checkFilledRow(rowIndex)){
                            /* console.log(hash);
                            console.log("filled row"); */
                            for (let i = colIndex+1; i < this.puzzle.column.length; i++){
                                let dHash = rowIndex+" "+i;
                                this.variables[dHash].domain[1].restrict.push(hash);
                                this.variables[hash].dependents.push(dHash);
                                if (!this.variables[dHash].domain[-1].valid()){
                                    window.requestAnimationFrame(progress);
                                    return;
                                }
                            }
                        }
                        if (constraints.row != -1){
                            if (constraints.row + colIndex > this.puzzle.column.length){
                                window.requestAnimationFrame(progress);
                                return;
                            }
                            let currDependents = [];
                            for (let i = 0; i < constraints.row-1; i++){
                                let dependentHash = rowIndex+" "+(colIndex+i+1);
                                console.log("forcing 1 on " + dependentHash + " from " + hash);
                                this.variables[hash].dependents.push(dependentHash);
                                this.variables[dependentHash].domain[-1].restrict.push(hash);
                                currDependents.push(dependentHash);
                            }
                            //Check if any variables have empty domains (can't be 1 or -1) 
                            if (currDependents.some(x => this.checkInconsistent(x))){
                                window.requestAnimationFrame(progress);
                                return;
                            }
                            if (constraints.row + colIndex < this.puzzle.column.length){
                                let dHash = rowIndex+" "+(colIndex+constraints.row);
                                this.variables[hash].dependents.push(dHash);
                                this.variables[dHash].domain[1].restrict.push(hash);
                                //Check if variable getting restrict to -1 is inconsistent
                                if (this.checkInconsistent(dHash)){
                                    window.requestAnimationFrame(progress);
                                    return;
                                }
                            }
                        }
                        if (this.checkFilledColumn(colIndex)){
                            for (let i = rowIndex+1; i < this.puzzle.row.length; i++){
                                let dHash = i+" "+colIndex;
                                this.variables[dHash].domain[1].restrict.push(hash);
                                this.variables[hash].dependents.push(dHash);
                                if (!this.variables[dHash].domain[-1].valid()){
                                    window.requestAnimationFrame(progress);
                                    return;
                                }
                            }
                        }
                        if (constraints.column != -1){
                            if (constraints.column + rowIndex > this.puzzle.row.length){
                                window.requestAnimationFrame(progress);
                                return;
                            }
                            let currDependents = [];
                            for (let i = 0; i < constraints.column-1; i++){
                                let dependentHash = (rowIndex+i+1)+" "+colIndex;
                                this.variables[hash].dependents.push(dependentHash);
                                currDependents.push(dependentHash);
                            }
                            currDependents.forEach(x => {
                                this.variables[x].domain[-1].restrict.push(hash);
                            });
                            if (currDependents.some(x => this.checkInconsistent(x))){
                                window.requestAnimationFrame(progress);
                                return;
                            }
                            if (constraints.column + rowIndex < this.puzzle.row.length){
                                let dHash = (rowIndex+constraints.column)+" "+colIndex;
                                this.variables[hash].dependents.push(dHash);
                                this.variables[dHash].domain[1].restrict.push(hash);
                                if (this.checkInconsistent(dHash)){
                                    window.requestAnimationFrame(progress);
                                    return;
                                }
                            }
                        }

                    }
                    //Everything returned fine, no inconsistent arcs
                    recursiveArcconsistency(i+1);
                    return;
                }
                window.requestAnimationFrame(progress);
                return;
            };
            hashSignal[i+1] = {continue: progress};
            window.requestAnimationFrame(hashSignal[i+1].continue);
            return;
        };
        recursiveArcconsistency(0);
        return this.puzzle.board;
    }
    //Returns if both 1 and -1 are restrict
    checkInconsistent(hash){
        let variable = this.variables[hash];
        return !variable.domain[1].valid() && !variable.domain[-1].valid();
    }
    //Returns whether or not the current row's constraints have been filled
    checkFilledRow(rowIndex){
        let boardRow = getPuzzleFromSolution(this.puzzle.board).row[rowIndex];
        let puzzleRow = this.puzzle.row[rowIndex].row;
        if (boardRow.length != puzzleRow.length){
            return false;
        }
        for (let i = 0; i < boardRow.length; i++){
            if (boardRow[i] != puzzleRow[i]){
                return false;
            }
        }
        return true;
    }
    checkFilledColumn(colIndex){
        let boardColumn = getPuzzleFromSolution(this.puzzle.board).column[colIndex];
        let puzzleColumn = this.puzzle.column[colIndex].column;
        if (boardColumn.length != puzzleColumn.length){
            return false;
        }
        for (let i = 0; i < boardColumn.length; i++){
            if (boardColumn[i] != puzzleColumn[i]){
                return false;
            }
        }
        return true;
    }
    setVariable(hash, value){
        let x = this.getHashRow(hash);
        let y = this.getHashCol(hash);
        this.projectedBoard[hash] = value;
        this.puzzle.board[x][y] = value;
        updateHTMLBoard();
    }
    updateProjected(){
        for (let hash in this.projectedBoard){
            if (!(this.variables[hash].domain[-1]).valid()){
                this.projectedBoard[hash] = 1;
            }
            else if (!(this.variables[hash].domain[1]).valid()){
                this.projectedBoard[hash] = -1;
            }
            else {
                this.projectedBoard[hash] = 0;
            }
        }
    }
    checkProjected(){
        
        return true;
    }
}