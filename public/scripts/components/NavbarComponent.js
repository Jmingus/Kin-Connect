var React = require('react');

module.exports = React.createClass({
    render: function(){
        var currentUser = Parse.User.current();
        var links = [];
        if(currentUser){

        }else{
            links.push(<li key="signin"><a href="#signin">Sign-In</a></li>);
            links.push(<li key="signup"><a href="#signup">Sign-Up</a></li>);
        }
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Kin-Connect</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {links}
                    </ul>
                </div>
            </nav>
        )
    }
});