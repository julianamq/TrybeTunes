import React from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from '../Components/Loading';
// import Album from './Album';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',

      // loading: false,
      // albuns: [],
      // artist: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  }

  // async onButtonClick() {
  //   const { search } = this.state;
  //   this.setState({
  //     search: '',
  //     // loading: true,
  //   });
  //   const albuns = await searchAlbumsAPI(search);
  //   this.setState({
  //     albuns,
  //     // loading: false,
  //     // artist: search,
  //   });
  // }

  render() {
    const { search,
      // loading,
      //  albuns,
      //  artist
    } = this.state;

    return (
      <div data-testid="page-search">
        <div>
          <Header />
          <input
            id="search"
            data-testid="search-artist-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.onInputChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ search.length < 2 }
            onClick={ this.onButtonClick }
          >
            Pesquisar
          </button>

        </div>
      </div>
    );
  }
}

export default Search;
