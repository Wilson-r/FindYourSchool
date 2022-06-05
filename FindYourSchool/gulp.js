gulp.task('updateURL', function (done) {
    exec('node ./replace.build.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      done();
    });
  });