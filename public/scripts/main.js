'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

var main = document.getElementById('main');
var nav = document.getElementById('nav');

Parse.initialize("1xv2vWgq4vX1pZWpk423tdezx4E8Vd2Bkm9TwRP9", "7XWpt8emtIKhNbBw12OUfWnaSVk3EEwE1DXWs9IN");
var NavbarComponent = require('./components/NavbarComponent');
var HomepageComponent = require('./components/HomepageComponent');


var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: function(){
        ReactDOM.render(
            <HomepageComponent />,
            main
        )
    }
});

var app = new Router;
Backbone.history.start();

ReactDOM.render(
    <NavbarComponent router={app} />,
    nav
);