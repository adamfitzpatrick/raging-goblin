import { Injectable } from "@angular/core";

export interface MatchObject {
    match?: string;
    distance: number;
    index: number;
    field?: string;
}

export interface TargetMatch<T> extends MatchObject {
    target: T
}

/**
 * Wagner-Fisher implementation of Levenshtein distance string searches.
 * This algorithm requires construction of a matrix containing the distances from all
 * prefixes of the first string to all prefixes of the second string:
 *
 *        K i t t e n
 *      0 1 2 3 4 5 6
 *    m 1 1 2 3 4 5 6
 *    i 2 2 1 2 3 4 5
 *    t 3 3 2 1 2 3 4
 *    t 4 4 3 2 1 2 3
 *    e 5 5 4 3 2 1 2
 *    n 6 6 5 4 3 2 1
 *
 * The number in the last column of the last row represents the levenstein distance
 * between the two strings.
 */
@Injectable()
export class LevenshteinService {

    getDistance(stringA: string, stringB: string): number {
        return this.calculateDistanceMatrix(stringA, stringB)[stringB.length][stringA.length];
    }

    findBestSubstring(search: string, target: string): MatchObject {
        const match = this.scanTarget(search, target);
        match.index = target.indexOf(match.match);
        return match;
    }

    searchObject<T>(search: string, target: T, searchFields: string[]): TargetMatch<T> {
        const match = searchFields.reduce((match: MatchObject, field: string) => {
            if (!target[field]) { return match; }
            const newMatch = this.findBestSubstring(search, target[field]);

            if (match.distance === -1 || match.distance > newMatch.distance) {
                newMatch.field = field;
                match = newMatch;
            }

            return match;
        }, { distance: -1, index: 0 });

        (match as TargetMatch<T>).target = target;
        return match as TargetMatch<T>;
    }

    private calculateDistanceMatrix(stringA: string, stringB: string): number[][] {
        const wfMatrix = [];

        // Distance from empty string to empty string;
        const row = [0];

        // Distance from A to an empty string;
        stringA.split("").forEach((char: string, index: number) => row.push(index + 1));
        wfMatrix.push(row);

        // Distance from B to an empty string;
        stringB.split("").forEach((char: string, index: number) => {
            wfMatrix.push([index + 1]);
        });

        return stringA.split("").reduce((matrix: number[][], charA: string, indexA: number) => {
            this.calculateRowDistances(matrix, charA, indexA, stringB);
            return matrix;
        }, wfMatrix);
    }

    private calculateRowDistances(matrix: number[][], charA: string, indexA: number, stringB: string): void {
        stringB.split("").reduce((matrix: number[][], charB: string, indexB: number) => {

            if (charA.toLowerCase() === charB.toLowerCase()) {
                matrix[indexB + 1][indexA + 1] = matrix[indexB][indexA];
            } else {
                matrix[indexB + 1][indexA + 1] = Math.min(
                    matrix[indexB + 1][indexA] + 1,
                    matrix[indexB][indexA + 1] + 1,
                    matrix[indexB][indexA] + 1
                );
            }
            return matrix;
        }, matrix);
    }

    private scanTarget(search: string, target: string, prevMatch?: MatchObject): MatchObject {
        if (!target.length) { return prevMatch; }
        const newMatch = this.getBestMatchPrefix(search, target);
        if (!prevMatch || newMatch.distance < prevMatch.distance) { prevMatch = newMatch; }
        return this.scanTarget(search, target.substr(1, target.length), prevMatch);
    }

    private getBestMatchPrefix(search: string, target: string): MatchObject {
        const matchObject = this.minimumDistanceFromB(this.calculateDistanceMatrix(target, search));
        matchObject.match = target.slice(0, matchObject.index + 1).trim();
        return matchObject;
    }

    private minimumDistanceFromB(matrix: number[][]): MatchObject {
        const bottomRow = matrix[matrix.length - 1];
        return bottomRow.slice(1, bottomRow.length).reduce((matchObject: MatchObject, value: number, index: number) => {
            return (matchObject.distance === -1 || matchObject.distance > value) ?
                { distance: value, index: index } : matchObject;
        }, { distance: -1, index: 0 });
    }
}