var React = require('react');
var Recipes = require('../models/RecipesModel');
var RecipeDetailComponent = require('./RecipeDetailComponent');
var AddRecipeComponent = require('./AddRecipeComponent');
var ChipsComponent = require('./ChipsComponent');
var PaginationComponent = require('./PaginationComponent');
var Backbone = require('backbone');
var _ = require('../../node_modules/backbone/node_modules/underscore/underscore-min.js');
module.exports = React.createClass({
    getInitialState: function(){
        return{
          recipes: [],
          page: 1,
          itemCount: 0,
          displayLimit: 12,
          currentTag: null
        }
    },
    componentWillMount: function(){
        this.filterRecipes();
        this.dispatcher = {};
        _.extend(this.dispatcher, Backbone.Events);
    },
    render: function(){
        let allRecipes1Array = [];
        let allRecipes2Array = [];
        let allRecipes3Array = [];
        this.state.recipes.map(function(recipe, index) {
            if(index <= 3){
                allRecipes1Array.push(recipe)
            }else if(index > 3 && index <= 7){
                allRecipes2Array.push(recipe)
            }else if(index > 7){
                allRecipes3Array.push(recipe)
            }
        });
        let allRecipes1 = allRecipes1Array.map(function(recipe){
            return (
                <div className="col s12 m3 l3 recipe-box" key={recipe.id}>
                    <a href={`#recipemanagement/${recipe.id}`}>
                        <div className="img-box">
                            <img src={recipe.get('recipeImage').url()}/>
                        </div>
                        <h5>{recipe.get('recipeName')}</h5>
                    </a>
                </div>
            );
        });
        let allRecipes2 = allRecipes2Array.map(function(recipe){
            return (
                <div className="col s12 m3 l3 recipe-box" key={recipe.id}>
                    <a href={`#recipemanagement/${recipe.id}`}>
                        <div className="img-box">
                            <img src={recipe.get('recipeImage').url()}/>
                        </div>
                        <h5>{recipe.get('recipeName')}</h5>
                    </a>
                </div>
            );
        });
        let allRecipes3 = allRecipes3Array.map(function(recipe){
            return (
                <div className="col s12 m3 l3 recipe-box" key={recipe.id}>
                    <a href={`#recipemanagement/${recipe.id}`}>
                        <div className="img-box">
                            <img src={recipe.get('recipeImage').url()}/>
                        </div>
                        <h5>{recipe.get('recipeName')}</h5>
                    </a>
                </div>
            );
        });
        return(
            <div className="RecipeManagementComponent container">
                <div className="row">
                    <div className="col s12 l3">
                        <div className="add-recipe-button">
                            <a className="waves-effect waves-light btn-large" href="#addrecipe">Add Recipe</a>
                        </div>
                    </div>
                    <div className="col s12 l9">
                        <ChipsComponent filterRecipes={this.filterRecipes}/>
                    </div>
                </div>
                <div className="row">
                    {allRecipes1}
                </div>
                <div className="row">
                    {allRecipes2}
                </div>
                <div className="row">
                    {allRecipes3}
                </div>
                <PaginationComponent page={this.state.page} onPageChange={this.changePage} itemCount={this.state.itemCount} dispatcher={this.dispatcher} displayLimit={this.state.displayLimit}/>
            </div>
        )
    },
    filterRecipes: function(tag){
        let query = new Parse.Query('Recipes');
        if( tag === undefined){
            this.setState({currentTag: null})
        }else{
            this.setState({currentTag: tag});
        }
        this.filterQuery(query)

    },
    filterQuery: function(query){
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        query.matchesQuery('userId', innerQuery);
        query.find().then(
            (itemCount)=>{
                this.setState({itemCount: itemCount.length});
                query.limit(this.state.displayLimit);
                query.skip((this.state.page - 1) * this.state.displayLimit);
                if(this.state.currentTag !== null){
                    var queryTag = query.equalTo('recipeTags', this.state.currentTag)
                }else{
                    var queryTag = null
                }
                queryTag
                query.find().then(
                    (recipes) => {
                        this.setState({recipes: recipes});
                        this.dispatcher.trigger('setState');
                    },
                    (err) => {
                        console.log(err)
                    }
                )
            },
            (err) => {

            }
        )
    },
    changePage: function(page){
        this.setState({page: page});
        this.filterRecipes();
    }
});
