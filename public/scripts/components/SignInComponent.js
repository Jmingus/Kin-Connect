var React = require('react');
module.exports = React.createClass({
    getInitialState: function(){
        return{
            error: null
        }
    },
    render: function(){
        var errorElement = (<div className="red lighten-1">{this.state.error}</div>);
        return(
            <div className="SignUpComponent container">
                <div className="row">
                    {errorElement}
                    <form className="col s12" onSubmit={this.signIn}>
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
                            <button type="submit" className="btn-large waves-effect">Sign-In</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    },
    signIn: function(e){
        e.preventDefault();
        Parse.User.logIn(
            this.refs.email.value,
            this.refs.password.value,
            {
                success: () => {
                    this.props.router.navigate('profile', {trigger: true})
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