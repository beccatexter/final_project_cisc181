/* 
Problem 8: [20 points]
Create a class named Rules.  
This will represent the set of rules for each type of Piece we have in the game.
- member field for a string message
- member field for game (which should be of type GameS25)  // already done for you
- constructor with one game parameter that sets this field // already done for you
- accessors 
    - getMessage
- methods below - all have two Location parameters and return a boolean
    checkValidMove
    checkValidAttack
    checkValidRecruit
    checkValidSpawn
    checkValidCrack
    These methods should check the rules described in the HW10 Canvas assignment
    and return true if the action can be taken and false otherwise. If the action
    is not valid - the message field should be updated with a message to the player
    explaining why the action is not valid.  
    For example: "The piece you are moving does not belong to your team."

Tips:  
Implement the code for a valid move first. 
*/
import { GameS25 } from "./GameS25";
import { Location } from "./Location";

export class Rules {
    message: string = "";
    constructor(protected game: GameS25) {}

    getMessage(): string {
        return this.message;
    }

    checkInBounds(start: Location, end: Location): boolean {
        return (
            this.game.getGameBoard().inBounds(start.getRow(), start.getCol()) &&
            this.game.getGameBoard().inBounds(end.getRow(), end.getCol())
        );
    }

    checkPieceOnSquareTurn(start: Location): boolean {
        if (this.game.getGameBoard().getSquare(start).isEmpty()) {
            this.message = "No piece on square";
            return false;
        } else if (
            !(
                this.game
                    .getGameBoard()
                    .getSquare(start)
                    .getPiece()
                    ?.getTeamColor() ===
                this.game.getCurrentTeam().getTeamColor()
            )
        ) {
            this.message = "Not your team";
            return false;
        } else {
            return true;
        }
    }

    checkPieceOnSquareAction(start: Location, action: string): boolean {
        if (this.game.getGameBoard().getSquare(start).isEmpty()) {
            this.message = "No piece on square";
            return false;
        } else if (
            !this.game
                .getGameBoard()
                .getSquare(start)
                .getPiece()
                ?.allowableAction(action)
        ) {
            this.message = "Piece can't take this action";
            return false;
        } else {
            return true;
        }
    }

    validMovePath(start: Location): boolean {
        if (this.game.getGameBoard().getSquare(start).isEmpty()) {
            this.message = "No piece on square";
            return false;
        } else if (
            !this.game
                .getGameBoard()
                .getSquare(start)
                .getPiece()
                ?.validMovePath()
        ) {
            this.message = "Invalid move";
            return false;
        } else {
            return true;
        }
    }

    checkCommonRequirements(
        start: Location,
        end: Location,
        action: string,
    ): boolean {
        if (!this.checkInBounds(start, end)) {
            this.message = "Out of bounds";
            return false;
        }
        if (!this.checkPieceOnSquareTurn(start)) {
            return false;
        }
        if (!this.checkPieceOnSquareAction(start, action)) {
            return false;
        }
        return true;
    }

    checkValidMove(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "move")) {
            return false;
        }
        if (!this.game.getGameBoard().getSquare(end).isEmpty()) {
            this.message = "End square isn't empty";
            return false;
        }
        return true;
    }

    checkValidSpawn(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "spawn")) {
            return false;
        }
        if (!this.game.getGameBoard().getSquare(end).isEmpty()) {
            this.message = "Spawn square isn't empty";
            return false;
        }
        return true;
    }

    checkValidAttack(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "attack")) {
            return false;
        }

        const targetSquare = this.game.getGameBoard().getSquare(end);
        const targetPiece = targetSquare.getPiece();
        if (
            !targetPiece ||
            targetPiece.getTeamColor() ===
                this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "The target square doesn't have an opposing piece";
            return false;
        }
        return true;
    }

    checkValidRecruit(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "recruit")) {
            return false;
        }

        const targetSquare = this.game.getGameBoard().getSquare(end);
        const targetPiece = targetSquare.getPiece();
        if (
            !targetPiece ||
            targetPiece.getTeamColor() ===
                this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "The target square doesn't have an opposing piece";
            return false;
        }
        return true;
    }

    checkValidCrack(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "crack")) {
            return false;
        }

        const targetSquare = this.game.getGameBoard().getSquare(end);
        const targetPiece = targetSquare.getPiece();
        if (
            targetPiece &&
            targetPiece.getTeamColor() ===
                this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Can't crack this square";
            return false;
        }
        return true;
    }
    ///////////////
    checkValidSwap(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "swap")) {
            return false;``
        }else{
            return true;
        }
    }
}
