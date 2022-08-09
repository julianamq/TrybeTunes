import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      artist: '',
      loading: false,
      response: [],
      notFound: false,
    };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      search: value,
    });
  };

  onButtonClick = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(search);
    console.log(response);
    if (response.length !== 0) {
      this.setState({
        loading: false,
        response,
        artist: search,
        search: '',
        notFound: false,
      });
    } else {
      this.setState({
        loading: false,
        response,
        artist: search,
        search: '',
        notFound: true,
      });
    }
  };
  // para pesquisar o artista quando clicar no botao

  render() {
    const {
      search,
      loading,
      response,
      artist,
      notFound,
    } = this.state;
    // console.log(artist);
    return (
      <div data-testid="page-search">
        <div>
          <Header />
          {loading && (<Loading />) }
          {!loading && notFound ? <div>Nenhum álbum foi encontrado </div> : (
            <p>
              { `Resultado de álbuns de: ${artist}`}

              {response.map((objeto) => (
                <Link
                  key={ objeto.collectionId }
                  to={ `/album/${objeto.collectionId}` }
                  data-testid={ `link-to-album-${objeto.collectionId}` }
                >
                  { objeto.collectionName }

                </Link>
              )) }
            </p>
          ) }

          <section>
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
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
// Rafa Aguiar
