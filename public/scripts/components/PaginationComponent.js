var React = require('react');

module.exports = React.createClass({
    componentWillMount: function(){
        this.renderPageLinks();
        this.props.dispatcher.on('setState', () => {
            this.renderPageLinks();
            this.forceUpdate();
        });
    },
    render: function(){
        let leftClick;
        let rightClick;
        if(this.props.page === 1){
            leftClick = (<li className="waves-effect disabled"><i className="material-icons">chevron_left</i></li>)
        }else{
            leftClick = (<li className="waves-effect" onClick={()=>{this.props.onPageChange(this.props.page - 1)}}><i className="material-icons">chevron_left</i></li>)
        }
        if(this.props.page === this.allPageLinks.length){
            rightClick = (<li className="waves-effect disabled" ><i className="material-icons">chevron_right</i></li>)
        }else{
            rightClick = (<li className="waves-effect" onClick={()=>{this.props.onPageChange(this.props.page + 1)}}><i className="material-icons">chevron_right</i></li>)
        }
        return(
            <ul className="pagination">
                {leftClick}
                {this.allPageLinks}
                {rightClick}
            </ul>
        )
    },
    renderPageLinks: function(){
        let _this = this;
        let pagelinks = [];
        if(Math.ceil(this.props.itemCount/this.props.displayLimit) < 1){
            pagelinks.push(1)
        }else {
            for (var i = 1; i <= Math.ceil(this.props.itemCount / this.props.displayLimit); i++) {
                pagelinks.push(i)
            }
        }

        this.allPageLinks = pagelinks.map(function(page){
            if(page === _this.props.page){
                return(<li key={page} className="waves-effect active" onClick={()=>{_this.props.onPageChange(page)}}>{page}</li>)
            }else {
                return(<li key={page} className="waves-effect" onClick={()=>{_this.props.onPageChange(page)}}>{page}</li>)
            }

        });
    }
});