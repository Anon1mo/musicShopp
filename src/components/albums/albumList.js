"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var AlbumList = React.createClass({
    propTypes: {
        albums: React.PropTypes.array.isRequired
    },
    render: function() {
        var createAlbumRow = function(album, index) {
            return (
                /*<tr key={album.slug}>
                    <td><Link to="manageAuthor" params={{id: album.slug}}>{album.slug}</Link></td>
                    <td>{album.title}</td>
                </tr> */
                <div className="col-md-4" style={{marginTop: 10}}>
                <div className="media">
                <div className="media-left">
                <a href="#">
                <img className="media-object" src={album.image} alt="#" width="200" height="200" />
                </a>
                </div>
                <div className="media-body">
                <h4 className="media-heading">{album.artist.name} - {album.title}</h4>
                    <table className="table">
                        <tbody>
                        <tr key={index}>
                            <td>CENA: </td>
                            <td>{album.price} zł</td>
                        </tr>
                        <tr>
                            <td>NOŚNIK: </td>
                            <td>{album.medium_type}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{textAlign: "center"}}>
                        <label htmlFor={album.slug}>Ilość</label>
                        <input onChange={this.props.onChange()} type="number" name={album.slug} min="1" max={album.stock} value="1" />
                        <button className="btn btn-info" onClick={() => this.props.addToCart(album)}>Dodaj do koszyka</button>
                    </div>
                </div>
                </div>
                </div>
            );
        };
        var createCartRow = function(cartItem) {
            return (
                <tr>
                    <td>{cartItem.title}</td>
                    <td>{cartItem.price} zł </td>
                    <td><button className="btn btn-danger" onClick={() => this.props.deleteFromCart(cartItem)}>Usuń</button></td>
                </tr>
            );
        };
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" id="myInput" onChange={this.props.searchBar} placeholder="Szukaj płyty" />
                    </div>
                    <div className="col-md-2">
                        KATEGORIA:
                            <select className="form-control" id="sel1">
                                <option>TOP10</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                    </div>
                </div>
                <div className="row">
                    {this.props.albums.map(createAlbumRow, this)}
                </div>
                    <h1>Koszyk</h1>
                    <div>
                        <table className="table">
                            <thead>
                            <th>Tytuł</th>
                            <th>Cena</th>
                            <th></th>
                            </thead>
                            <tbody>
                            {this.props.cart.map(createCartRow, this)}
                            <td><b>Podsumowanie</b></td>
                            <td>{this.props.sum} zł</td>
                            <td><button className="btn btn-success" onClick={() => this.props.sendOrder(this.props.cart)}>Wyślij zamówienie</button></td>
                            </tbody>
                        </table>
                    </div>

                </div>
        );
    }
});

module.exports = AlbumList;