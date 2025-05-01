import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionSwap extends Action {
    constructor(game: GameS25, startLocation: Location, endLocation: Location) {
        super(game, startLocation, endLocation);
    }

    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidSwap(this.startLocation, this.endLocation);
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
            this.game
                .getGameBoard()
                .getSquare(this.startLocation)
                .setPiece(endPiece);
            this.game
                .getGameBoard()
                .getSquare(this.endLocation)
                .setPiece(startPiece);
            startPiece.speak();
        }
        this.game.changeTurn();
    }
}
