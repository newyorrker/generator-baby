'use strict';

const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function () {

	var props = this.props;
	var tempPath = this.templatePath();
	var destPath = this.destinationPath();

	props._ = {
    kebabCase: _.kebabCase
  };

	//create directories
	mkdirp(path.join(destPath, '/src/images/icon'));
	mkdirp(path.join(destPath, '/src/templates/pages'));

	//copy and templating
  this.fs.copyTpl(
  	tempPath,
  	destPath,
  	props
  );
}