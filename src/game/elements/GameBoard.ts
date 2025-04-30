/* Add your GameBoard code from Part A
*/

import { BoardSquare } from "./BoardSquare";
import { Location } from "./Location";

export class GameBoard {
    rows: number;
    columns: number;
    squares: BoardSquare[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.squares = [];
        this.setUpEmptyBoard();
    }

    getNumRows(): number {
        return this.rows;
    }

    getNumColumns(): number {
        return this.columns;
    }

    getAllSquares(): BoardSquare[][] {
        return this.squares;
    }

    getSquare(location: Location): BoardSquare {
        return this.squares[location.getRow()][location.getCol()];
    }

    inBounds(rowIndex: number, colIndex: number): boolean {
        if (
            rowIndex < this.getNumRows() &&
            colIndex < this.getNumColumns() &&
            rowIndex >= 0 &&
            colIndex >= 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    private setUpEmptyBoard(): void {
        for (let row = 0; row < this.rows; row++) {
            this.squares[row] = [];
            if (row % 2 == 0) {
                for (let col = 0; col < this.columns; col++) {
                    if (col % 2 == 0) {
                        this.squares[row].push(new BoardSquare("black"));
                    } else {
                        this.squares[row].push(new BoardSquare("white"));
                    }
                }
            } else {
                for (let col = 0; col < this.columns; col++) {
                    if (col % 2 == 0) {
                        this.squares[row].push(new BoardSquare("white"));
                    } else {
                        this.squares[row].push(new BoardSquare("black"));
                    }
                }
            }
        }
    }

    isBoardFull(): boolean {
        for (let row = 0; row < this.getNumRows(); row++) {
            for (let col = 0; col < this.getNumColumns(); col++) {
                if (this.squares[row][col].isEmpty()) {
                    return false;
                }
            }
        }
        return true;
    }

    findRandomEmptySquare(): BoardSquare {
        let row: number;
        let col: number;
        let foundEmpty: boolean = false;
        let square: BoardSquare = this.squares[0][0];
        while (!foundEmpty) {
            row = GameBoard.getRandomInt(0, this.getNumRows() - 1);
            col = GameBoard.getRandomInt(0, this.getNumColumns() - 1);
            if (this.squares[row][col].isEmpty()) {
                foundEmpty = true;
                square = this.squares[row][col];
            }
        }
        return square;
    }

    /**
     * This function is already defined for you
     * @param min - minimum integer
     * @param max - maximum integer
     * @returns - a random integer between min (inclusive) and max (inclusive)
     */
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * This function is already defined for you
     * @returns - a string representation of the game board
     */
    toString(): string {
        let boardString: string = "";
        boardString = boardString.concat("Col :" + "       ");

        for (let col = 0; col < this.columns; col++) {
            boardString = boardString.concat(col + "        ");
        }
        boardString = boardString.concat("\n");
        for (let row = 0; row < this.rows; row++) {
            boardString = boardString.concat("Row : " + row + "   ");
            for (let col = 0; col < this.columns; col++) {
                boardString = boardString.concat(
                    this.squares[row][col].toString() + "  ",
                );
            }
            boardString = boardString.concat("\n");
        }
        return boardString;
    }
}
