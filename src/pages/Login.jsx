import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';
// import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    disabledButton: true,
    isLogged: 'false',
  };

  stateChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      const { name } = this.state;
      const min3 = 2;
      const isDisabled = name.length <= min3;
      this.setState({ disabledButton: isDisabled });
    });
  };

  saveUser = async () => {
    const { name } = this.state;
    this.setState({ isLogged: 'pending' }, async () => {
      const loggedIn = await createUser({ name });
      this.setState({ isLogged: loggedIn });
    });
  };

  render() {
    const {
      name,
      disabledButton, isLogged } = this.state;
    return (
      <div data-testid="page-login">
        {isLogged === 'false' ? (
          <div className="login">
            <h1>Login</h1>
            <label htmlFor="name-input">
              Name:
              <input
                data-testid="login-name-input"
                id="name-input"
                type="text"
                value={ name }
                onChange={ this.stateChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              onClick={ this.saveUser }
              disabled={ disabledButton }
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            {loginStatus === 'pending' ? (
              <Loading />
            ) : (
              <Redirect to="/Search" />
              // ou history.push(/Search)
            )}
          </div>
        )}
      </div>
    );
  }
}
// Login.propTypes = {
//   loginStatus: PropTypes.func.isRequired,
// };
export default Login;

// Exercicio dois - Muca mentoria, bem que disse que seria quase um copia e cola da Tryunfo tanks :)
// Gustavo Dutra - Ex2
