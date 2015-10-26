'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

var NavbarComponent = require('./components/NavbarComponent');


var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: function(){

    }
});

var app = new Router;
Backbone.history.start();

ReactDOM.render(
    <NavbarComponent router={app} />,
    document.getElementById('nav')
);