import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: false,
    userName: {},
  };

   componentDidMount = () => {
     callGetUser();
   };

  callGetUser = async () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userName: user.name });
    });
  };

  render() {
    // console.log(getUser());
    const { loading, userName } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">

          <h1>
            TrybeTunes,
            {userName}
          </h1>
          <div>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/album/:id" data-testid="link-to-album"> Album </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
            <Link to="/profileEdit" data-testid="link-to-profileEdit"> Profile Edit</Link>
          </div>
        </div>
      </header>
    // { loading ? (
      // ) : < Loading /> } dando código inacessível pelo ternário
    );
  }
}
export default Header;
