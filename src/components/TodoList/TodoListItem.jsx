import React from 'react';
import Tag from '../Tag';

import { Draggable } from 'react-beautiful-dnd';

const TodoListItem = ({ item, editFunc, deleteFunc, doneFunc, index }) => {
  const date = item.deadline;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >

          <div className="py-2">
            <div className={`shadow-sm p-3 col-lg-12 ${item.done ? "bg-light" : "bg-white"} todo-list-item`}>
              <div className="row">
                <div className="col-9">
                  <h4 className="text-wrap text-break">{item.title}</h4>
                </div>
                {item.done && <div className="col-3 d-flex justify-content-end">
                  <img src="/images/tick.png"
                       width="40px" alt=""/>
                </div>}
              </div>
              {item.description && <p className="text-wrap text-break">{item.description}</p>}
              <h6>
                Priority: {item.priority}
              </h6>
              {item.deadline && <h6>
                Deadline: {date}
              </h6>}
              {item.currentTagList.length !== 0 && <div className='tagList'>
                        <span className="font-weight-bold">
                        Tags:
                          {item.currentTagList.map((tag) => {
                            return (
                              <Tag key={tag} tag={tag} deleteFunc={null}/>
                            );
                          })}
                        </span>
              </div>}
              {item.file !== '' &&
              <a href={item.file} download="img">
                <button type="button" className="btn btn-success btn-sm">Download image</button>
              </a>}
              <div className="dropdown-divider"/>
              <div className="todo-list-item-footer mt-3">
                <div className="row">
                  <div className="col">
                    <button onClick={() => deleteFunc(item.id)} type="button"
                            className="btn btn-danger btn-sm delete mr-1">Delete
                    </button>
                    {!item.done && <button onClick={() => editFunc(item.id)} type="button"
                                           className="btn btn-warning btn-sm edit"
                                           data-toggle="modal" data-target="#editTaskModal">Edit
                    </button>}
                  </div>
                  <div className="col d-flex justify-content-end">
                    <button onClick={() => doneFunc(item.id)} type="button"
                            className="btn btn-dark btn-sm done">Mark as done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoListItem;
