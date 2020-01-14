import React, { Component } from 'react';
import Tag from '../Tag';

class SearchByTags extends Component {
  state = {
    searchTagList: [],
  };

  handleAddTag = (newTag) => {
    const tag = newTag;
    if (this.state.searchTagList.includes(tag) || tag === undefined) {
      return;
    }
    this.setState((prevState) => {
      return {
        searchTagList: [...prevState.searchTagList, tag],
      };
    }, () => this.props.handleTagsSearch(this.state.searchTagList));
  };

  handleDeleteTag = (tag) => {
    this.setState((prevState) => {
      return {
        searchTagList: prevState.searchTagList.filter(item => item !== tag)
      };
    }, () => this.props.handleTagsSearch(this.state.searchTagList));
  };

  render() {
    return (
      <div className="col shadow-sm p-2 mb-3">
        <div className="row mb-2">
          <div className="col">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                Search by tags
              </button>
              <div className="dropdown-menu">
                {this.props.tagList.filter(tag => !this.state.searchTagList.includes(tag))
                  .map((tag) => {
                    return (
                      <a onClick={() => this.handleAddTag(tag)} className="dropdown-item"
                         key={tag}>#{tag}</a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className='tagList'>
          <span>
            {this.state.searchTagList.length !== 0 && <span className="pl-2">Search tag list: </span>}
            {this.state.searchTagList.map((tag) => {
              return (
                <Tag key={tag} tag={tag} deleteFunc={() => this.handleDeleteTag(tag)}/>
              );
            })}
          </span>
        </div>
      </div>
    );
  }
}

export default SearchByTags;
