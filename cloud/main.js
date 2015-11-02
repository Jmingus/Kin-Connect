var Parse = require('parse-cloud-express').Parse;
var postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);


Parse.Cloud.define('emailNotification', function(request,response){
    postmark.send({
        "From": "jmingus@austin.rr.com",
        "To": "jmingus@austin.rr.com",
        "Subject": "Hello from Kin-Connect",
        "TextBody": "req",
        "Tag": "email-notification"
    }, function(error, success) {
        if(error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        if(success){
            response.success(response, 'Email Sent');
            console.info("Sent to postmark for delivery")
        }
    });
});