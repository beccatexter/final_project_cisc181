/*
Add your BoardSquare class code from HW10 Part A
*/

import { Piece } from "./Piece";

export class BoardSquare {
    piece: Piece | null;
    squareColor: string;
    cracked: boolean;

    constructor(squareColor: string) {
        this.squareColor = squareColor;
        this.piece = null;
        this.cracked = false;
    }

    getPiece(): Piece | null {
        return this.piece;
    }

    getSquareColor(): string {
        return this.squareColor;
    }

    isCracked(): boolean {
        return this.cracked;
    }

    isEmpty(): boolean {
        if (this.piece) {
            return false;
        } else {
            return true;
        }
    }

    setPiece(piece: Piece): void {
        this.piece = piece;
    }

    crackThisSquare(): void {
        this.cracked = true;
    }

    removePiece(): Piece | null {
        const removed: Piece | null = this.piece;
        this.piece = null;
        return removed;
    }

    toString(): string {
        if (this.cracked) {
            return "--XXX--";
        } else if (this.piece === null) {
            return "-------";
        } else {
            return "-" + this.piece.toString() + "-";
        }
    }
}
