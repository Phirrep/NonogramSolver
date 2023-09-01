//Puzzle structure: Constraint for each row, constraint for each column
let puzzle1 = {row: [[1], [1, 1], []], column: [[1], [1], [1]]};
let solution1 = [
    [-1, 1, -1],
    [1, -1, 1],
    [-1, -1, -1]
];
console.log(verifyPuzzle(puzzle1, solution1)? "puzzle 1 is valid": "puzzle 1 is not valid");

let puzzle2 = {row: [[1, 1, 1], [5], [3], [1, 1], [3]], column: [[2], [4], [3, 1], [4], [2]]};
let solution2 = [
    [1, -1, 1, -1, 1],
    [1, 1, 1, 1, 1],
    [-1, 1, 1, 1, -1],
    [-1, 1, -1, 1, -1],
    [-1, 1, 1, 1, -1]
];
console.log(verifyPuzzle(puzzle2, solution2)? "puzzle 2 is valid": "puzzle 2 is not valid");
