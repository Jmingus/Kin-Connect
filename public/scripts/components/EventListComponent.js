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
               <div className="collapsible-header">
                   {this.props.event.get('eventName')}
               </div>
               <div className="collapsible-body event">
                   <div className="row">
                       <p className="description section">{this.props.event.get('eventDescription')}</p>
                   </div>
                   <div className="row">
                       <div className="col s6">
                           <p className="times">StartTime : {this.props.event.get('startTime')}</p>
                       </div>
                       <div className="col s6">
                           <p className="times">EndTime : {this.props.event.get('endTime')}</p>
                       </div>
                   </div>


               </div>
           </li>
       )
   }
});