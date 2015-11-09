var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return{
            familyMembers: []
        }
    },
    componentWillMount: function(){
        this.fetchFamilyMembers();
    },
    render: function(){
        let allFamilyMembers = this.state.familyMembers.map(function(person){
            if(person.id === Parse.User.current().id){
                return null;
            }else {
                return(
                    <div className="chip" key={person.id}>
                        {person.get('firstname')} {person.get('lastname')}
                    </div>
                )
            }
        });
        return(
            <div className="ChatComponent">
                <div className="row">
                    <div className="col s3">
                        <h5>Family Members</h5>
                        {allFamilyMembers}
                    </div>
                    <div className="col s9">


                    </div>
                </div>
            </div>
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
    }
});