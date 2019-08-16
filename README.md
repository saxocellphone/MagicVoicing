# MagicVoicing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run api
Navigate to /api and run `npm start` to start the backend.

## Debug Mode (VS Code)
In VS Code > Preferences > Settings, search for node debug, and turn on auto-attatch
Navigate to /api and run `npm run debug`.
Enjoy debugging

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Installing the Environment and Running the Project

#### Windows 10

0) Clone MagicVoicing with `git clone git@github.com:saxocellphone/MagicVoicing.git`

1) Ensure that Node.js is installed. 

2) Install Angular CLI globally with `npm install -g @angular\cli`.

3) Navigate to `\MagicVoicing\` and run `npm install`.

4) Navigate to `\MagicVoicing\api` and run `npm install`. If prompted, run `npm audit fix`.

5) To launch the app, navigate to `\MagicVoicing\` and run `ng serve` and in the `\api` folder, run `npm start`.

##### Issues

You may encounter an error that claims that nodemon file watcher limit has been reached. We worked around this by running `run echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

If the app does not appear in the browser, and you are running Docker through VirtualBox, launch Virtaubox, select the VM, and navigate to -> settings -> networking -> advanced -> port forwarding, and set rules to forward 4000 and 4200.

#### MacOS

We use Docker to run the project on MacOS. If you wish to build the development environment without it, feel free to contribute to the

#### Linux (Ubuntu 18.04.2)

0) Clone MagicVoicing with `git clone git@github.com:saxocellphone/MagicVoicing.git`

1) Run `sudo apt-get install curl software-properties-common`

2) Run `curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -` and `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list` to add the yarn repository

3) Run `sudo apt-get update && sudo apt-get install yarn`

4) Run `alias ng="/usr/local/lib/node_modules/@angular/cli/bin/ng` to define the ng command.

5) Run `npm install -g @angular\cli` to install angular CLI globally. 

6) Navigate to `\MagicVoicing\` and run `npm install`.

7) Navigate to `\MagicVoicing\api` and run `npm install`. If prompted, run `npm audit fix`.

8) To launch the app, navigate to `\MagicVoicing\` and run `ng serve` and in the `\api` folder, run `npm start`.

#### Docker

Currently, the Docker instance of MagicVoicing works on MacOS and Linux. To build the project using Docker:

0) Clone MagicVoicing with `git clone git@github.com:saxocellphone/MagicVoicing.git`

1) Navigate to the installation folder and build the Docker container with `docker build . -t magicvoicing`. This names the Docker image "magicvoicing". 

2) Setup a MongoDB container with `docker run --name db mongo:3.2`. This creates the container if it didn't exist already, and names it "db". You can stop the container with `docker stop db`. Once the name of the container is set, you can re-start it with `docker run db`. 

3) Once the Mongo container is running and the MagicVoicing container is built successfully, the project can be ran with `docker run --name mv -p 4000:4000 -p 4200:4200 --link db:db magicvoicing` where `db` is the name of an instance of the running mongoDB Docker container.
When restarting the container, use `docker run mv -p 4000:4000 -p 4200:4200 --link db:db`.

4) Once the container outputs "Compiled Successfully", the app can be viewed by entering `localhost:4200` in a web browser.
