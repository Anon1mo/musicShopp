"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');
var axios = require('axios');


var Home = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        return {
            register: { username: '', email: '', password: '', passwordConfirm: ''},
            login: { email: '', password: ''},
            errors: {},
            dirty: false
        };
    },
    sendRegister: function(event) {
        event.preventDefault();
        var newUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password1: document.getElementById('password').value,
            password2: document.getElementById('passwordConfirm').value
        };
        console.log(newUser);
        axios.post('https://akus93.pythonanywhere.com/auth/registration/', newUser)
            .then(response => {
                console.log(response.data.key);
                sessionStorage.setItem('email', newUser.email);
                sessionStorage.setItem('token', response.data.key);
                console.log(sessionStorage.getItem('token'));
                toastr.success('Zarejestrowano.');
                this.transitionTo('albums');

            })
            .catch(error => {
                console.log(error);
                toastr.error('Nie udalo sie zarejestrowac');
            });

    },
    sendLogin: function(event) {
        event.preventDefault();
        var login = {
            email: document.getElementById('logEmail').value,
            password: document.getElementById('logPassword').value
        };
        console.log(login);
        axios.post('http://akus93.pythonanywhere.com/auth/login/', login)
            .then(response => {
                console.log('klucz ' + response.data.key);
                sessionStorage.setItem('email', login.email);
                sessionStorage.setItem('token', response.data.key);
                console.log(sessionStorage.getItem('token'));
                toastr.success('Zalogowano.');
                this.transitionTo('albums');
            })
            .catch(error => {
                console.log(error);
                toastr.error('Nie udalo sie zalogowac');
            });

    },
   render: function() {
       return (
           <div>
           <div className="jumbotron">
               <h1>Sklep muzyczny</h1>
               <p>Kup swoje ulubione płyty z lokalnego sklepu!</p>
               <Link to="about" className="btn btn-primary btn-lg">Więcej informacji</Link>
           </div>
               <div className="row">
                   <div className="col-md-6">
           <form className="form-horizontal" action='' onSubmit={this.sendRegister} method="POST">
           <fieldset>
           <div id="legend">
           <legend className="">Zarejestruj się</legend>
           </div>
           <div className="control-group">
           <label className="control-label" htmlFor="username">Nazwa użytkownika</label>
           <div className="controls">
           <input type="text" id="username" name="username" ref="username" placeholder="" className="input-xlarge" />
           <p className="help-block">Nazwa może zawierać litery i liczby, bez spacji</p>
       </div>
       </div>

       <div className="control-group">
           <label className="control-label" htmlFor="email">E-mail</label>
           <div className="controls">
           <input type="text" id="email" name="email" ref="email" placeholder="" className="input-xlarge" />
               <p className="help-block">Podaj swój adres e-mail</p>
       </div>
       </div>

       <div className="control-group">
           <label className="control-label" htmlFor="password">Hasło</label>
           <div className="controls">
           <input type="password" id="password" name="password" ref="password" placeholder="" className="input-xlarge" />
           <p className="help-block">Hasło powinno mieć przynajmniej 6 znaków</p>
       </div>
       </div>

       <div className="control-group">
           <label className="control-label" htmlFor="passwordConfirm">Hasło (potwierdzenie)</label>
           <div className="controls">
           <input type="password" id="passwordConfirm" name="passwordConfirm" ref="passwordConfirm" placeholder="" className="input-xlarge" />
               <p className="help-block">Wpisz ponownie swoje hasło</p>
       </div>
       </div>

       <div className="control-group">
           <div className="controls">
           <button className="btn btn-block btn-success" type="submit">Zarejestruj się</button>
           </div>
           </div>
           </fieldset>
           </form>
                   </div>
                   <div className="col-md-6">
                       <div className="panel panel-default">
                           <div className="panel-heading">
                               <h3 className="panel-title">Zaloguj się</h3>
                           </div>
                           <div className="panel-body">
                               <form role="form" action='' onSubmit={this.sendLogin} method="POST">
                                   <fieldset>
                                       <div className="form-group">
                                           <input className="form-control" id="logEmail" placeholder="E-mail" name="email" type="text" />
                                       </div>
                                       <div className="form-group">
                                           <input className="form-control" id="logPassword" placeholder="Hasło" name="password" type="password" />
                                       </div>
                                       <div className="checkbox">
                                           <label>
                                               <input name="remember" type="checkbox" value="Remember Me">Zapamiętaj </input>
                                           </label>
                                       </div>
                                       <input className="btn btn-lg btn-success btn-block" type="submit" value="Login" />
                                   </fieldset>
                               </form>
                           </div>
                       </div>

                   </div>
               </div>
           </div>

       );
   }
});

module.exports = Home;