import { Chord } from './models/chord';
import * as _ from 'lodash';
import * as octavian from 'octavian';

export enum CHORD_TYPES {
    MAJOR = 'maj',
    MAJOR6 = 'maj6',
    MAJOR7 = 'maj7',
    MAJOR7b5 = 'maj7b5',
    MAJOR7s5 = 'maj7#5',
    MINOR = 'min',
    MINOR6 = 'min6',
    MINOR7 = 'min7',
    DOMINANT7 = 'dom7',
    DIMINISHED7 = 'dim7',
    HALF_DIMINISHED = 'm7b5'
}

export default class MusicUtils {
    public static VALID_NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    static parseChords(chords: string): Chord[] {
        return _.split(chords, /[ ,]+/)
        .map((chord: string): Chord => {
            return this.parseChord(chord);
        });
    }

    static generateABCString(chords: string[][]): string {
        let abcstring: string = '';
        // tslint:disable-next-line: forin

        _.forEach(chords, (measure: string[], index: number) => {
            abcstring += '|';
            _.forEach(measure, (chord: string) => {
                abcstring += '\"';
                abcstring += chord;
                abcstring += '\"';
                abcstring += '[';
                const notes: octavian.Chord = this.parseChord(chord).notes;
                for(const note in notes){
                    if (notes[note].modifier === '#') {
                        abcstring += '^';
                    } else if (notes[note].modifier === 'b') {
                        abcstring += '_';
                    }
                    abcstring += notes[note].letter;
                }
                abcstring += ']';
            });
            if ((index + 1) % 4 === 0) {
                abcstring += '|\n';
            }
        });
        abcstring += '||';
        return abcstring;
    }

    /**
     * Parse a string into a Chord type.
     *
     * @param chord the string containing the chord
     * @throws Error if the chord is not recognized
     * @returns a Chord type
     */
    static parseChord(chord: string): octavian.Chord {
        if (chord.indexOf('/') !== -1) {
            // Currently doesn't support C/E , etc.
            chord = chord.split('/')[0];
        }
        const rootMatch = chord.match(/[A-G][#b]?/g);  // includes sharp/flat
        // M is major, m is minor, a is augmented, d is diminished,
        // h is half-deminished, default is major
        const typeMatch = chord.match(/[M\-adh]/g) || [''];
        const modifiersMatch = chord.match(/[#b]?\d/g); // All the numbers after the chord

        if (!rootMatch || rootMatch.length !== 1) {
            throw new Error(`The root note in ${chord} is not recognized.`);
        }

        if (!typeMatch || typeMatch.length !== 1) {
            throw new Error(`The chord type in ${chord} is not recognized.`);
        }
        let type: CHORD_TYPES;
        switch (typeMatch[0]) {
            case '^':
                type = CHORD_TYPES.MAJOR7;
                break;
            case '-':
                switch (modifiersMatch[0]) {
                    case '6':
                        type = CHORD_TYPES.MINOR6;
                        break;
                    case '7':
                        type = CHORD_TYPES.MINOR7;
                        break;
                    default:
                        type = CHORD_TYPES.MINOR;
                        break;
                }
                break;
            default:
                if (modifiersMatch){
                    type = CHORD_TYPES.MAJOR6;
                } else {
                    type = CHORD_TYPES.DOMINANT7;
                }
                break;
        }

        const root = rootMatch[0] + '3';
        // const type = typeMatch[0];
        const modifiers = modifiersMatch;
        const newChord = new octavian.Chord(root, type);
        return newChord;
    }
}