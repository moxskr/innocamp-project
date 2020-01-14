import React from 'react';
import TodoListItem from '../components/TodoList/TodoListItem';
import { updateData } from '../utils/api';
import { Droppable } from 'react-beautiful-dnd';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: props.todoList,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      ...state,
      todoList: props.todoList
    };
  };

  componentDidUpdate() {
    updateData(this.state.todoList.map((item, index) => ({
      ...item,
      sortOrder: index
    })));
  };

  render() {
    const { deleteFunc, editFunc, doneFunc } = this.props;
    return (
      <div className="todo-list">
        <div className="todo-list-container">
          <Droppable droppableId={1} isDropDisabled={this.props.isDropDisabled}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.filterByDate(this.props.searchByTags(this.props.searchItems(this.state.todoList)))
                  .map((item, index) => (
                    <TodoListItem
                      item={item}
                      deleteFunc={deleteFunc}
                      editFunc={editFunc}
                      doneFunc={doneFunc}
                      key={item.id}
                      index={index}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default TodoList;
