class ForwardcheckingAgent extends Agent{
    constructor(puzzle){
        super(puzzle);
    }
    //Our constraints already don't allow certain values, but we can have a skip to prevent extra variable checks
    findSolution(){
        let hashSignal = [{continue: () => 0}];
        let recursiveForwardchecking = (i) => {
            if (i >= this.puzzle.row.length * this.puzzle.column.length){
                if (verifyPuzzle(revertPuzzle(this.puzzle), this.puzzle.board)){
                    return true;
                }
                window.requestAnimationFrame(hashSignal[i].continue);
                return false;
            }
            let hash = this.getIndexHash(i);
            let currValue = 1;
            let progress = () => {
                //wait(10000);
                //Changing value, remove current old restrictions on other variables
                this.variables[hash].dependents.forEach(x => {
                    let variable = this.variables[x];
                    variable.domain[1].restrict = variable.domain[1].restrict.filter(y => y !== hash);
                    variable.domain[-1].restrict = variable.domain[-1].restrict.filter(y => y !== hash);
                });
                this.variables[hash].dependents = [];

                if (!this.variables[hash].domain[currValue].valid()){
                    currValue = Math.min(-1*currValue, 0);
                    window.requestAnimationFrame(progress);
                    return;
                }
                this.setVariable(hash, currValue);
                this.setCount += 1;
                if (currValue == 0){
                    window.requestAnimationFrame(hashSignal[i].continue);
                    return;
                }
                currValue = Math.min(-1*currValue, 0);
                if (this.checkConstraints(hash)){
                    //Only 1 value will have impact on other variables
                    if (currValue*-1 == 1){
                        let rowIndex = parseInt(hash[0]);
                        let colIndex = parseInt(hash[2]);
                        let constraints = this.getCurrConstraints(hash);
                        if (constraints.row !== -1){
                            let currDependents = [];
                            for (let i = 0; i < constraints.row - 1; i++){
                                let dependentHash = rowIndex+" "+(colIndex+1+i);
                                this.variables[hash].dependents.push(dependentHash);
                                currDependents.push(dependentHash);
                            }
                            this.variables[hash].dependents.forEach(x => this.variables[x].domain[-1].restrict.push(hash));
                            if (colIndex+constraints.row < this.puzzle.column.length){
                                let dHash = rowIndex+" "+(colIndex+constraints.row);
                                this.variables[hash].dependents.push(dHash);
                                this.variables[dHash].domain[1].restrict.push(hash);
                            }
                        }
                        if (constraints.column !== -1){
                            let currDependents = [];
                            for (let i = 0; i < constraints.column - 1; i++){
                                let dependentHash = (rowIndex+1+i)+" "+colIndex;
                                this.variables[hash].dependents.push(dependentHash);
                                currDependents.push(dependentHash);
                            }
                            currDependents.forEach(x => this.variables[x].domain[-1].restrict.push(hash));
                            if (rowIndex+constraints.column < this.puzzle.row.length){
                                let dHash = (rowIndex+constraints.column)+" "+colIndex;
                                this.variables[hash].dependents.push(dHash);
                                this.variables[dHash].domain[1].restrict.push(hash);
                            }
                        }
                    }
                    recursiveForwardchecking(i+1);
                    return;
                }
                window.requestAnimationFrame(progress);
                return;
            }
            hashSignal[i+1] = {continue: progress};
            window.requestAnimationFrame(hashSignal[i+1].continue);
            return false;
        }
        recursiveForwardchecking(0);
        return this.puzzle.board;
    }
}