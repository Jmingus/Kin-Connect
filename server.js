// Require Node Modules
var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    Parse = require('parse/node'),
    ParseCloud = require('parse-cloud-express');
    postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);



var app = express();

// Import your cloud code (which configures the routes)
require('./cloud/main.js');

// Mount the webhooks app to a specific path (must match what is used in scripts/register-webhooks.js)
app.use('/webhooks', ParseCloud.app);

// Host static files from public/
app.use(express.static(__dirname + '/public'));
app.get('/#eventmanagement/email', function(req,res){
    postmark.send({
        "From": "kinconnect@connection.com",
        "To": "jmingus@austin.rr.com",
        "Subject": "Hello from Kin-Connect",
        "TextBody": "Hello!",
        "Tag": "email-notification"
    }, function(error, success) {
        if(error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        console.info("Sent to postmark for delivery")
    });
});

// Catch all unknown routes.
app.all('/', function(request, response) {
  response.status(404).send('Page not found.');
});
/*
 * Launch the HTTP server
 */
var port = process.env.PORT || 5000;
var server = http.createServer(app);
server.listen(port, function() {
  console.log('Cloud Code Webhooks server running on port ' + port + '.');
});

