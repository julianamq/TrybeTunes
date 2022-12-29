import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  state = {
    musicList: [],
  }

  componentDidMount= async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      musicList: result,
    });
  }
  // id do album ;
  // const da props para acessar o obj da propriedade
  // https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

  render() {
    const { musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { musicList.length > 0 && (
            <>
              <img src={ musicList[0].artworkUrl100 } alt="imagem musica" />
              <p data-testid="album-name">{ musicList[0].collectionName }</p>
              <p data-testid="artist-name">{ musicList[0].artistName }</p>
            </>
          )}
        </div>
        <MusicCard musicList={ musicList } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
