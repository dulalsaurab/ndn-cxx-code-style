

var review = require('./review');

function getFiles(){
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);
      var root_dir = '/Users/saurabdulal/Documents/mini-ndn/mini-ndn/NLSR';
      async function getCommitedFiles() {
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
getFiles();


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
