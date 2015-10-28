var React = require('react');
var Lists = require('../models/ListsModel');
var Backbone = require('backbone');

module.exports = React.createClass({
   getInitialState: function(){
     return{
         listTitle: null,
         listDetails: []
     }
   },
   componentWillMount(){
       this.props.router.on('route', () => {
           this.fetchList();
       });
       this.fetchList();
   },
   componentDidMount(){
       $(document).ready(function(){
           $('.tooltipped').tooltip({delay: 30});
       });
   },
   render: function(){
       if(this.state.listTitle !== []){
           var list = this.state.listTitle
       }
       var allItems = this.state.listDetails.map(function(item){
           return(<li>{item.listItemName}</li>)
       });
       return(
           <div className="ListDetailsComponent">
                <h4>{list}</h4>
                <div className="fixed-action-btn action-button">
                   <a className="btn-floating btn-large main-floating-button">
                       <i className="large material-icons">mode_edit</i>
                   </a>
                   <ul>
                       <li><a className="btn-floating light-green darken-1 tooltipped" data-position="left" data-delay="30" data-tooltip="Add List Item"><i className="material-icons">add</i></a></li>
                       <li><a className="btn-floating yellow darken-2 tooltipped" data-position="left" data-delay="30" data-tooltip="Edit List"><i className="material-icons">settings</i></a></li>
                       <li><a className="btn-floating red darken-1 tooltipped" data-position="left" data-delay="30" data-tooltip="Delete List"><i className="material-icons">close</i></a></li>
                    </ul>
                </div>
                <ul>{allItems}</ul>
           </div>
       )
   },
   fetchList: function(){
       var listTitleQuery = new Parse.Query('Lists');
       listTitleQuery.equalTo('objectId', this.props.list);
       listTitleQuery.first().then(
           (listTitle) => {
               this.setState({listTitle: listTitle.get('listTitle')})
           },
           (err) => {
               console.log(err)
           }
       );
       var listDetailsQuery = new Parse.Query('List');
       listDetailsQuery.equalTo('listId', this.props.list);
       listDetailsQuery.find().then(
           (listDetails) => {
               this.setState({listDetails: listDetails})
           },
           (err) => {
               console.log(err)
           }
       );
   },
   addListItem: function(){

   }
});