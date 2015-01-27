'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk');

var smacssGenerator = yeoman.generators.Base.extend({

    // STRUCTURE

    // constructor
    // initializing
    // prompting
    // configuring
    // default
    // writing
    // conflicts
    // install
    // end

    constructor: function () {
        // note: arguments and options should be defined in the constructor.
        yeoman.generators.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

        this.option('skip-install', {
            desc: 'Skips the installation of dependencies',
            type: Boolean
        });

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });

        // This method adds support for a `--coffee` flag
        this.option('coffee');
        // And you can then access it later on this way; e.g.
        this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
    },

    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        if (!this.options['skip-welcome-message']) {
            // Welcome Message
            this.log(yosay('Yo! Welcome to SMACSS'));
            console.log(chalk.magenta.bold('You\'re using the perfectionist generator for frontend.'));
            console.log(chalk.gray('================================================================'));
            console.log(chalk.gray('Answer (3) simple questions to kick start your project'));
        }

        var prompts = [{
            name: 'appName',
            message: 'What would you like to name your app/site?',
            default: 'New Project'
        },{
            name: 'appType',
            message: 'Kind of app/site you are trying to build?',
            type: 'list',
            choices:[{
                name: 'Static HTML',
                value: 'includeStaticApp',
                checked: false
            },{
                name: 'Angular App',
                value: 'includeAngularApp',
                checked: false
            },{
                name: 'Ember App',
                value: 'includeEmberApp',
                checked: false
            },{
                name: 'Mobile App',
                value: 'includeMobileApp',
                checked: false
            }],
            default: 1
        },{
            name: 'appFeatures',
            message: 'How about some additional features',
            type: 'checkbox',
            choices:[{
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: false
            },{
                name: 'jQuery',
                value: 'includeQuery',
                checked: false
            },{
                name: 'Respond',
                value: 'includeRespond',
                checked: false
            }]
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appType = props.appType;
            this.appFeatures = props.appFeatures;
            this.response = props.response;
            this.taskrunner = props.taskrunner;
            this.csspreprocessor = props.csspreprocessor;

            this.log(chalk.gray('================================================================'));
            this.log(chalk.gray('Creating the project for you, please wait...'));

            /*
            var hasFeature = function (feat) {
              return props.features.indexOf(feat) !== -1;
            };

            this.includeRespondJS = hasFeature('includeRespondJS');
            this.includePlaceholderJS = hasFeature('includePlaceholderJS');
            this.includeBackgroundSizeJS = hasFeature('includeBackgroundSizeJS');
            this.includeSelectivizrJS = hasFeature('includeSelectivizrJS');
            this.includeModernizr = hasFeature('includeModernizr');
            */

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir(this.appName + '/app');
        this.mkdir(this.appName + '/app/css');
        this.mkdir(this.appName + '/app/scss');
        this.mkdir(this.appName + '/app/js');
        this.mkdir(this.appName + '/app/fonts');
        this.mkdir(this.appName + '/app/images');
        this.mkdir(this.appName + '/app/section');
        this.mkdir(this.appName + '/build');
        this.log(chalk.green('Your project is created, cd to your project to-do more!'));
    },

    copyMainFiles: function() {
        var context = {
            site_name: this.appName
        };

        this.template("_package.json", this.appName + "/package.json", context);
        this.copy("_gulpfile.js", this.appName + "/gulpfile.js");

        // HOMEPAGE
        this.template("_index.html", this.appName + "/app/index.html", context);

        // TODO: Add this after integrating gulp-partial
        // this.template("_header.html", this.appName + "/app/header.html", context);
        // this.copy("_footer.html", this.appName + "/app/footer.html");

        // CSS
        this.copy("_main.css", this.appName + "/app/css/main.css");
        this.copy("scss/_master.scss", this.appName + "/app/scss/master.scss");
        this.copy("scss/_base.scss", this.appName + "/app/scss/base.scss");
        this.copy("scss/_layout.scss", this.appName + "/app/scss/layout.scss");
        this.copy("scss/_module.scss", this.appName + "/app/scss/module.scss");
        this.copy("scss/_page.scss", this.appName + "/app/scss/page.scss");
    },

    helper: function () {
        //console.log('Need some Help?');
    },

    errorHanding: function () {
        //this.log('Something has gone wrong!');
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },

    paths: function () {
        //var destinationRoot = this.destinationRoot();
        //this.log(destinationRoot);
        // returns '~/projects'

        // this.destinationPath('index.js');
        // returns '~/projects/index.js'
    },

    projectfiles: function() {
        // this.copy('editorconfig', '.editorconfig');
        // this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = smacssGenerator;