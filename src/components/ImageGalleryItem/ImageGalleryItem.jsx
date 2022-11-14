import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    preview: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClose: PropTypes.func,
  };

  state = { isModalOpen: false };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
        <GalleryItem onClick={this.openModal}>
          <ItemImage src={this.props.preview} alt={this.props.description} />
        </GalleryItem>
        {this.state.isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={this.props.bigImage} alt={this.props.description} />
          </Modal>
        )}
      </>
    );
  }
}
