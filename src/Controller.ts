/*Problem 15: [15 points] - This class will be graded manually by the TAs
Create a new class named Controller. 
This class will interact with the game elements and actions,
and the view used to capture user input.
It should have the following members:
- member field to represnt the game - GameS25 object
- constructor with two parameters:
    - number of rows for the gameboard
    - number of columns for the gameboard
    - calls createGame and assigns it’s return value to the GameS25 property
- method createGame has two parameters: number of rows and number of columns
    and returns a GameS25 object
    this method should create a GameS25 with the following:
        - the GameBoard property should have the number of rows and columns passed in
        - the teamA object should have with 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
            the color of the team is your choice (don't choose black or white)
        - the teamB object should also have 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
             the color of the team is your choice (don't choose black or white or 
             the color you chose for teamA)
        - the turn should be set to the color of teamA
    -Note: you can create helper functions as you see fit
- accessor 
    - getGame
- method getTurn 
    has no parameters and returns a string
    indicating whose turn it is
- method getStatus
    has no parameters and returns a string
    with the current message in the Rules instance
    Note: Use the UML diagram to see how to access the Rules
    member message field
- method carryOutAction that three parameters in this order:
    - a start square location, an end square location, and a string for action type
    - this method should create the appropriate action based on action type:
        "move" -> ActionMove
        "attack" -> ActionAttack
        "recruit" -> ActionRecruit
        "spawn" -> ActionSpawn
        "crack" -> ActionCrack
    - the method should check if the action is valid and if so it should perform the action
        (use your methods created in the Action classes!)
    - this method should return whether or not this action was valid

Once you have finished this method, you should be able to use: 
    npm run start 
to play your game with a text based interface.
Play your game to check if it is behaving as described in class.
*/

import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionCrack } from "./game/actions/ActionCrack";
import { ActionMove } from "./game/actions/ActionMove";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { GameBoard } from "./game/elements/GameBoard";
import { GameS25 } from "./game/elements/GameS25";
import { Location } from "./game/elements/Location";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceScrat } from "./game/elements/PieceScrat";
import { Team } from "./game/elements/Team";

export class Controller {
    game: GameS25;
    constructor(numRows: number, numCols: number) {
        this.game = this.createGame(numRows, numCols);
    }

    createGame(numRows: number, numCols: number): GameS25 {
        let gameBoard: GameBoard = new GameBoard(numRows, numCols);
        let teamA: Team = new Team("Red", [
            new PieceBlueHen("H", "Red"),
            new PieceMinion("M", "Red"),
            new PieceScrat("S", "Red"),
        ]);
        let teamB: Team = new Team("Blue", [
            new PieceBlueHen("H", "Blue"),
            new PieceMinion("M", "Blue"),
            new PieceScrat("S", "Blue"),
        ]);
        let turn = teamA.getTeamColor();
        return new GameS25(gameBoard, teamA, teamB, turn);
    }

    getGame(): GameS25 {
        return this.game;
    }

    getTurn(): string {
        return this.game.getCurrentTeam().getTeamColor();
    }

    getStatus(): string {
        return this.game.getRules().getMessage();
    }

    carryOutAction(
        startLocation: Location,
        endLocation: Location,
        action: string,
    ): boolean {
        if (action === "move") {
            let actionMove: ActionMove = new ActionMove(
                this.game,
                startLocation,
                endLocation,
            );
            if (actionMove.validAction()) {
                actionMove.performAction();
                return true;
            } else {
                return false;
            }
        } else if (action === "attack") {
            let actionAttack: ActionAttack = new ActionAttack(
                this.game,
                startLocation,
                endLocation,
            );
            if (actionAttack.validAction()) {
                actionAttack.performAction();
                return true;
            } else {
                return false;
            }
        } else if (action === "recruit") {
            let actionRecruit: ActionRecruit = new ActionRecruit(
                this.game,
                startLocation,
                endLocation,
            );
            if (actionRecruit.validAction()) {
                actionRecruit.performAction();
                return true;
            } else {
                return false;
            }
        } else if (action === "spawn") {
            let actionSpawn: ActionSpawn = new ActionSpawn(
                this.game,
                startLocation,
                endLocation,
            );
            if (actionSpawn.validAction()) {
                actionSpawn.performAction();
                return true;
            } else {
                return false;
            }
        } else if (action === "crack") {
            let actionCrack: ActionCrack = new ActionCrack(
                this.game,
                startLocation,
                endLocation,
            );
            if (actionCrack.validAction()) {
                actionCrack.performAction();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
