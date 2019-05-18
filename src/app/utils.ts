import { Chord } from './models/chord';
import * as _ from 'lodash';

export enum CHORD_TYPES {
    MAJOR = 'maj',
    MINOR = 'min',
    DIMINISHED = 'dim',
    DOMINANT = 'dom7'
}

export default class MusicUtils {
    public static VALID_NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    static parseChords(chords: string): Chord[] {
        return _.split(chords, /[ ,]+/)
        .map((chord: string): Chord => {
            return this.parseChord(chord);
        });
    }

    /**
     * Parse a string into a Chord type.
     *
     * @param chord the string containing the chord
     * @throws Error if the chord is not recognized
     * @returns a Chord type
     */
    static parseChord(chord: string): Chord {
        const rootMatch = chord.match(/[A-G][#b]?/g);  // includes sharp/flat
        // M is major, m is minor, a is augmented, d is diminished, default is dominant
        const typeMatch = chord.match(/[Mmad]/g) || [CHORD_TYPES.DOMINANT];
        const modifiersMatch = chord.match(/(?<=\()[#b]?\d+(?=\))/g); // All the numbers after the chord

        if (!rootMatch || rootMatch.length !== 1) {
            throw new Error(`The root note in ${chord} is not recognized.`);
        }

        if (!typeMatch || typeMatch.length !== 1) {
            throw new Error(`The chord type in ${chord} is not recognized.`);
        }

        const root = rootMatch[0];
        const type = typeMatch[0];
        const modifiers = modifiersMatch;
        const newChord: Chord = {
            root,
            type,
            modifiers
        };
        return newChord;
    }
}