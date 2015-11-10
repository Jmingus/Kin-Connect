var React = require('react');
var Lists = require('../models/ListsModel');
var List = require('../models/ListModel');
var Backbone = require('backbone');

module.exports = React.createClass({
   getInitialState: function(){
     return{
         listTitle: null,
         listDetails: [],
         listObject: [],
         currentUser: 0
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
           $('.modal-trigger').leanModal({
                   dismissible: true, // Modal can be dismissed by clicking outside of the modal
                   opacity: .5, // Opacity of modal background
                   in_duration: 200, // Transition in duration
                   out_duration: 200, // Transition out duration
                   ready: function() { }, // Callback for Modal open
                   complete: function() {$('.lean-overlay').remove()} // Callback for Modal close
               }
           );
       });
   },
   render: function(){
       var editButton = null;
       if(this.state.listTitle !== []){
           var list = this.state.listTitle
       }
       var allItems = this.state.listDetails.map(function(item){
           return(<li key={item.id} >- {item.get('listItemName')}</li>)
       });
       if(this.props.user !== undefined) {
           editButton =
               <div className="fixed-action-btn action-button">
                   <a className="btn-floating btn-large main-floating-button">
                       <i className="large material-icons">mode_edit</i>
                   </a>
                   <ul>
                       <li><a
                           className="btn-floating light-green darken-1 tooltipped modal-trigger"
                           href="#addListItem"
                           data-position="left"
                           data-delay="30"
                           data-tooltip="Add List Item"><i
                           className="material-icons">add</i></a>
                       </li>
                       <li><a
                           className="btn-floating yellow darken-2 tooltipped"
                           data-position="left"
                           data-delay="30"
                           data-tooltip="Edit List"><i
                           className="material-icons">settings</i></a>
                       </li>
                       <li><a
                           className="btn-floating red darken-1 tooltipped"
                           data-position="left"
                           data-delay="30"
                           data-tooltip="Delete List"><i
                           className="material-icons">close</i></a>
                       </li>
                   </ul>
               </div>;
       }

       return(
           <div className="ListDetailsComponent">
                <h4>{list}</h4>
               {editButton}
               <div id="addListItem" className="modal">
                   <div className="modal-content">
                       <form>
                           <h4>Add List Item</h4>
                           <div className="row">
                               <div className="input-field col s12">
                                   <input type="text" ref="itemListName" id="itemListName" />
                                   <label htmlFor="itemListName">Item Name</label>
                               </div>
                           </div>
                       </form>
                   </div>
                   <div className="modal-footer">
                       <button className="modal-action modal-close waves-effect waves-green btn-large" id="addListItemButton" onClick={this.addListItem}>Submit</button>
                   </div>
               </div>
                <ul className="list-items">{allItems}</ul>
           </div>
       )
   },
   fetchList: function(){
       var listTitleQuery = new Parse.Query('Lists');
       listTitleQuery.equalTo('objectId', this.props.list);
       listTitleQuery.first().then(
           (listTitle) => {
               this.setState({listTitle: listTitle.get('listTitle')});
               this.setState({listObject: listTitle});

               var listDetailsQuery = new Parse.Query('List');
               listDetailsQuery.equalTo('ListId', listTitle);
               listDetailsQuery.find().then(
                   (listDetails) => {
                       this.setState({listDetails: listDetails})
                   },
                   (err) => {
                       console.log(err)
                   }
               );
           },
           (err) => {
               console.log(err)
           }
       );

   },
   addListItem: function(){
       var newListItem = new List({
           listItemName: this.refs.itemListName.value,
           quantity: 0,
           price: 0,
           whereToFind: "N/A",
           ListId: this.state.listObject
       });
       newListItem.save();
       this.fetchList();

   }
});