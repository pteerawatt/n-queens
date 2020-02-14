/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var matrix = new Board({ 'n': n });
  var solution = matrix; //matrix grab
  //console.log(solution)

  // loop through first row

  for (var i = 0; i < n; i++) {
    // toggle matrix i i
    matrix.togglePiece(i, i);
  }
  //console.log(solution.rows());
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  // grab the matrix
  var matrix = new Board({'n': n});
  // var row = 0
  var row = 0;
  // helper func (input is the row number)
  var inner = function(row) {
    // if row != n
    if ( row !== n) {
      // loop through column
      for (var i = 0; i < n; i++) {
        // toggle (on) piece on at i 0
        matrix.togglePiece(row, i);
        // if  no conflict
        if (!matrix.hasAnyRooksConflicts()) {
          // call recursion (row + 1)
          inner(row + 1);
          // toggle (off)
          matrix.togglePiece(row, i);
        } else {
        // else toggle (off)
          matrix.togglePiece(row, i);
        }
      }
    } else {
    // else  sol ++
      solutionCount++;
    }

  };
  if (n === 0) {
    return 1;
  }
  inner(row);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  // grab the matrix
  var matrix = new Board({'n': n});
  // var row = 0
  var row = 0;
  var targetFound = false;
  var answerMatrix = [];
  // helper func (input is the row number)
  var inner = function(row) {
    if (!targetFound) {
    // if row != n
      if (row !== n) {
        // loop through column
        for (var i = 0; i < n; i++) {
          // toggle (on) piece on at i 0
          matrix.togglePiece(row, i);
          // if  no conflict
          if (!matrix.hasAnyQueensConflicts()) {
            // call recursion (row + 1)
            inner(row + 1);
            if (!targetFound) {
              // toggle (off)
              matrix.togglePiece(row, i);
            }
          } else {
            // else toggle (off)
            matrix.togglePiece(row, i);
          }
        }
      } else {
      // else  sol ++
        answerMatrix = matrix.rows().slice();
        targetFound = true;
      }
    }
  };

  if (n === 1) {
    return [[1]];
  }
  if ( n === 0 || n === 2 || n === 3) {
    return matrix.rows();
  }
  inner(row);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(matrix));
  console.log(answerMatrix);
  return answerMatrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme

  // grab the matrix
  var matrix = new Board({'n': n});
  // var row = 0
  var row = 0;
  // helper func (input is the row number)
  var inner = function(row) {
    // if row != n
    if ( row !== n) {
      // loop through column
      for (var i = 0; i < n; i++) {
        // toggle (on) piece on at i 0
        matrix.togglePiece(row, i);
        // if  no conflict
        if (!matrix.hasAnyQueensConflicts()) {
          // call recursion (row + 1)
          inner(row + 1);
          // toggle (off)
          matrix.togglePiece(row, i);
        } else {
        // else toggle (off)
          matrix.togglePiece(row, i);
        }
      }
    } else {
    // else  sol ++
      solutionCount++;
    }

  };
  if (n === 0 || n === 1) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  inner(row);

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
