var React = require('react');
var Dropzone = require('dropzone');

module.exports = React.createClass({
    componentWillMount: function(){

    },
    componentDidMount: function(){
        $(document).ready(function(){
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
            <div className="RecipeManagementComponent">
                <div className="row">
                    <div className="col s6">
                        <form action="#">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" id="dropbox"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});