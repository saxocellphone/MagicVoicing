import mongoose from 'mongoose';
import { Chord } from 'octavian';

const Schema = mongoose.Schema;

let TuneSchema = new Schema({
    name: String,
    composer: String,
    style: String,
    key: String,
    bpm: Number,
    measures: [[String]],
    timeSignature: String,
    raw: String
});

let Tune = mongoose.model('Tune', TuneSchema);

export {
    Tune
};