var React = require('react');
var Recipes = require('../models/RecipesModel');
var RecipeDetailComponent = require('./RecipeDetailComponent');
var AddRecipeComponent = require('./AddRecipeComponent');
module.exports = React.createClass({
    getInitialState: function(){
        return{
          recipes: []
        }
    },
    componentWillMount: function(){
        this.fetchRecipes();
    },
    render: function(){
        let allRecipes = this.state.recipes.map(function(recipe){
            return (
            <div className="col s2" key={recipe.id}>
                <a href={`#recipemanagement/${recipe.id}`}>
                    <div className="img-box"><img src={recipe.get('recipeImage').url()}/></div>
                    <h5>{recipe.get('recipeName')}</h5>
                </a>
            </div>
            )
        });
        return(
            <div className="RecipeManagementComponent">
                <div className="row nav-wrapper">
                    <div className="col s3">
                        <div className="add-recipe-button">
                            <a className="waves-effect waves-light btn-large" href="#addrecipe">Add Recipe</a>
                        </div>
                    </div>
                    <div className="col s9">
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" required onChange={this.filterRecipes} ref="search"/>
                                <label htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row">
                    {allRecipes}
                </div>
            </div>
        )
    },
    fetchRecipes: function(){
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        let query = new Parse.Query('Recipes');
        query.matchesQuery('userId', innerQuery);
        query.find().then(
            (recipes) => {
                this.setState({recipes: recipes})
            },
            (err) => {
                console.log(err)
            }
        )
    },
    filterRecipes: function(){
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        let query = new Parse.Query('Recipes');
        query.matchesQuery('userId', innerQuery);
        query.equalTo('recipeTags', this.refs.search.value);
        query.find().then(
            (recipes) => {
                this.setState({recipes: recipes})
            },
            (err) => {
                console.log(err)
            }
        )
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
