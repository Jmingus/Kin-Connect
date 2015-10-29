var React = require('react');
module.exports = React.createClass({
   componentDidMount: function(){
       $(document).ready(function(){
           $('.collapsible').collapsible({
               accordion: false
           });
       })
   },
   render: function() {
       return (
           <li key={this.props.event.id}
               id={this.props.event.id}>
               <div
                   className="collapsible-header">{this.props.event.get('eventName')}</div>
               <div
                   className="collapsible-body event">
                   <p>{this.props.event.get('startTime')} {this.props.event.get('endTime')} {this.props.event.get('eventDescription')}</p>
               </div>
           </li>
       )
   }
});