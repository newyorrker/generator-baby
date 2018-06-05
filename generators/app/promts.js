const path = require('path');
const _ = require('lodash');
const user = require('yeoman-generator/lib/actions/user');

function appName() {
  name = _.kebabCase(path.basename(process.cwd()));
  return name;
}
function gitUser() {
  gitUser = _.kebabCase(user.git.name());
  return gitUser;
}
function makeRepo(repoName) {
  repoName = 'https://github.com/' + user.git.name() + '/' + _.kebabCase(repoName);
  return repoName;
}

module.exports = [
  {
    name: 'name',
    message: 'Your project name',
    default: appName
  },
  {
    name: 'gitUser',
    message: 'Your GitHub username',
    default: gitUser
  }, // Разветвление
  {
    name: 'repoName',
    message: 'GitHub repository name',
    default: appName,
    filter: makeRepo
  },
  {
    type: 'confirm',
    name: 'createRepo',
    message: 'Create a new Repository? (Only for mac users)',
    default: false
  },
  {
    when: function(response) {
      if (response.createRepo) {
        return false;
      }
      return true;
    },
    type: 'confirm',
    name: 'emptyRepo',
    message: 'OK, maybe initialize empty Git repository in project?',
    default: true
  },
  {
    type: 'list',
    name: 'bundle',
    message: 'Choose a js bundler?',
    choices: ['Webpack', 'Browserify', 'Manual'],
    default: 'Webpack'
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies right now?',
    default: false
  }
];
