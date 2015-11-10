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
            var recipeIngredients = this.state.recipe.get('recipeIngredients').map(function(item){
                return <div>{item}</div>
            });
            var recipeTags = this.state.recipe.get('recipeTags').map(function(tag){
                return <div className="chip">{tag}</div>
            });
            details = (
                <div>
                    <div className="row">
                        <div className="col s12 m8">
                            <h4>{this.state.recipe.get('recipeName')}</h4>
                            <h5>{this.state.recipe.get('recipeDescription')}</h5>
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s12 l6">
                                            PrepTime : {this.state.recipe.get('recipePrepTime')} Minutes
                                        </div>
                                        <div className="col s12 l6">
                                            CookTime : {this.state.recipe.get('recipeCookTime')} Minutes
                                        </div>
                                        <div className="col s12 l6">
                                            ReadyTime : {this.state.recipe.get('recipeReadyTime')} Minutes
                                        </div>
                                        <div className="col s12 l6">
                                            Serving Size : {this.state.recipe.get('recipeServingSize')} servings
                                        </div>
                                        <div className="col s12">
                                            Recipe Tags : {recipeTags}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className='recipe-details-img-box'><img src={this.state.recipe.get('recipeImage').url()}/></div>
                        </div>
                    </div>
                    <div className="row info-row">
                        <div className="col s12 l4">
                            <h4>Ingredients</h4>
                            <p>{recipeIngredients} </p>
                        </div>
                        <div className="col s12 l8">
                            <h4>Directions</h4>
                            <p>{this.state.recipe.get('recipeDirections')}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return(
           <div className="RecipeDetailComponent container">
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