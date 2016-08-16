# Aesculapius-front
Aesculapius Front End

## Run:
This steps are made for running the project in a nodejs server, using grunt. If you wan't also contribute to this project, do the "Steps to develop" below after the steps to run.

**Install npm and node:**  
*on ubuntu/debian based*  

    sudo apt install nodejs npm
    sudo ln -s /usr/bin/nodejs /usr/bin/node # This symlink is necessary in some cases

  - Windows, Mac and other Linux users can install npm *From official npm page: https://docs.npmjs.com/getting-started/installing-node*

**Configure npm permissions:**  
*From official page: https://docs.npmjs.com/getting-started/fixing-npm-permissions*

    sudo chown -R $(whoami) /usr/local/
    sudo chown -R $(whoami) $HOME/.npm/ # May work or not doesn't matter

**Now clone this repo and install dependencies:**  

    git clone https://github.com/aesculapiusteam/aesculapius-front.git
    npm install -g grunt-cli bower
    cd aesculapius-front
    npm install (This will take a while)
    bower install

**Run:**  
This should open your browser to see the page, if not, enter the link that appears in the grunt output. By default: http://localhost:9000

    grunt serve     

## Develop

### Yeoman, generator-angular and generator-karma

We use yeoman with generator-angular for automatized creation of angular controllers, views, routes, etc. Look how to use it in the *README.md* file from here: https://github.com/yeoman/generator-angular

You can install yeoman, generator-angular and generator-karma with this command

    npm install -g yo generator-angular generator-karma

### Documentation
The generator-angular package for yeoman already creates a default documentation comment in every controller/route/filter/etc that you create for your angular code using the ngdoc standard. To generate a html app with the docs we use grunt-ngdocs, but be free to use the one you like the most.

**Generate the docs:**

    grunt ngdocs

**Now go to the new docs directory and you will find a new web app. Serve it with whatever you like. We use the python module SimpleHTTPServer:**

    cd docs
    python -m SimpleHTTPServer

**For documenting specific methods that generator-angular doesn't cover use:**

    /**
     * @ngdoc method
     * @name methodName
     * @methodOf module.ControllerName
     * @description
     * Describe the method here...
     *
     * @param {string} Description of parameter
     * @returns {Array} The returned item...
     */

**If for some reason you need to document something else manually, use the ngdoc documentation:**

https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
