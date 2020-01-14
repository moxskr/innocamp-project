import React, { Component } from 'react';
import CloseImg from '../../public/images/close.png';

const DeleteBtnStyle = {
  cursor: 'pointer',
  height: 10,
  paddingBottom: 2,
};

class Tag extends Component {
  render() {
    const { tag, deleteFunc } = this.props;
    return (
      <span className="badge badge-pill badge-light p-2 m-1">
        #{tag}
        {!!deleteFunc &&
        <img onClick={deleteFunc} style={DeleteBtnStyle} className="img-fluid ml-2" src={CloseImg}
             alt="close"/>}
      </span>
    );
  }
}

export default Tag;
