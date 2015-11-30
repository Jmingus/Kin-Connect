var React = require('react');

module.exports = React.createClass({
    render: function(){
        return(
            <div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes(null)}}>
                    None
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Appetizers')}}>
                    Appetizers
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('BBQ and Grilling')}}>
                    BBQ and Grilling
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Beef')}}>
                    Beef
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Beverages')}}>
                    Beverages
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Bread')}}>
                    Bread
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Breakfast')}}>
                    Breakfast
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Cakes')}}>
                    Cakes
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Chicken')}}>
                    Chicken
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Chinese')}}>
                    Chinese
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Cookies')}}>
                    Cookies
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Desserts')}}>
                    Desserts
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Healthy Cooking')}}>
                    Healthy Cooking
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Holidays')}}>
                    Holidays
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Italian')}}>
                    Italian
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Japanese')}}>
                    Japanese
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Main Dish')}}>
                    Main Dish
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Mexican')}}>
                    Mexican
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Other')}}>
                    Other
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Pasta')}}>
                    Pasta
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Pork')}}>
                    Pork
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Quick and Easy')}}>
                    Quick and Easy
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Salad')}}>
                    Salad
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Seafood')}}>
                    Seafood
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Seasonal')}}>
                    Seasonal
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Side Dish')}}>
                    Side Dish
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Slow Cooker')}}>
                    Slow Cooker
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Soups and Stews')}}>
                    Soups and Stews
                </div>
                <div className="chip btn" onClick={()=>{this.props.filterRecipes('Vegetarian')}}>
                    Vegetarian
                </div>
            </div>
        )
    }
});