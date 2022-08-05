import React from 'react';
import Header from '../Components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      // albumArtist: [],
      // artist: '',
      // loading: false,
    };
  }

onInputChange = ({ target }) => {
  this.setState({
    search: target.value,
  });
}

// para pesquisar o artista quando clicar no botao
// onButtonClick = async () => {
//   const { search } = this.state;
//   this.setState({
//     search: '',
//     loading: true,
//   });
//   const albuns = await searchAlbumsAPI(search).map((album) => {
//     album.artist = albumArtist;
//   });
// }

// // para limpar o input
// handleReset = () => {
//   this.setState({
//     artist: [{}],
//   });
// };

render() {
  const {
    search,
    // loading,
    // albumArtist,
    // artist
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
