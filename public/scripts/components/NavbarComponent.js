var React = require('react');
var Backbone = require('backbone');
module.exports = React.createClass({
    componentWillMount: function(){
        this.props.router.on('route', () => {
            this.forceUpdate();
        });
    },
    componentDidMount: function(){
        $(document).ready(function(){
            $(".button-collapse").sideNav();
            $('.dropdown-button').dropdown({hover: false});
        });
    },
    render: function(){
        var currentUser = Parse.User.current();
        var allLinks = [];
        if(currentUser){
            allLinks.push(this.links('chat','Chat'));
            allLinks.push(this.links('profile','Profile'));
            allLinks.push(this.links('recipemanagement', 'Recipes'));
            allLinks.push(this.links('eventmanagement', 'Events'));
            allLinks.push(this.links('listmanagement', 'Lists'));
            allLinks.push(<li key="signout"><a href="#signout" onClick={this.signOut}>Sign-Out</a></li>)
        }else{
            allLinks.push(this.links('signin', 'Sign-In'));
            allLinks.push(this.links('signup', 'Sign-Up'));
        }

        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Kin-Connect</a>
                    <a href="javascript:void(0)" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {allLinks}
                    </ul>
                    <ul className="side-nav" id="mobile">
                        {allLinks}
                    </ul>
                    <ul id="message-dropdown" className="dropdown-content">
                        <li><a href="#!">one</a></li>
                        <li><a href="#!">two</a></li>
                        <li><a href="#!">three</a></li>
                    </ul>
                </div>
            </nav>


        )
    },
    links: function(url, label) {
        var currentUrl = Backbone.history.getFragment();
        if(currentUrl === url) {
            return (<li className="active" key={url}><a href={'#'+url}>{label}</a></li>);
        }
        else {
            return (<li key={url}><a href={'#'+url}>{label}</a></li>);
        }
    },
    signOut: function(e){
        e.preventDefault();
        Parse.User.logOut();
        this.props.router.navigate('signin', {trigger: true});
    }
});