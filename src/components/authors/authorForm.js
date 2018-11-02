"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author:	React.PropTypes.object.isRequired,
        onSave:	React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

   render: function() {
       return (
           <form>
               <h1>Zarzadzaj uzytkownikiem</h1>
               <Input
                   name="firstName"
                   label="First Name"
                   value={this.props.author.firstName}
                   onChange={this.props.onChange}
                   error={this.props.errors.firstName}
               />

               <Input
                   name="lastName"
                   label="Last Name"
                   value={this.props.author.lastName}
                   onChange={this.props.onChange}
                   error={this.props.errors.lastName}

               />

               <Input
                   name="street"
                   label="Street"
                   value={this.props.author.street}
                   onChange={this.props.onChange}
                   error={this.props.errors.street}

               />

               <Input
                   name="tel"
                   label="Telephone"
                   value={this.props.author.tel}
                   onChange={this.props.onChange}
                   error={this.props.errors.tel}

               />

               <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
           </form>

       );
   }
});

module.exports = AuthorForm;