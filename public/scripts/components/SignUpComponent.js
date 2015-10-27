var React = require('react');
module.exports = React.createClass({
    getInitialState: function(){
        return {
            error: null
        }

    },
    render: function(){
        var errorElement = (<div className="red darken-1">{this.state.error}</div>);
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
                            <button type="submit" className="btn-large waves-effect">Sign-Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    },
    signUp: function(e){
        e.preventDefault();
        var user = new Parse.User();
        user.signUp(
            {
                firstname: this.refs.firstName.value,
                lastname: this.refs.lastName.value,
                password: this.refs.password.value,
                username: this.refs.email.value,
                email: this.refs.email.value
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
    }
});