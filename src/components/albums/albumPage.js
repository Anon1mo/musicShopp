"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var axios = require('axios');
var AuthorApi = require('../../api/AuthorApi');
var AlbumList = require('./albumList');
var toastr = require('toastr');


var AlbumPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function() {
        return {
            albums: [],
            filtered: [],
            quantity: [],
            cart: [],
            sum: 0.00
        };
    },
    componentDidMount: function() {
        if (this.isMounted()) {
            axios.get('http://akus93.pythonanywhere.com/api/products/')
                .then((response) => {
                    this.setState({ albums: response.data.results});
                    this.setState({ filtered: response.data.results});
                    console.log(response.data);
                });
            console.log('token ' + sessionStorage.getItem('token')); //token
        }
    },
    setAlbumState: function() {

        /*var updatedList = this.state.filtered;
        console.log('ok');
        console.log(updatedList);
        updatedList = updatedList.filter(function(item){
            console.log(item.title);
            return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({albums: updatedList}); */
        /*var field = event.target.name;
        var value = event.target.value;
        for(var i = 0; i < this.state.albums.length; i++) {
            if(this.state.albums[i].slug == value) {
                this.state.quantity[i] = value;
                console.log(this.state.quantity);
            }
        }
        this.setState({quantity: this.state.quantity}); */
    },
    addToCart: function(album) {
        var item = {
            title: album.title,
            product: album.slug,
            quantity: '1',
            price: album.price
        };
        this.state.cart.push(item);
        this.state.sum += parseFloat(album.price);
        this.state.sum.toPrecision(2);
        console.log(this.state.cart);
        return this.setState({cart: this.state.cart, sum: this.state.sum});
    },
    deleteFromCart: function(cartItem) {
        console.log(cartItem);
        console.log(this.state.cart);
        //this.state.cart.filter(item => item === cartItem);
        var pos = this.state.cart.map(function(e) { return e.title; }).indexOf(cartItem.title);
        this.state.cart.splice(pos, 1);
        console.log(this.state.cart);
        this.state.sum -= parseFloat(cartItem.price);
        this.state.sum.toPrecision(2);
        return this.setState({cart: this.state.cart, sum: this.state.sum});
    },
    sendOrder: function(cart) {
        var order = {
            items: [],
            "shipping": "inpost",
            "payment": "przelew-bankowy",
            "address": "ul. Testowa 42",
            "zip_code": "42-424",
            "city": "Poznań",
            "phone": "424242424"
        };
        cart.forEach(function(item) {
           order.items.push({
               "product": item.product,
               "quantity": item.quantity
           });
        });
        var options = {
            headers: {
                'Authorization': 'Token ' + sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios.post('https://akus93.pythonanywhere.com/api/orders/new/', order, options)
            .then(response => {
                toastr.success('Udalo sie wyslac zamowienie');
                this.state.cart = [];
                this.state.sum = 0.0;
                this.transitionTo('albums');
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(order);
    },
    searchBar: function() {
        var updatedList = this.state.filtered;
        console.log('ok');
        console.log(updatedList);
        updatedList = updatedList.filter(function(item){
            console.log(item.title);
            return item.artist.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({albums: updatedList});
    },
    render: function() {
        return (
            <div>
                <h1>Katalog płyt</h1>
                <AlbumList albums={this.state.albums}
                           filtered={this.state.filtered}
                           cart={this.state.cart}
                           onChange={this.setAlbumState}
                           addToCart={this.addToCart}
                           deleteFromCart={this.deleteFromCart}
                           sum={this.state.sum}
                           sendOrder = {this.sendOrder}
                           searchBar = {this.searchBar}
                />
            </div>
        );
    }
});

module.exports = AlbumPage;