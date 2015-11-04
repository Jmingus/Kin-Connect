var React = require('react');
var Recipe = require('../models/RecipesModel');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            recipe: null
        }
    },
    componentWillMount: function(){
        this.fetchRecipe();
    },
    render: function(){
        var details = null;
        if(this.state.recipe !== null){
            details = (
                <div>
                    <div>{this.state.recipe.get('recipeName')}</div>
                    <div>{this.state.recipe.get('recipeDescription')}</div>
                    <div><img src={this.state.recipe.get('recipeImage').url()}/></div>
                    <div>{this.state.recipe.get('averageCookTime')}</div>
                    <div>{this.state.recipe.get('recipeTags')}</div>
                </div>
            )
        }
        return(
           <div className="RecipeDetailComponent">
               {details}
           </div>
        )
    },
    fetchRecipe: function(){
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        var query = new Parse.Query('Recipes');
        query.matchesQuery('userId', innerQuery);
        query.equalTo('objectId', this.props.recipe);

        query.first().then(
            (recipe) => {
                this.setState({recipe: recipe})
            },
            (err) => {
                console.log(err)
            }
        )
    }
});