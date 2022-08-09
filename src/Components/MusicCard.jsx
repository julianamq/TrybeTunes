import React, { Component } from 'react';
import { string } from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state = {
      loading: false,
      favoriteMusic: [],
    }

  componentDidMount = async () => {
    this.setState({ loading: true,
    },
    async () => {
      this.setState({
        favoriteMusic: await getFavoriteSongs(),
        loading: false,
      });
    });
  };

  handleChange = async ({ target }) => {
    const { className } = target;
    // const changeForNumber = parseInt(className, 10);
    const changeForNumber = className * 1;
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(changeForNumber);
      } else {
        await removeSong(changeForNumber);
      }
      this.setState({
        loading: false,
        favoriteMusic: await getFavoriteSongs(),
      });
    });
  }

  render() {
    const { musicList } = this.props;
    const { loading, favoriteMusic } = this.state;
    const musicSongs = musicList.filter((_music, i) => i > 0);
    // _music é para não pegar esse parametro. Luis Paulo
    return (
      loading ? <Loading /> : (
        musicSongs.map((music) => {
          const { trackName, previewUrl, trackId } = music;
          return (
            <div key={ trackId }>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favoriteSongs">
                Favorita
                <input
                  className={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  id="favoriteSongs"
                  type="checkbox"
                  onChange={ this.handleChange }
                  checked={ favoriteMusic.some((musica) => musica === trackId) }
                />
              </label>
            </div>
          );
        })

      )
    );
  }
}
MusicCard.propTypes = {
  musicList: string,
}.isRequired;

export default MusicCard;
