/*Problem 7: [8 points]
Create a class named GameS25 that extends Game. 
This will represent the game that we build for our Homework 10 
this semester.
This class should have the following members:
- a member field for the Rules of this game
- constructor with the same number of parameters as its
   superclass. It should:
   - call the super class constructor
   - set the rules field to a new Rules object
           =  new Rules(this)
- acessor methods:
    - getRules    
- implement isGameEnded method
    - for our game - the game has ended when either one or both teams
        has no pieces left
- implement getWinner method
    - for our game the winner is the one that still has pieces - if both
        teams have no pieces - return "Tie"

*/

import { Game } from "./Game";
import { GameBoard } from "./GameBoard";
import { Rules } from "./Rules";
import { Team } from "./Team";

export class GameS25 extends Game {
    rules: Rules;

    constructor(gameBoard: GameBoard, teamA: Team, teamB: Team, turn: string) {
        super(gameBoard, teamA, teamB, turn);
        this.rules = new Rules(this);
    }

    getRules(): Rules {
        return this.rules;
    }

    isGameEnded(): boolean {
        return (
            this.teamA.getTeamPieces().length === 0 ||
            this.teamB.getTeamPieces().length === 0
        );
    }

    getWinner(): string {
        if (
            this.teamA.getTeamPieces().length === 0 &&
            this.teamB.getTeamPieces().length === 0
        ) {
            return "Tie";
        } else if (this.teamA.getTeamPieces().length === 0) {
            return this.teamB.toString();
        } else {
            return this.teamA.toString();
        }
    }
}
