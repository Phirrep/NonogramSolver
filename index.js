function initialize(){
    let samplePuzzle = document.getElementById("samplePuzzle").value;
    switch(samplePuzzle){
        case "puzzle1":
            puzzle = puzzle1;
            solution = solution1;
            break;
        case "puzzle2":
            puzzle = puzzle2;
            solution = solution2;
            break;
    }
    puzzle = createPuzzle(puzzle);
    board = puzzle.board;
    let agentSelect = document.getElementById("agent").value;
    switch(agentSelect){
        case "backtracking":
            agent = new BacktrackingAgent(puzzle);
            break;
        case "forwardchecking":
            agent = new ForwardcheckingAgent(puzzle);
            break;
    }
    puzzleInitialize();
    agent.findSolution();
    updateHTMLBoard();
}