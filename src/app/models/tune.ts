import { Chord } from './chord';

export interface Tune {
    name: string;
    composer: string;
    style: string;
    key: string;
    bpm: number;
    measures: [[string]];
    timeSignature: string;
    raw: string;
}

export interface TuneQuery {
    name?: string;
    composer?: string;
    style?: string;
};
