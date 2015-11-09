'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

var main = document.getElementById('main');
var nav = document.getElementById('nav');
var footer = document.getElementById('footer');
var listDetails = document.getElementById('');

Parse.initialize("1xv2vWgq4vX1pZWpk423tdezx4E8Vd2Bkm9TwRP9", "7XWpt8emtIKhNbBw12OUfWnaSVk3EEwE1DXWs9IN");

var NavbarComponent = require('./components/NavbarComponent');
var HomepageComponent = require('./components/HomepageComponent');
var FooterComponent = require('./components/FooterComponent');
var SignUpComponent = require('./components/SignUpComponent');
var SignInComponent = require('./components/SignInComponent');
var ListManagementComponent = require('./components/ListManagementComponent');
var EventManagementComponent = require('./components/EventManagementComponent');
var RecipeManagementComponent = require('./components/RecipeManagementComponent');
var RecipeDetailComponent = require('./components/RecipeDetailComponent');
var AddRecipeComponent = require('./components/AddRecipeComponent');
var ProfileComponent = require('./components/ProfileComponent');
var ChatComponent = require('./components/ChatComponent');

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'signup': 'signup',
        'signin': 'signin',
        'listmanagement(/:id)': 'listmanagement',
        'listdetails/:id': 'listdetails',
        'eventmanagement': 'eventmanagement',
        'recipemanagement': 'recipemanagement',
        'recipemanagement/:id': 'recipedetail',
        'addrecipe': 'addrecipe',
        'profile': 'profile',
        'chat': 'chat'
    },
    home: function(){
        ReactDOM.render(
            <HomepageComponent />,
            main
        )
    },
    signup: function(){
        ReactDOM.render(
            <SignUpComponent router={app}/>,
            main
        )
    },
    signin: function(){
        ReactDOM.render(
            <SignInComponent router={app} />,
            main
        )
    },
    listmanagement: function(id){
        ReactDOM.render(
            <ListManagementComponent list={id} router={app}/>,
            main
        )
    },
    eventmanagement: function(){
        ReactDOM.render(
            <EventManagementComponent />,
            main
        )
    },
    recipemanagement: function(){
        ReactDOM.render(
            <RecipeManagementComponent />,
            main
        )
    },
    recipedetail: function(id){
        ReactDOM.render(
            <RecipeDetailComponent recipe={id} />,
            main
        )
    },
    addrecipe: function(){
        ReactDOM.render(
            <AddRecipeComponent router={app}/>,
            main
        )
    },
    profile: function(){
        ReactDOM.render(
            <ProfileComponent />,
            main
        )
    },
    chat: function(){
        ReactDOM.render(
            <ChatComponent />,
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

ReactDOM.render(
    <FooterComponent />,
    footer
);