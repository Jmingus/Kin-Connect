var Parse = require('parse-cloud-express').Parse;
var postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);
var client = require('twilio')(process.env.accountSid, process.env.authToken);
var Event = Parse.Object.extend('Event');
var moment = require('moment');


Parse.Cloud.define('emailSignUp', function(request,response){
    postmark.send({
        "From": "jmingus@austin.rr.com",
        "To": request.params.email,
        "Subject": "Hello from Kin-Connect!",
        "TextBody": "Welcome to Kin-Connect, Your family code is "+ request.params.familyId +
        ", send this code to other family members so they can sign up to your family!",
        "Tag": "signup-Notification"
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
Parse.Cloud.define('textNotification', function(request, response){
    client.messages.create({
        to: request.params.phoneNumber,
        from: process.env.twilioPhoneNumber,
        body: request.params.event + "is in a week's time!"
    }, function(err, message) {
        console.log(message.sid);
    });
});
Parse.Cloud.define('emailNotification', function(request,response){
    postmark.send({
        "From": "jmingus@austin.rr.com",
        "To": request.params.email,
        "Subject": "Upcoming Event",
        "TextBody": request.params.event + " is in a week's time!",
        "Tag": "email-event-notification"
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
Parse.Cloud.define('eventEmailNotification', function(request, response){
    var allEvents = [];
    var query = new Parse.Query(Parse.User);
    query.equalTo('emailNotifications', true);
    var innerQuery = new Parse.Query('Event');
    innerQuery.equalTo('dateOfEvent', moment().format('MMMM Do YYYY').add(1,'w'));
    innerQuery.find().then(
        function(events){
            allEvents.push(events)
        },
        function(err){
            response.error(err)
        }
    );
    if(allEvents === []){
        response.success(response, "No Events");
    }else {
        query.each(function (user) {
            allEvents.forEach(function(event){
                Parse.Cloud.run('emailNotification', {email: user.get('email'), event: event.get('eventName')}, {
                    success: function (email) {
                        console.log('Sent Email')
                    },
                    error: function (error) {
                    }
                });
            })
        });
        response.success(response, "Events Sent Out")
    }
});
Parse.Cloud.define('eventTextNotification', function(request, response){
    var allEvents = [];
    var query = new Parse.Query(Parse.User);
    query.equalTo('textNotifications', true);
    var innerQuery = new Parse.Query('Event');
    innerQuery.equalTo('dateOfEvent', moment().format('MMMM Do YYYY').add(1,'w'));
    innerQuery.find().then(
        function(events){
            allEvents.push(events)
        },
        function(err){
            response.error(err)
        }
    );
    if(allEvents === []){
        response.success(response, "No Events");
    }else {
        query.each(function (user) {
            allEvents.forEach(function(event){
                Parse.Cloud.run('textNotification', {phoneNumber: user.get('phoneNumber'), event: event.get('eventName')}, {
                    success: function (email) {
                        console.log('Sent Email')
                    },
                    error: function (error) {
                    }
                });
            })
        });
        response.success(response, 'Events Sent Out')
    }
});