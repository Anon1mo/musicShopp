"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var axios = require('axios');


var History = React.createClass({
    getInitialState: function() {
        return {
            history: [],
            stany: ['Nieznany', 'Zamówione', 'Opłacone', 'Wysłane']
        };
    },
    componentDidMount: function() {
        if (this.isMounted()) {
            var options = {
                headers: {
                    'Authorization': 'Token ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            };
            axios.get('http://akus93.pythonanywhere.com/api/orders/', options)
                .then((response) => {
                    console.log(response.data);
                    this.setState({ history: response.data});
                });
            //console.log('token ' + sessionStorage.getItem('token').toString()); //token
        }
    },
    render: function() {
        var createAuthorRow = function(hist) {
            return (
                <tr >
                    <td>{hist.total_price} zł</td>
                    <td>{hist.created.substring(0, 10)}</td>
                    <td>{hist.payment}</td>
                    <td>{hist.shipping.name}</td>
                    <td>{this.state.stany[hist.state]}</td>
                </tr>
            );
        };
        return (
            <div>
                <table className="table">
                    <thead>
                    <th>Cena zamowienia</th>
                    <th>Data zamowienia</th>
                    <th>Platnosc</th>
                    <th>Sposób przesyłki</th>
                    <th>Stan Przesylki</th>
                    </thead>
                    <tbody>
                    {this.state.history.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = History;