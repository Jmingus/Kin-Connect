var React = require('react');

module.exports = React.createClass({
    render: function(){
        return(
            <div className="input-field" >
                <label htmlFor="ingredientField">Ingredient</label>
                <input id="ingredientField" type="text" />
            </div>
        )
    }
});