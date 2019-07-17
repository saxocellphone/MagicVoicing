import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Model, models } from 'mongoose';
import _ from 'lodash';
import octivian from 'octavian';
import axios from 'axios';
import ireader from 'ireal-reader';
import fs from 'fs';

import db_config from './db';
import routes from './routes';

import { Tune } from './model/Tune';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(db_config.DB, {useNewUrlParser: true}).then(
  () =>  {console.log('Connected!');},
  err => {console.log(`Error: ${err}`);}
);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tunes', routes.tunes);

app.post('/addTune', (req, res) => {
  const chords = _.map(req.body.chords, c => {
    // TODO, make our own NPM package to deal with these things
    return new octivian.Chord(c.root + '4', c.type);
  });
  let tuneSchema = {
    name: req.body.name,
    composer: req.body.composer,
    chords: chords
  }
  let tune = new Tune(tuneSchema);
  tune.save().then(tune => {
    return res.status(200).json({'tune': 'tune added!'});
  }).catch(err => {
    return res.status(400).send('Database access error: ' + err);
  });
}); 

app.get('/getTunes/:style?/:composer?/:perPage?/:lastResult?', (req, res) => {
  const style = req.query.style;
  const composer = req.query.composer;
  const perPage = parseInt(req.query.perPage) || 30;
  const lastResult = req.query.lastResult || '#';
  Tune.find({name: {$gt: lastResult}}).limit(perPage).exec((err, tunes) => {
    return res.send(_.map(tunes, tune => {
      return {
        name: tune.name,
        composer: tune.composer,
        youtubeId: tune.youtubeId,
        youtubeThumbnailURL: tune.youtubeThumbnailURL
      };
    }));
  });
});

app.get('/getTune/:name', (req, res) => {
  const name = req.params.name;
  Tune.findOne({name: name}, (err, tune) => {
    if(!tune){
      return res.status(404).send('No tune found :(');
    }
    return res.send(tune);
  });
});


const apikey = 'AIzaSyCjIeU80Kva2dzUCIczl-3pzJSrli73TFc';
let dets = [];
Tune.find({youtubeId: {$exists: false}}, (err, tunes) => {
  tunes.forEach(tune => {
    dets.push(tune.name);
  });
});

let tmp = [];
// Tune.find({}, (err, res) => {
//   res.forEach(t => {
//     tmp.push(t.youtubeId);
//     console.log(tmp.)
//   });
// });

console.log(tmp.length);

let i = 0;
// setInterval(() => {
//   update(i);
//   i++;
// }, 1000);

function update() {
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apikey}&q=${dets[i]}-jazz`).then(response => {
    const sets = {
      youtubeThumbnailURL: response.data.items[0].snippet.thumbnails.high.url,
      youtubeId: response.data.items[0].id.videoId
    };
    Tune.updateOne({name: dets[i]}, {$set: sets}, (err ,num) => {
      console.log(`updated ${dets[i]}`);
    });
  }).catch(err => {
    console.log('ERROR' + err);
  });
}

app.listen(process.env.PORT, () => {
    console.log(`Magic Voicing listening on port ${process.env.PORT}!`);
});
