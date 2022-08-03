import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ isLoading: false, user });
    });
  }

  renderHeader = () => {
    const { user } = this.state;
    return (
      <>
        <nav className="navbar">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </nav>
        <span data-testid="header-user-name">
          {' '}
          {user.name}
        </span>
      </>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : this.renderHeader()}
      </header>
    );
  }
}

export default Header;

// passssssssssssssssssssouuuuu Ajuda do Gui Aquino!
