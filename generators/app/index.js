'use strict';
const Yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const prompts = require('./promts');
const writeFiles = require('./writing');

module.exports = class extends Yeoman {
  initializing() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the striking ' + chalk.red('generator-baby') + ' generator!')
    );
  }
  prompting() {
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
  default() {
    if (this.props.emptyRepo) {
      this.spawnCommand('git', ['init']);
    } else {
      this.log('If repository is not inited, use command ' + chalk.red('git init'));
    }
  }
  writing() {
    writeFiles.call(this);
    this._writeGit();
    this._writeBower();
  }
  _writeGit() {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
  }
  _writeBower() {
    this.fs.copy(this.templatePath('.bowerrc'), this.destinationPath('.bowerrc'));
  }
  install() {
    this.log('Please create new repository for your new project');
    this.log(
      'In order to create Github repository follow the link ' +
        chalk.red('https://github.com/new')
    );
    if (this.props.addRemote) {
      this.spawnCommand('git', ['remote', 'add', 'origin', this.props.repoName + '.git']);
    }
    if (this.props.install) {
      this.installDependencies({
        npm: true,
        bower: true
      });
    } else {
      this.log('Run ' + chalk.blue('npm install') + ' to install dependencies later');
    }
  }
  end() {
    this.log('Thanks for using this generator!');
  }
};
