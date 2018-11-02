"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorApi = require('../../api/AuthorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    getInitialState: function() {
        return {
            authors: []
        };
    },
    componentDidMount: function() {
        if (this.isMounted()) {
            this.setState({ authors: AuthorApi.getAllAuthors()});
        }
    },
    render: function() {
        return (
            <div>
                <h1>Zmien dane</h1>
                <Link to="addAuthor" className="btn btn-default">Dodaj dane</Link>
                <AuthorList authors={this.state.authors} />

            </div>
        );
    }
});

module.exports = AuthorPage;