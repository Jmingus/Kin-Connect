var React = require('react');
var moment = require('moment');
var Calendar = require('react-calendar-pane');
var Event = require('../models/EventModel');
var EventListComponent = require('./EventListComponent');
module.exports = React.createClass({
    onSelect: function (date) {
        if (moment().isSame(date, 'year')) {
            this.eventQuery(date);
        } else {
            return false;
        }
    },
    getInitialState: function(){
        return{
            events: []
        }
    },
    componentWillMount: function(){
        this.eventQuery(moment())
    },
    componentDidMount: function(){
        $(document).ready(function() {
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 3
            });
            $('.collapsible').collapsible({
                accordion: false
            });
        });
    },
    render: function() {
        let dayClasses = function (date) {
            let day = date.isoWeekday();
            if (day == 6 || day == 7) {
                return(['weekend'])
            }
            return([])
        };
        let allEvents = this.state.events.map(function(event){
           return (
            <EventListComponent event={event} key={event.id} />
           )
        });
        return (
            <div className="EventManagementComponent">
                <div className="row">
                    <div className="col s5">
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">filter_drama</i>Add Event</div>
                                <div className="collapsible-body">
                                    <form className="event-form" onSubmit={this.addEvent}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" id="event-name" ref="eventName"/>
                                                <label htmlFor="event-name">Event Name</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <label htmlFor="datepicker">Event Date</label>
                                                <input type="date" className="datepicker" id="datepicker" ref="dateOfEvent"/>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="Start-Time" type="time" ref="startTime"/>
                                                <label htmlFor="Start-Time" className="active">Start Time</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="End-Time" type="time" ref="endTime"/>
                                                <label htmlFor="End-Time" className="active">End Time</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <label htmlFor="Event-Description">Event Description</label>
                                                <textarea id="Event-Description" className="materialize-textarea" ref="eventDescription"></textarea>
                                            </div>
                                            <button type="submit" className="btn-large waves-effect">Add Event</button>
                                        </div>
                                    </form>
                                </div>
                            </li>
                        </ul>

                        <Calendar onSelect={this.onSelect} dayClasses={dayClasses} />
                    </div>
                    <div className="col s7">
                        <div className="row">
                            <h3>Events</h3>
                            <ul className="collapsible popout" data-collapsible="accordion">
                                {allEvents}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        );
    },
    addEvent: function(e){
        e.preventDefault();
        let dateOfEvent = moment(new Date(this.refs.dateOfEvent.value)).format('MMMM Do YYYY');
        let newEvent = new Event({
            eventName : this.refs.eventName.value,
            dateOfEvent: dateOfEvent,
            startTime: this.refs.startTime.value,
            endTime: this.refs.endTime.value,
            eventDescription: this.refs.eventDescription.value,
            userId: Parse.User.current()
        });
        newEvent.save()
    },
    eventQuery: function(date){
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        let currentDate = moment(date._d).format('MMMM Do YYYY');
        let eventQuery = new Parse.Query('Event');
        eventQuery.matchesQuery('userId', innerQuery);
        eventQuery.equalTo('dateOfEvent', currentDate);
        eventQuery.find().then(
            (events) => {
                this.setState({events: events})
            },
            (err) => {
                console.log(err)
            }
        )
    }
});