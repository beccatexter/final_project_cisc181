
import { Piece } from "./Piece";

export class PieceGenie extends Piece {
    public static readonly MAX_SWAPS: number = 3;
    numAttacks:number;
    numSwaps: number;
    

    constructor(
        symbol: string = "G",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks:number = 0,
        numSwaps:number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks
        this.numSwaps = 0;
        this.actions.push("move", "attack", "swap", "spawn");
    }
    getNumAttacks(): number {
        return this.numAttacks;
    }

    increaseNumAttacks(): void {
        this.numAttacks += 1;
        // Put call to updateFly here
        //this.updateFly();
    }


    getNumSwaps():number{
        return this.numSwaps;
    }

    increaseSwaps(): void{
        this.numSwaps +1;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns <= PieceGenie.MAX_SWAPS;
    }

    speak(): string {
        return "You ain't never had a friend like me!";
    }

    validMovePath(): boolean {
        // You will implement this method in a later step
        return true;
    }

    spawn(): PieceGenie {
        this.numSpawns += 1;
        return new PieceGenie(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
        );
    }

    updateAction(action: string): void {
        if (action==="swap") {
            this.increaseSwaps();
        }
    }
}
