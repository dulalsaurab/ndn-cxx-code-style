(function(exports){
var config = require('./config');
var curl = require('./curl');
var review = require('./review');

var request = curl.request.bind(this, config.GERRIT_ROOT, ['--basic', '--user', [config.GERRIT_USER, config.GERRIT_HTTPPASSWD].join(':')]);

function listChanges(query) {
  return request('/a/changes/?q=4551&o=CURRENT_REVISION&o=CURRENT_FILES')
    .then(function(resp){
      var j = JSON.parse(resp.body.replace(/^\)]}'\n/, ''));
      return Promise.resolve(j);
    });
}
function getFiles(){
// git --git-dir=ndn-cxx-code-style/.git --work-tree=ndn-cxx-code-style/ diff HEAD~ --name-only
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);
      var root_dir = '/Users/saurabdulal/Documents/mini-ndn/mini-ndn/NLSR';
      async function getCommitedFiles() {
        // const { stdout, stderr } = await exec('git --git-dir='+ root_dir +'/.git show --pretty="" --name-only');
        const { stdout, stderr } = await exec('git --git-dir='+ root_dir +'/.git --work-tree='+ root_dir+ ' diff HEAD~ --name-only');
        return stdout;
      }
      getCommitedFiles().then(function(response){
        var fileList = response.split("\n");
          for (file of fileList){
            if (file){
              var commandConstrut = 'cat ' + root_dir+'/'+file.toString();
              async function catFiles() {
                var fileCopy = file;
                const { stdout, stderr } = await exec(commandConstrut);
                return [stdout, fileCopy];
              };
              catFiles().then(function(response){
                  review.reviewFile(response[0], response[1], "acb");
              });
        }}
      });
}

function fetchFiles(change) {

  if (!change.id) {
    return Promise.reject('change.id missing');
  }
  var currentRev = change.current_revision;
  if (!currentRev) {
    return Promise.reject('change.current_revision missing');
  }
  var revision = change.revisions[currentRev];
  if (!revision) {
    return Promise.reject('revision missing');
  }
  if (!revision.files) {
    return Promise.reject('revision.files missing');
  }

  return Promise.all(Object.keys(revision.files)
    .filter(function(filename){
      return revision.files[filename].status != 'D';
    })
    .map(function(filename){
      return request('/a/changes/' + change.id + '/revisions/' + currentRev + '/files/' + encodeURIComponent(filename) + '/content')
        .then(function(resp){

          // execute some command here
          // git --git-dir=ndn-cxx-code-style/.git log -1 executing git command if you are outside of the folder
          // git show --pretty="" --name-only - get the name of changed files
          //
          getFiles();

          //now at this point we have received the file names, let get the file content
          // });
          // console.log(a);
          // for (s of array)
          // {
          //   if(s){
          //     console.log(s);
          //     var cmd = 'cat ' + s;
          //
          //   }
          // }

          // var contents = new Buffer(resp.body, 'base64').toString('utf8');
          // return Promise.resolve({ filename:filename, contents:contents });
        });
    }));
}

function postComments(change, fileComments) {
  var j = {
    labels: {},
    comments: {}
  };
  var nComments = 0;
  Object.keys(fileComments).forEach(function(filename){
    var comments = fileComments[filename];
    j.comments[filename] = comments.map(function(comment){
      ++nComments;
      return {
        line: comment.line,
        message: 'rule ' + comment.rule + '\n' + comment.msg
      };
    });
  });
  j.message = config.COVER_INFO;
  j.labels = { "Code-Style": (nComments > 0 ? -1 : +1) };

  if (config.GERRIT_DRYRUN) {
    console.log(JSON.stringify(j, null, 2));
    return Promise.resolve('OK');
  }
  else {
    return request('/a/changes/' + change.id + '/revisions/' + change.current_revision + '/review', JSON.stringify(j));
  }
}

exports.listChanges = listChanges;
exports.fetchFiles = fetchFiles;
exports.postComments = postComments;
})(exports);
