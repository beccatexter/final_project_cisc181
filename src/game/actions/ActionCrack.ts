/*Problem 14: [5 points]
Represents a 'crack' action.

Create a class named ActionCrack that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidCrack from your rules class and return
    whether this move is valid 
- implement method performAction
    on crack:
    - the End Square is cracked 
    - if the End Square is occupied
        - the Piece on the End Square is removed from the board and the opponent's team
    - the Start Square's Piece speaks
    - the turn of the game is changed to the other player
*/

import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionCrack extends Action {
    constructor(game: GameS25, startLocation: Location, endLocation: Location) {
        super(game, startLocation, endLocation);
    }

    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidCrack(this.startLocation, this.endLocation);
    }

    performAction(): void {
        let startPiece = this.game
            .getGameBoard()
            .getSquare(this.startLocation)
            .getPiece();
        let endPiece = this.game
            .getGameBoard()
            .getSquare(this.endLocation)
            .getPiece();
        if (startPiece && endPiece) {
            this.game.getGameBoard().getSquare(this.endLocation).removePiece();
            this.game.getOpponentTeam().removePieceFromTeam(endPiece);
            startPiece.speak();
        }
        this.game.getGameBoard().getSquare(this.endLocation).crackThisSquare();
        this.game.changeTurn();
    }
}
