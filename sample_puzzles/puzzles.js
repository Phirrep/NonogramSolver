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

//arr: int[][]
function arrayJoin(arr){
    let currArr = [];
    arr.forEach(x => {
        x.forEach(y => currArr.push(y));
    });
    return currArr;
}

let puzzle3 = {row: [[7], [11], [3, 3], [3, 3], [4, 2], 
                    [3, 2], [2, 1, 2], [3, 6, 1], [2, 2, 1, 2], [1, 1, 6, 1], 
                    [2, 2, 1, 2], [3, 2, 2, 2], [3, 2, 4, 1, 1], [2, 4, 1, 1, 2, 2, 1], [2, 12, 2, 1],
                    [1, 1, 15, 1], [1, 2, 2, 6, 2, 1], [5, 5, 1, 1], [4, 5, 3], [3, 6, 2],
                    [3, 1, 5, 1], [2, 1, 2, 2, 2], [1, 5, 1, 2], [1, 5, 1, 2], [7, 1, 2]],

            column: [[6, 6, 7], [6, 4, 5, 1], [4, 1, 3, 5, 3], [3, 2, 4, 4], [2, 1, 3],
                    [1, 2, 4], [2, 2, 1, 6], [2, 6, 3], [2, 12], [2, 12],
                    [2, 7], [2, 2, 8], [2, 1, 4, 5], [2, 1, 3, 3], [2, 3, 1, 2],
                    [2, 9], [1, 1, 1, 2, 2], [2, 2, 1, 2], [2, 1, 1, 1], [2, 2, 3],
                    [3, 3], [2, 2, 2], [2, 1, 4], [2, 2], [6]]};
let solution3 = [
    arrayJoin([Array(6).fill(-1), Array(7).fill(1), Array(12).fill(-1)]),
    arrayJoin([Array(4).fill(-1), Array(11).fill(1), Array(10).fill(-1)]),
    arrayJoin([[-1, -1], [1, 1, 1], Array(8).fill(-1), [1, 1, 1], Array(9).fill(-1)]),
    arrayJoin([[-1], [1, 1, 1], Array(11).fill(-1), [1, 1, 1], Array(7).fill(-1)]),
    arrayJoin([Array(4).fill(1), Array(13).fill(-1), [1, 1], Array(6).fill(-1)]),

    arrayJoin([[1, 1, 1], Array(15).fill(-1), [1, 1], Array(5).fill(-1)]),
    arrayJoin([[1, 1], Array(9).fill(-1), [1], Array(7).fill(-1), [1, 1], Array(4).fill(-1)]),
    arrayJoin([[1, 1, 1], Array(8).fill(-1), Array(6).fill(1), [-1, -1, -1], [1], Array(4).fill(-1)]),
    arrayJoin([[1, 1], Array(12).fill(-1), [1, 1], [-1], [1], [-1], [1, 1], Array(4).fill(-1)]),
    arrayJoin([[1], [-1, -1], [1], Array(10).fill(-1), Array(6).fill(1), [-1], [1], [-1, -1, -1]]),

    arrayJoin([[-1, -1], [1, 1], [-1, -1, -1], [1, 1], Array(6).fill(-1), [1], Array(5).fill(-1), [1, 1], [-1, -1]]),
    arrayJoin([[1, 1, 1], Array(4).fill(-1), [1, 1], Array(6).fill(-1), [1, 1], Array(5).fill(-1), [1, 1], [-1]]),
    arrayJoin([[1, 1, 1], Array(4).fill(-1), [1, 1], Array(5).fill(-1), Array(4).fill(1), [-1, -1, -1], [1], [-1], [1], [-1]]),
    arrayJoin([[1, 1], Array(4).fill(-1), Array(4).fill(1), [-1, -1], [1], [-1, -1], [1], [-1, -1], [1, 1], [-1], [1, 1], [-1], [1]]),
    arrayJoin([[1, 1], Array(4).fill(-1), Array(12).fill(1), [-1], [1, 1], [-1, -1, -1], [1]]),

    arrayJoin([[1], [-1, -1], [1], [-1, -1, -1], Array(15).fill(1), [-1, -1], [1]]),
    arrayJoin([[1], [-1], [1, 1], [-1], [1, 1], [-1], Array(6).fill(1), Array(6).fill(-1), [1, 1], [-1, -1], [1]]),
    arrayJoin([[-1], Array(5).fill(1), [-1], Array(5).fill(1), Array(10).fill(-1), [1], [-1], [1]]),
    arrayJoin([Array(4).fill(1), [-1, -1, -1], Array(5).fill(1), Array(10).fill(-1), [1, 1, 1]]),
    arrayJoin([[1, 1, 1], [-1, -1, -1], Array(6).fill(1), Array(10).fill(-1), [1, 1], [-1]]),

    arrayJoin([[1, 1, 1], [-1, -1, -1], [1], [-1], Array(5).fill(1), Array(9).fill(-1), [1], [-1, -1]]),
    arrayJoin([[1, 1], [-1], [1], [-1], [1, 1], [-1], [1, 1], [-1], [1, 1], Array(12).fill(-1)]),
    arrayJoin([[1], [-1], Array(5).fill(1), [-1, -1], [1], [-1, -1], [1, 1], Array(11).fill(-1)]),
    arrayJoin([[1], [-1], Array(5).fill(1), [-1, -1], [1], [-1, -1], [1, 1], Array(11).fill(-1)]),
    arrayJoin([Array(7).fill(1), [-1, -1], [1], [-1, -1], [1, 1], Array(11).fill(-1)])
];
console.log(verifyPuzzle(puzzle3, solution3)? "puzzle 3 is valid": "puzzle 3 is not valid");

