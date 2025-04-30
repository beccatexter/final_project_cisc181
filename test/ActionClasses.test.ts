import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { PieceScrat } from "../src/game/elements/PieceScrat";
import { GameBoard } from "../src/game/elements/GameBoard";
import { Location } from "../src/game/elements/Location";
import { GameS25 } from "../src/game/elements/GameS25";
import { Team } from "../src/game/elements/Team";
import { Action } from "../src/game/actions/Action";
import { ActionMove } from "../src/game/actions/ActionMove";
import { ActionAttack } from "../src/game/actions/ActionAttack";
import { ActionRecruit } from "../src/game/actions/ActionRecruit";
import { ActionSpawn } from "../src/game/actions/ActionSpawn";
import { ActionCrack } from "../src/game/actions/ActionCrack";

describe("Action Classes - Problems 10-15", () => {
    const teamAColor: string = "Red";
    const teamBColor: string = "Blue";
    const aBlueHen: Piece = new PieceBlueHen("H", teamAColor, false, true, 2);
    const bBlueHen: Piece = new PieceBlueHen("H", teamBColor, false, true, 2);

    const aMinion: PieceMinion = new PieceMinion(
        "M",
        teamAColor,
        false,
        true,
        0,
    );
    const bMinion: PieceMinion = new PieceMinion(
        "M",
        teamBColor,
        false,
        true,
        0,
    );

    const aScrat: PieceScrat = new PieceScrat(
        "S",
        teamAColor,
        false,
        true,
        0,
        0,
    );
    const bScrat: PieceScrat = new PieceScrat(
        "S",
        teamBColor,
        false,
        true,
        0,
        0,
    );

    const aPieces: Piece[] = [aBlueHen, aMinion, aScrat];
    const bPieces: Piece[] = [bBlueHen, bMinion, bScrat];

    const myTeamA: Team = new Team(teamAColor, aPieces);
    const myTeamB: Team = new Team(teamBColor, bPieces);
    const myGameBoard: GameBoard = new GameBoard(6, 8);

    const myGame: GameS25 = new GameS25(
        myGameBoard,
        myTeamA,
        myTeamB,
        teamAColor,
    );

    // remove all pieces
    for (let row of myGame.getGameBoard().getAllSquares()) {
        for (let aSquare of row) {
            // remove piece
            if (!aSquare.isEmpty()) {
                aSquare.removePiece();
            }
        }
    }
    // load pieces in diagonal
    myGame.getGameBoard().getAllSquares()[0][0].setPiece(aBlueHen);
    myGame.getGameBoard().getAllSquares()[1][1].setPiece(bBlueHen);
    myGame.getGameBoard().getAllSquares()[2][2].setPiece(aMinion);
    myGame.getGameBoard().getAllSquares()[3][3].setPiece(bMinion);
    myGame.getGameBoard().getAllSquares()[4][4].setPiece(aScrat);
    myGame.getGameBoard().getAllSquares()[5][5].setPiece(bScrat);

    //const rulesS25: Rules = new Rules(myGame);

    describe("ActionMove ", () => {
        // move red hen [0][0] to  [1][0]
        const moveHen: ActionMove = new ActionMove(
            myGame,
            new Location(0, 0),
            new Location(1, 0),
        );
        test("(1 pts)  ActionMove - constructor", () => {
            expect(moveHen instanceof Action).toEqual(true);
        });

        test("(2 pts)  ActionMove - validAction, performAction", () => {
            // move red hen [0][0] to [1][0] is valid
            expect(moveHen.validAction()).toEqual(true);
            moveHen.performAction();
            // hen should be off [0][0] and on [1][0]
            expect(
                myGame.getGameBoard().getSquare(new Location(0, 0)).isEmpty(),
            ).toEqual(true);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).getPiece(),
            ).toBe(aBlueHen);
            // Team B's turn
            expect(myGame.isTurn(myTeamB)).toEqual(true);
        });

        test("(2 pts)  ActionMove - validAction, performAction to a cracked square", () => {
            // crack square  [3][5]
            myGame
                .getGameBoard()
                .getSquare(new Location(3, 5))
                .crackThisSquare();
            // move blue minion [3][3] to [3][5]
            const moveMinion: ActionMove = new ActionMove(
                myGame,
                new Location(3, 3),
                new Location(3, 5),
            );

            // should be valid
            expect(moveMinion.validAction()).toEqual(true);
            moveMinion.performAction();
            // minion should be off [3][3] and removed from team
            expect(
                myGame.getGameBoard().getSquare(new Location(3, 3)).isEmpty(),
            ).toEqual(true);

            expect(myTeamB.getTeamPieces().includes(bMinion)).toEqual(false);
            // Team A's turn
            expect(myGame.isTurn(myTeamA)).toEqual(true);
        });
    });

    describe("ActionRecruit ", () => {
        // recruit with teamA minion - teamB blueHen
        const recruitMinion: ActionRecruit = new ActionRecruit(
            myGame,
            new Location(2, 2),
            new Location(1, 1),
        );
        test("(1 pts)  ActionRecruit - constructor", () => {
            expect(recruitMinion instanceof Action).toEqual(true);
        });

        test("(4 pts)  ActionRecruit - validAction, performAction", () => {
            // attack
            expect(recruitMinion.validAction()).toEqual(true);
            recruitMinion.performAction();
            // hen on [1][1] should still be original square
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 1)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 1)).getPiece(),
            ).toBe(bBlueHen);
            // hen on [1][1] should still be on teamA's team now
            expect(
                myGame
                    .getGameBoard()
                    .getSquare(new Location(1, 1))
                    .getPiece()
                    ?.getTeamColor(),
            ).toEqual(teamAColor);
            expect(myTeamA.getTeamPieces().includes(bBlueHen)).toEqual(true);
            expect(myTeamB.getTeamPieces().includes(bBlueHen)).toEqual(false);
            // Team B's turn
            expect(myGame.isTurn(myTeamB)).toEqual(true);
        });
    });

    describe("ActionAttack ", () => {
        // attack with teamB Scrat - teamA blueHen
        const attackScrat: ActionAttack = new ActionAttack(
            myGame,
            new Location(5, 5),
            new Location(1, 0),
        );
        test("(1 pts)  ActionAttack - constructor", () => {
            expect(attackScrat instanceof Action).toEqual(true);
        });

        test("(4 pts)  ActionAttack - validAction, performAction", () => {
            // attack
            expect(attackScrat.validAction()).toEqual(true);
            attackScrat.performAction();
            // scrat should be off [5][5] and on [1][0]
            expect(
                myGame.getGameBoard().getSquare(new Location(5, 5)).isEmpty(),
            ).toEqual(true);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).getPiece(),
            ).toBe(bScrat);
            // Team A's turn
            expect(myGame.isTurn(myTeamA)).toEqual(true);
        });
    });

    describe("ActionSpawn ", () => {
        // spawn with teamA minion to an empty square
        const spawnMinion: ActionSpawn = new ActionSpawn(
            myGame,
            new Location(2, 2),
            new Location(2, 3),
        );
        test("(1 pts)  ActionSpawn - constructor", () => {
            expect(spawnMinion instanceof Action).toEqual(true);
        });

        test("(2 pts)  ActionSpawn - validAction, performAction", () => {
            // spawn
            expect(spawnMinion.validAction()).toEqual(true);
            spawnMinion.performAction();
            // new minion on square [2][3]
            expect(
                myGame.getGameBoard().getSquare(new Location(2, 3)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame
                    .getGameBoard()
                    .getSquare(new Location(2, 3))
                    .getPiece() instanceof PieceMinion,
            ).toEqual(true);
            // new location should hold original minion
            expect(
                myGame.getGameBoard().getSquare(new Location(2, 3)).getPiece(),
            ).not.toBe(aMinion);
            expect(
                myGame
                    .getGameBoard()
                    .getSquare(new Location(2, 3))
                    .getPiece()
                    ?.getTeamColor(),
            ).toEqual(teamAColor);

            // original minion still on start square
            expect(
                myGame.getGameBoard().getSquare(new Location(2, 2)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(2, 2)).getPiece(),
            ).toBe(aMinion);

            // Team B's turn
            expect(myGame.isTurn(myTeamB)).toEqual(true);
        });

        // spawn with teamB Scrat on [1][0] to cracked square [3][5]
        const spawnScrat: ActionSpawn = new ActionSpawn(
            myGame,
            new Location(1, 0),
            new Location(3, 5),
        );

        test("(2 pts)  ActionSpawn - validAction, performAction to cracked square", () => {
            // spawn to a cracked square [3][5]
            expect(spawnScrat.validAction()).toEqual(true);
            spawnScrat.performAction();
            // original scrat still on [1][0]
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).getPiece(),
            ).toEqual(bScrat);

            // end square should be empty
            expect(
                myGame.getGameBoard().getSquare(new Location(3, 5)).isEmpty(),
            ).toEqual(true);
            // end square should still be cracked
            expect(
                myGame.getGameBoard().getSquare(new Location(3, 5)).isCracked(),
            ).toEqual(true);

            // Team A's turn
            expect(myGame.isTurn(myTeamA)).toEqual(true);
        });
    });

    describe("ActionCrack ", () => {
        // crack with team A Scrat - to empty square
        const crackScrat: ActionCrack = new ActionCrack(
            myGame,
            new Location(4, 4),
            new Location(5, 0),
        );
        test("(1 pts)  ActionCrack - constructor", () => {
            expect(crackScrat instanceof Action).toEqual(true);
        });

        test("(2 pts)  ActionCrack - validAction, performAction on empty square", () => {
            // crack empty square
            expect(crackScrat.validAction()).toEqual(true);
            crackScrat.performAction();
            // scrat should remain on [4][4]
            expect(
                myGame.getGameBoard().getSquare(new Location(4, 4)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(4, 4)).getPiece(),
            ).toBe(aScrat);
            // [5][0] should be empty but cracked
            expect(
                myGame.getGameBoard().getSquare(new Location(5, 0)).isCracked(),
            ).toEqual(true);
            expect(
                myGame.getGameBoard().getSquare(new Location(4, 4)).isCracked(),
            ).toEqual(false);
            // Team B's turn
            expect(myGame.isTurn(myTeamB)).toEqual(true);
        });

        // crack with team B Scrat - to occupied square
        const crackRedScrat: ActionCrack = new ActionCrack(
            myGame,
            new Location(1, 0),
            new Location(3, 3),
        );

        test("(2 pts)  ActionCrack - validAction, performAction on occupied square", () => {
            // crack occupied square
            expect(crackRedScrat.validAction()).toEqual(true);
            crackRedScrat.performAction();
            // scrat should remain on [1][0] on its should not be cracked
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).isEmpty(),
            ).toEqual(false);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).getPiece(),
            ).toBe(bScrat);
            expect(
                myGame.getGameBoard().getSquare(new Location(1, 0)).isCracked(),
            ).toEqual(false);

            // [3][3] should be empty but cracked
            expect(
                myGame.getGameBoard().getSquare(new Location(3, 3)).isEmpty(),
            ).toEqual(true);
            expect(
                myGame.getGameBoard().getSquare(new Location(3, 3)).isCracked(),
            ).toEqual(true);
            // teamB should have lost its bMinion piece from [3][3]
            expect(myTeamB.getTeamPieces().includes(bMinion)).toEqual(false);
            // teamA should still have aScrat
            expect(myTeamA.getTeamPieces().includes(aScrat)).toEqual(true);

            // Team B's turn
            expect(myGame.isTurn(myTeamA)).toEqual(true);
        });
    });
});
