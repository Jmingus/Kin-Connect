var React = require('react');
module.exports = React.createClass({
    getInitialState: function(){
        return {
            error: null,
            showFamilyCode: false
        }
    },
    showFamily: function(){
        this.state.showFamilyCode ? this.setState({showFamilyCode :false}) : this.setState({showFamilyCode : true})
    },
    render: function(){
        var errorElement = (<div className="red lighten-1">{this.state.error}</div>);
        return(
            <div className="SignUpComponent">
                    <div className="row">
                        {errorElement}
                        <form className="col s12" onSubmit={this.signUp}>
                            <div className="row">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" ref="email" />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" type="password" className="validate" ref="password" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="input-field col s6">
                                    <input id="firstName" type="text" className="validate" ref="firstName" />
                                    <label htmlFor="firstName">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="lastName" type="text" className="validate" ref="lastName" />
                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                                <div className="row">
                                    {this.state.showFamilyCode ? <div className="input-field col s6">
                                        <input id="familyCode" type="text" ref="familyCode" />
                                        <label htmlFor="familyCode">Family Code </label>
                                    </div> : <div className="optional col s6">Already have a family code, then click here!
                                        <i className="material-icons">play_arrow</i></div>}
                                    <a className="btn-floating btn-large waves-effect waves-light" onClick={this.showFamily}><i className="material-icons">add</i></a>
                                </div>

                                <button type="submit" className="btn-large waves-effect col s6">Sign-Up</button>
                            </div>
                        </form>
                    </div>
            </div>
        )
    },
    signUp: function(e){
        e.preventDefault();
        var familyId = null;
        if(this.state.showFamilyCode === true){
            familyId = this.refs.familyCode.value
        }else{
            familyId = this.generateFamilyCode();
        }
        if( familyId.length !== 36){
            this.setState({error: "You must have family code!"});
            return console.log('family code missing.')
        }
        var user = new Parse.User();
        user.signUp(
            {
                firstname: this.refs.firstName.value,
                lastname: this.refs.lastName.value,
                password: this.refs.password.value,
                username: this.refs.email.value,
                email: this.refs.email.value,
                familyId: familyId,
                emailNotifications: false,
                textNotifications: false
            },
            {
                success: () => {
                    this.props.router.navigate('', {trigger: true});
                },
                error: (error) => {
                    this.setState({
                        error: error.message
                    });
                }
            }
        )
    },
    generateFamilyCode: function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    sendEmail: function(){
        Parse.Cloud.run('emailNotification', Parse.User.current(), {
            success: function(email) {
                console.log('Sent Email')
            },
            error: function(error) {
            }
        });
    }
});