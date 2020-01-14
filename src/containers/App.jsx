import React from 'react';
import Header from '../components/Header';
import Modal from './Modal';
import { addItem, deleteItem, doneItem, editItem, getData, updateData } from '../utils/api';
import { addTagItem, getTags, deleteTagItem } from '../utils/tagsAPI';
import TodoList from './TodoList';
import { DragDropContext } from 'react-beautiful-dnd';
import TagList from './TagList';
import SearchByTags from '../components/TodoList/SearchByTags';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: getData(),
      tagList: getTags(),
      isModalOpen: false,
      editId: null,
      filterDate: '',
      searchTagList: [],
      searchText: '',
    };
  }

  searchItems = (list) => {
    let searchVal = this.state.searchText.toLowerCase();
    if (searchVal) {
      return list.filter(a => ((a.title.toLowerCase()
        .includes(searchVal)) || (a.description.toLowerCase()
        .includes(searchVal))));
    }
    return list;
  };

  handleSearch = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleTagsSearch = (newTagList) => {
    this.setState({
      searchTagList: newTagList,
    });
  };

  handleFilterByDate = (newValue) => {
    const mValue = newValue;
    this.setState({
      filterDate: mValue,
    });
  };

  filterByDate = (list) => {
    Date.prototype.withoutTime = function () {
      let d = new Date(this);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    if (this.state.filterDate === undefined || this.state.filterDate.length === 0) {
      return list;
    }
    const res = list.filter(task => {
      if (!!task.deadline) {
        if ((new Date(task.deadline).withoutTime()) >= (new Date().withoutTime()) &&
          (new Date(task.deadline).withoutTime()) <= new Date(this.state.filterDate).withoutTime()) {
          return true;
        }
      }
      return false;
    });

    return res;
  };

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }
    const data = Array.from(this.state.todoList);
    const sourceObj = Object.assign({}, data[source.index]);
    data.splice(source.index, 1);
    data.splice(destination.index, 0, sourceObj);
    this.setState({
      todoList: data,
    });
  };

  addTag = (tag) => {
    if (!!tag === false || this.state.tagList.includes(tag)) {
      return;
    }
    addTagItem(tag);
    this.setState((prevState) => {
      return {
        tagList: [...prevState.tagList, tag]
      };
    });
  };

  deleteTag = (tag) => {
    deleteTagItem(tag);
    const { todoList } = this.state;
    let newTodoList = todoList.map((elem) => ({
      ...elem,
      currentTagList: elem.currentTagList.filter(item => item !== tag)
    }));
    updateData(newTodoList);
    this.setState((prevState) => {
      return {
        tagList: prevState.tagList.filter(item => item !== tag),
        todoList: newTodoList,
      };
    });
  };

  handleModal = (id) => {
    this.setState((prevState) => {
      return {
        isModalOpen: !prevState.isModalOpen,
        editId: id ? id : null
      };
    });
  };

  addTodo = (obj) => {
    addItem(obj);
    this.setState((prevState) => {
      return {
        todoList: [obj, ...prevState.todoList]
      };
    });
  };
  editTodo = (obj) => {
    editItem(obj);
    this.setState((prevState) => {
      return {
        todoList: prevState.todoList.map((item) => {
          if (obj.id === item.id) {
            return {
              ...item,
              title: obj.title,
              description: obj.description,
              priority: obj.priority,
              deadline: obj.deadline,
              currentTagList: obj.currentTagList,
              file: obj.file,
            };
          }
          return item;
        })
      };
    });
  };
  deleteTodo = (id) => {
    deleteItem(id);
    this.setState((prevState) => {
      return {
        todoList: prevState.todoList.filter(item => item.id !== id)
      };
    });
  };
  doneTodo = (id) => {
    doneItem(id);
    this.setState((prevState) => {
      return {
        todoList: prevState.todoList.map(item => {
          if (item.id === id) {
            return {
              ...item,
              done: !item.done
            };
          }
          return item;
        })
      };
    });
  };
  editOpenModal = (id) => {
    this.handleModal(id);
  };

  sortDefault = (list) => {
    const done = list.filter(item => item.done === true);
    const undone = list.filter(item => item.done === false);
    const filterMap = new Map();
    filterMap.set('high', 3);
    filterMap.set('middle', 2);
    filterMap.set('low', 1);
    done.sort((a, b) => filterMap.get(b.priority) - filterMap.get(a.priority));
    undone.sort((a, b) => filterMap.get(b.priority) - filterMap.get(a.priority));
    return undone.concat(done);
  };

  handleSort = () => {
    this.setState((prevState) => {
      return {
        todoList: this.sortDefault(prevState.todoList)
      };
    });
  };

  searchByTags = (list) => {
    if (this.state.searchTagList === undefined || this.state.searchTagList.length === 0) {
      return list;
    }

    return list.filter(task => {
      return this.state.searchTagList.every(element => task.currentTagList.includes(element));
    });
  };


  render() {
    const { isModalOpen, editId, todoList, tagList, filterDate, searchTagList, searchText } = this.state;
    const isDropDisabled = !!filterDate || searchTagList.length > 0 || searchText.length > 0;
    return (
      <div className="col-12 col-lg-11 col-xl-10 mx-auto">
        {isModalOpen && <Modal
          modalFunc={this.handleModal}
          editId={editId}
          addFunc={this.addTodo}
          editFunc={this.editTodo}
          todoList={todoList}
          tagList={tagList}
        />}
        <Header
          modalFunc={this.handleModal}
          handleFilterByDate={this.handleFilterByDate}
          searchText={this.state.searchText}
          handleSearch={this.handleSearch}
        />
        <div className="container-fluid mb-0">
          <div className="row">
            <div className="col-lg-3 p-3 shadow-sm mt-2">
              {todoList.length &&
                <button onClick={this.handleSort} type="button"
                        className="btn btn-secondary btn-block mb-3">Sort by priority</button>
              }
              <SearchByTags
                tagList={tagList}
                handleTagsSearch={this.handleTagsSearch}
              />
              <TagList
                tagList={tagList}
                addFunc={this.addTag}
                deleteFunc={this.deleteTag}
              />
            </div>
            <div className="col-lg-9">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <TodoList
                  todoList={todoList}
                  doneFunc={this.doneTodo}
                  deleteFunc={this.deleteTodo}
                  editFunc={this.editOpenModal}
                  tagList={tagList}
                  filterByDate={this.filterByDate}
                  searchByTags={this.searchByTags}
                  searchItems={this.searchItems}
                  isDropDisabled={isDropDisabled}
                />
              </DragDropContext>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
