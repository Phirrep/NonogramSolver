# NonogramSolver
This CSP solver is for nonogram puzzles, where a specific order of squares needs to fill each row and column
The CSP features 3 different algorithms:
- Backtracking: Basic brute force, fills in every square, backtracks to change square if constraints get failed
- Forwardchecking: Every square that gets filled will determine whether other squares in the row/column get filled or unfilled
- Arcconsistency: An algorithm that expands upon forwardchecking. Currently, the algorithm features:
	- Backtracking when affected squares can't be filled or unfilled