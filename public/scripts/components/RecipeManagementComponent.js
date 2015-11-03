var React = require('react');
var Dropzone = require('dropzone');
var Recipes = require('../models/RecipesModel');

module.exports = React.createClass({
    componentWillMount: function(){

    },
    componentDidMount: function(){
        $(document).ready(function(){
            $("input#dropbox").dropzone({ url: "/file/post" });
        });
        Dropzone.options.imageUpload = {
            paramName: "file",
            maxFilesize: 2,
            uploadMultiple: false,
            maxFiles: 1,
            accept: function(file, done) {
                done('File Accepted')
            }
        };
    },
    render: function(){
        return(
            <div className="RecipeManagementComponent">
                <div className="row">
                    <div className="col s6">
                        <form onSubmit={this.addRecipe}>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Recipe Image</span>
                                    <input type="file" ref="recipeImage"/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" id="dropbox"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <div className="input-field">
                                        <input type="text" id="recipe-name" ref="recipeName" />
                                        <label htmlFor="recipe-name"> Recipe Name </label>
                                    </div>
                                </div>
                                <div className="col s6">
                                    <div className="input-field">
                                        <input type="number" id="average-cook-time" ref="averageCookTime"/>
                                        <label htmlFor="average-cook-time"> Average Cook Time</label>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <label htmlFor="recipe-description"> Recipe Description</label>
                                    <textarea id="recipe-description" className="materialize-textarea" ref="recipeDescription"></textarea>
                                </div>
                                <button className="btn-large waves-effect" type='submit'>Submit Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
    addRecipe: function(e){
        e.preventDefault();
        let recipeName = this.refs.recipeName.value;
        let recipeImageData = this.refs.recipeImage.files[0];
        let newRecipe = new Recipes({
            recipeName: recipeName,
            averageCookTime: this.refs.averageCookTime.value,
            recipeDescription: this.refs.recipeDescription.value,
            userId : Parse.User.current()
        });
        let recipeFile = new Parse.File(`${recipeName}.png`,recipeImageData);
        newRecipe.set('recipeImage', recipeFile);
        newRecipe.save();
    },
    sendEmail: function(){
        Parse.Cloud.run('emailNotification', {user: 'Jacob'}, {
            success: function(email) {
                console.log('Sent Email')
            },
            error: function(error) {
            }
        });
    }
});

//file = this.refs.addPicture.files[0];
//var picLabel;
//var formatTitle = this.refs.title.value.split(' ').join('');
//console.log(formatTitle)
//formatTitle.length > 0 ? picLabel = formatTitle : picLabel = 'picture';
//var parseFile = new Parse.File(picLabel+'.png',file);
//var pic = new PictureModel({
//    spotId: new SpotModel({objectId:this.props.spot}),
//    title: this.refs.title.value,
//    caption: this.refs.caption.value
//});
//pic.set('picture', parseFile);