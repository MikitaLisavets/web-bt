let express = require('express'),
  path = require('path'),
  app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params[0]);
     res.sendfile( __dirname + req.params[0]); 
 });

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})