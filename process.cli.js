// This is the main script which should be exectued using node
// It gets all the files that are added but not committed, and performs
// the code-style check
// for more information about code-style: https://named-data.net/doc/ndn-cxx/current/code-style.html

var review = require('./review');

function getFiles(){
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);
      // uncomment the line below, and set the appropriate path
      // if you want to execute code-style from outside the git repo
      // var root_dir = '/path-to-git-repo/mini-ndn/mini-ndn/NLSR';
      async function getCommitedFiles() {
        // uncomment the line below if you are executing code-style from outside the git repo, and comment the line below it
        // const { stdout, stderr } = await exec('git --git-dir='+ root_dir +'/.git --work-tree='+ root_dir+ ' diff HEAD~ --name-only');
        const { stdout, stderr } = await exec('git diff HEAD~ --name-only');
        return stdout;
      }
      getCommitedFiles().then(function(response){
        var fileList = response.split("\n");
          for (file of fileList){
            if (file){
              // uncomment the line below if you are executing code-style from outside the git repo, and comment the line below it
              // var commandConstrut = 'cat ' + root_dir+'/'+file.toString();
              var commandConstrut = 'cat '+file.toString();
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
getFiles();

// current the function below is not used
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
    // return request('/a/changes/' + change.id + '/revisions/' + change.current_revision + '/review', JSON.stringify(j));
  }
}
