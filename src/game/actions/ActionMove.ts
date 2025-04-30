/*Problem 10: [5 points]
Represents a 'move' action.

Create a class named ActionMove that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implement method validAction 
    call checkValidMove from your rules class and return
    whether this move is valid 
- implement method performAction
    on a move:
    - if the end square is not cracked
        the Piece on the Start Square is moved to the End Square   
    - if the end square is cracked 
       the current team loses this piece (removed from board and team)   
    - the Piece speaks
    - the turn of the game is changed to the other player
*/

import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionMove extends Action {
    constructor(game: GameS25, startLocation: Location, endLocation: Location) {
        super(game, startLocation, endLocation);
    }

    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidMove(this.startLocation, this.endLocation);
    }

    performAction(): void {
        let piece = this.game
            .getGameBoard()
            .getSquare(this.startLocation)
            .getPiece();
        if (piece) {
            if (
                this.game.getGameBoard().getSquare(this.endLocation).isCracked()
            ) {
                this.game
                    .getGameBoard()
                    .getSquare(this.startLocation)
                    .removePiece();
                this.game.getCurrentTeam().removePieceFromTeam(piece);
            }
            if (
                !this.game
                    .getGameBoard()
                    .getSquare(this.endLocation)
                    .isCracked()
            ) {
                this.game
                    .getGameBoard()
                    .getSquare(this.endLocation)
                    .setPiece(piece);
                this.game
                    .getGameBoard()
                    .getSquare(this.startLocation)
                    .removePiece();
            }
            piece.speak();
        }
        this.game.changeTurn();
    }
}
