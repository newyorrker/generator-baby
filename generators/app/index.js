'use strict';
const Yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const prompts = require('./promts');
const writeFiles = require('./writing');

module.exports = class extends Yeoman {
  initializing() {
    this.log(yosay("Hey dude, it's a  " + chalk.red('generator-baby')));
  }

  prompting() {
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    // Prepare the repository
    this.prepareRepo = function(start) {
      if (start) {
        this.spawnCommandSync('curl', [
          '-u',
          this.props.gitUser,
          'https://api.github.com/user/repos',
          '-d',
          '{"name": "' + this.props.name + '"}'
        ]);
      }
      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', [
        'remote',
        'add',
        'origin',
        this.props.repoName + '.git'
      ]);
      this.spawnCommandSync('git', ['fetch', 'origin']);
      this.spawnCommandSync('git', ['checkout', 'master']);
      this.spawnCommandSync('git', ['branch', '--set-upstream-to=origin/master']);
    };

    if (this.props.createRepo) this.prepareRepo(true);

    if (this.props.emptyRepo) this.prepareRepo(false);
  }

  writing() {
    writeFiles.call(this);
    this._writeGulp();
    this._writeModuleFiles();
    this._createDir();
    this._templating();
    this._writeDotFiles();
  }

  install() {
    if (this.props.install) {
      this.installDependencies({
        npm: true,
        bower: false
      });
    } else {
      this.log('Run ' + chalk.blue('npm install') + ' to install dependencies later');
    }
  }
  end() {
    this.log('Thanks for using this generator!');
  }
};
