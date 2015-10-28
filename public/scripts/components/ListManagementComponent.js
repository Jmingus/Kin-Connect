var React = require('react');
var Lists = require('../models/ListsModel');
var ListDetailsComponent = require('./ListDetailsComponent');

module.exports = React.createClass({
    getInitialState: function(){
      return{
          lists: []
      }
    },
    componentDidMount: function(){
        $(document).ready(function(){
            $('.modal-trigger').leanModal();
        });
    },
    componentWillMount: function(){
        this.fetchLists()
    },
    render: function(){
        var allLists = this.state.lists.map(function(list){
            return (<a key={list.id} href={`#listmanagement/${list.id}`}><div>{list.get('listTitle')}</div></a>)
        });
        if(this.props.list !== null){
           var listDetails = <ListDetailsComponent list={this.props.list} router={this.props.router}/>
        }
        return(
            <div className="ListManagementComponent">
                <div className="row">
                    <div className="col s3">
                        {allLists}
                    </div>
                    <div className="col s9" id="list-details">
                        <a className="waves-effect waves-light btn-large modal-trigger add-list-button" href="#addList">AddList</a>
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

            </div>
        )
    },
    addList: function(){
        var newList = new Lists({
            listTitle: this.refs.listTitle.value,
            listPrivacy: false,
            userId : Parse.User.current()
        });
        newList.save()
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
    }
});