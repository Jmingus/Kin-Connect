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
        let allRecipes = this.state.recipes.map(function(recipe){
            return (
            <div className="col s3" key={recipe.id}>
                <a href={`#recipemanagement/${recipe.id}`}>
                    <div className="img-box"><img src={recipe.get('recipeImage').url()}/></div>
                    <h5>{recipe.get('recipeName')}</h5>
                </a>
            </div>
            )
        });
        return(
            <div className="RecipeManagementComponent">
                <div className="row">
                    <div className="col s3">
                        <div className="add-recipe-button">
                            <a className="waves-effect waves-light btn-large" href="#addrecipe">Add Recipe</a>
                        </div>
                    </div>
                    <div className="col s9">
                        <ChipsComponent filterRecipes={this.filterRecipes}/>
                    </div>
                </div>

                <div className="row">
                    {allRecipes}
                </div>
                <PaginationComponent page={this.state.page} onPageChange={this.changePage} itemCount={this.state.itemCount} dispatcher={this.dispatcher} displayLimit={this.state.displayLimit}/>
            </div>
        )
    },
    filterRecipes: function(tag){
        let _this = this;
        let queryTag;
        this.setState({currentTag: tag});
        var innerQuery = new Parse.Query(Parse.User);
        innerQuery.equalTo('familyId' ,Parse.User.current().get('familyId'));
        let query = new Parse.Query('Recipes');
        if( tag === undefined){
            queryTag = null;
        }else{
            _this.setState({currentTag: tag});
            queryTag = (query.equalTo('recipeTags', this.state.currentTag))
        }
        query.matchesQuery('userId', innerQuery);
        query.find().then(
            (itemCount)=>{
                this.setState({itemCount: itemCount.length});
                query.limit(this.state.displayLimit);
                query.skip((this.state.page - 1) * this.state.displayLimit);
                queryTag;
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
