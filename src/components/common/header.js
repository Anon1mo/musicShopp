"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="app" className="navbar-brand">
                        <img src="#" alt="Sklep muzyczny" />
                    </Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="app">Strona główna</Link></li>
                        <li><Link to="authors">Edycja danych</Link></li>
                        <li><Link to="about">O nas</Link></li>
                        <li><Link to="albums">Katalog płyt</Link></li>
                        <li><Link to="history">Historia zamowien</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
