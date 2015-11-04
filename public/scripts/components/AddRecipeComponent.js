var React = require('react');
var Recipes = require('../models/RecipesModel');

module.exports = React.createClass({
   render: function(){
       return(
           <div className="AddRecipeComponent">
               <form onSubmit={this.addRecipe}>
                   <div className="file-field input-field">
                       <div className="btn-large">
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
                           <div className="input-field">
                               <label htmlFor="recipe-description"> Recipe Description</label>
                               <textarea id="recipe-description" className="materialize-textarea" ref="recipeDescription"></textarea>
                           </div>
                       </div>
                       <div className="col s6">
                           <div className="input-field">
                               <input type="text" id="recipe-tags" ref="recipeTags" />
                               <label htmlFor="recipe-tags"> Recipe Tags</label>
                           </div>
                       </div>
                       <button className="btn-large waves-effect col s6 modal-action modal-close" type="submit">Submit Recipe</button>
                   </div>
               </form>
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
   }
});