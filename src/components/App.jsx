import React from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/';
import { ImageGallery } from './ImageGallery';
import { getCurrentPicture } from 'api/getCurrentPicture';
import { Button } from './Button/';
import { Loader } from 'components/Loader';

export class App extends React.Component {
  state = {
    searchString: '',
    status: 'idle',
    page: 1,
    arrayOfPictures: [],
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    // if (prevState.searchString !== this.state.searchString ) {
    //   try {
    //     this.setState({ status: 'pending' });
    //     const picturesInfo = await getCurrentPicture(
    //       this.state.searchString,
    //       this.state.page
    //     );
    //     if (picturesInfo.data.hits.length === 0) {
    //       Notiflix.Notify.failure('Sorry, we have not found anything');
    //       return;
    //     }
    //     this.setState({
    //       arrayOfPictures: picturesInfo.data.hits,
    //       status: 'resolved',
    //     });
    //   } catch (error) {
    //     this.setState({ error: true, status: 'fail' });
    //     Notiflix.Notify.failure(error);
    //   }
    // }
    if (
      prevState.page < this.state.page ||
      prevState.searchString !== this.state.searchString
    ) {
      try {
        this.setState({ status: 'pending' });
        const picturesInfo = await getCurrentPicture(
          this.state.searchString,
          this.state.page
        );
        if (picturesInfo.data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no more images');
          return;
        }
        this.setState(s => ({
          arrayOfPictures: [...s.arrayOfPictures, ...picturesInfo.data.hits],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error: true, status: 'fail' });
        Notiflix.Notify.failure(error);
      }
    }
  }

  handleSubmit = info => {
    this.setState({
      searchString: info.search.toLowerCase(),
    });
  };

  loadMore = () => {
    this.setState(s => ({ page: s.page + 1 }));
  };

  render() {
    const { arrayOfPictures, status } = this.state;
    return (
      <>
        <Searchbar submitProp={this.handleSubmit} />
        {status === 'fail' && <div> Something wrong </div>}
        {arrayOfPictures.length > 0 && status !== 'fail' && (
          <ImageGallery images={arrayOfPictures} />
        )}
        {status === 'pending' && <Loader />}
        {/* {bigImageLink.length > 0 && (
          <Modal onClose={this.resetBigImageLink}>
            <img src={bigImageLink} alt={bigImageDescription} />
          </Modal>
        )} */}
        {arrayOfPictures.length >= 12 && status === 'resolved' && (
          <Button loadMore={this.loadMore} />
        )}
      </>
    );
  }
}
