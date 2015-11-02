var React = require('react');
module.exports = React.createClass({
    componentDidMount: function(){
        $(document).ready(function(){
            $('.parallax').parallax();
        });
    },
    render: function(){
        return(
            <div className="HomepageComponent">
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <br /><br />
                            <h1 className="header center brand-title">Kin-Connect</h1>
                            <div className="row center">
                                <a href="#signup" id="signup-button" className="btn-large waves-effect ">Sign-Up</a>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                    <div className="parallax"><img src="../images/familyOnDock.jpg" /></div>
                </div>
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center icon-color"><i className="material-icons">supervisor_account</i></h2>
                                    <h5 className="center">Stay Together</h5>

                                    <p className="light">Kin-Connect is making it easier than ever to stay in touch with your family members!</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center icon-color"><i className="material-icons">today</i></h2>
                                    <h5 className="center">Stay Up to Date</h5>
                                    <p className="light">Kin-Connect allows your family to keep up with all of the upcoming family events! </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center icon-color"><i className="material-icons">view_list</i></h2>
                                    <h5 className="center">Stay Talking</h5>

                                    <p className="light">Kin-Connect lets you enter recipes into a family-wide cookbook, no longer with you be asking how to make grandma's apple pie!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 subHeader">Kin-Connect will bridge the gap between family members and keep them together!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img src="../images/familyInGrass.jpg" /></div>
                </div>

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 center">
                                <h3><i className="mdi-content-send icon-color"></i></h3>
                                <h4>Contact Us</h4>
                                <p className="left-align light">Come chat with us at our website Kin-Connect!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 subHeader">Kin-Connect will make your family experience much more memorable!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img src="../images/familyOnBoat.jpg" /></div>
                </div>
            </div>
        )
    }
});