// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    // returns an array of rows
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
    // input is index of row x col, toggle
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    // checking major diagonal line (from row 0)
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
    // checking minor diagonal line (from row 0)
    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },
    // check if any rook have conflict
    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },
    // check to if a specific queen has conflict
    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },
    // checks all the queens
    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },
    // if a spot is in the grid
    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //grab the row with rowIndex

      var targetRow = this.get(rowIndex);
      //create counter variable
      var counter = 0;
      //loop through the row
      //if there is a 1, counter++
      var found = false;
      for (var i = 0; i < targetRow.length; i++) {
        if (targetRow[i] === 1) {
          counter++;
        }
      }
      //if counter > 1 there is a conflict
      if ( counter > 1) {
        found = true;
      }
      return found;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].includes(1)) {
          if (rows[i].indexOf(1) !== rows[i].lastIndexOf(1)) {
            return true;
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //grab entire matrix
      var allRows = this.rows();
      var counter = 0;
      // loop through matrix to look at row(colIndex)
      for (var i = 0; i < allRows.length; i++) {
        if (allRows[i][colIndex] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // need to check all columns

      // grab matrix
      var matrix = this.rows();
      // loop through upper row (i)
      for (var i = 0; i < matrix.length; i++) {
        // loop through lower row (j)
        for (var j = 0; j < matrix.length; j++) {
          // if (i) != (j)
          if ( j > i ) {
            // if ( matrix(i).indexof = matrix(j).indexof )
            if ( (matrix[i].indexOf(1) === matrix[j].indexOf(1)) && (matrix[j].indexOf(1) !== -1) ) {
              // return true
              return true;
            }
          }
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // grab the matrix
      var matrix = this.rows();
      // we know first 1 is at matrix[0][majorDiagonalColumnIndexAtFirstRow]
      //start loop at next row
      for (var i = 1; i < matrix.length; i++) {
        //check if majorDiagonalColumnIndexAtFirstRow + row number is a queen
        if (matrix[i][majorDiagonalColumnIndexAtFirstRow + i] === 1) {
          //return true
          return true;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // grab the matrix
      var matrix = this.rows();
      // first loop starts to iterate rows
      for (var i = 0; i < matrix.length; i++) {
        // second loop starts to iterate columns
        for (var j = 0; j < matrix.length; j++) {
          //if we find a 1
          if (matrix[i][j] === 1) {
            //save i+1 and j+1 to variables
            var newRow = i + 1;
            var newCol = j + 1;
            //new for loop to check diagonal from where we found 1
            //start iterating through rows
            for (var l = newRow; l < matrix.length; l++) {
              //if diagonal from saved value is a 1
              if (matrix[l][newCol] === 1) {
              //return true
                return true;
              } else {
                //else j++
                newCol ++;
              }
            }
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // grab matrix
      var matrix = this.rows();
      // start looping from second row
      for ( var i = 1; i < matrix.length; i++) {
        // check if the minor diagonal has conflict
        if (matrix[i][minorDiagonalColumnIndexAtFirstRow - i] === 1) {
          return true;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //grab the matrix
      var matrix = this.rows();
      //loop through rows
      for (var i = 0; i < matrix.length; i++) {
        //loop through columns
        for (var j = 0; j < matrix.length; j++) {
          //if we find a queen
          if (matrix[i][j] === 1) {
            //variable to indicate where we start checking diagonal from
            var newRow = i + 1;
            var newCol = j - 1;
            //loop from diagonal checkpoint
            for (var l = newRow; l < matrix.length; l++) {
              //if we find queen along diagonal
              if (matrix[l][newCol] === 1) {
                //return true
                return true;
              } else {
                //decrease coliumn index
                newCol--;
              }
            }
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
