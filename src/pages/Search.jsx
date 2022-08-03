import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { searchAlbumsAPIs } from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import Album from './Album';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      inputValue: '',
      artistAlbuns: null,
      loadingSearch: false,
      isResults: false,
      isArtist: true,
    };
  }

handleSearch = ({ target: { value } }) => {
  const inputValue = value
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(' ');

  this.setState({ inputValue });

  value.length >= 2
    ? this.setState({ isArtist: false, name: inputValue })
    : this.setState({ isArtist: true, name: inputValue });
};

// console.log(searchAlbumsAPIs(results));
handleSearch = () => {
  const { inputValue } = this.state;

  this.setState({ loadingSearch: true });

  searchAlbumsAPI(inputValue).then((result) => {
    this.setState({
      loadingSearch: false,
      isResults: true,
      artistAlbuns: result,
      inputValue: '',
    });
  });
};

resultAlbunSearch = () => {
  const { artistAlbuns } = this.state;
  return (
    <section className="albuns-group">
      {artistAlbuns.map(
        ({ collectionId, artistName, collectionName, artworkUrl100 }) => (
          <Link
            key={ collectionId }
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <Album
              src={ artworkUrl100 }
              alt={ collectionName }
              artistName={ artistName }
              collectionName={ collectionName }
              nameId=""
              albumId=""
            />
          </Link>
        ),
      )}
    </section>
  );
};

resultsSearch = () => {
  const {
    state: { artistAlbuns, name },
  } = this;

  return (
    <>
      <h2>{`Resultado de álbuns de: ${name}`}</h2>
      {artistAlbuns.length > 0 ? (
        this.resultAlbunSearch()
      ) : (
        <h3>Nenhum álbum foi encontrado</h3>
      )}
    </>
  );
};

render() {
  const { inputValue, loadingSearch, isResults, isArtist } = this.state;

  return (
    <div>
      <Header />
      {loadingSearch ? (
        <Loading />
      ) : (
        <div data-testid="page-search">
          <input
            value={ inputValue }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleSearch }
          />

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isArtist }
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </div>
      )}
      {isResults && this.resultsSearch()}
    </div>
  );
}
}

export default Search;
