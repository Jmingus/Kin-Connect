Parse.Cloud.run('eventEmailNotification', {},{
    success: function (email) {
        console.log('Sent Email')
    },
    error: function (error) {
    }
});
Parse.Cloud.run('eventTextNotification', {},{
    success: function (text) {
        console.log('Sent Text')
    },
    error: function (error) {
    }
});