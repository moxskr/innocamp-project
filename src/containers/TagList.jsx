import React, { Component } from 'react';
import Tag from '../components/Tag';

class TagList extends Component {
  state = {
    inputTag: '',
  };

  handleInputTagChange = (e) => {
    this.setState({
      inputTag: e.target.value,
    });
  };

  handleAddBtnClick = () => {
    const { addFunc } = this.props;
    const { inputTag } = this.state;
    addFunc(inputTag);
    this.setState({
      inputTag: '',
    });
  };

  render() {
    const { tagList, deleteFunc } = this.props;
    const { inputTag } = this.state;
    return (
      <div className="col shadow-sm p-2">
        <h4 className="mb-3">Tags: </h4>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text font-weight-bold">#</span>
          </div>
          <input maxLength="20" onChange={this.handleInputTagChange} value={inputTag} type="text"
                 className="form-control"
                 placeholder="tag" aria-label="tag"/>
          <div className="input-group-append">
            <button onClick={this.handleAddBtnClick} className="btn btn-outline-secondary"
                    type="button">Add tag
            </button>
          </div>
        </div>

        {tagList.map((tag) => {
          return (
            <Tag key={tag} tag={tag} deleteFunc={() => deleteFunc(tag)}/>
          );
        })}
      </div>
    );
  }
}

export default TagList;
