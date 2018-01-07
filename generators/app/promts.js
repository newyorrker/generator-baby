const path = require('path');
const _ = require('lodash');
const user = require('yeoman-generator/lib/actions/user');

function makeProjectName(name) {
  name = _.kebabCase(name);
  return name;
}
function makeGitUser(gitUser) {
  gitUser = _.kebabCase(gitUser);
  return gitUser;
}
function makeRepo(repoName) {
  repoName = 'https://github.com/' +  user.git.name() + '/' + _.kebabCase(repoName);
  return repoName;
}

module.exports = [
  {
    name: 'name',
    message: 'Your project name',
    default: makeProjectName(path.basename(process.cwd())),
    filter: makeProjectName
  },
  {
    name: 'gitUser',
    message: 'Your GitHub username',
    default: user.git.name(),
    filter: makeGitUser
  },
  {
    name: 'repoName',
    message: 'GitHub repository name',
    default: makeProjectName(path.basename(process.cwd())),
    filter: makeRepo
  },
  {
    type: 'confirm',
    name: 'emptyRepo',
    message: 'Initialize empty Git repository in project?',
    default: true
  },
  {
    type: 'confirm',
    name: 'addRemote',
    message: 'Add remote to repository from Github?',
    default: false
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies right now?',
    default: false
  }
];