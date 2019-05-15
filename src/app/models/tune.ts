import { Chord } from './chord';

export interface Tune {
    name: string;
    composer?: string;
    chords: Chord[];
}
