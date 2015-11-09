var Parse = require('parse-cloud-express').Parse;
var postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);


Parse.Cloud.define('emailNotification', function(request,response){
    console.log(request.params, request.params.get('email'), request.params.get('familyId'));
    postmark.send({
        "From": "jmingus@austin.rr.com",
        "To": request.params.get('email'),
        "Subject": "Hello from Kin-Connect!",
        "TextBody": `Welcome to Kin-Connect, Your family code is ${request.params.get('familyId')}, send this code to other family members so they can sign up to your family!`,
        "Tag": "signUp-Notification"
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