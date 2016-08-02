# Aesculapius-front
Aesculapius Front End

## Steps to run:
This steps are made for running the project in a nodejs server, using grunt. If you wan't also contribute to this project, do the "Steps to develop" below after the steps to run.

1. Install npm and node:  

  - Windows, Mac and Linux: *From official page: https://docs.npmjs.com/getting-started/installing-node*

  - Linux: with your package manager. On ubuntu based distros should be:
    - **sudo apt install nodejs npm**  

    - **sudo ln -s /usr/bin/nodejs /usr/bin/node** (This symlink is necessary in some cases)

2. Configure npm permissions:  
  *From official page: https://docs.npmjs.com/getting-started/fixing-npm-permissions*

  - **sudo chown -R $(whoami) /usr/local/**

  - **sudo chown -R $(whoami) $HOME/.npm/** (May work or not doesn't matter)

3. Now clone this repo and install dependencies:

  - **git clone https://github.com/aesculapiusteam/aesculapius-front.git**

  - **npm install -g grunt-cli bower**

  - **cd aesculapius-front**

  - **npm install** (This will take a while)

  - **bower install**

4. Run:
  - **grunt serve** (This should open your browser to see the page, if not, enter the link in the grunt output. Default: http://localhost:9000)

## Steps to develop

1. Install yeoman, generator-angular and generator-karma

  - **npm install -g yo generator-angular generator-karma**

## Some useful tricks to develop

  - Look here (the README.md) for automatized creation of angular controllers, views, routes, etc: https://github.com/yeoman/generator-angular
