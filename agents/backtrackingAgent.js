class BacktrackingAgent extends Agent{
    constructor(puzzle){
        super(puzzle);
    }
    findSolution(){
        let hashSignal = [{continue: () => 0}];
        let recursiveBacktracking = (i) => {
            if (i >= this.puzzle.column.length * this.puzzle.row.length){
                return verifyPuzzle(revertPuzzle(this.puzzle), this.puzzle.board);
            }
            let hash = this.getIndexHash(i);
            this.setVariable(hash, 1);
            if (this.checkConstraints(hash)){
                if (recursiveBacktracking(i+1)){
                    return true;
                }
            }
            this.setVariable(hash, -1);
            if (this.checkConstraints(hash)){
                if (recursiveBacktracking(i+1)){
                    return true;
                }
            }
            this.setVariable(hash, 0);
            return false;
        }
        recursiveBacktracking(0);
        return this.puzzle.board;
    }
}