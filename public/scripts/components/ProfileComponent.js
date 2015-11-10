var React = require('react');
var moment = require('moment');
var Event = require('../models/EventModel');
module.exports = React.createClass({
    getInitialState: function(){
        return{
            phoneNumberEditFlag: false,
            birthdayEditFlag: false,
            birthday: undefined,
            phoneNumber: undefined
        }
    },
    componentDidMount: function(){
        this.setState({birthday: Parse.User.current().get('birthday')});
        this.setState({phoneNumber: Parse.User.current().get('phoneNumber')});
    },
    render: function(){
        let birthday;
        let phoneNumber;
        let currentUser = Parse.User.current();
        if (currentUser.get('emailNotifications') !== undefined && currentUser.get('emailNotifications') === true){
                $('#emailNotifications').attr('checked', true)
        }
        if (currentUser.get('textNotifications') !== undefined && currentUser.get('textNotifications') === true){
                $('#textNotifications').attr('checked', true)
        }
        if(this.state.birthday === undefined){
            birthday = (<h5> Birthday : Not Set</h5>);
        }else{
            birthday = (<h5> Birthday : {currentUser.get('birthday')} </h5>)
        }
        if(this.state.birthdayEditFlag === true){
            birthday = (<label>Birthday<input type="date" ref="birthday" /></label>);
            var birthdaySubmit = (<button className="btn-large waves-effect" onClick={this.birthdaySubmit}>Submit</button>)
        }
        if(this.state.phoneNumber === undefined){
            phoneNumber = (<h5> Mobile Number : Not Set</h5>);
        }else{
            phoneNumber = (<h5> Mobile Number : {currentUser.get('phoneNumber')} </h5>)
        }
        if(this.state.phoneNumberEditFlag === true){
            phoneNumber = (<label>Mobile Number<input type="text" ref="phoneNumber" /></label>);
            var phoneNumberSubmit =  (<button className="btn-large waves-effect" onClick={this.phoneNumberSubmit}>Submit</button>)
        }

        return(
            <div className="ProfileComponent container">
                <div className="row card-panel">
                    <h5> <span className="profileSubheader">Family Code</span> : {currentUser.get('familyId')}</h5>
                    <h5> <span className="profileSubheader">Name</span> : {currentUser.get('firstname')} {currentUser.get('lastname')}</h5>
                    <h5> <span className="profileSubheader">Email</span> : {currentUser.get('email')} </h5>
                </div>
                <div className="row card-panel">
                    <div className="col s12 l6">
                        {phoneNumber}
                        <button className="btn-large waves-effect profile-edit-button" onClick={this.editPhoneNumber}>Edit</button>
                        {phoneNumberSubmit}
                    </div>
                    <div className="col s12 l6">
                        {birthday}
                        <button className="btn-large waves-effect profile-edit-button" onClick={this.editBirthday}>Edit</button>
                        {birthdaySubmit}
                    </div>
                </div>
                <div className="row card-panel">
                    <div className="col s12 m6">
                        <h5>Email Notifications</h5>
                        <div className="switch">
                            <label>
                                Off
                                <input type="checkbox" id="emailNotifications" onClick={this.editEmailNotification} ref="emailNoti"/>
                                <span className="lever"></span>
                                On
                            </label>
                        </div>
                    </div>
                    <div className="col s12 m6">
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
            </div>
        )
    },
    phoneNumberSubmit: function(){
        Parse.User.current().set('phoneNumber', this.refs.phoneNumber.value);
        Parse.User.current().save();
        this.setState({phoneNumberEditFlag : false})
    },
    birthdaySubmit: function(){
        Parse.User.current().set('birthday', moment(new Date(this.refs.birthday.value)).format('MMMM Do YYYY'));
        Parse.User.current().save();
        this.setState({birthdayEditFlag : false});
        this.addBirthday();
    },
    editPhoneNumber: function(){
        if(this.state.phoneNumberEditFlag === false){
            this.setState({phoneNumberEditFlag : true})
        }else{
            this.setState({phoneNumberEditFlag : false})
        }
    },
    editBirthday: function(){
        if(this.state.birthdayEditFlag === false){
            this.setState({birthdayEditFlag : true})
        }else{
            this.setState({birthdayEditFlag : false})
        }
    },
    editEmailNotification: function(){
        Parse.User.current().set('emailNotifications', this.refs.emailNoti.checked);
        Parse.User.current().save();
    },
    editTextNotification: function(){
        Parse.User.current().set('textNotifications', this.refs.textNoti.checked);
        Parse.User.current().save();
    },
    addBirthday: function(){
        let user = `${Parse.User.current().get('firstname')} ${Parse.User.current().get('lastname')}'s Birthday`;
        let currentDateSliced = moment().format('MMMM Do YYYY').slice(-4);
        let userBirthdaySliced = moment(new Date(this.refs.birthday.value)).format('MMMM Do YYYY').slice(0, -4);
        let userBirthday = userBirthdaySliced + currentDateSliced;
        let newEvent = new Event({
            eventName : user,
            dateOfEvent: userBirthday,
            startTime: 'All Day',
            endTime: 'All Day',
            eventDescription: `Its ${user}`,
            userId: Parse.User.current()
        });
        newEvent.save()
    }
});