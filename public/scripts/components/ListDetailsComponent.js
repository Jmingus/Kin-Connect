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
   render: function(){
       if(this.state.listTitle !== []){
           var list = this.state.listTitle
       }
       return(
           <div className="ListDetailsComponent">
                <h4>{list}</h4>
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
       )
   }
});