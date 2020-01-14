import React from 'react';

const ModalHeader = ({ modalFunc }) => {
  return (
    <div className="modal-header">
      <h4>Add todo</h4>
      <button onClick={() => modalFunc()} type="button"
              className="btn btn-danger font-weight-bold">&times;</button>
    </div>
  );
};

export default ModalHeader;
