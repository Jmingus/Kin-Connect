var React = require('react');

module.exports = React.createClass({
    render: function(){
        let currentUser = Parse.User.current();
        if (currentUser.get('emailNotifications') !== undefined && currentUser.get('emailNotifications') === true){
                $('#emailNotifications').attr('checked', true)
        }
        if (currentUser.get('textNotifications') !== undefined && currentUser.get('textNotifications') === true){
                $('#textNotifications').attr('checked', true)
        }
        return(
            <div className="ProfileComponent">
                <div>
                    <h5> Family Code : {currentUser.get('familyId')}</h5>
                    <h5> Name : {currentUser.get('firstname')} {currentUser.get('lastname')}</h5>
                    <h5> Email: {currentUser.get('email')} </h5>
                    <h5>Email Notifications</h5>
                    <div className="switch">
                        <label>
                            Off
                            <input type="checkbox" id="emailNotifications" onClick={this.editEmailNotification} ref="emailNoti"/>
                            <span className="lever"></span>
                            On
                        </label>
                    </div>
                    <h5>Text Notifications</h5>
                    <div className="switch">
                        <label>
                            Off
                            <input type="checkbox" id="textNotifications" onClick={this.editTextNotification} ref="textNoti" />
                            <span className="lever"></span>
                            On
                        </label>
                    </div>
                </div>
            </div>
        )
    },
    editEmailNotification: function(){
        Parse.User.current().set('emailNotifications', this.refs.emailNoti.checked);
        Parse.User.current().save();
    },
    editTextNotification: function(){
        Parse.User.current().set('textNotifications', this.refs.textNoti.checked);
        Parse.User.current().save();
    }
});