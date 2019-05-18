import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import _ from 'lodash';
import octivian from 'octavian';
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
  console.log(tune);
  tune.save().then(tune => {
    return res.status(200).json({'tune': 'tune added!'});
  }).catch(err => {
    return res.status(400).send('Database access error: ' + err);
  });
});

app.get('/getAllTunes', (req, res) => {
  Tune.find({style: 'Latin'}, (err, tunes) => {
    return res.send(_.map(tunes, tune => {
      return tune.name;
    }));
  });
});

app.get('/getTune/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  Tune.findOne({name: name}, (err, tune) => {
    if(!tune){
      return res.status(404).send('No tune found :(');
    }
    return res.send(tune);
  });
});

// fs.readFile('./songs', (err ,data) => {
//   if(err) throw err;
//   const tmp = ireader(data);
//   fs.writeFile('ireal', JSON.stringify(tmp.songs));
//   // console.log(tmp);
// });

// fs.readFile('ireal.json', (err, data) => {
//   try {
//     const json = JSON.parse(data);
//     _.forEach(json, (tune, i) => {
//       const tuneSchema = {
//         name: tune.title,
//         composer: tune.composer,
//         measures: tune.music.measures,
//         key: tune.key,
//         style: tune.style,
//         bpm: tune.bpm,
//         timeSignature: tune.music.timeSignature,
//         raw: tune.music.raw
//       }
//       let newTune = new Tune(tuneSchema);
//       newTune.save().then(msg => {
//         console.log(`added ${i}th tune: ${tune.title}`);
//       }).catch(e => {
//         console.error(e);
//       });
//     });

//     // console.log(json[0]);
//   } catch(e) {
//     console.error(e);
//   }
// });

app.listen(process.env.PORT, () => {
    console.log(`Magic Voicing listening on port ${process.env.PORT}!`);
});