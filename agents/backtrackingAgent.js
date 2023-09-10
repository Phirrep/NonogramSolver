class BacktrackingAgent extends Agent{
    constructor(puzzle){
        super(puzzle);
    }
    findSolution(){
        let hashSignal = [{continue: () => 0}];
        let recursiveBacktracking = (i) => {
            if (i >= this.puzzle.column.length * this.puzzle.row.length){
                if (verifyPuzzle(revertPuzzle(this.puzzle), this.puzzle.board)){
                    return true;
                }
                window.requestAnimationFrame(hashSignal[i].continue);
                return false;
            }
            let hash = this.getIndexHash(i);
            let currValue = 1;
            let progress = () => {
                //wait(10);
                this.setVariable(hash, currValue);
                this.setCount += 1;
                if (currValue == 0){
                    window.requestAnimationFrame(hashSignal[i].continue);
                    return false;
                }
                currValue = Math.min(currValue*-1, 0);  //1 => -1 => 0
                if (this.checkConstraints(hash)){
                    recursiveBacktracking(i+1);
                    return;
                }
                window.requestAnimationFrame(progress);
                return;
            }
            hashSignal[i+1] = {continue: progress};
            window.requestAnimationFrame(hashSignal[i+1].continue);
            return false;
        }
        recursiveBacktracking(0);
        return this.puzzle.board;
    }
}