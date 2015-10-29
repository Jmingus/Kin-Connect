var React = require('react');
var moment = require('moment');
var Calendar = require('react-calendar-pane');
var Event = require('../models/Event');
module.exports = React.createClass({
    onSelect: function (date) {
        if (moment().isSame(date, 'year')) {
            this.eventQuery(date);
        } else {
            return false;
        }
    },
    render: function() {
        let dayClasses = function (date) {
            let day = date.isoWeekday();
            if (day == 6 || day == 7) {
                return(['weekend'])
            }
            return([])
        };
        return (
            <div className="EventManagementComponent">
                <div className="row">
                    <div className="col s4"><Calendar onSelect={this.onSelect} dayClasses={dayClasses}/></div>
                    <div className="col s8"></div>

                </div>

            </div>
        );
    },
    eventQuery: function(date){
        let eventQuery = new Parse.Query('Event');
        eventQuery
    }
});