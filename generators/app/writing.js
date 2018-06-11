const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function() {
  var props = this.props;

  props._ = {
    kebabCase: _.kebabCase
  };

  // Write a .gitignore
  this._writeDotFiles = () => {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
  };

  this._writeModuleFiles = () => {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      props
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    if (props.bundle === 'Webpack') {
      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
    }
  };

  this._writeGulp = () => {
    // Tasks without conditions
    this.fs.copy(
      this.templatePath('gulp/config.js'),
      this.destinationPath('gulp/config.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/watch.js'),
      this.destinationPath('gulp/tasks/watch.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/main-task.js'),
      this.destinationPath('gulp/tasks/main-task.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/build.js'),
      this.destinationPath('gulp/tasks/build.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/fonts.js'),
      this.destinationPath('gulp/tasks/fonts.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/images.js'),
      this.destinationPath('gulp/tasks/images.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/nunjucks.js'),
      this.destinationPath('gulp/tasks/nunjucks.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/sass.js'),
      this.destinationPath('gulp/tasks/sass.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/sprite-png.js'),
      this.destinationPath('gulp/tasks/sprite-png.js')
    );
    this.fs.copy(
      this.templatePath('gulp/tasks/clean.js'),
      this.destinationPath('gulp/tasks/clean.js')
    );

    switch (props.bundle) {
      case 'Webpack':
        this.fs.copy(
          this.templatePath('gulp/tasks/webpack.js'),
          this.destinationPath('gulp/tasks/webpack.js')
        );
        break;
      case 'Browserify':
        this.fs.copy(
          this.templatePath('gulp/tasks/browserify.js'),
          this.destinationPath('gulp/tasks/browserify.js')
        );
        break;
      case 'Manual':
        this.fs.copy(
          this.templatePath('gulp/tasks/js.js'),
          this.destinationPath('gulp/tasks/js.js')
        );
        break;
    }
  };

  // Create directories
  this._createDir = () => {
    mkdirp(path.join(this.destinationPath(), 'src/images/icon'));
    mkdirp(path.join(this.destinationPath(), 'src/templates/pages'));
  };

  // Copy and templating
  this._templating = () => {
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), props);
  };
};
