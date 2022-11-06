import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { getCurrentPicture } from '../../api/getCurrentPicture';
import Notiflix from 'notiflix';

export class ImageGallery extends React.Component {
  state = { arrayOfPictures: [], status: 'idle' };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stringOfQuery !== this.props.stringOfQuery) {
      this.setState({ status: 'pending' });
      getCurrentPicture(this.props.stringOfQuery)
        .then(picturesInfo => {
          if (picturesInfo.data.hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          this.setState({
            status: 'resolved',
            arrayOfPictures: picturesInfo.data.hits,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
  clickHandlerFunction = link => {
    this.props.clickProp(link);
  };
  // getCurrentPicture(this.props.string).then(pictureInfo => {
  //   this.setState({arrayOfPictures: pictureInfo.data.hits})});

  render() {
    const { arrayOfPictures, status } = this.state;

    if (status === 'idle') {
      return <div>Здесь ничего нет</div>;
    }

    if (status === 'pending') {
      return <div>Загружаем</div>;
    }

    if (status === 'resolved') {
      return (
        <GalleryList>
          {arrayOfPictures.map(item => (
            <ImageGalleryItem
              key={item.id}
              preview={item.webformatURL}
              clickHandler={() => this.clickHandlerFunction(item.largeImageURL)}
            ></ImageGalleryItem>
          ))}
        </GalleryList>
      );
    }
  }
}
