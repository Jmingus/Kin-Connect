var React = require('react');
var Lists = require('../models/ListsModel');
var ListDetailsComponent = require('./ListDetailsComponent');

module.exports = React.createClass({
    getInitialState: function(){
      return{
          lists: [],
          familyMembers: [],
          familyList: [],
          currentClickedUser: null
      }
    },
    componentDidMount: function(){
        $(document).ready(function(){
            $('.modal-trigger').leanModal();
        });
    },
    componentWillMount: function(){
        this.fetchLists();
        this.fetchFamilyMembers();
    },
    render: function(){
        let _this = this;
        var allYourLists = this.state.lists.map(function(list){
            return (<a key={list.id} href={`#listmanagement/${list.id}`}><div className="btn list-title">{list.get('listTitle')}</div></a>)
        });
        if(this.props.list !== null){
           var listDetails = <ListDetailsComponent list={this.props.list} router={this.props.router} user={Parse.User.current().id}/>
        }
        var allMembers = this.state.familyMembers.map(function(person){
            if(person.id === Parse.User.current().id){
                return null;
            }else{
                return (<div key={person.id} onClick={()=>{_this.userList(person)}} className="chip">{person.get('firstname')} {person.get('lastname')}</div>)
            }

        });
        var allUserLists = this.state.familyList.map(function(list){
            return <ListDetailsComponent list={list.id} key={list.id} router={_this.props.router} />
        });
        return(
            <div className="ListManagementComponent">
                <div className="row">
                    <div className="col s12 l3">
                        <div className="your-lists">
                            <h4>Your Lists</h4>
                            {allYourLists}
                        </div>
                        <div className="other-lists">
                            <a className="waves-effect waves-light btn-large modal-trigger add-list-button" href="#addList">Add List</a>
                            <hr />
                            <h4>Family</h4>
                            {allMembers}
                        </div>
                    </div>
                    <div className="col s12 l9" id="list-details">
                        <div id="addList" className="modal">
                            <div className="modal-content">
                                <h4>Add a List</h4>
                                <form>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" ref="listTitle" id="listTitle" />
                                            <label htmlFor="listTitle">List Title</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <a href="#listmanagement" className="modal-action modal-close waves-effect waves-green btn-large" onClick={this.addList}>Submit</a>
                            </div>
                        </div>
                        {listDetails}
                    </div>
                </div>
                <div id="otherUserLists" className="modal bottom-sheet">
                    <div className="modal-content">
                        <h4>{this.state.currentClickedUser}'s Lists</h4>
                        {allUserLists}
                    </div>
                    <div className="modal-footer">
                        <a className=" modal-action modal-close waves-effect waves-green btn-large">Close</a>
                    </div>
                </div>
            </div>
        )
    },
    addList: function(){
        var newList = new Lists({
            listTitle: this.refs.listTitle.value,
            listPrivacy: false,
            userId : Parse.User.current()
        });
        newList.save();
        this.fetchLists();
    },
    fetchLists: function(){
        var query = new Parse.Query('Lists');
        query.equalTo('userId', Parse.User.current());
        query.find().then(
            (lists) => {
                this.setState({lists: lists})
            },
            (err) => {
                console.log(err)
            }
        )
    },
    fetchFamilyMembers: function(){
        let query = new Parse.Query(Parse.User);
        query.equalTo('familyId', Parse.User.current().get('familyId'));
        query.find().then(
            (familyMembers) => {
                this.setState({familyMembers: familyMembers})
            },
            (err) => {
                console.log(err)
            }

        )
    },
    userList: function(person){
        this.setState({currentClickedUser: person.get('firstname')});
        let query = new Parse.Query('Lists');
        query.equalTo('listPrivacy', true);
        query.equalTo('userId', person);
        query.find().then(
            (familyList) => {
                this.setState({familyList: familyList});
                $('#otherUserLists').openModal();
            },
            (err) => {
                console.log(err)
            }
         )
    }
});