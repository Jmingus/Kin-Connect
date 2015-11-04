var React = require('react');
var Recipes = require('../models/RecipesModel');
var AddIngredientComponent = require('./AddIngredientComponent');
var Dropzone = require('dropzone');

module.exports = React.createClass({
   componentDidMount: function(){
       $(document).ready(function(){
           $('.scrollspy').scrollSpy();
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
           <div className="AddRecipeComponent">
               <div className="row">
                   <div className="col s7">
                       <form onSubmit={this.addRecipe}>
                           <div className="row">
                               <div className="file-field input-field section scrollspy" id="recipeImageSection">
                                   <div className="btn-large">
                                       <span>Recipe Image</span>
                                       <input type="file" ref="recipeImage" id="recipeImage"/>
                                   </div>
                                   <div className="file-path-wrapper">
                                       <input className="file-path validate" type="text" id="dropbox"/>
                                   </div>
                               </div>
                               <div className="col s12">
                                   <div className="input-field section scrollspy" id="recipeNameSection">
                                       <input type="text" id="recipe-name" ref="recipeName"/>
                                       <label htmlFor="recipe-name"> Recipe Name </label>
                                   </div>
                               </div>
                               <div className="col s12">
                                   <div className="input-field section scrollspy" id="recipeIngredientSection">
                                       <textarea className="materialize-textarea" id="recipeIngredient" ref="recipeIngredients"/>
                                       <label htmlFor="recipeIngredient"> Recipe Ingredients </label>
                                   </div>
                               </div>
                               <div className="col s12">
                                   <div className="input-field section scrollspy" id="recipeDirectionsSection">
                                       <textarea className="materialize-textarea" id="recipeDirections" ref="recipeDirections"/>
                                       <label htmlFor="recipeDirections"> Recipe Directions </label>
                                   </div>
                               </div>
                               <div className="col s6">
                                   <div className="input-field section scrollspy" id="recipeCookSection">
                                       <input type="number" id="prepTime" ref="prepTime"/>
                                       <label htmlFor="prepTime">Prep Time</label>
                                   </div>
                               </div>
                               <div className="col s6">
                                   <div className="input-field section">
                                       <input type="number" id="cookTime" ref="cookTime"/>
                                       <label htmlFor="cookTime">Cook Time</label>
                                   </div>
                               </div>
                               <div className="col s6">
                                   <div className="input-field section">
                                       <input type="number" id="readyTime" ref="readyTime"/>
                                       <label htmlFor="readyTime">Ready In (Optional)</label>
                                   </div>
                               </div>
                               <div className="col s6">
                                   <div className="input-field section">
                                       <input type="number" id="servingSize" ref="servingSize"/>
                                       <label htmlFor="servingSize">Number of Servings</label>
                                   </div>
                               </div>
                               <div className="col s6">
                                   <div className="input-field section">
                                       <input type="number" id="recipeYield" ref="recipeYield"/>
                                       <label htmlFor="recipeYield">Recipe Yield (Optional)</label>
                                   </div>
                               </div>
                               <div className="col s12">
                                   <div className="input-field section scrollspy" id="recipeNotesSection">
                                       <textarea className="materialize-textarea" id="recipeNotes" ref="recipeNotes"/>
                                       <label htmlFor="recipeNotes">Recipe Notes</label>
                                   </div>
                               </div>
                               <div className="col s4">
                                   <div className="input-field section scrollspy" id="recipeTagsSection">
                                       <p>
                                           <input type="checkbox" id="checkbox-appetizers" />
                                           <label htmlFor="checkbox-appetizers">Appetizers</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-bbq" />
                                           <label htmlFor="checkbox-bbq">BBQ and grilling</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-beef" />
                                           <label htmlFor="checkbox-beef">Beef</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-beverages" />
                                           <label htmlFor="checkbox-beverages">Beverages</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-bread" />
                                           <label htmlFor="checkbox-bread">Bread</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-breakfast/brunch" />
                                           <label htmlFor="checkbox-breakfast/brunch">Breakfast/Brunch</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-cakes" />
                                           <label htmlFor="checkbox-cakes">Cakes</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-chicken" />
                                           <label htmlFor="checkbox-chicken">Chicken</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-chinese" />
                                           <label htmlFor="checkbox-chinese">Chinese</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-cookies" />
                                           <label htmlFor="checkbox-cookies">Cookies</label>
                                       </p>
                                   </div>
                               </div>
                               <div className="col s4">
                                   <div className="input-field section">
                                       <p>
                                           <input type="checkbox" id="checkbox-desserts" />
                                           <label htmlFor="checkbox-desserts">Desserts</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-family" />
                                           <label htmlFor="checkbox-family">Family</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-healthy" />
                                           <label htmlFor="checkbox-healthy">Healthy Cooking</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-holidays" />
                                           <label htmlFor="checkbox-holidays">Holidays</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-italian" />
                                           <label htmlFor="checkbox-italian">Italian</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-japanese" />
                                           <label htmlFor="checkbox-japanese">Japanese</label>
                                       </p>

                                       <p>
                                           <input type="checkbox" id="checkbox-main" />
                                           <label htmlFor="checkbox-main">Main Dish</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-mexican" />
                                           <label htmlFor="checkbox-mexican">Mexican</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-other" />
                                           <label htmlFor="checkbox-other">Other</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-pasta" />
                                           <label htmlFor="checkbox-pasta">Pasta</label>
                                       </p>
                                   </div>
                               </div>
                               <div className="col s4">
                                   <div className="input-field section">
                                       <p>
                                           <input type="checkbox" id="checkbox-pork" />
                                           <label htmlFor="checkbox-pork">Pork</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-quick" />
                                           <label htmlFor="checkbox-quick">Quick and Easy</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-salad" />
                                           <label htmlFor="checkbox-salad">Salad</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-seafood" />
                                           <label htmlFor="checkbox-seafood">Seafood</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-seasonal" />
                                           <label htmlFor="checkbox-seasonal">Seasonal</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-sidedish" />
                                           <label htmlFor="checkbox-sidedish">Side Dish</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-slowcooker" />
                                           <label htmlFor="checkbox-slowcooker">Slow Cooker</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-soupsandstews" />
                                           <label htmlFor="checkbox-soupsandstews">Soups and Stews</label>
                                       </p>
                                       <p>
                                           <input type="checkbox" id="checkbox-vegetarian" />
                                           <label htmlFor="checkbox-vegetarian">Vegetarian</label>
                                       </p>
                                   </div>
                               </div>
                               <div className="col s12">
                                   <div className="input-field section scrollspy" id="recipeDescriptionSection">
                                       <label htmlFor="recipe-description"> Recipe Description</label>
                                       <textarea id="recipe-description" className="materialize-textarea" ref="recipeDescription" ></textarea>
                                   </div>
                               </div>
                               <button className="btn-large waves-effect col s6 modal-action modal-close" type="submit">Submit Recipe</button>
                           </div>
                       </form>
                   </div>
                   <div className="col s5">
                       <ul className="section table-of-contents">
                           <li><a href="#recipeImageSection">Recipe Image</a></li>
                           <li><a href="#recipeNameSection">Recipe Name</a></li>
                           <li><a href="#recipeIngredientSection">Recipe Ingredients</a></li>
                           <li><a href="#recipeDirectionsSection">Recipe Directions</a></li>
                           <li><a href="#recipeCookSection">Recipe Cook Times</a></li>
                           <li><a href="#recipeNotesSection">Recipe Notes</a></li>
                           <li><a href="#recipeTagsSection">Recipe Tags</a></li>
                           <li><a href="#recipeDescriptionSection">Recipe Description</a></li>

                       </ul>
                   </div>
               </div>
           </div>
       )
   },
   addRecipe: function(e){
       e.preventDefault();
       let recipeTags = this.refs.recipeTags;
       let recipeName = this.refs.recipeName.value;
       let recipeImageData = this.refs.recipeImage.files[0];
       let newRecipe = new Recipes({
           recipeName: recipeName,
           averageCookTime: this.refs.averageCookTime.value,
           recipeDescription: this.refs.recipeDescription.value,
           userId : Parse.User.current(),
           recipeTags: recipeTags
       });
       let recipeFile = new Parse.File(`${recipeName}.png`,recipeImageData);
       newRecipe.set('recipeImage', recipeFile);
       newRecipe.save();
   }
});